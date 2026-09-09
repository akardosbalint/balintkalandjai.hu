import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

/**
 * MIT KAPSZ — konkrét, kézzelfogható ígéretek
 * -----------------------------------------------
 * Elv: konkrétum az absztrakció helyett. Nincs "mély átalakulás" vagy
 * "megtalálod önmagad" típusú homályos ígéret — helyette pontosan az,
 * amit ténylegesen kapsz, hétről hétre.
 */
const items = [
  {
    title: "Heti 1 levél, nem napi optimizmus-adag",
    description:
      "A napi videó a highlight reel. A heti levél a director's cut: mit tanultam, mit rontottam el, min gondolkodtam négykor éjjel a szoba padlóján ülve.",
  },
  {
    title: "Nulla szűrés, nulla guru-pózolás",
    description:
      "Nem azt fogom írni, hogy „megtaláltam magam”. Lehet, hogy három hét múlva kiderül, tévedtem valamiben — azt is megírom, nem csak a szép részeket.",
  },
  {
    title: "Amit egy 60 másodperces videóban nem lehet elmondani",
    description:
      "A heti levélben visszamegyek a napi videó mögé: mit jelentett valójában az az órányi Hatha, Ashtanga vagy pranayama gyakorlat, és mihez kezdek azzal, amit aznap megtanultam.",
  },
  {
    title: "Élő, lezáratlan gondolkodás",
    description:
      "Nem utólag összerakott, szép ívű történetet kapsz. Minden levélben ott vannak a nyitott kérdések is: mit nem tudok még eldönteni, hol bizonytalanodom el, mit csinálnék most másképp.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="offer" />

      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400 sm:text-sm">
            Mit kapsz
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
            Négy dolog, amire számíthatsz minden levélben
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection
              key={item.title}
              delay={0.08 * i}
              className="rounded-2xl bg-white/70 p-6 shadow-soft ring-1 ring-ink-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:bg-forest-600/30 dark:ring-sand-100/10 sm:p-7"
            >
              <span className="font-serif text-2xl tracking-tight text-terracotta-600 dark:text-terracotta-400">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl tracking-tight text-forest-900 dark:text-sand-50">
                {item.title}
              </h3>
              <p className="mt-3 text-ink-900/70 dark:text-sand-100/70">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
