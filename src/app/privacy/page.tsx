import type { Metadata } from "next";
import Link from "next/link";
import LegalSections from "@/components/LegalSections";
import { legalEffectiveDate } from "@/lib/legal-content";
import { siteConfig } from "@/lib/site-config";

const title = `Adatkezelési tájékoztató (Privacy Policy) — ${siteConfig.brandName}`;
const description =
  "Ki kezeli az adataidat, milyen adatokat, milyen célból és meddig — a hírlevél-feliratkozás adatkezelési tájékoztatója.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/privacy` },
  openGraph: { title, description, url: `${siteConfig.url}/privacy`, type: "website" },
};

export default function PrivacyPage() {
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
      <p className="mt-2 text-sm text-ink-900/50">Hatályos: {legalEffectiveDate}.</p>

      <LegalSections />
    </main>
  );
}
