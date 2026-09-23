# Audit-jelentés — akardosbalint.hu (Kardos Bálint feliratkozó oldal)

**Dátum:** 2026-09-23
**Vizsgált állapot:** `claude/yoga-landing-page-hcauxv` (a repo alapértelmezett / production branche) @ `1b478b4`
**Előzmény:** a 2026-09-18-i audit (git history: `1a7ea98`) Top 10 listájának minden tétele lezárult — a domain és a Kit kulcsok is (lásd 0. pont). Ez a jelentés **újabb, teljes kör** a jelenlegi kódon. Csak a még nyitott vagy új problémák szerepelnek benne, a korábban javított tételeket nem ismétli meg.

### A kitöltött projekt-leírás (az audit-prompt sablonjához)
- **Miről szól az oldal:** egyoldalas, magyar nyelvű személyes-márka landing oldal. Kardos Bálint 70 napos (2026-09-26 – 12-04) indiai útját és RYT-500 jógaoktatói képzését dokumentálja. Az egyetlen konverziós cél a **heti hangfelvételre (email-hírlevélre) való feliratkozás**.
- **Tech stack:** Next.js 15.5 (App Router), React 18 (package.json), TypeScript strict, Tailwind 3.4, Framer Motion, Kit (ConvertKit) V4 API, Google Analytics 4 Consent Mode-dal, Vercel hosting, Vitest, GitHub Actions CI.
- **Regisztráció/fizetés/fiók:** **nincs.** Egyetlen adatgyűjtési pont van: email + opcionális keresztnév + GDPR-checkbox, double opt-innal (Kit).

### Módszer
- Minden `.ts`/`.tsx`/config fájlt végigolvastam (47 forrásfájl, ~3 900 sor).
- Lefuttattam: `npm ci`, `npm run lint`, `npm test` (23/23 ✅), `npm run build` ✅, `npm audit`, `npm outdated`.
- Elindítottam a production buildet lokálisan (`next start`), és curl-lel lekértem a HTTP-fejléceket, a `robots.txt`-t, a `sitemap.xml`-t, az OG-képet és az API-t hibás inputokkal.
- Playwright + Chromium méréseket végeztem: LCP, CLS, 390×844-es mobil és 1440×900-as desktop nézet, 4× CPU-lassítás + lassú 4G szimuláció, JavaScript nélküli render, képernyőképek.
- A WCAG-kontrasztot a tényleges Tailwind-tokenekből számoltam (relatív luminancia képlettel, alfa-keveréssel).
- A Vercel projektet (domainek, env változók) MCP-n keresztül kérdeztem le.
- **Korlát:** az élő domaint (`www.akardosbalint.hu`) a sandbox proxy blokkolta (403), ezért az éles fejléceket (pl. HSTS) és az éles Kit-flow-t nem tudtam közvetlenül tesztelni. Ahol ez számít, jelzem.

---

## 0. Mit találtam — áttekintés

| | |
|---|---|
| **Méret** | 23 komponens/oldal, 12 lib-modul, 3 tesztfájl. A legnagyobb fájlok: `aszf/page.tsx`, `gyik/page.tsx` (215 sor), `adatkezeles/page.tsx` (211 sor) |
| **Route-ok** | `/` (landing), `/gyik`, `/adatkezeles`, `/aszf`, `/koszonom` (feliratkozás után), `/megerositve` (double opt-in után), 404, `POST /api/subscribe`, OG-képek, sitemap, robots, manifest |
| **Fő modulok** | `SubscribeForm` + `api/subscribe` (konverzió), `CookieConsent` + `GoogleAnalytics` + `lib/analytics` (consent), `ThemeSchedule`/`ThemeToggle` (napszak szerinti téma), `JourneyProgress` + `lib/journey` (napszámláló), `lib/rate-limit` |
| **Deploy (Vercel, ellenőrizve)** | `www.akardosbalint.hu` ✅ bekötve, az apex 308-cal a www-re irányít. `KIT_API_KEY` és `KIT_FORM_ID` ✅ be van állítva (production + preview) |
| **Build** | `/` First Load JS **164 kB** (ebből 103 kB közös). Minden oldal statikus, kivéve az API-t |
| **Minőség** | lint 0 hiba, 23 teszt zöld, CI PR-onként fut |

**Összkép:** a kód gondosan megírt és jól kommentezett, az előző audit minden kritikus pontja rendezve van. A mostani kör legsúlyosabb problémái:
1. **A köszönőoldal videója nem létezik** (404). Épp a frissen konvertált látogató kap egy törött lejátszót.
2. **A cookie-/adatkezelési szöveg valótlant állít.** Azt írja, hozzájárulás nélkül „semmilyen mérőkód nem fut”, de a gtag.js minden látogatónál betöltődik.
3. **A hero (H1 + feliratkozó űrlap) a szerver által renderelt HTML-ben `opacity:0`.** Hidratálás előtt, illetve JS nélkül láthatatlan. Lassított mobilon az LCP 4,4 s.

---

## 1. UX/UI

### 🟠 Magas — A köszönőoldal videója 404-et ad: törött lejátszó a konverzió után
**Hely:** `src/app/koszonom/page.tsx:45-54` (`src="/videos/koszonom.mp4"`)
**Bizonyíték:** a `public/` alatt nincs `videos/` mappa, és a git historyban sem szerepelt soha (`git log --all -- 'public/videos*'` üres). Lokális production szerveren: `GET /videos/koszonom.mp4 → 404`. Mobil képernyőkép: a poszter (profilfotó) megjelenik, alatta egy `0:00`-s vezérlősáv, a lejátszás nem indul.
**Miért probléma:** ez az oldal az egész tölcsér legértékesebb pillanata: a látogató épp most adta meg az emailjét, és a double opt-in megerősítésére kell rávenni. Ha itt törött elem fogadja, az rontja a bizalmat, és csökkenti a megerősítési arányt. Ráadásul a nagy, 9:16-os blokk a „Nem látod a levelet?” instrukciót (a legfontosabb tartalmat) a hajtás alá tolja.
**Javaslat:** töltsd fel a videót (`public/videos/koszonom.mp4`, H.264, ≤ 5–8 MB, vagy Vercel Blob/YouTube embed). Addig vedd ki a `<video>` blokkot. A „Nem látod a levelet?” dobozt tedd a videó **elé**.

