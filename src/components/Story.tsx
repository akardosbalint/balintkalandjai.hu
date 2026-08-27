import Image from "next/image";
import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";
import Term from "./Term";

/**
 * STORY — bemutatkozó narratíva (150–250 szó, ívelt mini-sztori)
 * -----------------------------------------------------------------
 * Íve szándékosan ez: MINTA (sok minden, semmi nem tapadt meg) →
 * KIVÉTEL (ECO, 3.5 év) → FORDULÓPONT (nehéz nyár, tanácsadás) →
 * DÖNTÉS (jóga, mert az ECO rokona + konkrét előzmények) → KERET
 * (nincsenek válaszaim, nyilvánosan keresem, gyere velem).
 *
 * FIGYELEM — érzékenységi korlát: a szakítás utáni mélypont
 * konkrétabb részletei (pl. hogy milyen súlyos volt) NEM kerülhetnek
 * ide. Csak "nagyon mély pontra kerültem" jellegű, nyers de nem
 * klinikai megfogalmazás engedélyezett. A mélyebb történetet Bálint
 * majd saját tempójában, a heti levélben osztja meg, bizalmi
 * kapcsolat után — ezt a landing page nem előlegezheti meg.
 */
export default function Story() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32">
      <OrganicBackground variant="story" />

      <div className="mx-auto max-w-5xl">
        <AnimatedSection>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Mielőtt feliratkozol
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Nem vagyok guru.
          </h2>
        </AnimatedSection>

        <div className="mt-10 grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-16">
          <AnimatedSection
            delay={0.1}
            className="mx-auto w-full max-w-[260px] lg:sticky lg:top-28 lg:max-w-none"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-3xl shadow-xl ring-1 ring-forest-900/10">
              <Image
                src="/images/kardos-balint-profil.jpg"
                alt="Kardos Bálint portréja"
                fill
                sizes="(min-width: 1024px) 320px, 260px"
                className="object-cover"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection
            delay={0.2}
            className="space-y-5 text-lg leading-relaxed text-ink-900/80"
          >
            {/* MINTA: sok minden, semmi nem tapadt meg */}
            <p>
              Dolgoztam kereskedelemben, csináltam hideghívásokat, voltam már
              értékesítéstámogatási munkatárs egy multinál, KKV marketing &
              értékesítési vezető, közösségszervező, jótékonysági vacsorák
              házigazdája, egy gyerekalapítvány kuratóriumi elnöke is.
              Végigjártam a konyhai ranglétrát mosogatótól konyhafőnökig,
              voltam privát séf, sofőr, raktáros, podcaster, egyszer még
              szinkronszínésznek is jelentkeztem. Építettem sárból házat
              Marokkóban, és vigyáztam macskákra „hivatásszerűen” több
              országban is. Diákként a somogyi kukoricaföldeken töltöttem a
              nyaraimat, és gimi mellett dolgoztam a környékbéli gyárak
              nagyrészében is. Ha létezik tankönyvi példa a{" "}
              <Term
                definition={
                  <>
                    A „csillogó tárgy szindróma”: amikor mindig az köt le a
                    legjobban, ami épp új és izgalmas — a korábbi projekt meg
                    csak úgy félbemarad.
                  </>
                }
              >
                „shiny object syndrome”
              </Term>
              -ra, az én vagyok: mindig jött valami izgalmasabb, és
              otthagytam, amit addig csináltam.
            </p>

            {/* KIVÉTEL: ECO, 3.5 év */}
            <p>
              Kivéve egy dolgot. 3.5 éve, minden áldott nap, kihagyás nélkül
              gyakorlom az{" "}
              <a
                href="https://ecokozosseg.hu"
                target="_blank"
                rel="noreferrer"
                className="underline decoration-terracotta-500 underline-offset-2 hover:text-ink-900"
              >
                ECO
              </a>
              -t (Energy of Consciousness) — egy dogma- és vallásmentes
              önismereti technikát. Ez az egyetlen dolog az életemben, ami
              mellett tényleg kitartottam.
            </p>

            {/* FORDULÓPONT: nehéz nyár, sürgősségi konzultáció egy ECO oktatóval */}
            <p>
              Idén nyáron egy szakítás után nagyon mély pontra kerültem —
              annyira, hogy sürgősségi konzultációt kértem az egyik ECO
              oktatómtól. Ott vált világossá: hogy semmi nem érdekel igazán,
              ami nem az emberi tudat fejlődéséről szól — ezért tudtam
              elköteleződni az ECO mellett, és emiatt nem tudok igazán
              kitartóan csinálni semmit, ami nem erről szól.
            </p>

            {/* DÖNTÉS: miért pont a jóga */}
            <p>
              Így jött a jóga. Az elvei a kertszomszédjai az ECO-nak, amit
              már bizonyítottan napi szinten képes vagyok gyakorolni. Szóval
              eldöntöttem: elmegyek Indiába, hogy közvetlenül a forrásnál
              tanuljak és ezen keresztül keressem meg, hogy ki is vagyok.
            </p>

            {/* KERET: nincsenek válaszaim, nyilvánosan keresem, gyere velem */}
            <p>
              A terv: október 1. és november 28. között egy 500 órás
              akkreditált jógaoktatói képzés Rishikeshben, a „jóga
              fővárosában” — összesen 66 napot töltök Indiában, mert
              korábban érkezem és később utazom haza. Nincsenek bekészített
              válaszaim — napi egy TikTok-videóval és heti egy hosszú,
              őszinte levéllel dokumentálom majd az utam. Nyilvánosan
              csinálom, hogy legyen, aki számon kérje rajtam — így talán
              könnyebb lesz folytatni a nehéz napokon is. Gyere, nézd végig
              velem.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
