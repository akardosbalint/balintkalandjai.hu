"use client";

import { useId, useRef, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import { EMAIL_MAX_LENGTH, EMAIL_REGEX, FIRST_NAME_MAX_LENGTH } from "@/lib/validation";
import { SUBSCRIBE_EVENTS, trackEvent } from "@/lib/analytics";
import { getEmailDomain, SUBSCRIBED_DOMAIN_STORAGE_KEY } from "@/lib/mail-providers";
import { SPRING } from "@/lib/motion";

type Status = "idle" | "loading" | "error";
/** Melyik mezőhöz tartozik a kliens oldali validációs hiba (null: szerver/hálózati hiba). */
type ErrorField = "email" | "consent" | null;

interface SubscribeFormProps {
  id?: string;
  ctaLabel?: string;
}

export default function SubscribeForm({
  id,
  ctaLabel = "Gyere, tarts velem",
}: SubscribeFormProps) {
  const router = useRouter();
  const uid = useId();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [consent, setConsent] = useState(false);
  // Honeypot: valódi látogató sosem látja/tölti ki (lásd a mező stílusát
  // lent) — ha mégis van benne érték, a szerver botnak veszi a kérést.
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [errorField, setErrorField] = useState<ErrorField>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const errorId = `${uid}-error`;

  // Melyik űrlapról jött a konverzió/hiba (hero, alsó CTA, GYIK) — GA4-ben
  // ez alapján vethető össze a formok teljesítménye.
  const formLocation = id ?? "ismeretlen";

  function trackError(errorType: string) {
    trackEvent(SUBSCRIBE_EVENTS.error, { form_location: formLocation, error_type: errorType });
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Kliens oldali hibánál a fókusz a hibás mezőre ugrik, és a mező
    // aria-invalid + aria-describedby-val a hibaszövegre mutat (WCAG
    // 3.3.1) — így a képernyőolvasó is tudja, mi a gond és hol.
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
        "Ehhez elfogadásra van szükség — pipáld ki, hogy küldhessek neked hangfelvételt."
      );
      consentRef.current?.focus();
      return;
    }

    setStatus("loading");
    setErrorField(null);
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, consent, website }),
      });

      // Nem-JSON válasz (pl. a hosting HTML hibaoldala egy 504-nél) ne
      // "hálózati hibaként" landoljon a catch ágban — az HTTP-hiba.
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        trackError(`http_${res.status}`);
        setStatus("error");
        setErrorMessage(
          data?.message ||
            "Valami elakadt. Próbáld meg még egyszer egy perc múlva."
        );
        return;
      }

      trackEvent(SUBSCRIBE_EVENTS.success, { form_location: formLocation });
      // A köszönőoldal "Irány a postaládám" gombjához: csak a domain
      // (pl. gmail.com), csak erre a böngészőfülre (sessionStorage).
      try {
        const domain = getEmailDomain(email);
        if (domain) window.sessionStorage.setItem(SUBSCRIBED_DOMAIN_STORAGE_KEY, domain);
      } catch {
        // Letiltott tárhely — a köszönőoldal ilyenkor gomb nélkül jelenik meg.
      }
      router.push("/koszonom");
    } catch {
      trackError("network");
      setStatus("error");
      setErrorMessage(
        "Nem sikerült elküldeni — ellenőrizd a netkapcsolatot, és próbáld újra."
      );
    }
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      // scroll-mt: a fix fejléc ne takarja a form tetejét, ha horgony-
      // linkkel (pl. #feliratkozas) ugrunk ide.
      className="w-full max-w-md scroll-mt-28"
      noValidate
    >
      {/*
        Honeypot mező — embereknek láthatatlan (abszolút pozícionálva a
        látható területen kívülre, nem display:none-nal, mert azt egyes
        botok felismerik és kihagyják), a képernyőolvasók és a Tab-sorrend
        számára is kihagyva. Ha ki van töltve, a szerver botnak veszi a
        kérést (lásd api/subscribe/route.ts).
      */}
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

      {/*
        Az ajánlat a mezők FÖLÖTT, a döntés pillanatában — korábban a gomb
        alatt, apró betűvel állt, mobilon a hajtás alá csúszva. A szöveg
        szándékosan rövid: 360px-es kijelzőn is 2 soros marad a tartalék
        betűtípussal és az Inter-rel is — ha a webfont betöltése után
        változna a sorok száma, az egész form lejjebb ugrana (CLS).
      */}
      <p className="mb-3 text-sm text-ink-900/75 dark:text-sand-100/75">
        Minden vasárnap 1 vágatlan, 20-30 perces hangfelvétel.
        Bármikor leiratkozhatsz.
      </p>

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
          maxLength={EMAIL_MAX_LENGTH}
          required
          autoComplete="email"
          placeholder="te@email.hu"
          ref={emailRef}
          aria-invalid={errorField === "email"}
          aria-describedby={errorField === "email" ? errorId : undefined}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-full border border-forest-800/55 bg-white/80 px-5 py-3 text-ink-900 placeholder:text-ink-900/65 outline-none transition focus:border-terracotta-500 focus-visible:ring-2 focus-visible:ring-terracotta-500/50 aria-[invalid=true]:border-terracotta-700 dark:border-sand-50/40 dark:bg-forest-800/40 dark:aria-[invalid=true]:border-terracotta-400 dark:text-sand-50 dark:placeholder:text-sand-100/50"
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
          ref={consentRef}
          aria-invalid={errorField === "consent"}
          aria-describedby={errorField === "consent" ? errorId : undefined}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-forest-800/30 text-terracotta-600 focus:ring-terracotta-500 dark:border-sand-50/30"
        />
        <span>
          Elfogadom, hogy {siteConfig.ownerFullName} heti hangfelvételt
          küldjön nekem emailben, és megismertem az{" "}
          <a
            href="/adatkezeles"
            className="-my-2 inline-block py-2 underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900 dark:hover:text-sand-50"
          >
            Adatkezelési Tájékoztatót
          </a>
          .
        </span>
      </label>

      {/*
        A hibaüzenet a mezők és a gomb KÖZÖTT jelenik meg (korábban a gomb
        alatt, mobilon gyakran a látómezőn kívül), id-vel, hogy a hibás
        mező aria-describedby-val hivatkozhasson rá.
      */}
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

      <motion.button
        type="submit"
        disabled={status === "loading"}
        whileHover={status === "loading" ? undefined : { scale: 1.03 }}
        whileTap={status === "loading" ? undefined : { scale: 0.97 }}
        transition={SPRING.hover}
        className="mt-4 w-full rounded-full bg-saffron-500 px-8 py-3.5 font-medium text-forest-900 outline-none transition-colors duration-200 hover:bg-saffron-600 hover:shadow-glow-saffron focus-visible:ring-2 focus-visible:ring-forest-900/40 disabled:cursor-wait disabled:opacity-70 dark:focus-visible:ring-sand-50/50 sm:w-auto"
      >
        {status === "loading" ? "Küldés…" : ctaLabel}
      </motion.button>

    </form>
  );
}