### 🟡 Közepes — Mobilon a cookie-sáv a köszönőoldalon rácsúszik a tartalomra
**Hely:** `src/components/CookieConsent.tsx:20-80` (csak a főoldali formokat figyeli), `src/app/koszonom/page.tsx`
**Bizonyíték:** a `/koszonom` mobil képernyőképén a banner 1,2 s után a videó alsó harmadára ül rá.
**Miért probléma:** a banner elrejtési logikája csak a `feliratkozas`/`feliratkozas-lent` id-kat figyeli. A köszönőoldalon egyik sincs, így ott mindig megjelenik. Ide jellemzően az érkezik, aki a főoldalon még nem döntött, mert ott a form miatt el volt rejtve a sáv. Így a két legfontosabb poszt-konverziós elem közé ékelődik.
**Javaslat:** a `/koszonom` és `/megerositve` oldalakon a banner csak görgetés után jelenjen meg, vagy kerüljön kompakt, sarokba tett formába.

### 🟡 Közepes — Az űrlapmezők kerete nem teljesíti a WCAG 1.4.11-et (nem-szöveges kontraszt)
**Hely:** `src/components/SubscribeForm.tsx:121,135` — `border-forest-800/15` a `sand-50` háttéren, a mező kitöltése `bg-white/80`
**Bizonyíték:** a számított kontrasztarány a keret és a háttér között **1,32:1**, a követelmény ≥ 3:1. A mobil képernyőképen a mezők gyakorlatilag csak az enyhe fehér kitöltésből látszanak.
**Miért probléma:** gyengénlátó felhasználónak, illetve napfényben telefonon nehéz észrevenni, hol a beviteli mező. Ez közvetlenül a konverziós formot érinti.
**Javaslat:** legalább `border-forest-800/40` (≈ 3:1) vagy `ring-1 ring-ink-900/30` a mezőkre, sötét módban `border-sand-50/40`.

### 🟡 Közepes — A form hibaüzenete nincs a mezőhöz kötve, és a fókusz nem mozdul
**Hely:** `src/components/SubscribeForm.tsx:35-47` (kliens validáció), `:176-186` (hibaüzenet)
**Miért probléma:** a `role="alert"` bejelenti a hibát, de:
- az email mezőn nincs `aria-invalid`, sem `aria-describedby` a hibaszövegre;
- hibás email vagy hiányzó checkbox esetén a fókusz a gombon marad;
- a hibaüzenet a gomb **alatt** jelenik meg, miközben a probléma a gomb **fölötti** mezőben van. Mobilon ez könnyen kívül esik a látómezőn.

Ez WCAG 3.3.1 / 1.3.1 hiányosság.
**Javaslat:** külön hibaállapot mezőnként (`emailError`, `consentError`), `aria-invalid` + `aria-describedby`, és hibánál `inputRef.current.focus()` a hibás mezőre.

### 🟡 Közepes — WCAG AA kontraszthiba: az előző auditban javított hiba a két poszt-konverziós oldalon megmaradt
**Hely:** `src/app/koszonom/page.tsx:77`, `src/app/megerositve/page.tsx:86` — `text-sm text-ink-900/60`
**Bizonyíték:** `ink-900` 60% alfával a `sand-50` háttéren **4,35:1** (AA küszöb 14 px-es szövegre: 4,5:1). Az előző kör a `SubscribeForm`-ban kijavította (`/65`), de ez a két másolat kimaradt.
**Javaslat:** `text-ink-900/65` mindkét helyen. Hosszabb távon: a „kövess élőben” blokk legyen közös komponens (lásd 5. pont).

### 🟡 Közepes — Az aloldalak zsákutcák: nincs footer, nincs navigáció, nincs CTA
**Hely:** `src/app/gyik/page.tsx:192-214`, `src/app/adatkezeles/page.tsx`, `src/app/aszf/page.tsx` (a `Footer` csak a `src/app/page.tsx:22`-ben szerepel), `src/components/Header.tsx` (csak logó + téma-kapcsoló)
**Miért probléma:**
- A GYIK meta-leírása szerint „Iratkozz fel, és írj nekem”, de a `/gyik` oldalon nincs se űrlap, se feliratkozás-link.
- Aki a GYIK-ből győződik meg (ez tipikusan késői, magas szándékú látogató), annak vissza kell navigálnia, és újra meg kell keresnie a formot.
- A jogi oldalakról a Footer hiánya miatt sincs átjárás egymás közt.

**Javaslat:**
- A `Footer`-t tedd a `layout.tsx`-be.
- A `/gyik` aljára tegyél egy `SubscribeForm`-ot, vagy legalább egy `/#feliratkozas` CTA-gombot (a 404-es oldal már ezt a mintát használja: `not-found.tsx:48-56`).

### 🟢 Alacsony — A Header logó kicsi és halvány, és nem hordoz márkanevet
**Hely:** `src/components/Header.tsx:48-63` — 32 px, `opacity-90`, vékony vonalas rajz
**Bizonyíték:** a mobil képernyőképen a logó egy alig kivehető, szürke firka a bal felső sarokban.
**Javaslat:** a logó mellé kerüljön ki a „Kardos Bálint” szöveg (a Footer és az OG-kép is így teszi), vagy legyen erősebb vonalvastagságú SVG a logó.

