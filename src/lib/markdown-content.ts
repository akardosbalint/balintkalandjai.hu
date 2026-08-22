import { legalEffectiveDate, legalSections } from "./legal-content";
import { siteConfig } from "./site-config";

/**
 * Markdown reprezentációk a text/markdown content negotiationhöz
 * (lásd src/middleware.ts). Minden útvonalhoz egy rövid, hűséges
 * markdown-összefoglaló tartozik — nem az oldal HTML-jének 1:1 másolata,
 * hanem ugyanazoknak a tényeknek/linkeknek agent-barát reprezentációja.
 */

function legalSectionsMarkdown(): string {
  return legalSections
    .map((section) => {
      const paragraphs = section.paragraphs.join("\n\n");
      const list = section.list
        ? "\n" + section.list.map((item) => `- ${item}`).join("\n")
        : "";
      return `## ${section.heading}\n\n${paragraphs}${list}`;
    })
    .join("\n\n");
}

function homeMarkdown(): string {
  return `# 31 éven keresztül lemaradtam a saját életemről

${siteConfig.description}

## Ki vagyok

${siteConfig.ownerFullName} vagyok, 31 éves. Nem vagyok guru vagy coach.
Sok mindent kipróbáltam (kereskedelem, marketing- és értékesítési
vezetés, közösségszervezés, konyhai munka), de 3.5 éve tartok ki
folyamatosan egyetlen dolog mellett: az ECO (Energy of Consciousness)
nevű, dogma- és vallásmentes önismereti technika napi gyakorlása.

## Mi ez az oldal

58 napos, 500 órás, a Yoga Alliance International által akkreditált
RYT-500 jógaoktatói képzésre megyek Rishikeshbe, Indiába. Az utat
nyilvánosan dokumentálom:

- napi TikTok-videó a ${siteConfig.social.tiktok} fiókon
- heti hosszú, szűretlen levél feliratkozóknak

## Mit kapsz a hírlevélben

- Heti 1 levél, nem napi optimizmus-adag
- Nulla szűrés, nulla guru-pózolás
- Amit egy 60 másodperces videóban nem lehet elmondani
- Élő, lezáratlan gondolkodás — a nyitott kérdésekkel együtt

## Feliratkozás

A feliratkozó form a főoldalon (${siteConfig.url}/) érhető el.

## További oldalak

- [Rólam](${siteConfig.url}/about)
- [Kapcsolat](${siteConfig.url}/contact)
- [Adatkezelési tájékoztató](${siteConfig.url}/privacy)
- [Sitemap](${siteConfig.url}/sitemap.xml)
- [llms.txt](${siteConfig.url}/llms.txt)
`;
}

function aboutMarkdown(): string {
  return `# Rólam — ${siteConfig.brandName}

${siteConfig.ownerFullName} vagyok, 31 éves. Ezt az oldalt azért hoztam
létre, hogy nyilvánosan, szűretlenül dokumentáljam egy 58 napos, 500
órás akkreditált jógaoktatói képzésemet Rishikeshben, Indiában — napi
TikTok-videóval és heti hosszú, őszinte levéllel.

Nem vagyok guru, és nem coach vagyok. Az elmúlt években dolgoztam
kereskedelemben, KKV marketing- és értékesítési vezetőként,
közösségszervezőként, egy gyerekalapítvány kuratóriumi elnökeként, és
végigjártam a konyhai ranglétrát mosogatótól konyhafőnökig is — sok
mindent kipróbáltam, de keveshez tartottam ki tartósan.

Az egyetlen kivétel az ECO (Energy of Consciousness), egy dogma- és
vallásmentes önismereti technika, amit 3.5 éve, minden nap gyakorlok
kihagyás nélkül. A jóga elvei ennek rokonai — ezért döntöttem úgy, hogy
elmegyek Indiába, és a Yoga Alliance International által akkreditált
RYT-500 minősítést szerzem meg, közvetlenül a forrásnál tanulva.

Ez az oldal nem ígér kész válaszokat vagy lezárt sikertörténetet. Élőben
zajlik, nyilvánosan, hogy legyen, aki számon kérje rajtam a folytatást a
nehéz napokon is.

- [Főoldal / feliratkozás](${siteConfig.url}/)
- [Kapcsolat](${siteConfig.url}/contact)
- [Adatkezelési tájékoztató](${siteConfig.url}/privacy)
`;
}

function contactMarkdown(): string {
  return `# Kapcsolat — ${siteConfig.brandName}

Ez az oldal ${siteConfig.ownerFullName} magánprojektje — nem regisztrált
vállalkozás, hanem egy magánszemély által üzemeltetett, személyes
hangvételű hírlevél és tartalomsorozat egy 58 napos indiai jógaoktatói
képzésről.

## Email

${siteConfig.email}

## TikTok

${siteConfig.social.tiktok}

Igyekszem minden emailre néhány napon belül válaszolni, de mivel ezt
egyedül, utazás közben csinálom, előfordulhat, hogy tovább tart.
Adatkezeléssel, a hírlevélről való leiratkozással vagy a jogaiddal
kapcsolatos kérdésekhez lásd az [adatkezelési tájékoztatót](${siteConfig.url}/privacy).
`;
}

function privacyMarkdown(): string {
  return `# Adatkezelési tájékoztató

Hatályos: ${legalEffectiveDate}.

${legalSectionsMarkdown()}
`;
}

function notFoundMarkdown(pathname: string): string {
  return `# 404 — ez az oldal nem létezik

A(z) \`${pathname}\` útvonalon nincs tartalom ezen a domainen.

## Hova érdemes nézni

- [Főoldal](${siteConfig.url}/)
- [Sitemap](${siteConfig.url}/sitemap.xml)
- [llms.txt (agent instrukciók)](${siteConfig.url}/llms.txt)
- [Rólam](${siteConfig.url}/about)
- [Kapcsolat](${siteConfig.url}/contact)
- [Adatkezelési tájékoztató](${siteConfig.url}/privacy)
`;
}

export interface NegotiatedMarkdown {
  status: 200 | 404;
  body: string;
}

const KNOWN_MARKDOWN_ROUTES: Record<string, () => string> = {
  "/": homeMarkdown,
  "/about": aboutMarkdown,
  "/contact": contactMarkdown,
  "/privacy": privacyMarkdown,
  "/adatkezeles": privacyMarkdown,
};

/** Returns the markdown representation for a known route, or a 404 body. */
export function getMarkdownForPath(pathname: string): NegotiatedMarkdown {
  const render = KNOWN_MARKDOWN_ROUTES[pathname];
  if (render) {
    return { status: 200, body: render() };
  }
  return { status: 404, body: notFoundMarkdown(pathname) };
}
