"use client";

import { useState, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { STRIPE_DEFAULT_CONFIG } from "@/lib/stripe";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface StripeEmbeddedCheckoutProps {
  buttonLabel?: string;
  className?: string;
}

export default function StripeEmbeddedCheckout({
  buttonLabel = "Önkéntesen támogatom a munkád",
  className = "",
}: StripeEmbeddedCheckoutProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchClientSecret = useCallback(async () => {
    try {
      const res = await fetch("/api/stripe/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok || !data.clientSecret) {
        setHasError(true);
        setErrorMessage(
          data?.message || "A beágyazott fizetés jelenleg nem elérhető."
        );
        throw new Error(data?.error || "Failed to create checkout session");
      }

      return data.clientSecret;
    } catch (err) {
      setHasError(true);
      throw err;
    }
  }, []);

  // Ha nincs kliensoldali Publishable Key vagy hiba történt a beágyazáskor:
  // Elegáns tartalékmegoldás (Fallback) a megadott hivatalos Stripe Payment Linkre
  if (!stripePromise || hasError) {
    return (
      <div className={`flex flex-col items-center ${className}`}>
        {hasError && errorMessage && (
          <p className="mb-3 text-xs text-amber-800 dark:text-amber-300 text-center">
            {errorMessage} Átirányítás a hivatalos fizetési oldalra:
          </p>
        )}
        <a
          href={STRIPE_DEFAULT_CONFIG.paymentLink}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full bg-saffron-500 px-7 py-3.5 text-center font-medium text-forest-900 shadow-soft outline-none transition-all duration-200 hover:bg-saffron-600 hover:shadow-glow-saffron sm:w-auto"
        >
          {buttonLabel} →
        </a>
        <p className="mt-2 text-center text-xs text-ink-900/60 dark:text-sand-100/60">
          Biztonságos Stripe fizetés · Tetszőleges önkéntes összeg (Customer Chooses Price)
        </p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {!isOpen ? (
        <div className="flex flex-col items-center">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex w-full items-center justify-center rounded-full bg-saffron-500 px-7 py-3.5 text-center font-medium text-forest-900 shadow-soft outline-none transition-all duration-200 hover:bg-saffron-600 hover:shadow-glow-saffron sm:w-auto cursor-pointer"
          >
            {buttonLabel}
          </button>
          <p className="mt-2 text-center text-xs text-ink-900/60 dark:text-sand-100/60">
            Biztonságos, oldalon belüli Stripe fizetés · Tetszőleges önkéntes összeg
          </p>
        </div>
      ) : (
        <div className="mt-4 w-full">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-forest-900 dark:text-sand-50">
              Biztonságos Stripe Fizetés (Oldalon belül)
            </span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-xs text-ink-900/60 underline hover:text-ink-900 dark:text-sand-100/60 dark:hover:text-sand-50 cursor-pointer"
            >
              Mégsem / Bezárás
            </button>
          </div>

          <div
            id="checkout"
            className="min-h-[440px] w-full overflow-hidden rounded-2xl border border-forest-900/15 bg-white p-2 shadow-sm dark:border-sand-50/15"
          >
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ fetchClientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          </div>
        </div>
      )}
    </div>
  );
}
