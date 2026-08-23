"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

/**
 * GYIK — a feliratkozás előtti utolsó akadályok elhárítása
 * -----------------------------------------------------------------
 * Nem "válaszaim vannak" hangnem, hanem a konkrét, gyakorlati kérdések
 * (mikor, mennyi ideig, mibe kerül, mi lesz az adataimmal) tisztázása
 * — a SocialProof után, közvetlenül a záró CTA előtt, hogy az utolsó
 * kétségek se maradjanak nyitva feliratkozás előtt.
 */
const items: { question: string; answer: ReactNode }[] = [
  {
    question: "Mikor mész, és mennyi ideig leszel kint?",
    answer:
      "Szeptember 28-án hajnalban indulok Budapestről, másnap lépek be Indiába. Október 1. és november 28. között zajlik maga a képzés Rishikeshben, december 2-án indulok haza, és december 3-án este érek Magyarországra — összesen kábé 9 hetet töltök kint.",
  },
  {
    question: "Mi az a RYT-500 képzés, amit csinálsz?",
    answer:
      "Egy 500 órás jógaoktatói képzés Rishikeshben, a „jóga fővárosában”, amit a Yoga Alliance International akkreditál — ez a legelterjedtebb nemzetközi minősítés jógaoktatóknak.",
  },
  {
    question: "Ingyenes a hírlevél? Kell fizetnem bármiért?",
    answer:
      "Igen, teljesen ingyenes. Nem árulok kurzust, nem coacholok, és nem jön semmilyen upsell a végén — csak dokumentálom élőben, ami történik, napi egy TikTok-videóval és heti egy hosszú levéllel.",
  },
  {
    question: "Miért higgyek neked, ha nem vagy se guru, se jógaoktató?",
    answer:
      "Ne higgy — kövesd végig, és dönts magad. Nincsenek bekészített válaszaim, és lehet, hogy én magam is tévedek valamiben útközben. Pont ez a lényeg: nyilvánosan csinálom, hogy legyen, aki számon kérje rajtam.",
  },
  {
    question: "Bármikor leiratkozhatok? Mi lesz az adataimmal?",
    answer: (
      <>
        Igen, egy kattintással, minden levél alján találsz erre gombot. Az
        adataidat kizárólag a hírlevél küldésére használom — a részleteket
        megtalálod az{" "}
        <Link
          href="/adatkezeles"
          className="underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900"
        >
          adatkezelési tájékoztatóban
        </Link>
        .
      </>
    ),
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="gyik"
      className="relative overflow-hidden px-6 py-24 sm:py-32"
    >
      <OrganicBackground variant="offer" />

      <div className="mx-auto max-w-2xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Kérdésed van?
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Gyakran ismételt kérdések
          </h2>
        </AnimatedSection>

        <div className="mt-12 space-y-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection
                key={item.question}
                delay={0.06 * i}
                className="overflow-hidden rounded-2xl border border-forest-800/10 bg-white/50 backdrop-blur-sm"
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
                    aria-hidden="true"
                    className={`shrink-0 text-xl text-terracotta-600 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
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
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-ink-900/70">
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
