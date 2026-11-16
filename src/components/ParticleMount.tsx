"use client";

import dynamic from "next/dynamic";

// Three.js loads after the page is interactive, so text appears instantly.
const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

export default function ParticleMount() {
  return <ParticleField />;
}
