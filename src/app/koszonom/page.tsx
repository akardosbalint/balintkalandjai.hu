import type { Metadata } from "next";
import Link from "next/link";
import OrganicBackground from "@/components/OrganicBackground";
import { siteConfig } from "@/lib/site-config";

const pageTitle = `Már csak egy kattintás — ${siteConfig.brandName}`;
const pageDescription =
  "Majdnem kész vagy: erősítsd meg a feliratkozásodat az email-fiókodban érkező linkkel, különben nem kapod meg a heti hangfelvételt.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  // Ez egy köszönő/köztes oldal a feliratkozás után, nem önálló
  // tartalom — nincs értelme indexeltetni, és nincs benne a sitemap-ban
  // sem (lásd sitemap.ts).
  robots: { index: false, follow: false },
};

const socialLinks = [
  { href: siteConfig.social.tiktok, label: "TikTok" },
  { href: siteConfig.social.instagram, label: "Instagram" },
  { href: siteConfig.social.youtube, label: "YouTube" },
  { href: siteConfig.social.facebook, label: "Facebook" },
];

export default function ThankYouPage() {
  return (
    <main className="relative isolate flex min-h-[90vh] items-center overflow-hidden px-6 py-24">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex w-full max-w-3xl animate-fade-in flex-col items-center text-center">
        <p className="font-serif text-sm uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400">
          Majdnem kész vagy
        </p>
        <h1 className="mt-4 text-balance font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
          Már csak egy kattintás van hátra
        </h1>

        <p className="mt-4 max-w-xl text-balance text-ink-900/70 dark:text-sand-100/70">
          Küldtem egy megerősítő emailt — kattints a benne lévő linkre, hogy
          valóban megkapd a heti hangfelvételt. Enélkül a feliratkozás nem
          lép életbe.
        </p>

        <div className="mt-8 w-full max-w-xs overflow-hidden rounded-3xl bg-forest-900/5 shadow-lg dark:bg-sand-50/5">
          <video
            className="aspect-[9/16] w-full object-cover"
            src="/videos/koszonom.mp4"
            poster="/images/kardos-balint-profil.jpg"
            controls
            playsInline
            preload="metadata"
          >
            A böngésződ nem támogatja a videólejátszást.
          </video>
        </div>

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
            mappát is — sokszor oda esik elsőre. Ha megtaláltad, húzd át a
            beérkező levelek közé, hogy a következő hangfelvétel is
            biztosan odataláljon.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm text-ink-900/60 dark:text-sand-100/60">
          <span>Amíg vársz, kövess élőben:</span>
          <span className="flex flex-wrap justify-center gap-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="-my-2 inline-block py-2 underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900 dark:hover:text-sand-50"
              >
                {link.label}
              </a>
            ))}
          </span>
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
