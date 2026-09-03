import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import CookieConsent from "@/components/CookieConsent";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

// META TITLE / DESCRIPTION — SEO + social share preview.
// Szándékosan nyers, nem "jóga hírlevél feliratkozás" sablon szöveg —
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
    <html lang="hu">
      <body
        className={`relative ${fraunces.variable} ${inter.variable} font-sans antialiased bg-sand-50 text-ink-900`}
      >
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
        <Header />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
