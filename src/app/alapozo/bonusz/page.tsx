import type { Metadata } from "next";
import Link from "next/link";
import OrganicBackground from "@/components/OrganicBackground";
import AnimatedSection from "@/components/AnimatedSection";
import HoverLiftCard from "@/components/HoverLiftCard";
import PrintButton from "@/components/PrintButton";
import { siteConfig } from "@/lib/site-config";
import { buildOpenGraph, buildTwitter } from "@/lib/metadata";

const pageTitle = "Bónuszanyagok és Teljes Tananyag — Meditációs Alapozó";
const pageDescription =
  "A Meditációs Alapozó 7 napos teljes tananyaga, vezetett meditációs leiratai, kezdői segédlete, 14 napos folytatási terve és gyakorlási naplója.";

export const metadata: Metadata = {
  title: `${pageTitle} | ${siteConfig.brandName}`,
  description: pageDescription,
  alternates: {
    canonical: "/alapozo/bonusz",
  },
  openGraph: buildOpenGraph({
    title: pageTitle,
    description: pageDescription,
    path: "/alapozo/bonusz",
  }),
  twitter: buildTwitter({
    title: pageTitle,
    description: pageDescription,
  }),
};

// 7 TELJES OKTATÓ LEVELEK ÉS VEZETETT MEDITÁCIÓS SZÖVEGEK
const LESSONS = [
  {
    day: 1,
    title: "Kezdj el, úgy, ahogy vagy",
    subtitle: "A meditáció alapjai és a teljesítménykényszer oldása",
    duration: "10 perc",
    anchor: "A természetes légzés és testérzetek",
    emailBody: `Kedves Gyakorló!

Örülök, hogy elindulsz velem ezen az úton. A mai nap célja a legfontosabb tévhit elengedése: a meditáció nem a gondolatok elnémításáról vagy az elme „kiürítéséről” szól.

Az elme természete, hogy gondolatokat termel — ahogy a szem lát, a fül hall, úgy az agy is gondolkodik. A gondolatok megjelenése nem a meditáció kudarca, hanem a normális, egészséges emberi működés része. A gyakorlás célja nem a gondolatok leállítása, hanem egy újfajta viszony kialakítása velük: megtanulni észrevenni őket anélkül, hogy azonnal belevesznénk az általuk kreált történetekbe.

Ma csak annyi a feladatod, hogy leülj kényelmesen, engedd el a teljesítménykényszert, és figyeld meg a tested és a természetes légzésedet. Nem kell „jól csinálnod”. Elég, ha ott vagy.`,
    meditationScript: `1. lépés: Helyezkedj el egy kényelmes, stabil ülőhelyzetben (széken vagy párnán). A gerinced legyen egyenes, de ne feszüljön. A vállaidat engedd le, a kezeid pihenjenek a combjaidon.

2. lépés: Hunyd be a szemed, vagy engedd a tekinteted finoman lefelé nézni a padlóra. Végy három lassú, mély lélegzetet: orron be, szájon ki. Minden kilégzéssel engedd ki a nap felgyülemlett feszültségét.

3. lépés: Térj vissza a teljesen természetes légzésedhez. Ne irányítsd, ne mélyítsd — a tested pontosan tudja, hogyan lélegezzen.

4. lépés: Vidd a figyelmed a testérzetekre: érezd a talpad vagy ülőcsontjaid érintkezését a talajjal, a ruhád súlyát a válladon, a tenyereid melegét.

5. lépés: Amikor gondolatok bukkannak fel (teendők, emlékek, tervek), egyszerűen vedd észre őket, és szelíden tereld vissza a figyelmed a levegő be- és kiáramlására.`,
  },
  {
    day: 2,
    title: "Találd meg a figyelmed kapaszkodóját",
    subtitle: "A figyelem visszatérése és a 3 lépéses keret",
    duration: "10-12 perc",
    anchor: "A légzés mint figyelmi horgony",
    emailBody: `Kedves Gyakorló!

A tegnapi nap után felmerülhetett benned a kérdés: „Hányszor fog még elkalandozni a figyelmem?” A válasz egyszerű: sokszor, és ez teljesen rendben van.

A meditáció nem az el nem kalandozás művészete, hanem a visszatérés gyakorlása. Minden egyes alkalommal, amikor észreveszed, hogy a figyelmed elúszott, és szelíden visszahozod, egyfajta „mentális fekvőtámaszt” végzel: fejleszted a tudatosságodat.

A 3 lépéses keret a mindennapi gyakorlásod vezérfonala:
1. Észreveszem: Tudatosítom, hogy már nem a légzésnél járok. Nem bosszankodom, egyszerűen észlelem.
2. Visszatérek: Szelíden, mint egy barát a szórakozott társát, visszahozom a figyelmemet a légzéshez.
3. Folytatom: Jelen maradok a következő pillanattal, tiszta lappal.`,
    meditationScript: `1. lépés: Vedd fel a kényelmes ülőhelyzetedet. Érezd a stabilitást és az egyenességet a gerincedben.

2. lépés: Kezdd meg a légzés figyelését. Keresd meg a testedben azt a pontot, ahol a legtisztábban érzed a lélegzet mozgását: ez lehet a hűvös levegő érintése az orrcimpáknál, a mellkas emelkedése, vagy a hasfal lassú hullámzása. Ez a te figyelmi horgonyod.

3. lépés: Rögzítsd itt a figyelmedet. Kövesd a teljes belégzést, a belégzés és kilégzés közötti apró szünetet, majd a teljes kilégzést.

4. lépés: Amikor a figyelem elszakad — akár már a második lélegzetnél —, alkalmazd a hármas lépést:
- Észreveszem: „Itt van egy gondolat.”
- Visszatérek: Visszahozom a fókuszt a horgonyhoz.
- Folytatom: Követem a következő lélegzetet.

5. lépés: Ezt ismételd újra és újra, minden önkritika vagy elvárás nélkül, a gyakorlat végéig.`,
  },
  {
    day: 3,
    title: "A tested mindig itt van",
    subtitle: "Testtudatosság, testpásztázás és alternatív figyelmi horgonyok",
    duration: "12 perc",
    anchor: "Testérzetek és testpásztázás",
    emailBody: `Kedves Gyakorló!

Nem mindenkinek kényelmes közvetlenül a légzésre figyelni — egyeseknél a légzés kontrollálása vagy szorongató érzése alakulhat ki. Jó hírem van: a figyelemnek nem kötelező a légzéshez tapadnia.

A testünknek van egy páratlan tulajdonsága: míg az elménk a múltban és a jövőben kalandozik, a testünk mindig kizárólag a jelen pillanatban létezik. Ha kapcsolatba lépsz a testérzeteiddel, automatikusan a jelenbe érkezel.

A mai leckében a testpásztázás (body scan) technikáját gyakoroljuk: átvizsgáljuk a testet tetőtől talpig, ítélkezés nélkül megfigyelve az érzeteket — a meleget, a hideget, a bizsergést vagy épp az érzetek hiányát. A cél nem az ellazulás kikényszerítése, hanem az egyszerű észlelés.`,
    meditationScript: `1. lépés: Ülj egyenesen vagy feküdj le hanyatt fekvésbe egy matracra, ha úgy jobban ellazul a hátad.

2. lépés: Hunyd be a szemed, és hozd a figyelmedet a lábujjaidra. Érzed-e a zoknid anyagát, a hideget vagy a meleget? Ne változtass semmin, csak észleld.

3. lépés: Lassan vándorolj fel a figyelmeddel: a talpak, a bokák, a vádlik és a térdek területére. Figyeld meg az izmok feszülését vagy elernyedését.

4. lépés: Haladj tovább a combokhoz, a medencéhez, majd a has és a derék tájékára. Ha feszültséget találsz, ne akard görcsösen feloldani — csak adj teret neki lélegzeteddel.

5. lépés: Pásztázd végig a mellkast, a hát felső részét, a vállakat és a karokat egészen az ujjak hegyéig. Végül vidd a figyelmed a nyakra, az állkapocsra, a homlokra és a fejtetőre.

6. lépés: Tölts el egy percet úgy, hogy az egész testedet egyetlen összefüggő energiamezőként, egységként érzékeled.`,
  },
  {
    day: 4,
    title: "A gondolataid nem ellenségek",
    subtitle: "Gondolatok észlelése, ítélkezésmentes szemlélődés",
    duration: "12-15 perc",
    anchor: "A gondolatok mint felhők az égen",
    emailBody: `Kedves Gyakorló!

Gyakori csapda a meditációban, hogy elvárjuk a „belső csendet”, és ha ez nem következik be, úgy érezzük, rosszul csináljuk. De vajon ellenség-e a gondolat?

Nem. A gondolatok egyszerű mentális események: jönnek, maradnak egy darabig, majd továbbállnak. A probléma ott kezdődik, amikor azonosulunk velük: ha felbukkan a gondolat, hogy „el fogok késni”, azonnal átéljük a félelmet, elkezdünk tervezni, és máris magával ragadott az örvény.

Ma a „megfigyelő én” pozícióját gyakoroljuk: elképzeljük, hogy az elménk egy hatalmas kék égbolt, a gondolatok pedig csupán felhők, amelyek átúsznak rajta. Nem kell elkergetned a felhőket ahhoz, hogy az égbolt tiszta maradjon mögöttük.`,
    meditationScript: `1. lépés: Helyezkedj el a stabil ülésben. Lélegezz természetesen, horgonyozd le magad a testérzetekben.

2. lépés: Most engedd meg, hogy a figyelmed kissé hátralépjen. Legyél úgy jelen, mint egy mozinéző a székében: figyeld az elme vásznát.

3. lépés: Amikor egy gondolat megjelenik, lásd meg a formáját: kép, belső mondat, dallam vagy emlék?

4. lépés: Címkézd meg finoman és halkan magadban: „gondolat”, „tervezés”, „emlékezés”, vagy „vélemény”. A címkézés segít abban, hogy ne ugorj rá a gondolatra, hanem kívülről szemléld.

5. lépés: Engedd, hogy a gondolat feloldódjon, mint a felhő a szélben, és várd meg a következő pillanatot a tágas, tiszta éberség állapotában.`,
  },
  {
    day: 5,
    title: "Tágítsd ki a figyelmedet",
    subtitle: "Fókuszált vs. nyitott figyelem, hangok és terek",
    duration: "12-15 perc",
    anchor: "A környezet hangjai és a nyitott tér",
    emailBody: `Kedves Gyakorló!

Eddig a figyelmet egyetlen pontra fókuszáltuk (a légzésre vagy a testre). Ez a koncentrált figyelem (shamatha jellegű megközelítés). Ma viszont megismerkedünk a nyitott éberséggel.

A nyitott figyelem során nem zárunk ki semmit: a külvilág hangjai, a belső testérzetek és az elme folyamatai mind egyszerre férnek el a tudatosság terében. A meditáció nem egy elszigetelt buborék, ahol csak teljes csendben lehet létezni — a való életben autókürtök, madárcsicsergés, szomszédok zajai vesznek körül minket.

Ha megtanulsz békét kötni a hangokkal anélkül, hogy zavaró tényezőként harcolnál ellenük, a meditáció elérhetővé válik a villamoson, az irodában vagy egy zsúfolt kávézóban is.`,
    meditationScript: `1. lépés: Ülj le stabilan, hunyd be a szemed, és néhány lélegzettel érkezz meg a testedbe.

2. lépés: Kezdd a fókuszált figyelemmel: tartsd a figyelmed a lélegzetnél 2-3 percig.

3. lépés: Most nyisd ki a figyelmed kapuit a hangok felé. Ne keresd a hangokat, engedd, hogy a hangok érkezzenek el a füledhez.
- Figyeld meg a közeli hangokat: a saját légzésed, a szoba neszeit.
- Figyeld meg a távoli hangokat: utcai forgalom, szél, távoli beszéd.

4. lépés: Figyeld meg a hangok közötti csendet is. A csend az az alapvászon, amelyre a hangok rárajzolódnak.

5. lépés: Észleld: nem kell véleményezned („jó hang”, „rossz zaj”), csak engedd, hogy a hangok legyenek, amik — rezgések a térben.`,
  },
  {
    day: 6,
    title: "Meditáció a hétköznapokban",
    subtitle: "Tudatos jelenlét a szőnyegen kívül: séta és mindennapi cselekvés",
    duration: "10-15 perc",
    anchor: "A lépések és a mozgás érzete",
    emailBody: `Kedves Gyakorló!

A formális meditáció (amikor leülsz a párnára csukott szemmel) egy edzőterem. Az igazi játék azonban odakint zajlik: a boltban sorban állva, a reggeli kávét készítve, vagy egy nehéz beszélgetés közben.

A mai napon átlépünk az ülő gyakorlás keretein: a tudatos séta (walking meditation) és a mindennapi jelenlét alapjait sajátítjuk el. Amikor sétálsz, vajon valóban ott vagy, ahol a lábad lépked, vagy már gondolatban a harmadik e-mailedet fogalmazod?

A fenntartható rutin kulcsa nem az, hogy órákat ülsz csendben, hanem az, hogy a napod során 5–10 másodperces „jelenlét-szigeteket” iktatsz be: amikor valóban megérzed a víz hőmérsékletét kézmosáskor, vagy valóban megízleled az első korty teádat.`,
    meditationScript: `1. lépés: Állj fel kényelmesen. Engedd, hogy a súlyod egyenletesen oszoljon el a két talpadon. Lazítsd el a térdeidet, a kezeidet kulcsold össze magad előtt vagy mögött.

2. lépés: Kezdj el nagyon lassan lépkedni egy egyenes vonalban (a szobában oda-vissza 5-10 lépés, vagy a szabadban).

3. lépés: Bontsd fel a lépést fázisokra a figyelmeddel:
- A sarok felemelkedik
- A láb előremozdul a levegőben
- A sarok érinti a talajt
- A talp és a lábujjak leérkeznek, és átveszik a testsúlyt

4. lépés: Ne nézz a lábadra, engedd a tekintetedet lágyan a földre nézni 2-3 méterrel magad elé.

5. lépés: Ha a gondolatok elragadnak, állj meg egy pillanatra, végy egy lélegzetet, érezd a talpad érintkezését a földdel, majd folytasd a lassú, jelenlévő lépéseket.`,
  },
  {
    day: 7,
    title: "A saját gyakorlásod kezdete",
    subtitle: "Integráció, önálló gyakorlat és a 14 napos folytatási terv",
    duration: "15 perc",
    anchor: "A belső csend és a megnyugvás tere",
    emailBody: `Kedves Gyakorló!

Gratulálok! Megcsináltad a hét napot. Lehet, hogy voltak napok, amikor könnyebben ment, és voltak, amikor tele volt feszültséggel az elméd — mindkét tapasztalat egyformán értékes és a fejlődésed része.

Ma összerakjuk az eddig tanultakat egy teljes, integrált meditációba: légzésfigyelés, testpásztázás, hangok észlelése és nyitott figyelem.

A hét nap lezárult, de a gyakorlásod most kezdődik el igazán. Az alábbiakban megosztom veled a 14 napos folytatási tervet, amellyel stabil, tartós szokássá mélyítheted az önmagadra szánt napi perceket. Köszönöm a bizalmadat és a kitartásodat!`,
    meditationScript: `1. lépés: Ülj le az immár ismerős stabil testhelyzetedbe. Érezd a hálát magad iránt, hogy rászántad ezt a hetet a figyelmed fejlesztésére.

2. lépés: Kezdd a testeddel (1-2 perc): érezd a súlyt, a tartást, engedd le a vállaidat.

3. lépés: Térj át a légzésedre (3-4 perc): kövesd a belégzést és kilégzést a választott horgonyodnál. Ha gondolat érkezik: Észreveszem – visszatérek – folytatom.

4. lépés: Nyisd ki a figyelmed a hangokra és a térre (3-4 perc): engedd meg a környezetnek, hogy pontosan olyan legyen, amilyen.

5. lépés: Zárásként pihenj meg a puszta éberségben (2-3 perc): nincsen semmi, amit meg kellene oldanod, sehova nem kell sietned. Csak lenni, itt és most.

6. lépés: Végy egy mély lélegzetet, mozgasd meg az ujjaidat, és lassan nyisd ki a szemed.`,
  },
];

