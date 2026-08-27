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
    "31 éven át lemaradtam a saját életemről. Most 66 napra Indiába megyek jógát tanulni, nyilvánosan, szűretlenül dokumentálva. Nincsenek válaszaim. Gyere, keressük együtt.",
  social: {
    tiktok: "https://tiktok.com/@akardosbalint.hu",
  },
  email: "balint@akardosbalint.hu",
  // Az adatkezelési tájékoztatóhoz (GDPR-hoz kötelező feltüntetni az
  // adatkezelő elérhetőségét) — magánszemélyként, nem regisztrált
  // vállalkozásként fut az oldal, ezért nincs adószám/nyilvántartási szám.
  ownerAddress: "7584 Babócsa, Rákóczi u. 28.",
  journey: {
    // Az Indiába érkezés napja és a teljes indiai tartózkodás hossza — a
    // JourneyProgress ebből számolja ki, hányadik napnál tartunk.
    // Indulás Mo.-ról: 2026-09-26, érkezés Indiába: 2026-09-28.
    // Indulás Indiából: 2026-12-02, érkezés Mo.-ra: 2026-12-03.
    // FONTOS: ez nem ugyanaz, mint a képzés hossza — a 66 napos indiai
    // tartózkodáson belül maga az akkreditált képzés 2026-10-01 és
    // 2026-11-28 között tart (59 nap), a többi nap korábbi érkezés/
    // későbbi hazautazás.
    startDate: "2026-09-28",
    totalDays: 66,
  },
} as const;
