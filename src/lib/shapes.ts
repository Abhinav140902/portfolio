// Target shapes for the particle field. Every generator returns `count` xyz
// positions centred on the origin, in world units, plus a per-particle "phase"
// used for travelling pulses (-1 means the particle never pulses).

export type ShapeName =
  | "name"
  | "experience"
  | "projects"
  | "sphere"
  | "network"
  | "globe"
  | "rocket"
  | "bubble"
  | "hub"
  | "halo"
  | "hello";

/** How the whole shape moves: spin continuously, sway gently, or hold still facing the camera. */
export type Motion = "spin" | "sway" | "still";

export const SHAPE_META: Record<ShapeName, { motion: Motion; tilt?: number }> = {
  name: { motion: "still" },
  experience: { motion: "still" },
  projects: { motion: "still" },
  hello: { motion: "still" },
  sphere: { motion: "spin" },
  globe: { motion: "spin" },
  rocket: { motion: "sway" },
  halo: { motion: "spin" },
  network: { motion: "sway" },
  bubble: { motion: "sway" },
  hub: { motion: "spin", tilt: 0.55 },
};

export type ShapeResult = { pos: Float32Array; phase: Float32Array; pulse: number };

type Ctx = { vw: number; vh: number; mobile: boolean; font: string };
type Vec = [number, number, number];

const rand = (a = -1, b = 1) => a + Math.random() * (b - a);
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)];

/** Builds `count` particles from a generator that writes one point and returns its phase. */
function make(count: number, gen: (i: number) => [Vec, number]): ShapeResult {
  const pos = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  let pulses = false;
  for (let i = 0; i < count; i++) {
    const [p, ph] = gen(i);
    pos.set(p, i * 3);
    phase[i] = ph;
    if (ph >= 0) pulses = true;
  }
  return { pos, phase, pulse: pulses ? 1 : 0 };
}

/** A random point in a small ball, for "node" clusters. */
function blob(c: Vec, radius: number): Vec {
  const u = Math.cbrt(Math.random()) * radius;
  const a = rand(0, Math.PI * 2);
  const b = Math.acos(rand(-1, 1));
  return [c[0] + u * Math.sin(b) * Math.cos(a), c[1] + u * Math.sin(b) * Math.sin(a), c[2] + u * Math.cos(b)];
}

/** A point along the segment a→b, slightly jittered. */
function along(a: Vec, b: Vec, t: number, jitter: number): Vec {
  return [
    a[0] + (b[0] - a[0]) * t + rand(-jitter, jitter),
    a[1] + (b[1] - a[1]) * t + rand(-jitter, jitter),
    a[2] + (b[2] - a[2]) * t + rand(-jitter, jitter),
  ];
}

/* ------------------------------------------------------------------ text */

/** Draws text on an offscreen canvas and samples its filled pixels. */
function text(lines: string[], count: number, width: number, font: string, dy: number): ShapeResult {
  const W = 1400;
  const H = 260 * lines.length + 80;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;

  let size = 240;
  ctx.font = `700 ${size}px ${font}`;
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
  size = Math.floor(size * Math.min(1, (W - 80) / widest));
  ctx.font = `700 ${size}px ${font}`;
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const lineH = size * 1.02;
  const top = H / 2 - ((lines.length - 1) * lineH) / 2;
  lines.forEach((l, i) => ctx.fillText(l, W / 2, top + i * lineH));

  const data = ctx.getImageData(0, 0, W, H).data;
  const pts: number[] = [];
  for (let y = 0; y < H; y += 3) {
    for (let x = 0; x < W; x += 3) {
      if (data[(y * W + x) * 4 + 3] > 140) pts.push(x, y);
    }
  }

  const scale = width / Math.max(...lines.map((l) => ctx.measureText(l).width));
  return make(count, () => {
    const k = Math.floor(Math.random() * (pts.length / 2)) * 2;
    return [
      [(pts[k] - W / 2 + rand(-1.2, 1.2)) * scale, -(pts[k + 1] - H / 2 + rand(-1.2, 1.2)) * scale + dy, rand(-0.12, 0.12)],
      -1,
    ];
  });
}

/* ------------------------------------------------------- generic forms */

function sphere(count: number, r: number) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  return make(count, (i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const t = golden * i;
    const k = r * (1 + rand(-0.03, 0.03));
    return [[Math.cos(t) * rad * k, y * k, Math.sin(t) * rad * k], -1];
  });
}