### 🟢 Alacsony — A két ugyanolyan „Gyere, tarts velem” gomb és a `ctaLabel` prop még mindig kihasználatlan
**Hely:** `src/components/SecondCTA.tsx:35`, `src/components/StickyCTA.tsx:88`
**Miért probléma:** az előző auditban „Alacsony” volt, és nem került javításra. A `SecondCTA` az olvasóhoz szól („te is átéltél hasonlót”), mégis a hero-val azonos CTA-t kapja.

### 🟢 Alacsony — Új lapon nyíló linkek jelzés nélkül
**Hely:** `Footer.tsx:11-22`, `koszonom/page.tsx:81-89`, `megerositve/page.tsx:90-98`, `gyik/page.tsx:77-111`, `Story.tsx:88-95`
**Javaslat:** `sr-only` „(új lapon nyílik)” szöveg vagy egy ↗ ikon (az előző auditból nyitva maradt pont).

---

## 2. CRO (Conversion Rate Optimization)

### 🟠 Magas — Nincs konverziómérés: nem tudod, hány látogatóból lesz feliratkozó
**Hely:** `src/components/SubscribeForm.tsx:70` (`router.push("/koszonom")`); a teljes `src/`-ben nincs `gtag('event', …)` hívás (`grep` üres)
**Miért probléma:** a GA be van kötve, de sem `generate_lead`/`sign_up` esemény, sem hibaesemény (validációs hiba, 4xx/5xx) nem kerül mérésre. A `/koszonom` pageview-je csak közelítő konverziós jel:
- közvetlen URL-látogatás is beszámít;
- a honeypotos botok is ide kerülnek (`route.ts:86-88` → `{ ok: true }` → redirect);
- consent nélkül (Consent Mode) csak modellezett adat van.

A hero-kód A–F headline-variánsokat tartalmaz A/B teszthez (`Hero.tsx:12-62`), de mérés nélkül egyik sem tesztelhető. Azt sem tudod, melyik form (hero vagy alsó) konvertál.
**Javaslat:**
- Sikeres válasz után `window.gtag?.('event', 'generate_lead', { form_id: id })`, hiba esetén `subscribe_error` a status kóddal.
- Opcionálisan UTM → Kit tag (`first_touch`), hogy lásd, melyik social csatorna hozza a feliratkozókat.

### 🟡 Közepes — Az above-the-fold szöveg sűrű, a konkrét ígéret („mit kapok”) a hajtás alatt van
**Hely:** `src/components/Hero.tsx:122-166`
**Bizonyíték:** 390×844-es mobilon az első képernyőt a 3 soros H1 és a **6 soros** subheadline (≈ 40 szó, két tooltipes szakkifejezéssel) tölti ki. A form a képernyő alján kezdődik, a „Heti 1 hangfelvétel. Nulla spam…” mikrocopy már a hajtás alá esik (lásd a képernyőképet).
**Miért probléma:** hideg (TikTokról érkező) látogatónak az első 5 másodpercben az érzelmi horog megvan. A **csere** viszont nincs meg: mit kap és milyen gyakran. Ez csak a form alatti apró szövegből és a `WhatYouGet` szekcióból derül ki. A subheadline RYT-500 / Yoga Alliance kitérője a fejlesztőnek fontos, a döntéshez nem.
**Javaslat:**
- Rövidítsd a subheadline-t 1–2 sorra (pl. „70 nap Indiában, jógaoktatói képzéssel. Minden vasárnap elküldöm a vágatlan hangfelvételt arról, ami a videókból kimarad.”).
- A RYT-500 részletek menjenek a Story-ba.
- A „Heti 1 hangfelvétel…” sor kerüljön a gomb **fölé**.

### 🟡 Közepes — A „Miért higgy nekem” szekcióban nincs egyetlen ellenőrizhető bizalmi jel sem
**Hely:** `src/components/SocialProof.tsx:14-66`
**Miért probléma:** a szekció őszintén kimondja, hogy nincs testimonial (ez jó döntés). Helyette viszont ígéreteket sorol fel („napi videó”, „vágatlan”), nem bizonyítékot. Pedig van ellenőrizhető social proof:
- létező TikTok/IG/YouTube/FB profilok követőszámmal;
- 3,5 év napi ECO-gyakorlat;
- konkrét képzőintézmény neve (a Story sem nevezi meg).

Egyetlen link sem vezet a profilokra ebből a szekcióból. Ma ezek csak a footerben és a köszönőoldalon érhetők el.
**Javaslat:**
- Tegyél ide platformonként linkelt ikonsort, követőszámmal ha az releváns („12 000+ követő TikTokon”).
- Nevezd meg az iskolát, és adj egy mintát, ha már van (akár egy 30 mp-es hang-előzetest).

### 🟡 Közepes — Időzített ajánlat indulás/visszaérkezés utáni stratégia nélkül
**Hely:** `src/lib/site-config.ts:61-62`, `src/components/JourneyProgress.tsx:29-34`, `Hero.tsx:137`, `Story.tsx:121-130`
**Miért probléma:** az indulás 3 nap múlva van (a mai mobil képernyőképen: „Indulásig még 3 nap van hátra”). A számláló automatikusan vált, de a copy végig jövő időben beszél („elmegyek”, „dokumentálom majd”). Dec. 4. után a hero változatlanul egy már lezárult útra toboroz (`phase === "after"` csak a számláló szövegét változtatja). Nincs „mi lesz utána” ígéret.
**Javaslat:**
- Fázisonkénti (before/during/after) headline/subheadline a már meglévő `getJourneyDayInfo` alapján.
- Az „after” fázisra egy archívum / „hallgasd meg az eddigieket” ajánlat.

