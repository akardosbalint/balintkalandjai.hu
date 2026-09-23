"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, DURATION } from "@/lib/motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "section" | "div";
}

/**
 * Lassú, "lélegző" fade-in-up, amint a szekció a képernyőre ér.
 * Szándékosan visszafogott: a téma a nyugalom, nem a figyelemfelkeltés.
 * Az időzítés/easing a közös motion-rendszerből jön (src/lib/motion.ts).
 */
export default function AnimatedSection({
  children,
  className,
  delay = 0,
  as = "section",
}: AnimatedSectionProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: DURATION.slow, delay, ease: EASE.smooth }}
    >
      {children}
    </Component>
  );
}
