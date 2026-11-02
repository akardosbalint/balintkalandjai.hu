import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OrganicBackground from "@/components/OrganicBackground";
import SenderForm from "@/components/SenderForm";
import AnimatedSection from "@/components/AnimatedSection";
import HoverLiftCard from "@/components/HoverLiftCard";
import Faq from "@/components/Faq";
import StickyCTA from "@/components/StickyCTA";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = "Nem kell megvilágosodnod ahhoz, hogy békére lelj — Meditációs Alapozó";
const pageDescription =
  "Engedd el a folyamatos túlagyalást és a belső feszültséget. Sajátítsd el a valódi nyugalmat, ami a mindennapok pörgésében is veled marad — kényszeres elvárások és bűntudat nélkül.";

export const metadata: Metadata = {
  title: `${pageTitle} — ${siteConfig.brandName}`,
  description: pageDescription,
  alternates: {
    canonical: "/alapozo",
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/alapozo",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

// 4 kulcsfontosságú életminőség-javulás (Benefit fókusz)
const CORE_BENEFITS = [
  {
    title: "Csendesebb elme, kevesebb felesleges túlagyalás",
    description:
      "Ismerős az érzés, amikor a fejedben végtelenítve fut a „mi lesz ha...” és a múltbeli beszélgetések elemzése? A gyakorlás során megtanulod kívülről látni a gondolataidat anélkül, hogy mindegyiknek hinnél. A felesleges aggódás helyét tiszta, békés tér veszi át.",
    badge: "Mentális megkönnyebbülés",
  },
  {
    title: "Valódi érzelmi stabilitás a váratlan helyzetekben",
    description:
      "A határidők szorítása, a munkahelyi konfliktusok és az élet kiszámíthatatlansága nem rántanak többé azonnal magukkal. Kialakul benned egy szilárd belső védőháló: nem azonnal reflexből reagálsz, hanem képes leszel nyugodtan, tisztán dönteni feszült pillanatokban is.",
    badge: "Belső biztonság",
  },
  {
    title: "Mélyebb pihenés és regenerálódó idegrendszer",
    description:
      "Megszűnik az esti plafonbámulás és a szorító érzés a gyomrodban. A tested és az idegrendszered végre megtanul átkapcsolni a folyamatos túlélő, készenléti üzemmódból a mély regenerációba. Reggelente kipihentebben, friss energiával ébredsz.",
    badge: "Valódi regeneráció",
  },
  {
    title: "Őszinte, osztatlan jelenlét a szeretteiddel",
    description:
      "Nem félig a telefonodon vagy a teendőiden járó aggyal vagy ott a vacsoránál: valódi figyelmet, türelmet és melegséget tudsz adni a párodnak, gyerekeidnek és legfőképp önmagadnak. Újra megélheted a pillanatok valódi örömét.",
    badge: "Mélyebb kapcsolatok",
  },
];

// Miért fulladt eddig kudarcba a meditáció? (Tévhitek vs. Megkönnyebbülés)
const MYTHS_VS_BENEFITS = [
  {
    myth: "Azt hitted, kötelező teljesen kiüríteni a fejedet",
    reality:
      "A gondolatmentesség egy elérhetetlen mítosz, ami csak kudarcérzést szül. Az agy dolga a gondolkodás. Ebben a kurzusban nem a gondolatok elnémítását tanulod meg, hanem azt, hogyan köss békét velük anélkül, hogy magukkal rántanának.",
  },
  {
    myth: "Azt hitted, órákig kell mereven, kényelmetlen pózban ülni",
    reality:
      "Nincs szükség sem füstölőkre, sem lótuszülésre. Egy kényelmes fotel vagy kanapé tökéletes. A meditáció lényege a figyelem szelídsége, nem a test kényszerű merevsége.",
  },
  {
    myth: "Újabb nyomasztó kötelesség lett belőle a to-do listádon",
    reality:
      "Ez a módszer szelíd és bűntudatmentes. Ez a napod egyetlen olyan 10–15 perce, ahol nem kell megfelelned senkinek. Nem egy újabb elvárás, hanem maga a fellélegzés.",
  },
];

// A 7 napos belső átalakulás lépései (Kifejezetten a belső nyereségre fókuszálva)
const TRANSFORMATION_DAYS = [
  {
    day: "1. nap",
    title: "A bűntudat és a görcsös akarás elengedése",
    benefit:
      "Megtapasztalod a felszabadító felismerést: nem rontod el a meditációt, ha jönnek a gondolatok. Kényelmesen elhelyezkedsz, és megengeded a testednek, hogy végre letegye a nap terheit.",
    breakthrough: "Fő nyereség: azonnal megszűnik a teljesítménykényszer és az önostorozás",
  },
  {
    day: "2. nap",
    title: "A figyelem visszaszerzése – szelíden, harc nélkül",
    benefit:
      "Megérted, miért kalandozik el az elme, és megkapod a 3 lépéses módszert, amivel a legzaklatottabb pillanatban is percek alatt visszahozhatod magad a belső nyugalmadba.",
    breakthrough: "Fő nyereség: azonnali mentális kapaszkodó stressz és kapkodás esetén",
  },
  {
    day: "3. nap",
    title: "A testben rekedt feszültségek kioldása",
    benefit:
      "Megszabadítod a nyakadat, a válladat és a mellkasodat a felgyülemlett fizikai görcsöktől. Ha nehezedre esik a légzésre figyelni, kézzelfogható alternatív kapaszkodót találsz.",
    breakthrough: "Fő nyereség: érezhető testi megkönnyebbülés és szabadabb légzés",
  },
  {
    day: "4. nap",
    title: "Békekötés a gondolatokkal – a belső háború vége",
    benefit:
      "Megtanulod kívülről, ítélkezés nélkül szemlélni a felbukkanó gondolatokat. Nem ragadsz bele a szorongató monológokba: a gondolatok jönnek és mennek, te pedig békében maradsz.",
    breakthrough: "Fő nyereség: elcsendesülő belső zaj és tisztább fej a döntéseidhez",
  },
  {
    day: "5. nap",
    title: "Tágas belső szabadság a beszűkült aggodalmak helyett",
    benefit:
      "Kitágítod a figyelmedet a környezetedre és a saját belső teredre. Megtapasztalod a nyitott éberséget, ahol a mindennapi problémák elveszítik nyomasztó, beszűkítő súlyukat.",
    breakthrough: "Fő nyereség: megkönnyebbülés, tágasabb perspektíva és belső könnyedség",
  },
  {
    day: "6. nap",
    title: "Jelenlét a rohanásban – a nyugalmad veled marad",
    benefit:
      "Átülteted a megélt békét a mindennapi helyzetekbe: a dugóba, a megbeszélésekre vagy a családi vacsorákra. Olyan fenntartható szokást teremtesz, ami nem foszlik szét a nap folyamán.",
    breakthrough: "Fő nyereség: a belső csend a mindennapok pörgésében is veled marad",
  },
  {
    day: "7. nap",
    title: "Önálló belső erő – a tartós biztonságod megalapozása",
    benefit:
      "Összeáll a teljes folyamat. Kiválasztod a saját alapgyakorlatodat, amire bármikor támaszkodhatsz, és megkapod a 14 napos útmutatót az önálló, magabiztos folytatáshoz.",
    breakthrough: "Fő nyereség: egy életre szóló, független belső stabilitás",
  },
];

// Élethelyzetek és belső igények
const TARGET_AUDIENCE = [
  "Úgy érzed, a napjaid állandó rohanásból és tűzoltásból állnak, és estére teljesen kimerül az idegrendszered.",
  "Az agyad még az ágyban fekve sem hajlandó leállni: szüntelenül a holnapi terheken és múltbeli helyzeteken kattog.",
  "Türelmetlenebb vagy a szeretteiddel és munkatársaiddal, mint szeretnéd – és emiatt este bűntudat gyötör.",
  "Korábban már próbáltál meditálni, de csalódottan feladtad: „nekem ez nem megy, az én agyam túl aktív a csendhez”.",
  "Nem elvont filozófiára vagy kötelező dogmákra vágysz, hanem a valódi hétköznapi életedben azonnal érezhető belső békére.",
];

// Gyakran Ismételt Kérdések a kétségek eloszlatására
const ALAPOZO_FAQ_ITEMS = [
  {
    question: "Mi van, ha képtelen vagyok kiüríteni a fejemet?",
    answer:
      "Ez a leggyakoribb tévhit a meditációval kapcsolatban! Az emberi agy biológiailag képtelen a teljes gondolatmentességre. A kurzus célja pontosan az, hogy megtanulj békében lenni a gondolatok jelenlétével, és szelíden visszahozni a figyelmedet ahelyett, hogy harcolnál velük.",
  },
  {
    question: "Valóban segíteni fog csökkenteni a mindennapi stresszt és szorongást?",
    answer:
      "Igen. A vezetett gyakorlatok célzottan csillapítják a túlpörgetett szimpatikus idegrendszert (a „harcolj vagy menekülj” állapotot), és aktiválják a regenerációért és belső nyugalomért felelős paraszimpatikus idegrendszert. Már az első lecke után érezni fogod a megkönnyebbülést.",
  },
  {
    question: "Nagyon kevés az időm. Be tudom illeszteni egy zsúfolt napirendbe?",
    answer:
      "Kifejezetten a modern, túlzsúfolt életvitelhez terveztük. Napi 10–15 perc elegendő. Ráadásul ez a negyedóra nem „elvesz” időt a napodból: a tisztább fókusz és a nyugodtabb idegrendszer révén a többi teendődet is sokkal hatékonyabban és kevesebb hibával fogod elvégezni.",
  },
  {
    question: "Mikor a legcélszerűbb elvégezni a napi leckéket?",
    answer:
      "A levelek minden reggel 5:00-kor érkeznek a postaládádba, de a gyakorlatot a nap bármely szakaszában elvégezheted. Hallgathatod a reggeli kávé előtt, napközben egy rövid szünetben a munkahelyeden, vagy akár este, a lefekvés előtti megnyugváshoz.",
  },
  {
    question: "Szükségem van különleges eszközökre vagy meditációs párnára?",
    answer:
      "Egyáltalán nem. Egy kényelmes szék, a kanapé vagy akár az íróasztalod tökéletesen megfelel. Nem kell lótuszülésben ülnöd, és nincs szükség semmilyen speciális felszerelésre.",
  },
  {
    question: "Tényleg teljesen ingyenes a kurzus?",
    answer:
      "Igen, a 7 napos Meditációs Alapozó 100%-ban ingyenes, és semmilyen bankkártyaadatot nem kérünk. A leckékhez és a vezetett meditációs hanganyagokhoz azonnal, díjmentesen hozzáférhetsz.",
  },
  {
    question: "Nem fogja teleszemetelni a postaládámat sok reklámlevél?",
    answer:
      "Egyáltalán nem. Szigorúan csak a kurzushoz tartozó napi egyetlen oktató e-mailt kapod meg a 7 nap során. Nincsenek agresszív reklámok, nem adjuk át az adataidat senkinek, és a leiratkozás mindig egyetlen kattintás.",
  },
  {
    question: "Mi történik, ha egy vagy több nap kimarad?",
    answer:
      "Semmi probléma! A kurzusban egyáltalán nincs teljesítménykényszer vagy bűntudatkeltés. A levelek és a vezetett meditációs hanganyagok megmaradnak a postaládádban, így a saját időbeosztásod szerint bármikor folytathatod őket.",
  },
  {
    question: "Bármikor leiratkozhatok, ha mégsem nekem való?",
    answer:
      "Természetesen. Minden kiküldött levél alján találsz egy egykattintásos leiratkozási linket, így egyetlen gombnyomással bármikor megszüntetheted a tagságodat.",
  },
];

export default function AlapozoPage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Meditációs Alapozó",
    description: pageDescription,
    provider: {
      "@type": "Person",
      name: siteConfig.ownerFullName,
      url: siteConfig.url,
    },
    isAccessibleForFree: true,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT15M",
    },
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: ALAPOZO_FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <main className="relative isolate overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. BENEFIT-FIRST HERO SZEKCIÓ */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-28 grain-overlay">
        <OrganicBackground variant="hero" />

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <p className="animate-hero-in inline-flex items-center gap-2 rounded-full border border-forest-900/15 bg-white/90 px-4 py-1.5 font-serif text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 shadow-sm dark:border-sand-50/25 dark:bg-forest-800 dark:text-sand-50 sm:text-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
            Meditációs Alapozó · Ingyenes 7 napos útmutató
          </p>

          <h1 className="animate-hero-in mt-6 text-balance font-serif text-3xl font-medium leading-[1.18] tracking-tight text-forest-900 dark:text-sand-50 sm:text-5xl md:text-6xl">
            Nem kell megvilágosodnod ahhoz, hogy békére lelj.
          </h1>

          <p className="animate-hero-in mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-900/85 dark:text-sand-100/85 [animation-delay:100ms] sm:text-xl">
            Szabadulj meg a szüntelen túlagyalástól, a belső feszültségtől és a kimerültségtől.
            Tanuld meg úgy észrevenni a gondolataidat és visszatérni a jelenhez, hogy a nyugalmad
            a mindennapok pörgésében is veled maradjon.
          </p>

          {/* Fő benefit-ígéretek pontokba szedve a gyors áttekintéshez */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-900/75 dark:text-sand-100/75 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span> Kevesebb mentális zaj
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span> Érzelmi stabilitás a feszült napokon
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span> Mélyebb, pihentetőbb alvás
            </span>
          </div>

          {/* 3 lépéses belső mechanizmus (a stresszből a nyugalomba) */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm">
            <span className="rounded-full border border-forest-900/15 bg-white/75 px-4 py-2 font-medium text-forest-900 shadow-sm dark:border-sand-50/15 dark:bg-forest-800/60 dark:text-sand-50">
              1. Észreveszem a feszültséget
            </span>
            <span className="text-ink-900/40 dark:text-sand-100/40 font-bold">→</span>
            <span className="rounded-full border border-forest-900/15 bg-white/75 px-4 py-2 font-medium text-forest-900 shadow-sm dark:border-sand-50/15 dark:bg-forest-800/60 dark:text-sand-50">
              2. Szelíden visszatérek
            </span>
            <span className="text-ink-900/40 dark:text-sand-100/40 font-bold">→</span>
            <span className="rounded-full border border-forest-900/15 bg-white/75 px-4 py-2 font-medium text-forest-900 shadow-sm dark:border-sand-50/15 dark:bg-forest-800/60 dark:text-sand-50">
              3. Békével folytatom
            </span>
          </div>

          {/* Form ID: eERn80 — Medi Alapozó Form */}
          <div className="mt-10 flex w-full justify-center">
            <SenderForm
              formId="eERn80"
              id="alapozo-form"
              ctaLabel="Kérem a belső nyugalmat — Csatlakozom"
              offerNote="100% ingyenes útmutató · Reggelente érkező napi leckék · Bármikor 1 kattintással leiratkozhatsz"
            />
          </div>
        </div>
      </section>

      {/* 2. MIT VÁLTOZTAT MEG AZ ÉLETEDBEN A GYAKORLÁS? (Kulcsfontosságú Benefitek) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <OrganicBackground variant="offer" />

        <div className="mx-auto max-w-5xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Valódi átalakulás
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Mit ad neked a rendszeres belső csend?
            </h2>
            <p className="mt-4 text-balance text-ink-900/80 dark:text-sand-100/80 sm:text-lg">
              A meditáció nem öncélú gyakorlat és nem misztikus póz. Egy olyan belső eszköztár,
              ami kézzelfoghatóan jobbá, nyugodtabbá és élhetőbbé teszi a mindennapjaidat.
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {CORE_BENEFITS.map((b) => (
              <AnimatedSection key={b.title}>
                <HoverLiftCard className="flex h-full flex-col justify-between p-7 sm:p-8">
                  <div>
                    <span className="inline-block rounded-full bg-forest-900/10 px-3.5 py-1 text-xs font-semibold text-forest-900 dark:bg-sand-50/15 dark:text-sand-50">
                      {b.badge}
                    </span>
                    <h3 className="mt-4 font-serif text-xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-2xl">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-900/75 dark:text-sand-100/75 sm:text-base">
                      {b.description}
                    </p>
                  </div>
                </HoverLiftCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 3. MIÉRT FULLADT EDDIG KUDARCBA A MEDITÁCIÓ? (Tévhitek vs. Megkönnyebbülés) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="story" />

        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Miért fog most végre működni?
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Nem veled volt a baj: csak rossz szabályok szerint játszottál.
            </h2>
            <p className="mt-4 text-balance text-ink-900/80 dark:text-sand-100/80 sm:text-lg">
              Sokan azért adják fel a meditációt néhány nap után, mert elérhetetlen elvárásokat
              támasztanak magukkal szemben. A Nirmanában elengedjük a görcsös akarást.
            </p>
          </AnimatedSection>

          <div className="mt-12 space-y-5">
            {MYTHS_VS_BENEFITS.map((item, idx) => (
              <AnimatedSection key={idx}>
                <div className="rounded-2xl border border-forest-900/10 bg-white/75 p-6 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/50 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                    <span className="font-bold">✕ A régi tévhit:</span>
                    <span>{item.myth}</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-forest-900/10 dark:border-sand-50/10">
                    <p className="text-sm font-medium text-forest-900 dark:text-sand-50 sm:text-base leading-relaxed">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold mr-1.5">✓ A felszabadító valóság:</span>
                      {item.reality}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A 7 NAPOS ÁTALAKULÁS LÉPÉSEI (Benefit-vezérelt folyamat) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <OrganicBackground variant="cta" />

        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Lépésről lépésre
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Hogyan épül fel a belső nyugalmad 7 nap alatt?
            </h2>
            <p className="mt-3 text-ink-900/75 dark:text-sand-100/75 sm:text-lg">
              Nem száraz tananyagot kapsz, hanem napról napra egyre mélyebb megkönnyebbülést.
              Minden reggel egy rövid felismerés és egy azonnal kipróbálható vezetett hanganyag vár.
            </p>
          </AnimatedSection>

          <div className="mt-14 space-y-6">
            {TRANSFORMATION_DAYS.map((d, index) => (
              <AnimatedSection key={d.day}>
                <HoverLiftCard className="flex flex-col gap-4 p-6 sm:p-7 md:flex-row md:items-start md:gap-6">
                  <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-start">
                    <span className="font-serif text-2xl font-bold text-forest-900 dark:text-sand-50">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="rounded-full bg-forest-900/10 px-3 py-1 text-xs font-semibold text-forest-900 dark:bg-sand-50/15 dark:text-sand-50">
                      {d.day}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-medium tracking-tight text-forest-900 dark:text-sand-50">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/75 dark:text-sand-100/75 sm:text-base">
                      {d.benefit}
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-medium text-forest-900/90 dark:text-sand-100">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {d.breakthrough}
                    </div>
                  </div>
                </HoverLiftCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. KINEK SZÓL? (Érzelmi és élethelyzeti illeszkedés) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="story" />

        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Megérkezés önmagadhoz
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Neked szól ez az alapozó, ha...
            </h2>
          </AnimatedSection>

          <div className="mt-12 space-y-4">
            {TARGET_AUDIENCE.map((item, idx) => (
              <AnimatedSection key={idx}>
                <div className="flex items-start gap-4 rounded-2xl border border-forest-900/10 bg-white/75 p-5 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 font-serif text-sm font-bold text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300">
                    ✓
                  </span>
                  <p className="text-base leading-relaxed text-ink-900/80 dark:text-sand-100/80">
                    {item}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. HOGYAN MŰKÖDIK? (Egyszerű, sallangmentes lépések) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <OrganicBackground variant="offer" />

        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Egyszerű és kényelmes
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Hogyan illesztheted be a napjaidba?
            </h2>
            <p className="mt-3 text-ink-900/75 dark:text-sand-100/75">
              Nem kell átszervezned az életedet: a gyakorlás alkalmazkodik hozzád, nem fordítva.
            </p>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 sm:grid-cols-3">
            <AnimatedSection>
              <HoverLiftCard className="h-full p-6 text-center sm:text-left">
                <span className="font-serif text-3xl font-bold text-forest-900 dark:text-sand-50">
                  01
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-forest-900 dark:text-sand-50">
                  15 másodperces csatlakozás
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  Csak a keresztnevedet és a legfontosabb email címedet add meg. Semmi bonyolult
                  regisztráció vagy felesleges kérdés.
                </p>
              </HoverLiftCard>
            </AnimatedSection>

            <AnimatedSection>
              <HoverLiftCard className="h-full p-6 text-center sm:text-left">
                <span className="font-serif text-3xl font-bold text-forest-900 dark:text-sand-50">
                  02
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-forest-900 dark:text-sand-50">
                  Reggeli inspiráció és hanganyag
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  A levelek reggel 5:00-kor megérkeznek, bennük egy rövid gondolattal és egy
                  5–10 perces vezetett meditációval.
                </p>
              </HoverLiftCard>
            </AnimatedSection>

            <AnimatedSection>
              <HoverLiftCard className="h-full p-6 text-center sm:text-left">
                <span className="font-serif text-3xl font-bold text-forest-900 dark:text-sand-50">
                  03
                </span>
                <h3 className="mt-3 font-serif text-xl font-medium text-forest-900 dark:text-sand-50">
                  A te saját ritmusodban
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  A reggeli küldés nem követel hajnali ébredést. Akkor hallgatod meg, amikor
                  neked jólesik: kávézás előtt, ebédidőben vagy este.
                </p>
              </HoverLiftCard>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 7. BEMUTATKOZÁS (Kardos Bálint) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="story" />

        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-14">
            <AnimatedSection className="mx-auto w-full max-w-[240px] md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft-lg ring-1 ring-forest-900/10 dark:ring-sand-50/10">
                <Image
                  src="/images/kardos-balint-profil.jpg"
                  alt="Kardos Bálint"
                  fill
                  sizes="(min-width: 768px) 280px, 240px"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
                Az útmutatód
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
                Kardos Bálint
              </h2>

              <div className="mt-5 space-y-3 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-base">
                <p>
                  Szakmai háttér és minősítések:
                </p>
                <ul className="list-disc space-y-1 pl-5 text-ink-900/75 dark:text-sand-100/75">
                  <li>RYT-200 jógaoktatói képzés Indiában</li>
                  <li>Lifestyle Medicine Consultant végzettség a LifestylePro szervezetétől</li>
                  <li>Többéves személyes meditációs és tudatossági tapasztalat</li>
                </ul>
                <p className="pt-2">
                  Nem guruként vagy tévedhetetlen tanítóként vagyok jelen, hanem olyan gyakorlóként,
                  aki a saját elakadásain, szorongásain és túlagyalásain keresztül tanulta meg: a
                  meditáció nem a gondolatok elhallgattatásáról szól, hanem a figyelem szelíd,
                  következetes visszatéréséről és a belső biztonság megteremtéséről.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 8. ÖNKÉNTES TÁMOGATÁS TÁJÉKOZTATÓ (Kötelező masterprompt szöveg) */}
      <section className="relative overflow-hidden px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-forest-900/15 bg-white/90 p-7 text-center shadow-sm dark:border-sand-50/15 dark:bg-forest-800/80 sm:p-10">
          <h2 className="font-serif text-xl font-medium text-forest-900 dark:text-sand-50 sm:text-2xl">
            Önkéntes támogatás
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-base">
            A Meditációs Alapozó teljes egészében ingyenes. Ha szeretnéd támogatni a
            további ingyenes meditációs anyagok elkészítését, erre a feliratkozás után, a
            köszönőoldalon lesz lehetőséged. A támogatás teljesen önkéntes, a kurzus elérésének
            nem feltétele.
          </p>
        </div>
      </section>

      {/* 9. GYAKRAN ISMÉTELT KÉRDÉSEK (Kétségek eloszlatása & Megnyugtatás) */}
      <section className="relative px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-2xl">
          <AnimatedSection className="text-center">
            <p className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Minden kétséget eloszlatva
            </p>
            <h2 className="mt-3 font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Gyakran ismételt kérdések
            </h2>
            <p className="mt-3 text-sm text-ink-900/75 dark:text-sand-100/75 sm:text-base">
              Minden fontos tudnivaló, mielőtt megtennéd az első lépést a belső csend felé.
            </p>
          </AnimatedSection>

          <div className="mt-10">
            <Faq items={ALAPOZO_FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* 10. ZÁRÓ CTA */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="cta" />

        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <AnimatedSection>
            <p className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Találj vissza önmagadhoz
            </p>
            <h2 className="mt-3 text-balance font-serif text-3xl font-medium leading-tight tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Engedd meg magadnak a belső csendet – kezdd el még ma
            </h2>
            <p className="mt-4 text-balance text-base text-ink-900/75 dark:text-sand-100/75 sm:text-lg">
              Nem kell tovább egyedül cipelned a szüntelen feszültséget és a túlagyalást.
              Napi 10 perc elegendő ahhoz, hogy visszaszerezd a figyelmedet és békében éld a napjaidat.
            </p>
          </AnimatedSection>

          <AnimatedSection className="mt-10 flex w-full justify-center">
            <SenderForm
              formId="eERn80"
              id="alapozo-form-bottom"
              ctaLabel="Kérem a belső nyugalmat — Csatlakozom"
              offerNote="100% ingyenes útmutató · Napi 10–15 perc · Bármikor leiratkozhatsz"
            />
          </AnimatedSection>

          <div className="mt-10">
            <Link
              href="/"
              className="text-sm font-medium text-forest-900 underline underline-offset-2 hover:text-terracotta-700 dark:text-sand-100 dark:hover:text-sand-50"
            >
              ← Vissza a főoldalra
            </Link>
          </div>
        </div>
      </section>

      <StickyCTA
        targetId="alapozo-form"
        label="Kérem az ingyenes alapozót"
      />
    </main>
  );
}
