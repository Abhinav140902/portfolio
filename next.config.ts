import type { NextConfig } from "next";

// Served from abhinav140902.github.io/portfolio
const basePath = "/portfolio";

const nextConfig: NextConfig = {
  // Plain static files, so the site can be hosted on GitHub Pages.
  output: "export",
  basePath,
  images: { unoptimized: true },
  // Plain <img> and <a> tags don't get the base path automatically.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
