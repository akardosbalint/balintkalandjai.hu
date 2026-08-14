import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";
import SubscribeForm from "./SubscribeForm";

/**
 * MÁSODIK (ALSÓ) CTA — más szög, mint a hero
 * -----------------------------------------------
 * A hero az ÉN sztorimról szól. Ez a szekció az OLVASÓRA fordítja a
 * kamerát: "mi van, ha te is elakadtál valahol" — direktebb,
 * személyesebb megszólítás, ami bevonja, nem csak folytatja a
 * történetet.
 */
export default function SecondCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <AnimatedSection>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Ha idáig eljutottál, valószínűleg te is elakadtál valahol
          </h2>
          <p className="mt-4 text-lg text-ink-900/75">
            Nem kell Indiába menned hozzá, hogy rájöjj, min kéne változtatnod.
            De ha van egy dolog, amiről tudod, hogy abba kéne hagynod, vagy
            végre elkezdened — kövesd végig, ahogy én próbálom kitalálni a
            sajátomat. Lehet, hogy közben te is megtudsz valamit magadról.
          </p>
        </AnimatedSection>

        <AnimatedSection
          delay={0.15}
          className="mt-10 flex w-full justify-center"
        >
          <SubscribeForm ctaLabel="Igen, engem is érdekel, hova fut ki ez" />
        </AnimatedSection>
      </div>
    </section>
  );
}
