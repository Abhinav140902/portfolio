"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import type { ShapeName } from "./shapes";

export type Side = "center" | "left" | "right";

export type ChapterInfo = {
  id: string;
  label: string;
  shape: ShapeName;
  side: Side;
  /** Particle brightness while this chapter is active (0–1). */
  dim: number;
};

// A tiny global store: which chapter is on screen right now.
let current: ChapterInfo = { id: "top", label: "Intro", shape: "name", side: "center", dim: 1 };
const listeners = new Set<() => void>();
const registry: ChapterInfo[] = [];

function setChapter(next: ChapterInfo) {
  if (next.id === current.id) return;
  current = next;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

export function useChapter() {
  return useSyncExternalStore(subscribe, () => current, () => current);
}

export function getChapters() {
  return registry;
}

/** Registers a full-screen chapter and makes it the active one while it fills most of the viewport. */
export function useChapterSection<T extends HTMLElement>(info: ChapterInfo) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!registry.some((c) => c.id === info.id)) registry.push(info);
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setChapter(info);
      },
      // Fires when the chapter crosses the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.id]);

  return ref;
}
