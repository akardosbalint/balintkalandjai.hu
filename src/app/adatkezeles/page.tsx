import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = `Adatkezelési tájékoztató — ${siteConfig.brandName}`;
const pageDescription =
  "Az akardosbalint.hu heti hangfelvételre való feliratkozáskor kezelt adatokról: milyen adat, milyen jogalap, meddig tároljuk, milyen jogaid vannak — nézd át feliratkozás előtt.";

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
        className="text-sm text-terracotta-600 underline underline-offset-2 dark:text-terracotta-400"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
        Adatkezelési tájékoztató
      </h1>
      <p className="mt-2 text-sm text-ink-900/65 dark:text-sand-100/65">
        Hatályos: 2026. szeptember 23.
      </p>

      <div className="mt-10 space-y-8 text-ink-900/80 dark:text-sand-100/80">
        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
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
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            2. Milyen adatokat kezelünk
          </h2>
          <p className="mt-2">
            A weboldal jelenleg egyetlen ponton kér el adatot: a heti
            hangfelvételre való feliratkozáskor (a főoldalon található feliratkozó
            űrlapon). Ekkor az alábbi adatokat kérem el és kezelem:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>email cím (kötelező)</li>
            <li>keresztnév (opcionális, ha megadod)</li>
            <li>
              a feliratkozás és a megerősítés időpontja, valamint azok a
              technikai adatok, amelyeket a Kit rendszere a hozzájárulásod
              igazolására rögzít (pl. amikor a megerősítő emailben lévő
              linkre kattintasz)
            </li>
          </ul>
          <p className="mt-2">
            Az űrlap elküldésekor a weboldal szervere az IP-címedet
            legfeljebb 10 percig, kizárólag a szerver memóriájában tartja
            meg, hogy kiszűrje a tömeges, automatizált (bot) feliratkozási
            kísérleteket. Ezt nem mentem el tartósan, és nem adom tovább a
            Kitnek — a Kit a feliratkozáskor csak az email címedet és (ha
            megadtad) a keresztnevedet kapja meg.
          </p>
          <p className="mt-2">
            Az űrlapon kívül más adatgyűjtési pont (pl. regisztráció,
            fizetés, kapcsolatfelvételi form) jelenleg nincs az oldalon.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            3. Az adatkezelés célja és jogalapja
          </h2>
          <p className="mt-2">
            Az adatkezelés célja a heti hangfelvétel, valamint az azzal
            kapcsolatos tartalmak kiküldése. Az adatkezelés jogalapja a
            GDPR 6. cikk (1) bekezdés a) pontja szerinti önkéntes
            hozzájárulásod, amelyet a feliratkozáskor a checkbox
            bejelölésével adsz meg.
          </p>
          <p className="mt-2">
            A fenti, visszaélések kiszűrésére szolgáló rövid IP-cím-kezelés
            jogalapja a GDPR 6. cikk (1) bekezdés f) pontja szerinti jogos
            érdekem: a feliratkozó rendszer és a mások email címével
            visszaélő, automatizált kérések elleni védelem.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            4. Sütik (cookie-k) és analitika
          </h2>
          <p className="mt-2">
            A weboldal Google Analyticset (Google Analytics 4) használ a
            látogatottság mérésére (pl. hányan, honnan és milyen oldalakra
            érkeznek), valamint annak mérésére, hogy sikeres volt-e egy
            feliratkozás. A mérés a Google úgynevezett „hozzájárulási
            módjában” (Consent Mode) fut, ami a gyakorlatban a következőt
            jelenti:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              A Google mérőkódja (gtag.js) minden látogatáskor betöltődik a
              Google szerveréről — mint minden ilyen letöltésnél, ehhez a
              böngésződ technikailag közli a Google-lel az IP-címedet.
            </li>
            <li>
              <strong className="font-medium text-forest-900 dark:text-sand-50">
                Amíg nem fogadod el a mérést
              </strong>{" "}
              (vagy ha elutasítod), a mérőkód nem helyez el és nem olvas ki
              sütit, és nem rendel hozzád azonosítót. Ilyenkor csak anonim,
              süti nélküli jeleket küld a Google-nek (pl. hogy egy oldalt
              megnyitottak, vagy hogy egy feliratkozás sikeres vagy
              sikertelen volt), amelyekből a Google összesített, becsült
              statisztikát készít. Ezekből nem azonosítható, hogy ki vagy.
            </li>
            <li>
              <strong className="font-medium text-forest-900 dark:text-sand-50">
                Ha a képernyő alján megjelenő sávon az „Elfogadom” gombra
                kattintasz
              </strong>
              , a Google Analytics sütiket helyez el a böngésződben (pl.{" "}
              <code>_ga</code>), így az ismételt látogatásaid is mérhetővé
              válnak.
            </li>
            <li>
              Hirdetési célú sütit, remarketinget vagy hirdetési
              személyre szabást az oldal egyik esetben sem használ — ezekhez
              a hozzájárulást a mérőkód alapból megtagadottra állítja, és az
              „Elfogadom” gomb sem kapcsolja be őket.
            </li>
            <li>
              A mérés soha nem kapja meg az email címedet vagy a nevedet.
            </li>
          </ul>
          <p className="mt-2">
            A döntésedet a böngésződ helyi tárhelye (localStorage) jegyzi
            meg, így legközelebb nem kérdezünk rá újra. A hozzájárulásodat
            bármikor visszavonhatod, ha a böngésződben törlöd ennek az
            oldalnak a tárolt adatait (sütik és webhelyadatok): ez a Google
            Analytics sütiket is törli, és a következő látogatáskor a sáv
            újra megjelenik.
          </p>
          <p className="mt-2">
            A weboldal saját sütit nem használ. A böngésződ helyi
            tárhelyében a fenti döntésen kívül legfeljebb a kézzel választott
            téma (világos/sötét) kerül tárolásra, ha a fejlécben lévő
            kapcsolóval átállítod. A tárhelyszolgáltató (lásd lent) a
            szolgáltatás működtetéséhez technikailag szükséges naplózást
            végezhet.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            5. Adatfeldolgozók
          </h2>
          <p className="mt-2">
            A heti hangfelvételek kiküldéséhez a Kit, Inc. (USA) szolgáltatását
            használom, amely adatfeldolgozóként a GDPR előírásai szerint kezeli
            az adatokat. Adatfeldolgozói szerződésük elérhető a Kit honlapján
            (Data Processing Agreement). Az USA-ba történő adattovábbítás a
            Kit által biztosított garanciák (pl. Standard Szerződéses
            Feltételek) mellett történik — a pontos jogalapot érdemes
            közvetlenül a Kittel kötött feldolgozói szerződésben ellenőrizni.
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
            A látogatottság-mérést a Google Ireland Limited (illetve
            anyavállalata, a Google LLC, USA) Google Analytics szolgáltatása
            végzi (lásd a 4. pontot). A mérőkód betöltésekor a Google
            megkapja az IP-címedet és a böngésződ technikai adatait;
            hozzájárulás nélkül csak a süti nélküli, anonim jeleket
            (meglátogatott oldal, esemény, eszköz- és böngészőtípus),
            hozzájárulás esetén a sütialapú mérés adatait is. A Google
            tájékoztatása szerint a Google Analytics 4 az IP-címeket nem
            naplózza és nem tárolja. A sütialapú mérés jogalapja a
            hozzájárulásod (GDPR 6. cikk (1) bek. a) pont), amit bármikor
            visszavonhatsz a 4. pontban leírt módon. Az USA-ba történő adattovábbítás a Google
            által biztosított garanciák (Standard Szerződéses Feltételek)
            mellett történik.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
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
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
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
            címen teheted meg. A heti hangfelvételről bármikor, egy
            kattintással leiratkozhatsz az emailek alján található linkre
            kattintva.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
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