### 🟢 Alacsony — Tartalmi pontatlanság: „70 napot töltök Rishikeshben”
**Hely:** `Hero.tsx:137-138`, `src/app/opengraph-image.tsx:12` („70 nap Rishikeshben”) vs. `site-config.ts:34-49` (a 70 nap ajtótól ajtóig számít, benne két utazási nappal) és `Story.tsx:123` („összesen 70 napot töltök Indiában”)
**Miért probléma:** a saját kódkomment szerint (`site-config.ts:34-37`) a 70 nap a teljes utat jelenti, nem a rishikeshi tartózkodást. Egy „nincsenek bekészített válaszaim, őszinte vagyok” pozicionálású oldalon a számok pontatlansága bizalomromboló, ha valaki kiszúrja.
**Javaslat:** „70 napos út, a nagy része Rishikeshben”, vagy egységesen „Indiában”.

### 🟢 Alacsony — Kis mikrocopy-inkonzisztenciák
**Hely:**
- `SubscribeForm.tsx:44` („küldhessek”) vs. `route.ts:105` („küldhessünk”); `route.ts:43` („nálunk”), `adatkezeles/page.tsx:64,165` („kezelünk”, „tároljuk”) vs. a mindenhol máshol E/1-es hang.
- `Story.tsx:86`: „3.5 éve” (magyarul: „3,5 éve”).

**Miért probléma:** az egész márka a személyes, egyes szám első személyű hangra épül. A „mi” a hibaüzenetekben és a jogi szövegben kilóg ebből.

---

## 3. Biztonság (Security)

### 🟠 Magas (jogi/adatvédelmi) — A cookie-sáv, a GYIK és az Adatkezelési tájékoztató valótlant állít a mérésről
**Hely:**
- `src/components/CookieConsent.tsx:120-123`: „enélkül nem futnak mérőkódok”
- `src/app/gyik/page.tsx:136-138`: „enélkül nem indul el semmilyen mérőkód”
- `src/app/adatkezeles/page.tsx:110`: „az oldal betöltésekor semmilyen mérőkód nem aktív”
- a tényleges működés: `src/components/GoogleAnalytics.tsx:17-24`

**Bizonyíték:** a `gtag.js` `afterInteractive`-vel **minden** látogatónál, feltétel nélkül betöltődik a `googletagmanager.com`-ról. A lokális Playwright-futásban a hozzájárulás előtt is megjelent a kimenő kérés (a sandbox blokkolta: `ERR_TUNNEL_CONNECTION_FAILED`). Google **Advanced Consent Mode**-ban a `denied` állapot mellett is küld cookie nélküli „ping”-eket (IP, user-agent, oldal-URL), és a script letöltése önmagában IP-címet továbbít a Google-nek (USA).
**Miért probléma:** a tájékoztatás nem felel meg a valóságnak (GDPR 13. cikk, átláthatóság). Az EU-s gyakorlat (több DPA-döntés a Google Fonts/GA ügyekben) a hozzájárulás előtti Google-scriptbetöltést is kockázatosnak tartja. Magánszemély üzemeltetőként ez a legvalószínűbb valós jogi kitettség.
**Javaslat (egyik vagy másik):**
- **(a) Szigorú, ajánlott:** a `<GoogleAnalytics />` scriptet csak `granted` után rendereld (kliens komponens, ami a `CONSENT_EVENT`-re figyel). A Consent Mode default maradhat.
- **(b)** Hagyd az Advanced módot, de írd át mindhárom szöveget pontosra („hozzájárulás nélkül a Google csak cookie nélküli, anonim jeleket kap…”).

### 🟡 Közepes (GDPR) — A hozzájárulást nem lehet az oldalon visszavonni
**Hely:** `src/components/CookieConsent.tsx:29,103-106` (döntés után a banner soha többé nem jelenik meg), `src/app/adatkezeles/page.tsx:114-116` („a böngésződ süti-beállításaiban a tárolt adat törlésével”)
**Miért probléma:** a GDPR 7. cikk (3) szerint a visszavonásnak **ugyanolyan egyszerűnek** kell lennie, mint a megadásnak. A localStorage kézi törlése nem az.
**Javaslat:** „Süti-beállítások” link a Footerben, ami törli a `cookie-consent` kulcsot és újra megjeleníti a bannert (`setStoredConsent` már megvan, csak egy `reopen` esemény kell).

### 🟡 Közepes — Nem objektum típusú JSON body esetén az API 500-at dob (kezeletlen kivétel)
**Hely:** `src/app/api/subscribe/route.ts:71-92`
**Bizonyíték (lokális production szerveren):**
```
POST /api/subscribe  body: null          → 500
POST /api/subscribe  body: {"email":123} → 500
TypeError: b.email?.trim is not a function
```
**Miért probléma:**
- A `request.json()` bármilyen érvényes JSON-t visszaad (`null`, szám, tömb). A `body.website` / `body.email?.trim()` ilyenkor elszáll, és a kivétel a try/catch-en kívül esik.
- Támadási kockázat alacsony, de zajos 500-as logokat, hibás riasztásokat és felesleges függvényfutást okoz.
- A típusos `interface SubscribeBody` hamis biztonságérzetet ad.

**Javaslat:** futásidejű séma-ellenőrzés: `typeof body === "object" && body !== null`, a mezőkre `typeof … === "string"`, és hosszkorlát (email ≤ 254, firstName ≤ 100). Adj hozzá két tesztesetet a `route.test.ts`-hez.

### 🟢 Alacsony — A Kit API hívásoknak nincs timeoutja
**Hely:** `src/app/api/subscribe/route.ts:132-152`
**Miért probléma:** ha a Kit lassan válaszol, a függvény a Vercel max. futásidejéig lóg. A látogató eközben percekig „Küldés…”-t lát, mert a kliens `fetch`-nek sincs timeoutja (`SubscribeForm.tsx:53`).
**Javaslat:** `signal: AbortSignal.timeout(8000)` mindkét Kit-hívásra; a kliensen `AbortSignal.timeout(15000)`.

