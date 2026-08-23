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
    "31 éven át lemaradtam a saját életemről. Most 9 hétre Indiába megyek jógát tanulni, nyilvánosan, szűretlenül dokumentálva. Nincsenek válaszaim. Gyere, keressük együtt.",
  social: {
    tiktok: "https://tiktok.com/@akardosbalint.hu",
  },
  email: "balint@akardosbalint.hu",
  // Az adatkezelési tájékoztatóhoz (GDPR-hoz kötelező feltüntetni az
  // adatkezelő elérhetőségét) — magánszemélyként, nem regisztrált
  // vállalkozásként fut az oldal, ezért nincs adószám/nyilvántartási szám.
  ownerAddress: "7584 Babócsa, Rákóczi u. 28.",
  journey: {
    // A teljes indiai utazás első napja (belépés Indiába) és hossza — a
    // JourneyProgress ebből számolja ki, hányadik napnál tartunk.
    // Menetrend: szept. 28. hajnalban indulás Budapestről, szept. 29-én
    // belépés Indiába, okt. 1. – nov. 28. a képzés, dec. 2-án indulás
    // haza Indiából, dec. 3-án este megérkezés Magyarországra.
    startDate: "2026-09-29",
    totalDays: 65,
  },
} as const;
