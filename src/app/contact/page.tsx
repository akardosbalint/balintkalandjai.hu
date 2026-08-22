import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const title = `Kapcsolat — ${siteConfig.brandName}`;
const description = `Írj emailt ${siteConfig.ownerFullName}-nak, vagy kövesd TikTokon — elérhetőségek és válaszidő.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/contact` },
  openGraph: { title, description, url: `${siteConfig.url}/contact`, type: "website" },
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 sm:text-4xl">
        Kapcsolat
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-900/80">
        <p>
          Ez az oldal {siteConfig.ownerFullName} magánprojektje — nem
          regisztrált vállalkozás, hanem egy magánszemély által
          üzemeltetett, személyes hangvételű hírlevél és tartalomsorozat
          egy 58 napos indiai jógaoktatói képzésről.
        </p>
        <p>
          Ha kérdésed van, visszajelzést adnál, vagy bármi miatt szeretnél
          írni, a leggyorsabban emailben érsz el:
        </p>
        <p>
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-forest-900 underline decoration-terracotta-500 underline-offset-2"
          >
            {siteConfig.email}
          </a>
        </p>
        <p>
          A napi bejelentkezéseket TikTokon teszem közzé:{" "}
          <a
            href={siteConfig.social.tiktok}
            target="_blank"
            rel="noreferrer"
            className="underline decoration-terracotta-500 underline-offset-2"
          >
            {siteConfig.social.tiktok}
          </a>
          .
        </p>
        <p>
          Igyekszem minden emailre néhány napon belül válaszolni, de mivel
          ezt egyedül, utazás közben csinálom, előfordulhat, hogy tovább
          tart. Adatkezeléssel, a hírlevélről való leiratkozással vagy a
          jogaiddal kapcsolatos kérdésekhez lásd az{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            adatkezelési tájékoztatót
          </Link>
          , amely az adatkezelő pontos elérhetőségét is tartalmazza.
        </p>
      </div>
    </main>
  );
}
