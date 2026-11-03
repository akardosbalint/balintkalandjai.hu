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

const pageTitle = "Itt az ideje, hogy élj — ne csak túlélj! — Idegrendszeri Alapozó";
const pageDescription =
  "Ingyenes 7 napos e-mail kurzus: napi 2 perc olvasás és 5 perc célzott gyakorlat a nyugodtabb hétköznapokért.";

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

// 7 napos tematika: Lépésről lépésre, felesleges elméleti túlterhelés nélkül
// 3 letisztult szakasz a túlélő üzemmódból a valódi stabilitásba
const CURRICULUM_STAGES = [
  {
    step: "01",
    phase: "1. Szakasz",
    title: "Azonnali vészfék & Fiziológiai szünet",
    description:
      "Hogyan szakítsd meg a szimpatikus túlpörgést és a testben rekedt feszültséget percek alatt. Célzott légzés- és szemizmokhoz kötött reflexek, amelyek azonnal csökkentik a szívritmust.",
    highlight: "A testi stresszreakció közvetlen lekapcsolása percek alatt",
  },
  {
    step: "02",
    phase: "2. Szakasz",
    title: "Belső biztonságérzet & A Vagus-ideg aktiválása",
    description:
      "Átkapcsolás a regeneráló paraszimpatikus állapotba. Szomatikus földelés és a stressz két elsődleges testi raktárának (állkapocs és vállöv) feloldása alulról felfelé (bottom-up).",
    highlight: "A limbikus rendszer megnyugtatása a testérzeteken keresztül",
  },
  {
    step: "03",
    phase: "3. Szakasz",
    title: "Fenntartható mikrorutin & Idegrendszeri higiénia",
    description:
      "Tudatos mélypihenés (Mikro-NSDR) és a saját 5 perces idegrendszeri biztonsági horgonyod rögzítése, amely a legsűrűbb munkanapokon is tartható.",
    highlight: "Kényszermentes, tartós belső stabilitás a mindennapokban",
  },
];

// Kinek szól ez a kurzus? (A brief szerinti célcsoport)
const TARGET_AUDIENCE = [
  "Krónikus belső feszültséget és kimerültséget érzel, de nincs napi 30–60 perced bonyolult relaxációs technikákra.",
  "Nem még több elméletet vagy spirituális körmondatokat keresel, hanem azonnal megtapasztalható, biológiailag működő megoldást.",
  "Nehezen kapcsolsz ki este, zakatol az agyad a teendőkön és a feszültség a testedben (állkapocs, nyak, mellkas) reked.",
  "Úgy érzed, a napjaid állandó túlélésből és készenlétből állnak a valódi jelenlét és öröm helyett.",
  "Szeretnéd, hogy a feszültségoldás napi 5-7 percben, természetesen és bűntudat nélkül épüljön be a munkanapjaidba.",
];

// Gyakran Ismételt Kérdések
const ALAPOZO_FAQ_ITEMS = [
  {
    question: "Mennyi időt vesz igénybe egy-egy napi lecke?",
    answer:
      "Pontosan napi 2 perc olvasás és 5 perc célzott szomatikus gyakorlat — mindössze 7 perc összesen. Kifejezetten krónikusan túlterhelt, sűrű napirenddel élő embereknek terveztük: nem kapsz felesleges elméleti körmondatokat vagy 20 perces hanganyagokat, csak azonnal működő biológiai megoldásokat.",
  },
  {
    question: "Miért nem elegendő a képernyő előtti „pihenés”?",
    answer:
      "A közösségi média görgetése vagy a televízió nézése csupán eltereli a figyelmet, de az idegrendszert nem csillapítja: a vizuális ingerek és a kék fény fenntartják a készenléti állapotot. A kurzusban megmutatjuk, hogyan kapcsold be a valódi biológiai regenerációt.",
  },
  {
    question: "Mi az a Vagus-ideg, és hogyan segít a stresszoldásban?",
    answer:
      "A Vagus-ideg (bolygóideg) a szervezet elsődleges belső fékrendszere: összeköti az agyat a szívvel, tüdővel és a belső szervekkel. Amikor célzott légzéssel vagy mikroszomatikus gyakorlatokkal aktiválod, a pulzus lassul, és a tested azonnal átkapcsol regeneráló (paraszimpatikus) üzemmódba.",
  },
  {
    question: "Tényleg teljesen ingyenes a 7 napos kurzus?",
    answer:
      "Igen, 100%-ban ingyenes tudásmegosztás. Semmilyen bankkártyaadatot nem kérünk, a leckéket közvetlenül a megadott e-mail címedre kapod, és a leiratkozás bármikor egyetlen kattintás.",
  },
  {
    question: "Mikor érkeznek a napi levelek?",
    answer:
      "Minden reggel a postaládádban vár a napi lecke. A 2 perces olvasást és az 5 perces gyakorlatot a nap bármely szakaszában elvégezheted – reggeli indításként, a munkahelyi asztalodnál egy feszült pillanatban, vagy este lefekvés előtt.",
  },
  {
    question: "Mi történik, ha egy vagy több nap kimarad?",
    answer:
      "Semmi gond! Nincs teljesítménykényszer és nincs bűntudat. A levelek ott maradnak a postaládádban, így a saját ritmusodban bármikor visszatérhetsz hozzájuk.",
  },
];