### 🟢 Alacsony — Az IP-alapú rate limit hatásköre és mellékhatásai
**Hely:** `src/lib/rate-limit.ts:9-39`, `route.ts:60-69`
**Miért probléma:**
- **(1)** Memóriában, instance-onként él. Ezt a kód maga is dokumentálja, tehát best-effort.
- **(2)** 5 kérés / 10 perc / IP. Mobil CGNAT vagy egy közös wifi (pl. rendezvény, ahol a QR-kódot sokan egyszerre olvassák be) mögött valódi látogatókat blokkolhat.
- **(3)** A `sweep()` minden kérésnél végigjárja a teljes Map-et. Ez most elhanyagolható, de O(n).

**Javaslat:** a limitet emeld 10–20-ra, vagy kulcsold IP + email hash-re. Ha a forgalom nő, válts Upstash/Vercel KV-ra (a modul már erre van előkészítve).

### 🟢 Alacsony — Security header finomhangolás
**Hely:** `next.config.mjs:14-47`
**Bizonyíték:** a lokális `curl -I /` válaszában benne van az `X-Powered-By: Next.js`, és nincs `Strict-Transport-Security`.
**Miért probléma / javaslat:**
- `poweredByHeader: false` a `nextConfig`-ba.
- HSTS: a Vercel custom domaineken alapból küld HSTS-t. Az élő domaint innen nem értem el, ezért ellenőrizd egy `curl -I https://www.akardosbalint.hu`-val. Ha hiányzik, add hozzá: `max-age=63072000; includeSubDomains; preload`.
- A CSP `script-src 'unsafe-inline'` dokumentált kompromisszum (`next.config.mjs:1-6`). Az XSS-védelmet gyakorlatilag kiiktatja, de mivel nincs felhasználói tartalom-renderelés, a kockázat alacsony.
- `img-src` nem engedi a `*.google-analytics.com`-ot. A GA4 bizonyos fallback-útvonalai pixelt használnak. Böngészőben ellenőrizd a CSP-violationöket consent után.

### 🟢 Alacsony — A preview deploymentek az éles Kit kulcsot és formot használják
**Hely:** Vercel env: `KIT_API_KEY`, `KIT_FORM_ID` → target: `preview, production` (MCP-lekérdezés)
**Miért probléma:** a 22 branch bármelyikének preview URL-jén tesztelt feliratkozás valódi feliratkozót hoz létre az éles listán, és elindítja az éles double opt-in / üdvözlő szekvenciát. Ez szennyezi a listát és a metrikákat.
**Javaslat:** külön teszt-form (`KIT_FORM_ID` preview-ra), vagy preview-n mock mód.

### 🟢 Alacsony — Függőségek (`npm audit`: 1 high, 3 moderate)
**Bizonyíték:**
```
postcss <=8.5.22 (next/node_modules/postcss, tranzitív) — high: XSS a stringify-ban, fájlolvasás sourceMappingURL-lel
@vitest/mocker / vitest 3.2.7 — moderate: path traversal (csak dev/test)
```
**Értékelés:** a PostCSS csak build időben fut, felhasználói CSS-bemenet nélkül, tehát futásidejű kockázata gyakorlatilag nincs. A vitest dev-only. A `next` 15.5.25 → **15.5.26** patch elérhető (`npm outdated`); ezt érdemes azonnal felvenni. A teljes javítás Next 16-tal jönne (breaking).

### ✅ Rendben lévő pontok (ellenőrizve)
- Nincs hardcode-olt titok. A `KIT_API_KEY` csak szerveren él, a GA Measurement ID publikus adat (`site-config.ts:67`).
- Van honeypot, kliens- és szerveroldali email-validáció közös regexszel, és a consent szerveroldalon is kötelező.
- `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy` és `Permissions-Policy` aktív.
- **N/A:** auth, session, JWT, jogosultságkezelés, IDOR, SQL injection. Nincs felhasználói fiók és nincs adatbázis. A CSRF-hatás minimális: a végpont nem cookie-alapú, és a legrosszabb eset egy double opt-in email.

---

## 4. Struktúra és architektúra

A `src/app` (route-ok) / `src/components` / `src/lib` hármas tagolás a projekt méretéhez illő. Nincs túltervezés. Az üzleti logika (journey, rate limit, validáció, theme) kiemelt, tesztelhető `lib/` modulokban van.

### 🟡 Közepes — A `react@18` + Next 15 App Router párosítás: a típusok és a futásidő elcsúszik
**Hely:** `package.json:14-16,19-21` (`react ^18`, `@types/react ^18`)
**Miért probléma:** a Next 15 App Router a saját, beépített React 19 (canary) verzióját használja futásidőben, függetlenül a `package.json`-ban megadott React 18-tól. A típusok (`@types/react 18`) ezért nem a ténylegesen futó React API-t írják le, a Vitest-tesztek pedig React 18-cal futnának, ha komponenst tesztelnének. A Next 16-os migrációnál ez biztosan előjön.
**Javaslat:** emeld `react`/`react-dom`/`@types/react*` → 19-re, amikor a Next 16-os upgrade-et tervezed. Nem sürgős, de egy lépésben érdemes.

### 🟢 Alacsony — Elavult a README, és téves információt ad
**Hely:** `README.md:1-4` („Tudatosság és Jelenlét”, „Next.js 14”), `:62-69` (egy már nem létező sikerüzenetet idéz: „Gratulálok, ezzel meg is vagyunk…”), `:71-75` (a `/adatkezeles` oldalt „kitölthető sablonnak, `[szögletes zárójeles]` placeholderekkel” írja le, pedig már ki van töltve), `:82-85` (A–D headline, valójában A–F); a `/koszonom` → `/megerositve` flow és a Kit „Success page” beállítás nincs leírva.
**Miért probléma:** a következő fejlesztő (vagy AI-asszisztens) ebből indul ki.