// KEZDŐI TESTHELYZET- ÉS FIGYELMI KAPASZKODÓ ÚTMUTATÓ
const POSTURE_GUIDES = [
  {
    title: "Széken ülve (a legkényelmesebb kezdet)",
    description:
      "Ülj egy keményebb szék elülső felére, hogy a combjaid vízszintesek legyenek. A talpaid pihenjenek laposan a talajon, a térdeid csípőszélességben. A hátad ne támaszkodjon a szék támlájának: tartsd meg a gerinc természetes S-görbületét.",
  },
  {
    title: "Párnán / zafun ülve (keresztezett lábbal)",
    description:
      "Ülj egy stabil meditációs párna szélére úgy, hogy a csípőd magasabban legyen, mint a térdeid — ez tehermentesíti a derekat és a combhajlítókat. A kezeid pihenjenek a térdeiden vagy a combjaidon lefelé fordított tenyérrel.",
  },
  {
    title: "Falnak támasztott háttal",
    description:
      "Ha gyenge a hátizomzatod vagy ülés közben hamar megfájdul a lapockád, tegyél egy kispárnát a derekad mögé a falhoz támasztva. Ez megadja a szükséges alátámasztást a felesleges feszültség nélkül.",
  },
];

// 14 NAPOS FOLYTATÁSI TERV
const EXTENSION_PLAN = [
  {
    period: "1. hét (8–14. nap): A rutin stabilizálása",
    dailyTarget: "Napi 10–12 perc",
    focus:
      "Válassz ki egyetlen fix időpontot a napodban (pl. közvetlenül ébredés után vagy munka előtt). Használd a 2. és 3. nap technikáját (légzés és testérzetek). Ne akarj hosszabb időt ülni, a fókusz a napi rendszerességen van.",
  },
  {
    period: "2. hét (15–21. nap): Elmélyítés és hétköznapi jelenlét",
    dailyTarget: "Napi 12–15 perc ülő + 2 db 1 perces mikro-meditáció",
    focus:
      "Gyakorold a 4. és 5. nap technikáját (gondolatok és hangok nyitott szemlélése). Napközben állj meg kétszer 60 másodpercre (pl. mielőtt belépsz egy ajtón, vagy mielőtt elindítod az autót), és végy 3 tudatos lélegzetet.",
  },
];

