"use client";

import { motion } from "framer-motion";
import JourneyProgress from "./JourneyProgress";
import OrganicBackground from "./OrganicBackground";
import SubscribeForm from "./SubscribeForm";
import Term from "./Term";

/**
 * HERO — headline + subheadline A/B variációk
 * ---------------------------------------------
 * A jelenleg aktív verzió az F. Csere: írd át az `activeHeadline` /
 * `activeSubheadline` konstansokat, vagy köss be egy feature-flag /
 * query param alapú választást.
 *
 * Közös elv minden verzióban: nem "iratkozz fel a hírlevélre" a
 * keret, hanem "gyere, kövesd végig, ahogy élőben keresem a
 * válaszokat" — lásd a copywriting-elveket a repo README-jében.
 *
 * IDŐBELISÉG — FONTOS: a képzés 2026. okt. 1-jén indul, tehát amíg a
 * tulajdonos el nem utazik, a szöveg NEM állíthatja, hogy már ott
 * van, vagy hogy már eltelt X nap ("58 napja Rishikeshben..." HIBÁS).
 * Jelen idő használható (pl. "58 napot töltök Rishikeshben"), de
 * csak terv/időtartam leírásaként, nem eltelt idő állításaként.
 *
 * F) "31 éven keresztül lemaradtam a saját életemről."
 *     — a jelenleg aktív verzió. Nem magyarázatot ad (mint az A: a
 *     "shiny object syndrome" minta), hanem egyenesen az érzést
 *     mondja ki, amiben ez a minta gyökerezik — ezért erősebb hook.
 *
 * A) "31 éves vagyok. Voltam már szinte minden — csak akasztott ember
 *     nem. Idén nyáron eldöntöttem, hogy ennek vége."
 *     — a legnyersebb, önironikus nyitás; a "shiny object syndrome"
 *     mintát mondja ki azonnal, majd a fordulat a subheadline-ban jön.
 *
 * B) "Voltam multis üzletkötő, konyhafőnök, magánsofőr, adománygyűjtő,
 *     alapítványi kuratóriumi elnök, podcaster, majdnem szinkron-
 *     színész. Egy dolog kivételével semmi nem tartott ki."
 *     — konkrét lista-headline, a mennyiség önmagában hitelesít.
 *
 * C) "Idén nyáron összetörtem. Aztán rájöttem, hogy 31 évig semmi nem
 *     tartott ki bennem — egy dolgot kivéve."
 *     — a legérzelmesebb nyitás, a törésre épít (finoman, klinikai
 *     részletek nélkül).
 *
 * D) "Se nem guru, se nem coach vagyok — csak egy 31 éves pasi, aki
 *     épp most próbálja kitalálni, mihez tudna végre hűséges maradni."
 *     — direkt pozicionálás a "nincsenek válaszaim" keretre.
 *
 * E) "Kipróbáltam majdnem mindent: multis sales-t, éttermi konyhát,
 *     adománygyűjtést, alapítványi kuratóriumot, podcastot, szinkront.
 *     3.5 éve van egy dolog, ami mellett mégis kitartottam."
 *     — a csavart (ECO) emeli be már a headline-ba, bizonyítékként.
 */
const activeHeadline = "31 éven keresztül lemaradtam a saját életemről.";
// Az aktív subheadline sima szövegként (A/B teszteléshez / kifejezés-
// magyarázatok nélkül): "Most Indiáig megyek, hogy behozzam a
// lemaradást. 58 napot töltök Rishikeshben, hogy a nemzetközi jóga
// szövetség által akkreditált, RYT-500 minősítésű jógaoktatóvá
// váljak, és élőben dokumentálom az egészet — napi egy TikTok-
// videóval és heti egy őszinte levéllel."
// A JSX-es változat lent a Term komponenssel koppintható/kattintható
// magyarázatot ad a "nemzetközi jóga szövetség" és "RYT-500"
// kifejezésekhez (telefonon is elérhető, nem csak hoverre).

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-20 pt-28 sm:pt-36">
      <OrganicBackground variant="hero" />

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
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
          Most Indiáig megyek, hogy behozzam a lemaradást. 58 napot töltök
          Rishikeshben, hogy a{" "}
          <Term
            definition={
              <>
                <strong className="font-medium text-forest-900">
                  Yoga Alliance International
                </strong>{" "}
                — a jógaoktatói képzések legelterjedtebb nemzetközi
                akkreditációs szervezete.
              </>
            }
          >
            nemzetközi jóga szövetség
          </Term>{" "}
          által akkreditált,{" "}
          <Term
            definition={
              <>
                <strong className="font-medium text-forest-900">
                  RYT-500
                </strong>{" "}
                — regisztrált, 500 órás jógaoktató-képzés minősítés.
              </>
            }
          >
            RYT-500
          </Term>{" "}
          minősítésű jógaoktatóvá váljak, és élőben dokumentálom az egészet
          — napi egy TikTok-videóval és heti egy őszinte levéllel.
        </motion.p>

        <div className="flex w-full justify-center">
          <JourneyProgress />
        </div>

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
