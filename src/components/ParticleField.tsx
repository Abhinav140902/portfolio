"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useChapter } from "@/lib/chapters";
import { buildShape, SHAPE_META } from "@/lib/shapes";

// Ashima Arts 3D simplex noise (MIT).
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uProgress;
uniform vec3 uMouse;
uniform float uSize;
uniform float uPixelRatio;
uniform float uMotion;
uniform float uPulse;
attribute vec3 aFrom;
attribute vec3 aTo;
attribute float aDelay;
attribute float aRand;
attribute float aScale;
attribute float aPhase;
varying float vRand;
varying float vGlow;
${NOISE}
float ease(float t){ return t < 0.5 ? 4.0*t*t*t : 1.0 - pow(-2.0*t + 2.0, 3.0) / 2.0; }
void main(){
  float local = clamp((uProgress - aDelay * 0.35) / 0.65, 0.0, 1.0);
  vec3 pos = mix(aFrom, aTo, ease(local));

  // Gentle drift at rest, a big swirl mid-morph.
  float swirl = sin(3.14159 * local);
  float t = uTime * 0.12;
  vec3 n = vec3(
    snoise(pos * 0.45 + vec3(t, 0.0, 0.0)),
    snoise(pos * 0.45 + vec3(0.0, t + 17.0, 0.0)),
    snoise(pos * 0.45 + vec3(0.0, 0.0, t + 31.0))
  );
  pos += n * (0.035 + swirl * 1.1) * uMotion;

  // Push particles away from the cursor.
  vec4 world = modelMatrix * vec4(pos, 1.0);
  vec2 dir = world.xy - uMouse.xy;
  float d = length(dir);
  float push = smoothstep(1.25, 0.0, d);
  world.xy += normalize(dir + 0.0001) * push * 0.7;
  world.z += push * 0.6;

  vec4 mv = viewMatrix * world;
  gl_Position = projectionMatrix * mv;
  // Travelling pulses (signals along edges, typing dots), faded out mid-morph.
  float wave = aPhase < 0.0 ? 0.0 : pow(0.5 + 0.5 * sin(uTime * 2.4 - aPhase * 6.2832), 6.0);
  float pulse = wave * uPulse * (1.0 - swirl);
  gl_PointSize = uSize * aScale * uPixelRatio * (7.0 / -mv.z) * (1.0 + pulse * 0.7);
  vRand = aRand;
  vGlow = max(push, pulse);
}`;

const fragmentShader = /* glsl */ `
uniform float uOpacity;
uniform vec3 uAccent;
uniform vec3 uWarm;
varying float vRand;
varying float vGlow;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = smoothstep(0.5, 0.05, d);
  vec3 base = vec3(0.84, 0.87, 0.92);
  vec3 col = vRand > 0.9 ? uAccent : (vRand > 0.85 ? uWarm : base);
  col = mix(col, uAccent, vGlow * 0.8);
  gl_FragColor = vec4(col, a * uOpacity * (0.72 + vGlow * 0.5));
}`;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

type ParticlesProps = { count: number; mobile: boolean; reduced: boolean; font: string };

function Particles({ count, mobile, reduced, font }: ParticlesProps) {
  const chapter = useChapter();
  const viewport = useThree((s) => s.viewport);
  const group = useRef<THREE.Group>(null);
  const geo = useRef<THREE.BufferGeometry>(null);
  const progress = useRef(1);
  const pulseTarget = useRef(0);
  const mouse = useRef({ x: 999, y: 999, tx: 999, ty: 999, ndcY: 0 });

  const attrs = useMemo(() => {
    const from = new Float32Array(count * 3);
    const to = new Float32Array(count * 3);
    const delay = new Float32Array(count);
    const rnd = new Float32Array(count);
    const scale = new Float32Array(count);
    const phase = new Float32Array(count).fill(-1);
    for (let i = 0; i < count; i++) {
      // Start as a wide cloud so the first shape "assembles" on load.
      from[i * 3] = (Math.random() - 0.5) * 20;
      from[i * 3 + 1] = (Math.random() - 0.5) * 12;
      from[i * 3 + 2] = (Math.random() - 0.5) * 8;
      delay[i] = Math.random();
      rnd[i] = Math.random();
      scale[i] = 0.5 + Math.random() * 0.9;
    }
    to.set(from);
    return { from, to, delay, rnd, scale, phase };
  }, [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 1 },
      uMouse: { value: new THREE.Vector3(999, 999, 0) },
      uSize: { value: mobile ? 2.3 : 2.6 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uMotion: { value: reduced ? 0 : 1 },
      uPulse: { value: 0 },
      uOpacity: { value: 0 },
      uAccent: { value: new THREE.Color("#7cf5c4") },
      uWarm: { value: new THREE.Color("#ffb86b") },
    }),
    [mobile, reduced],
  );

  // Morph to the active chapter's shape (and re-fit when the viewport changes).
  useEffect(() => {
    const g = geo.current;
    if (!g) return;
    const p = progress.current;
    const { from, to, delay } = attrs;
    // Freeze wherever the particles are right now and use that as the new start.
    for (let i = 0; i < count; i++) {
      const e = easeInOut(Math.min(1, Math.max(0, (p - delay[i] * 0.35) / 0.65)));
      for (let k = 0; k < 3; k++) {
        const j = i * 3 + k;
        from[j] = from[j] + (to[j] - from[j]) * e;
      }
    }
    const shape = buildShape(chapter.shape, count, { vw: viewport.width, vh: viewport.height, mobile, font });
    to.set(shape.pos);
    attrs.phase.set(shape.phase);
    // On phones the shapes sit behind text, so keep pulses subtle there.
    pulseTarget.current = reduced ? 0 : shape.pulse * (mobile ? 0.35 : 1);
    g.attributes.aFrom.needsUpdate = true;
    g.attributes.aTo.needsUpdate = true;
    g.attributes.aPhase.needsUpdate = true;
    progress.current = reduced ? 1 : 0;
  }, [chapter.shape, viewport.width, viewport.height, mobile, font, count, attrs, reduced]);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      mouse.current.tx = (nx * viewport.width) / 2;
      mouse.current.ty = (ny * viewport.height) / 2;
      mouse.current.ndcY = ny;
    };
    const leave = () => {
      mouse.current.tx = 999;
      mouse.current.ty = 999;
    };
    const up = (e: PointerEvent) => e.pointerType === "touch" && leave();
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.removeEventListener("pointerleave", leave);
    };
  }, [viewport.width, viewport.height]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const u = uniforms;
    u.uTime.value += dt;
    progress.current = Math.min(1, progress.current + dt / 1.8);
    u.uProgress.value = progress.current;

    const meta = SHAPE_META[chapter.shape];
    const targetOpacity = mobile && meta.motion !== "still" ? chapter.dim * 0.55 : chapter.dim;
    u.uOpacity.value += (targetOpacity - u.uOpacity.value) * 0.05;
    u.uPulse.value += (pulseTarget.current - u.uPulse.value) * 0.05;

    const m = mouse.current;
    if (m.tx > 500) {
      m.x = 999;
      m.y = 999;
    } else if (m.x > 500) {
      m.x = m.tx;
      m.y = m.ty;
    } else {
      m.x += (m.tx - m.x) * 0.15;
      m.y += (m.ty - m.y) * 0.15;
    }
    u.uMouse.value.set(m.x, m.y, 0);

    const gr = group.current;
    if (!gr) return;
    const side = chapter.side === "right" ? 1 : chapter.side === "left" ? -1 : 0;
    const targetX = mobile ? 0 : side * viewport.width * (side > 0 ? 0.215 : 0.3);
    gr.position.x += (targetX - gr.position.x) * 0.04;
    const turn = Math.round(gr.rotation.y / (Math.PI * 2)) * Math.PI * 2;
    if (meta.motion === "still" || reduced) {
      // Ease back to facing the camera so text stays readable.
      gr.rotation.y += (turn - gr.rotation.y) * 0.05;
      gr.rotation.x += (0 - gr.rotation.x) * 0.05;
    } else if (meta.motion === "sway") {
      // Flat shapes rock gently so they stay recognisable.
      gr.rotation.y += (turn + Math.sin(u.uTime.value * 0.45) * 0.45 - gr.rotation.y) * 0.04;
      gr.rotation.x += (-m.ndcY * 0.12 - gr.rotation.x) * 0.04;
    } else {
      gr.rotation.y += dt * 0.12;
      gr.rotation.x += ((meta.tilt ?? 0.25) - m.ndcY * 0.15 - gr.rotation.x) * 0.03;
    }
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry ref={geo}>
          <bufferAttribute attach="attributes-position" args={[attrs.to, 3]} />
          <bufferAttribute attach="attributes-aFrom" args={[attrs.from, 3]} />
          <bufferAttribute attach="attributes-aTo" args={[attrs.to, 3]} />
          <bufferAttribute attach="attributes-aDelay" args={[attrs.delay, 1]} />
          <bufferAttribute attach="attributes-aRand" args={[attrs.rnd, 1]} />
          <bufferAttribute attach="attributes-aScale" args={[attrs.scale, 1]} />
          <bufferAttribute attach="attributes-aPhase" args={[attrs.phase, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export default function ParticleField() {
  const [env, setEnv] = useState<{ mobile: boolean; reduced: boolean; font: string } | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const font =
      getComputedStyle(document.body).getPropertyValue("--font-bricolage").trim() || "Arial Black, Arial, sans-serif";
    // Load the display font first, otherwise the name gets sampled in a fallback font.
    const ready = () => setEnv({ mobile, reduced, font });
    document.fonts.load(`700 100px ${font}`).then(ready, ready);
  }, []);

  if (!env) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <Particles count={env.mobile ? 5000 : 10000} mobile={env.mobile} reduced={env.reduced} font={env.font} />
      </Canvas>
    </div>
  );
}
