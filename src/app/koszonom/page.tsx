import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import OpenInboxButton from "@/components/OpenInboxButton";
import OrganicBackground from "@/components/OrganicBackground";
import SocialLinks from "@/components/SocialLinks";
import { siteConfig } from "@/lib/site-config";

const pageTitle = `Már csak egy kattintás — ${siteConfig.brandName}`;
const pageDescription =
  "Majdnem kész vagy: erősítsd meg a feliratkozásodat az email-fiókodban érkező linkkel, különben nem kapod meg a heti hangfelvételt.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <main className="relative isolate flex min-h-[90vh] items-center overflow-hidden px-6 py-24">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex w-full max-w-2xl animate-fade-in flex-col items-center text-center">
        <p className="font-serif text-sm uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400">
          Majdnem kész vagy
        </p>
        <h1 className="mt-4 text-balance font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
          Már csak egy kattintás van hátra
        </h1>

        <p className="mt-4 max-w-xl text-balance text-ink-900/70 dark:text-sand-100/70">
          Küldtem egy megerősítő emailt — kattints a benne lévő linkre, hogy
          valóban megkapd a heti hangfelvételt.
        </p>

        <OpenInboxButton />

        {/*
          A legfontosabb instrukció közvetlenül az inbox-gomb alatt,
          hogy ne csússzon a hajtás alá.
        */}
        <div className="mt-8 w-full max-w-md rounded-2xl border border-terracotta-500/30 bg-terracotta-500/10 p-5 text-left">
          <p className="font-serif text-lg text-forest-900 dark:text-sand-50">
            Nem látod a levelet?
          </p>
          <p className="mt-2 text-sm text-ink-900/70 dark:text-sand-100/70">
            Pár percen belül meg kell érkeznie. Ha mégsem találod a
            beérkező leveleid között, nézd meg a{" "}
            <span className="font-medium text-ink-900 dark:text-sand-50">
              spam
            </span>{" "}
            és a{" "}
            <span className="font-medium text-ink-900 dark:text-sand-50">
              promóciók
            </span>{" "}
            mappát is — néha oda kerül először. Ha megtaláltad, húzd át a
            beérkező levelek közé, hogy a következő hangfelvétel is
            biztosan eljusson hozzád. Ha egy órán belül sem érkezik meg,
            írj a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címre.
          </p>
        </div>

        {/*
          Személyes üdvözlőkártya a korábbi hiányzó videó (404) helyett.
        */}
        <div className="mt-8 flex w-full max-w-md items-center gap-4 rounded-2xl border border-forest-900/10 bg-white/70 p-4 shadow-sm backdrop-blur-sm text-left dark:border-sand-50/10 dark:bg-forest-800/50">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-2 ring-terracotta-500/40">
            <Image
              src="/images/kardos-balint-profil.jpg"
              alt="Kardos Bálint"
              fill
              sizes="64px"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-forest-900 dark:text-sand-50">
              Köszönöm, hogy velem tartasz!
            </p>
            <p className="mt-0.5 text-xs text-ink-900/70 dark:text-sand-100/70">
              Az első vágatlan hangfelvételed a megerősítés után a következő vasárnapig érkezik.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-900/65 dark:text-sand-100/60">
          <span>Amíg vársz, kövess élőben:</span>
          <SocialLinks className="flex flex-wrap justify-center gap-x-3" />
        </div>

        <Link
          href="/"
          className="mt-10 text-sm text-terracotta-600 underline underline-offset-2 dark:text-terracotta-400"
        >
          Vissza a főoldalra
        </Link>
      </div>
    </main>
  );
}
