import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Adatkezelési tájékoztató — ${siteConfig.brandName}`,
  robots: { index: false, follow: false },
};

/**
 * KIINDULÓ SABLON — MIELŐTT ÉLES OLDALON HASZNÁLNÁD:
 * A tényadatok (név, cím, email, tárhely, adatfeldolgozók) valósak,
 * de ez így is csak egy kiindulópont, nem jogi tanácsadás. Nézesd át
 * GDPR-hoz értő jogásszal, mielőtt élesbe mész — főleg mert idővel
 * fizetős programot is fogsz hirdetni, ami már számlázási / további
 * adatkezelési kötelezettségeket hozhat be.
 */
export default function AdatkezelesPage() {
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
      <p className="mt-2 text-sm text-ink-900/50">
        Hatályos: 2026. augusztus 15. Ez egy sablon — kérj jogi átnézést,
        mielőtt élesben használod.
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
            A hírlevélre való feliratkozáskor az alábbi adatokat kérem el és
            kezelem:
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
            bejelölésével és a megerősítő emailben (double opt-in) adsz meg.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            4. Adatfeldolgozók
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
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            5. Meddig tároljuk az adataidat
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
            6. A te jogaid
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
            7. Panasz benyújtásának lehetősége
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
