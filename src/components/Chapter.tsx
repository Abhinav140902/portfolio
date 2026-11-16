"use client";

import { useChapterSection, type ChapterInfo } from "@/lib/chapters";
import { CHAPTER_ORDER } from "@/lib/chapterList";

/** A full-screen chapter that tells the particle field which shape to form. */
export default function Chapter({
  info,
  children,
  className = "",
}: {
  info: ChapterInfo;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useChapterSection<HTMLElement>(info);
  return (
    <section ref={ref} id={info.id} className={`relative z-10 flex min-h-[100svh] w-full items-center ${className}`}>
      {children}
    </section>
  );
}

export function ChapterTag({ id, kicker }: { id: string; kicker: string }) {
  const n = CHAPTER_ORDER.findIndex((c) => c.id === id);
  return (
    <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">
      <span className="text-accent">{String(n).padStart(2, "0")}</span>
      <span className="mx-3 inline-block h-px w-8 translate-y-[-3px] bg-line-strong" />
      {kicker}
    </p>
  );
}
