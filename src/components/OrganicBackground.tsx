type Variant = "hero" | "story" | "offer" | "proof" | "cta";

/**
 * Két vizuális "hangnem" fut végig az oldalon, a külső-belső utazás
 * motívumát követve:
 * - OUTER (hero, proof, cta): a fizikai út, a nyilvánosság, a napi
 *   dokumentálás — safrán/terrakotta, aszimmetrikus, nyugtalanabb
 *   "drift" mozgás, több/nagyobb folt.
 * - INNER (story, offer): a reflexió, a gyakorlat, a képzés belső
 *   oldala — arany (gold), központos, visszafogottabb "breathe"
 *   lélegzés, egyetlen, kisebb folt.
 * Lásd még: a szekciók `grain-overlay` osztálya (globals.css) ugyanezt
 * a kettősséget viszi tovább textúrában — csak az OUTER szekciókon.
 */
const VARIANT_BLOBS: Record<Variant, { className: string; style: React.CSSProperties }[]> = {
  // OUTER — Hero: nyitás, indulás. Fő folt jobb fent + egy halványabb,
  // sodródó terrakotta kísérő balra lent, hogy a kompozíció nyitottabb,
  // aszimmetrikusabb legyen.
  hero: [
    {
      className:
        "absolute -top-32 -right-24 h-[32rem] w-[32rem] rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(255,153,51,0.22), rgba(255,153,51,0) 70%)",
      },
    },
    {
      className:
        "absolute -bottom-28 -left-16 h-[20rem] w-[20rem] rounded-full blur-3xl animate-drift",
      style: {
        background:
          "radial-gradient(closest-side, rgba(193,97,60,0.14), rgba(193,97,60,0) 70%)",
      },
    },
  ],
  // INNER — Story: önreflexió, a döntés története. Egyetlen, központos,
  // visszafogott arany fény — csendesebb, mint az outer szekciók.
  story: [
    {
      className:
        "absolute top-0 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(184,147,91,0.42), rgba(184,147,91,0) 70%)",
      },
    },
  ],
  // INNER — WhatYouGet: a heti hangfelvétel befelé forduló ígérete. Ugyanaz a
  // csendes arany nyelv, de alulról, hogy ne ismételje pontosan a
  // Story-t.
  offer: [
    {
      className:
        "absolute -bottom-10 left-1/2 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full blur-3xl animate-breathe",
      style: {
        background:
          "radial-gradient(closest-side, rgba(184,147,91,0.36), rgba(184,147,91,0) 70%)",
      },
    },
  ],
  // OUTER — SocialProof: a napi, nyilvános dokumentálás. Nyugtalanabb
  // "drift" mozgás + egy kis terrakotta kísérő, hogy élénkebb legyen a
  // Story/WhatYouGet csendjéhez képest.
  proof: [
    {
      className:
        "absolute -top-16 right-0 h-[24rem] w-[24rem] rounded-full blur-3xl animate-drift",
      style: {
        background:
          "radial-gradient(closest-side, rgba(255,153,51,0.16), rgba(255,153,51,0) 70%)",
      },
    },
    {
      className:
        "absolute bottom-0 left-10 h-[14rem] w-[14rem] rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(193,97,60,0.12), rgba(193,97,60,0) 70%)",
      },
    },
  ],
  // OUTER — SecondCTA: visszatérés/meghívás. Melegebb, safrán-terrakotta
  // kettősség, de nyugodt "breathe" lélegzés — ünnepélyes lezárás, nem
  // nyugtalan mozgás.
  cta: [
    {
      className:
        "absolute inset-x-0 -top-40 mx-auto h-[26rem] w-[26rem] rounded-full blur-3xl animate-breathe-slow",
      style: {
        background:
          "radial-gradient(closest-side, rgba(255,153,51,0.18), rgba(255,153,51,0) 70%)",
      },
    },
  ],
};

export default function OrganicBackground({ variant }: { variant: Variant }) {
  const blobs = VARIANT_BLOBS[variant];
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blobs.map((blob, i) => (
        <div key={i} className={blob.className} style={blob.style} />
      ))}
    </div>
  );
}
