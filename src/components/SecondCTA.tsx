import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";
import SubscribeForm from "./SubscribeForm";

export default function SecondCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="cta" />

      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <AnimatedSection>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Ha idáig eljutottál, valószínűleg úgyis fel akarsz iratkozni
          </h2>
          <p className="mt-4 text-lg text-ink-900/75">
            Szóval ne kényszerítsd magad tovább görgetni. Írd be az emailed,
            és jövő héttől velem tartasz Rishikeshbe — kényelmi zóna és
            izomláz nélkül.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.15} className="mt-10 flex w-full justify-center">
          <SubscribeForm ctaLabel="Igen, jöhet a heti levél" />
        </AnimatedSection>
      </div>
    </section>
  );
}
