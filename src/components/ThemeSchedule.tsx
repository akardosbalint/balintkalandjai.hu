"use client";

import { useEffect } from "react";
import { applyTheme, getStoredThemePreference } from "@/lib/theme-schedule";

/**
 * Az inline script (layout.tsx) csak az első render villanását előzi
 * meg. Ez a komponens tartja frissen a témát: "auto" preferencia esetén
 * percenként újraszámolja a nappal/éjszaka sávot (ha a látogató nyitva
 * hagyja az oldalt napkelte/napnyugta idejéig), kézi light/dark
 * választás esetén egyszerűen azt tartja alkalmazva. A kézi váltást maga
 * a ThemeToggle azonnal alkalmazza kattintáskor — ez az intervallum csak
 * a hosszan nyitva hagyott lapoknál számító driftet kezeli.
 */
export default function ThemeSchedule() {
  useEffect(() => {
    function tick() {
      applyTheme(getStoredThemePreference());
    }
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
