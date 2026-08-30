"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import OmMark from "./OmMark";

const TOTAL_DAYS = siteConfig.journey.totalDays;

function parseLocalDate(isoDate: string) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function dateOnly(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
}

type Phase = "before" | "during" | "after";

interface JourneyDayInfo {
  phase: Phase;
  day: number;
  daysUntilStart: number;
}

function getJourneyDayInfo(now: Date): JourneyDayInfo {
  const start = parseLocalDate(siteConfig.journey.startDate);
  const diffDays =
    Math.round((dateOnly(now) - dateOnly(start)) / 86_400_000) + 1;

  if (diffDays < 1) {
    return { phase: "before", day: 0, daysUntilStart: 1 - diffDays };
  }
  if (diffDays > TOTAL_DAYS) {
    return { phase: "after", day: TOTAL_DAYS, daysUntilStart: 0 };
  }
  return { phase: "during", day: diffDays, daysUntilStart: 0 };
}

/**
 * Élő haladásjelző: hányadik napnál tartok a teljes 67 napos úton
 * (szept. 28-i érkezéstől dec. 3-i hazautazásig) — ebbe illeszkedik bele
 * a 4. naptól (okt. 1.) az 58 napos akkreditált képzés is.
 *
 * A sáv szándékosan egy kanyargó, pontozott ösvényt formáz (nem sima
 * lekerekített progress bar), a végén egy "ॐ" jel mutatja az aktuális
 * pozíciót — az útkeresés és a jóga motívumát viszi tovább a landing
 * page legfontosabb, élő elemébe.
 *
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
        ? `A(z) ${info.day}. napomat élem Indiában`
        : "Vége az útnak — hazaértem";

  const countLabel =
    info.phase === "before" ? `0 / ${TOTAL_DAYS}. nap` : `${info.day} / ${TOTAL_DAYS}. nap`;

  const trailPath = "M0,12 Q50,3 100,12 T200,12 T300,12 T400,12";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="mt-8 w-full max-w-md"
    >
      <div className="flex items-center justify-between text-sm text-ink-900/60">
        <span>{label}</span>
        <span className="tabular-nums">{countLabel}</span>
      </div>

      <div className="relative mt-3 h-6">
        <svg
          viewBox="0 0 400 24"
          preserveAspectRatio="none"
          className="h-6 w-full"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id="journey-trail-clip">
              <motion.rect
                x="0"
                y="0"
                height="24"
                initial={{ width: "0%" }}
                animate={{ width: `${percent}%` }}
                transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              />
            </clipPath>
            <linearGradient id="journey-trail-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#A94F30" />
              <stop offset="100%" stopColor="#D08059" />
            </linearGradient>
          </defs>

          <path
            d={trailPath}
            fill="none"
            stroke="#243024"
            strokeOpacity="0.12"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="0.5 9"
          />
          <g clipPath="url(#journey-trail-clip)">
            <path
              d={trailPath}
              fill="none"
              stroke="url(#journey-trail-gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.5 9"
            />
          </g>
        </svg>

        <motion.div
          className="absolute top-1/2 -ml-2.5 -translate-y-1/2"
          initial={{ left: "0%" }}
          animate={{ left: `${percent}%` }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <OmMark className="text-xl text-terracotta-600" />
        </motion.div>
      </div>
    </motion.div>
  );
}
