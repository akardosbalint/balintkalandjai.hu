"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  applyTheme,
  getStoredThemePreference,
  setStoredThemePreference,
  type ThemePreference,
} from "@/lib/theme-schedule";
import { SPRING } from "@/lib/motion";

const NEXT: Record<ThemePreference, ThemePreference> = {
  auto: "light",
  light: "dark",
  dark: "auto",
};

const LABEL: Record<ThemePreference, string> = {
  auto: "Téma: automatikus (nappal/éjszaka szerint)",
  light: "Téma: világos",
  dark: "Téma: sötét",
};

/**
 * Kézi téma-kapcsoló. Alapból az oldal a nappal/éjszaka sávot követi
 * (ThemeSchedule) — ez a gomb ezt írja felül: auto → világos → sötét →
 * auto körben, localStorage-ban megjegyezve (lásd theme-schedule.ts).
 * Csak mountolás után jelenik meg (a preferencia csak kliens oldalon
 * ismert), hogy elkerüljük a szerver/kliens hydration-eltérést.
 */
export default function ThemeToggle() {
  const [preference, setPreference] = useState<ThemePreference | null>(null);

  useEffect(() => {
    setPreference(getStoredThemePreference());
  }, []);

  if (!preference) {
    return <div className="h-9 w-9 sm:h-10 sm:w-10" aria-hidden="true" />;
  }

  function handleClick() {
    const next = NEXT[preference as ThemePreference];
    setStoredThemePreference(next);
    applyTheme(next);
    setPreference(next);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      whileTap={{ scale: 0.88 }}
      transition={SPRING.tap}
      aria-label={`${LABEL[preference]} — kattints a váltáshoz`}
      title={LABEL[preference]}
      className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full text-forest-900/70 outline-none transition-colors hover:bg-forest-800/5 hover:text-forest-900 focus-visible:ring-2 focus-visible:ring-forest-900/40 dark:text-sand-100/70 dark:hover:bg-sand-50/10 dark:hover:text-sand-50 dark:focus-visible:ring-sand-50/50 sm:h-10 sm:w-10"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={preference}
          initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
          transition={SPRING.hover}
          className="absolute inset-0 flex items-center justify-center"
        >
          {preference === "light" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          )}
          {preference === "dark" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
            </svg>
          )}
          {preference === "auto" && (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" stroke="none" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
