import type { Metadata } from "next";
import Link from "next/link";
import OrganicBackground from "@/components/OrganicBackground";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Ez az oldal nincs meg — ${siteConfig.brandName}`,
  robots: { index: false, follow: false },
};

const links = [
  {
    href: "/",
    title: "Főoldal",
    description: "Vissza a történethez, ahonnan indultál.",
  },
  {
    href: "/#feliratkozas",
    title: "Feliratkozás a hírlevélre",
    description: "Kövesd élőben, ahogy Rishikeshben keresem a válaszokat.",
  },
  {
    href: "/privacy-policy",
    title: "Adatkezelési tájékoztató",
    description: "Mit kezelek rólad, és miért.",
  },
];

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-[90vh] items-center overflow-hidden px-6 py-28">
      <OrganicBackground variant="hero" />

      <div className="mx-auto flex w-full max-w-2xl animate-fade-in flex-col items-center text-center">
        <p className="font-serif text-6xl text-terracotta-500 sm:text-7xl">
          404
        </p>
        <h1 className="mt-4 text-balance font-serif text-3xl text-forest-900 sm:text-4xl">
          Ez az útvonal is lemaradt valahol.
        </h1>
        <p className="mt-4 max-w-md text-balance text-ink-900/70">
          Az oldal, amit keresel, nem létezik, vagy elköltözött. Nincs baj —
          nézd meg az alábbi linkeket, biztos találsz, amit keresel.
        </p>

        <div className="mt-10 grid w-full gap-3 sm:grid-cols-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex flex-col items-start gap-1 rounded-2xl border border-forest-800/10 bg-white/60 p-5 text-left backdrop-blur-sm transition hover:border-terracotta-500/40 hover:bg-white/80"
            >
              <span className="font-serif text-lg text-forest-900 group-hover:text-terracotta-600">
                {link.title}
              </span>
              <span className="text-sm text-ink-900/60">
                {link.description}
              </span>
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="mt-10 text-sm text-terracotta-600 underline underline-offset-2"
        >
          ← Vissza a főoldalra
        </Link>
      </div>
    </main>
  );
}