// GYAKORLÁSI NAPLÓ KÉRDÉSSOR
const JOURNAL_PROMPTS = [
  "Milyen napszakban gyakoroltam ma, és milyen volt a kezdeti fizikai állapotom (fáradt, feszült, nyugodt)?",
  "Milyen figyelmi kapaszkodót (légzés, testérzet, hangok) használtam ma a legkönnyebben?",
  "Hányszor vettem észre, hogy elkalandoztam, és milyen hangulatban hoztam vissza a figyelmem (bosszankodva vagy szelíden)?",
  "Milyen gondolati minta ismétlődött a legtöbbször a csendben?",
  "Hogyan hatott a mai 10–15 perc a gyakorlás utáni első órára?",
];

// ALAPOZÓ GYIK
const ALAPOZO_FAQ = [
  {
    q: "Mit tegyek, ha elalszom meditáció közben?",
    a: "Gyakori jelenség, különösen fáradtan. Ha ülsz, nyisd ki kissé a szemed, és engedd be a fényt a padló felé nézve. Ha fekve gyakorolsz, ülj fel. Ha a test kimerült, a pihenésre van szüksége — ne hibáztasd magad.",
  },
  {
    q: "Fáj a hátam vagy elzsibbad a lábam, szabad megmozdulnom?",
    a: "Igen! A meditáció nem önsanyargatás. Először vedd észre a késztetést a mozgásra, lélegezz bele egy-két pillanatig, majd szándékosan, nagyon lassan, csendben változtass testhelyzetet.",
  },
  {
    q: "Miért érzem úgy néha, hogy több a gondolatom, mint előtte?",
    a: "Nem a gondolatod lett több, hanem az éberséged nőtt meg. Olyan ez, mint egy sötét szoba: ha felkapcsolod a lámpát, hirtelen meglátod a levegőben szálló porszemeket, amik addig is ott voltak.",
  },
  {
    q: "Zenével vagy csendben érdemes gyakorolni?",
    a: "Ez a megközelítés a belső csendre és a természetes jelenlétre épít. A vezetett meditációk beszédhangját követheted, de a zene nélküli csend teszi lehetővé a valós mentális folyamatok tiszta észlelését.",
  },
  {
    q: "Mi történik, ha kimarad egy nap?",
    a: "Semmi baj. Ne próbáld másnap duplán bepótolni, és ne érezz bűntudatot. A következő reggel egyszerűen folytasd azzal a leckével, ahol tartottál. A következetesség nem tökéletességet jelent, hanem visszatérést.",
  },
];

