import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = `Általános Szerződési Feltételek — ${siteConfig.brandName}`;
const pageDescription =
  "A heti hírlevél igénybevételének feltételei: mit kapsz tőlem, mi a felelősségem, és hogyan iratkozhatsz le bármikor. Nézd át, mielőtt feliratkozol a levelekre.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/aszf",
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/aszf",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

/**
 * KIINDULÓ SABLON — MIELŐTT ÉLES OLDALON HASZNÁLNÁD:
 * A jelenlegi szolgáltatás ingyenes hírlevél, nincs fizetős termék
 * vagy előfizetés. Ha a jövőben fizetős programot indítasz, ezt a
 * dokumentumot bővíteni kell (fizetési feltételek, elállási jog,
 * számlázás), és érdemes jogásszal átnézetni.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2 dark:text-terracotta-400"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
        Általános Szerződési Feltételek
      </h1>
      <p className="mt-2 text-sm text-ink-900/65 dark:text-sand-100/65">
        Hatályos: 2026. szeptember 3.
      </p>

      <div className="mt-10 space-y-8 text-ink-900/80 dark:text-sand-100/80">
        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            1. A szolgáltató
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
            2. A szolgáltatás
          </h2>
          <p className="mt-2">
            A weboldal ({siteConfig.url}) jelenleg egyetlen szolgáltatást
            nyújt: egy ingyenes heti email hírlevelet, amelyben a
            {" " + siteConfig.ownerFullName} 67 napos indiai jógaoktatói
            képzésének személyes, szűretlen dokumentálását olvashatod. A
            hírlevél mellett napi TikTok-tartalom is elérhető, ez azonban
            nem a weboldalon keresztül, hanem a TikTok platformján zajlik,
            és nem tartozik ennek az ÁSZF-nek a hatálya alá.
          </p>
          <p className="mt-2">
            A szolgáltatás jelenleg{" "}
            <strong className="font-medium text-forest-900 dark:text-sand-50">
              teljesen ingyenes
            </strong>
            , fizetős terméket vagy előfizetést a weboldal nem árul, és
            fizetési adatot nem kér be. Ha ez a jövőben változik (pl.
            fizetős program indul), ezt a dokumentumot előtte frissítem, és
            a változásról a hírlevélben is tájékoztatlak.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            3. Feliratkozás
          </h2>
          <p className="mt-2">
            A hírlevélre a főoldalon található űrlapon iratkozhatsz fel,
            email címed (kötelező) és keresztneved (opcionális) megadásával,
            valamint a feliratkozási feltételek elfogadásával. A
            feliratkozás önkéntes, bármikor lemondható, és nem jár semmilyen
            fizetési kötelezettséggel. A feliratkozáskor kezelt
            adatokról bővebben az{" "}
            <Link
              href="/adatkezeles"
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              Adatkezelési tájékoztatóban
            </Link>{" "}
            olvashatsz.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            4. Tartalom és felelősség
          </h2>
          <p className="mt-2">
            A hírlevél és a hozzá kapcsolódó tartalom {siteConfig.ownerName}{" "}
            személyes tapasztalatait, véleményét és gondolatait osztja meg —
            nem minősül szakmai (jogi, egészségügyi, pszichológiai vagy
            pénzügyi) tanácsadásnak. A leírt jóga- és
            légzőgyakorlatok kipróbálása saját felelősségre történik; ha
            egészségügyi problémád van, kérlek, konzultálj szakemberrel,
            mielőtt bármit kipróbálnál a leírtak alapján.
          </p>
          <p className="mt-2">
            A tartalom élőben, szerkesztés nélkül készül, ezért előfordulhat,
            hogy egyes megállapítások később tévesnek bizonyulnak, vagy a
            szerző véleménye megváltozik — ezt a levelek is jelezni fogják,
            ahol releváns.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            5. Szellemi tulajdon
          </h2>
          <p className="mt-2">
            A weboldalon és a hírlevélben megjelenő szövegek, képek és egyéb
            tartalmak {siteConfig.ownerFullName} szellemi tulajdonát képezik.
            A tartalom saját, személyes célra szabadon olvasható és
            megosztható (pl. linkelhető), de üzleti célú, engedély nélküli
            átvétele vagy többszörözése nem megengedett.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            6. Leiratkozás, megszűnés
          </h2>
          <p className="mt-2">
            A hírlevélről bármikor, indoklás nélkül, egy kattintással
            leiratkozhatsz a levelek alján található linkre kattintva, vagy
            a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címen jelezve. A leiratkozás azonnali hatályú, és nem jár
            semmilyen költséggel.
          </p>
          <p className="mt-2">
            Fenntartom a jogot, hogy a szolgáltatást bármikor módosítsam
            vagy megszüntessem — ez esetben a feliratkozókat előzetesen
            tájékoztatom.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            7. Panasz, jogorvoslat
          </h2>
          <p className="mt-2">
            Ha bármilyen problémád van a szolgáltatással kapcsolatban, először
            keress meg emailben a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címen — igyekszem gyorsan reagálni. Amennyiben ez nem vezet
            eredményre, fogyasztóként a lakóhelyed szerint illetékes
            békéltető testülethez, vagy a Nemzeti Adatvédelmi és
            Információszabadság Hatósághoz (adatkezeléssel kapcsolatos
            panasz esetén, lásd az Adatkezelési tájékoztatót) fordulhatsz.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900 dark:text-sand-50">
            8. Alkalmazandó jog
          </h2>
          <p className="mt-2">
            Jelen Általános Szerződési Feltételekre a magyar jog az
            irányadó. Az itt nem szabályozott kérdésekben a Polgári
            Törvénykönyv és a vonatkozó fogyasztóvédelmi jogszabályok
            rendelkezései alkalmazandók.
          </p>
        </section>
      </div>
    </main>
  );
}