### 🟢 Alacsony — Repo-higiénia: 22 remote branch, ebből sok már mergelt
**Hely:** `git ls-remote --heads origin` → 22 branch (`claude/*`, `fix/*`)
**Javaslat:** a mergelt branch-ek törlése, és a GitHubon az „Automatically delete head branches” bekapcsolása.

### N/A — Adatbázis-séma, indexek, REST-konvenciók
Nincs adatbázis. Egyetlen, egycélú `POST` route van, amit a Kit tárol.

---

## 5. Clean code

A kód minősége összességében **jó**: konzisztens elnevezések, kis komponensek, és kiemelkedően hasznos „miért”-kommentek (pl. `Hero.tsx:95-104` a mobil tap-bugról, `CookieConsent.tsx:9-18`).

### 🟡 Közepes — Duplikált oldal-sablon a `/koszonom` és a `/megerositve` között
**Hely:** `src/app/koszonom/page.tsx:19-24,77-99` és `src/app/megerositve/page.tsx:21-26,86-108` (azonos `socialLinks` tömb és „Amíg vársz, kövess élőben” blokk). A social-link lista összesen **5 helyen** van újraírva: `Footer.tsx:11-22`, `gyik/page.tsx:77-111`, a két fenti oldal, illetve a `SocialProof`-ból hiányzik.
**Bizonyíték:** a 1. pontban leírt kontraszthibát az előző javításkor pont ezért nem kapta el senki. Egy helyen javítva lett, a másolatokban nem.
**Javaslat:** `<SocialLinks variant="inline|footer" />` komponens a `siteConfig.social`-ból generálva.

### 🟢 Alacsony — A cookie-sáv és a StickyCTA ugyanazt az IntersectionObserver-logikát duplikálja
**Hely:** `CookieConsent.tsx:18,49-76` és `StickyCTA.tsx:11,37-62` (azonos `SUBSCRIBE_FORM_IDS` konstans és observer-minta)
**Javaslat:** egy `useSubscribeFormInView()` hook a `lib/`-ben. A form-id-k egy helyen éljenek (ma a `Hero.tsx:174` és a `SecondCTA.tsx:35` is literálként írja őket).

### 🟢 Alacsony — A téma-logika szándékos duplikációja (JS-string)
**Hely:** `src/lib/theme-schedule.ts:60-62` vs. `:22-52`
**Megjegyzés:** a duplikáció dokumentált és indokolt (inline FOUC-script). Egy unit teszt, ami `eval`-lal lefuttatja a `themeInitScript()`-et egy mock DOM-on, és összeveti a `resolveIsDark`-kal, biztosítaná, hogy a kettő ne csússzon szét.

### 🟢 Alacsony — Build-időben befagyott évszám a Footerben
**Hely:** `src/components/Footer.tsx:44`: `new Date().getFullYear()` egy statikusan prerenderelt server komponensben
**Miért probléma:** az évszám a build pillanatában rögzül. 2027-ben újradeploy nélkül „© 2026” marad. Kozmetikai.

### 🟢 Alacsony — Elavult/no-op beállítások
**Hely:**
- `GoogleAnalytics.tsx:23`: az `anonymize_ip: true` Universal Analytics-paraméter, GA4-ben hatástalan (a GA4 alapból nem tárol IP-t).
- `npm run lint`: a `next lint` a Next 15.5-ben deprecated, a build-kimenet is jelzi. A Next 16-ban megszűnik.

**Javaslat:** töröld az `anonymize_ip`-et, és migrálj ESLint CLI-re (`npx @next/codemod@canary next-lint-to-eslint-cli .`).

### 🟢 Alacsony — Tesztlefedettség: a kritikus logika fedett, a kliens-flow nem
**Hely:** `src/lib/journey.test.ts` (7), `src/lib/rate-limit.test.ts` (6), `src/app/api/subscribe/route.test.ts` (10), összesen 23 ✅
**Hiányzik:**
- (1) a nem-objektum body esetei (lásd 3. pont);
- (2) a `themeInitScript` ↔ `resolveIsDark` ekvivalencia;
- (3) egy Playwright smoke-teszt a teljes feliratkozási flow-ra, mockolt API-val (form kitöltése → `/koszonom`);
- (4) egy link-/asset-ellenőrzés, amely a hiányzó `koszonom.mp4`-et elkapta volna.

---

## 6. Teljesítmény

**Mért értékek** (lokális production build, Playwright/Chromium):

| Forgatókönyv | LCP | LCP elem | CLS |
|---|---|---|---|
| Desktop 1440×900 | 0,94 s | H1 | 0,002 |
| Mobil 390×844, throttling nélkül | 1,26 s | subheadline `<p>` | 0 |
| Mobil, 4× CPU + lassú 4G (1,6 Mbps, 150 ms) | **4,42 s** | subheadline `<p>` | 0,014 |

Lokálisan a TTFB ~0. Élesben (Vercel CDN, magyar mobilhálózat) ehhez még hozzáadódik a hálózati késés.

### 🟠 Magas — A hero tartalma (H1, subheadline, form) a szerver-HTML-ben láthatatlan: az LCP a JS-hidratálástól függ
**Hely:** `src/components/Hero.tsx:122-126,131-134` (`initial={{ opacity: 0, y: 16 }}`), `:168-176` (`Stagger` → `initial="hidden"`, a formot is elrejti); `src/components/Header.tsx:36-39`; `AnimatedSection.tsx:30`
**Bizonyíték:** JavaScript nélküli rendernél (Playwright `javaScriptEnabled: false`) a `h1` computed opacity **0**, a `#feliratkozas` form effektív opacity **0**. Az első képernyő teljesen üres, csak a háttér látszik. Lassított mobilon az LCP 4,42 s, ami a Google „rossz” sávja (> 4 s). Az LCP-elem azért rajzolódik ki ennyire későn, mert a Framer Motionnek előbb le kell töltődnie, parse-olódnia és hidratálnia kell (a `/` oldal JS-e 164 kB).
**Miért probléma:**
- **CRO:** a lassú hálózaton érkező mobil látogató (a fő célközönség TikTokról/IG-ről jön) másodpercekig üres oldalt lát.
- **SEO:** a Core Web Vitals LCP ranking-jel.
- **Robusztusság:** ha a JS bármiért elbukik (pl. egy in-app böngésző blokkol valamit, vagy egy chunk nem töltődik be), a feliratkozó form **soha nem jelenik meg**.

