"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { EASE, DURATION, fadeUp, staggerContainer } from "@/lib/motion";

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

interface StaggerProps {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
  /** Gyerekek közti csúszás másodpercben — lásd src/lib/motion.ts STAGGER.gap. */
  gap?: number;
  /** Mekkora rész legyen látható a viewportból, mielőtt a reveal elindul. */
  amount?: number;
}

/**
 * Compound reveal szülő elem: a benne lévő `StaggerItem`-ek egymás után,
 * kis csúszással jelennek meg (nem egyszerre villannak be), amint a
 * konténer a képernyőre ér. Használd, ha egy szekción belül több elem
 * (eyebrow → cím → szöveg → CTA) egy összefüggő, lépcsőzött mozdulatként
 * kell hogy hasson — ez a "módszeresen animált" érzés kulcsa.
 */
export function Stagger({
  children,
  className,
  as = "div",
  gap,
  amount = 0.2,
}: StaggerProps) {
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={staggerContainer(gap)}
    >
      {children}
    </Component>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "h1" | "h2" | "p";
}

/** Egy `Stagger` konténer gyereke — az animáció állapotát a szülőtől örökli. */
export function StaggerItem({ children, className, as = "div" }: StaggerItemProps) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
