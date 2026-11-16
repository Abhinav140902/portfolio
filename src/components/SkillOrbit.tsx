"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { skillGroups, skills, type Skill } from "@/data/content";

const colorOf = Object.fromEntries(skillGroups.map((g) => [g.group, g.color]));

/** Skills as real text labels on a rotating 3D sphere. Drag to spin, hover or tap a skill for details. */
export default function SkillOrbit() {
  const wrap = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<Skill | null>(null);
  const state = useRef({ rx: -0.3, ry: 0, vy: 0.0035, vx: 0, drag: false, lx: 0, ly: 0, paused: false, radius: 200 });

  // Evenly spread points on a unit sphere.
  const points = useMemo(() => {
    const n = skills.length;
    const golden = Math.PI * (3 - Math.sqrt(5));
    return skills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      return [Math.cos(golden * i) * r, y, Math.sin(golden * i) * r];
    });
  }, []);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      state.current.radius = e.contentRect.width * (e.contentRect.width < 480 ? 0.42 : 0.38);
    });
    ro.observe(el);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    const loop = () => {
      const s = state.current;
      if (!s.drag) {
        if (!s.paused && !reduced) s.ry += s.vy;
        s.vy += (0.0035 - s.vy) * 0.02; // settle back to the idle spin
        s.rx += s.vx;
        s.vx *= 0.92;
        s.rx = Math.max(-1.1, Math.min(1.1, s.rx));
      }
      const cy = Math.cos(s.ry);
      const sy = Math.sin(s.ry);
      const cx = Math.cos(s.rx);
      const sx = Math.sin(s.rx);
      points.forEach(([x, y, z], i) => {
        const node = nodes.current[i];
        if (!node) return;
        const x1 = x * cy + z * sy;
        const z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx;
        const z2 = y * sx + z1 * cx;
        const depth = (z2 + 1) / 2;
        node.style.transform = `translate3d(${x1 * s.radius}px, ${y2 * s.radius}px, 0) translate(-50%, -50%) scale(${0.62 + depth * 0.55})`;
        node.style.opacity = String(0.18 + depth * 0.82);
        node.style.zIndex = String(Math.round(depth * 100));
        node.style.filter = depth < 0.3 ? "blur(1.5px)" : "none";
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [points]);

  const s = state.current;

  return (
    <div className="w-full">
      <div
        ref={wrap}
        data-cursor
        className="relative mx-auto aspect-square w-full max-w-[600px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
        onPointerDown={(e) => {
          s.drag = true;
          s.lx = e.clientX;
          s.ly = e.clientY;
        }}
        onPointerMove={(e) => {
          if (!s.drag) return;
          const dx = e.clientX - s.lx;
          const dy = e.clientY - s.ly;
          s.lx = e.clientX;
          s.ly = e.clientY;
          s.ry += dx * 0.006;
          s.rx += dy * 0.006;
          s.vy = dx * 0.006;
          s.vx = dy * 0.002;
        }}
        onPointerUp={() => (s.drag = false)}
        onPointerCancel={() => (s.drag = false)}
        onPointerLeave={() => (s.drag = false)}
      >
        <div className="absolute left-1/2 top-1/2">
          {skills.map((skill, i) => (
            <button
              key={skill.name}
              ref={(n) => {
                nodes.current[i] = n;
              }}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                s.paused = true;
                setActive(skill);
              }}
              onPointerLeave={(e) => {
                if (e.pointerType !== "mouse") return;
                s.paused = false;
                setActive(null);
              }}
              onClick={() => setActive((a) => (a?.name === skill.name ? null : skill))}
              onFocus={() => setActive(skill)}
              className="absolute left-0 top-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-surface/80 px-2 py-0.5 text-[10px] text-fg backdrop-blur sm:gap-2 sm:px-3 sm:py-1.5 sm:text-xs md:text-sm"
              style={{ borderColor: `${colorOf[skill.group]}55`, willChange: "transform, opacity" }}
            >
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: colorOf[skill.group] }} />
              {skill.name}
            </button>
          ))}
        </div>
      </div>

      {/* Details for the hovered / tapped skill */}
      <div className="mx-auto mt-6 h-14 max-w-md text-center" aria-live="polite">
        {active ? (
          <>
            <p className="font-display text-xl font-semibold" style={{ color: colorOf[active.group] }}>
              {active.name}
            </p>
            <p className="mt-1 font-mono text-xs text-muted">
              {active.group}
              {active.usedAt?.length ? ` · used at ${active.usedAt.join(", ")}` : ""}
            </p>
          </>
        ) : (
          <p className="pt-3 font-mono text-xs text-muted">drag to spin · hover or tap a skill</p>
        )}
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
        {skillGroups.map((g) => (
          <span key={g.group} className="flex items-center gap-2 font-mono text-[11px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: g.color }} />
            {g.group}
          </span>
        ))}
      </div>
    </div>
  );
}
