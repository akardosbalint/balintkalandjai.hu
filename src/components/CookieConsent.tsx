"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { getStoredConsent, setStoredConsent } from "@/lib/analytics";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    } else if (stored === null) {
      setVisible(true);
    }
  }, []);

  function handleChoice(choice: "granted" | "denied") {
    setStoredConsent(choice);
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-forest-800/10 bg-sand-50/95 px-6 py-5 backdrop-blur-sm"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
            <p className="text-sm text-ink-900/75">
              Látogatottság-mérésre (Google Analytics) csak a
              hozzájárulásoddal kerül sor — enélkül nem futnak
              mérőkódok. Bővebben az{" "}
              <Link
                href="/privacy-policy"
                className="underline decoration-terracotta-500 underline-offset-2"
              >
                Adatkezelési tájékoztatóban
              </Link>
              .
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => handleChoice("denied")}
                className="rounded-full border border-forest-800/20 px-5 py-2.5 text-sm font-medium text-ink-900/70 transition hover:bg-forest-800/5"
              >
                Elutasítom
              </button>
              <button
                type="button"
                onClick={() => handleChoice("granted")}
                className="rounded-full bg-forest-800 px-5 py-2.5 text-sm font-medium text-sand-50 transition hover:bg-forest-900"
              >
                Elfogadom
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