export default function AlapozoPage() {
  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Idegrendszeri Alapozó — 7 napos e-mail kurzus",
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
      courseWorkload: "PT7M",
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

      {/* 1. HERO SZEKCIÓ (FŐKÉPERNYŐ) */}
      <section className="relative isolate overflow-hidden px-6 pb-20 pt-16 sm:pb-28 sm:pt-28 grain-overlay">
        <OrganicBackground variant="hero" />

        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          {/* H1 Főcím */}
          <h1 className="animate-hero-in text-balance font-serif text-3xl font-medium leading-[1.18] tracking-tight text-forest-900 dark:text-sand-50 sm:text-5xl md:text-6xl">
            Itt az ideje, hogy élj — ne csak túlélj!
          </h1>

          {/* Alcím */}
          <p className="animate-hero-in mt-6 max-w-2xl text-balance text-lg leading-relaxed text-ink-900/85 dark:text-sand-100/85 [animation-delay:100ms] sm:text-xl">
            Ingyenes 7 napos e-mail kurzus: napi 2 perc olvasás és 5 perc célzott gyakorlat a nyugodtabb hétköznapokért.
          </p>

          {/* Kiemelt pontok */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink-900/75 dark:text-sand-100/75 sm:text-sm">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span> Modern életmód-orvoslás és ősi jógikus tradíciók
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span> Napi 2 perc elmélet, 5 perc gyakorlat
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">✓</span> Pár nap után érzékelhető változás
            </span>
          </div>

          {/* Inline Feliratkozási Űrlap */}
          <div className="mt-10 flex w-full justify-center">
            <SenderForm
              formId="eERn80"
              id="alapozo-form"
              ctaLabel="Kérem a 7 napos alapozó kurzust!"
              offerNote="100% ingyenes e-mail kurzus · Napi 2 perc elmélet, 5 perc gyakorlat · Bármikor 1 kattintással leiratkozhatsz"
            />
          </div>
        </div>
      </section>

      {/* 2. MIÉRT HOZTAM LÉTRE EZT A KURZUST? (A probléma & empátia a brief szerint) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <OrganicBackground variant="story" />

        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              A probléma és empátia
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Miért hoztam létre ezt a kurzust?
            </h2>
          </AnimatedSection>

          <AnimatedSection className="mt-10 rounded-3xl border border-forest-900/10 bg-white/85 p-8 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/60 sm:p-10">
            <div className="space-y-5 text-base leading-relaxed text-ink-900/85 dark:text-sand-100/90 sm:text-lg">
              <p>
                A mai világban a krónikus kimerültség szinte <strong>normálállapottá vált</strong>. Úgy teszünk, mintha természetes lenne, hogy reggeltől estig feszültségben élünk, az agyunk még az ágyban fekve is szüntelenül pörög, és a nap végén az egyetlen menedékünk a telefon görgetése vagy a képernyő bámulása.
              </p>
              <p>
                De a képernyő <strong>nem pihenteti az idegrendszert</strong> — csak eltereli a figyelmet, miközben a stresszhormonok szintje folyamatosan magasan marad, a test pedig sosem kap valódi engedélyt a lazításra.
              </p>
              <p>
                Nem még több elméleti információra vagy órákig tartó meditációra van szükséged, hanem egy <strong>valóban működő megoldásra</strong>. Ez az ingyenes kurzus nem akarja a teljes szakirodalmat a nyakadba zúdítani: a modern életmód-orvoslás és az ősi jógikus tradíciók legtisztább esszenciáját sűríti napi 2 perc olvasásba és 5 perc célzott gyakorlatba, hogy a saját bőrödön tapasztald meg a szimpatikus túlpörgés megszelídítését.
              </p>
            </div>

            <div className="mt-8 border-t border-forest-900/10 pt-6 dark:border-sand-50/10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-ink-900/75 dark:text-sand-100/75">
                <span className="font-serif italic">„A stressz jelenléte nem a te hibád, de a megoldás a te kezedben van.”</span>
                <span className="font-medium text-forest-900 dark:text-sand-50">— Kardos Bálint</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 3. HOGYAN ÉPÜL FEL A 7 NAP? (Letisztult, egyszerűsített áttekintés) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="offer" />

        <div className="mx-auto max-w-4xl">
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Lépésről lépésre · Napi 7 perc
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Hogyan épül fel a 7 nap?
            </h2>
            <p className="mt-3 text-ink-900/75 dark:text-sand-100/75 sm:text-lg">
              Nem kapsz felesleges elméleti körmondatokat vagy bemagolandó anyagokat: minden reggel egyetlen, tiszta levél vár a postaládádban <strong>2 perc elmélettel és 5 perc célzott gyakorlattal</strong>.
            </p>
          </AnimatedSection>

          {/* 3 Fő Szakasz kártyái */}
          <div className="mt-12 space-y-5">
            {CURRICULUM_STAGES.map((item) => (
              <AnimatedSection key={item.step}>
                <HoverLiftCard className="flex flex-col gap-4 p-6 sm:p-7 md:flex-row md:items-start md:gap-6">
                  <div className="flex shrink-0 items-center gap-3 md:flex-col md:items-start">
                    <span className="font-serif text-2xl font-bold text-forest-900 dark:text-sand-50">
                      {item.step}
                    </span>
                    <span className="rounded-full bg-forest-900/10 px-3 py-1 font-serif text-xs font-semibold text-forest-900 dark:bg-sand-50/15 dark:text-sand-50">
                      {item.phase}
                    </span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-medium tracking-tight text-forest-900 dark:text-sand-50">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-base">
                      {item.description}
                    </p>
                    <div className="mt-3 inline-flex items-center text-xs font-medium text-forest-900/90 dark:text-sand-100">
                      <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      {item.highlight}
                    </div>
                  </div>
                </HoverLiftCard>
              </AnimatedSection>
            ))}
          </div>

          {/* Összegző mikro-kártya: A napi működési elv */}
          <AnimatedSection className="mt-8 rounded-2xl border border-forest-900/15 bg-white/70 p-6 backdrop-blur-sm dark:border-sand-50/15 dark:bg-forest-800/60 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-3 text-left">
              <div className="rounded-xl border border-forest-900/10 bg-white/60 p-4 dark:border-sand-50/10 dark:bg-forest-900/40">
                <p className="font-serif text-sm font-semibold text-forest-900 dark:text-sand-50">⏱️ Napi 2 perc elmélet</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  Tömör neurobiológiai megértés: miért reagál így a tested és hogyan hat az adott gyakorlat.
                </p>
              </div>
              <div className="rounded-xl border border-forest-900/10 bg-white/60 p-4 dark:border-sand-50/10 dark:bg-forest-900/40">
                <p className="font-serif text-sm font-semibold text-forest-900 dark:text-sand-50">🧘 Napi 5 perc gyakorlat</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  Azonnal végrehajtható szomatikus eszköz az íróasztalodnál vagy este az ágyban.
                </p>
              </div>
              <div className="rounded-xl border border-forest-900/10 bg-white/60 p-4 dark:border-sand-50/10 dark:bg-forest-900/40">
                <p className="font-serif text-sm font-semibold text-forest-900 dark:text-sand-50">🌱 Zéró bűntudat</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  Nincs teljesítménykényszer. Ha kimarad egy nap, a levelek megvárnak a postaládádban.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 4. KINEK SZÓL EZ A KURZUS? (Célcsoport definíció a brief szerint) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28">
        <OrganicBackground variant="story" />

        <div className="mx-auto max-w-3xl">
          <AnimatedSection className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Célcsoport
            </p>
            <h2 className="text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              Kinek szól ez a kurzus?
            </h2>
            <p className="mt-3 text-ink-900/75 dark:text-sand-100/75 sm:text-lg">
              Azoknak a tudatos embereknek készült, akik nem elvont teóriákra, hanem a zsúfolt hétköznapokba azonnal beépíthető, működő eszközökre vágynak:
            </p>
          </AnimatedSection>

          <div className="mt-12 space-y-4">
            {TARGET_AUDIENCE.map((item, idx) => (
              <AnimatedSection key={idx}>
                <div className="flex items-start gap-4 rounded-2xl border border-forest-900/10 bg-white/85 p-5 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/50">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 font-serif text-sm font-bold text-emerald-800 dark:bg-emerald-400/20 dark:text-emerald-300">
                    ✓
                  </span>
                  <p className="text-base leading-relaxed text-ink-900/85 dark:text-sand-100/85">
                    {item}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 5. A TRÉNERED (Kardos Bálint bemutatkozás & hitelesítések) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="cta" />

        <div className="mx-auto max-w-4xl">
          <div className="grid items-center gap-10 md:grid-cols-[280px_1fr] md:gap-14">
            <AnimatedSection className="mx-auto w-full max-w-[240px] md:max-w-none">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-soft-lg ring-1 ring-forest-900/10 dark:ring-sand-50/10">
                <Image
                  src="/images/kardos-balint-profil.jpg"
                  alt="Kardos Bálint — Tréner"
                  fill
                  sizes="(min-width: 768px) 280px, 240px"
                  className="object-cover"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection className="text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
                A trénered
              </p>
              <h2 className="mt-2 font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
                Kardos Bálint
              </h2>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-900/85 dark:text-sand-100/85 sm:text-base">
                <p>
                  A krónikus kimerültség, az insomnia és a pánikrohamok egy időben az életem mindennapos részei voltak. Pontosan ismerem a túlpörgött szimpatikus idegrendszer csapdáit és a tehetetlenség érzését.
                </p>
                <p>
                  Célom, hogy egyszerű, tiszta és a test szintjén működő eszközöket adjak a kezedbe, amelyek felesleges körmondatok nélkül segítenek visszatalálni a stabilitáshoz és a belső csendhez.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* HITELESSÉGI & SZAKMAI BLOKK: HOGYAN JÖVÖK ÉN AHHOZ... */}
          <AnimatedSection className="mt-12 rounded-3xl border border-forest-900/15 bg-white/95 p-6 shadow-sm backdrop-blur-sm dark:border-sand-50/15 dark:bg-forest-800/90 sm:p-9">
            <div className="text-center sm:text-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 dark:text-sand-100 sm:text-sm">
                Módszertani és szakmai megalapozottság
              </p>
              <h3 className="mt-2 text-balance font-serif text-2xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-3xl">
                Hogyan jövök én ahhoz, hogy idegrendszer-fejlesztési témával foglalkozzak?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-base">
                Az idegrendszer szabályozása nem ezotéria és nem pusztán elméleti tanulás: a <strong>nyugati orvostudomány élettani törvényei</strong> és a <strong>keleti több ezer éves szomatikus tapasztalás</strong> szétválaszthatatlan egysége. A munkám ezen a három szilárd pilléren nyugszik:
              </p>
            </div>

            {/* A 3 egységes pillér kártya: Nyugati orvoslás + Keleti szomatika + Tudományos bizonyíték */}
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {/* 1. Pillér: Nyugati orvostudomány */}
              <div className="flex flex-col justify-between rounded-2xl border border-forest-900/10 bg-white/80 p-5 shadow-xs dark:border-sand-50/10 dark:bg-forest-900/50">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200">
                      🔬
                    </span>
                    <h4 className="font-serif text-base font-medium text-forest-900 dark:text-sand-50">
                      A tudományos „Miért”
                    </h4>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    Lifestyle Medicine Consultant (LifestylePro Academy)
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-sm">
                    Egzakt neurobiológiai háttér: a HPA-tengely (stresszhormonok), a bolygóideg (nervus vagus) és az autonóm idegrendszer működése. Nem tüneti kezelés, hanem a biológiai ok-okozati összefüggések pontos ismerete.
                  </p>
                </div>
              </div>

              {/* 2. Pillér: Keleti szomatika */}
              <div className="flex flex-col justify-between rounded-2xl border border-forest-900/10 bg-white/80 p-5 shadow-xs dark:border-sand-50/10 dark:bg-forest-900/50">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200">
                      🧘
                    </span>
                    <h4 className="font-serif text-base font-medium text-forest-900 dark:text-sand-50">
                      A szomatikus „Hogyan”
                    </h4>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    500 órás jógaoktató (Rudra YogPeeth, Rishikesh)
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-sm">
                    500 intenzív óra a forrásnál, Indiában: a pránájáma (légzés mint azonnali idegrendszeri beavatkozás), a pratjáhára és a Jóga Nidra (tudatos mélyregeneráció) közvetlenül a test szintjén ható, évezredes eszköztára.
                  </p>
                </div>
              </div>

              {/* 3. Pillér: A tudományos igazolás (Szerzetes-kutatások) */}
              <div className="flex flex-col justify-between rounded-2xl border border-forest-900/10 bg-white/80 p-5 shadow-xs dark:border-sand-50/10 dark:bg-forest-900/50">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-900 dark:bg-emerald-400/20 dark:text-emerald-200">
                      🏛️
                    </span>
                    <h4 className="font-serif text-base font-medium text-forest-900 dark:text-sand-50">
                      A bizonyított eredmény
                    </h4>
                  </div>
                  <p className="mt-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                    PNAS & Harvard kutatási háttér
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-sm">
                    A szerzeteseken végzett EEG- és agyi vizsgálatok (Dr. Richard Davidson, PNAS; Dr. Herbert Benson, Harvard) igazolták: a szomatikus gyakorlatok mérhető neuroplaszticitást és autonóm szabályozást hoznak létre. A nyugalom edzhető képesség.
                  </p>
                </div>
              </div>
            </div>

            {/* Egységes záró szintézis */}
            <div className="mt-7 rounded-2xl border border-emerald-600/20 bg-emerald-500/10 p-5 text-left dark:border-emerald-400/25 dark:bg-emerald-950/20">
              <p className="text-sm leading-relaxed text-ink-900/85 dark:text-sand-100/90 sm:text-base">
                <strong>A célom és ígéretem:</strong> A legtöbb jógaoktatásból hiányzik a modern orvosi megértés, a hagyományos orvoslás pedig ritkán ad a feszült pillanatban 5 perc alatt bevethető testi eszközt. Ez a kettős háttér biztosítja, hogy amit tőlem tanulsz, az <strong>tudományosan is helytálló, a tested szintjén azonnal működő, sallangmentes megoldás</strong>.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 6. ÖNKÉNTES TÁMOGATÁS TÁJÉKOZTATÓ */}
      <section className="relative overflow-hidden px-6 py-14 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-forest-900/15 bg-white/90 p-7 text-center shadow-sm dark:border-sand-50/15 dark:bg-forest-800/80 sm:p-10">
          <h2 className="font-serif text-xl font-medium text-forest-900 dark:text-sand-50 sm:text-2xl">
            100%-ban Ingyenes Tudásmegosztás
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-base">
            Az Idegrendszeri Alapozó teljes egészében ingyenes. Ha a kurzus elvégzése után szeretnéd önkéntesen támogatni a további ingyenes anyagok elkészítését, erre a feliratkozás utáni köszönőoldalon lesz lehetőséged. A támogatás teljesen opcionális, a leckék elérésének semmilyen formában nem feltétele.
          </p>
        </div>
      </section>

      {/* 7. GYAKRAN ISMÉTELT KÉRDÉSEK */}
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
              Minden fontos részlet az Idegrendszeri Alapozó kurzusról:
            </p>
          </AnimatedSection>

          <div className="mt-10">
            <Faq items={ALAPOZO_FAQ_ITEMS} />
          </div>
        </div>
      </section>

      {/* 8. ZÁRÓ / ALSÓ CSATLAKOZÁSI SZEKCIÓ (Brief E. pont) */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 grain-overlay">
        <OrganicBackground variant="cta" />

        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <AnimatedSection>
            <p className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-forest-900 dark:text-sand-100 sm:text-sm">
              Csatlakozz most
            </p>
            {/* Záró idézet a brief alapján */}
            <h2 className="mt-3 text-balance font-serif text-2xl font-medium leading-relaxed tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
              „A stressz jelenléte nem a te hibád, de a megoldás a te kezedben van. Tedd meg az első lépést a belső csend felé.”
            </h2>
            <p className="mt-4 text-balance text-base text-ink-900/75 dark:text-sand-100/75 sm:text-lg">
              Kezdd el még ma az ingyenes 7 napos e-mail kurzust, és tapasztald meg a valódi idegrendszeri regenerációt.
            </p>
          </AnimatedSection>

          {/* Ismételt feliratkozási űrlap a brief szerint */}
          <AnimatedSection className="mt-10 flex w-full justify-center">
            <SenderForm
              formId="eERn80"
              id="alapozo-form-bottom"
              ctaLabel="Kérem a 7 napos alapozó kurzust!"
              offerNote="100% ingyenes e-mail kurzus · Napi 2 perc elmélet, 5 perc gyakorlat · Bármikor leiratkozhatsz"
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
        label="Kérem a 7 napos alapozó kurzust!"
      />
    </main>
  );
}
