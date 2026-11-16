"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, BookOpen, Check, Copy, Download, Github, GraduationCap, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { about, earlier, profile, type Metric, type ProjectInfo, type Role } from "@/data/content";
import { CHAPTERS } from "@/lib/chapterList";
import Chapter, { ChapterTag } from "./Chapter";
import { Magnetic, Rich, Rise, Scramble } from "./fx";
import { scrollToId } from "./Providers";
import SkillOrbit from "./SkillOrbit";

const shell = "mx-auto w-full max-w-7xl px-5 md:px-10 lg:pr-40";
const shellCenter = "mx-auto w-full max-w-7xl px-5 md:px-10";

/* ------------------------------------------------------------------ Hero */

export function Hero() {
  return (
    <Chapter info={CHAPTERS.top} className="items-end pb-10 md:pb-16">
      <div className={`${shell} flex flex-col gap-10 md:flex-row md:items-end md:justify-between`}>
        <div className="max-w-3xl">
          {/* The particles spell the name visually; this keeps it readable for search engines and screen readers. */}
          <h1 className="sr-only">
            {profile.name}, software engineer
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Engineer · Builder · India
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-[2.1rem] font-medium leading-[1.08] tracking-tight md:text-5xl"
          >
            <span className="md:whitespace-nowrap">Software engineer turning ideas</span>{" "}
            <br className="hidden md:block" />
            <span className="md:whitespace-nowrap">
              into <span className="font-serif font-normal italic text-accent">systems that run every day.</span>
            </span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <button
              onClick={() => scrollToId("experience")}
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg"
            >
              See my work <ArrowDown size={15} className="transition-transform group-hover:translate-y-0.5" />
            </button>
          </Magnetic>
          <Magnetic>
            <a
              href={profile.resume}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/40 px-6 py-3.5 text-sm font-medium text-fg backdrop-blur"
            >
              Resume <Download size={15} />
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1.2 }}
        className="pointer-events-none absolute left-1/2 top-[18%] -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted/70 md:top-[14%]"
      >
        <span className="hidden md:inline">move through the name</span>
        <span className="md:hidden">touch the name</span>
      </motion.p>
    </Chapter>
  );
}

/* ----------------------------------------------------------------- About */

