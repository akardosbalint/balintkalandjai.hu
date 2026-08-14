/**
 * Központi hely a márka-specifikus szövegekhez és linkekhez.
 * Ha változik a domain/márkanév/social linkek, itt kell frissíteni.
 */
export const siteConfig = {
  brandName: "Tudatosság és Jelenlét",
  ownerName: "Bálint",
  ownerFullName: "Kardos Bálint",
  url: "https://tudatossagesjelenlet.hu",
  // Nyers, nem sablon meta description — lásd app/layout.tsx a teljes
  // hangnemért (SEO + social share preview szöveg).
  description:
    "31 éves vagyok, kipróbáltam már szinte mindent, és semmi nem tartott ki — egy dolgot kivéve. Most Indiában tanulok jógát tanítani, nyilvánosan, szűretlenül. Nincsenek válaszaim. Gyere, keressük együtt.",
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/@",
    facebook: "https://facebook.com/",
  },
  email: "hello@tudatossagesjelenlet.hu",
  journey: {
    // A képzés első napja és teljes hossza — a JourneyProgress ebből számolja
    // ki, hányadik napnál tartunk.
    startDate: "2026-10-01",
    totalDays: 58,
  },
} as const;
