"use client";

import { MotionConfig } from "framer-motion";
import Lenis from "lenis";
import { useEffect } from "react";
import CommandPalette from "./CommandPalette";
import Cursor from "./Cursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  // Smooth, inertial scrolling (skipped for people who prefer reduced motion).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, anchors: { offset: 0 } });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {children}
      <CommandPalette />
      <Cursor />
    </MotionConfig>
  );
}

export { scrollToId } from "@/lib/scroll";