function globe(count: number, r: number) {
  return make(count, (i) => {
    const mode = i % 3;
    let lat: number;
    let lon: number;
    if (mode === 0) {
      lat = (Math.floor(rand(1, 11)) / 11) * Math.PI - Math.PI / 2; // latitude rings
      lon = rand(0, Math.PI * 2);
    } else if (mode === 1) {
      lon = (Math.floor(rand(0, 14)) / 14) * Math.PI * 2; // meridians
      lat = rand(-Math.PI / 2, Math.PI / 2);
    } else {
      lat = Math.asin(rand(-1, 1)); // sparse surface dust
      lon = rand(0, Math.PI * 2);
    }
    const k = r * (mode === 2 ? 1 + rand(0, 0.08) : 1);
    return [[Math.cos(lat) * Math.cos(lon) * k, Math.sin(lat) * k, Math.cos(lat) * Math.sin(lon) * k], -1];
  });
}

/* ------------------------------------------- Earlier: rocket lifting off */

function rocket(count: number, r: number) {
  const R0 = 0.27 * r; // body radius
  const lean = -0.2; // leans slightly, as if mid-lift-off
  const lift = 0.3 * r;
  const ring = (radius: number, y: number): Vec => {
    const a = rand(0, Math.PI * 2);
    return [Math.cos(a) * radius, y, Math.sin(a) * radius];
  };

  return make(count, () => {
    const p = Math.random();
    let v: Vec;
    let ph = -1;
    if (p < 0.38) {
      v = ring(R0, rand(-0.55, 0.55) * r); // body
    } else if (p < 0.52) {
      const u = Math.random(); // nose cone
      v = ring(R0 * Math.cos((u * Math.PI) / 2), 0.55 * r + u * 0.6 * r);
    } else if (p < 0.57) {
      const u = Math.random(); // nozzle
      v = ring(0.17 * r + u * 0.07 * r, -0.55 * r - u * 0.16 * r);
    } else if (p < 0.7) {
      // Three fins around the base.
      const a = (Math.floor(rand(0, 3)) / 3) * Math.PI * 2 + Math.PI / 6;
      const out = Math.random();
      const rad = R0 + out * 0.3 * r;
      const y = -0.62 * r + Math.random() * (0.5 * r) * (1 - out);
      v = [Math.cos(a) * rad, y, Math.sin(a) * rad];
    } else if (p < 0.74) {
      const a = rand(0, Math.PI * 2); // porthole
      v = [Math.cos(a) * 0.1 * r, 0.22 * r + Math.sin(a) * 0.1 * r, R0 + 0.01 * r];
    } else {
      // Exhaust plume: phase runs downward, so pulses stream out like thrust.
      const t = Math.random();
      const spread = (0.1 + 0.32 * t) * r * Math.sqrt(Math.random());
      const a = rand(0, Math.PI * 2);
      v = [Math.cos(a) * spread, -0.72 * r - t * 0.95 * r, Math.sin(a) * spread];
      ph = t;
    }
    const c = Math.cos(lean);
    const sn = Math.sin(lean);
    return [[v[0] * c - v[1] * sn, v[0] * sn + v[1] * c + lift, v[2]], ph];
  });
}

function halo(count: number, r: number) {
  return make(count, () => {
    const a = rand(0, Math.PI * 2);
    const k = r * (1 + Math.abs(rand(-1, 1)) ** 3 * 0.35 * Math.sign(rand()));
    return [[Math.cos(a) * k, Math.sin(a) * k, rand(-0.25, 0.25)], -1];
  });
}

/* ------------------------------------------- Aliveo: neural network */

function network(count: number, r: number) {
  const layers = [4, 6, 6, 3];
  const W = r * 1.75;
  const gap = r * 0.31;
  const nodes: Vec[][] = layers.map((n, li) =>
    Array.from({ length: n }, (_, k): Vec => [
      -W / 2 + (li * W) / (layers.length - 1),
      (k - (n - 1) / 2) * gap,
      Math.sin(k * 1.7 + li) * 0.12 * r,
    ]),
  );
  const edges: [Vec, Vec][] = [];
  for (let li = 0; li < layers.length - 1; li++)
    for (const a of nodes[li]) for (const b of nodes[li + 1]) edges.push([a, b]);
  const all = nodes.flat();

  return make(count, () => {
    if (Math.random() < 0.38) return [blob(pick(all), 0.075 * r), -1];
    const [a, b] = pick(edges);
    const t = Math.random();
    // Phase follows the edge, so pulses travel from input to output.
    return [along(a, b, t, 0.01 * r), (a[0] + (b[0] - a[0]) * t + W / 2) / W];
  });
}

/* ---------------------------------------- WhatsApp: chat bubble */

