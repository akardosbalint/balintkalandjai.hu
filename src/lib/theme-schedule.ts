// Nappali sáv, ami alatt light mode aktív — ezen kívül dark mode.
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

export function themeInitScript() {
  return `(function(){try{var h=new Date().getHours();var isDark=!(h>=${DAY_START_HOUR}&&h<${DAY_END_HOUR});var d=document.documentElement;d.classList.toggle('dark',isDark);d.style.colorScheme=isDark?'dark':'light';var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content',isDark?'${DARK_THEME_COLOR}':'${LIGHT_THEME_COLOR}');}catch(e){}})();`;
}
