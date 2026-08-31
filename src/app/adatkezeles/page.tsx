import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Adatkezelési tájékoztató — ${siteConfig.brandName}`,
  robots: { index: false, follow: false },
};

/**
 * Ez a tájékoztató a weboldal tényleges, jelenlegi működését írja le
 * (MailerLite hírlevél-feliratkozás, Vercel tárhely, böngésző helyi
 * tárolás a feliratkozó popuphoz). Ha a jövőben új adatkezelési
 * tevékenység indul — pl. fizetős program, számlázás, új
 * mérőkód/analitika —, a tájékoztatót ELŐBB kell frissíteni, csak
 * utána szabad az új funkciót élesíteni (GDPR 13. cikk: előzetes
 * tájékoztatási kötelezettség).
 */
export default function AdatkezelesPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link
        href="/"
        className="text-sm text-terracotta-600 underline underline-offset-2"
      >
        ← Vissza a főoldalra
      </Link>

      <h1 className="mt-6 font-serif text-3xl text-forest-900 sm:text-4xl">
        Adatkezelési tájékoztató
      </h1>
      <p className="mt-2 text-sm text-ink-900/50">
        Hatályos: 2026. augusztus 31.
      </p>

      <div className="mt-10 space-y-8 text-ink-900/80">
        <section>
          <h2 className="font-serif text-xl text-forest-900">
            1. Bevezetés
          </h2>
          <p className="mt-2">
            Ez a tájékoztató azt írja le, hogy a{" "}
            {siteConfig.url.replace("https://", "")} weboldal (a
            &bdquo;Weboldal&rdquo;) üzemeltetője milyen személyes adatokat
            kezel, milyen célból, milyen jogalapon, és milyen jogok illetnek
            meg emiatt. A tájékoztató az Európai Parlament és a Tanács (EU)
            2016/679 rendelete (általános adatvédelmi rendelet, a
            továbbiakban: <strong>GDPR</strong>), valamint az információs
            önrendelkezési jogról és az információszabadságról szóló 2011.
            évi CXII. törvény (<strong>Infotv.</strong>) alapján készült.
          </p>
          <p className="mt-2">
            A tájékoztató kizárólag a Weboldalon keresztül történő
            hírlevél-feliratkozásra és a Weboldal látogatására vonatkozik.
            Nem terjed ki a Weboldalról elérhető külső oldalak (pl. TikTok)
            saját adatkezelésére — ezekre az adott szolgáltató saját
            adatvédelmi tájékoztatója irányadó.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            2. Az adatkezelő
          </h2>
          <p className="mt-2">
            Név: {siteConfig.ownerFullName}
            <br />
            Levelezési cím: {siteConfig.ownerAddress}
            <br />
            Email:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>
            <br />
            Jogállás: a Weboldalt {siteConfig.ownerName} magánszemélyként
            üzemelteti, nem regisztrált vállalkozás keretében, ezért nincs
            hozzá tartozó adószám vagy cégjegyzékszám. Ettől függetlenül a
            GDPR 4. cikk 7. pontja szerinti adatkezelőnek minősül, mivel
            önállóan határozza meg a személyes adatok kezelésének célját és
            eszközeit.
          </p>
          <p className="mt-2">
            A Weboldal mérete és jellege miatt nem kötelező adatvédelmi
            tisztviselő (DPO) kijelölése — az adatkezeléssel kapcsolatos
            megkereséseket közvetlenül {siteConfig.ownerName} fogadja a
            fenti email címen.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            3. Néhány fogalom
          </h2>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Személyes adat:</strong> bármely információ, amely egy
              azonosított vagy azonosítható természetes személyre (érintett)
              vonatkozik — jelen esetben tipikusan az email cím és a
              keresztnév.
            </li>
            <li>
              <strong>Érintett:</strong> te, illetve bárki, akinek a
              személyes adatát kezeljük — jelen esetben a hírlevélre
              feliratkozó, illetve a Weboldalt látogató személy.
            </li>
            <li>
              <strong>Adatkezelő:</strong> aki meghatározza az adatkezelés
              célját és eszközeit — jelen esetben {siteConfig.ownerName}.
            </li>
            <li>
              <strong>Adatfeldolgozó:</strong> aki az adatkezelő
              utasítására, szerződés alapján kezeli az adatokat — jelen
              esetben a MailerLite és a Vercel (részletek a 7. pontban).
            </li>
            <li>
              <strong>Hozzájárulás:</strong> az érintett önkéntes, konkrét,
              tájékoztatáson alapuló és egyértelmű akaratnyilatkozata, amely
              kifejezi, hogy beleegyezését adja a rá vonatkozó személyes
              adatok kezeléséhez.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            4. Milyen adatokat kezelünk, és honnan származnak
          </h2>
          <p className="mt-2">
            A hírlevélre való feliratkozáskor az alábbi adatokat kéri el és
            kezeli az adatkezelő, közvetlenül tőled:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>email cím (kötelező)</li>
            <li>keresztnév (opcionális, ha megadod)</li>
          </ul>
          <p className="mt-2">
            Ezeken felül a MailerLite (a hírlevél-küldő szolgáltatás, lásd
            7. pont) automatikusan rögzít néhány technikai adatot is:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>a feliratkozás időpontja és IP-címe, a visszaélések elleni védelem és a jogszerű hozzájárulás utólagos igazolása céljából;</li>
            <li>
              a kiküldött levelek <strong>megnyitási és kattintási</strong>{" "}
              statisztikái (pl. hogy megnyitottad-e a levelet, és
              kattintottál-e egy benne lévő linkre) — ezt a MailerLite
              alapértelmezetten gyűjti minden hírlevél-szolgáltatónál
              szokásos módon, nyomkövető képpont és linkátirányítás
              segítségével. Ez az adat kizárólag arra szolgál, hogy lássuk,
              mennyire olvassák a leveleket — nem építünk rá személyre
              szabott tartalmat vagy hirdetést, és harmadik félnek nem
              adjuk tovább. Ha ezt nem szeretnéd, a legtöbb levelezőkliens
              beállításaiban letiltható a képek automatikus betöltése, ami
              a megnyitás-követést is megakadályozza.
            </li>
          </ul>
          <p className="mt-2">
            A Weboldal megtekintésekor a tárhelyszolgáltató (Vercel, lásd
            7. pont) szerver szinten, automatikusan technikai naplóadatokat
            (pl. IP-cím, böngésző- és eszközinformációk, a kérés időpontja)
            rögzíthet a szolgáltatás biztonságos üzemeltetéséhez. Ez
            általános szerver-üzemeltetési gyakorlat, nem célzott
            megfigyelés.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            5. Az adatkezelés célja és jogalapja
          </h2>
          <p className="mt-2">
            Az adatkezelés célja a heti hírlevél és az ahhoz kapcsolódó
            tartalmak kiküldése, valamint a feliratkozás jogszerűségének
            igazolása.
          </p>
          <p className="mt-2">
            Az adatkezelés jogalapja a GDPR 6. cikk (1) bekezdés a) pontja
            szerinti önkéntes hozzájárulásod, amelyet a feliratkozáskor a
            checkbox bejelölésével, majd a megerősítő emailben (double
            opt-in) adsz meg. A hozzájárulásodat bármikor, indoklás nélkül,
            díjmentesen visszavonhatod — ez nem érinti a visszavonás előtt,
            a hozzájárulás alapján végzett adatkezelés jogszerűségét.
          </p>
          <p className="mt-2">
            A Weboldal tárhelyének biztonságos üzemeltetéséhez kapcsolódó,
            szerver szintű technikai naplózás jogalapja az adatkezelő (és a
            tárhelyszolgáltató) jogos érdeke (GDPR 6. cikk (1) bekezdés f)
            pontja) a szolgáltatás megfelelő és biztonságos működtetéséhez.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            6. Automatizált döntéshozatal és profilalkotás
          </h2>
          <p className="mt-2">
            Az adatkezelő nem alkalmaz automatizált döntéshozatalt és nem
            végez profilalkotást a GDPR 22. cikke értelmében — vagyis nem
            hozunk rád nézve olyan, kizárólag automatizált feldolgozáson
            alapuló döntést, amelynek rád nézve jogi vagy ahhoz hasonló
            jelentőségű hatása lenne. A 4. pontban említett
            megnyitási/kattintási statisztikák kizárólag összesített,
            tájékoztató jellegű mérőszámok, nem eredményeznek automatikus
            döntést vagy megkülönböztetést.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            7. Kik férnek hozzá az adataidhoz — adatfeldolgozók
          </h2>
          <p className="mt-2">
            <strong>MailerLite</strong> — a hírlevelek kiküldéséhez és a
            feliratkozók nyilvántartásához a MailerLite Limited (székhely:
            88 Harcourt Street, Dublin 2, D02 DK18, Írország) szolgáltatását
            használjuk, amely az Európai Gazdasági Térségen (EGT) belüli
            adatfeldolgozóként a GDPR előírásai szerint kezeli az adatokat,
            velük kötött adatfeldolgozási szerződés (Data Processing
            Agreement) alapján. A MailerLite a saját szolgáltatásának
            működtetéséhez további alfeldolgozókat (pl. tárhely- és
            infrastruktúra-szolgáltatókat) vehet igénybe; ezek mindenkori
            listája a MailerLite honlapján érhető el.
          </p>
          <p className="mt-2">
            <strong>Vercel</strong> — a Weboldal tárhelyét a Vercel Inc.
            (székhely: Amerikai Egyesült Államok) biztosítja, amely a
            szerver-naplók szintjén technikai adatokat (pl. IP-cím,
            böngésző-információk) kezelhet a szolgáltatás
            működtetéséhez és biztonságához, a velük kötött
            adatfeldolgozási szerződés (Data Processing Addendum) alapján.
          </p>
          <p className="mt-2">
            Az adataidat harmadik félnek — a fent felsorolt
            adatfeldolgozókon kívül — nem adjuk el, nem adjuk bérbe, és nem
            osztjuk meg reklám- vagy egyéb üzleti célra.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            8. Adattovábbítás az Európai Gazdasági Térségen kívülre
          </h2>
          <p className="mt-2">
            A MailerLite Limited az EGT-n belül (Írországban) letelepedett
            adatfeldolgozó, így a hozzá történő adattovábbítás nem minősül
            harmadik országba történő adattovábbításnak.
          </p>
          <p className="mt-2">
            A Vercel Inc. az Amerikai Egyesült Államokban székhellyel
            rendelkező vállalkozás, amely az EU–U.S. Data Privacy Framework
            (DPF) tanúsított résztvevője. Az Európai Bizottság 2023.
            júliusi megfelelőségi határozata (GDPR 45. cikk) alapján a DPF
            keretében tanúsított amerikai szolgáltatók felé történő
            adattovábbítás — külön további garanciák (pl. Standard
            Szerződéses Feltételek) nélkül is — jogszerűnek minősül, mivel
            az Európai Bizottság megítélése szerint az Egyesült Államok e
            keretrendszer alá tartozó szereplői megfelelő szintű
            adatvédelmet nyújtanak.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            9. Meddig tároljuk az adataidat
          </h2>
          <p className="mt-2">
            Amíg feliratkozva vagy, az adataidat a hírlevél-szolgáltatás
            nyújtásához szükséges ideig tároljuk.
          </p>
          <p className="mt-2">
            Ha leiratkozol (a levelek alján található linkre kattintva),
            azonnal leiratkozottként jelölünk meg a MailerLite
            rendszerében, és attól kezdve nem küldünk több levelet. Ez
            fontos: a leiratkozás önmagában{" "}
            <strong>nem törli automatikusan és azonnal</strong> az
            adataidat a rendszerből — azokat korlátozott ideig, kizárólag a
            korábbi jogszerű hozzájárulás és a leiratkozás tényének utólagos
            igazolására őrizzük meg, jogos érdek alapján (GDPR 6. cikk (1)
            bekezdés f) pontja).
          </p>
          <p className="mt-2">
            Ha ezen felül a teljes, végleges törlést (adatvédelmi szakszóval
            az &bdquo;elfelejtést&rdquo;) is kéred, ezt bármikor kérheted a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címen — ez esetben az adataidat legkésőbb 30 napon belül,
            visszaállíthatatlanul töröljük a MailerLite rendszeréből is.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            10. Hogyan védjük az adataidat
          </h2>
          <p className="mt-2">
            Az adatokhoz kizárólag {siteConfig.ownerName}, valamint a 7.
            pontban felsorolt adatfeldolgozók férnek hozzá, a
            szolgáltatásaik biztonsági intézkedései (pl. titkosított
            adatátvitel, hozzáférés-korlátozás) mellett. A
            hírlevél-feliratkozáshoz szükséges MailerLite API-kulcs
            kizárólag a szerver oldalon, a böngészőbe soha el nem jutva
            kerül felhasználásra.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            11. Süti (cookie) és helyi tárolás a böngésződben
          </h2>
          <p className="mt-2">
            A Weboldal nem használ nyomkövető sütiket (cookie-kat), és nem
            épít be harmadik féltől származó analitikai vagy hirdetési
            mérőkódot (pl. Google Analytics, Facebook Pixel). A Weboldal a
            böngésződ beépített, kizárólag a saját eszközödön elérhető{" "}
            <em>helyi tárolóját</em> (localStorage / sessionStorage)
            használja két, tisztán funkcionális célra:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>
              hogy egy adott munkameneten belül csak egyszer jelenjen meg a
              feliratkozásra hívó felugró ablak;
            </li>
            <li>
              hogy ha már feliratkoztál, a felugró ablak később ne
              jelenjen meg újra.
            </li>
          </ul>
          <p className="mt-2">
            Ezek az adatok egyszerű, azonosításra alkalmatlan jelölők
            (pl. &bdquo;1&rdquo; érték), amelyek kizárólag a saját
            böngésződben tárolódnak, soha nem kerülnek a szerverre
            elküldésre, és nem alkalmasak a személyed beazonosítására — így
            nem minősülnek a GDPR szerinti személyes adatnak. Mivel ezek
            technikailag feltétlenül szükségesek egy funkció
            (megjelenítés-vezérlés) működéséhez, nem igényelnek külön
            cookie-hozzájárulási felugró ablakot, a böngésződ beállításai
            között bármikor törölhetők.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            12. A te jogaid
          </h2>
          <p className="mt-2">
            A GDPR alapján az alábbi jogok illetnek meg a rád vonatkozó
            személyes adatok tekintetében. Ezeket a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címen gyakorolhatod; a kérésedre indokolatlan késedelem nélkül,
            de legkésőbb 30 napon belül válaszolunk. Ez a határidő
            különösen összetett vagy nagy számú kérés esetén, indokolt
            esetben további két hónappal meghosszabbítható — erről és az
            indokáról a beérkezéstől számított 30 napon belül mindenképp
            tájékoztatunk.
          </p>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>
              <strong>Hozzáférés (15. cikk):</strong> kérheted annak
              megerősítését, hogy kezelünk-e rád vonatkozó adatot, és ha
              igen, másolatot kérhetsz róla.
            </li>
            <li>
              <strong>Helyesbítés (16. cikk):</strong> kérheted a pontatlan
              adataid javítását, illetve a hiányos adatok kiegészítését.
            </li>
            <li>
              <strong>Törlés / &bdquo;elfelejtéshez való jog&rdquo; (17.
              cikk):</strong> kérheted az adataid törlését — például ha
              visszavonod a hozzájárulásod, vagy az adatkezelés célja
              megszűnt.
            </li>
            <li>
              <strong>Az adatkezelés korlátozása (18. cikk):</strong>{" "}
              bizonyos esetekben (pl. amíg egy vitatott adat pontosságát
              ellenőrizzük) kérheted az adataid kezelésének korlátozását.
            </li>
            <li>
              <strong>Adathordozhatóság (20. cikk):</strong> kérheted, hogy
              a hozzájárulásod alapján, automatizált módon kezelt adataidat
              tagolt, széles körben használt, géppel olvasható formátumban
              megkapd, vagy — ha ez technikailag megoldható — közvetlenül
              egy másik adatkezelőnek továbbítsuk.
            </li>
            <li>
              <strong>Tiltakozás (21. cikk):</strong> mivel a hírlevél
              közvetlen üzletszerzésnek (direkt marketingnek) minősül, ez
              ellen{" "}
              <strong>bármikor, indoklás nélkül, feltétel nélkül</strong>{" "}
              tiltakozhatsz — ez a leiratkozással gyakorlatilag azonos
              hatású.
            </li>
            <li>
              <strong>A hozzájárulás visszavonása (7. cikk (3)
              bekezdés):</strong> bármikor, díjmentesen visszavonhatod a
              feliratkozáskor adott hozzájárulásodat, a visszavonás előtti
              adatkezelés jogszerűségének érintése nélkül.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            13. Jogorvoslati lehetőségek
          </h2>
          <p className="mt-2">
            Ha úgy érzed, hogy megsértettük az adataid kezelésével
            kapcsolatos jogaidat, mielőtt hatósághoz vagy bírósághoz
            fordulnál, keress meg minket a{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              {siteConfig.email}
            </a>{" "}
            címen — igyekszünk gyorsan orvosolni a problémát.
          </p>
          <p className="mt-2">
            Emellett panasszal fordulhatsz a Nemzeti Adatvédelmi és
            Információszabadság Hatósághoz (NAIH):
          </p>
          <p className="mt-2">
            Székhely: 1055 Budapest, Falk Miksa utca 9-11.
            <br />
            Postacím: 1363 Budapest, Pf. 9.
            <br />
            Telefon: +36 (1) 391-1400
            <br />
            Email: ugyfelszolgalat@naih.hu
            <br />
            Honlap:{" "}
            <a
              href="https://naih.hu"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-terracotta-500 underline-offset-2"
            >
              naih.hu
            </a>
          </p>
          <p className="mt-2">
            A NAIH mellett az Európai Unió bármely tagállamának illetékes
            felügyeleti hatóságához is fordulhatsz, illetve — a NAIH-hoz
            benyújtott panasztól függetlenül is — bírósághoz fordulhatsz.
            Magyarországon az eljárás a törvényszék hatáskörébe tartozik;
            a pert választásod szerint a lakóhelyed vagy tartózkodási
            helyed szerint illetékes törvényszék előtt is megindíthatod.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            14. Kiskorúak adatkezelése
          </h2>
          <p className="mt-2">
            A hírlevél nem 16 év alatti gyermekeknek szól. Ha még nem
            töltötted be a 16. életévedet, kérlek, csak a szülőd vagy
            törvényes képviselőd hozzájárulásával iratkozz fel — a GDPR 8.
            cikke és az Infotv. alapján Magyarországon a 16. életévét be
            nem töltött kiskorú hozzájárulása önmagában nem elegendő
            jogalap az adatkezeléshez.
          </p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-forest-900">
            15. A tájékoztató módosítása
          </h2>
          <p className="mt-2">
            Ezt a tájékoztatót időről időre frissíthetjük, ha változik a
            Weboldal működése vagy az alkalmazandó jogszabály. A mindenkor
            hatályos verzió ezen az oldalon érhető el, a lap tetején
            feltüntetett hatálybalépési dátummal. Lényeges változás esetén
            — például ha új adatkezelési cél jelenik meg — a hírlevél
            feliratkozóit emailben is tájékoztatjuk.
          </p>
        </section>
      </div>
    </main>
  );
}
