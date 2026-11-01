"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { EMAIL_MAX_LENGTH, EMAIL_REGEX, FIRST_NAME_MAX_LENGTH } from "@/lib/validation";
import { SUBSCRIBE_EVENTS, trackEvent } from "@/lib/analytics";
import { getEmailDomain, SUBSCRIBED_DOMAIN_STORAGE_KEY } from "@/lib/mail-providers";
import { SPRING } from "@/lib/motion";
import type { SenderFormId } from "@/lib/sender";

export type { SenderFormId };

declare global {
  interface Window {
    sender?: (...args: unknown[]) => void;
  }
}

interface SenderFormProps {
  formId: SenderFormId;
  id?: string;
  className?: string;
  offerNote?: string;
  ctaLabel?: string;
  consentLabel?: ReactNode;
  successRedirectUrl?: string;
}

type Status = "idle" | "loading" | "error";
type ErrorField = "email" | "consent" | null;

export default function SenderForm({
  formId,
  id,
  className = "",
  offerNote,
  ctaLabel,
  consentLabel,
  successRedirectUrl,
}: SenderFormProps) {
  const router = useRouter();
  const uid = useId();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const errorId = `${uid}-error`;

  const formLocation = id ?? (formId === "eERn80" ? "alapozo" : "fooldal");

  // Alapértelmezett beállítások formId alapján
  const isAlapozo = formId === "eERn80";
  const defaultOfferNote = isAlapozo
    ? "Ingyenes, 7 napos e-mail-tanfolyam kezdőknek és újrakezdőknek. Bármikor leiratkozhatsz."
    : "Minden vasárnap 1 vágatlan, 20-30 perces hangfelvétel. Bármikor leiratkozhatsz.";
  const activeOfferNote = offerNote !== undefined ? offerNote : defaultOfferNote;

  const defaultCtaLabel = isAlapozo ? "Kérem az ingyenes alapozót" : "Gyere, tarts velem";
  const activeCtaLabel = ctaLabel || defaultCtaLabel;

  const defaultRedirect = isAlapozo ? "/alapozo-koszonom" : "/koszonom";
  const activeRedirect = successRedirectUrl || defaultRedirect;

  function trackError(errorType: string) {
    trackEvent(SUBSCRIBE_EVENTS.error, {
      form_location: formLocation,
      form_id: formId,
      error_type: errorType,
    });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email.trim())) {
      trackError("invalid_email");
      setStatus("error");
      setErrorField("email");
      setErrorMessage("Adj meg egy érvényes email címet.");
      emailRef.current?.focus();
      return;
    }

    if (!consent) {
      trackError("missing_consent");
      setStatus("error");
      setErrorField("consent");
      setErrorMessage(
        "Ehhez elfogadásra van szükség — pipáld ki a jelölőnégyzetet."
      );
      consentRef.current?.focus();
      return;
    }

    setStatus("loading");
    setErrorField(null);
    setErrorMessage("");

    try {
      // 1. Elsődleges beküldés: a szerver oldali proxy útvonalon keresztül (adblocker-védelem + rate limiting)
      const res = await fetch("/api/sender/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId,
          email,
          firstName,
          consent,
          website,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        // Ha nem sikerült, próbálkozzunk közvetlen kliens oldali Sender.net hívással tartalékként
        try {
          const directRes = await fetch(
            `https://stats.sender.net/forms/${formId}/subscribe`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email.trim().toLowerCase(),
                firstname: firstName.trim(),
                site_visit: true,
                url: window.location.href,
              }),
            }
          );
          if (directRes.ok) {
            handleSuccess();
            return;
          }
        } catch {
          // A közvetlen hívás sem ment át, a szerver hibaüzenetét mutatjuk
        }

        trackError(`http_${res.status}`);
        setStatus("error");
        setErrorMessage(
          data?.message ||
            "Valami elakadt a feliratkozásnál. Próbáld meg még egyszer egy perc múlva."
        );
        return;
      }

      handleSuccess();
    } catch {
      // Hálózati hiba esetén is tartalék próbálkozás közvetlenül a Sender.net felé
      try {
        const directRes = await fetch(
          `https://stats.sender.net/forms/${formId}/subscribe`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email.trim().toLowerCase(),
              firstname: firstName.trim(),
              site_visit: true,
              url: window.location.href,
            }),
          }
        );
        if (directRes.ok) {
          handleSuccess();
          return;
        }
      } catch {
        // Mindkettő elhasalt
      }

      trackError("network");
      setStatus("error");
      setErrorMessage(
        "Nem sikerült elküldeni — ellenőrizd a netkapcsolatot, és próbáld újra."
      );
    }
  }

  function handleSuccess() {
    trackEvent(SUBSCRIBE_EVENTS.success, {
      form_location: formLocation,
      form_id: formId,
    });

    // Ha a sender univerzális szkript elérhető, azonosítsuk a feliratkozót
    try {
      if (typeof window !== "undefined" && typeof window.sender === "function") {
        window.sender("identify", {
          email: email.trim().toLowerCase(),
          firstname: firstName.trim(),
        });
      }
    } catch {
      // Nem kritikus
    }

    // A köszönőoldali "Irány a postaládám" gombhoz tároljuk az email szolgáltató domainjét
    try {
      const domain = getEmailDomain(email);
      if (domain) {
        window.sessionStorage.setItem(SUBSCRIBED_DOMAIN_STORAGE_KEY, domain);
      }
    } catch {
      // Letiltott sessionStorage esetén sincs gond
    }

    router.push(activeRedirect);
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`w-full max-w-md scroll-mt-28 ${className}`}
      noValidate
    >
      {/* Honeypot rejtett mező botok kiszűrésére */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
      >
        <label htmlFor={`${uid}-website`}>Website</label>
        <input
          id={`${uid}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {/* Ajánlati szöveg a mezők felett */}
      {activeOfferNote && (
        <p className="mb-3 text-center sm:text-left text-sm text-ink-900/75 dark:text-sand-100/75">
          {activeOfferNote}
        </p>
      )}

      {/* Bemeneti mezők: keresztnév (opcionális) és email */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${uid}-firstName`} className="sr-only">
          Keresztnév (opcionális)
        </label>
        <input
          id={`${uid}-firstName`}
          name="firstName"
          maxLength={FIRST_NAME_MAX_LENGTH}
          type="text"
          autoComplete="given-name"
          placeholder="Keresztnév (opcionális)"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-full border border-forest-800/55 bg-white/80 px-5 py-3 text-ink-900 placeholder:text-ink-900/65 outline-none transition focus:border-terracotta-500 focus-visible:ring-2 focus-visible:ring-terracotta-500/50 aria-[invalid=true]:border-terracotta-700 dark:border-sand-50/40 dark:bg-forest-800/40 dark:aria-[invalid=true]:border-terracotta-400 dark:text-sand-50 dark:placeholder:text-sand-100/50 sm:w-2/5"
        />

        <label htmlFor={`${uid}-email`} className="sr-only">
          Email cím
        </label>
        <input
          id={`${uid}-email`}
          name="email"
          type="email"
          inputMode="email"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          maxLength={EMAIL_MAX_LENGTH}
          required
          autoComplete="email"
          placeholder="te@email.hu"
          ref={emailRef}
          aria-invalid={errorField === "email"}
          aria-describedby={errorField === "email" ? errorId : undefined}
          value={email}
          onChange={(e) => {
            const val = e.target.value.replace(/\s+/g, "");
            setEmail(val);
            if (errorField === "email") {
              setErrorField(null);
              setStatus("idle");
              setErrorMessage("");
            }
          }}
          className="w-full rounded-full border border-forest-800/55 bg-white/80 px-5 py-3 text-ink-900 placeholder:text-ink-900/65 outline-none transition focus:border-terracotta-500 focus-visible:ring-2 focus-visible:ring-terracotta-500/50 aria-[invalid=true]:border-terracotta-700 dark:border-sand-50/40 dark:bg-forest-800/40 dark:aria-[invalid=true]:border-terracotta-400 dark:text-sand-50 dark:placeholder:text-sand-100/50"
        />
      </div>

      {/* Adatkezelési hozzájárulás checkbox */}
      <label
        htmlFor={`${uid}-consent`}
        className="mt-4 flex cursor-pointer items-start gap-3 text-left text-sm text-ink-900/70 dark:text-sand-100/70"
      >
        <input
          id={`${uid}-consent`}
          name="consent"
          type="checkbox"
          checked={consent}
          ref={consentRef}
          aria-invalid={errorField === "consent"}
          aria-describedby={errorField === "consent" ? errorId : undefined}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (errorField === "consent") {
              setErrorField(null);
              setStatus("idle");
              setErrorMessage("");
            }
          }}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-forest-800/30 text-terracotta-600 focus:ring-terracotta-500 dark:border-sand-50/30"
        />
        <span>
          {consentLabel ? (
            consentLabel
          ) : isAlapozo ? (
            <>
              Elfogadom, hogy a Nirmana Meditációs Alapozó leckéit és hanganyagait
              megkapjam emailben, és megismertem az{" "}
              <Link
                href="/adatkezeles"
                className="-my-2 inline-block py-2 underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900 dark:hover:text-sand-50"
              >
                Adatkezelési Tájékoztatót
              </Link>
              .
            </>
          ) : (
            <>
              Elfogadom, hogy {siteConfig.ownerFullName} heti hangfelvételt
              küldjön nekem emailben, és megismertem az{" "}
              <Link
                href="/adatkezeles"
                className="-my-2 inline-block py-2 underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900 dark:hover:text-sand-50"
              >
                Adatkezelési Tájékoztatót
              </Link>
              .
            </>
          )}
        </span>
      </label>

      {/* Animált hibaüzenet */}
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            id={errorId}
            role="alert"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-left text-sm text-terracotta-700 dark:text-terracotta-400"
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>

      {/* CTA Gomb */}
      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={status === "loading" ? undefined : { scale: 1.02 }}
        whileTap={status === "loading" ? undefined : { scale: 0.98 }}
        transition={SPRING.hover}
        className="mt-5 w-full rounded-full bg-saffron-500 px-8 py-3.5 font-medium text-forest-900 shadow-soft outline-none transition-all duration-200 hover:bg-saffron-600 hover:shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-forest-900/40 disabled:cursor-wait disabled:opacity-70 dark:focus-visible:ring-sand-50/50"
      >
        {status === "loading" ? "Küldés…" : activeCtaLabel.includes("→") ? activeCtaLabel : `${activeCtaLabel} →`}
      </motion.button>

      {/* Micro-trust elem a konverziós súrlódás csökkentésére */}
      <p className="mt-2.5 text-center text-xs text-ink-900/60 dark:text-sand-100/60">
        🔒 100% ingyenes · Spammentes · Bármikor 1 kattintással leiratkozhatsz
      </p>
    </form>
  );
}
