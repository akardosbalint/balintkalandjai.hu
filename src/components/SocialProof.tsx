import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

/**
 * PLACEHOLDER TARTALOM
 * ---------------------
 * Ezeket a kártyákat cseréld le valódi visszajelzésekre, amint
 * összegyűlnek — a meditációs kör tagjaitól, a karitatív vacsorák
 * résztvevőitől, vagy a hírlevél első olvasóitól.
 */
const quotes = [
  {
    quote:
      "„Ide teszünk majd egy valódi mondatot valakitől, aki részt vett Bálint meditációs körén vagy karitatív vacsoráján.”",
    name: "Helyőrző név",
    context: "Energy of Consciousness közösség",
  },
  {
    quote:
      "„Ide kerül majd egy visszajelzés valakitől, aki már olvassa a heti leveleket Indiából.”",
    name: "Helyőrző név",
    context: "hírlevél-olvasó",
  },
  {
    quote:
      "„Ide illeszthető egy mondat egy korábbi résztvevőtől, aki hitelesíti, hogy Bálint nem csak beszél a jelenlétről, hanem éli is.”",
    name: "Helyőrző név",
    context: "korábbi program résztvevője",
  },
];

export default function SocialProof() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="proof" />

      <div className="mx-auto max-w-5xl">
        <AnimatedSection className="mx-auto max-w-xl text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Kiktől hallhatsz még rólam
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Ez a hely a valódi történeteknek van fenntartva
          </h2>
          <p className="mt-4 text-ink-900/70">
            Ahogy gyűlnek a visszajelzések a levelekről és a korábbi
            közösségi munkámról, ide kerülnek majd — egyelőre helyőrzőkkel.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {quotes.map((q, i) => (
            <AnimatedSection
              key={q.name + i}
              delay={0.08 * i}
              className="flex flex-col justify-between rounded-2xl border border-dashed border-forest-800/20 bg-white/40 p-7 backdrop-blur-sm"
            >
              <p className="text-ink-900/70 italic">{q.quote}</p>
              <div className="mt-6">
                <p className="font-medium text-forest-900">{q.name}</p>
                <p className="text-sm text-ink-900/50">{q.context}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