A kódkomment (`Hero.tsx:113-121`) már felismerte a problémát, de csak rövidítette az animációt, a kiinduló `opacity:0`-t nem szüntette meg.
**Javaslat:**
- A H1-en, a subheadline-on és a hero formon `initial={false}`, vagy csak a `y` animáljon, opacity nélkül.
- Alternatíva: tisztán CSS-es belépő animáció (`@keyframes` + `animation-fill-mode: both`, amit a `prefers-reduced-motion` szabály már kezel).
- A hajtás alatti `AnimatedSection`-öknél elfogadható a jelenlegi minta.

### 🟡 Közepes — Framer Motion minden oldalon, főleg dekorációhoz
**Hely:** 14 `"use client"` komponens importálja (`grep -l framer-motion src -r`). A legnagyobb közös chunk 54,2 kB.
**Miért probléma:** a `/` First Load JS 164 kB (az előző auditnál 149 kB, tehát nő). A használat többsége fade/translate/hover-scale, amit CSS is meg tud oldani. Ez az INP-t és a fenti LCP-t is rontja gyenge telefonokon.
**Javaslat:**
- `LazyMotion` + `domAnimation` + `m.*` komponensek (jellemzően −20–30 kB).
- A `HoverLiftCard`, `SectionPath` és a gombok `whileHover`/`whileTap` effektusai mehetnek CSS-transitionre.

### 🟢 Alacsony — A köszönőoldal nem optimalizált posztert tölt be
**Hely:** `src/app/koszonom/page.tsx:48`: `poster="/images/kardos-balint-profil.jpg"` (410 KB-os JPEG, a `next/image` pipeline-t megkerülve)
**Javaslat:** kisebb, WebP/AVIF poszter (≈ 40–60 KB), vagy a videó-probléma rendezésekor saját, tömörített poszterkép.

### 🟢 Alacsony — Mindkét fejléc-logó `priority`-vel preloadolódik
**Hely:** `src/components/Header.tsx:54,62`. Az előző auditból nyitva maradt. Egyszerre csak az egyik látszik, mégis mindkettő preloadolódik. A megoldás: egyetlen `currentColor`-os inline SVG, ami egyben a 1. pont halványsági problémáját is megoldja.

### 🟢 Alacsony — Az OG-kép minden kérésnél lemezről olvassa és base64-eli a logót
**Hely:** `src/lib/og-image.tsx:8-11`. Statikusan prerenderelt route-oknál ez gyakorlatilag csak build-időben fut, tehát informatív tétel.

### ✅ Rendben
- `next/font` self-hosted fontok, `display: swap`.
- A portré `next/image`, `sizes`-szal.
- Minden oldal statikus (`○`), 1 éves `s-maxage`.
- Nincs felesleges kliens-oldali adatlekérés.
- A `prefers-reduced-motion` globálisan kezelve van.

---

## 7. SEO

### 🟡 Közepes — Nincs strukturált adat (JSON-LD)
**Hely:** a teljes `src/`-ben nincs `application/ld+json` (`grep` üres)
**Miért probléma:** két olcsó, releváns lehetőség marad ki:
- `FAQPage` séma a `/gyik`-re (11 kérdés kész van, `gyik/page.tsx:28-190`);
- `Person` + `WebSite` séma a főoldalra (`sameAs` = a 4 social profil).

Ezek a márkanévre („Kardos Bálint”) keresve knowledge panel / rich result esélyt adnak.
**Javaslat:** egy `<script type="application/ld+json">` a `layout.tsx`-ben (Person/WebSite) és a `gyik/page.tsx`-ben (FAQPage), a meglévő `siteConfig`-ból generálva.

### 🟢 Alacsony — `robots.txt` Disallow + `noindex` ütközés
**Hely:** `src/app/robots.ts:9` (`/koszonom`, `/megerositve` tiltva) és `koszonom/page.tsx:16`, `megerositve/page.tsx:18` (`noindex`)
**Miért probléma:** ha a robots.txt tiltja a crawlolást, a Google nem látja a `noindex` tag-et. Egy külső hivatkozás esetén az URL tartalom nélkül bekerülhet az indexbe. Két védelem egymás hatását oltja ki.
**Javaslat:** vedd ki a két útvonalat a `disallow`-ból, a `noindex` elég.

### 🟢 Alacsony — A `sitemap.ts` minden kérésnél „most”-ot ad `lastModified`-ként
**Hely:** `src/app/sitemap.ts:8,14,20,26`. Élesben ellenőrizve: `<lastmod>2026-09-23T17:48:15Z</lastmod>` build-időre fagyva, minden oldalra ugyanaz. Az előző auditból nyitva maradt.
**Javaslat:** fix dátumok (pl. a jogi oldalakon már szereplő „Hatályos” dátum).

### 🟢 Alacsony — A `*.vercel.app` domain nem irányít át a fő domainre
**Hely:** Vercel domainek (MCP): `balintkalandjai-hu.vercel.app` redirect nélkül
**Miért probléma:** duplikált tartalom két hoszton. A canonical (`metadataBase` = `www.akardosbalint.hu`) ezt nagyrészt kezeli, tehát alacsony.
**Javaslat:** Vercel → Domains → a `.vercel.app` domainen „Redirect to www.akardosbalint.hu” (308).

