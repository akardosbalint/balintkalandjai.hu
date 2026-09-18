import type { ReactNode } from "react";

/**
 * Közös kártya-stílus a WhatYouGet és SocialProof szekciókhoz.
 *
 * A hover-lift (-translate-y) egy KÜLÖN, belső elemen ül, nem közvetlenül
 * az AnimatedSection-ön — a framer-motion a belépő animáció végén inline
 * `transform` stílust hagy az általa mozgatott elemen, ami felülírná
 * (kioltaná) a Tailwind hover:-translate-y class-t, ha ugyanarra az elemre
 * kerülne.
 */
export default function HoverLiftCard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/70 p-6 shadow-soft ring-1 ring-ink-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:bg-forest-600/30 dark:ring-sand-100/10 sm:p-7">
      {children}
    </div>
  );
}
