"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SubscribeForm from "./SubscribeForm";

const SESSION_KEY = "balint-exit-popup-shown";
const SUBSCRIBED_KEY = "balint-subscribed";
/** Ennyi ideig nem fegyverezzük fel a triggereket — a frissen érkezők
 * ne kapják meg azonnal, csak akit tényleg elveszítenénk. */
const ARM_DELAY_MS = 4000;
/** Ennyi felfelé görgetést kell megtennie gyorsan ahhoz, hogy a mobilos
 * "vissza a tetejére, majd bezárom a fület" mozdulatot elkapjuk. */
const FAST_SCROLL_UP_PX = 80;
const FAST_SCROLL_WINDOW_MS = 250;
const MIN_SCROLL_DEPTH_PX = 350;

function alreadyHandled() {
  try {
    return (
      sessionStorage.getItem(SESSION_KEY) === "1" ||
      localStorage.getItem(SUBSCRIBED_KEY) === "1"
    );
  } catch {
    return false;
  }
}

function markShown() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Privát böngészés — legfeljebb újra megjelenik, nem kritikus.
  }
}

/**
 * EXIT-INTENT POPUP
 * -------------------------------------------------------------------
 * Igazi "exit intent" esemény nem létezik a böngészőkben, ezért három,
 * egymást kiegészítő jelzést figyelünk, hogy asztali gépen ÉS mobilon
 * is működjön:
 *
 * 1) Asztali: az egér a viewport tetején hagyja el az oldalt (a fül
 *    bezárása / cím sor felé menet felé mutató klasszikus jel).
 * 2) Mobil: a böngésző vissza-gombja / vissza-gesztus — egy "őrző"
 *    history-bejegyzést tolunk be, és az első visszalépésen elkapjuk
 *    (popstate), utána már nem avatkozunk bele, hogy a második
 *    visszalépés valóban kivigye a látogatót.
 * 3) Mobil/asztali: gyors, nagy felfelé görgetés, miután a látogató
 *    már érdemben lejjebb görgetett — ez jellemzően a "vissza a
 *    tetejére, hogy bezárjam" mozdulat.
 *
 * Csak egyszer jelenik meg munkamenetenként (sessionStorage), és soha
 * nem jelenik meg, ha a látogató korábban már feliratkozott
 * (localStorage — a SubscribeForm állítja be sikeres feliratkozáskor).
 */
export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);
  const armedRef = useRef(false);
  const triggeredRef = useRef(false);
  const maxScrollRef = useRef(0);
  const scrollSamplesRef = useRef<{ y: number; t: number }[]>([]);

  function trigger() {
    if (triggeredRef.current || alreadyHandled()) return;
    triggeredRef.current = true;
    markShown();
    setVisible(true);
  }

  useEffect(() => {
    if (alreadyHandled()) return;

    const armTimer = window.setTimeout(() => {
      armedRef.current = true;
      // Mobil vissza-gomb elkapása: egy őrző history-bejegyzés, amit az
      // első visszalépés "elfogyaszt" — a popup megjelenik, a második
      // visszalépés pedig már valódi navigáció.
      window.history.pushState({ exitPopupGuard: true }, "");
    }, ARM_DELAY_MS);

    function handleMouseOut(e: MouseEvent) {
      if (!armedRef.current) return;
      // A viewport tetején, a böngésző-keret felé hagyja el az oldalt.
      if (e.clientY <= 0 && !e.relatedTarget) {
        trigger();
      }
    }

    function handlePopState() {
      if (!armedRef.current) return;
      trigger();
    }

    function handleScroll() {
      const y = window.scrollY;
      maxScrollRef.current = Math.max(maxScrollRef.current, y);

      const now = performance.now();
      const samples = scrollSamplesRef.current;
      samples.push({ y, t: now });
      while (samples.length > 0 && now - samples[0].t > FAST_SCROLL_WINDOW_MS) {
        samples.shift();
      }
      if (!armedRef.current || samples.length < 2) return;

      const oldest = samples[0];
      const scrolledUpFast = oldest.y - y >= FAST_SCROLL_UP_PX;
      const wasEngaged = maxScrollRef.current >= MIN_SCROLL_DEPTH_PX;
      if (scrolledUpFast && wasEngaged) {
        trigger();
      }
    }

    document.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setVisible(false);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-900/60 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-popup-headline"
          onClick={(e) => {
            if (e.target === e.currentTarget) setVisible(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-3xl bg-sand-50 p-7 shadow-2xl sm:p-9"
          >
            <button
              type="button"
              onClick={() => setVisible(false)}
              aria-label="Bezárás"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-900/40 transition hover:bg-forest-800/5 hover:text-ink-900"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 2L14 14M14 2L2 14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <p className="pr-8 text-sm font-medium uppercase tracking-widest text-terracotta-600">
              Mielőtt elmész
            </p>
            <h2
              id="exit-popup-headline"
              className="mt-3 text-balance font-serif text-2xl leading-tight text-forest-900 sm:text-3xl"
            >
              Ne hagyd, hogy az életed elmenjen melletted.
            </h2>
            <p className="mt-4 text-ink-900/75">
              31 évig szinte kizárólag kívülről szemléltem a saját
              életemet. Ha te is ismered ezt az érzést — a
              bizonytalanságot, a kétségeket, hogy sokáig nem találtad a
              helyed —, gyere velem. Heti 1 őszinte levél, ingyen. Hátha
              segít.
            </p>

            <div className="mt-6">
              <SubscribeForm
                ctaLabel="Igen, tartok veled"
                onSuccess={() => {
                  window.setTimeout(() => setVisible(false), 2200);
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => setVisible(false)}
              className="mt-4 text-sm text-ink-900/50 underline underline-offset-2 hover:text-ink-900/70"
            >
              Most nem
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
