import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

/**
 * FOLYAMAT-BIZONYÍTÉK — nem hamis "sikertörténet" placeholder
 * -----------------------------------------------------------------
 * Mivel még nincs valós social proof, a keret NEM "mások már
 * kipróbálták és imádták" hazug placeholder, hanem "kövesd a
 * folyamatot, és dönts magad" — ami pontosan illik a "nincsenek
 * válaszaim, élőben keresem" pozicionáláshoz. A kártyák azt mutatják
 * be, MIT láthatsz élőben, nem azt, hogy kik dicsérték már.
 */
const proofPoints = [
  {
    title: "67 nap, napi bejelentkezés",
    description:
      "Minden nap kirakok egy TikTok-videót Rishikeshből — nem szerkesztett tartalom, hanem az, ami aznap tényleg történt.",
  },
  {
    title: "Heti levél, szűretlenül",
    description:
      "Amit nem mondok el 60 másodpercben, azt megírom hosszabban, hétvégenként — a kétségekkel, a rossz napokkal együtt.",
  },
  {
    title: "Egy történet, ami még nincs lezárva",
    description:
      "Nem utólag elmesélt sikertörténet ez. Élőben zajlik, és én sem tudom pontosan, hova fut ki. Te is végignézheted, ahogy én élem: valós időben.",
  },
];

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 grain-overlay">
      <OrganicBackground variant="proof" />

      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta-600 dark:text-terracotta-400 sm:text-sm">
            Miért higgy nekem
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight tracking-tight text-forest-900 dark:text-sand-50 sm:text-4xl">
            Nincsenek idézeteim elégedett olvasóktól. Van helyette valami
            jobb.
          </h2>
          <p className="mt-4 text-ink-900/70 dark:text-sand-100/70">
            Nem kérlek, hogy higgy a szavamnak. Kövesd végig a folyamatot, és
            döntsd el magad, hogy ér-e valamit.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {proofPoints.map((point, i) => (
            <AnimatedSection
              key={point.title}
              delay={0.08 * i}
              className="rounded-2xl bg-white/70 p-6 shadow-soft ring-1 ring-ink-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:bg-forest-600/30 dark:ring-sand-100/10 sm:p-7"
            >
              <h3 className="font-serif text-lg tracking-tight text-forest-900 dark:text-sand-50">
                {point.title}
              </h3>
              <p className="mt-3 text-ink-900/70 dark:text-sand-100/70">{point.description}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