function Photo() {
  const ref = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const img = ref.current;
    if (img?.complete && img.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <div className="group relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line bg-surface">
      {!loaded && (
        <span className="absolute inset-0 flex items-center justify-center font-serif text-7xl italic text-accent">AT</span>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={profile.photo}
        alt={profile.name}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition duration-700 group-hover:scale-[1.03] md:grayscale md:group-hover:grayscale-0 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent" />
      <p className="absolute bottom-5 left-5 font-mono text-[11px] uppercase tracking-widest text-fg/80">{profile.name}</p>
    </div>
  );
}

export function About() {
  return (
    <Chapter info={CHAPTERS.about} className="py-28">
      <div className={`${shell} grid items-center gap-12 md:grid-cols-12`}>
        <div className="md:col-span-7">
          <ChapterTag id="about" kicker="About" />
          <h2 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-7xl">
            <Scramble text="Hello, I'm" /> <span className="font-serif font-normal italic text-accent">Abhinav.</span>
          </h2>
          {about.bio.map((p, i) => (
            <Rise key={i} delay={0.1 + i * 0.1}>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/80 md:text-xl">
                <Rich text={p} />
              </p>
            </Rise>
          ))}

          <Rise delay={0.3} className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur">
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                <GraduationCap size={14} /> Education
              </p>
              <p className="mt-3 font-medium">{about.education.school}</p>
              <p className="mt-1 text-sm text-muted">{about.education.degree}</p>
              <p className="mt-1 font-mono text-xs text-muted">{about.education.detail}</p>
            </div>
            <a
              href={about.publication.url}
              target="_blank"
              rel="noopener"
              className="group rounded-2xl border border-line bg-surface/60 p-5 backdrop-blur transition-colors hover:border-line-strong"
            >
              <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-accent">
                <BookOpen size={14} /> Publication · {about.publication.venue}
              </p>
              <p className="mt-3 font-medium leading-snug">{about.publication.title}</p>
              <p className="mt-2 inline-flex items-center gap-1 font-mono text-xs text-muted group-hover:text-fg">
                Read on IEEE Xplore <ArrowUpRight size={12} />
              </p>
            </a>
          </Rise>
        </div>

        <Rise delay={0.15} className="mx-auto w-full max-w-sm md:col-span-5 md:max-w-none">
          <Photo />
        </Rise>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------ Shared pieces */

function Metrics({ items }: { items: Metric[] }) {
  return (
    <div className="mt-10 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-8">
      {items.map((m) => (
        <div key={m.label}>
          <p className="font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">{m.value}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{m.label}</p>
        </div>
      ))}
    </div>
  );
}

function Stack({ items }: { items: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {items.map((s) => (
        <span key={s} className="rounded-full border border-line bg-bg/40 px-3 py-1 font-mono text-[11px] text-muted backdrop-blur">
          {s}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------ Group titles */

/** A title screen between groups of chapters; the particles spell the group name. */
export function GroupTitle({
  id,
  kicker,
  line,
  accent,
}: {
  id: "experience" | "projects";
  kicker: string;
  line: string;
  accent: string;
}) {
  return (
    <Chapter info={CHAPTERS[id]} className="items-end pb-[18vh]">
      <div className={`${shellCenter} text-center`}>
        <h2 className="sr-only">{CHAPTERS[id].label}</h2>
        <Rise>
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted">{kicker}</p>
        </Rise>
        <Rise delay={0.1}>
          <p className="mx-auto mt-4 max-w-3xl font-display text-2xl font-medium tracking-tight md:text-4xl">
            {line} <span className="font-serif font-normal italic text-accent">{accent}</span>
          </p>
        </Rise>
      </div>
    </Chapter>
  );
}

/* --------------------------------------------------------- Experience */

export function RoleChapter({ role, flip }: { role: Role; flip?: boolean }) {
  const info = CHAPTERS[role.id as "aliveo" | "matrack"];
  return (
    <Chapter info={info} className="py-28">
      <div className={shell}>
        <div className={`md:w-[62%] ${flip ? "md:ml-auto" : ""}`}>
          <ChapterTag id={role.id} kicker="Experience" />
          <h2 className="mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight md:text-8xl">
            <Scramble text={role.company} />
          </h2>
          <Rise delay={0.1}>
            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted">
              <span className="text-fg">{role.role}</span>
              <span className="text-line-strong">/</span>
              {role.period}
              <span className="text-line-strong">/</span>
              {role.location}
            </p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg/75">{role.intro}</p>
          </Rise>

          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {role.themes.map((t, i) => (
              <Rise key={t.title} delay={0.1 + i * 0.07}>
                <p className="font-mono text-[11px] uppercase tracking-widest text-fg">
                  <span className="mr-2 text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {t.title}
                </p>
                <p className="mt-3 leading-relaxed text-muted">
                  <Rich text={t.body} />
                </p>
              </Rise>
            ))}
          </div>

          <Rise delay={0.2}>
            <Metrics items={role.metrics} />
            <Stack items={role.stack} />
          </Rise>
        </div>
      </div>
    </Chapter>
  );
}

export function Earlier() {
  return (
    <Chapter info={CHAPTERS.earlier} className="py-28">
      <div className={shell}>
        <div className="md:w-[58%]">
          <ChapterTag id="earlier" kicker="Experience" />
          <h2 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-7xl">
            <Scramble text="Where it started" />
          </h2>
          <div className="mt-12 space-y-5">
            {earlier.map((e, i) => (
              <Rise key={e.company} delay={0.1 + i * 0.1}>
                <div className="rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur md:p-8">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">{e.company}</h3>
                    <p className="font-mono text-xs text-muted">{e.period}</p>
                  </div>
                  <p className="mt-1 font-mono text-xs text-muted">
                    {e.role} · {e.location}
                  </p>
                  <p className="mt-4 leading-relaxed text-fg/75">
                    <Rich text={e.body} />
                  </p>
                </div>
              </Rise>
            ))}
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/* ----------------------------------------------------------- Projects */

export function ProjectChapter({ project, flip }: { project: ProjectInfo; flip?: boolean }) {
  const info = CHAPTERS[project.id as "whatsapp" | "erp"];
  return (
    <Chapter info={info} className="py-28">
      <div className={shell}>
        <div className={`md:w-[60%] ${flip ? "md:ml-auto" : ""}`}>
          <ChapterTag id={project.id} kicker={`Project · ${project.kicker}`} />
          <h2 className="mt-6 font-display text-5xl font-semibold leading-[0.95] tracking-tight md:text-7xl">
            <Scramble text={project.title} />
          </h2>
          <Rise delay={0.1}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/75">{project.intro}</p>
          </Rise>
          <ul className="mt-8 space-y-4">
            {project.points.map((p, i) => (
              <Rise key={p} delay={0.15 + i * 0.07}>
                <li className="flex gap-4 leading-relaxed text-muted">
                  <span className="mt-1 font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <Rich text={p} />
                  </span>
                </li>
              </Rise>
            ))}
          </ul>
          <Rise delay={0.2}>
            <Metrics items={project.metrics} />
            <Stack items={project.stack} />
          </Rise>
        </div>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------- Skills */

export function Skills() {
  return (
    <Chapter info={CHAPTERS.skills} className="py-28">
      <div className={`${shellCenter} text-center`}>
        <div className="flex justify-center">
          <ChapterTag id="skills" kicker="Toolbox" />
        </div>
        <h2 className="mt-6 font-display text-5xl font-semibold tracking-tight md:text-7xl">
          <Scramble text="What I work with" />
        </h2>
        <Rise delay={0.15} className="mt-6">
          <SkillOrbit />
        </Rise>
      </div>
    </Chapter>
  );
}

/* ------------------------------------------------------------ Contact */

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <Chapter info={CHAPTERS.contact} className="items-end pb-8">
      <div className={`${shellCenter} w-full`}>
        <div className="flex flex-col items-center text-center">
          <ChapterTag id="contact" kicker="Contact" />
          <Rise delay={0.1}>
            <p className="mt-6 max-w-2xl font-display text-3xl font-medium leading-tight tracking-tight md:text-5xl">
              Have a role or a project in mind? <span className="font-serif font-normal italic text-accent">Let&apos;s talk.</span>
            </p>
          </Rise>
          <Rise delay={0.2} className="mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {/* The address is never rendered; it's only used when someone clicks. */}
            <Magnetic>
              <button
                onClick={() => (window.location.href = `mailto:${profile.email}`)}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg"
              >
                <Mail size={15} /> Email me
              </button>
            </Magnetic>
            <button
              onClick={copy}
              aria-label="Copy email address"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/40 px-5 py-3.5 text-sm backdrop-blur"
            >
              {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
              {copied ? (
                "Copied"
              ) : (
                <>
                  Copy<span className="hidden sm:inline"> email</span>
                </>
              )}
            </button>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener"
                aria-label="LinkedIn"
                className="inline-flex rounded-full border border-line-strong bg-bg/40 p-3.5 backdrop-blur"
              >
                <Linkedin size={17} />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener"
                aria-label="GitHub"
                className="inline-flex rounded-full border border-line-strong bg-bg/40 p-3.5 backdrop-blur"
              >
                <Github size={17} />
              </a>
            </Magnetic>
          </Rise>
        </div>

        <footer className="mt-24 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[11px] text-muted sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <button onClick={() => scrollToId("top")} className="text-left transition-colors hover:text-fg sm:text-right">
            Back to top ↑
          </button>
        </footer>
      </div>
    </Chapter>
  );
}
