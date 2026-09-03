import type { Metadata } from "next";
import Link from "next/link";
import Faq, { type FaqItem } from "@/components/Faq";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = `Gyakori kérdések — ${siteConfig.brandName}`;
const pageDescription =
  "Ingyenes-e a hírlevél, milyen adatot kezelünk, hogyan iratkozhatsz le — a leggyakoribb kérdések egy helyen. Nem találod a válaszod? Iratkozz fel, és írj nekem.";

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
        {siteConfig.ownerFullName} 67 napos indiai jógaoktatói képzésének élő,
        szűretlen dokumentálása: napi TikTok-videó Rishikeshből, plusz egy
        heti email hírlevél, amiben mindaz benne van, ami egy 60 másodperces
        videóba nem fér bele.
      </>
    ),
  },
  {
    question: "Kell fizetnem a hírlevélért?",
    answer:
      "Nem. A hírlevél jelenleg teljesen ingyenes, nincs mögötte fizetős termék vagy előfizetés.",
  },
  {
    question: "Milyen gyakran érkezik levél?",
    answer:
      "Heti egy alkalommal — nem napi optimizmus-adag, hanem egy hosszabb, mélyebb összefoglaló arról, ami a napi TikTok-videók mögött valójában történik.",
  },
  {
    question: "Miben más a hírlevél, mint a TikTok-tartalom?",
    answer:
      "A TikTok a napi highlight reel. A hírlevél a director's cut: mit tanultam, mit rontottam el, min gondolkodtam négykor éjjel — a nyitott, még lezáratlan kérdésekkel együtt.",
  },
  {
    question: "Csak a TikTokot is követhetem, hírlevél nélkül?",
    answer: (
      <>
        Igen — a{" "}
        <a
          href={siteConfig.social.tiktok}
          target="_blank"
          rel="noreferrer"
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          TikTok-profil
        </a>{" "}
        bárki számára nyitott, nem kell hozzá feliratkoznod semmire.
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
        Google Analyticset használok látogatottság mérésére, de csak akkor,
        ha ezt a képernyő alján megjelenő sávon elfogadod — enélkül nem
        indul el semmilyen mérőkód. Bővebben az{" "}
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
        Bármikor, egy kattintással — minden levél alján találsz erre gombot.
        Vagy írj emailt a{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="underline decoration-terracotta-500 underline-offset-2"
        >
          {siteConfig.email}
        </a>{" "}
        címre, azt is elintézem.
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
        címen — igyekszem személyesen válaszolni.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 sm:text-4xl">
        Gyakori kérdések
      </h1>
      <p className="mt-2 max-w-md text-ink-900/70">
        A leggyakrabban kapott kérdések egy helyen. Ha valami hiányzik,
        írj bátran.
      </p>

      <div className="mt-10">
        <Faq items={items} />
      </div>
    </main>
  );
}
