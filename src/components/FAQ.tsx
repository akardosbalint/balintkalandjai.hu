"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

const items = [
  {
    question: "Hol végzed a képzést?",
    answer: "A Rudra Yogpeethen, Rishikeshben, Indiában.",
  },
  {
    question: "Mikor indulsz?",
    answer:
      "2026. szeptember 28-án. A képzés október 1. és november 27. között zajlik.",
  },
  {
    question: "Miért pont Rishikesht választottad?",
    answer:
      "Szerettem volna közvetlenül a forrásnál tanulni. Rishikesh a jóga fővárosa — itt a legerősebb a hagyomány.",
  },
  {
    question: "Mit tanítanak?",
    answer:
      "Hatha, Vinyasa és Ashtanga jóga mellett pránajámát (jógalégzést), yoga nidrát (jógaalvás), terápiás jógát, anatómiát, filozófiát, meditációt és mantrázást is tanulok.",
  },
  {
    question: "Mennyibe kerül?",
    answer:
      "Összesen kb. 500 000 Ft-ba kerül: a repjegy kb. 200 000 Ft, a képzés 899 dollár (kb. 285 000 Ft), a vízum kb. 15 000 Ft. Egy hazai 200 órás képzés 300–400 ezer Ft — ez nem sokkal drágább annál, de 500 órás, és közvetlen a forrástól jön.",
  },
  {
    question: "Milyen végzettséget ad, és miben más, mint a szokásos RYT-200?",
    answer:
      "Yoga Alliance RYT-500 minősítést kapok. Ez azt jelenti, hogy egy 200 órás alapképzésen felül még 300 óra haladó anyagot is elvégzek, mindezt egyben, egy iskolánál, megszakítás nélkül.\n\nAz RYT-200 az iparági alapszint: ennyi kell ahhoz, hogy valaki hivatalosan taníthasson és regisztrált oktató legyen — a legtöbb jógaoktató itt meg is áll. Az RYT-500 ennél mélyebb: több haladó ászana, alaposabb anatómia és filozófia, komolyabb tanítási gyakorlat. Gyakorlatilag két képzést végzek el egyszerre, nem két külön kurzust két különböző iskolában, ahogy sokan csinálják.",
  },
  {
    question: "Jógaoktató leszel utána?",
    answer:
      "Meglesz hozzá a papírom, de nem ez a fő cél. Azért megyek, hogy közelebb kerüljek magamhoz — az oktatás csak ráadás, ha úgy alakul.",
  },
  {
    question: "Miért csinálod ezt nyilvánosan?",
    answer:
      "Mert eddig mindent otthagytam, amint nehéz lett. Ha nyilvánosan vállalom, lesz, aki számon kéri rajtam — ez segít kitartani a nehéz napokon is.",
  },
  {
    question: "Mi az az ECO?",
    answer:
      "Az Energy of Consciousness (ECO) egy vallás- és dogmamentes önismereti út és energetikai módszer — nem gyógyászat, nem terápia. Régi energiagyógyászati hagyományokra épül, de önálló, saját eszköztárral. A célja, hogy a gyakorló egyre tudatosabbá váljon, és felelősséget vállaljon a saját életéért, reakcióiért, kapcsolataiért.",
  },
  {
    question: "Mikor és miért kezdted az ECO-t?",
    answer:
      "2023 februárjában, a válásom után kezdtem — egy nagy szerelmi csalódás után. Úgy tűnik, amikor összetörik a szívem, akkor jönnek életem legmeghatározóbb dolgai.",
  },
  {
    question: "Van köze az ECO-nak a jógához?",
    answer:
      "Igen, az elvei rokonok. Mindkettő a tudatosság fejlesztéséről szól — ezért éreztem természetesnek, hogy a jóga felé induljak, miután 3,5 éve minden nap, kihagyás nélkül gyakorlom az ECO-t.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="offer" />

      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Gyakran ismételt kérdések
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Amit a legtöbben megkérdeznek
          </h2>
        </AnimatedSection>

        <div className="mt-16 flex flex-col gap-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection
                key={item.question}
                delay={0.06 * i}
                className="rounded-2xl border border-forest-800/10 bg-white/50 backdrop-blur-sm"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="font-serif text-lg text-forest-900">
                    {item.question}
                  </span>
                  <span
                    className={`shrink-0 text-2xl leading-none text-terracotta-600 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="whitespace-pre-line px-6 pb-6 text-ink-900/70">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
