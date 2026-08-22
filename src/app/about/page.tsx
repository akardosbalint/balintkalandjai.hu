import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const title = `Rólunk — ki áll ${siteConfig.brandName} mögött`;
const description =
  "Kardos Bálint 31 éves, és 58 napra Indiába megy, hogy akkreditált jógaoktatóvá váljon — ezen az oldalon dokumentálja az utat, nyilvánosan.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: { title, description, url: `${siteConfig.url}/about`, type: "profile" },
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 sm:text-4xl">
        Rólam
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-900/80">
        <p>
          {siteConfig.ownerFullName} vagyok, 31 éves. Ezt az oldalt azért
          hoztam létre, hogy nyilvánosan, szűretlenül dokumentáljam egy 58
          napos, 500 órás akkreditált jógaoktatói képzésemet Rishikeshben,
          Indiában — napi TikTok-videóval és heti hosszú, őszinte levéllel.
        </p>
        <p>
          Nem vagyok guru, és nem coach vagyok. Az elmúlt években
          dolgoztam kereskedelemben, KKV marketing- és értékesítési
          vezetőként, közösségszervezőként, egy gyerekalapítvány
          kuratóriumi elnökeként, és végigjártam a konyhai ranglétrát
          mosogatótól konyhafőnökig is — sok mindent kipróbáltam, de
          keveshez tartottam ki tartósan.
        </p>
        <p>
          Az egyetlen kivétel az{" "}
          <a
            href="https://ecokozosseg.hu"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900"
          >
            ECO
          </a>{" "}
          (Energy of Consciousness), egy dogma- és vallásmentes önismereti
          technika, amit 3.5 éve, minden nap gyakorlok kihagyás nélkül. A
          jóga elvei ennek rokonai — ezért döntöttem úgy, hogy elmegyek
          Indiába, és a{" "}
          <span className="font-medium text-forest-900">
            Yoga Alliance International
          </span>{" "}
          által akkreditált{" "}
          <span className="font-medium text-forest-900">RYT-500</span>{" "}
          minősítést szerzem meg, közvetlenül a forrásnál tanulva.
        </p>
        <p>
          Ez az oldal nem ígér kész válaszokat vagy „megtaláltam magam”
          típusú lezárt sikertörténetet. Élőben zajlik, nyilvánosan, hogy
          legyen, aki számon kérje rajtam a folytatást a nehéz napokon is.
          Ha érdekel, kövesd végig velem — a{" "}
          <Link href="/" className="underline underline-offset-2">
            főoldalon
          </Link>{" "}
          tudsz feliratkozni a heti levélre.
        </p>
        <p>
          Elérhetőség és adatkezelés ügyében lásd a{" "}
          <Link href="/contact" className="underline underline-offset-2">
            kapcsolat
          </Link>{" "}
          és a{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            adatkezelési tájékoztató
          </Link>{" "}
          oldalt.
        </p>
      </div>
    </main>
  );
}
