"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/analytics";
import { EASE, SPRING } from "@/lib/motion";

// Ugyanazok az id-k, amikkel a StickyCTA is figyeli, hogy épp látszik-e
// valamelyik feliratkozó űrlap. A banner `position: fixed`, ezért — a
// z-index-től függetlenül — mindig a sima (nem pozícionált) tartalom,
// vagyis a Hero form fölé fest, ha a kettő geometriailag átfed. Kis
// mobil nézetablakon a Hero (headline + subheadline + JourneyProgress +
// form) magasabb, mint a viewport, így a form alsó fele (checkbox, gomb)
// pont ott lehet, ahova a banner felcsúszik — ilyenkor a banner lenyeli
// előle az érintéseket, a látogató nem tud rákoppintani semmire. Ezért a
// banner nem jelenhet meg, amíg egy feliratkozó űrlap a képernyőn van.
const SUBSCRIBE_FORM_IDS = ["feliratkozas", "feliratkozas-lent"];

export default function CookieConsent() {
  const [timerElapsed, setTimerElapsed] = useState(false);
  // Konzervatív alapérték: amíg az IntersectionObserver be nem áll, ne
  // higgyük, hogy szabad a terep.
  const [formInView, setFormInView] = useState(true);
  // Ha a látogató már döntött, a banner soha többé nem jelenhet meg —
  // enélkül a lenti "látszik a form / nem látszik" effekt egy későbbi
  // formInView-váltásra (pl. vissza-görgetés a Hero-hoz) tévesen újra
  // felvillantaná.
  const [decided, setDecided] = useState(false);
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    } else if (stored === null) {
      // Rövid késleltetés, mielőtt a sáv egyáltalán szóba kerül — enélkül
      // első látogatáskor a banner azonnal, a betöltéssel egyszerre
      // jelenne meg. A mérőkód gátlása (Consent Mode "denied" default)
      // így is azonnal érvényben van, ez a késleltetés csak a sáv
      // MEGJELENÉSÉT tolja el, a hozzájárulás nélküli mérést nem engedi
      // meg.
      const timer = setTimeout(() => setTimerElapsed(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const targets = SUBSCRIBE_FORM_IDS.map((id) =>
      document.getElementById(id)
    ).filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) {
      setFormInView(false);
      return;
    }

    const intersectingKeys = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            intersectingKeys.add(entry.target.id);
          } else {
            intersectingKeys.delete(entry.target.id);
          }
        }
        setFormInView(intersectingKeys.size > 0);
      },
      { threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setVisible(!decided && timerElapsed && !formInView);
  }, [decided, timerElapsed, formInView]);

  // A fixen alul lévő sáv rövidebb oldalakon (pl. FAQ) eltakarhatná az
  // utolsó tartalmat, mert onnan nincs hova tovább görgetni — ezért
  // amíg látszik, a body kap ugyanekkora alsó paddinget. Ugyanezt a
  // magasságot a --cookie-banner-h CSS-változóban is közzétesszük: a
  // StickyCTA ennyivel feljebb ül, így a kettő egyszerre is látszhat
  // anélkül, hogy egymásra csúsznának (korábban a sticky CTA a döntésig
  // egyáltalán nem jelent meg — aki a sávot figyelmen kívül hagyta, az
  // soha nem látta a lebegő CTA-t).
  useEffect(() => {
    const root = document.documentElement;
    if (!visible) {
      document.body.style.paddingBottom = "";
      root.style.removeProperty("--cookie-banner-h");
      return;
    }

    function updatePadding() {
      const height = `${bannerRef.current?.offsetHeight ?? 0}px`;
      document.body.style.paddingBottom = height;
      root.style.setProperty("--cookie-banner-h", height);
    }

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => {
      window.removeEventListener("resize", updatePadding);
      document.body.style.paddingBottom = "";
      root.style.removeProperty("--cookie-banner-h");
    };
  }, [visible]);

  function handleChoice(choice: "granted" | "denied") {
    setStoredConsent(choice);
    setDecided(true);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={bannerRef}
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE.smooth }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-forest-800/10 bg-sand-50/95 px-4 py-3 backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-900/95 sm:px-6 sm:py-5"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-2.5 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
            {/*
              Szándékosan rövid (mobilon ~3 sor): a hosszabb változat a
              képernyő negyedét takarta. A tartalom ugyanaz — a részletek
              az Adatkezelési tájékoztató 4. pontjában vannak.
            */}
            <p className="text-sm text-ink-900/75 dark:text-sand-100/75">
              Hozzájárulás nélkül a Google Analytics csak süti nélküli,
              anonim mérést végez. Engedélyezed a sütis mérést?{" "}
              <Link
                href="/adatkezeles"
                className="underline decoration-terracotta-500 underline-offset-2"
              >
                Részletek
              </Link>
            </p>
            <div className="flex shrink-0 gap-3">
              <motion.button
                type="button"
                onClick={() => handleChoice("denied")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.hover}
                className="rounded-full border border-forest-800/20 px-5 py-2 text-sm font-medium text-ink-900/70 transition-colors hover:bg-forest-800/5 dark:border-sand-50/20 dark:text-sand-100/70 dark:hover:bg-sand-50/10"
              >
                Elutasítom
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleChoice("granted")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.hover}
                className="rounded-full bg-saffron-500 px-5 py-2 text-sm font-medium text-forest-900 transition-colors hover:bg-saffron-600"
              >
                Elfogadom
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
