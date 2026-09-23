"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/analytics";
import { EASE, SPRING } from "@/lib/motion";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    } else if (stored === null) {
      // Rövid késleltetés, mielőtt a sáv megjelenik — enélkül első
      // látogatáskor a banner azonnal, a betöltéssel egyszerre eltakarná
      // a Hero feliratkozó űrlapját (kis mobil nézetablaknál a banner
      // pont ráfedhet az űrlapra). A mérőkód gátlása (Consent Mode
      // "denied" default) így is azonnal érvényben van, ez a
      // késleltetés csak a sáv MEGJELENÉSÉT tolja el, a hozzájárulás
      // nélküli mérést nem engedi meg.
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  // A fixen alul lévő sáv rövidebb oldalakon (pl. FAQ) eltakarhatná az
  // utolsó tartalmat, mert onnan nincs hova tovább görgetni — ezért
  // amíg látszik, a body kap ugyanekkora alsó paddinget.
  useEffect(() => {
    if (!visible) {
      document.body.style.paddingBottom = "";
      return;
    }

    function updatePadding() {
      document.body.style.paddingBottom = `${bannerRef.current?.offsetHeight ?? 0}px`;
    }

    updatePadding();
    window.addEventListener("resize", updatePadding);
    return () => {
      window.removeEventListener("resize", updatePadding);
      document.body.style.paddingBottom = "";
    };
  }, [visible]);

  function handleChoice(choice: "granted" | "denied") {
    setStoredConsent(choice);
    setVisible(false);
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
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-forest-800/10 bg-sand-50/95 px-6 py-4 backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-900/95 sm:py-5"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 text-center sm:flex-row sm:justify-between sm:gap-4 sm:text-left">
            <p className="text-sm text-ink-900/75 dark:text-sand-100/75">
              Látogatottság-mérésre (Google Analytics) csak a
              hozzájárulásoddal kerül sor — enélkül nem futnak
              mérőkódok. Bővebben az{" "}
              <Link
                href="/adatkezeles"
                className="underline decoration-terracotta-500 underline-offset-2"
              >
                Adatkezelési tájékoztatóban
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <motion.button
                type="button"
                onClick={() => handleChoice("denied")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.hover}
                className="rounded-full border border-forest-800/20 px-5 py-2.5 text-sm font-medium text-ink-900/70 transition-colors hover:bg-forest-800/5 dark:border-sand-50/20 dark:text-sand-100/70 dark:hover:bg-sand-50/10"
              >
                Elutasítom
              </motion.button>
              <motion.button
                type="button"
                onClick={() => handleChoice("granted")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={SPRING.hover}
                className="rounded-full bg-saffron-500 px-5 py-2.5 text-sm font-medium text-forest-900 transition-colors hover:bg-saffron-600"
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
