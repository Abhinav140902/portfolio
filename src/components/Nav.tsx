"use client";

import { Command, Download } from "lucide-react";
import { useChapter } from "@/lib/chapters";
import { CHAPTER_ORDER } from "@/lib/chapterList";
import { OPEN_PALETTE_EVENT } from "./CommandPalette";
import { scrollToId } from "./Providers";
import { profile } from "@/data/content";

export default function Nav() {
  const active = useChapter();
  const index = CHAPTER_ORDER.findIndex((c) => c.id === active.id);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
        <button onClick={() => scrollToId("top")} className="flex items-center gap-3" aria-label="Back to top">
          <span className="grid h-9 w-9 place-items-center rounded-full border border-line-strong bg-bg/50 font-display text-sm font-semibold backdrop-blur">
            AT
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-muted sm:inline">
            <span className="text-fg">{String(Math.max(index, 0)).padStart(2, "0")}</span> / {active.label}
          </span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT))}
            className="flex items-center gap-1.5 rounded-full border border-line-strong bg-bg/50 px-3.5 py-2 font-mono text-xs text-muted backdrop-blur transition-colors hover:text-fg"
            aria-label="Open command menu"
          >
            <Command size={13} />
            <span className="hidden sm:inline">K</span>
          </button>
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener"
            className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-xs font-medium text-bg transition-opacity hover:opacity-90"
          >
            <Download size={13} /> Resume
          </a>
        </div>
      </nav>
    </header>
  );
}
