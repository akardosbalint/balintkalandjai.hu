"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";
import WaypointMarker from "./WaypointMarker";

/**
 * GYIK — a chatben véglegesített kérdés-válasz párok.
 * Rokon témák egy kérdésbe vonva (max. 10 tétel), hogy a szekció ne
 * legyen agyonnyomva. Accordion: alapból minden kérdés csukva,
 * kattintásra nyílik ki egyesével.
 */
const items: { question: string; answer: ReactNode }[] = [
  {
    question: "Ki vagy te, miért higgyek neked?",
    answer:
      "Nem vagyok különlegesebb nálad — csak egy 31 éves útkereső srác, aki egyetlen dologban (az ECO-ban) volt képes kitartó lenni egész életében, és keresi, hogy mi számára az önazonos hivatás az életben. Ne higgy nekem — nézd végig az utam, és aztán döntsd el, hogy tudsz-e azonosulni azzal, amit képviselek.",
  },
  {
    question: "Miért mész Indiáig, miért nem itthon végzed el a képzést?",
    answer:
      "Az érzés az, hogy ki kell szakadnom a mindennapok forgatagából ahhoz, hogy ez tényleg működjön. De van egy nagyon gyakorlati ok is: itthon egy 200 órás jógaképzés is 300–400 ezer forintba kerül, Indiában 290 ezer forintért kapok 500 órás képzést, plusz két hónap teljes ellátást — napi háromszori étkezést és szállást. A repjeggyel és vízummal együtt is 500 ezer forint alatt kijövök belőle, cserébe a forrásnál tanulhatok, és 500 órás képzésről kapok oklevelet, a szokásos 200 óra helyett.",
  },
  {
    question: "Mikor indul az út, meddig tart, és mi a terved utána?",
    answer:
      "A repülőm szeptember 26-án indul Budapestről, és várhatóan december 3-án érkezem vissza — összesen minimum 67 napot töltök Indiában. Ebből 58 nap a rishikeshi jógaoktatói képzés, október 1. és november 28. között. Hogy utána mi lesz — jógaoktató leszek itthon, vagy valami más —, azt még nem tudom. Az út valószínűleg sokat fog formálni rajtam ahhoz, hogy ezt előre megmondjam. Vannak ötleteim, de egyikhez sem szeretnék ragaszkodni. Majd kiderül.",
  },
  {
    question: "Mit kapok pontosan, ha feliratkozom, és mennyibe kerül?",
    answer:
      "Heti 1 hosszú, közvetlen, baráti hangvételű levelet emailben — azt, amit egy 60 másodperces videóban nem lehet elmondani: mit tanultam, mit rontottam el, min gondolkodtam hajnali négykor. Az első levél a feliratkozás utáni első vasárnap estig megérkezik, utána minden vasárnap jön egy új; a régieket utólag nem lehet visszaolvasni. Emellett napi rövid videót is találsz — elsősorban TikTokon, kapacitástól függően Instagram, Facebook Reels és YouTube Shorts is. Mindez teljesen ingyenes.",
  },
  {
    question: 'Mi az az ECO, és mi az az RYT-500 minősítés?',
    answer:
      "Az Energy of Consciousness (ECO) egy dogma- és vallásmentes önismereti technika, amit 3.5 éve minden nap gyakorlok — ez az egyetlen dolog, ami mellett valaha ilyen sokáig kitartottam, és filozófiájában közel áll a jógához. Az RYT-500 pedig egy 500 órás, a Yoga Alliance International (a legelterjedtebb nemzetközi akkreditációs szervezet) által elismert jógaoktatói minősítés — ezt szerzem meg Rishikeshben. Gyakorlatilag olyan, mintha az alapképzést és a mesterképzést egyben végezném el: az alap 200 órás szint fölött mélyebb tudást ad jóga-anatómiában, terápiás alkalmazásban, tanítási módszertanban, valamint a pranayama és a meditáció elmélyültebb gyakorlatában.",
  },
  {
    question: 'Ez egy "tanulj jógázni" hírlevél? Mi a célod ezzel?',
    answer:
      "Nem, ez nem oktatóanyag — hanem az, ahogy én élem meg élőben a képzést, a kétségekkel és a rossz napokkal együtt. Elsősorban magamnak dokumentálom, de remélem, hogy közben mást is inspirál. Azért csinálom nyilvánosan, mert tudom, hogy könnyebb kitartani, ha van, aki számon kér — és mert egy világban, ahol minden csak a filterekről szól, szeretnék valódi képet mutatni: a jó pillanatoktól a nehéz, próbára tevő napokig.",
  },
  {
    question: "Egyedül mész? Nem lesz nyelvi akadály?",
    answer:
      "Egyedül utazom, de egy szervezett csoportos képzésre érkezem a Rudra Yogpeeth Yoga Ashramba (Tapovan, Rishikesh, India). A képzés nyelve angol, de ez nálam nem akadály: közel anyanyelvi szinten beszélem, egy évtizede van C1-es nyelvvizsgám, és az elmúlt 15 évben is aktívan használtam a nyelvet.",
  },
  {
    question: "Milyen lesz egy átlagos napod, és hogyan fér bele a tartalomgyártás?",
    answer:
      "Kemény: 5-kor kelek, este 9-kor már alszom is. Közte mantra-éneklés, légzőgyakorlatok, klasszikus Hatha jóga, jógafilozófia és anatómia órák, karma jóga, önálló gyakorlás, Ashtanga Vinyasa, meditáció. A napi rövid videót és annak posztolását lefekvés előtt tervezem beilleszteni; a heti levél nehezebben fér bele — azokon a napokon valószínűleg egy órával később fekszem le, hogy megírjam.",
  },
  {
    question: "Mi van, ha közben meggondolod magad, vagy nem fejezed be a képzést?",
    answer:
      "Nem tudom kizárni. Ha ez történik, azt is megírom — pontosan úgy, ahogy van, szépítés nélkül. Nem ígérhetek happy endet, csak azt, hogy őszintén dokumentálom, bármerre alakul is.",
  },
  {
    question: "Bármikor leiratkozhatok?",
    answer: (
      <>
        Igen, egy kattintással — minden levél alján találsz erre linket. Az
        adataidat (email, opcionális keresztnév) a MailerLite kezeli, GDPR
        szerint; részletek az{" "}
        <a
          href="/adatkezeles"
          className="underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900"
        >
          Adatkezelési tájékoztatóban
        </a>
        .
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="faq" />

      <div className="mx-auto max-w-3xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            <WaypointMarker />
            Kérdésed van?
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Gyakran ismételt kérdések
          </h2>
        </AnimatedSection>

        <div className="mt-16 space-y-4">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <AnimatedSection
                key={item.question}
                delay={Math.min(i * 0.03, 0.3)}
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`shrink-0 text-terracotta-600 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <path
                      d="M10 3v14M3 10h14"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-6 pb-6 text-ink-900/70">
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
