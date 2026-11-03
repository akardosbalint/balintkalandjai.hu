import type { Metadata } from "next";
import Link from "next/link";
import OpenInboxButton from "@/components/OpenInboxButton";
import OrganicBackground from "@/components/OrganicBackground";
import SocialLinks from "@/components/SocialLinks";
import StripeEmbeddedCheckout from "@/components/StripeEmbeddedCheckout";
import { siteConfig } from "@/lib/site-config";

const pageTitle = "Köszönöm a bizalmad! — Idegrendszeri Alapozó";
const pageDescription =
  "Köszönöm a bizalmad! Az 1. napi levél már úton van a postaládádba. Nézd meg a Beérkezett (vagy Promóciók) mappát!";

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
    <main className="relative isolate flex min-h-[90vh] flex-col items-center overflow-hidden px-6 py-16 sm:py-24">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex w-full max-w-2xl animate-fade-in flex-col items-center text-center">
        {/* Sikeres fizetés visszaigazoló szalag (ha befejezte a fizetést) */}
        {isPaymentSuccess && (
          <div className="mb-8 w-full rounded-2xl border border-emerald-600/40 bg-emerald-500/15 p-6 text-left text-forest-900 dark:border-emerald-400/40 dark:text-sand-50">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🙏</span>
              <div>
                <p className="font-serif text-xl font-medium text-emerald-950 dark:text-emerald-200">
                  Hálásan köszönöm az önkéntes támogatásodat!
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-900/85 dark:text-sand-100/90">
                  A hozzájárulásod segít abban, hogy a jövőben még több ember számára tehessünk
                  elérhetővé ingyenes, tiszta és minőségi idegrendszeri útmutatókat.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Felső státusz címke — Magas kontrasztú, jól olvasható tipográfia */}
        <div className="inline-flex items-center gap-2 rounded-full border border-forest-900/15 bg-white/95 px-4 py-1.5 font-serif text-xs font-semibold uppercase tracking-[0.2em] text-forest-900 shadow-sm dark:border-sand-50/25 dark:bg-forest-800 dark:text-sand-50 sm:text-sm">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          Gratulálok, a regisztrációt sikeres!
        </div>

        {/* 1. FŐCÍM & ÜZENET A BRIEF SZERINT */}
        <h1 className="mt-5 text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-5xl">
          Köszönöm a bizalmad!
        </h1>

        <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-ink-900/85 dark:text-sand-100/90 sm:text-xl font-medium">
          Az 1. napi levél már úton van a postaládádba. Nézd meg a Beérkezett (vagy Promóciók) mappát!
        </p>

        {/* 1. LÉPÉS: GYORS ÉS EGYÉRTELMŰ POSTALÁDA MEGERŐSÍTÉS */}
        <div className="mt-8 w-full rounded-2xl border border-forest-900/15 bg-white/95 p-6 text-left shadow-sm backdrop-blur-sm dark:border-sand-50/20 dark:bg-forest-800/80 sm:p-7">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <div className="inline-flex items-center gap-2 font-serif text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-sand-50">
                <span className="rounded-full bg-forest-900/10 px-2 py-0.5 dark:bg-sand-50/15 dark:text-sand-50">1. Lépés:</span>
                <span>Postafiók ellenőrzése</span>
              </div>
              <h2 className="mt-2 font-serif text-xl font-medium text-forest-900 dark:text-sand-50">
                Nyisd meg a levelet és erősítsd meg a feliratkozást!
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/85">
                Küldtünk egy megerősítő levelet az általad megadott e-mail címre. Kattints a levélben lévő gombra, hogy azonnal elindulhasson a 7 napos utazás.
              </p>
              <p className="mt-2 text-xs text-ink-900/65 dark:text-sand-100/70">
                (Ha 1-2 percen belül nem látod az elsődleges mappában, kérlek nézd meg a <strong>Promóciók</strong> vagy <strong>Spam</strong> mappát is.)
              </p>
            </div>
            <div className="shrink-0 pt-1">
              <OpenInboxButton />
            </div>
          </div>
        </div>

        {/* 2. LÉPÉS: ÖNKÉNTES TÁMOGATÁS — KIEMELT, EGYÉRTELMŰ ÉS NATÍV (OLDALON BELÜLI FIZETÉS) */}
        <section className="mt-8 w-full rounded-3xl border-2 border-forest-900/15 bg-white/95 p-6 text-left shadow-lg backdrop-blur-sm dark:border-sand-50/25 dark:bg-forest-800/95 sm:p-8">
          <div className="flex items-center justify-between gap-2 border-b border-forest-900/10 pb-4 dark:border-sand-50/15">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-forest-900/10 px-3.5 py-1 font-serif text-xs font-bold uppercase tracking-wider text-forest-900 dark:bg-sand-50/15 dark:text-sand-50">
              💛 2. Lépés (Opcionális támogatás)
            </span>
            <span className="text-xs font-medium text-emerald-800 dark:text-emerald-300">
              100% önkéntes hozzájárulás
            </span>
          </div>

          <h2 className="mt-4 font-serif text-2xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-3xl">
            Szeretnéd támogatni a további ingyenes anyagokat?
          </h2>

          <div className="mt-3 space-y-3 text-sm leading-relaxed text-ink-900/85 dark:text-sand-100/85">
            <p>
              Ezt a 7 napos Idegrendszeri Alapozót azért készítettem el teljesen ingyenesen, hogy bárki megtapasztalhassa a belső stabilitást és a regenerációt.
            </p>
            <p>
              Ha értékesnek találod ezt a kezdeményezést, egy tetszőleges összeggel (egy kávé vagy egy könyv árával) <strong>itt közvetlenül az oldalon, natív Stripe fizetéssel</strong> támogathatod a jövőbeli anyagok és vezetett meditációk elkészítését.
            </p>
            <p className="text-xs italic text-ink-900/70 dark:text-sand-100/70">
              * A támogatás teljesen opcionális: a 7 napos alapozó kurzus minden leckéjét és gyakorlatát akkor is maradéktalanul megkapod, ha most nem támogatsz.
            </p>
          </div>

          {/* NATÍV STRIPE BEÁGYAZOTT CHECKOUT — NULLA ÁTIRÁNYÍTÁS */}
          <div className="mt-6 w-full">
            <StripeEmbeddedCheckout />
          </div>

          <p className="mt-4 text-center text-xs text-ink-900/60 dark:text-sand-100/60">
            Köszönöm a bizalmadat és hogy időt szánsz az idegrendszered lecsendesítésére!
          </p>
        </section>

        {/* 3. BÓNUSZ TANANYAGOK ÉS HASZNOS LINKEK */}
        <div className="mt-8 flex w-full flex-col gap-4">
          <div className="rounded-2xl border border-forest-900/15 bg-white/70 p-5 text-left shadow-sm backdrop-blur-sm dark:border-sand-50/15 dark:bg-forest-800/60">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📖</span>
              <div>
                <p className="font-serif text-base font-medium text-forest-900 dark:text-sand-50">
                  Azonnal böngészhető bónusz anyagok
                </p>
                <p className="mt-1 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75">
                  A 7 nap teljes leirata, a kezdői testhelyzet-útmutató és a 14 napos folytatási terv
                  már elérhető a weboldalon.
                </p>
                <Link
                  href="/alapozo/bonusz"
                  className="mt-2.5 inline-flex items-center text-xs font-semibold text-forest-900 underline underline-offset-4 hover:text-terracotta-600 dark:text-saffron-300 dark:hover:text-sand-50"
                >
                  Tovább a bónuszfelületre →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Social jelenlét */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-900/70 dark:text-sand-100/70">
          <span>Kövess az utazás és a képzés alatt is:</span>
          <SocialLinks className="flex flex-wrap justify-center gap-x-3" />
        </div>

        <div className="mt-6 flex gap-4 text-sm">
          <Link
            href="/alapozo"
            className="text-forest-900 underline underline-offset-2 hover:text-terracotta-600 dark:text-saffron-300 dark:hover:text-sand-50"
          >
            ← Vissza az Alapozó oldalra
          </Link>
          <span className="text-ink-900/30 dark:text-sand-100/30">·</span>
          <Link
            href="/"
            className="text-forest-900 underline underline-offset-2 hover:text-terracotta-600 dark:text-saffron-300 dark:hover:text-sand-50"
          >
            Főoldal
          </Link>
        </div>
      </div>
    </main>
  );
}
