import { siteConfig } from "./site-config";

/**
 * Egyetlen forrás az adatkezelési tájékoztató szövegéhez — a /adatkezeles
 * (eredeti, meglévő útvonal) és a /privacy (agent/kereső számára jól
 * felfedezhető, indexelt alias) oldal is ezt rendereli, hogy a szöveg ne
 * tudjon szétcsúszni a két útvonal között.
 */
export const legalEffectiveDateIso = "2026-08-15";
export const legalEffectiveDate = new Intl.DateTimeFormat("hu-HU", {
  year: "numeric",
  month: "long",
  day: "numeric",
}).format(new Date(`${legalEffectiveDateIso}T00:00:00Z`));

export interface LegalSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export const legalSections: LegalSection[] = [
  {
    heading: "1. Az adatkezelő",
    paragraphs: [
      `Név: ${siteConfig.ownerFullName}`,
      `Levelezési cím: ${siteConfig.ownerAddress}`,
      "Jogállás: magánszemély — a weboldalt nem regisztrált vállalkozásként, hanem magánszemélyként üzemeltetem, ezért nincs hozzá tartozó adószám vagy nyilvántartási szám.",
      `Email: ${siteConfig.email}`,
    ],
  },
  {
    heading: "2. Milyen adatokat kezelünk",
    paragraphs: [
      "A hírlevélre való feliratkozáskor az alábbi adatokat kérem el és kezelem:",
    ],
    list: [
      "email cím (kötelező)",
      "keresztnév (opcionális, ha megadod)",
      "feliratkozás időpontja és technikai adatok (pl. IP cím, amit a MailerLite a visszaélések elleni védelem és a jogszerű hozzájárulás igazolása miatt automatikusan rögzít)",
    ],
  },
  {
    heading: "3. Az adatkezelés célja és jogalapja",
    paragraphs: [
      "Az adatkezelés célja a heti hírlevél, valamint az azzal kapcsolatos tartalmak kiküldése. Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés a) pontja szerinti önkéntes hozzájárulásod, amelyet a feliratkozáskor a checkbox bejelölésével és a megerősítő emailben (double opt-in) adsz meg.",
    ],
  },
  {
    heading: "4. Adatfeldolgozók",
    paragraphs: [
      "A hírlevelek kiküldéséhez a MailerLite Limited (Ireland) szolgáltatását használom, amely EU-s adatfeldolgozóként a GDPR előírásai szerint kezeli az adatokat. Adatfeldolgozói szerződésük elérhető a MailerLite honlapján (Data Processing Agreement).",
      "A weboldal tárhelyét a Vercel Inc. (USA) biztosítja, amely a szerver-naplók szintjén technikai adatokat (pl. IP-cím, böngésző-információk) kezelhet a szolgáltatás működtetéséhez. Az USA-ba történő adattovábbítás a Vercel által biztosított garanciák (pl. EU-US Data Privacy Framework vagy Standard Szerződéses Feltételek) mellett történik — a pontos jogalapot érdemes közvetlenül a Vercellel kötött feldolgozói szerződésben ellenőrizni.",
    ],
  },
  {
    heading: "5. Meddig tároljuk az adataidat",
    paragraphs: [
      "Az adataidat a hozzájárulásod visszavonásáig (azaz leiratkozásig) tároljuk. Leiratkozás után az adataid törlésre kerülnek, vagy a jogszabályi kötelezettségeknek megfelelően, korlátozott ideig, kizárólag a leiratkozás tényének igazolására őrizzük meg.",
    ],
  },
  {
    heading: "6. A te jogaid",
    paragraphs: [
      `Bármikor kérheted az adataidhoz való hozzáférést, azok helyesbítését, törlését, az adatkezelés korlátozását, illetve tiltakozhatsz az adatkezelés ellen. Ezt a ${siteConfig.email} címen teheted meg. A hírlevélről bármikor, egy kattintással leiratkozhatsz a levelek alján található linkre kattintva.`,
    ],
  },
  {
    heading: "7. Panasz benyújtásának lehetősége",
    paragraphs: [
      "Ha úgy érzed, hogy megsértettem az adataid kezelésével kapcsolatos jogaidat, panasszal fordulhatsz a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH, cím: 1055 Budapest, Falk Miksa utca 9-11., honlap: naih.hu), vagy bírósághoz fordulhatsz.",
    ],
  },
];
