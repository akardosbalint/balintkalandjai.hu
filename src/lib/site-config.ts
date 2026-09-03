/**
 * Központi hely a márka-specifikus szövegekhez és linkekhez.
 * Ha változik a domain/márkanév/social linkek, itt kell frissíteni.
 */
export const siteConfig = {
  brandName: "Kardos Bálint",
  ownerName: "Bálint",
  ownerFullName: "Kardos Bálint",
  url: "https://tudatossagesjelenlet.hu",
  // Nyers, nem sablon meta description — lásd app/layout.tsx a teljes
  // hangnemért (SEO + social share preview szöveg).
  description:
    "31 éven át lemaradtam a saját életemről. Most 58 napra Indiába megyek jógát tanulni, nyilvánosan, szűretlenül dokumentálva. Nincsenek válaszaim. Gyere, keressük együtt.",
  social: {
    tiktok: "https://tiktok.com/@akardosbalint.hu",
  },
  email: "balint@akardosbalint.hu",
  // Az adatkezelési tájékoztatóhoz (GDPR-hoz kötelező feltüntetni az
  // adatkezelő elérhetőségét) — magánszemélyként, nem regisztrált
  // vállalkozásként fut az oldal, ezért nincs adószám/nyilvántartási szám.
  ownerAddress: "7584 Babócsa, Rákóczi u. 28.",
  journey: {
    // A képzés első napja és teljes hossza — a JourneyProgress ebből számolja
    // ki, hányadik napnál tartunk.
    startDate: "2026-10-01",
    totalDays: 58,
  },
  analytics: {
    // A GA Measurement ID nem titkos adat (a böngészőbe amúgy is
    // kikerül), ezért simán ide kerülhet, env változó nélkül.
    googleMeasurementId: "G-QYHPHKXFWE",
  },
} as const;
