import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";

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
const pageTitle =
  "31 éven keresztül lemaradtam a saját életemről — most utánajárok, miért";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: pageTitle,
  description: siteConfig.description,
  openGraph: {
    title: pageTitle,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.brandName,
    locale: "hu_HU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: siteConfig.description,
  },
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
        className={`${fraunces.variable} ${inter.variable} font-sans antialiased bg-sand-50 text-ink-900`}
      >
        {children}
      </body>
    </html>
  );
}