### 🟢 Alacsony — Az OG-kép generikus fontot használ
**Hely:** `src/lib/og-image.tsx:13-87`. A generált kép Satori alapfonttal (Noto Sans) renderel. Az ékezetek helyesek (ellenőrizve, a `ő` rendben van), de nem Fraunces, és a logó 76 px-es, halvány vonalas rajz. A brand-élmény gyengébb a megosztásokban, ami a TikTok/IG-ről érkező forgalomnál a fő belépő vizuál.
**Javaslat:** a Fraunces TTF betöltése `fonts` opcióval, és a portré beemelése az OG-képre (az arc növeli a CTR-t).

### ✅ Rendben
- Egyedi title/description oldalanként.
- A canonical a bekötött domainre mutat.
- OG/Twitter oldalanként, helperrel.
- `lang="hu"`, `hu_HU` locale.
- Címhierarchia: minden oldalon pontosan egy `h1`, ugrás nélküli `h2`/`h3`.
- A sitemap csak indexelhető oldalakat tartalmaz.
- A `/privacy-policy` → `/adatkezeles` típusú 308-as redirectek működnek.

---

## Top 10 azonnali teendő (hatás / erőfeszítés szerint)

| # | Teendő | Súlyosság | Erőfeszítés | Hivatkozás |
|---|---|---|---|---|
| 1 | Töltsd fel a köszönővideót, **vagy** vedd ki a `<video>` blokkot a `/koszonom` oldalról, és a „Nem látod a levelet?” doboz kerüljön előre | 🟠 Magas | Triviális | 1. pont |
| 2 | A hero H1/subheadline/form ne induljon `opacity:0`-ról (`initial={false}` vagy CSS-animáció) → gyorsabb LCP, JS nélkül is látszik a form | 🟠 Magas | Kicsi | 6. pont |
| 3 | GA: a gtag.js csak hozzájárulás után töltődjön be, **vagy** a cookie-sáv, a GYIK és az Adatkezelési tájékoztató szövege legyen pontos | 🟠 Magas | Kicsi | 3. pont |
| 4 | Konverziómérés: `generate_lead` esemény sikeres feliratkozáskor, `subscribe_error` hibánál, form-azonosítóval | 🟠 Magas | Triviális | 2. pont |
| 5 | Az API futásidejű inputellenőrzése (objektum/string típus, hosszkorlát) + 2 teszteset → nincs több 500-as hiba | 🟡 Közepes | Triviális | 3. pont |
| 6 | „Süti-beállítások” link a Footerben (a hozzájárulás visszavonhatósága), és a `Footer` bekötése a `layout.tsx`-be, hogy az aloldalakon is legyen | 🟡 Közepes | Kicsi | 3. és 1. pont |
| 7 | Form a11y: a mezőkeret kontrasztja ≥ 3:1, `aria-invalid`/`aria-describedby` a hibákra, fókusz a hibás mezőre; `/60` → `/65` a két poszt-konverziós oldalon | 🟡 Közepes | Kicsi | 1. pont |
| 8 | Hero-copy: rövidebb subheadline, a „Heti 1 hangfelvétel…” ígéret a gomb fölé; a „70 nap Rishikeshben” pontosítása | 🟡 Közepes | Kicsi (copy) | 2. pont |
| 9 | JSON-LD: `FAQPage` a `/gyik`-re, `Person`/`WebSite` + `sameAs` a főoldalra; a `/koszonom`, `/megerositve` kivétele a robots `disallow`-ból | 🟡 Közepes | Kicsi | 7. pont |
| 10 | Ellenőrizhető bizalmi jelek a „Miért higgy nekem” szekcióba (profil-linkek követőszámmal, a képzőhely neve) + CTA/form a `/gyik` oldalra | 🟡 Közepes | Kicsi–közepes | 2. és 1. pont |

**Következő kör (nem azonnali):**
- Framer Motion → `LazyMotion`/CSS (bundle −20–30 kB);
- fázisfüggő hero-copy (before/during/after), mert az út 3 nap múlva indul;
- külön Kit teszt-form a preview környezetre;
- `next` 15.5.26 patch, majd Next 16 + React 19 migráció;
- README frissítése;
- `SocialLinks` komponens a duplikáció ellen;
- a mergelt branch-ek törlése.

---

## Összegzés

Az előző audit **minden** kritikus és magas prioritású tétele lezárult: a domain be van kötve, a Kit kulcsok be vannak állítva, a Next.js CVE-k rendezve, van rate limit, honeypot, security header, teszt és CI. A kódbázis tiszta, kicsi, jól dokumentált.

A mostani kör problémái **nem mély kódhibák**, hanem a konverziós út szélein ülnek:
- a feliratkozás **utáni** első képernyő (törött videó, rácsúszó banner, kontraszthiba);
- a feliratkozás **előtti** első másodpercek (láthatatlan hero hidratálásig, sűrű copy);
- a **mérés** hiánya (nincs konverziós esemény);
- a **jogi szövegek pontossága** a GA-betöltésről.

Mind a tíz azonnali teendő napokon belül elvégezhető. Mivel az utazás 3 nap múlva indul, és várhatóan akkor jön a legtöbb forgalom, az 1–4. pontot érdemes még indulás előtt élesíteni.

---

Szólj, ha szeretnéd, hogy elkezdjem kijavítani a talált problémákat, és ha igen, milyen sorrendben. Például:
- **(a)** a Top 10 lista sorrendjében;
- **(b)** csak az indulás előtt kritikus 1–4. pontot most, a többit külön körben;
- **(c)** saját válogatás szerint.

A videó feltöltése (1. pont) és a JSON-LD-hez szükséges követőszámok (10. pont) a te bemenetedet igénylik. A többit kódból el tudom végezni.
