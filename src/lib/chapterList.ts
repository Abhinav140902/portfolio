import type { ChapterInfo } from "./chapters";

// Order of the site's full-screen chapters, and the particle shape each one shows.
export const CHAPTERS = {
  top: { id: "top", label: "Intro", shape: "name", side: "center", dim: 1 },
  about: { id: "about", label: "About", shape: "sphere", side: "right", dim: 0.45 },
  experience: { id: "experience", label: "Experience", shape: "experience", side: "center", dim: 1 },
  aliveo: { id: "aliveo", label: "Aliveo AI", shape: "network", side: "right", dim: 0.75 },
  matrack: { id: "matrack", label: "Matrack", shape: "globe", side: "left", dim: 0.75 },
  earlier: { id: "earlier", label: "Earlier", shape: "rocket", side: "right", dim: 0.6 },
  projects: { id: "projects", label: "Projects", shape: "projects", side: "center", dim: 1 },
  whatsapp: { id: "whatsapp", label: "WhatsApp SaaS", shape: "bubble", side: "left", dim: 0.7 },
  erp: { id: "erp", label: "ERP Platform", shape: "hub", side: "right", dim: 0.7 },
  skills: { id: "skills", label: "Skills", shape: "halo", side: "center", dim: 0.45 },
  contact: { id: "contact", label: "Contact", shape: "hello", side: "center", dim: 1 },
} satisfies Record<string, ChapterInfo>;

export const CHAPTER_ORDER: ChapterInfo[] = Object.values(CHAPTERS);
