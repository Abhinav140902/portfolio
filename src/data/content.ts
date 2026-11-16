// All site copy lives here so it can be updated without touching components.
// Text wrapped in **double asterisks** is rendered as a highlighted keyword.

export const profile = {
  name: "Abhinav Tadepalli",
  first: "Abhinav",
  last: "Tadepalli",
  role: "Software Engineer · Backend / Full-Stack",
  tagline: "I build backend systems and AI agents that businesses rely on.",
  location: "India · Remote",
  email: "abhinav140902@gmail.com",
  github: "https://github.com/Abhinav140902",
  linkedin: "https://www.linkedin.com/in/abhinav-tadepalli-471574214/",
  resume: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/resume.pdf`,
  photo: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/profile.jpg`,
};

export const about = {
  bio: [
    "I spend most of my time in the backend: the queues, data models and APIs that everything else quietly depends on. Lately that means **AI agents**, and giving them the context, tools and guardrails to do real work safely.",
    "Over three years I've taken products from an empty repo to production: a **CRM serving 100K+ customers**, agent workflows for marketing teams, and systems small businesses run on every day.",
  ],
  education: {
    school: "Amrita Vishwa Vidyapeetham",
    degree: "B.Tech, Electrical and Computer Engineering",
    detail: "CGPA 9.3 / 10 · 2020 — 2024",
  },
  publication: {
    title: "Unlocking Democracy: A Blockchain Odyssey in E-Voting Systems",
    venue: "IEEE ASIANCON 2024",
    url: "https://doi.org/10.1109/ASIANCON62057.2024.10838111",
  },
};

export type Theme = { title: string; body: string };
export type Metric = { value: string; label: string };

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  intro: string;
  themes: Theme[];
  metrics: Metric[];
  stack: string[];
};

export const roles: Role[] = [
  {
    id: "aliveo",
    company: "Aliveo AI",
    role: "Backend Engineer",
    period: "Mar 2026 — Present",
    location: "Remote",
    intro: "Aliveo lets marketing teams ask questions of their data and have AI act on the answers. I work across the stack: Python underneath, React on top.",
    themes: [
      {
        title: "Agentic Workflows",
        body: "Rebuilt it **from the ground up**. Marketers set up a recurring analysis once; **LLM agents** run it on schedule, edit it through chat, and deliver the report.",
      },
      {
        title: "Conversational analytics",
        body: "Ask a question in the app or in **Slack** and watch the answer stream in. **Intent classification** and context inference work out what you meant; **prompt injection** guardrails keep it safe.",
      },
      {
        title: "Agents that act",
        body: "Agents can propose budget, bid and status changes across **8 ad platforms**, but a person approves before anything goes live. **Human-in-the-loop** by design.",
      },
      {
        title: "AI auto-triage",
        body: "Agents that read production telemetry, trace each failure to its **root cause in code**, file one clean GitHub issue, and open a **tested fix PR**.",
      },
    ],
    metrics: [
      { value: "8", label: "ad platforms" },
      { value: "590+", label: "issues surfaced" },
      { value: "65", label: "automated fixes" },
    ],
    stack: ["Python", "Flask", "React", "TypeScript", "LLM agents", "Slack API"],
  },
  {
    id: "matrack",
    company: "Matrack Inc.",
    role: "Associate Software Engineer",
    period: "Jan 2024 — Jan 2026",
    location: "Remote",
    intro: "Matrack builds GPS fleet tracking. I worked on the tracking platform and led the team behind its sales CRM.",
    themes: [
      {
        title: "Leadership",
        body: "**Led a team of six** that took a sales automation CRM from an empty repo to production in **under a year**.",
      },
      {
        title: "Backend architecture",
        body: "Designed the backend on **FastAPI**, **Redis** and **Aurora MySQL**, carrying AI-driven campaigns and **5K+ communications a day**.",
      },
      {
        title: "Communications & payments",
        body: "One inbox for calls, SMS and email (**Twilio**), payments through **Stripe**, and a campaign engine that lets sales agents reach hundreds of leads a day.",
      },
      {
        title: "Fleet & AI dashcam",
        body: "On the fleet side: **real-time vehicle tracking**, geofencing alerts, driver behavior and ELD compliance, plus APIs for an **AI-powered dashcam**.",
      },
    ],
    metrics: [
      { value: "100K+", label: "customers served" },
      { value: "$150K+", label: "in transactions" },
      { value: "6", label: "engineers led" },
    ],
    stack: ["FastAPI", "Redis", "MySQL", "Twilio", "Stripe", "AWS"],
  },
];

export const earlier = [
  {
    company: "Daimler Truck India",
    role: "Full Stack Developer Intern",
    period: "Jun 2023 — Sep 2023",
    location: "Chennai",
    body: "Built **TeamConnect** on my own: an internal platform for Daimler's procurement and supply-chain teams, on **Node.js** and **PostgreSQL**, with an Excel-to-chart generator.",
  },
  {
    company: "CISAI",
    role: "Penetration Testing Intern",
    period: "Feb 2023 — May 2023",
    location: "Kollam",
    body: "Learned to think like an attacker: web application **VAPT** focused on the **OWASP Top 10** and secure coding. It still shapes how I build.",
  },
];

