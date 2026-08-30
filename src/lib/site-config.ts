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
    "31 éven át lemaradtam a saját életemről. A tervek szerint 67 napra Indiába megyek, ebből 58 napot egy rishikeshi jógaoktatói képzéssel töltök — nyilvánosan, szűretlenül dokumentálva. Nincsenek válaszaim. Gyere, keressük együtt.",
  social: {
    tiktok: "https://tiktok.com/@akardosbalint.hu",
  },
  email: "balint@akardosbalint.hu",
  // Az adatkezelési tájékoztatóhoz (GDPR-hoz kötelező feltüntetni az
  // adatkezelő elérhetőségét) — magánszemélyként, nem regisztrált
  // vállalkozásként fut az oldal, ezért nincs adószám/nyilvántartási szám.
  ownerAddress: "7584 Babócsa, Rákóczi u. 28.",
  journey: {
    // A teljes út első napja (Rishikeshbe érkezés) és teljes hossza —
    // a JourneyProgress ebből számolja ki, hányadik napnál tartunk.
    // Maga a 500 órás képzés csak 58 nap ebből (okt. 1. – nov. 28.),
    // az érkezés (szept. 28.) és a hazautazás (dec. 3.) miatt a teljes
    // kint tartózkodás ennél hosszabb.
    startDate: "2026-09-28",
    totalDays: 67,
  },
} as const;
