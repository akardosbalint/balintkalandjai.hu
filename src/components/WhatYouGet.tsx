import AnimatedSection from "./AnimatedSection";

const items = [
  {
    title: "Heti egy mély levél, nem napi apróhirdetés",
    description:
      "Minden héten egy hosszabb, személyes reflexió arról, mit tanultam épp aznap vagy azon a héten — nem összefoglaló, hanem történet.",
  },
  {
    title: "Őszinte kulisszák, nem highlight reel",
    description:
      "A nehéz napok, a kétségek, a „minek csinálom ezt” pillanatok is benne lesznek — nem csak a szép naplementés fotók pillanata.",
  },
  {
    title: "Elsőbbség az élménybeszámoló eseményhez",
    description:
      "Amikor hazaérek novemberben, elsők között kapsz meghívót egy ingyenes, élő beszámolóra arról, mi történt ez alatt az 58 nap alatt.",
  },
  {
    title: "Korai hely az újévi elvonuláson és a programon",
    description:
      "A feliratkozók kapják meg elsőként a részleteket a „Tudatosság és Jelenlét” újévi elvonulásról, és a 12+1 hetes programról, ami utána indul.",
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
