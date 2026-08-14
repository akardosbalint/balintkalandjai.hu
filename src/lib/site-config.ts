/**
 * Központi hely a márka-specifikus szövegekhez és linkekhez.
 * Ha változik a domain/márkanév/social linkek, itt kell frissíteni.
 */
export const siteConfig = {
  brandName: "Tudatosság és Jelenlét",
  ownerName: "Bálint",
  url: "https://tudatossagesjelenlet.hu",
  description:
    "Heti egy őszinte levél Bálint 58 napos indiai jógaoktatói képzéséről — Rishikeshből, a Himalája lábától.",
  social: {
    instagram: "https://instagram.com/",
    tiktok: "https://tiktok.com/@",
    facebook: "https://facebook.com/",
  },
  email: "hello@tudatossagesjelenlet.hu",
  journey: {
    // A képzés első napja és teljes hossza — a JourneyProgress ebből számolja
    // ki, hányadik napnál tartunk.
    startDate: "2026-10-15",
    totalDays: 58,
  },
} as const;
