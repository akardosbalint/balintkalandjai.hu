import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, Noto_Sans_Devanagari } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import ThemeSchedule from "@/components/ThemeSchedule";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";
import { themeInitScript } from "@/lib/theme-schedule";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// "optional", nem "swap": a szövegtörzs (alcím, form, kártyák) sortörése
// a tartalék betűtípussal és az Inter-rel eltér, így "swap" esetén a
// webfont megérkezésekor a hero szövege újratördelődik, és a feliratkozó
// form lejjebb ugrik (lassított mobilon mért CLS 0.07-0.14). "optional"
// mellett gyors kapcsolaton (a font preloadolt) ugyanúgy Inter jelenik
// meg; lassú első látogatásnál a — next/font által méretre hangolt —
// tartalék betűtípus marad az oldal élettartamára, csere nélkül, a
// következő oldaltól pedig a gyorsítótárból már az Inter jön. A Fraunces
// (H1) maradhat "swap": a címsor magassága a két betűtípussal azonos.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "optional",
});

// Az om (ॐ) jel helyes devanagari glifjéhez — az utazás-jelző jelölőjében.
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-devanagari",
  weight: ["700"],
  display: "swap",
});

// META TITLE / DESCRIPTION — SEO + social share preview.
// Szándékosan nyers, nem "jóga hangfelvétel feliratkozás" sablon szöveg —
// ugyanaz a hang, mint a hero-ban.
//
// A <title> tag-nek (böngésző fül + Google találati lista) 60 karakter
// körül érdemes maradni, különben a keresőmotorok levágják — ezért ez
// rövidebb, és pontosan a Hero H1-jével egyezik. A közösségimédia-
// megosztásoknál (og:title/twitter:title) nagyvonalúbb a limit, ott
// megmarad a teljesebb, hosszabb mondat.
const pageTitle = "31 éven keresztül lemaradtam a saját életemről.";
const socialTitle =
  "31 éven keresztül lemaradtam a saját életemről — most utánajárok, miért";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: pageTitle,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: buildOpenGraph({
    title: socialTitle,
    description: siteConfig.description,
    path: "/",
  }),
  twitter: buildTwitter({
    title: socialTitle,
    description: siteConfig.description,
  }),
};

export const viewport: Viewport = {
  themeColor: "#FBF7F1",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" suppressHydrationWarning>
      <body
        className={`relative ${fraunces.variable} ${inter.variable} ${notoDevanagari.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/*
          Fut le legelőbb, még a hydration előtt — így nem villan fel a
          light mode egy pillanatra dark óraköz esetén (FOUC). A
          ThemeSchedule komponens tartja frissen ezt utána.
        */}
        <script
          dangerouslySetInnerHTML={{ __html: themeInitScript() }}
        />
        {/*
          Google Consent Mode "default": MINDIG ennek kell lefutnia a
          gtag.js betöltése előtt, különben az első pageview
          hozzájárulás nélkül menne ki. A tényleges "granted" állapotot
          a CookieConsent komponens állítja be.
        */}
        <Script id="ga-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied'
            });
            gtag('js', new Date());
          `}
        </Script>
        <GoogleAnalytics />
        <ThemeSchedule />
        <Header />
        {children}
        {/* Minden oldalon (a GYIK-en és a jogi oldalakon is) — korábban csak a főoldalon volt, az aloldalak zsákutcák voltak. */}
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
