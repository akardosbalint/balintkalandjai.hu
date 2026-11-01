"use client";

import { useState, useCallback, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { STRIPE_DEFAULT_CONFIG } from "@/lib/stripe";

interface StripeEmbeddedCheckoutProps {
  className?: string;
  autoLoad?: boolean;
}

export default function StripeEmbeddedCheckout({
  className = "",
  autoLoad = true,
}: StripeEmbeddedCheckoutProps) {
  const [isStarted, setIsStarted] = useState(autoLoad);
  const [loadError, setLoadError] = useState<string | null>(null);

  const stripePromise = useMemo(() => {
    const key =
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ||
      STRIPE_DEFAULT_CONFIG.publishableKey;
    return loadStripe(key);
  }, []);

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        throw new Error(
          data?.message || "Nem sikerült létrehozni a fizetési munkamenetet."
        );
      }

      return data.clientSecret;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Fizetési hiba történt";
      setLoadError(msg);
      throw err;
    }
  }, []);

  return (
    <div className={`w-full ${className}`}>
      {!isStarted ? (
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsStarted(true)}
            className="inline-flex w-full items-center justify-center rounded-full bg-saffron-500 px-8 py-4 font-serif text-base font-semibold text-forest-900 shadow-md transition-all duration-200 hover:bg-saffron-600 hover:shadow-glow-saffron sm:w-auto cursor-pointer"
          >
            Önkéntes támogatási összeg választása
          </button>
          <p className="mt-2 text-center text-xs text-ink-900/70 dark:text-sand-100/70">
            Közvetlen, biztonságos fizetés itt az oldalon (bankkártya, Apple Pay, Google Pay)
          </p>
        </div>
      ) : (
        <div className="w-full">
          {loadError && (
            <div className="mb-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-center text-xs text-rose-800 dark:text-rose-200">
              <p className="font-semibold">A beágyazott fizetési ablak betöltése elakadt:</p>
              <p className="mt-1">{loadError}</p>
              <button
                type="button"
                onClick={() => {
                  setLoadError(null);
                  setIsStarted(true);
                }}
                className="mt-2 inline-block rounded-full bg-white/80 px-4 py-1.5 font-medium text-forest-900 shadow-sm hover:bg-white dark:bg-forest-700 dark:text-sand-50"
              >
                Újrapróbálás
              </button>
            </div>
          )}

          <div
            id="stripe-embedded-checkout"
            className="min-h-[460px] w-full overflow-hidden rounded-2xl border border-forest-900/15 bg-white p-3 shadow-md dark:border-sand-50/20 dark:bg-sand-50"
          >
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout className="w-full min-h-[420px]" />
            </EmbeddedCheckoutProvider>
          </div>

          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-ink-900/65 dark:text-sand-100/65">
            <span>🔒 256 bites SSL titkosítás · Hivatalos Stripe beágyazott felület</span>
          </div>
        </div>
      )}
    </div>
  );
}
