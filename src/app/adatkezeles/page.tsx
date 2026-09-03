import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = `Adatkezelési tájékoztató — ${siteConfig.brandName}`;
const pageDescription =
  "Az akardosbalint.hu hírlevél-feliratkozáskor kezelt adatokról: milyen adat, milyen jogalap, meddig tároljuk, milyen jogaid vannak — nézd át feliratkozás előtt.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/adatkezeles",
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/adatkezeles",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 sm:text-4xl">
        Adatkezelési tájékoztató
      </h1>
      <p className="mt-2 text-sm text-ink-900/65">
        Hatályos: 2026. szeptember 2.
      </p>

      <div className="mt-10 space-y-8 text-ink-900/80">
        <section>
          <h2 className="font-serif text-xl text-forest-900">
            1. Az adatkezelő
          </h2>
          <p className="mt-2">
            Név: {siteConfig.ownerFullName}
            <br />
            Levelezési cím: {siteConfig.ownerAddress}
            <br />
            Jogállás: magánszemély — a weboldalt nem regisztrált
            vállalkozásként, hanem magánszemélyként üzemeltetem, ezért
            nincs hozzá tartozó adószám vagy nyilvántartási szám.
            <br />
            Email: {siteConfig.email}
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            2. Milyen adatokat kezelünk
          </h2>
          <p className="mt-2">
            A weboldal jelenleg egyetlen ponton kér el adatot: a hírlevélre
            való feliratkozáskor (a főoldalon található feliratkozó
            űrlapon). Ekkor az alábbi adatokat kérem el és kezelem:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>email cím (kötelező)</li>
            <li>keresztnév (opcionális, ha megadod)</li>
            <li>
              feliratkozás időpontja és technikai adatok (pl. IP cím, amit a
              MailerLite a visszaélések elleni védelem és a jogszerű
              hozzájárulás igazolása miatt automatikusan rögzít)
            </li>
          </ul>
          <p className="mt-2">
            Az űrlapon kívül más adatgyűjtési pont (pl. regisztráció,
            fizetés, kapcsolatfelvételi form) jelenleg nincs az oldalon.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            3. Az adatkezelés célja és jogalapja
          </h2>
          <p className="mt-2">
            Az adatkezelés célja a heti hírlevél, valamint az azzal
            kapcsolatos tartalmak kiküldése. Az adatkezelés jogalapja a
            GDPR 6. cikk (1) bekezdés a) pontja szerinti önkéntes
            hozzájárulásod, amelyet a feliratkozáskor a checkbox
            bejelölésével adsz meg.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            4. Sütik (cookie-k) és analitika
          </h2>
          <p className="mt-2">
            A weboldal Google Analyticset használ látogatottság mérésére
            (pl. hányan, honnan és milyen oldalakra érkeznek). Ez a mérés
            sütiket helyez el a böngésződben, és{" "}
            <strong className="font-medium text-forest-900">
              kizárólag a hozzájárulásoddal fut
            </strong>{" "}
            — az oldal betöltésekor semmilyen mérőkód nem aktív, amíg a
            képernyő alján megjelenő sávon nem kattintasz az „Elfogadom”
            gombra. Ha az „Elutasítom” gombra kattintasz, vagy nem
            reagálsz, a mérés nem indul el. A döntésedet a böngésződ
            eltárolja, így legközelebb nem kérdezünk rá újra; a döntést
            bármikor megváltoztathatod a böngésződ süti-beállításaiban a
            tárolt adat törlésével.
          </p>
          <p className="mt-2">
            Ezen kívül a weboldal nem használ saját sütiket, és nem épít
            be hirdetési vagy követő (tracking) kódot. A tárhelyszolgáltató
            (lásd lent) a szolgáltatás működtetéséhez technikailag
            szükséges naplózást végezhet, ami nem minősül marketing célú
            sütinek.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            5. Adatfeldolgozók
          </h2>
          <p className="mt-2">
            A hírlevelek kiküldéséhez a MailerLite Limited (Ireland)
            szolgáltatását használom, amely EU-s adatfeldolgozóként a GDPR
            előírásai szerint kezeli az adatokat. Adatfeldolgozói
            szerződésük elérhető a MailerLite honlapján (Data Processing
            Agreement).
          </p>
          <p className="mt-2">
            A weboldal tárhelyét a Vercel Inc. (USA) biztosítja, amely a
            szerver-naplók szintjén technikai adatokat (pl. IP-cím,
            böngésző-információk) kezelhet a szolgáltatás működtetéséhez.
            Az USA-ba történő adattovábbítás a Vercel által biztosított
            garanciák (pl. EU-US Data Privacy Framework vagy Standard
            Szerződéses Feltételek) mellett történik — a pontos jogalapot
            érdemes közvetlenül a Vercellel kötött feldolgozói
            szerződésben ellenőrizni.
          </p>
          <p className="mt-2">
            Ha hozzájárulsz a látogatottság-méréshez, a Google Ireland
            Limited (illetve anyavállalata, a Google LLC, USA) Google
            Analytics szolgáltatása kezeli az ehhez szükséges adatokat
            (pl. anonimizált IP-cím, meglátogatott oldalak, eszköz- és
            böngészőtípus). Az adatkezelés jogalapja a hozzájárulásod
            (GDPR 6. cikk (1) bek. a) pont), amit bármikor visszavonhatsz
            a fent leírt módon. Az USA-ba történő adattovábbítás a Google
            által biztosított garanciák (Standard Szerződéses Feltételek)
            mellett történik.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            6. Meddig tároljuk az adataidat
          </h2>
          <p className="mt-2">
            Az adataidat a hozzájárulásod visszavonásáig (azaz
            leiratkozásig) tároljuk. Leiratkozás után az adataid törlésre
            kerülnek, vagy a jogszabályi kötelezettségeknek megfelelően,
            korlátozott ideig, kizárólag a leiratkozás tényének
            igazolására őrizzük meg.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            7. A te jogaid
          </h2>
          <p className="mt-2">
            Bármikor kérheted az adataidhoz való hozzáférést, azok
            helyesbítését, törlését, az adatkezelés korlátozását, illetve
            tiltakozhatsz az adatkezelés ellen. Ezt a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címen teheted meg. A hírlevélről bármikor, egy kattintással
            leiratkozhatsz a levelek alján található linkre kattintva.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            8. Panasz benyújtásának lehetősége
          </h2>
          <p className="mt-2">
            Ha úgy érzed, hogy megsértettem az adataid kezelésével
            kapcsolatos jogaidat, panasszal fordulhatsz a Nemzeti
            Adatvédelmi és Információszabadság Hatósághoz (NAIH, cím: 1055
            Budapest, Falk Miksa utca 9-11., honlap: naih.hu), vagy bírósághoz
            fordulhatsz.
          </p>
        </section>
      </div>
    </main>
  );
}
