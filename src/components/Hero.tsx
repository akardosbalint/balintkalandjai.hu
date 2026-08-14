"use client";

import { motion } from "framer-motion";
import OrganicBackground from "./OrganicBackground";
import SubscribeForm from "./SubscribeForm";

/**
 * A/B TESZTELHETŐ HEADLINE VARIÁCIÓK
 * -----------------------------------
 * A jelenleg aktív verzió az A. Ha A/B tesztelnél, cseréld ki az
 * `activeHeadline`-t az alábbiak közül egyre, vagy köss be egy
 * feature-flag / query param alapú választást.
 *
 * A) "Amíg te ezt olvasod, én épp a Himalája lábánál tanulok jógát
 *     tanítani." — a legszemélyesebb, "most történik" érzetű nyitás.
 *
 * B) "58 nap, 500 óra, és egy csomó dolog, amit szeretnék elmesélni
 *     neked." — konkrét számok, kíváncsiságot keltő listajelleg.
 *
 * C) "Nem egy újabb jóga-hírlevél. Egy heti levél arról, mit tanulok
 *     éppen most, Rishikeshben." — differenciáló, kimondja mi NEM ez.
 *
 * D) "Van egy történetem, ami épp most íródik Indiában — ha kíváncsi
 *     vagy a folytatásra, minden héten elküldöm." — sorozat-érzetet
 *     erősítő, "iratkozz fel a folytatásra" logika.
 */
const activeHeadline =
  "Amíg te ezt olvasod, én épp a Himalája lábánál tanulok jógát tanítani.";
const activeSubheadline =
  "És minden héten megírom, mit tanultam — egy mély, személyes levél, nem napi apróhirdetés.";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-28 sm:pt-36">
      <OrganicBackground variant="hero" />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-forest-800/15 bg-white/50 px-4 py-1.5 text-sm text-forest-800 backdrop-blur-sm"
        >
          Rishikesh, India · 58 napos, 500 órás jógaoktatói képzés
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-balance font-serif text-4xl leading-[1.15] text-forest-900 sm:text-5xl md:text-6xl"
        >
          {activeHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-xl text-balance text-lg text-ink-900/75 sm:text-xl"
        >
          {activeSubheadline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 flex w-full justify-center"
        >
          <SubscribeForm id="feliratkozas" />
        </motion.div>
      </div>
    </section>
  );
}
