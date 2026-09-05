import type { Config } from "tailwindcss";

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
        },
        terracotta: {
          400: "#D08059",
          500: "#C1613C",
          600: "#A94F30",
          700: "#8A3F26",
        },
        forest: {
          700: "#2E3B2C",
          800: "#243024",
          900: "#1A231B",
        },
        ink: {
          900: "#241C15",
        },
        gold: {
          400: "#B8935B",
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        breathe: "breathe 8s ease-in-out infinite",
        "breathe-slow": "breathe 14s ease-in-out infinite",
        "drift": "drift 22s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
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
  plugins: [],
};
export default config;
