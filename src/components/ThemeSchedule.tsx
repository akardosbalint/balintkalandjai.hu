"use client";

import { useEffect } from "react";
import {
  isDaytime,
  DARK_THEME_COLOR,
  LIGHT_THEME_COLOR,
} from "@/lib/theme-schedule";

function applyTheme() {
  const isDark = !isDaytime(new Date());
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
}

/**
 * Az inline script (layout.tsx) csak az első render villanását előzi
 * meg. Ez a komponens tartja frissen a témát, ha a látogató nyitva
 * hagyja az oldalt napkelte/napnyugta idejéig.
 */
export default function ThemeSchedule() {
  useEffect(() => {
    applyTheme();
    const id = setInterval(applyTheme, 60_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
