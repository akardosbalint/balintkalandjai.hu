"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ThemeToggle from "./ThemeToggle";

const SCROLL_THRESHOLD = 24;

/**
 * Rögzített (fixed) fejléc — a háttere csak akkor válik látható,
 * elmosott "üveg" sávvá, ha a látogató egy kicsit legörget. Legfelül
 * (Hero fölött) teljesen átlátszó, hogy ne törje meg a hero hátterét.
 *
 * A háttér mindig a SAJÁT témájának színét viszi (sand-50/forest-900),
 * nem a mögötte elgörgetett szekcióét — így a logó kontrasztja akkor is
 * garantált marad, ha a Footer (ami mindig sötét hátterű, a fényes
 * témában is) fut alatta.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // A belépő animáció CSS (animate-hero-in), nem Framer Motion — így a
    // fejléc JS/hidratálás nélkül is látszik (lásd Hero.tsx).
    <header
      className={`animate-hero-in fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled
          ? "border-forest-800/10 bg-sand-50/75 shadow-soft backdrop-blur-md dark:border-sand-50/10 dark:bg-forest-900/70"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-7 sm:py-4">
        <Link href="/" aria-label={`${siteConfig.brandName} — főoldal`}>
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
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
