"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getJourneyDayInfo, TOTAL_DAYS, type JourneyDayInfo } from "@/lib/journey";
import { EASE } from "@/lib/motion";

/**
 * Élő haladásjelző: hányadik napnál tartok a 67 napos indiai utamból.
 * Kliens oldalon számol (a látogató helyi dátuma alapján), hogy mindig
 * friss legyen újradeploy nélkül is — ezért csak mountolás után jelenik meg,
 * elkerülve a szerver/kliens dátum-eltérésből adódó hydration villanást.
 */
export default function JourneyProgress() {
  const [info, setInfo] = useState<JourneyDayInfo | null>(null);

  useEffect(() => {
    setInfo(getJourneyDayInfo(new Date()));
  }, []);

  if (!info) return null;

  const percent = Math.min(100, Math.max(0, (info.day / TOTAL_DAYS) * 100));

  const label =
    info.phase === "before"
      ? `Indulásig még ${info.daysUntilStart} nap van hátra.`
      : info.phase === "during"
        ? `A(z) ${info.day}. napomat élem Rishikeshben`
        : "Megvan a 67 nap — a képzésnek vége, hazaértem";

  const countLabel =
    info.phase === "before" ? `0 / ${TOTAL_DAYS}. nap` : `${info.day} / ${TOTAL_DAYS}. nap`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-6 w-full max-w-md sm:mt-8"
    >
      <div className="flex items-center justify-between text-sm text-ink-900/65 dark:text-sand-100/65">
        <span>{label}</span>
        <span className="tabular-nums">{countLabel}</span>
      </div>
      {/*
        Dekoratív — a fenti szöveg már megadja ugyanezt az infót. A sáv
        maga is "megrajzolódik" (stroke draw-in), majd a safrán szakasz
        eddig eltelt része is ugyanazzal a vonás-technikával nyúlik ki —
        a logó kézzel húzott vonalmotívumának visszhangja, nem csak egy
        statikus háttérszín-csík.
      */}
      <div aria-hidden="true" className="relative mt-6 h-px w-full">
        <svg className="absolute inset-0 h-px w-full overflow-visible">
          <motion.line
            x1="0"
            y1="0.5"
            x2="100%"
            y2="0.5"
            pathLength={100}
            stroke="currentColor"
            strokeWidth="1"
            className="text-ink-900/10 dark:text-sand-100/15"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1, ease: EASE.smooth }}
            style={{ strokeDasharray: 100 }}
          />
          <motion.line
            x1="0"
            y1="0.5"
            x2="100%"
            y2="0.5"
            pathLength={100}
            stroke="#FF9933"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ strokeDashoffset: 100 }}
            animate={{ strokeDashoffset: 100 - percent }}
            transition={{ duration: 1.2, delay: 0.3, ease: EASE.smooth }}
            style={{ strokeDasharray: 100 }}
          />
        </svg>
        <motion.div
          className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          initial={{ left: 0, opacity: 0 }}
          animate={{ left: `${percent}%`, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: EASE.smooth }}
        >
          <span
            className="animate-breathe font-devanagari text-2xl leading-none text-saffron-500"
            style={{
              filter:
                "drop-shadow(0 0 6px rgba(255,153,51,0.55)) drop-shadow(0 1px 1px rgba(26,35,27,0.35))",
            }}
          >
            ॐ
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}