export default function AlapozoBonuszPage() {
  return (
    <main className="relative isolate overflow-hidden px-6 py-20 sm:py-28">
      <OrganicBackground variant="offer" />

      <div className="mx-auto max-w-4xl">
        {/* Navigáció vissza az alapozóhoz */}
        <div className="mb-8 flex items-center justify-between text-xs sm:text-sm">
          <Link
            href="/alapozo"
            className="font-medium text-forest-900 underline underline-offset-2 hover:text-terracotta-700 dark:text-sand-100 dark:hover:text-sand-50"
          >
            ← Vissza az Alapozó feliratkozási oldalára
          </Link>
          <span className="rounded-full bg-forest-900/10 px-3.5 py-1 text-xs font-semibold text-forest-900 dark:bg-sand-50/15 dark:text-sand-50">
            Teljes Kurzus Dokumentáció & Segédletek
          </span>
        </div>

        {/* Hero bevezető */}
        <AnimatedSection className="text-center">
          <p className="font-serif text-xs font-semibold uppercase tracking-[0.25em] text-saffron-800 dark:text-saffron-300 sm:text-sm">
            Meditációs Alapozó
          </p>
          <h1 className="mt-3 text-balance font-serif text-3xl font-medium tracking-tight text-forest-900 dark:text-sand-50 sm:text-5xl">
            Bónuszanyagok és a 7 nap teljes tananyaga
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-balance text-base text-ink-900/80 dark:text-sand-100/80 sm:text-lg">
            Itt egy helyen megtalálod mind a hét lecke teljes szövegét, a vezetett meditációk
            lépésről lépésre követhető forgatókönyvét, a testhelyzet-útmutatót és a folytatási tervet.
          </p>
        </AnimatedSection>

        {/* TARTALOMJEGYZÉK GYORS UGRÁSHOZ */}
        <AnimatedSection className="mt-10 rounded-2xl border border-forest-900/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/50">
          <p className="font-serif text-sm font-semibold uppercase tracking-wider text-forest-900 dark:text-sand-50">
            Gyorsnavigáció:
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs sm:text-sm">
            <a
              href="#leckek"
              className="rounded-full border border-forest-900/15 px-3.5 py-1.5 transition-colors hover:bg-forest-900/5 dark:border-sand-50/15 dark:hover:bg-sand-50/10"
            >
              📖 A 7 nap leckéi és leiratai
            </a>
            <a
              href="#testhelyzetek"
              className="rounded-full border border-forest-900/15 px-3.5 py-1.5 transition-colors hover:bg-forest-900/5 dark:border-sand-50/15 dark:hover:bg-sand-50/10"
            >
              🧘 Kezdői testhelyzet-útmutató
            </a>
            <a
              href="#folytatasi-terv"
              className="rounded-full border border-forest-900/15 px-3.5 py-1.5 transition-colors hover:bg-forest-900/5 dark:border-sand-50/15 dark:hover:bg-sand-50/10"
            >
              🗓️ 14 napos folytatási terv
            </a>
            <a
              href="#naplo"
              className="rounded-full border border-forest-900/15 px-3.5 py-1.5 transition-colors hover:bg-forest-900/5 dark:border-sand-50/15 dark:hover:bg-sand-50/10"
            >
              ✍️ Gyakorlási napló kérdéssor
            </a>
            <a
              href="#gyik"
              className="rounded-full border border-forest-900/15 px-3.5 py-1.5 transition-colors hover:bg-forest-900/5 dark:border-sand-50/15 dark:hover:bg-sand-50/10"
            >
              ❓ Gyakori kérdések
            </a>
            <PrintButton label="Nyomtatás / PDF mentés" className="ml-auto" />
          </div>
        </AnimatedSection>

        {/* 1. RÉSZLETES LECKÉK ÉS MEDITÁCIÓS SZÖVEGEK */}
        <section id="leckek" className="mt-16 sm:mt-24 scroll-mt-24">
          <AnimatedSection className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-800 dark:text-saffron-300">
              Oktató e-mailek és leiratok
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-forest-900 dark:text-sand-50 sm:text-3xl">
              A 7 nap teljes anyaga
            </h2>
          </AnimatedSection>

          <div className="space-y-12">
            {LESSONS.map((l) => (
              <AnimatedSection key={l.day} className="rounded-3xl border border-forest-900/10 bg-white/80 p-6 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/60 sm:p-9">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-900/10 pb-4 dark:border-sand-50/10">
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-saffron-500/20 px-3 py-1 font-serif text-sm font-semibold text-saffron-800 dark:text-saffron-300">
                      {l.day}. nap
                    </span>
                    <h3 className="font-serif text-xl font-medium text-forest-900 dark:text-sand-50 sm:text-2xl">
                      {l.title}
                    </h3>
                  </div>
                  <span className="text-xs text-ink-900/60 dark:text-sand-100/60">
                    Időtartam: {l.duration} · Horgony: {l.anchor}
                  </span>
                </div>

                <p className="mt-3 text-sm font-medium italic text-forest-900/90 dark:text-sand-100">
                  {l.subtitle}
                </p>

                {/* Oktató levél szövege */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-forest-900 dark:text-sand-50">
                    ✉️ A reggeli oktató e-mail tartalma:
                  </p>
                  <div className="mt-3 whitespace-pre-line rounded-2xl bg-sand-50/60 p-5 text-sm leading-relaxed text-ink-900/80 dark:bg-forest-900/40 dark:text-sand-100/80 border border-forest-900/5 dark:border-sand-50/5">
                    {l.emailBody}
                  </div>
                </div>

                {/* Vezetett meditáció lépései */}
                <div className="mt-6">
                  <p className="text-xs font-semibold uppercase tracking-wider text-forest-900 dark:text-sand-50">
                    🎧 Vezetett meditációs forgatókönyv (lépésről lépésre):
                  </p>
                  <div className="mt-3 whitespace-pre-line rounded-2xl border border-terracotta-500/20 bg-terracotta-500/5 p-5 text-sm leading-relaxed text-ink-900/85 dark:text-sand-100/85">
                    {l.meditationScript}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* 2. KEZDŐI TESTHELYZET-ÚTMUTATÓ */}
        <section id="testhelyzetek" className="mt-20 sm:mt-28 scroll-mt-24">
          <AnimatedSection className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-800 dark:text-saffron-300">
              Gyakorlati útmutató
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-forest-900 dark:text-sand-50 sm:text-3xl">
              Kezdői testhelyzetek a meditációhoz
            </h2>
            <p className="mt-2 text-sm text-ink-900/75 dark:text-sand-100/75">
              A meditációhoz nem szükséges lótuszülésben ülni. A cél a test kényelmes, stabil
              és éber tartása.
            </p>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-3">
            {POSTURE_GUIDES.map((g) => (
              <AnimatedSection key={g.title}>
                <HoverLiftCard className="h-full p-6 text-left">
                  <h3 className="font-serif text-lg font-medium text-forest-900 dark:text-sand-50">
                    {g.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75 sm:text-sm">
                    {g.description}
                  </p>
                </HoverLiftCard>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* 3. 14 NAPOS FOLYTATÁSI TERV */}
        <section id="folytatasi-terv" className="mt-20 sm:mt-28 scroll-mt-24">
          <AnimatedSection className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-800 dark:text-saffron-300">
              Hosszú távú építkezés
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-forest-900 dark:text-sand-50 sm:text-3xl">
              14 napos folytatási terv
            </h2>
            <p className="mt-2 text-sm text-ink-900/75 dark:text-sand-100/75">
              Hogyan folytasd az alapozó 7 napja után, hogy a meditáció valódi életszokássá váljon.
            </p>
          </AnimatedSection>

          <div className="space-y-6">
            {EXTENSION_PLAN.map((p) => (
              <AnimatedSection key={p.period} className="rounded-2xl border border-forest-900/10 bg-white/75 p-6 backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/50">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-forest-900/10 pb-3 dark:border-sand-50/10">
                  <h3 className="font-serif text-lg font-medium text-forest-900 dark:text-sand-50">
                    {p.period}
                  </h3>
                  <span className="rounded-full bg-saffron-500/20 px-3 py-1 text-xs font-semibold text-saffron-800 dark:text-saffron-300">
                    {p.dailyTarget}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink-900/80 dark:text-sand-100/80">
                  {p.focus}
                </p>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* 4. GYAKORLÁSI NAPLÓ */}
        <section id="naplo" className="mt-20 sm:mt-28 scroll-mt-24">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <AnimatedSection>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-800 dark:text-saffron-300">
                Önreflexió
              </p>
              <h2 className="mt-1 font-serif text-2xl font-medium text-forest-900 dark:text-sand-50 sm:text-3xl">
                Gyakorlási napló kérdéssor
              </h2>
              <p className="mt-2 text-sm text-ink-900/75 dark:text-sand-100/75">
                Tegyél fel magadnak 2 percben néhány egyszerű kérdést minden ülés után egy füzetben:
              </p>
            </AnimatedSection>
            <PrintButton label="Naplókérdések nyomtatása" />
          </div>

          <div className="space-y-3">
            {JOURNAL_PROMPTS.map((prompt, i) => (
              <AnimatedSection key={i}>
                <div className="flex items-start gap-4 rounded-xl border border-forest-900/10 bg-white/60 p-4 dark:border-sand-50/10 dark:bg-forest-800/40">
                  <span className="font-serif font-bold text-forest-900 dark:text-saffron-300">
                    {i + 1}.
                  </span>
                  <p className="text-sm text-ink-900/80 dark:text-sand-100/80">{prompt}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* 5. GYAKORI KÉRDÉSEK */}
        <section id="gyik" className="mt-20 sm:mt-28 scroll-mt-24">
          <AnimatedSection className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-800 dark:text-saffron-300">
              Gyakorlási kérdések
            </p>
            <h2 className="mt-1 font-serif text-2xl font-medium text-forest-900 dark:text-sand-50 sm:text-3xl">
              Meditációs Gyakori Kérdések
            </h2>
          </AnimatedSection>

          <div className="space-y-4">
            {ALAPOZO_FAQ.map((item, idx) => (
              <AnimatedSection key={idx}>
                <div className="rounded-2xl border border-forest-900/10 bg-white/70 p-5 shadow-sm backdrop-blur-sm dark:border-sand-50/10 dark:bg-forest-800/50">
                  <h3 className="font-serif text-base font-medium text-forest-900 dark:text-sand-50 sm:text-lg">
                    {item.q}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-900/75 dark:text-sand-100/75 sm:text-sm">
                    {item.a}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Záró navigáció */}
        <div className="mt-20 flex flex-wrap justify-between gap-4 border-t border-forest-900/10 pt-8 dark:border-sand-50/10">
          <Link
            href="/alapozo"
            className="text-sm font-medium text-forest-900 underline underline-offset-2 hover:text-terracotta-700 dark:text-sand-100 dark:hover:text-sand-50"
          >
            ← Vissza az Alapozó feliratkozási oldalára
          </Link>
          <Link
            href="/"
            className="text-sm text-ink-900/70 underline underline-offset-2 hover:text-ink-900 dark:text-sand-100/70 dark:hover:text-sand-50"
          >
            Főoldal (Kardos Bálint)
          </Link>
        </div>
      </div>
    </main>
  );
}
