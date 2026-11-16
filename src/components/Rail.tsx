"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect } from "react";
import { useChapter } from "@/lib/chapters";
import { CHAPTER_ORDER } from "@/lib/chapterList";
import { scrollToId } from "./Providers";

/** Chapter index on the right edge (desktop) and a progress line on top (mobile). J / K jump between chapters. */
export default function Rail() {
  const active = useChapter();
  const { scrollYProgress } = useScroll();
  const index = CHAPTER_ORDER.findIndex((c) => c.id === active.id);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, [cmdk-root]") || e.metaKey || e.ctrlKey) return;
      const key = e.key.toLowerCase();
      if (key !== "j" && key !== "k") return;
      const next = CHAPTER_ORDER[Math.min(CHAPTER_ORDER.length - 1, Math.max(0, index + (key === "j" ? 1 : -1)))];
      scrollToId(next.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index]);

  return (
    <>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-px origin-left bg-gradient-to-r from-accent to-amber lg:hidden"
      />
      <nav aria-label="Chapters" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
        <ol className="flex flex-col items-end gap-3">
          {CHAPTER_ORDER.map((c, i) => {
            const on = c.id === active.id;
            return (
              <li key={c.id}>
                <button
                  onClick={() => scrollToId(c.id)}
                  className="group flex items-center gap-3 py-0.5"
                  aria-current={on ? "true" : undefined}
                  aria-label={`Go to ${c.label}`}
                >
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                      on ? "text-fg opacity-100" : "translate-x-2 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    }`}
                  >
                    {c.label}
                  </span>
                  <span className="font-mono text-[10px] text-muted">{String(i).padStart(2, "0")}</span>
                  <span
                    className={`h-px transition-all duration-500 ${on ? "w-8 bg-accent" : "w-3 bg-line-strong group-hover:w-5"}`}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
