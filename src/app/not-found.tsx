import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `404 — nincs ilyen oldal — ${siteConfig.brandName}`,
  robots: { index: false, follow: false },
};

/**
 * Egyedi 404 — a Next.js app router alapból is valódi HTTP 404-et küld
 * nem létező útvonalakra, ez a fájl csak a tartalmat cseréli le: ahelyett,
 * hogy csak "This page could not be found." állna itt, adjunk konkrét
 * helyeket, ahol tovább lehet keresni (ember és agent olvasónak egyaránt).
 */
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-20">
      <p className="text-sm font-medium uppercase tracking-widest text-terracotta-600">
        404
      </p>
      <h1 className="mt-2 font-serif text-3xl text-forest-900 sm:text-4xl">
        Ez az oldal nem létezik.
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ink-900/80">
        Elgépelted a címet, vagy egy régi linket követtél, ami már nem
        él. Innen tovább tudsz nézni:
      </p>

      <ul className="mt-6 list-disc space-y-2 pl-5 text-lg text-ink-900/80">
        <li>
          <Link href="/" className="underline decoration-terracotta-500 underline-offset-2">
            Főoldal
          </Link>
        </li>
        <li>
          <Link href="/about" className="underline decoration-terracotta-500 underline-offset-2">
            Rólam
          </Link>
        </li>
        <li>
          <Link href="/contact" className="underline decoration-terracotta-500 underline-offset-2">
            Kapcsolat
          </Link>
        </li>
        <li>
          <Link href="/privacy" className="underline decoration-terracotta-500 underline-offset-2">
            Adatkezelési tájékoztató
          </Link>
        </li>
        <li>
          <a href="/sitemap.xml" className="underline decoration-terracotta-500 underline-offset-2">
            Sitemap
          </a>
        </li>
        <li>
          <a href="/llms.txt" className="underline decoration-terracotta-500 underline-offset-2">
            llms.txt (agent instrukciók)
          </a>
        </li>
      </ul>
    </main>
  );
}
