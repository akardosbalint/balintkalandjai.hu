import AnimatedSection from "./AnimatedSection";
import OrganicBackground from "./OrganicBackground";

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

      <div className="mx-auto max-w-2xl">
        <AnimatedSection>
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-terracotta-600">
            Mielőtt feliratkozol
          </p>
          <h2 className="text-balance font-serif text-3xl leading-tight text-forest-900 sm:text-4xl">
            Nem guru vagyok. Csak valaki, aki 31 évesen még mindig nem tudja,
            mi legyen, ha felnő.
          </h2>
        </AnimatedSection>

        <AnimatedSection
          delay={0.1}
          className="mt-8 space-y-5 text-lg leading-relaxed text-ink-900/80"
        >
          {/* MINTA: sok minden, semmi nem tapadt meg */}
          <p>
            Voltam már multis üzletkötő, KKV-marketinges, adománygyűjtő,
            jótékonysági vacsorák szervezője, egy gyerekalapítvány
            kuratóriumi elnöke. Végigjártam a konyhai ranglétrát
            mosogatótól konyhafőnökig, voltam magánszakács, sofőr,
            raktáros, podcaster, egyszer még szinkronszínésznek is
            jelentkeztem. Gyerekként somogyi kukoricaföldön és megyei
            gyárban dolgoztam. Ha létezik tankönyvi példa a „shiny object
            syndrome”-ra, az én vagyok: mindig jött valami izgalmasabb, és
            otthagytam, amit addig csináltam.
          </p>

          {/* KIVÉTEL: ECO, 3.5 év */}
          <p>
            Egy dolog kivétel. 3.5 éve, minden áldott nap, kihagyás nélkül
            gyakorlom az ECO-t (Energy of Consciousness) — egy dogma- és
            vallásmentes önismereti technikát. Ez az egyetlen dolog az
            életemben, ami mellett tényleg kitartottam.
          </p>

          {/* FORDULÓPONT: nehéz nyár, sürgősségi beszélgetés a tanítóval */}
          <p>
            Idén nyáron egy szakítás után nagyon mély pontra kerültem —
            annyira, hogy sürgősségi beszélgetést kértem a tanítómtól. Ott
            vált világossá: nekem egy dolgot kell találnom, amibe legalább
            egy évig bele tudok állni. És hogy semmi nem érdekel igazán,
            ami nem az emberi tudat fejlődéséről szól.
          </p>

          {/* DÖNTÉS: miért pont a jóga */}
          <p>
            A jóga a legközelebbi rokona annak, amit már bizonyítottan
            napi szinten képes vagyok gyakorolni — plusz ott volt egy 10
            évvel ezelőtti első jógaóra emléke, és egy barátom indiai
            tapasztalata is. Szóval eldöntöttem: elmegyek Indiába, és a
            jóga tanításán keresztül keresem meg újra, ki vagyok.
          </p>

          {/* KERET: nincsenek válaszaim, nyilvánosan keresem, gyere velem */}
          <p>
            A terv: 58 nap, 500 óra, jógaoktatói képzés Rishikeshben.
            Nincsenek válaszaim — csak napi egy TikTok-videóval és heti egy
            hosszú, őszinte levéllel dokumentálom majd, amit aznap találok
            ki, vagy amiben épp elakadok. Nyilvánosan csinálom, hogy legyen,
            aki számon kérje rajtam, ha megint kicsúszna a kezemből. Gyere,
            nézd végig velem.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
