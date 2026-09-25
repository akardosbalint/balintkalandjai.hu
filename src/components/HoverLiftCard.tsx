"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SPRING } from "@/lib/motion";

/**
 * Kártya-stílus a WhatYouGet szekcióhoz. A hover-lift
 * spring-fizikával fut (nem CSS transitionnel) — puhább, "tapinthatóbb"
 * visszajelzés, konzisztensen a többi gomb/kártya mikro-interakciójával
 * (lásd src/lib/motion.ts SPRING).
 */
export default function HoverLiftCard({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={SPRING.hover}
      className="rounded-2xl bg-white/70 p-6 shadow-soft ring-1 ring-ink-900/10 transition-shadow duration-300 hover:shadow-soft-lg dark:bg-forest-600/30 dark:ring-sand-100/10 sm:p-7"
    >
      {children}
    </motion.div>
  );
}
