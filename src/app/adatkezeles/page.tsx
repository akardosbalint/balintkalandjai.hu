import type { Metadata } from "next";
import Link from "next/link";
import LegalSections from "@/components/LegalSections";
import { legalEffectiveDate } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Adatkezelési tájékoztató — ${siteConfig.brandName}`,
  alternates: { canonical: `${siteConfig.url}/adatkezeles` },
  robots: { index: false, follow: false },
};

/**
 * KIINDULÓ SABLON — MIELŐTT ÉLES OLDALON HASZNÁLNÁD:
 * A tényadatok (név, cím, email, tárhely, adatfeldolgozók) valósak,
 * de ez így is csak egy kiindulópont, nem jogi tanácsadás. Nézesd át
 * GDPR-hoz értő jogásszal, mielőtt élesbe mész — főleg mert idővel
 * fizetős programot is fogsz hirdetni, ami már számlázási / további
 * adatkezelési kötelezettségeket hozhat be.
 */
export default function AdatkezelesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 sm:text-4xl">
        Adatkezelési tájékoztató
      </h1>
      <p className="mt-2 text-sm text-ink-900/50">
        Hatályos: {legalEffectiveDate}. Ez egy sablon — kérj jogi átnézést,
        mielőtt élesben használod.
      </p>

      <LegalSections />
    </main>
  );
}
