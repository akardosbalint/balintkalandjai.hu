"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { DURATION, EASE } from "@/lib/motion";
import { Stagger, StaggerItem } from "./AnimatedSection";
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
 * Közös elv minden verzióban: nem "iratkozz fel a heti hangfelvételre" a
 * keret, hanem "gyere, kövesd végig, ahogy élőben keresem a
 * válaszokat" — lásd a copywriting-elveket a repo README-jében.
 *
 * IDŐBELISÉG — FONTOS: az utazás 2026. szept. 26-án indul Mo.-ról,
 * megérkezés Indiába 2026. szept. 28-án, hazaindulás Dehradunból
 * 2026. dec. 3-án. A 2026. okt. 1. – nov. 28. közötti 500 órás
 * akkreditált képzés csak a 67 napos indiai tartózkodás egy szelete —
 * korábban érkezik és később utazik haza, mint a képzés kezdete/vége.
 * Tehát amíg a tulajdonos el nem utazik, a szöveg NEM állíthatja, hogy
 * már ott van, vagy hogy már eltelt X nap ("67 napja Rishikeshben..."
 * HIBÁS).
 * Jelen idő használható (pl. "67 napot töltök Indiában"), de
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
// lemaradást. 70 napot töltök Rishikeshben, ahol elvégzek egy
// nemzetközi jóga szövetség által akkreditált, RYT-500 minősítésű
// jógaoktatói képzést, és élőben dokumentálom az egészet."
// A JSX-es változat lent a Term komponenssel koppintható/kattintható
// magyarázatot ad a "nemzetközi jóga szövetség" és "RYT-500"
// kifejezésekhez (telefonon is elérhető, nem csak hoverre).

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Finom parallax a háttér-blobokon — a szöveg fölött, alig érzékelhetően
  // lassabban mozog görgetéskor, mint a tartalom. Csökkentett mozgás
  // preferenciánál (prefers-reduced-motion) teljesen kikapcsolva, mert ez
  // egy folyamatos, nem felhasználó-kezdeményezte animáció.
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 56]
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden px-6 pb-20 pt-20 sm:pt-36 grain-overlay"
    >
      {/*
        pointer-events-none itt kötelező: ez a wrapper `position: absolute`
        (a parallax `y` transform miatt kell), ezért — a z-indextől
        függetlenül — a stacking felett fest a lenti statikus tartalomhoz
        (form) képest. OrganicBackground saját gyökéreleme maga is
        pointer-events-none, de az csak a GYEREKRE vonatkozik: ha ez a
        wrapper-DIV maga (ami a teljes szekciót lefedi) nem kapja meg
        ugyanezt, ő maga nyeli le az érintéseket a form fölött — ez okozta,
        hogy mobilon nem lehetett a feliratkozó űrlapba koppintani.
      */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ y: backgroundY }}
      >
        <OrganicBackground variant="hero" />
      </motion.div>

      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {/*
          A H1/subheadline itt a mérésekben az LCP (Largest Contentful
          Paint) elem — hosszú fade-in delay/duration esetén ez
          közvetlenül rontja a Core Web Vitals LCP metrikáját (mért
          eset: ~2.6s "element render delay" a korábbi 0.35s delay +
          1.1s duration miatt). Ezért ennél a két elemnél rövidebb az
          animáció, mint a lentebbieknél — ez a motion-rendszer
          DURATION.base értéke, szándékosan nem a lassabb DURATION.slow.
        */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.05, ease: EASE.smooth }}
          className="text-balance font-serif text-4xl font-medium leading-[1.15] tracking-tight text-forest-900 dark:text-sand-50 sm:text-5xl md:text-6xl"
        >
          {activeHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DURATION.base, delay: 0.15, ease: EASE.smooth }}
          className="mt-4 max-w-xl text-balance text-lg text-ink-900/75 dark:text-sand-100/75 sm:mt-6 sm:text-xl"
        >
          Most Indiáig megyek, hogy behozzam a lemaradást. 70 napot töltök
          Rishikeshben, ahol elvégzek egy{" "}
          <Term
            definition={
              <>
                <strong className="font-medium text-forest-900 dark:text-sand-50">
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
                <strong className="font-medium text-forest-900 dark:text-sand-50">
                  RYT-500
                </strong>{" "}
                — regisztrált, 500 órás jógaoktató-képzés minősítés.
              </>
            }
          >
            RYT-500
          </Term>{" "}
          minősítésű jógaoktatói képzést, és élőben dokumentálom az egészet.
        </motion.p>

        <Stagger className="mt-6 flex w-full flex-col items-center sm:mt-10" gap={0.15}>
          <StaggerItem className="flex w-full justify-center">
            <JourneyProgress />
          </StaggerItem>

          <StaggerItem className="mt-6 flex w-full justify-center sm:mt-10">
            <SubscribeForm id="feliratkozas" />
          </StaggerItem>
        </Stagger>
      </div>

      <ScrollCue />
    </section>
  );
}

/**
 * Finom, görgetésre invitáló jelzés a hero alján — csak asztali nézeten
 * (mobilon a sticky CTA és a form már eleve látótérben van, felesleges
 * duplikáció lenne). Csökkentett mozgás preferenciánál a globális
 * `prefers-reduced-motion` CSS szabály (globals.css) automatikusan
 * lenullázza az animáció időtartamát, nincs szükség külön JS-guardra.
 */
function ScrollCue() {
  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION.slower, delay: 1.1, ease: EASE.smooth }}
      className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center sm:flex"
    >
      <div className="flex flex-col items-center gap-2 text-ink-900/35 dark:text-sand-100/30">
        <span className="h-9 w-px animate-breathe-slow bg-current" />
        <span className="h-1.5 w-1.5 animate-breathe rounded-full bg-current" />
      </div>
    </motion.div>
  );
}
