"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

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
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-forest-800/10 bg-sand-50/95 p-3 backdrop-blur-sm sm:hidden"
        >
          <button
            onClick={scrollToForm}
            className="w-full rounded-full bg-forest-800 px-6 py-3.5 font-medium text-sand-50 shadow-lg transition hover:bg-forest-900"
          >
            Gyere, tarts velem
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
