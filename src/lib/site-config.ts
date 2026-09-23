/**
 * Központi hely a márka-specifikus szövegekhez és linkekhez.
 * Ha változik a domain/márkanév/social linkek, itt kell frissíteni.
 */
export const siteConfig = {
  brandName: "Kardos Bálint",
  ownerName: "Bálint",
  ownerFullName: "Kardos Bálint",
  // A ténylegesen a Vercel projekthez kötött custom domain (lásd Vercel
  // Settings → Domains) — korábban itt egy soha be nem kötött, korábbi
  // márkanévhez tartozó domain (tudatossagesjelenlet.hu) szerepelt,
  // emiatt minden canonical/OG/sitemap URL egy nem elérhető címre
  // mutatott. Ez adja a metadataBase-t is (layout.tsx).
  url: "https://www.akardosbalint.hu",
  // Nyers, nem sablon meta description — lásd app/layout.tsx a teljes
  // hangnemért (SEO + social share preview szöveg). 150-160 karakter
  // körül tartva, hogy a Google ne vágja le a találati listában.
  description:
    "31 éven át lemaradtam a saját életemről. Most 67 napra Indiába megyek jógát tanulni, nyilvánosan dokumentálva. Nincsenek válaszaim. Gyere, keressük együtt.",
  // Sorrend a feltételezett elérés/relevancia szerint: a TikTok az eddigi
  // elsődleges, napi videós csatorna, utána a legszélesebb elérésű platformok.
  social: {
    tiktok: "https://tiktok.com/@akardosbalint.hu",
    instagram: "https://instagram.com/akardosbalint",
    youtube: "https://youtube.com/@akardosbalint/shorts",
    facebook: "https://facebook.com/akardosbalint",
  },
  email: "balint@akardosbalint.hu",
  // Az adatkezelési tájékoztatóhoz (GDPR-hoz kötelező feltüntetni az
  // adatkezelő elérhetőségét) — magánszemélyként, nem regisztrált
  // vállalkozásként fut az oldal, ezért nincs adószám/nyilvántartási szám.
  ownerAddress: "7584 Babócsa, Rákóczi u. 28.",
  journey: {
    // A JourneyProgress (a Hero alatti haladásjelző) ebből a kettőből
    // számolja ki, hányadik napnál tartunk — a TELJES utat követi,
    // ajtótól ajtóig: az otthonról indulástól a hazaérkezésig, nem csak
    // az indiai tartózkodást.
    // Indulás Mo.-ról (= startDate): 2026-09-26. Érkezés Indiába:
    // 2026-09-28. Indulás Indiából (Dehradun): 2026-12-03. Érkezés
    // Mo.-ra (= startDate + totalDays - 1): 2026-12-04.
    // totalDays = 70 (2026-09-26 .. 2026-12-04 bezárólag).
    //
    // FONTOS — EZ NEM UGYANAZ, MINT A MÁSHOL ("67 nap Indiában")
    // EMLEGETETT SZÁM: a Hero/Story/GYIK/ASZF stb. szövegekben szereplő
    // "67 nap" kifejezetten az indiai tartózkodás hossza (2026-09-28 –
    // 2026-12-03 bezárólag) — az egy külön, szándékosan változatlanul
    // hagyott marketing-szám, nem ebből a totalDays-ből számolódik. A
    // képzés maga (az akkreditált rész) 2026-10-01 és 2026-11-28 között
    // tart (59 nap) — ez a 67 napos indiai tartózkodásnak is csak egy
    // szelete.
    //
    // BIZONYTALAN VÉGDÁTUM: a december 3-i hazaindulás (és az ebből
    // következő dec. 4-i hazaérkezés) a JELENLEGI terv, nem biztos. Ha
    // Őszentsége a Dalai Láma, Tenzin Gyatso december 27-ig bezárólag
    // tanítást tart, Bálint ott marad addig — a turistavízum viszont
    // egyszerre max. 90 napot enged (2026-09-28-tól számolva ez pont
    // 2026-12-27), tehát az indiai tartózkodás ennél tovább semmiképpen
    // nem nyúlhat. Ha ez a hosszabbítás ténylegesen bekövetkezik, a
    // totalDays értékét (és a GYIK vonatkozó válaszát, illetve a máshol
    // szereplő "67 nap" szövegeket) frissíteni kell a tényleges
    // hazautazás napjával.
    startDate: "2026-09-26",
    totalDays: 70,
  },
  analytics: {
    // A GA Measurement ID nem titkos adat (a böngészőbe amúgy is
    // kikerül), ezért simán ide kerülhet, env változó nélkül.
    googleMeasurementId: "G-QYHPHKXFWE",
  },
} as const;
