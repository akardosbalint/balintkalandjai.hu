"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

const items = [
  {
    question: "Hol végzed a képzést?",
    answer:
      "A Rudra Yogpeethen, Tapovanban, Rishikesh mellett, Indiában.",
  },
  {
    question: "Mit tanítanak?",
    answer:
      "Hagyományos Hatha jógát tanulok, igazodással és testtartással a középpontban. Emellett Vinyasát, Ashtangát, pránajámát, anatómiát, filozófiát, meditációt és mantrázást. A stílusok: Hatha, Kundalini, Vinyasa, Nidra, Ashtanga, Karma, terápiás jóga.",
  },
  {
    question: "Mennyibe kerül?",
    answer:
      "Összesen kb. 500 000 Ft-ba kerül: a repjegy kb. 200 000 Ft, a képzés 899 dollár (kb. 285 000 Ft), a vízum kb. 15 000 Ft. Egy hazai 200 órás képzés 300–400 ezer Ft — ez nem sokkal drágább annál, de 500 órás, és közvetlen a forrástól jön.",
  },
  {
    question: "Milyen végzettséget ad?",
    answer: "Yoga Alliance RYT-500 minősítést kapok.",
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
