import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

export default function Story() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="story" />

      <div className="mx-auto max-w-2xl">
        <AnimatedSection>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Ki ír neked
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Nem egy céges hírlevél. Egy ember, aki éppen most tanulja azt,
            amiről ír.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.1} className="mt-8 space-y-5 text-lg leading-relaxed text-ink-900/80">
          <p>
            Bálintnak hívnak. Pár éve akkreditált Lifestyle Medicine
            Consultant lettem, és jó ideje foglalkozom meditációval és
            közösségépítéssel — az Energy of Consciousness nevű körünkben
            karitatív vacsorákat szerveztem, és vittem egy meditációs
            műhelyt, ahol hétről hétre ültünk le másokkal csendben gondolkodni.
          </p>
          <p>
            Most épp becsomagoltam mindent, és elindultam Rishikeshbe, a
            Himalája lábához, hogy 58 napig, napi több órában tanuljak: Hatha,
            Ashtanga, Vinyasa, pranayama, jóga terápia, filozófia — a teljes
            csomag, 500 órás oktatói képzés keretében.
          </p>
          <p>
            Ez nem egy „5 tipp a jobb reggelhez” típusú hírlevél lesz. Sem
            napló, amit majd novemberben egyben elolvashatsz. Minden héten
            leülök, és megírom, mit tanultam, mit rontottam el, mitől
            görnyedtem gerincfájdalommal a padlón, és mi az az egy dolog, ami
            tényleg megváltoztatott valamit bennem — vagy sem. Őszintén,
            szűrés nélkül, ahogy egy barátnak írnám.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
