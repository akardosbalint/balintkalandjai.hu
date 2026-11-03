"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import ThemeToggle from "./ThemeToggle";

const SCROLL_THRESHOLD = 24;

/**
 * Rögzített (fixed) fejléc — a háttere csak akkor válik látható,
 * elmosott "üveg" sávvá, ha a látogató egy kicsit legörget. Legfelül
 * (Hero fölött) teljesen átlátszó, hogy ne törje meg a hero hátterét.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = pathname === "/";
  const isAlapozo = pathname?.startsWith("/alapozo");
  const isGyik = pathname === "/gyik";

  return (
    <header
      className={`animate-hero-in fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-forest-800/10 bg-sand-50/85 shadow-soft backdrop-blur-md dark:border-sand-50/10 dark:bg-forest-900/80"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2.5 sm:px-7 sm:py-3.5">
        <Link
          href="/"
          aria-label={`${siteConfig.brandName} — főoldal`}
          className="flex items-center gap-2.5 transition hover:opacity-90"
        >
          <Image
            src="/images/logo-black.png"
            alt={siteConfig.brandName}
            width={40}
            height={40}
            className="h-8 w-8 opacity-90 transition hover:scale-105 hover:opacity-100 dark:hidden sm:h-9 sm:w-9"
            priority
          />
          <Image
            src="/images/logo-white.png"
            alt={siteConfig.brandName}
            width={40}
            height={40}
            className="hidden h-8 w-8 opacity-90 transition hover:scale-105 hover:opacity-100 dark:block sm:h-9 sm:w-9"
            priority
          />
          <span className="hidden font-serif text-sm font-medium tracking-tight text-forest-900 dark:text-sand-50 md:inline-block">
            {siteConfig.brandName}
          </span>
        </Link>

        {/* Elsődleges navigáció a főbb funkciók és oldalak között */}
        <nav
          aria-label="Fő navigáció"
          className="flex items-center gap-1 text-xs sm:gap-2 sm:text-sm"
        >
          <Link
            href="/"
            className={`rounded-full px-2.5 py-1.5 font-medium transition-colors sm:px-3.5 ${
              isHome
                ? "bg-forest-900/10 text-forest-900 dark:bg-sand-50/15 dark:text-sand-50"
                : "text-ink-900/70 hover:text-ink-900 dark:text-sand-100/70 dark:hover:text-sand-50"
            }`}
          >
            Heti hanganyag
          </Link>
          <Link
            href="/alapozo"
            className={`rounded-full px-2.5 py-1.5 font-medium transition-colors sm:px-3.5 ${
              isAlapozo
                ? "bg-forest-900/10 text-forest-900 dark:bg-sand-50/15 dark:text-sand-50"
                : "text-ink-900/70 hover:text-ink-900 dark:text-sand-100/70 dark:hover:text-sand-50"
            }`}
          >
            <span className="hidden sm:inline">Idegrendszeri </span>Alapozó
          </Link>
          <Link
            href="/gyik"
            className={`hidden rounded-full px-2.5 py-1.5 font-medium transition-colors sm:inline-block sm:px-3.5 ${
              isGyik
                ? "bg-forest-900/10 text-forest-900 dark:bg-sand-50/15 dark:text-sand-50"
                : "text-ink-900/70 hover:text-ink-900 dark:text-sand-100/70 dark:hover:text-sand-50"
            }`}
          >
            GYIK
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
