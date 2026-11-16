"use client";

import { Command } from "cmdk";
import { ArrowRight, Copy, Download, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { CHAPTER_ORDER } from "@/lib/chapterList";
import { scrollToId } from "@/lib/scroll";

export const OPEN_PALETTE_EVENT = "open-command-palette";

const sections = CHAPTER_ORDER.map((c) => ({ id: c.id, label: c.label }));

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  const run = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  const itemClass =
    "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted data-[selected=true]:bg-white/5 data-[selected=true]:text-fg";

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      overlayClassName="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
      contentClassName="fixed left-1/2 top-[18vh] z-[61] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-surface shadow-2xl"
    >
      <Command.Input
        placeholder="Jump to a section, copy email, download resume…"
        className="w-full border-b border-line bg-transparent px-4 py-4 text-sm text-fg outline-none placeholder:text-muted focus-visible:outline-none"
      />
      <Command.List className="max-h-80 overflow-y-auto p-2">
        <Command.Empty className="px-3 py-6 text-center text-sm text-muted">No results.</Command.Empty>

        <Command.Group heading="Navigate" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted">
          {sections.map((s) => (
            <Command.Item
              key={s.id}
              value={s.label}
              className={itemClass}
              onSelect={() => run(() => scrollToId(s.id))}
            >
              <ArrowRight size={15} /> {s.label}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Actions" className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-muted">
          <Command.Item
            value="Copy email"
            className={itemClass}
            onSelect={() => {
              navigator.clipboard?.writeText(profile.email);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
                setOpen(false);
              }, 700);
            }}
          >
            <Copy size={15} /> {copied ? "Copied!" : "Copy email"}
          </Command.Item>
          <Command.Item value="Send email" className={itemClass} onSelect={() => run(() => (window.location.href = `mailto:${profile.email}`))}>
            <Mail size={15} /> Send an email
          </Command.Item>
          <Command.Item value="Download resume" className={itemClass} onSelect={() => run(() => window.open(profile.resume, "_blank"))}>
            <Download size={15} /> Download resume
          </Command.Item>
          <Command.Item value="GitHub" className={itemClass} onSelect={() => run(() => window.open(profile.github, "_blank"))}>
            <Github size={15} /> GitHub
          </Command.Item>
          <Command.Item value="LinkedIn" className={itemClass} onSelect={() => run(() => window.open(profile.linkedin, "_blank"))}>
            <Linkedin size={15} /> LinkedIn
          </Command.Item>
        </Command.Group>
      </Command.List>
      <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[11px] text-muted">
        <span>↑↓ to move · ↵ to select</span>
        <span>esc to close</span>
      </div>
    </Command.Dialog>
  );
}
