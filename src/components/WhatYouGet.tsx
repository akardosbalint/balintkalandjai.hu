import AnimatedSection from "./AnimatedSection";
import HoverLiftCard from "./HoverLiftCard";
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
    title: "Heti 1x 20-30 perces hangfelvétel",
    description:
      "Ha feliratkozol, minden vasárnap egy 20-30 perces, vágatlan, exkluzív hanganyag érkezik a postaládádba: mit tanultam, mit rontottam el, min gondolkodtam hajnali négykor éjjel a szoba padlóján ülve stb.",
  },
  {
    title: "Nulla szűrő, teljes transzparencia",
    description:
      "Nem szépítek és nem vágok ki semmit: a jó napok mellett a rossz napokat, a kételyeimet és a hibáimat is hallani fogod. Ha három hét múlva kiderül, hogy valamiben tévedtem, azt is elmondom.",
  },
  {
    title: "Amit egy 60 másodperces videóban nem lehet elmondani",
    description:
      "A heti hangfelvételben beengedlek a kulisszák mögé. Elmesélem, mit jelentett valójában egy órányi Hatha, Ashtanga vagy Iyengar gyakorlat, egy pranayama- vagy jógaalvás- (yoga nidra) foglalkozás, és mihez kezdek azzal, amit aznap megtanultam.",
  },
  {
    title: "Lezáratlan gondolatmenetek",
    description:
      "Nem utólag összerakott, szép ívű történetet kapsz. Minden hangfelvételben ott vannak a nyitott kérdések is: mit nem tudok még eldönteni, hol bizonytalanodom el, mit csinálnék most másképp.",
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
            Ezt kapod minden vasárnap
          </h2>
        </AnimatedSection>

        <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {items.map((item, i) => (
            <AnimatedSection key={item.title}>
              <HoverLiftCard>
                <span className="font-serif text-2xl tracking-tight text-terracotta-600 dark:text-terracotta-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-serif text-xl tracking-tight text-forest-900 dark:text-sand-50">
                  {item.title}
                </h3>
                <p className="mt-3 text-ink-900/70 dark:text-sand-100/70">{item.description}</p>
              </HoverLiftCard>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
