# Portfolio · abhinav140902.github.io/portfolio

Personal portfolio of Abhinav Tadepalli: one GPU particle field that morphs into a new shape for each full-screen chapter.

Built with Next.js (static export), React Three Fiber with custom GLSL shaders, Framer Motion, Lenis and Tailwind CSS.

## Editing

- All text lives in `src/data/content.ts`.
- Chapter order and the particle shape for each chapter: `src/lib/chapterList.ts` and `src/lib/shapes.ts`.
- Resume and photo: `public/resume.pdf`, `public/profile.jpg`.

## Run locally

```bash
npm install
npm run dev
```

Every push to `main` builds the site and deploys it to GitHub Pages (`.github/workflows/deploy.yml`).
