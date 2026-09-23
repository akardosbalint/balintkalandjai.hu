"use client";

import { useId } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

type Mode = "outer" | "inner";

const LINE_COLOR: Record<Mode, string> = {
  outer: "rgba(255,153,51,0.5)",
  inner: "rgba(184,147,91,0.5)",
};

const DOT_COLOR: Record<Mode, string> = {
  outer: "#FF9933",
  inner: "#B8935B",
};

const DOT_GLOW: Record<Mode, string> = {
  outer: "0 0 12px 2px rgba(255,153,51,0.45)",
  inner: "0 0 8px 1px rgba(184,147,91,0.4)",
};

/**
 * Halk, díszítő "ösvény"-szakasz két szekció között — a JourneyProgress
 * fő idővonalának mikro-visszhangja, magát az Om jelet nem ismétli meg.
 * A vonal színe a fenti szekcióból (from) az alattiba (to) fut át, a
 * középső pötty pedig az érkező (to) szekció hangját veszi fel — így
 * görgetés közben is érződik, mikor vált az oldal "külső" (safrán) és
 * "belső" (arany) hangneme között.
 *
 * A vonal — a JourneyProgress fő sávjához hasonlóan — "megrajzolódik",
 * amint a látogató odagörget, nem statikus háttérszínként jelenik meg:
 * ugyanaz a kézzel-húzott vonal-motívum fut végig az oldalon.
 */
export default function SectionPath({ from, to }: { from: Mode; to: Mode }) {
  const gradientId = useId();

  return (
    <div aria-hidden="true" className="relative mx-auto h-10 w-px sm:h-12">
      <svg className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={LINE_COLOR[from]} stopOpacity="0" />
            <stop offset="35%" stopColor={LINE_COLOR[from]} />
            <stop offset="65%" stopColor={LINE_COLOR[to]} />
            <stop offset="100%" stopColor={LINE_COLOR[to]} stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0.5"
          y1="0"
          x2="0.5"
          y2="100%"
          pathLength={100}
          stroke={`url(#${gradientId})`}
          strokeWidth="1"
          initial={{ strokeDashoffset: 100 }}
          whileInView={{ strokeDashoffset: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: EASE.smooth }}
          style={{ strokeDasharray: 100 }}
        />
      </svg>
      <span
        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 animate-breathe rounded-full"
        style={{ background: DOT_COLOR[to], boxShadow: DOT_GLOW[to] }}
      />
    </div>
  );
}
