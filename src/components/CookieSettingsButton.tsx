"use client";

import { openCookieConsent } from "@/lib/analytics";

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => openCookieConsent()}
      className="-my-2 inline-block py-2 underline underline-offset-2 transition-colors duration-200 hover:text-sand-50"
    >
      Süti-beállítások
    </button>
  );
}
