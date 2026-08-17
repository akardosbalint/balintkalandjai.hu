"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

const items = [
  {
    question: "Hol végzed a képzést?",
    answer:
      "Rudra Yogpeeth, Ghugtyani Malli, Tapovan, Rishikesh, Uttarakhand 249137, India.",
  },
  {
    question: "Mit tanítanak?",
    answer:
      "Az iskola a hagyományos Hatha jógát tanítja, kiemelt hangsúllyal a testtartás-korrekción és az igazodáson (alignment). Emellett megismerkedsz a Hatha Vinyasa flow-val, az Ashtanga Vinyasával, az ősi filozófiai tudással és a jógikus életmóddal, a pránajámával (légzéstechnikák), az anatómiával, a filozófiával, a meditációval és a mantrázással. Az egész egy összefüggő jógastílust ad át, benne a sima átmenetekkel egyik forma és a másik között — így minden területen bővül a tudásod és a gyakorlati tapasztalatod.\n\nJógastílusok, amikkel foglalkozunk: Hatha, Kundalini, Vinyasa, Nidra, Ashtanga, Karma, Terápiás jóga.",
  },
  {
    question: "Mennyibe kerül?",
    answer:
      "Az oda-vissza repjegy kb. 200 000 Ft, a képzés 899 dollár, aktuális árfolyamon kb. 285 000 Ft, plusz a vízum kb. 15 000 Ft (1 éves turista vízum). Az egész összesen kb. 500 000 Ft. Magyarországon egy 200 órás oktatóképzés 300–400 ezer Ft körül mozog — ez nem sokkal drágább annál, viszont 500 órás, és közvetlenül a forrástól jön.",
  },
  {
    question: "Milyen végzettséget ad?",
    answer: "Yoga Alliance RYT-500 minősítést.",
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
