"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface TermProps {
  /** A látható, aláhúzott kifejezés a szövegben. */
  children: ReactNode;
  /** A tooltip tartalma — rövid magyarázat. */
  definition: ReactNode;
}

/**
 * Inline kifejezés-magyarázat. Koppintásra/kattintásra nyílik ki — NEM
 * csak hoverre —, hogy telefonon (ahonnan a legtöbb látogató érkezik)
 * is elérhető legyen. Kattintás a kifejezésen kívülre, vagy Escape,
 * bezárja.
 */
export default function Term({ children, definition }: TermProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleOutside(event: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <span ref={ref} className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="underline decoration-dotted decoration-terracotta-500/70 underline-offset-4 cursor-help"
      >
        {children}
      </button>

      {/*
        A pozicionálás (left-1/2 + -translate-x-1/2) egy külön, NEM
        animált wrapperen ül. Ha ugyanarra az elemre tesszük, amit a
        Framer Motion mozgat (y/scale), a motion inline style.transform-ja
        felülírja a Tailwind transform-osztályt, és a tooltip kicsúszik
        a képernyő szélén — ezért a kettő szét van választva.
      */}
      <span className="absolute left-1/2 top-full z-20 mt-2 w-64 max-w-[min(16rem,calc(100vw-2rem))] -translate-x-1/2">
        <AnimatePresence>
          {open && (
            <motion.span
              initial={{ opacity: 0, y: 4, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 4, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="block rounded-xl border border-forest-800/10 bg-white px-4 py-3 text-left text-sm leading-snug text-ink-900/80 shadow-lg dark:border-sand-50/10 dark:bg-forest-800 dark:text-sand-100/80"
            >
              {definition}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </span>
  );
}
