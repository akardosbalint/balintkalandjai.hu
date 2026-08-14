import AnimatedSection from "./AnimatedSection";

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
      "A napi TikTok a highlight reel. A heti levél a director's cut: mit tanultam, mit rontottam el, min gondolkodtam négykor éjjel a szoba padlóján ülve.",
  },
  {
    title: "Nulla szűrés, nulla guru-pózolás",
    description:
      "Nem azt fogom írni, hogy „megtaláltam magam”. Lehet, hogy három hét múlva kiderül, tévedtem valamiben — azt is megírom, nem csak a szép részeket.",
  },
  {
    title: "Elsőbbség, amikor hazaérek",
    description:
      "Novemberben, amikor visszaérek Magyarországra, a levelezőlistám kapja meg elsőként a meghívót egy ingyenes, élő beszámolóra arról, mi történt ez alatt az 58 nap alatt.",
  },
  {
    title: "Korai hely az újévi elvonuláson és a programon",
    description:
      "Ha rezonál veled, amit csinálok, itt kapod meg elsőként a részleteket a januári „Tudatosság és Jelenlét” elvonulásról, és a 12+1 hetes programról, ami utána indul.",
  },
];

export default function WhatYouGet() {
  return (
    <section className="relative px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Mit kapsz
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Négy dolog, amire számíthatsz minden levélben
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 sm:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection
              key={item.title}
              delay={0.08 * i}
              className="rounded-2xl border border-forest-800/10 bg-white/50 p-8 backdrop-blur-sm"
            >
              <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta-500/15 font-serif text-terracotta-600">
                {i + 1}
              </span>
              <h3 className="font-serif text-xl text-forest-900">
                {item.title}
              </h3>
              <p className="mt-3 text-ink-900/70">{item.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
