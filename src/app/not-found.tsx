import type { Metadata } from "next";
import Link from "next/link";
import OrganicBackground from "@/components/OrganicBackground";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Ez az oldal nincs meg — ${siteConfig.brandName}`,
  description:
    "Ez az oldal nem létezik, de a történet folytatódik — nézd meg a főoldalt, vagy iratkozz fel a heti hírlevélre, hogy élőben kövesd, mi történik Rishikeshben.",
  robots: { index: false, follow: false },
};

const links = [
  {
    href: "/",
    title: "Főoldal",
    description: "Vissza a történethez, ahonnan indultál.",
  },
  {
    href: "/adatkezeles",
    title: "Adatkezelési tájékoztató",
    description: "Mit kezelek rólad, és miért.",
  },
  {
    href: "/aszf",
    title: "Általános Szerződési Feltételek",
    description: "A hírlevél igénybevételének feltételei.",
  },
];

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[90vh] items-center overflow-hidden px-6 py-28">
      <OrganicBackground variant="hero" />

      <div className="mx-auto flex w-full max-w-2xl animate-fade-in flex-col items-center text-center">
        <p className="font-serif text-6xl text-terracotta-500 dark:text-terracotta-400 sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 text-balance font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
          Ez az útvonal is lemaradt valahol.
        </h1>
        <p className="mt-4 max-w-md text-balance text-ink-900/70 dark:text-sand-100/70">
          Az oldal, amit keresel, nem létezik, vagy elköltözött. Nincs baj —
          nézd meg az alábbi linkeket, biztos találsz, amit keresel.
        </p>

        <Link
          href="/#feliratkozas"
          className="group mt-10 flex w-full max-w-md flex-col items-start gap-1 rounded-2xl bg-forest-800 p-6 text-left text-sand-50 shadow-lg transition hover:bg-forest-900 dark:bg-sand-50 dark:text-forest-900 dark:hover:bg-sand-100"
        >
          <span className="font-serif text-lg">Feliratkozás a hírlevélre</span>
          <span className="text-sm text-sand-100/70 dark:text-forest-900/70">
            Kövesd élőben, ahogy Rishikeshben keresem a válaszokat.
          </span>
        </Link>

        <div className="mt-4 grid w-full max-w-2xl gap-3 sm:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-start gap-1 rounded-2xl border border-forest-800/10 bg-white/60 p-5 text-left backdrop-blur-sm transition hover:border-terracotta-500/40 hover:bg-white/80 dark:border-sand-50/10 dark:bg-forest-800/40 dark:hover:bg-forest-800/60"
            >
              <span className="font-serif text-lg text-forest-900 group-hover:text-terracotta-600 dark:text-sand-50 dark:group-hover:text-terracotta-400">
                {link.title}
              </span>
              <span className="text-sm text-ink-900/65 dark:text-sand-100/65">
                {link.description}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
