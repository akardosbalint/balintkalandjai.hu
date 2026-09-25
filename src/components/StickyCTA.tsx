"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, SPRING } from "@/lib/motion";

// Minden hely, ahol a látogató már látja a feliratkozó űrlapot (vagy a
// footert) — ilyenkor a lebegő CTA felesleges, sőt zavaró duplikáció
// lenne (két "Gyere, tarts velem" gomb egymáson).
const SUBSCRIBE_FORM_IDS = ["feliratkozas", "feliratkozas-lent"];

/**
 * Görgetés közben visszatérő CTA, ha épp egyik feliratkozó űrlap (Hero,
 * SecondCTA) és a footer sem látszik — mobilon teljes szélességű alsó
 * sáv, desktopon diszkrétebb, lebegő gomb jobb alul, hogy ne törje meg
 * az olvasást.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const intersectingKeys = useRef(new Set<string>());

  useEffect(() => {
    const footer = document.querySelector("footer");
    const targets = [
      ...SUBSCRIBE_FORM_IDS.map((id) => document.getElementById(id)),
      footer,
    ].filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const key = entry.target.id || "footer";
          if (entry.isIntersecting) {
            intersectingKeys.current.add(key);
          } else {
            intersectingKeys.current.delete(key);
          }
        }
        setVisible(intersectingKeys.current.size === 0);
      },
      { threshold: 0 }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);

  function scrollToForm() {
    document.getElementById("feliratkozas")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE.smooth }}
          // Ha a cookie-sáv épp látszik, a CookieConsent a magasságát a
          // --cookie-banner-h változóba írja — a CTA ennyivel feljebb ül,
          // hogy a kettő ne takarja egymást.
          style={{ bottom: "calc(var(--cookie-banner-h, 0px) + var(--sticky-gap, 0px))" }}
          className="fixed inset-x-0 z-50 border-t border-forest-800/10 bg-sand-50/95 p-3 backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-900/95 sm:inset-x-auto sm:[--sticky-gap:1.5rem] sm:right-6 sm:border-none sm:bg-transparent sm:p-0"
        >
          <motion.button
            onClick={scrollToForm}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={SPRING.hover}
            className="w-full rounded-full bg-saffron-500 px-6 py-3.5 font-medium text-forest-900 shadow-soft outline-none transition-colors duration-200 hover:bg-saffron-600 focus-visible:ring-2 focus-visible:ring-forest-900/40 dark:focus-visible:ring-sand-50/50 sm:w-auto sm:px-7 sm:shadow-glow-saffron"
          >
            Gyere, tarts velem
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
