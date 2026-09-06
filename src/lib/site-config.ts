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
  // hangnemért (SEO + social share preview szöveg). 150-160 karakter
  // körül tartva, hogy a Google ne vágja le a találati listában.
  description:
    "31 éven át lemaradtam a saját életemről. Most 67 napra Indiába megyek jógát tanulni, nyilvánosan dokumentálva. Nincsenek válaszaim. Gyere, keressük együtt.",
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
    // Indulás Indiából (Dehradun): 2026-12-03, érkezés Mo.-ra: 2026-12-04.
    // FONTOS: ez nem ugyanaz, mint a képzés hossza — a 67 napos indiai
    // tartózkodáson belül maga az akkreditált képzés 2026-10-01 és
    // 2026-11-28 között tart (59 nap), a többi nap korábbi érkezés/
    // későbbi hazautazás.
    //
    // BIZONYTALAN VÉGDÁTUM: a december 3-i hazaindulás a JELENLEGI terv,
    // nem biztos. Ha Őszentsége a Dalai Láma, Tenzin Gyatso december
    // 27-ig bezárólag tanítást tart, Bálint ott marad addig — a
    // turistavízum viszont egyszerre max. 90 napot enged (2026-09-28-tól
    // számolva ez pont 2026-12-27), tehát ennél tovább semmiképpen nem
    // maradhat. Ha ez a hosszabbítás ténylegesen bekövetkezik, a
    // totalDays értékét (és a GYIK vonatkozó válaszát) frissíteni kell
    // a tényleges hazautazás napjával.
    startDate: "2026-09-28",
    totalDays: 67,
  },
  analytics: {
    // A GA Measurement ID nem titkos adat (a böngészőbe amúgy is
    // kikerül), ezért simán ide kerülhet, env változó nélkül.
    googleMeasurementId: "G-QYHPHKXFWE",
  },
} as const;
