// Nappali sáv, ami alatt light mode aktív — ezen kívül dark mode. Ez csak
// "auto" preferencia esetén számít (lásd lent) — ha a látogató kézzel
// választott light/dark témát a ThemeToggle-lel, az felülbírálja.
// Ugyanezt az órapárt a layout.tsx-ben lévő, FOUC elleni inline script
// is használja (duplikálva, mert az egy plain JS string, nem importálhat
// innen) — a kettőt együtt kell módosítani, ha a sáv változik.
export const DAY_START_HOUR = 6;
export const DAY_END_HOUR = 19;

export function isDaytime(date: Date) {
  const hour = date.getHours();
  return hour >= DAY_START_HOUR && hour < DAY_END_HOUR;
}

export const DARK_THEME_COLOR = "#1A231B";
export const LIGHT_THEME_COLOR = "#FBF7F1";

export type ThemePreference = "auto" | "light" | "dark";

export const THEME_PREFERENCE_STORAGE_KEY = "theme-preference";

export function getStoredThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "auto";
  const value = window.localStorage.getItem(THEME_PREFERENCE_STORAGE_KEY);
  return value === "light" || value === "dark" ? value : "auto";
}

export function setStoredThemePreference(preference: ThemePreference) {
  if (preference === "auto") {
    window.localStorage.removeItem(THEME_PREFERENCE_STORAGE_KEY);
  } else {
    window.localStorage.setItem(THEME_PREFERENCE_STORAGE_KEY, preference);
  }
}

/** "auto" esetén a nappal/éjszaka sáv dönt, egyébként a kézi választás. */
export function resolveIsDark(preference: ThemePreference, date: Date) {
  if (preference === "light") return false;
  if (preference === "dark") return true;
  return !isDaytime(date);
}

/** DOM-ra alkalmazza a témát — csak kliens oldalon hívható. */
export function applyTheme(preference: ThemePreference, date: Date = new Date()) {
  const isDark = resolveIsDark(preference, date);
  const root = document.documentElement;
  root.classList.toggle("dark", isDark);
  root.style.colorScheme = isDark ? "dark" : "light";
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", isDark ? DARK_THEME_COLOR : LIGHT_THEME_COLOR);
}

/**
 * FOUC elleni, hydration előtt lefutó inline script (layout.tsx). Plain JS
 * string, nem importálhatja a fenti függvényeket — a kézi preferencia +
 * nappal/éjszaka logikát ezért itt is le kell másolni. Ha bármelyik
 * megváltozik, a másikat is frissíteni kell.
 */
export function themeInitScript() {
  return `(function(){try{var pref=localStorage.getItem('${THEME_PREFERENCE_STORAGE_KEY}');var isDark;if(pref==='light'){isDark=false;}else if(pref==='dark'){isDark=true;}else{var h=new Date().getHours();isDark=!(h>=${DAY_START_HOUR}&&h<${DAY_END_HOUR});}var d=document.documentElement;d.classList.toggle('dark',isDark);d.style.colorScheme=isDark?'dark':'light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',isDark?'${DARK_THEME_COLOR}':'${LIGHT_THEME_COLOR}');}catch(e){}})();`;
}