export type ProjectInfo = {
  id: string;
  title: string;
  kicker: string;
  intro: string;
  points: string[];
  metrics: Metric[];
  stack: string[];
};

export const projects: ProjectInfo[] = [
  {
    id: "whatsapp",
    title: "WhatsApp Business SaaS",
    kicker: "Multi-tenant platform",
    intro: "Small businesses run sales and support on WhatsApp. This gives the whole team one shared inbox, an AI chatbot and automation, on the official Cloud API.",
    points: [
      "An **event-driven backend** on 8 BullMQ queues: retries are safe because every send is **idempotent**, so no customer gets the same message twice",
      "A live team inbox over **Socket.io**, and an **OpenAI / Gemini** chatbot that hands the chat to a person when it gets stuck",
      "Self-serve billing on **Razorpay**: subscriptions and prepaid AI credits, with signature-verified webhooks",
    ],
    metrics: [
      { value: "145K+", label: "messages" },
      { value: "60K+", label: "contacts" },
      { value: "5+", label: "businesses" },
    ],
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "BullMQ"],
  },
  {
    id: "erp",
    title: "ERP & Franchise Platform",
    kicker: "Operations system",
    intro: "The system a manufacturer and its franchise network run on every day, from purchasing and inventory to production and HR.",
    points: [
      "Stock lives in an **append-only ledger**, so every movement is on record and invariant checks catch drift early",
      "Purchase orders move through an explicit **state machine**, with versioned amendments instead of silent edits",
      "**Async SQLAlchemy** with targeted eager loading keeps deeply nested pages fast, with no **N+1 queries**",
    ],
    metrics: [{ value: "18+", label: "franchises run on it" }],
    stack: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Next.js"],
  },
];

export type Skill = { name: string; group: SkillGroup; usedAt?: string[] };
export type SkillGroup = "Languages" | "Backend" | "Data" | "AI / LLM" | "Cloud" | "Frontend";

export const skillGroups: { group: SkillGroup; color: string }[] = [
  { group: "Languages", color: "#7cf5c4" },
  { group: "Backend", color: "#8ab4ff" },
  { group: "Data", color: "#ffb86b" },
  { group: "AI / LLM", color: "#e59bff" },
  { group: "Cloud", color: "#6fe3ff" },
  { group: "Frontend", color: "#ff8fa3" },
];

export const skills: Skill[] = [
  { name: "Python", group: "Languages", usedAt: ["Aliveo AI", "Matrack", "ERP"] },
  { name: "TypeScript", group: "Languages", usedAt: ["Aliveo AI", "WhatsApp SaaS", "ERP"] },
  { name: "JavaScript", group: "Languages", usedAt: ["Matrack", "Daimler"] },
  { name: "SQL", group: "Languages", usedAt: ["Matrack", "ERP"] },
  { name: "PHP", group: "Languages", usedAt: ["Matrack"] },
  { name: "FastAPI", group: "Backend", usedAt: ["Matrack", "ERP"] },
  { name: "Flask", group: "Backend", usedAt: ["Aliveo AI"] },
  { name: "Node.js", group: "Backend", usedAt: ["Daimler"] },
  { name: "SQLAlchemy", group: "Backend", usedAt: ["ERP"] },
  { name: "REST APIs", group: "Backend" },
  { name: "RabbitMQ", group: "Backend" },
  { name: "BullMQ", group: "Backend", usedAt: ["WhatsApp SaaS"] },
  { name: "Socket.io", group: "Backend", usedAt: ["WhatsApp SaaS"] },
  { name: "PostgreSQL", group: "Data", usedAt: ["WhatsApp SaaS", "ERP", "Daimler"] },
  { name: "MySQL", group: "Data", usedAt: ["Matrack"] },
  { name: "Redis", group: "Data", usedAt: ["Matrack", "WhatsApp SaaS"] },
  { name: "MongoDB", group: "Data", usedAt: ["E-voting research"] },
  { name: "LLM Agents", group: "AI / LLM", usedAt: ["Aliveo AI"] },
  { name: "OpenAI", group: "AI / LLM", usedAt: ["WhatsApp SaaS"] },
  { name: "Gemini", group: "AI / LLM", usedAt: ["WhatsApp SaaS"] },
  { name: "LangChain", group: "AI / LLM" },
  { name: "RAG", group: "AI / LLM" },
  { name: "Prompt Engineering", group: "AI / LLM", usedAt: ["Aliveo AI"] },
  { name: "AWS", group: "Cloud", usedAt: ["Matrack"] },
  { name: "Docker", group: "Cloud", usedAt: ["WhatsApp SaaS"] },
  { name: "Linux", group: "Cloud", usedAt: ["WhatsApp SaaS"] },
  { name: "Git", group: "Cloud" },
  { name: "React", group: "Frontend", usedAt: ["Aliveo AI", "Daimler"] },
  { name: "Next.js", group: "Frontend", usedAt: ["WhatsApp SaaS", "ERP"] },
  { name: "HTML5", group: "Frontend" },
  { name: "CSS3", group: "Frontend" },
  { name: "jQuery", group: "Frontend", usedAt: ["Matrack"] },
];
