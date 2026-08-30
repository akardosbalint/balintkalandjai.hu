"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

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
 * Kis "láng" jelölő — a jelenlegi pozíciót mutatja az ösvényen. Egy
 * mécses/gyertyaláng sziluettje: meleg, indiai zarándokúthoz illő kép,
 * anélkül, hogy konkrét vallási szimbólumot (pl. diya) másolna 1:1.
 */
function FlameMarker() {
  return (
    <svg width="16" height="18" viewBox="0 0 16 18" aria-hidden="true" focusable="false">
      <path
        d="M8 0C10.5 3.5 13 6.8 13 10.2 13 14 10.8 17 8 17S3 14 3 10.2C3 6.8 5.5 3.5 8 0Z"
        fill="#C1613C"
      />
      <path
        d="M8 5.5C9.2 7.6 10.4 9.4 10.4 11.4 10.4 13.3 9.3 15 8 15S5.6 13.3 5.6 11.4C5.6 9.4 6.8 7.6 8 5.5Z"
        fill="#F4ECE0"
        opacity="0.85"
      />
    </svg>
  );
}

/**
 * Élő haladásjelző: hányadik napnál tartok a teljes 67 napos úton
 * (szept. 28-i érkezéstől dec. 3-i hazautazásig) — ebbe illeszkedik bele
 * a 4. naptól (okt. 1.) az 58 napos akkreditált képzés is.
 *
 * A sáv szándékosan egy kanyargó, pontozott ösvényt formáz (nem sima
 * lekerekített progress bar), a végén egy "láng" jelöli az aktuális
 * pozíciót — az útkeresés motívumát viszi tovább a landing page
 * legfontosabb, élő elemébe.
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
          className="absolute top-1/2 -ml-2 -translate-y-1/2"
          initial={{ left: "0%" }}
          animate={{ left: `${percent}%` }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <FlameMarker />
        </motion.div>
      </div>
    </motion.div>
  );
}
