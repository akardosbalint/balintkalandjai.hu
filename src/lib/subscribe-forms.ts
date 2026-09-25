/**
 * A feliratkozó űrlapok DOM id-jai. A StickyCTA és a CookieConsent ezek
 * láthatóságát figyeli (ha egy form látszik, a lebegő CTA és a cookie-sáv
 * nem takarhatja), a SubscribeForm pedig GA4 `form_location`-ként küldi.
 */
export const SUBSCRIBE_FORM_IDS = {
  hero: "feliratkozas",
  bottom: "feliratkozas-lent",
  faq: "feliratkozas-gyik",
} as const;

export const ALL_SUBSCRIBE_FORM_IDS: readonly string[] = Object.values(SUBSCRIBE_FORM_IDS);
