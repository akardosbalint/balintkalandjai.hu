import type { Metadata } from "next";
import Link from "next/link";
import Faq, { type FaqItem } from "@/components/Faq";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = `Gyakori kérdések — ${siteConfig.brandName}`;
const pageDescription =
  "Ingyenes-e a heti hangfelvétel, milyen adatot kezelünk, hogyan iratkozhatsz le — a leggyakoribb kérdések egy helyen. Nem találod a válaszod? Iratkozz fel, és írj nekem.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/gyik",
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/gyik",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

const items: FaqItem[] = [
  {
    question: "Miről szól ez az oldal?",
    answer: (
      <>
        {siteConfig.ownerFullName} 70 napos indiai jógaoktatói képzésének élő,
        szűretlen dokumentálása: napi videó Rishikeshből (TikTokon,
        Instagramon, YouTube Shortson és Facebookon), plusz minden vasárnap
        egy 20-30 perces, vágatlan hangfelvétel emailben — csak
        feliratkozóknak, nem publikus —, amiben mindaz benne van, ami egy 60
        másodperces videóba nem fér bele.
      </>
    ),
  },
  {
    question: "Pontosan meddig leszel Indiában?",
    answer: (
      <>
        A gépem szeptember 26-án indul Magyarországról, szeptember 28-án
        érkezem Indiába. Október 1. és november 28. között tart maga a
        képzés, utána a terv szerint december 3-án indulok haza (érkezés
        Mo.-ra december 4.). Van egy kivétel: ha Őszentsége a Dalai
        Láma, Tenzin Gyatso december 27-ig bezárólag tanítást tart, ott
        maradok addig — a turistavízumom viszont egyszerre max. 90
        napot enged az országban, ami épp december 27-ig ad időt,
        szóval legkésőbb akkor mindenképpen el kell hagynom Indiát.
      </>
    ),
  },
  {
    question: "Kell fizetnem a heti hangfelvételért?",
    answer:
      "Nem. A heti hangfelvétel jelenleg teljesen ingyenes, nincs mögötte fizetős termék vagy előfizetés.",
  },
  {
    question: "Milyen gyakran érkezik a hangfelvétel?",
    answer:
      "Heti 1x, minden vasárnap: egy 20-30 perces, vágatlan hanganyag arról, ami a napi videók mögött valójában történik.",
  },
  {
    question: "Miben más a heti hangfelvétel, mint a napi videós tartalom?",
    answer:
      "A napi videó a highlight reel — azt bárki láthatja. A heti hangfelvétel a director's cut, kizárólag feliratkozóknak: mit tanultam, mit rontottam el, min gondolkodtam négykor éjjel — a nyitott, még lezáratlan kérdésekkel együtt.",
  },
  {
    question: "Csak a videós tartalmakat is követhetem, a heti hangfelvétel nélkül?",
    answer: (
      <>
        Igen — a{" "}
        <a
          href={siteConfig.social.tiktok}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          TikTok
        </a>
        ,{" "}
        <a
          href={siteConfig.social.instagram}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          Instagram
        </a>
        ,{" "}
        <a
          href={siteConfig.social.youtube}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          YouTube Shorts
        </a>{" "}
        és{" "}
        <a
          href={siteConfig.social.facebook}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          Facebook
        </a>{" "}
        profilom bárki számára nyitott, nem kell hozzá feliratkoznod semmire.
      </>
    ),
  },
  {
    question: "Milyen adatokat kezelsz, ha feliratkozom?",
    answer: (
      <>
        Az email címedet (kötelező) és opcionálisan a keresztnevedet. Bővebben
        az{" "}
        <Link
          href="/adatkezeles"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          Adatkezelési tájékoztatóban
        </Link>{" "}
        olvashatsz róla.
      </>
    ),
  },
  {
    question: "Használ az oldal sütiket vagy analitikát?",
    answer: (
      <>
        Google Analyticset használok a látogatottság és a feliratkozások
        mérésére. A mérőkód minden látogatáskor betöltődik, de amíg a
        képernyő alján megjelenő sávon nem fogadod el, nem helyez el
        sütit, és csak anonim, süti nélküli jeleket küld a Google-nek
        (pl. hogy megnyitottak egy oldalt, vagy sikeres volt-e egy
        feliratkozás) — ezekből nem derül ki, hogy ki vagy. Ha elfogadod,
        sütis mérés is indul. Hirdetési célú sütit egyik esetben sem
        használ az oldal. Bővebben az{" "}
        <Link
          href="/adatkezeles"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          Adatkezelési tájékoztatóban
        </Link>{" "}
        olvashatsz róla.
      </>
    ),
  },
  {
    question: "Hogyan iratkozhatok le?",
    answer: (
      <>
        Bármikor, egy kattintással — minden email alján találsz erre gombot.
        Vagy írj emailt a{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          {siteConfig.email}
        </a>{" "}
        címre, azt is elintézem — az utazás alatt ez néhány napig is
        eltarthat, a levél alján lévő leiratkozó link viszont azonnal
        működik.
      </>
    ),
  },
  {
    question: "Mi az a RYT-500 és a Yoga Alliance International?",
    answer:
      "Az RYT-500 egy regisztrált, 500 órás jógaoktató-képzés minősítés. A Yoga Alliance International a jógaoktatói képzések legelterjedtebb nemzetközi akkreditációs szervezete, amelyik ezt a minősítést kiadja.",
  },
  {
    question: "Lesz-e a jövőben fizetős program?",
    answer:
      "Elképzelhető. Ha ez megvalósul, a feliratkozók előre értesítést kapnak róla, és az Általános Szerződési Feltételek is frissülnek, mielőtt bármi fizetőssé válna.",
  },
  {
    question: "Hogyan érhetlek el, ha kérdésem van?",
    answer: (
      <>
        Emailben, a{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          {siteConfig.email}
        </a>{" "}
        címen — igyekszem személyesen válaszolni. Fontos: az utazás
        alatt (szeptember 26-tól a hazaérkezésemig — lásd fent) csak korlátozottan
        férek hozzá az emailjeimhez, a képzés napjai hosszúak és
        kötöttek, ezért a válaszom ilyenkor napokat, akár egy-két hetet is
        késhet. Ne vedd sértésnek — minden levelet elolvasok.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2 dark:text-terracotta-400"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 dark:text-sand-50 sm:text-4xl">
        Gyakori kérdések
      </h1>
      <p className="mt-2 max-w-md text-ink-900/70 dark:text-sand-100/70">
        A leggyakrabban kapott kérdések egy helyen. Ha valami hiányzik,
        írj bátran.
      </p>

      <div className="mt-10">
        <Faq items={items} />
      </div>
    </main>
  );
}
