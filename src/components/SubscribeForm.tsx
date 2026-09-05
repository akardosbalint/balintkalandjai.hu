"use client";

import { useId, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";

type Status = "idle" | "loading" | "success" | "error";

interface SubscribeFormProps {
  id?: string;
  ctaLabel?: string;
}

export default function SubscribeForm({
  id,
  ctaLabel = "Gyere, tarts velem",
}: SubscribeFormProps) {
  const uid = useId();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!consent) {
      setStatus("error");
      setErrorMessage(
        "Ehhez elfogadásra van szükség — pipáld ki, hogy küldhessek neked levelet."
      );
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, consent }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(
          data?.message ||
            "Valami elakadt nálunk. Próbáld meg még egyszer egy perc múlva."
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        "Nem sikerült elküldeni — ellenőrizd a netkapcsolatot, és próbáld újra."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        id={id}
        className="flex flex-col items-center gap-4 rounded-2xl border border-forest-800/10 bg-white/60 px-6 py-10 text-center backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/40"
      >
        <motion.svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          initial="hidden"
          animate="visible"
          className="text-forest-900 dark:text-sand-50"
        >
          <motion.circle
            cx="28"
            cy="28"
            r="26"
            stroke="currentColor"
            strokeWidth="2"
            variants={{
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeInOut" },
              },
            }}
          />
          <motion.path
            d="M17 29L24.5 36.5L39.5 20.5"
            stroke="#C1613C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: {
                pathLength: 1,
                transition: { duration: 0.6, delay: 0.5, ease: "easeInOut" },
              },
            }}
          />
        </motion.svg>
        <p className="font-serif text-xl text-forest-900 dark:text-sand-50">Ez megvan.</p>
        <p className="max-w-sm text-ink-900/70 dark:text-sand-100/70">
          Az első leveled jövő vasárnap estig megérkezik, egyenesen
          Rishikeshből. Ha nem találod, nézd meg a spam és a promóció
          mappákat is.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="w-full max-w-md"
      noValidate
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${uid}-firstName`} className="sr-only">
          Keresztnév (opcionális)
        </label>
        <input
          id={`${uid}-firstName`}
          name="firstName"
          type="text"
          autoComplete="given-name"
          placeholder="Keresztnév (opcionális)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-full border border-forest-800/15 bg-white/80 px-5 py-3 text-ink-900 placeholder:text-ink-900/65 outline-none transition focus:border-terracotta-500 dark:border-sand-50/20 dark:bg-forest-800/40 dark:text-sand-50 dark:placeholder:text-sand-100/50 sm:w-2/5"
        />
        <label htmlFor={`${uid}-email`} className="sr-only">
          Email cím
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="te@email.hu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-forest-800/15 bg-white/80 px-5 py-3 text-ink-900 placeholder:text-ink-900/65 outline-none transition focus:border-terracotta-500 dark:border-sand-50/20 dark:bg-forest-800/40 dark:text-sand-50 dark:placeholder:text-sand-100/50"
        />
      </div>

      <label
        htmlFor={`${uid}-consent`}
        className="mt-4 flex cursor-pointer items-start gap-3 text-left text-sm text-ink-900/70 dark:text-sand-100/70"
      >
        <input
          id={`${uid}-consent`}
          name="consent"
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-forest-800/30 text-terracotta-600 focus:ring-terracotta-500 dark:border-sand-50/30"
        />
        <span>
          Elfogadom, hogy {siteConfig.ownerFullName} heti emailt küldjön
          nekem, és megismertem az{" "}
          <a
            href="/adatkezeles"
            className="underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900 dark:hover:text-sand-50"
          >
            Adatkezelési Tájékoztatót
          </a>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-4 w-full rounded-full bg-forest-800 px-8 py-3.5 font-medium text-sand-50 transition hover:bg-forest-900 disabled:cursor-wait disabled:opacity-70 dark:bg-sand-50 dark:text-forest-900 dark:hover:bg-sand-100 sm:w-auto"
      >
        {status === "loading" ? "Küldés…" : ctaLabel}
      </button>

      <AnimatePresence>
        {status === "error" && (
          <motion.p
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-sm text-terracotta-700 dark:text-terracotta-400"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      <p className="mt-3 text-xs text-ink-900/65 dark:text-sand-100/65">
        Heti 1 levél. Nulla spam, nulla guru-duma. Bármikor egy kattintással
        leiratkozhatsz.
      </p>
    </form>
  );
}
