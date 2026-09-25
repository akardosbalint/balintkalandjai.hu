# Audit-jelentés — akardosbalint.hu (Kardos Bálint feliratkozó oldal)

**Dátum:** 2026-09-25 (az utazás indulása előtti nap)
**Vizsgált állapot:** production branch `claude/yoga-landing-page-hcauxv` @ `8c84edd` (PR #27 után; ez fut élesben, a Vercel deploy READY)
**Előzmény:** a 2026-09-23-i audit a git historyban van (`c45195f`, javítási jelölésekkel `9b4d2e2`). Ez a jelentés a mostani kód **teljes, új átvizsgálása**. A korábbi tételek állapotát a 8. fejezet foglalja össze.

### A kitöltött projekt-leírás (az audit-prompt sablonjához)
- **Miről szól az oldal:** magyar nyelvű, egyoldalas személyes-márka landing oldal (+ GYIK és jogi aloldalak). Kardos Bálint 70 napos indiai útját (2026-09-26 – 12-04) és RYT-500 jógaoktatói képzését dokumentálja. Az egyetlen konverziós cél a **heti, 20–30 perces hangfelvételre (email) való feliratkozás**.
- **Tech stack:** Next.js 15.5 (App Router) · React 18 a `package.json`-ban · TypeScript strict · Tailwind 3.4 · Framer Motion 13 · Kit (ConvertKit) V4 API · Google Analytics 4 Consent Mode v2-vel · Vercel hosting · Vitest · GitHub Actions CI.
- **Regisztráció/fizetés/fiók:** **nincs.** Egyetlen adatgyűjtési pont van: email + opcionális keresztnév + hozzájárulási checkbox, double opt-innal (Kit).

### Módszer
- **Kódátvizsgálás:** mind a 49 `.ts`/`.tsx` fájlt átnéztem (3 942 sor), a configokat és a jogi szövegeket is.
- **Parancsok:** `npm ci`, `npm run lint`, `npm test` (26/26 ✅), `npm run build` ✅, `npm audit`, `npm outdated`.
- **Lokális production szerver (`next start`):**
  - HTTP-fejlécek ellenőrzése;
  - az API tesztelése hibás bemenetekkel;
  - asset-ellenőrzés.
- **Playwright + Chromium mérések:**
  - LCP és CLS mobilon (390×844), lassított mobilon (4× CPU + 1,6 Mbps / 150 ms) és desktopon (1440×900);
  - JS nélküli render;
  - szekciónkénti és teljes oldalas képernyőképek;
  - DOM-ellenőrzés: címhierarchia, alt szövegek, vízszintes túlcsordulás, 24 px alatti koppintási célok.
- **WCAG-kontraszt:** a Tailwind-tokenekből számolva.
- **Korlát:** az élő domaint a sandbox proxy blokkolja. Az éles fejléceket (pl. HSTS) és az éles Kit-folyamatot ezért nem tudtam közvetlenül tesztelni.

---

## 0. Mit találtam — áttekintés

| | |
|---|---|
| **Méret** | 49 forrásfájl, 3 942 sor. 21 komponens, 12 lib-modul, 4 tesztfájl (26 teszt) |
| **Route-ok** | `/`, `/gyik`, `/adatkezeles`, `/aszf`, `/koszonom` (feliratkozás után), `/megerositve` (double opt-in után), 404, `POST /api/subscribe`, OG-képek, sitemap, robots, manifest |
| **Fő modulok** | **Konverzió:** `SubscribeForm` + `api/subscribe` + `lib/rate-limit` + `lib/validation`. **Mérés/consent:** `CookieConsent` + `GoogleAnalytics` + `lib/analytics` (`trackEvent`, `generate_lead`). **Élmény:** `JourneyProgress` + `lib/journey` (napszámláló), `ThemeSchedule`/`ThemeToggle`, `lib/motion` |
| **Build** | `/` First Load JS **164 kB** (103 kB közös, ebből 54 kB React/Next, 46 kB Framer Motion + app). Minden oldal statikus, kivéve az API-t |
| **Mért teljesítmény** | Lassított mobilon LCP **1,43 s**, CLS **0,007**. Desktopon LCP 1,38 s, CLS 0. JS nélkül a hero látszik |
| **Minőség** | lint 0 hiba, 26 teszt zöld, CI (lint + test + build) minden PR-on |

**Összkép:** az előző kör kritikus/magas tételei közül a hero-láthatóság, a GA/consent szövegek pontossága és a konverziómérés rendben van, és mérhetően működik. A mostani legfontosabb problémák:
1. **Holnap indul az út, a köszönővideó még mindig 404.** Minden új feliratkozó egy törött lejátszót lát.
2. **A főoldal ~80%-a JS nélkül (és hidratálás előtt) láthatatlan.** A hero alatti szekciók, köztük a második feliratkozó form, `opacity:0`-ról indulnak.
3. **Első látogatáskor a sticky CTA soha nem jelenik meg,** amíg a látogató nem kattint a cookie-sávon. A sávot sokan egyszerűen figyelmen kívül hagyják, így ők a görgetés alatt végig CTA nélkül maradnak.
4. **Az API három hibás bemenetre kezeletlen 500-at ad, és nincs hosszkorlátja.**
5. **A „Mit kapsz” és a „Miért higgy nekem” szekció tartalma az átírások után részben ismétli egymást,** és a „Mit kapsz” címe már nem illik az első kártyához.

---

## 1. UX/UI

### 🟠 Magas — A köszönőoldal videója 404: törött lejátszó minden új feliratkozónak
**Hely:** `src/app/koszonom/page.tsx:45-54` (`src="/videos/koszonom.mp4"`, `:47`)
**Bizonyíték:** lokális production szerveren a `GET /videos/koszonom.mp4` válasza `404`. A `public/` alatt csak `icons/` és `images/` van, a git historyban sem szerepelt soha videó. Mobilon a poszter (profilfotó) alatt egy `0:00`-s, nem induló lejátszósáv látszik.
**Miért probléma:** 2026-09-23 óta nyitott. Holnaptól (indulás) várható a legtöbb forgalom, és a double opt-in megerősítésére ösztönző oldal első eleme törött. A nagy 9:16-os blokk ráadásul a hajtás alá tolja a „Nem látod a levelet?” dobozt, pedig ez az oldal legfontosabb instrukciója.
**Javaslat:** töltsd fel a videót (`public/videos/koszonom.mp4`, H.264, ≤ 8 MB). Ha holnapig nincs meg, a `<video>` blokk kerüljön ki ideiglenesen, a doboz pedig a helyére.

### 🟠 Magas — A hero alatti teljes tartalom JS nélkül / hidratálás előtt láthatatlan
**Hely:** `src/components/AnimatedSection.tsx:30` (`initial={{ opacity: 0, y: 28 }}` + `whileInView`). Ezt használja a `Story.tsx`, a `WhatYouGet.tsx`, a `SocialProof.tsx` és a `SecondCTA.tsx`, a második formmal együtt (`SecondCTA.tsx:31-36`).
**Bizonyíték:** a Playwright JS nélküli teljes oldalas képernyőképén (390×7844 px) a hero és a footer között ~6 000 px üres, bézs felület van. A Story szövege, a portré, mind a 7 kártya és az alsó feliratkozó form láthatatlan. JS-sel minden megjelenik.
**Miért probléma:**
- **Robusztusság:** ha egy chunk nem töltődik be, vagy egy in-app böngésző (TikTok/IG webview, ahonnan a forgalom jön) lassan hidratál, a látogató üres oldalt görget.
- **Konzisztencia:** a hero-nál ezt a mintát a PR #23 már lecserélte CSS-animációra, a többi szekción azonban megmaradt.
- **SEO:** a Googlebot renderel JS-t, így nem kritikus, de a nem renderelő crawlerek és link-előnézetek üres tartalmat látnak.

**Javaslat:** az `AnimatedSection` kapja meg ugyanazt a mintát, mint a hero. Egy `noscript` stílus (`<noscript><style>[data-animate]{opacity:1!important;transform:none!important}</style></noscript>`), vagy CSS-es `animation-timeline: view()` / IntersectionObserver + class-toggle, `opacity:0` szerver-oldali kezdőállapot nélkül.

### 🟡 Közepes — A form hibaüzenete nincs a mezőhöz kötve, és a fókusz nem mozdul
**Hely:** `src/components/SubscribeForm.tsx:45-58` (kliens validáció), `:190-200` (`role="alert"` a gomb **alatt**)
**Bizonyíték:** a `grep aria-invalid src` üres. Hibás email vagy hiányzó pipa esetén a fókusz a gombon marad.
**Miért probléma:** WCAG 3.3.1 / 1.3.1 hiányosság. A képernyőolvasó nem tudja, melyik mező hibás. Mobilon a gomb alatti hibaüzenet könnyen kilóg a látómezőből, miközben a hiba a gomb fölötti mezőben van.
**Javaslat:** mezőnkénti hibaállapot, `aria-invalid` + `aria-describedby`, és hibánál `focus()` a hibás mezőre.

### 🟡 Közepes — Az űrlapmezők kerete nem éri el a 3:1 nem-szöveges kontrasztot (WCAG 1.4.11)
**Hely:** `src/components/SubscribeForm.tsx:135,149` — `border-forest-800/15` a `sand-50` háttéren
**Bizonyíték:** számítva **1,32:1**. A mobil képernyőképen (hero és alsó CTA) a mezők csak az enyhe fehér kitöltésből sejthetők.
**Javaslat:** `border-forest-800/40` (≈3:1), sötét módban `border-sand-50/40`.

### 🟡 Közepes — A „Mit kapsz” szekció címe és tartalma az átírások után szétcsúszott
**Hely:** `src/components/WhatYouGet.tsx:46` („Négy dolog, amire számíthatsz **minden hangfelvételben**”), `:14-16` (1. kártya)
**Bizonyíték (mobil képernyőkép):**
- Az 1. kártya címe most „Heti 1x 20-30 perces hangfelvétel” (gyakoriság és hossz), ez nem „valami, amire minden hangfelvételben számíthatsz”.
- Az 1. kártya leírása („A napi videó a highlight reel… a heti hangfelvétel a director's cut…”) a napi és a heti formátum különbségéről szól, nem a címről.
- A 3. kártya címe („Amit egy 60 másodperces videóban nem lehet elmondani”) ugyanezt a napi/heti kontrasztot ismétli.

**Miért probléma:** a szekció a konkrét ígéretet („mit kapok”) hivatott átadni. Ha a cím és a kártyák nem egy logikát követnek, gyengül az üzenet.
**Javaslat:**
- A szekció címe legyen pl. „Ezt kapod minden vasárnap”.
- Az 1. kártya leírása szóljon a formátumról, pl. „Minden vasárnap egy 20–30 perces, vágatlan hanganyag érkezik az emailedbe — kizárólag feliratkozóknak.”
- A „highlight reel / director's cut” kép maradjon egy helyen, a 3. kártyában.

### 🟢 Alacsony — Koppintási célok 24 px alatt (WCAG 2.5.8)
**Hely / bizonyíték (Playwright DOM-mérés, 390 px):**
- a checkbox 16×16 px (`SubscribeForm.tsx`, mindkét form);
- az `ECO` link 38×21 px (`Story.tsx:88-95`);
- a „← Vissza a főoldalra” link 133×17 px (`gyik/page.tsx`, `adatkezeles`, `aszf`).

**Megjegyzés:** a checkbox teljes címkéje kattintható, ezért ott a gyakorlati kockázat kicsi. A szövegközi linkekre a 2.5.8 kivételt ad.
**Javaslat:** checkbox `h-5 w-5`, a „Vissza” linkre `py-2 -my-2` (a Footer már így csinálja).

### 🟢 Alacsony — Kontraszthiba a két poszt-konverziós oldalon (nyitva 09-23 óta)
**Hely:** `src/app/koszonom/page.tsx:85`, `src/app/megerositve/page.tsx:86` — `text-sm text-ink-900/60`
**Bizonyíték:** **4,35:1** a `sand-50` háttéren, az AA küszöb 4,5:1.
**Javaslat:** `/65`.

### 🟢 Alacsony — A fejléc logója halvány, márkanév nélkül
**Hely:** `src/components/Header.tsx:44-61` (32 px, `opacity-90`, vékony vonalas rajz)
**Bizonyíték:** a mobil képernyőképeken egy alig kivehető szürke firka a bal felső sarokban.
**Javaslat:** a logó mellé „Kardos Bálint” felirat, vagy erősebb vonalú SVG.

### 🟢 Alacsony — Az új lapon nyíló linkek nincsenek jelölve
**Hely:** 11 db `target="_blank"` a `src/`-ben (Footer, koszonom, megerositve, gyik, Story), `sr-only` jelzés nélkül.
**Javaslat:** „(új lapon nyílik)” `sr-only` szöveg vagy ↗ ikon.

---

## 2. CRO (Conversion Rate Optimization)

**Mérés:** élesben fut a `generate_lead` (sikeres feliratkozás) és a `subscribe_error` (hibatípussal) GA4 esemény, `form_location` paraméterrel. A tulajdonos a GA4-ben `/koszonom` és `/megerositve` page_view kulcseseményeket is beállított.

### 🟠 Magas — Első látogatáskor a sticky CTA addig nem jelenik meg, amíg a látogató nem dönt a cookie-sávon
**Hely:** `src/components/StickyCTA.tsx:24,73` (`visible && consentDecided`), `src/components/CookieConsent.tsx:117-155`
**Bizonyíték:** a kód szerint a sticky CTA csak `consentDecided === true` esetén renderelődik. A cookie-sáv mobilon, görgetés közben (a hero form elhagyása után) jelenik meg, és a mobil képernyőképen **~210 px-t, a képernyő ~25%-át** takarja: ez 5 soros szöveg + 2 gomb. Aki nem kattint rá (gyakori viselkedés), annak:
- a sáv a teljes görgetés alatt ott marad;
- a sticky CTA ~8 000 px-nyi tartalmon át soha nem jelenik meg.

**Miért probléma:** a legnagyobb mobil konverziós segítség pont a legtöbb első látogatónál kapcsol ki. A két elem ütközését a kód kiszűrte, de a „ki nyer” döntés rossz irányba billen: a CTA tűnik el, nem a sáv.
**Javaslat (valamelyik):**
- **(a)** A sticky CTA a sáv **fölött** jelenjen meg (`bottom: bannerHeight`).
- **(b)** A cookie-sáv mobilon legyen kompakt, 1 sor + 2 kis gomb, és a részletek a linkre kerüljenek.
- **(c)** Egy idő (pl. 15 s) vagy görgetési mélység után a sáv zsugorodjon egy kis sarok-gombbá.

### 🟡 Közepes — A „Mit kapsz” és a „Miért higgy nekem” szekció ugyanazt ígéri kétszer, bizonyíték helyett
**Hely:** `src/components/SocialProof.tsx:14-30` vs. `src/components/WhatYouGet.tsx:12-33`
**Bizonyíték:**
- a SocialProof „Heti hangfelvétel, vágatlanul … 20-30 perces” (`:21-23`) = a WhatYouGet 1. kártyája;
- a SocialProof „Egy történet, ami még nincs lezárva” (`:26-28`) = a WhatYouGet „Lezáratlan gondolatmenetek” (`:29-31`);
- a „Miért higgy nekem” (`:40`) szekcióban nincs egyetlen ellenőrizhető elem sem: se link a profilokra, se követőszám, se a képzőhely neve.

**Miért probléma:** mobilon ez ~1 500 px ismételt ígéret a második form előtt. A bizalomépítő szekció bizonyíték helyett újra az ajánlatot mondja el.
**Javaslat:** a SocialProof 3 kártyája legyen ellenőrizhető:
- (1) linkelt TikTok/IG/YT/FB ikonsor, ha releváns, követőszámmal;
- (2) a képzőintézmény neve és linkje;
- (3) „3,5 éve napi ECO-gyakorlat” mint kitartás-bizonyíték.

Holnaptól az első napi videók is beágyazhatók vagy linkelhetők.

### 🟡 Közepes — A Story mobilon ~3 képernyőnyi, CTA nélküli szövegfal
**Hely:** `src/components/Story.tsx:56-131`
**Bizonyíték:** a Story szekció mobilon **2 613 px** magas (képernyőkép), ebből ~1 900 px folyószöveg. Az első bekezdés (`:57-82`) egyetlen, 20+ elemű felsorolás. A teljes főoldal 8 051 px, a két form között ~5 500 px van.
**Miért probléma:** a görgető mobil olvasó a Story közepén elveszítheti a fonalat, és a (fent leírt okból gyakran hiányzó) sticky CTA nem segít.
**Javaslat:**
- Az első bekezdés felsorolását rövidítsd 5–6 legerősebb elemre (a lista maga a bizonyíték, de a hossza fáraszt).
- A Story végére tegyél egy egysoros CTA-linket („Gyere, tarts velem →” → `#feliratkozas`).

### 🟡 Közepes — A copy még jövő időben szól, holnap indul az út
**Hely:** `src/components/Hero.tsx:130` („Most Indiáig megyek…”), `Story.tsx:121-130` („dokumentálom majd”), `src/components/JourneyProgress.tsx:29-34` (csak a számláló vált fázist)
**Miért probléma:** holnaptól a JourneyProgress „Az utam 1. napját élem” feliratot mutat, a hero és a Story viszont indulás előtti nézőpontból beszél. Dec. 4. után (`phase === "after"`) az egész oldal egy lezárult útra toboroz.
**Javaslat:** a meglévő `getJourneyDayInfo()` alapján fázisfüggő alcím (before / during / after). Legalább a „dokumentálom majd” → „dokumentálom” csere az indulás után.

### 🟢 Alacsony — Angol szakzsargon és apró copy-inkonzisztenciák
**Hely / bizonyíték:**
- `WhatYouGet.tsx:16`: „highlight reel”, „director's cut”. Egy magyar, nem szakmai közönségnek ez két idegen kifejezés egy mondatban.
- `Story.tsx:86`: „3.5 éve” (magyarul „3,5 éve”).
- Hangnem: `SubscribeForm.tsx:55` „küldhessek” (E/1), de `route.ts:106` „küldhessünk” és `route.ts:44` „nálunk” (T/1).

**Javaslat:** „a napi videó a kirakat, a heti hangfelvétel a teljes, vágatlan változat”; „3,5”; mindenhol E/1.

### 🟢 Alacsony — Tartalmi pontatlanság: „70 napot töltök Rishikeshben”
**Hely:** `Hero.tsx:130-131`, `src/app/opengraph-image.tsx:12` („70 nap Rishikeshben”), `src/app/aszf/page.tsx:76` („70 napos … jógaoktatói **képzésének**”)
**Bizonyíték:** a `site-config.ts:34-49` szerint a 70 nap ajtótól ajtóig számít (két utazási nappal), az akkreditált képzés 59 napos (10.01–11.28). A `Story.tsx` helyesen „összesen 70 napot töltök Indiában”.
**Javaslat:** „70 napos út, nagyrészt Rishikeshben”. Az ÁSZF-ben: „70 napos indiai útjának”.

---

## 3. Biztonság (Security)

**Nem alkalmazható (N/A) terület:** auth, session, JWT, jogosultságkezelés, IDOR, SQL injection. Nincs felhasználói fiók és adatbázis, az állapotot a Kit tárolja.

### 🟡 Közepes — Az API típus-ellenőrzés nélkül dolgozza fel a body-t: kezeletlen 500-ak, hosszkorlát nélkül
**Hely:** `src/app/api/subscribe/route.ts:75` (`request.json()`), `:87` (`body.website`), `:91-93` (`body.email?.trim()`, `body.firstName?.trim()`)
**Bizonyíték (lokális production szerver, curl):**
```
body: null                                   → 500  TypeError: Cannot read properties of null (reading 'website')
body: {"email":123}                          → 500  TypeError: b.email?.trim is not a function
body: {"email":"a@b.co","consent":true,
       "firstName":{"x":1}}                  → 500  TypeError: b.firstName?.trim is not a function
body: 5000 karakteres email                  → átmegy a validáción, a Kit-hívásig jut
```
**Miért probléma:**
- A kivételek a try/catch-en kívül dobódnak: zajos 500-ak és hamis riasztások a Vercel logban.
- Hosszkorlát nélkül tetszőleges méretű stringek jutnak a Kit API-ig.
- A `SubscribeBody` interface csak fordítási idejű illúzió.

**Javaslat:** futásidejű ellenőrzés: `typeof body === "object" && body !== null && !Array.isArray(body)`, a mezőkre `typeof … === "string"`, email ≤ 254, keresztnév ≤ 100 karakter. Adj hozzá 3 tesztesetet a `route.test.ts`-hez.

### 🟡 Közepes (jogi pontosság) — Az Adatkezelési tájékoztató „legfeljebb 10 perces” IP-tárolási állítása nem igaz a kódra
**Hely:** `src/app/adatkezeles/page.tsx:82-84` („legfeljebb 10 percig, kizárólag a szerver memóriájában”) vs. `src/lib/rate-limit.ts:15-24,27-29`
**Bizonyíték:** a `sweep()` csak egy **következő kérés** beérkezésekor fut le. Ha egy IP-cím után nem érkezik újabb feliratkozási kérés, a bejegyzés addig marad a memóriában, amíg a szerverless példány él. Ez 10 percnél hosszabb is lehet.
**Miért probléma:** a tájékoztató konkrét, ellenőrizhető időtartamot ígér, amit a kód nem garantál (GDPR 5. cikk (1) e), 13. cikk).
**Javaslat (valamelyik):**
- Kód: `setTimeout`/`unref` alapú lejárat, vagy a kulcs legyen az IP hash-e (akkor a szöveg is pontosítható).
- Szöveg: „legfeljebb a szerverfolyamat futásáig, jellemzően néhány percig”.

### 🟢 Alacsony — Az ÁSZF olyan elfogadásra hivatkozik, amely nem történik meg
**Hely:** `src/app/aszf/page.tsx:103-105` („…a feliratkozási feltételek elfogadásával”) vs. `src/components/SubscribeForm.tsx:166-173`. A checkbox csak az Adatkezelési tájékoztatót említi, az ÁSZF-et nem.
**Javaslat:** a checkbox-szövegbe az ÁSZF linkje is („…megismertem az ÁSZF-et és az Adatkezelési tájékoztatót”), vagy az ÁSZF mondatának pontosítása.

### 🟢 Alacsony — A hozzájárulás visszavonása csak a böngészőadatok törlésével lehetséges
**Hely:** `src/components/CookieConsent.tsx:29,103-106` (döntés után a sáv nem jelenik meg újra), `src/app/adatkezeles/page.tsx:163-168` (pontosan így írja le)
**Megjegyzés:** a szöveg most már igaz. A GDPR 7. cikk (3) szerint azonban a visszavonásnak ugyanolyan egyszerűnek kell lennie, mint a megadásnak.
**Javaslat:** „Süti-beállítások” link a Footerben, amely újranyitja a sávot.

### 🟢 Alacsony — Kit-hívás timeout nélkül
**Hely:** `src/app/api/subscribe/route.ts:133,146`. A kliens `fetch`-nek (`SubscribeForm.tsx:64`) sincs timeoutja.
**Miért probléma:** ha a Kit lassan válaszol, a látogató percekig „Küldés…”-t lát.
**Javaslat:** `signal: AbortSignal.timeout(8000)`.

### 🟢 Alacsony — Fejlécek és függőségek
- **`X-Powered-By: Next.js`:** jelen van (lokális `curl -I`). Javaslat: `poweredByHeader: false` a `next.config.mjs`-ben.
- **HSTS:** a kód nem küldi. A Vercel custom domainen alapból adja, de innen nem ellenőrizhető: `curl -I https://www.akardosbalint.hu`.
- **CSP:** az `'unsafe-inline'` a `script-src`-ben dokumentált kompromisszum (`next.config.mjs:1-11`). Alacsony kockázat, mert nincs felhasználói tartalom-renderelés.
- **`npm audit`:**
  - 1 high: `postcss`, tranzitív a `next`-en belül, csak build-idejű;
  - 3 moderate: `vitest`/`@vitest/mocker`, csak dev;
  - A `next` **15.5.26** patch elérhető, és azonnal felvehető.
- **Preview környezet:** az előző audit szerint (09-23, Vercel MCP) a `KIT_API_KEY`/`KIT_FORM_ID` a preview-ra is az élő formot állítja be. Minden preview-teszt élő feliratkozót hoz létre. Javaslat: külön teszt-form.

### ✅ Rendben (ellenőrizve)
- Nincs hardcode-olt titok, a Kit kulcs csak szerveren él.
- Van honeypot és IP-alapú rate limit.
- A hozzájárulás szerveroldalon is kötelező.
- `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- A cookie-sáv, a GYIK és az Adatkezelési tájékoztató a Consent Mode tényleges működését írja le.

---

## 4. Struktúra és architektúra

Az `app` / `components` / `lib` tagolás a mérethez illő. Az üzleti logika (`journey`, `rate-limit`, `validation`, `analytics`, `theme-schedule`) tesztelhető lib-modulokban van. Nincs túltervezés.

### 🟡 Közepes — React 18 a `package.json`-ban, miközben a Next 15 App Router React 19-et futtat
**Hely:** `package.json` (`react ^18`, `@types/react ^18`)
**Miért probléma:** a típusok nem a futó React API-t írják le. A Next 16-os upgrade-nél ez biztosan előjön.
**Javaslat:** `react`/`react-dom`/`@types/react*` → 19, a Next 16-os migrációval egy lépésben.

### 🟢 Alacsony — A feliratkozó form id-k három helyen literálként szerepelnek
**Hely:** `Hero.tsx` (`"feliratkozas"`), `SecondCTA.tsx:35` (`"feliratkozas-lent"`), `StickyCTA.tsx:11` + `CookieConsent.tsx:18` (duplikált `SUBSCRIBE_FORM_IDS` + azonos IntersectionObserver-logika)
**Javaslat:** egy `lib/subscribe-forms.ts` konstans és egy `useSubscribeFormInView()` hook.

### 🟢 Alacsony — Elavult README
**Hely:** `README.md:1-4` („Tudatosság és Jelenlét”, „Next.js 14”), `:62-75` (régi sikerüzenet, „kitölthető sablon” adatkezelés); a konverziómérés, a `/megerositve` flow és a Kit „Success page” beállítás nincs leírva.

### N/A — Adatbázis-séma, indexek, REST-konvenciók
Nincs adatbázis, egyetlen, egycélú `POST` végpont van.

---

## 5. Clean code

A kód jó minőségű: konzisztens elnevezések, kis komponensek (a legnagyobb komponens a `SubscribeForm`, 210 sor), kiváló „miért”-kommentek.

### 🟢 Alacsony — Duplikált „kövess élőben” blokk és social-link lista
**Hely:** `koszonom/page.tsx:19-24,85-100` ≈ `megerositve/page.tsx:21-26,86-101`. A négy social link összesen 5 helyen van kézzel leírva (a Footer és a GYIK is).
**Bizonyíték:** a `/60` kontraszthiba pont ezért maradt benne mindkét másolatban.
**Javaslat:** `<SocialLinks />` komponens a `siteConfig.social`-ból.

### 🟢 Alacsony — Hibás hibakategória: a nem-JSON válasz „hálózati hibának” számít
**Hely:** `src/components/SubscribeForm.tsx:70` (`await res.json()`) → `catch` → `trackError("network")` + „ellenőrizd a netkapcsolatot”
**Miért probléma:** ha a Vercel HTML hibaoldalt ad (pl. 504 timeout), a látogató félrevezető üzenetet kap, és a GA-ban `network` hibaként látszik `http_504` helyett.
**Javaslat:** `const data = await res.json().catch(() => null)`.

### 🟢 Alacsony — Build-időben befagyott évszám és apróságok
- `Footer.tsx:53`: a `new Date().getFullYear()` statikus prerenderben a build évét rögzíti.
- A `next lint` a Next 15.5-ben deprecated → `next-lint-to-eslint-cli` codemod.

### 🟢 Alacsony — Hiányzó tesztek kritikus útvonalakon
**Bizonyíték:** 26 teszt fedi a `journey`, a `rate-limit`, az `analytics` és a `route` validációs ágait.
**Hiányzik:**
- (1) a fenti nem-objektum/nem-string body esetek;
- (2) egy Playwright smoke-teszt a teljes flow-ra (form → `generate_lead` → `/koszonom`) mockolt API-val;
- (3) egy statikus asset-ellenőrzés, amely a hiányzó `koszonom.mp4`-et elkapta volna.

---

## 6. Teljesítmény

**Mért értékek** (lokális production build, Playwright/Chromium):

| Forgatókönyv | LCP | CLS | Megjegyzés |
|---|---|---|---|
| Mobil 390×844 | 0,65 s | 0 | |
| Mobil, 4× CPU + lassú 4G | **1,43 s** | 0,007 | 09-23-án 4,42 s volt |
| Desktop 1440×900 | 1,38 s | 0 | |
| JS nélkül | — | — | a H1 és a hero form látszik, a hero alatti tartalom nem (lásd 1. pont) |

A hero-javítás (PR #23) mérhetően működik: a lassított mobil LCP ~3× gyorsabb, a „jó” sávban van.

### 🟡 Közepes — Framer Motion minden oldalon, főleg dekorációhoz
**Hely:** 14 kliens komponens importálja. A `/` First Load JS 164 kB.
**Miért probléma:** a használat nagy része fade, hover-scale és tap-scale, ami CSS-sel is megoldható. Gyenge telefonokon ez rontja az INP-t.
**Javaslat:** `LazyMotion` + `domAnimation` + `m.*` (jellemzően −20–30 kB). A `HoverLiftCard`, a `SectionPath` és a gombok `whileHover`/`whileTap` effektusai mehetnek CSS-re. Az 1. pontbeli `AnimatedSection`-csere is csökkenti a függőséget.

### 🟢 Alacsony — Mindkét fejléc-logó `priority`-vel preloadolódik
**Hely:** `src/components/Header.tsx:51,59`. Egyszerre csak az egyik látszik.
**Javaslat:** egyetlen `currentColor`-os inline SVG, ami az 1. pont halványsági problémáját is megoldja.

### 🟢 Alacsony — Nem optimalizált videó-poszter
**Hely:** `src/app/koszonom/page.tsx:48`: 410 KB-os JPEG, a `next/image` pipeline-t megkerülve.
**Javaslat:** ≤ 60 KB-os WebP poszter.

### ✅ Rendben
- self-hosted fontok, `display: swap`;
- a portré `next/image`, `sizes`-szal;
- minden oldal statikus, 1 éves `s-maxage`;
- CLS ≈ 0 (a `JourneyProgress` helyfoglalója működik);
- `prefers-reduced-motion` kezelve.

---

## 7. SEO

### 🟡 Közepes — Nincs strukturált adat (JSON-LD)
**Hely:** a `src/`-ben nincs `application/ld+json`. A `/gyik` HTML-jében 0 találat.
**Javaslat:**
- `FAQPage` a `/gyik`-re (11 kész kérdés-válasz, `gyik/page.tsx`);
- `Person` + `WebSite` a főoldalra, `sameAs` = a 4 social profil.

### 🟢 Alacsony — `robots.txt` Disallow + `noindex` ütközés
**Hely:** `src/app/robots.ts:9` (`/koszonom`, `/megerositve`) + `noindex` a két oldalon
**Miért probléma:** a tiltás miatt a Google nem látja a `noindex`-et.
**Javaslat:** vedd ki a két útvonalat a `disallow`-ból.

### 🟢 Alacsony — A sitemap `lastModified` mindig a build pillanata
**Hely:** `src/app/sitemap.ts:8,14,20,26`
**Javaslat:** fix dátumok (pl. a jogi oldalak „Hatályos” dátuma).

### 🟢 Alacsony — A `.vercel.app` domain nem irányít át; a social-előnézetek gyorsítótára
- **`.vercel.app`:** a `balintkalandjai-hu.vercel.app` redirect nélkül fut (a 09-23-i MCP-lekérdezés szerint). A canonical kezeli, de érdemes 308-at beállítani.
- **Social-előnézetek:** a korábban megosztott linkek a régi, 67 napos OG-képet mutatják a platformok gyorsítótárából. A kód helyes (az új kép-URL-hash `bf7d14a8…`). Teendő: Facebook Sharing Debugger → „Scrape Again”, LinkedIn Post Inspector.

### ✅ Rendben
- Oldalanként egyedi title/description.
- A canonical a bekötött domainre mutat.
- Oldalanként OG-kép (70 nap).
- `lang="hu"`.
- **Címhierarchia (DOM-ellenőrzés):** a főoldalon 1× `h1` → 4× `h2` → 7× `h3`, ugrás nélkül; a `/gyik`-en 1× `h1`.
- Nincs `alt` nélküli kép, nincs vízszintes túlcsordulás 390 px-en.

---

## 8. Az előző (09-23-i) audit tételeinek állapota

| Tétel | Állapot |
|---|---|
| Hero `opacity:0` / LCP 4,4 s | ✅ Javítva (PR #23), újramérve: 1,43 s |
| GA/consent szövegek valótlanok | ✅ Javítva (PR #23), a szöveg megfelel a kódnak |
| Nincs konverziómérés | ✅ Javítva (`generate_lead`, `subscribe_error`) + GA4 kulcsesemények |
| Kapcsolati email | ✅ Footer, GYIK, köszönőoldal, API-üzenet |
| Köszönővideó 404 | ⏳ Nyitva (tulajdonosi feladat) |
| API 500 hibás body-ra | ⏳ Nyitva, most újabb esettel (objektum `firstName`) |
| Mezőkeret-kontraszt, form a11y, `/60` kontraszt | ⏳ Nyitva |
| Cookie-sáv a köszönőoldalon | ⏳ Nyitva, a sticky CTA-ütközés miatt most magasabb prioritás |
| JSON-LD, robots/noindex, sitemap, dupla logó-preload | ⏳ Nyitva |
| **Új ebben a körben** | JS nélkül láthatatlan hero alatti tartalom; sticky CTA ↔ cookie-sáv; „Mit kapsz” szétcsúszás és SocialProof-ismétlés; Story hossza; 10 perces IP-állítás; ÁSZF-elfogadás; a `res.json` hibakategória |

---

## Top 10 azonnali teendő (hatás / erőfeszítés szerint)

| # | Teendő | Súlyosság | Erőfeszítés | Hivatkozás |
|---|---|---|---|---|
| 1 | Köszönővideó feltöltése — vagy **holnapig** a `<video>` blokk ideiglenes kivétele, és a „Nem látod a levelet?” doboz előre | 🟠 Magas | Triviális | 1. pont |
| 2 | A sticky CTA ne tűnjön el a cookie-sáv miatt: a sáv fölé kerüljön, vagy a sáv legyen kompakt mobilon | 🟠 Magas | Kicsi | 2. pont |
| 3 | `AnimatedSection`: ne induljon `opacity:0`-ról a szerver-HTML-ben (`noscript` fallback vagy CSS-animáció) → a Story, a kártyák és a 2. form JS nélkül is látszik | 🟠 Magas | Kicsi | 1. pont |
| 4 | API futásidejű típus- és hosszellenőrzés + 3 teszt → nincs több 500, nincs 5000 karakteres email | 🟡 Közepes | Triviális | 3. pont |
| 5 | A „Mit kapsz” címének és az 1. kártya leírásának összehangolása; a SocialProof kártyái ismétlés helyett ellenőrizhető bizonyítékot adjanak (profil-linkek, képzőhely) | 🟡 Közepes | Kicsi (copy) | 1. és 2. pont |
| 6 | Form a11y: mezőkeret ≥ 3:1, `aria-invalid`/`aria-describedby`, fókusz a hibás mezőre; `/60` → `/65` | 🟡 Közepes | Kicsi | 1. pont |
| 7 | Az Adatkezelési tájékoztató „legfeljebb 10 perc” állításának és a kódnak az összehangolása; ÁSZF-link a checkboxba | 🟡 Közepes | Triviális | 3. pont |
| 8 | Fázisfüggő copy az indulás után (legalább „dokumentálom majd” → „dokumentálom”), a Story végére CTA-link | 🟡 Közepes | Kicsi | 2. pont |
| 9 | JSON-LD (`FAQPage`, `Person`/`WebSite`); a `/koszonom` és `/megerositve` kivétele a robots `disallow`-ból | 🟡 Közepes | Kicsi | 7. pont |
| 10 | `next` 15.5.26 patch + `poweredByHeader: false` + `res.json().catch` a formban | 🟢 Alacsony | Triviális | 3., 5. pont |

**Következő kör:**
- `LazyMotion`/CSS a Framer Motion helyett;
- „Süti-beállítások” link;
- külön Kit teszt-form a preview-ra;
- `SocialLinks` komponens;
- README frissítése;
- Next 16 + React 19 migráció;
- a `.vercel.app` → www 308.

---

Szólj, ha szeretnéd, hogy elkezdjem kijavítani a talált problémákat, és ha igen, milyen sorrendben. Például:
- **(a)** a Top 10 sorrendjében;
- **(b)** csak az indulás előtt legfontosabb 1–4. pontot most, a többit utána;
- **(c)** saját válogatás szerint.

Az 1. ponthoz (videó) és az 5. pont bizonyítékaihoz (követőszámok, a képzőhely neve és linkje) a te bemeneted kell. A többit kódból el tudom végezni.
