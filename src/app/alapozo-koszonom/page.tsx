import type { Metadata } from "next";
import Link from "next/link";
import OpenInboxButton from "@/components/OpenInboxButton";
import OrganicBackground from "@/components/OrganicBackground";
import SocialLinks from "@/components/SocialLinks";
import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import { siteConfig } from "@/lib/site-config";

const pageTitle = "Örülök, hogy itt vagy! — Nirmana Meditációs Alapozó";
const pageDescription =
  "A feliratkozási kérelmed rögzítve. Erősítsd meg az emailedet, és kezdd el a hétnapos meditációs alapozó gyakorlatait.";

export const metadata: Metadata = {
  title: `${pageTitle} | ${siteConfig.brandName}`,
  description: pageDescription,
  robots: { index: false, follow: false },
};

export default async function AlapozoKoszonomPage(props: {
  searchParams: Promise<{ payment?: string; session_id?: string }>;
}) {
  const searchParams = await props.searchParams;
  const isPaymentSuccess =
    searchParams?.payment === "success" || Boolean(searchParams?.session_id);

  return (
    <main className="relative isolate flex min-h-[90vh] flex-col items-center overflow-hidden px-6 py-20 sm:py-28">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex w-full max-w-2xl animate-fade-in flex-col items-center text-center">
        {/* Sikeres fizetés visszajelzés (ha a látogató a Stripe-ról tért vissza) */}
        {isPaymentSuccess && (
          <div className="mb-8 w-full rounded-2xl border border-saffron-500/40 bg-saffron-500/15 p-5 text-left text-forest-900 dark:text-sand-50">
            <p className="font-serif text-lg font-medium">
              Hálásan köszönöm az önkéntes támogatásodat!
            </p>
            <p className="mt-1 text-sm text-ink-900/80 dark:text-sand-100/80">
              A hozzájárulásod segít abban, hogy a jövőben még több ember számára tehessünk
              elérhetővé ingyenes, minőségi meditációs és tudatossági tananyagokat.
            </p>
          </div>
        )}

        <p className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-terracotta-600 dark:text-terracotta-400 sm:text-sm">
          Sikeres regisztráció
        </p>

        {/* 6.1. KÖSZÖNŐÜZENET */}
        <h1 className="mt-4 text-balance font-serif text-3xl font-medium text-forest-900 dark:text-sand-50 sm:text-4xl md:text-5xl">
          Örülök, hogy itt vagy!
        </h1>

        <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-900/80 dark:text-sand-100/80 sm:text-lg">
          Elindulhatsz a saját meditációs gyakorlásod felé vezető úton. A következő napokban
          rövid, gyakorlatias leckékkel és vezetett gyakorlatokkal ismerkedhetsz meg a
          meditáció alapjaival, és megtalálhatod a számodra megfelelő gyakorlási módot.
        </p>

        {/* 6.2. MI TÖRTÉNIK EZUTÁN? */}
        <div className="mt-8 flex w-full flex-col items-center">
          <OpenInboxButton />

          <div className="mt-8 w-full max-w-md rounded-2xl border border-terracotta-500/30 bg-terracotta-500/10 p-5 text-left">
            <p className="font-serif text-lg font-medium text-forest-900 dark:text-sand-50">
              Fontos: erősítsd meg a feliratkozásodat!
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink-900/75 dark:text-sand-100/75">
              Küldtünk egy megerősítő emailt a Sender.net rendszerén keresztül. Kérlek, nyisd
              meg és kattints a benne lévő linkre, hogy a leckék biztosan eljussanak hozzád.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ink-900/70 dark:text-sand-100/70">
              Ha nem találod a beérkező levelek között, ellenőrizd a{" "}
              <span className="font-medium text-ink-900 dark:text-sand-50">spam</span> és a{" "}
              <span className="font-medium text-ink-900 dark:text-sand-50">promóciók</span>{" "}
              mappát is. A napi leckék a tervezett levélküldési idő szerint minden reggel
              5:00-kor érkeznek — a gyakorlatot a saját időbeosztásod szerint bármikor
              elvégezheted a nap folyamán.
            </p>
          </div>

          {/* Bónusz tananyag felület elérése */}
          <div className="mt-6 w-full max-w-md rounded-2xl border border-forest-900/15 bg-white/70 p-5 text-left shadow-sm backdrop-blur-sm dark:border-sand-50/15 dark:bg-forest-800/50">
            <div className="flex items-start gap-4">
              <span className="text-2xl">✨</span>
              <div>
                <p className="font-serif text-base font-medium text-forest-900 dark:text-sand-50">
                  Azonnal elérhető bónusz tananyagok
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  A 7 nap teljes leirata, a kezdői testhelyzet-útmutató és a 14 napos folytatási
                  terv a weboldalon is böngészhető.
                </p>
                <Link
                  href="/alapozo/bonusz"
                  className="mt-3 inline-flex items-center text-xs font-semibold text-terracotta-600 underline underline-offset-4 hover:text-terracotta-700 dark:text-terracotta-400 dark:hover:text-terracotta-300"
                >
                  Tovább a bónuszfelületre →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 7. STRIPE — ÖNKÉNTES TÁMOGATÁSI SZEKCIÓ */}
        <section className="mt-14 w-full max-w-lg rounded-3xl border border-forest-900/15 bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm dark:border-sand-50/15 dark:bg-forest-800/60 sm:p-8">
          <p className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400">
            Közösségi hozzájárulás
          </p>

          <h2 className="mt-2 font-serif text-2xl font-medium tracking-tight text-forest-900 dark:text-sand-50">
            Szeretnél még több ingyenes tananyagot?
          </h2>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80">
            <p>
              Ezt a hétnapos meditációs alapozót azért teszem ingyenesen elérhetővé, hogy minél
              többen megismerkedhessenek a meditációval, és elindulhassanak a saját gyakorlásuk
              útján.
            </p>
            <p>
              Ha értékesnek találod ezt a kezdeményezést, és szeretnél hozzájárulni további
              ingyenes meditációs gyakorlatok és tananyagok létrehozásához, itt önkéntesen
              támogathatod a munkámat.
            </p>
            <p>
              A támogatás teljesen opcionális. A kurzus minden leckéjét akkor is megkapod, ha
              nem támogatsz.
            </p>
            <p className="font-medium text-forest-900 dark:text-sand-50">
              Köszönöm, hogy itt vagy, és hogy időt szánsz a gyakorlásra.
            </p>
          </div>

          {/* Stripe beágyazott checkout vagy intelligens fallback a hivatalos Payment Linkre */}
          <div className="mt-6 w-full">
            <StripeEmbeddedCheckout buttonLabel="Önkéntesen támogatom a munkád" />
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-ink-900/65 dark:text-sand-100/65">
            Ha most nem szeretnél támogatni, nincs további teendőd. Az ingyenes kurzust ugyanúgy
            megkapod, és a következő napokban folytatjuk a közös gyakorlást.
          </p>
        </section>

        {/* Social jelenlét */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-900/65 dark:text-sand-100/60">
          <span>Kövess az utazás és a képzés alatt is:</span>
          <SocialLinks className="flex flex-wrap justify-center gap-x-3" />
        </div>

        <div className="mt-8 flex gap-4 text-sm">
          <Link
            href="/alapozo"
            className="text-terracotta-600 underline underline-offset-2 dark:text-terracotta-400"
          >
            ← Vissza az Alapozó oldalra
          </Link>
          <span className="text-ink-900/30 dark:text-sand-100/30">·</span>
          <Link
            href="/"
            className="text-terracotta-600 underline underline-offset-2 dark:text-terracotta-400"
          >
            Főoldal
          </Link>
        </div>
      </div>
    </main>
  );
}
