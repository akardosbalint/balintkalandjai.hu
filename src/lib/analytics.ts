export const CONSENT_STORAGE_KEY = "cookie-consent";
export const CONSENT_EVENT = "cookie-consent-changed";

export type ConsentChoice = "granted" | "denied";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getStoredConsent(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  return value === "granted" || value === "denied" ? value : null;
}

/**
 * Elmenti a döntést, frissíti a Google Consent Mode állapotát (ha a
 * gtag már betöltött, ha még nem, a dataLayer sorba teszi a hívást),
 * és jelzi a többi komponensnek (pl. StickyCTA), hogy megvan a döntés.
 */
export function setStoredConsent(choice: ConsentChoice) {
  window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  window.gtag?.("consent", "update", { analytics_storage: choice });
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
}

/**
 * GA4 esemény küldése. A `gtag` a layout.tsx beforeInteractive scriptjében
 * mindig definiálva van (a gtag.js betöltése előtt a dataLayer sorba
 * teszi a hívást), így ez sosem dob hibát. Consent Mode miatt hozzájárulás
 * nélkül az esemény süti nélküli, anonim jelként megy ki — lásd az
 * Adatkezelési tájékoztató 4. pontját. SOHA ne kerüljön ide személyes
 * adat (email cím, név).
 */
export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", name, params);
}

/** Konverziós események a feliratkozó formhoz — GA4-ben a `generate_lead` a kulcsesemény. */
export const SUBSCRIBE_EVENTS = {
  success: "generate_lead",
  error: "subscribe_error",
} as const;
