import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        sand: {
          50: "#FBF7F1",
          100: "#F4ECE0",
          200: "#EADCC7",
          300: "#DEC9A8",
          // Mélyebb homok-árnyalat: fényes témában a "belső" felületekhez
          // (kártyák, kiemelt panelek) — lásd 3-4. lépés.
          400: "#D2B78E",
        },
        terracotta: {
          400: "#D08059",
          500: "#C1613C",
          600: "#A94F30",
          700: "#8A3F26",
        },
        saffron: {
          400: "#FFB366",
          500: "#FF9933",
          600: "#E6821A",
        },
        forest: {
          // Világosabb erdő-árnyalat: sötét témában a "belső" felületekhez
          // (kártyák, kiemelt panelek) — a 900-as alapháttérnél észrevehetően
          // világosabb, de a szöveges 700/800-nál még visszafogott.
          600: "#3B4B39",
          700: "#2E3B2C",
          800: "#243024",
          900: "#1A231B",
        },
        ink: {
          900: "#241C15",
        },
        // A "belső utazás" (jóga, reflexió, tanulás) csendesebb kísérő
        // árnyalata a domináns safrán (= "külső utazás", CTA-k, élénk
        // pillanatok) mellett — eddig gyakorlatilag használaton kívül volt.
        gold: {
          300: "#D9BB8C",
          400: "#B8935B",
          600: "#96703C",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        devanagari: ["var(--font-devanagari)", "serif"],
      },
      boxShadow: {
        // Meleg, ink-alapú árnyékok a Tailwind alapértelmezett semleges
        // szürkéje helyett — kevésbé "generikus UI", jobban illik a
        // föld/napfény palettához.
        soft: "0 1px 2px 0 rgba(36,28,21,0.05), 0 6px 20px -4px rgba(36,28,21,0.12)",
        "soft-lg":
          "0 4px 10px 0 rgba(36,28,21,0.08), 0 24px 48px -12px rgba(36,28,21,0.22)",
        // Szín szerinti izzás a két motívumhoz: safrán a "külső" (dinamikus,
        // nyilvános) elemekhez, arany a "belső" (csendes, reflektív)
        // elemekhez — 3-4. lépéstől ténylegesen bevonva.
        "glow-saffron":
          "0 0 0 1px rgba(255,153,51,0.15), 0 8px 30px -6px rgba(255,153,51,0.35)",
        "glow-gold":
          "0 0 0 1px rgba(184,147,91,0.18), 0 8px 30px -8px rgba(184,147,91,0.30)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        breathe: "breathe 8s ease-in-out infinite",
        "breathe-slow": "breathe 14s ease-in-out infinite",
        "drift": "drift 22s ease-in-out infinite",
        // Hidratálás nélkül is lefutó belépő animáció a hero-hoz és a
        // fejléchez — lásd Hero.tsx, miért nem Framer Motion. Az easing a
        // motion-rendszer EASE.smooth görbéje (src/lib/motion.ts).
        "hero-in": "heroIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        heroIn: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "50%": { transform: "translate(2%, -3%) rotate(4deg)" },
        },
      },
    },
  },
  plugins: [
    // Érintőképernyőn a `:hover` érintésre/görgetésre felvillanhat és
    // eltűnhet (mobil Safari/Chrome ismert viselkedése), ami a kártya-
    // lift, fotó-zoom és gomb-hover effektusokat villogtatja görgetés
    // közben. Ezért a hover/group-hover variánst globálisan csak valódi,
    // pontos mutatóeszközön (egér) aktiváljuk — érintőn ezek az
    // effektusok egyszerűen nem futnak le, ahogy asztali gépen kívül
    // nem is várható tőlük hover-visszajelzés.
    plugin(function ({ addVariant }) {
      addVariant("hover", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant(
        "group-hover",
        "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }"
      );
    }),
  ],
};
export default config;
