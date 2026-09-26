import type { Metadata } from "next";
import Link from "next/link";
import OrganicBackground from "@/components/OrganicBackground";
import { siteConfig } from "@/lib/site-config";

const pageTitle = `Megerősítve — ${siteConfig.brandName}`;
const pageDescription =
  "A feliratkozásod megerősítve — mostantól aktív vagy, és megkapod a heti hangfelvételt Rishikeshből.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  // Ez az a landing oldal, ahová az email-szolgáltató (double opt-in)
  // a megerősítő linkre kattintás UTÁN irányít vissza — lásd
  // README.md "Kit beállítása" / "Success page" lépését. Köztes oldal,
  // nem önálló tartalom — nincs értelme indexeltetni, nincs a
  // sitemap-ban sem (lásd sitemap.ts), ugyanúgy, mint a /koszonom.
  robots: { index: false, follow: false },
};

const socialLinks = [
  { href: siteConfig.social.tiktok, label: "TikTok" },
  { href: siteConfig.social.instagram, label: "Instagram" },
  { href: siteConfig.social.youtube, label: "YouTube" },
  { href: siteConfig.social.facebook, label: "Facebook" },
];

export default function ConfirmedPage() {
  return (
    <main className="relative isolate flex min-h-[90vh] items-center overflow-hidden px-6 py-24">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex w-full max-w-2xl animate-fade-in flex-col items-center text-center">
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          aria-hidden="true"
          className="text-forest-900 dark:text-sand-50"
        >
          <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="2" />
          <path
            d="M17 29L24.5 36.5L39.5 20.5"
            stroke="#C1613C"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="mt-4 font-serif text-sm uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400">
          Megerősítve
        </p>
        <h1 className="mt-4 text-balance font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
          Ezzel meg is vagyunk — mostantól aktív vagy
        </h1>

        <p className="mt-4 max-w-xl text-balance text-ink-900/70 dark:text-sand-100/70">
          A feliratkozásod megerősítve. Az első hangfelvételed a következő
          vasárnapig érkezik.
        </p>

        <div className="mt-8 w-full max-w-md rounded-2xl border border-terracotta-500/30 bg-terracotta-500/10 p-5 text-left">
          <p className="font-serif text-lg text-forest-900 dark:text-sand-50">
            Egy jó tanács a vasárnapi levélhez
          </p>
          <p className="mt-2 text-sm text-ink-900/70 dark:text-sand-100/70">
            Hogy biztosan megtaláld: húzd át ezt az emailt a{" "}
            <span className="font-medium text-ink-900 dark:text-sand-50">
              beérkező levelek
            </span>{" "}
            közé, ha véletlenül a{" "}
            <span className="font-medium text-ink-900 dark:text-sand-50">
              spam
            </span>{" "}
            vagy a{" "}
            <span className="font-medium text-ink-900 dark:text-sand-50">
              promóciók
            </span>{" "}
            mappában landolt volna — így a jövő heti hangfelvétel is
            biztosan odatalál.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-sm text-ink-900/65 dark:text-sand-100/60">
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
