"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CONSENT_EVENT, getStoredConsent } from "@/lib/analytics";

/**
 * Görgetés közben visszatérő CTA, ha a Hero form már nem látszik —
 * mobilon teljes szélességű alsó sáv, desktopon diszkrétebb, lebegő
 * gomb jobb alul, hogy ne törje meg az olvasást.
 */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  // Első látogatáskor, amíg a cookie consent döntés nincs meg, a
  // banner is alul, teljes szélességben jelenik meg mobilon — hogy a
  // kettő ne csússzon egymásra, a sticky CTA-t addig nem mutatjuk.
  const [consentDecided, setConsentDecided] = useState(false);

  useEffect(() => {
    setConsentDecided(getStoredConsent() !== null);
    function handleConsentChange() {
      setConsentDecided(true);
    }
    window.addEventListener(CONSENT_EVENT, handleConsentChange);
    return () =>
      window.removeEventListener(CONSENT_EVENT, handleConsentChange);
  }, []);

  useEffect(() => {
    const heroForm = document.getElementById("feliratkozas");
    if (!heroForm) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );

    observer.observe(heroForm);
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
      {visible && consentDecided && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-800/10 bg-sand-50/95 p-3 backdrop-blur-sm sm:inset-x-auto sm:bottom-6 sm:right-6 sm:border-none sm:bg-transparent sm:p-0"
        >
          <button
            onClick={scrollToForm}
            className="w-full rounded-full bg-forest-800 px-6 py-3.5 font-medium text-sand-50 shadow-lg transition hover:bg-forest-900 sm:w-auto sm:px-7 sm:shadow-xl"
          >
            Gyere, tarts velem
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