function bubble(count: number, r: number) {
  const w = r * 1.95;
  const h = r * 1.25;
  const cr = r * 0.34;
  const lift = r * 0.2;
  const sx = w / 2 - cr;
  const sy = h / 2 - cr;
  // Perimeter of a rounded rectangle: 4 straight runs + 4 quarter circles.
  const straightX = 2 * sx;
  const straightY = 2 * sy;
  const arc = (Math.PI / 2) * cr;
  const perim = 2 * straightX + 2 * straightY + 4 * arc;

  const outline = (): Vec => {
    let d = Math.random() * perim;
    const segs: [number, (u: number) => [number, number]][] = [
      [straightX, (u) => [-sx + u, h / 2]],
      [arc, (u) => [sx + Math.sin((u / cr) * 1) * cr, sy + Math.cos(u / cr) * cr]],
      [straightY, (u) => [w / 2, sy - u]],
      [arc, (u) => [sx + Math.cos(u / cr) * cr, -sy - Math.sin(u / cr) * cr]],
      [straightX, (u) => [sx - u, -h / 2]],
      [arc, (u) => [-sx - Math.sin(u / cr) * cr, -sy - Math.cos(u / cr) * cr]],
      [straightY, (u) => [-w / 2, -sy + u]],
      [arc, (u) => [-sx - Math.cos(u / cr) * cr, sy + Math.sin(u / cr) * cr]],
    ];
    for (const [len, f] of segs) {
      if (d <= len) {
        const [x, y] = f(d);
        return [x + rand(-0.02, 0.02) * r, y + lift + rand(-0.02, 0.02) * r, rand(-0.06, 0.06) * r];
      }
      d -= len;
    }
    return [0, lift, 0];
  };

  // Tail at the bottom-left corner.
  const t0: Vec = [-w / 2 + 0.5 * r, -h / 2 + lift, 0];
  const t1: Vec = [-w / 2 + 0.08 * r, -h / 2 - 0.4 * r + lift, 0];
  const t2: Vec = [-w / 2 + 0.85 * r, -h / 2 + lift, 0];
  const dots: Vec[] = [-0.48, 0, 0.48].map((x): Vec => [x * r, lift, 0]);

  return make(count, () => {
    const p = Math.random();
    if (p < 0.58) return [outline(), -1];
    if (p < 0.68) return [Math.random() < 0.5 ? along(t0, t1, Math.random(), 0.015 * r) : along(t1, t2, Math.random(), 0.015 * r), -1];
    const k = Math.floor(Math.random() * 3);
    // Each typing dot gets its own phase so they light up one after another.
    return [blob(dots[k], 0.13 * r), k * 0.15];
  });
}

/* ------------------------------------- ERP: hub and franchise network */

function hub(count: number, r: number) {
  const stores = 18;
  const ringR = r * 0.95;
  const centre: Vec = [0, 0, 0];
  const nodes: Vec[] = Array.from({ length: stores }, (_, i): Vec => {
    const a = (i / stores) * Math.PI * 2;
    return [Math.cos(a) * ringR, Math.sin(i * 2.1) * 0.12 * r, Math.sin(a) * ringR];
  });

  return make(count, () => {
    const p = Math.random();
    if (p < 0.22) return [blob(centre, 0.3 * r), -1];
    if (p < 0.44) return [blob(pick(nodes), 0.07 * r), -1];
    if (p < 0.92) {
      // Spokes: phase runs outward, so pulses flow from the hub to each store.
      const t = Math.random();
      return [along(centre, pick(nodes), 0.18 + t * 0.82, 0.01 * r), t];
    }
    const i = Math.floor(Math.random() * stores);
    return [along(nodes[i], nodes[(i + 1) % stores], Math.random(), 0.01 * r), -1];
  });
}

/* --------------------------------------------------------------- build */

export function buildShape(name: ShapeName, count: number, ctx: Ctx): ShapeResult {
  const { vw, vh, mobile, font } = ctx;
  const r = mobile ? Math.min(vw * 0.36, vh * 0.2) : Math.min(vw * 0.16, vh * 0.23);

  switch (name) {
    case "name":
      return text(["ABHINAV", "TADEPALLI"], count, mobile ? vw * 0.86 : Math.min(vw * 0.62, 9.5), font, vh * 0.06);
    case "experience":
      return text(["EXPERIENCE"], count, mobile ? vw * 0.9 : Math.min(vw * 0.66, 10), font, vh * 0.08);
    case "projects":
      return text(["PROJECTS"], count, mobile ? vw * 0.85 : Math.min(vw * 0.56, 8.5), font, vh * 0.08);
    case "hello":
      return text(["SAY", "HELLO"], count, mobile ? vw * 0.75 : Math.min(vw * 0.36, 5.5), font, mobile ? vh * 0.22 : vh * 0.16);
    case "sphere":
      return sphere(count, r);
    case "globe":
      return globe(count, r);
    case "rocket":
      return rocket(count, mobile ? r * 0.95 : r * 1.05);
    case "halo":
      return halo(count, mobile ? vw * 0.46 : Math.min(vw, vh) * 0.42);
    case "network":
      return network(count, mobile ? r * 0.95 : r);
    case "bubble":
      return bubble(count, mobile ? r * 0.95 : r);
    case "hub":
      return hub(count, r);
  }
}
