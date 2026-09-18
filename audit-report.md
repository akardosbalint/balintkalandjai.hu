# Audit-jelentés — balintkalandjai.hu / Kardos Bálint feliratkozó oldal

**Dátum:** 2026-09-18 (javítási kör: ugyanaznap, lásd alul)
**Vizsgált branch/commit:** `claude/mit-kell-meg-megcsinalni-cfolta` @ `a35f4d6` (production branch legutóbbi mergelt állapota — a lenti javítások ehhez képest készültek, a jelentés eredeti szövege szándékosan változatlan, csak ✅ jelölés került a már megoldott tételekhez)

> **Javítási kör állapota:** a Top 10 lista #3–#10 tétele kódszinten megvalósult és commitolva van ugyanezen a branchen (lásd az egyes tételeknél a ✅ jelölést és a commit-hivatkozást). A #1 (MailerLite env változók) és #2 (custom domain bekötése) továbbra is Vercel dashboard / DNS művelet, kódból nem elvégezhető — ezekhez a tulajdonos hozzáférése szükséges.

**Módszer:** teljes forráskód-átvizsgálás (minden `.ts`/`.tsx` fájl elolvasva), `npm run build`, `npm run lint` (`next lint`), `npm audit`, kontraszt-számítás a tényleges Tailwind szín-tokenekre (WCAG relatív luminancia képlet), élő Vercel projekt-metaadatok (domainek, deploymentek) lekérdezése az MCP integráción keresztül. Böngészős/vizuális (Lighthouse, valódi screenshot) tesztelés **nem** történt — ahol ez számítana, jelölve van.

---

## 0. Mit találtam — gyors áttekintés

| | |
|---|---|
| **Stack** | Next.js 14.2.35 (App Router), TypeScript (strict), Tailwind CSS 3.4, Framer Motion 13.1, self-hosted Google Fonts (`next/font`) |
| **Méret** | 35 forrásfájl, ~2 800 sor kód összesen (a legnagyobb fájl 259 sor) |
| **Backend** | Nincs saját backend/adatbázis. Egyetlen szerver-oldali route: `POST /api/subscribe`, ami proxyként hívja a MailerLite API-t |
| **Auth** | Nincs — nincs bejelentkezés, felhasználói fiók, session, jogosultságkezelés |
| **Cél** | Egyoldalas (+ 3 jogi aloldal) magyar nyelvű feliratkozó/landing oldal egy 67 napos indiai jógaoktatói képzés heti hangfelvételéhez; a konverziós cél kizárólag az email-feliratkozás |
| **Deploy** | Vercel, automatikus GitHub-integrációval; legutóbbi production deploy (`dpl_FYT8Qg…`) sikeres |
| **Tesztek** | 0 db (nincs `*.test.*`/`*.spec.*` fájl, nincs CI) |
| **Build/Lint** | `npm run build` ✅ hibátlan, `next lint` ✅ 0 figyelmeztetés |

A kódbázis kicsi és tiszta — nincs benne backend-komplexitás (DB, auth, IDOR-kockázat), ezért az audit sablon több pontja (adatbázis-séma, jogosultságkezelés, session/JWT) **nem értelmezhető** erre az architektúrára; ezeknél ezt explicit jelzem, nem hagyom üresen.

A legsúlyosabb tényleges problémák nem a kódban, hanem a **deploy-konfigurációban** vannak: a saját domain nincs bekötve a Vercel projektbe, és a MailerLite kulcsok megléte innen nem ellenőrizhető — enélkül a fő konverziós funkció (feliratkozás) és a teljes SEO/megosztási réteg (canonical, sitemap, OG) élesben nem feltétlenül működik.

---

## 1. UX/UI

### 🟡 Közepes — Kényszerített nappal/éjszaka téma, felhasználói felülbírálás nélkül ✅ Javítva (`48a7e5d`)
**Hely:** `src/components/ThemeSchedule.tsx:10-18`, `src/lib/theme-schedule.ts:5-18`, `src/app/layout.tsx:87-89`
**Miért probléma:** A téma (light/dark) kizárólag a látogató **helyi óraidejéből** (6:00–19:00 = light, egyébként dark) dől el, percenként újraszámolva (`ThemeSchedule.tsx:28`). Nincs figyelembe véve az OS `prefers-color-scheme` beállítása, és **nincs kézi kapcsoló** — egy este böngésző látogató nem tud light módra váltani, ha azt szeretné, és fordítva. Ez felhasználói kontroll-vesztést okoz, és hibaként hathat ("miért mindig sötét ez az oldal éjjel").
**Javaslat:** Alapértelmezésként `prefers-color-scheme`-t használni, a nappal/éjszaka logikát csak "javaslatként" alkalmazni ha a látogató még nem választott kézzel, és egy kis nap/hold ikon-kapcsolót tenni a Header-be, amit `localStorage`-ban megjegyez (hasonlóan a meglévő `cookie-consent` mintához az `analytics.ts`-ben).

### 🟡 Közepes — A `Term` tooltip nincs programozottan összekötve a triggerrel ✅ Javítva (`f5e5e2d`)
**Hely:** `src/components/Term.tsx:66-73` (trigger `<button>`) és `:82-96` (popup `<span>`)
**Miért probléma:** A trigger gombon van `aria-expanded={open}`, de nincs `aria-controls` a popup elem `id`-jára mutatva, és a popup `<span>`-nek nincs is `id`-ja vagy `role`-ja. Képernyőolvasó így csak annyit közöl, hogy "gomb, lenyitva/összecsukva" — a megjelenő magyarázó szöveg és a gomb kapcsolata nincs explicit módon expozíciózva (WCAG 4.1.2 Name/Role/Value). A DOM-sorrend miatt a tartalom a legtöbb screen readerrel gyakorlatilag még kiolvasható, de ez esetlegesség, nem garancia.
**Javaslat:** Adj a popup `<span>`-nek `id={\`${uid}-definition\`}`-t (a komponens már generál `uid`-t máshol is a projektben, pl. `SubscribeForm.tsx:20`, `Faq.tsx:17`), és tedd a triggerre `aria-controls`-t + `aria-describedby`-t erre az id-re.

### 🟡 Közepes — WCAG AA kontraszthiba a sikeres feliratkozás utáni szövegben (számított, konkrét) ✅ Javítva (`f5e5e2d`)
**Hely:** `src/components/SubscribeForm.tsx:128` — `text-sm text-ink-900/60` (light módban)
**Miért probléma:** Kiszámoltam a tényleges renderelt színt (`ink-900` #241C15, 60% alfa, `sand-50` #FBF7F1 háttéren): a kontrasztarány **4.33:1**, ami **AA szinten (4.5:1) bukik** normál méretű (14px, nem "large text") szövegre. Ez pontosan az "Amíg vársz, kövess élőben:" sor a sikeres feliratkozás utáni állapotban — vagyis épp azok a látogatók futnak bele, akik sikeresen konvertáltak, és a következő lépésre (közösségi média követés) invitálod őket. Sötét módban ugyanez `sand-100/60` már 5.84:1-gyel megfelel — csak a light mód hibás.
Ellenőrzésképpen az összes többi `ink-900/NN` és `sand-100/NN` előfordulást (14 hely) végigszámoltam a kódban ténylegesen használt háttérszínekkel — ez az **egyetlen** konkrét AA-bukás, a többi (`/65` és往 felfelé) 5:1 fölött van.
**Javaslat:** `text-ink-900/60` → legalább `text-ink-900/65` (5.08:1) a `SubscribeForm.tsx:128` sorban, csak a light-mód variánsra (a dark:sand-100/60 maradhat).

### 🟢 Alacsony — Header logo: két kép egyszerre preloadolva
**Hely:** `src/components/Header.tsx:9-24`
**Miért probléma:** Light és dark logo egyaránt `priority` propot kap (`Header.tsx:15`, `:23`), miközben a másik csak `dark:hidden`/`hidden dark:block` CSS-sel van elrejtve. A `priority` egy `<link rel="preload">`-ot generál — mindkét kép letöltődik/preloadolódik, holott egyszerre csak az egyik látszik. (Ez a Core Web Vitals/teljesítmény szempontból is releváns, lásd 6. pont P2.)
**Javaslat:** Csak a ténylegesen aktív témához tartozó logót jelöld `priority`-nak (pl. egy kliens-oldali "melyik téma aktív" ellenőrzéssel), vagy cseréld egyetlen, `currentColor`-ral színezhető SVG-re, hogy egyáltalán ne kelljen két raszteres fájl.

### 🟢 Alacsony — Külső linkek nem jelzik, hogy új lapon nyílnak
**Hely:** `src/components/Footer.tsx:11-22`, `src/components/SubscribeForm.tsx:131-162`, `src/app/gyik/page.tsx:77-113`
**Miért probléma:** Minden social link `target="_blank"`, de sem vizuálisan (ikon), sem `aria-label`/`sr-only` szöveggel nincs jelezve, hogy új fülön nyílik — ez gyakori WCAG best-practice ajánlás (3.2.5), kifejezetten screen reader felhasználóknak segít felkészülni a kontextusváltásra.
**Javaslat:** `aria-label="TikTok (új lapon nyílik)"` típusú kiegészítés, vagy egy vizuális "↗" ikon a linkek mellé.

### 🟢 Alacsony — `rel="noreferrer"` `noopener` nélkül
**Hely:** összes `target="_blank"` link (pl. `Footer.tsx:11`, `SubscribeForm.tsx:133`, `Story.tsx:89`, `gyik/page.tsx:79`)
**Miért probléma:** Modern böngészők a `noreferrer`-t implicit `noopener`-ként is kezelik, de az iparági konvenció (és néhány régebbi böngésző/eszköz) mindkettőt együtt várja el (`rel="noreferrer noopener"`). Triviális, alacsony kockázatú, de egyszerű globális csere.

---

## 2. CRO (Conversion Rate Optimization)

### 🔴 Kritikus — A hirdetett domain nem éri el az oldalt (lásd részletesen az 5. és 7. pontban is)
**Hely:** `src/lib/site-config.ts:8` (`url: "https://tudatossagesjelenlet.hu"`) vs. élő Vercel projekt domainjei
**Miért probléma:** Az élő Vercel projekten (`balintkalandjai-hu`, csapat: `akardosbalint`) jelenleg **kizárólag** ezek a domainek vannak bekötve:
```
balintkalandjai-hu.vercel.app
balintkalandjai-hu-akardosbalint.vercel.app
balintkalandjai-hu-git-claude-yoga-landing-6acbf1-akardosbalint.vercel.app
```
A `tudatossagesjelenlet.hu` — amire a `metadataBase`, minden canonical URL, az összes OG-kép, a `sitemap.xml` és a `robots.txt` `sitemap:` sora hivatkozik — **nincs bekötve**. Ha bármilyen forgalmat (hirdetés, social media bio-link, kereső-találat) erre a domainre irányítasz, az vagy nem oldódik fel, vagy nem ehhez a projekthez ér. Ez a legnagyobb egyedi konverziós szivárgás az egész oldalon: bármennyire jó a copy és a form UX, ha a domain nem működik, 0% a konverzió az arra érkező forgalomból.
**Javaslat:** Vercel dashboard → Settings → Domains alatt kösd be a `tudatossagesjelenlet.hu`-t (vagy döntsd el, hogy végleg a `balintkalandjai.hu` a márka-domain, és akkor a `site-config.ts`-t kell hozzáigazítani).

### 🟠 Magas — Nincs semmilyen visszaélés elleni védelem a feliratkozó endpointon ✅ Javítva (`f5e5e2d`) — honeypot + IP rate limit
**Hely:** `src/app/api/subscribe/route.ts` (teljes fájl)
**Miért probléma:** A route nem alkalmaz rate limitet, honeypot mezőt vagy CAPTCHA-t. Bárki, aki ismeri az endpointot, tetszőleges gyakorisággal POST-olhat rá tetszőleges (akár mások) email címmel. Ennek két konkrét kockázata van: (1) a MailerLite API díjköteles/kvótás hívásainak felégetése egy botolt spam-kitöltéssel, (2) harmadik felek email címének "bejelentetlen" feliratkoztatása, ami — bár a double opt-in miatt tényleges feliratkozást nem eredményez — zaklató megerősítő emailekhez vezethet, és rontja a küldő domain reputációját a MailerLite-nál.
**Javaslat:** Legalább egy egyszerű honeypot mező (rejtett input, amit botok kitöltenek, emberek nem) + egy IP-alapú rate limit (pl. Vercel KV/Upstash, vagy akár egy egyszerű in-memory sliding window, ha a traffic alacsony).

### 🟡 Közepes — A hero value proposition érzelmi horgot ad, nem azonnal konkrét ígéretet
**Hely:** `src/components/Hero.tsx:60,93-128`
**Miért probléma:** A jelenleg aktív headline ("31 éven keresztül lemaradtam a saját életemről.") és a subheadline identitás-alapú, nem ígéret-alapú horog — ez a kódkommentek szerint (`Hero.tsx:31-58`) **tudatos döntés**, és a fájl már tartalmaz 4 alternatív (A–E) headline-variációt A/B teszteléshez. CRO szempontból ez azt jelenti: egy hideg, a személyes brandet nem ismerő látogató az első 5 másodpercben érzelmi állítást kap, nem konkrét payoffot ("mit kapok, ha feliratkozom") — ez a `WhatYouGet` szekcióig görgetve derül ki. Ez nem feltétlenül hiba (lehet, hogy pont ez konvertál jobban erre a közönségre), de mivel a kód maga is A/B tesztre készült fel, **nincs jele, hogy ez a teszt ténylegesen fut** (nincs feature flag/query param kötés, csak egy statikus `activeHeadline` konstans).
**Javaslat:** Kösd be ténylegesen egy A/B tesztelő eszközbe (a kód már felkészítve van rá a kommentek szerint), és mérd a hero-variánsok feliratkozási rátáját, mielőtt eldöntenéd, melyik marad.

### 🟢 Alacsony–Közepes — A CTA-szöveg mindenhol azonos, a `ctaLabel` prop kihasználatlan
**Hely:** `src/components/SubscribeForm.tsx:16-19` (van `ctaLabel` prop, default: "Gyere, tarts velem"), `src/components/SecondCTA.tsx:35` (nem ad át egyedi `ctaLabel`-t), `src/components/StickyCTA.tsx:84` (statikus, azonos szöveg)
**Miért probléma:** A `SubscribeForm` komponens már támogat egyedi CTA-szöveget kontextusonként, de a `SecondCTA` (ami explicit az olvasóra fókuszál, más szöveggel: "Ha idáig eljutottál...") mégis az alapértelmezett "Gyere, tarts velem" szöveget örökli — elszalasztott lehetőség a szekció saját hangvételéhez illő, célzottabb CTA-ra (pl. "Mutasd az utamat").
**Javaslat:** Adj át egyedi `ctaLabel`-t a `SecondCTA`-ban, ami illik "a te szög"-éhez.

### 🟢 Alacsony — Nincs élő social proof / feliratkozó-számláló
**Hely:** `src/components/SocialProof.tsx` (teljes fájl, ld. a komment `:4-11`)
**Miért probléma:** Ez a kódban **tudatosan dokumentált** döntés (nem hamis social proof, hanem "kövesd a folyamatot" keret) — nem hiba, hanem egy jelenlegi állapot (még nincs elég feliratkozó/adat egy hiteles számlálóhoz). CRO szempontból mégis érdemes megjegyezni: amint lesz néhány száz feliratkozó, egy egyszerű "X-en csatlakoztak eddig" számláló mérhetően szokott javítani a konverziós rátán, és a jelenlegi struktúra könnyen bővíthető rá.

---

## 3. Biztonság (Security)

### 🔴 Kritikus (funkcionális, nem exploit) — MailerLite kulcsok megléte innen nem ellenőrizhető
**Hely:** `src/app/api/subscribe/route.ts:51-65`
**Miért probléma:** A route helyesen, szerver-oldalon olvassa a `MAILERLITE_API_KEY`/`MAILERLITE_GROUP_ID` env változókat, és hiányuk esetén barátságos hibaüzenetet ad (`route.ts:54-65`) — ez maga **jó gyakorlat**, nincs hardcode-olt kulcs sehol a kódban (átfésültem az egész `src/`-t `api[_-]?key|secret|token|bearer|password` mintára, egyetlen találat sincs kulcs-literál, csak a helyes `process.env` hivatkozások). A probléma az, hogy ezen eszközökből nem tudom lekérdezni a Vercel projekt env change-eit — ha ezek a kulcsok hiányoznak élesben, a **teljes fő funkció** (feliratkozás) 500-as hibával elszáll minden látogatónál.
**Javaslat:** Vercel dashboard → Settings → Environment Variables alatt fizikailag ellenőrizni a két kulcs meglétét Production környezetre, és egy valódi (nem teszt-)feliratkozással végigfuttatni a flow-t élesben.

### 🟠 Magas — Next.js 14.2.35: több, a 14.x ágon nem javított CVE ✅ Javítva (`7af5afe`) — upgrade Next 15.5.25-re, a kritikus/magas CVE-k eltűntek az auditból
**Hely:** `package.json:12` (`"next": "14.2.35"`)
**Miért probléma:** `npm audit` kritikus és magas súlyosságú találatokat ad a telepített Next.js verzióra (DoS a Server Components/Image Optimization körül, cache poisoning, SSRF egyes konfigurációkban, stb. — lásd a teljes listát alább). Ellenőriztem az npm registry dist-tag-jeit: a **`next-14` tag pont a telepített `14.2.35`-re mutat** — vagyis ez már a 14-es ág legfrissebb patch-e, a projekt **nincs elmaradva** a saját major verzióján belül. A tényleges javítás csak Next 15/16-ra váltással érhető el (`npm audit fix --force` explicit jelzi: "Will install next@16.3.5, which is a breaking change").
A támadási felület ugyanakkor a projekt jelenlegi felépítése miatt szűkebb, mint amit a CVE-lista sugall: **nincs** `middleware.ts`, **nincs** Server Action (csak egy sima Route Handler), **nincs** `images.remotePatterns` konfiguráció, nincs custom szerver/WebSocket upgrade — így a Windows-RCE, a Server Action SSRF és a middleware cache-poisoning találatok itt nem relevánsak. Ami ténylegesen releváns marad: a beépített Image Optimization endpoint (amit a `next/image` automatikusan használ — `Header.tsx`, `Story.tsx`) és az App Router Server Components DoS-vektorok.
**Javaslat:** Ütemezz egy migrációt Next 15.x-re (majd onnan 16-ra) — ez major-verzió váltás App Router projektben, érdemes külön feladatként, tesztelési idővel tervezni, nem sürgősségi patch-ként.

<details>
<summary>Teljes <code>npm audit</code> kimenet (production függőségek)</summary>

```
next  9.3.4-canary.0 - 16.3.0-preview.10 — Severity: critical
  - HTTP request smuggling in rewrites (GHSA-ggv3-7p47-pfv8)
  - Unbounded next/image disk cache growth (GHSA-3x4c-7xq6-9pq8)
  - Denial of Service with Server Components (GHSA-q4gf-8mx6-v5v3, GHSA-8h8q-6873-q5fj)
  - Middleware/Proxy redirects cache-poisoned (GHSA-3g8h-86w9-wvmq)
  - XSS in App Router with CSP nonces (GHSA-ffhc-5mcf-pf4q)
  - Cache poisoning via RSC cache-busting collisions (GHSA-vfv6-92ff-j949)
  - XSS in beforeInteractive scripts with untrusted input (GHSA-gx5p-jg67-6x7h)
  - DoS in Image Optimization API (GHSA-h64f-5h5j-jqjh)
  - SSRF via WebSocket upgrades (GHSA-c4j6-fc7j-m34r)
  - Cache poisoning in RSC responses (GHSA-wfc6-r584-vfw7)
  - Middleware/Proxy bypass with i18n, Pages Router (GHSA-36qx-fr4f-26g5)
  - DoS in Server Actions (GHSA-m99w-x7hq-7vfj)
  - SSRF in Server Actions on custom servers (GHSA-89xv-2m56-2m9x)
  - Cache confusion for requests with bodies (GHSA-68g3-v927-f742, GHSA-4633-3j49-mh5q)
  - Unbounded Server Action payload in Edge runtime (GHSA-4c39-4ccg-62r3)
  - SSRF in rewrites via attacker-controlled hostname (GHSA-p9j2-gv94-2wf4)
  - Unauthenticated disclosure of internal Server Function endpoints (GHSA-955p-x3mx-jcvp)
  - Unauthenticated RCE on Windows-hosted servers (GHSA-p293-qw3h-jr36)
  - Unauthenticated RCE in Image Optimization API with AVIF (GHSA-2xp9-vwfh-vxw4)

postcss  <=8.5.22 (next.js transitive dep) — Severity: high
  - XSS via unescaped </style> in CSS stringify (GHSA-qx2v-qp2m-jg93)
  - Arbitrary file read via sourceMappingURL (GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849)
```
</details>

### 🟢 Alacsony — `postcss` build-time XSS/file-read CVE-k
**Hely:** `node_modules/next/node_modules/postcss` (tranzitív, a Next 14.2.35-höz kötve)
**Miért probléma:** A PostCSS itt kizárólag **build időben**, szerver oldalon fut (CSS fordítás), nem éri el futásidőben a látogatók böngészőjét — a valós exploit-felület gyakorlatilag nulla egy olyan pipeline-ban, ahol nincs felhasználó-vezérelt CSS bemenet. Ugyanaz a Next-upgrade oldja meg, mint a fenti pontot.

### 🟢 Alacsony — `js-yaml`/ESLint tooling dev-függőség sebezhetőség
**Hely:** `devDependencies` (`eslint-config-next` → `@next/eslint-plugin-next` → `glob`; illetve `js-yaml` 4.0.0–4.3.1)
**Miért probléma:** Kizárólag build/CI géphez kötött, dev-only eszközlánc — nincs runtime hatása az élő oldalra vagy a látogatókra. `npm audit fix` (force nélkül) megoldja a `js-yaml` részét.

### 🟡 Közepes — Nincsenek biztonsági HTTP fejlécek konfigurálva ✅ Javítva (`f5e5e2d`)
**Hely:** `next.config.mjs` (teljes fájl — csak `redirects()` van definiálva, `headers()` nincs)
**Miért probléma:** Nincs CSP, `X-Frame-Options`/`frame-ancestors`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`. A Vercel alapból nem fűz hozzá ezekhez hasonló védelmi fejléceket automatikusan. Valós kockázat itt visszafogott (nincs auth, nincs érzékeny adat, a form nem cookie-alapú, tehát CSRF-hatás minimális), de a feliratkozó formot tartalmazó oldal clickjacking elleni alapvédelme (`X-Frame-Options: DENY` vagy CSP `frame-ancestors 'none'`) egyszerű, ingyenes hardening lenne.
**Javaslat:** `next.config.mjs`-ben egy `async headers()` blokk hozzáadása minden route-ra a fenti fejlécekkel. CSP-nél figyelni kell, hogy az inline script-eket (`layout.tsx:87-89,96-109`) nonce-szal vagy hash-sel kell engedélyezni, különben eltöri a Consent Mode/téma-inicializáló scriptet.

### N/A — Auth, session, JWT, jogosultságkezelés, IDOR, adatbázis-séma
**Miért N/A:** Az alkalmazásnak nincs felhasználói fiókja, bejelentkezése, sessionje, tokenje, sem adatbázisa — a teljes állapot-tárolás a MailerLite (külső SaaS) oldalán történik, a landing oldal maga stateless. Ezekben a kategóriákban nincs mit auditálni; nem hagyom szó nélkül, mert a sablon explicit kéri, de nincs releváns kód, amire hivatkozhatnék.

---

## 4. Struktúra és architektúra

A `src/app` (route-ok) / `src/components` (prezentációs) / `src/lib` (megosztott logika) hármas tagolás kicsi, lapos, és pontosan illik a projekt méretéhez — nincs túltervezés (nincs felesleges réteg, service/repository absztrakció egy 1 endpointos appban), és nincs alultervezés sem (a metadata-építés, a consent-kezelés, a téma-logika mind saját, jól elnevezett `lib/` modulban van, nem szórva a komponensek közt).

### 🟢 Alacsony — `robots.ts` nem létező útvonalakat tilt ✅ Javítva (`f5e5e2d`)
**Hely:** `src/app/robots.ts:9`
```ts
disallow: ["/admin", "/admin/*", "/dashboard", "/dashboard/*", "/api/*"],
```
**Miért probléma:** A `/admin` és `/dashboard` útvonalak **nem léteznek** ebben a projektben (`find src/app -type d` szerint csak `adatkezeles`, `aszf`, `gyik`, `api/subscribe` van). Ez tipikusan másik projektből másolt boilerplate — önmagában ártalmatlan (a Google egyszerűen nem talál ott semmit), de megtévesztő a következő fejlesztőnek, aki azt hiheti, léteznek védett admin felületek.
**Javaslat:** Töröld a nem létező bejegyzéseket, tartsd meg az `/api/*` tiltást (az valóban hasznos).

### 🟢 Alacsony — Árva, duplikált statikus fájlok a repo gyökerében ✅ Javítva (`f5e5e2d`)
**Hely:** `/favicon.ico` (52 KB), `/kardos-balint-logo.png` (936 KB) — a repo **gyökerében**, nem a `public/` mappában
**Miért probléma:** A Next.js kizárólag a `public/` mappából és a `src/app/` speciális fájlnév-konvencióiból szolgál ki statikus tartalmat — a repo gyökerében lévő fájlokat **soha nem éri el böngésző**. Ez a két fájl duplikátuma a ténylegesen használt `src/app/favicon.ico`-nak és `public/images/kardos-balint-logo.png`-nek (utóbbi 66 KB — a gyökérben lévő verzió majdnem **15×** nagyobb, feltehetően egy korábbi, nem optimalizált export). Tisztán holt súly: ~1 MB felesleg minden klónozásnál/git historyban.
**Javaslat:** `git rm favicon.ico kardos-balint-logo.png` a repo gyökeréből.

### N/A — Adatbázis-séma, normalizáltság, indexek; REST/GraphQL konvenciók
**Miért N/A:** Nincs saját adatbázis. Az egyetlen API endpoint (`POST /api/subscribe`) egy darab, önálló célú Route Handler, nem egy erőforrás-gyűjtemény — a klasszikus REST-konvenciók (többes szám, CRUD igék egy resource-on) itt nem értelmezhető kritérium egyetlen endpoint esetén.

---

## 5. Clean code

A kód összességében jó minőségű: konzisztens elnevezés, kis, egy-felelősségű komponensek (a legnagyobb, `SubscribeForm.tsx`, is csak 259 sor és jól tagolt), és kiemelkedően jó **"miért" kommentek** (pl. a framer-motion inline-transform ütközés dokumentálva van pontosan ott, ahol számít — `WhatYouGet.tsx:52-59`, `SocialProof.tsx:54-59`, `Term.tsx:75-81`). Ez utóbbit külön érdemes megemlíteni, mert ritka erény.

### 🟢 Alacsony — Duplikált email-validáló regex kliens és szerver oldalon ✅ Javítva (`f5e5e2d`)
**Hely:** `src/components/SubscribeForm.tsx:9` és `src/app/api/subscribe/route.ts:3` — mindkét helyen szó szerint `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
**Miért probléma:** Az, hogy kliens **és** szerver oldalon is validálsz, helyes (defense in depth) — a probléma csak az, hogy a szabály maga másolva van, nem egy közös helyről importálva. Ha valaki a jövőben szigorítja/lazítja a validációt az egyik helyen, a másik némán elszakadhat tőle.
**Javaslat:** Emeld ki egy `src/lib/validation.ts`-be (`export const EMAIL_REGEX = ...`), és importáld mindkét helyen.

### 🟢 Alacsony — Ismételt hover-lift workaround két komponensben ✅ Javítva (`f5e5e2d`) — `HoverLiftCard`
**Hely:** `src/components/WhatYouGet.tsx:52-60` és `src/components/SocialProof.tsx:54-60`
**Miért probléma:** Szó szerint ugyanaz a kártya-markup (`rounded-2xl bg-white/70 p-6 shadow-soft ring-1 ring-ink-900/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg dark:bg-forest-600/30 dark:ring-sand-100/10 sm:p-7`) és szó szerint ugyanaz a magyarázó komment a framer-motion/Tailwind ütközésről van duplikálva két fájlban.
**Javaslat:** Egy kis `<HoverLiftCard>` shared komponens (`src/components/HoverLiftCard.tsx`) eltüntetné a duplikációt, és a workaround magyarázata is egy helyen élne.

### 🟡 Közepes — Nulla automatizált teszt, pont a legkockázatosabb logikán ✅ Javítva (`bc05aee`) — 22 unit teszt a `journey.ts` határeseteire + a subscribe-route validációs ágaira
**Hely:** teljes repo (nincs `*.test.*`/`*.spec.*` fájl, nincs test runner a `package.json`-ban)
**Miért probléma:** Egy landing oldalnál a teljes UI-t tesztelni valószínűleg túlzás lenne — de van a kódban **konkrétan dátum-számítási logika**, amit a saját kódkommentek is "könnyen elrontható"-ként azonosítanak: `JourneyProgress.tsx:26-38` (`getJourneyDayInfo`) számolja ki, hányadik napnál tart az utazás, és a `Hero.tsx:20-29` kommentje explicit figyelmeztet: *"a szöveg NEM állíthatja, hogy már ott van... ('67 napja Rishikeshben...' HIBÁS)"*. Ez pont az a fajta logika, aminek egy határeset-hibája (nap 0, nap 1, nap 67, nap 68) csendben, észrevétlenül téves szöveget jelenítene meg éles oldalon, teszt nélkül.
**Javaslat:** Nem kell teljes tesztlefedettség — de a `getJourneyDayInfo` határeseteire (indulás előtt/napján, utolsó nap, hazaérkezés utáni nap) és a `route.ts` validációs ágaira (üres email, hiányzó consent, hiányzó env var) pár Vitest/Jest unit teszt olcsón, nagy biztonságot adna.

### 🟢 Alacsony — Nincs CI pipeline ✅ Javítva (`bc05aee`) — `.github/workflows/ci.yml`
**Hely:** nincs `.github/workflows/` mappa
**Miért probléma:** A lint és a build csak lokálisan, illetve a Vercel deploy-lépésben fut le — utóbbi tényleg blokkolja a hibás buildet éles deploytól, tehát a kockázat korlátozott, de nincs PR-időben visszajelzés (pl. egy reviewer nem lát zöld/piros lint-checket a PR-on).
**Javaslat:** Egy minimális GitHub Actions workflow (`npm ci && npm run lint && npm run build`) PR-onként.

---

## 6. Teljesítmény

A production build kimenete (`npm run build`) egészséges egy Framer Motion-t használó marketing oldalhoz: a `/` route 149 kB First Load JS, minden oldal statikusan (`○`) generálódik az API route kivételével, nincs felesleges kliens-oldali adatlekérés (a `JourneyProgress`/`ThemeSchedule` szándékosan csak kliens-oldali, a hydration-eltérés elkerülése miatt, jól dokumentálva).

### 🟡 Közepes — Framer Motion minden oldalra bekerül, viszonylag egyszerű animációkért
**Hely:** `"use client"` + `import { motion }` a következő 9 komponensben: `AnimatedSection.tsx`, `Hero.tsx`, `SubscribeForm.tsx`, `JourneyProgress.tsx`, `CookieConsent.tsx`, `StickyCTA.tsx`, `Term.tsx`, `Faq.tsx`
**Miért probléma:** A build kimenete szerint van egy ~53,6 kB-os megosztott chunk (`fd9d1056-…js`), ami a Framer Motion-t tartalmazza — ez a legnagyobb egyedi JS-darab az oldalon, miközben a legtöbb használat egyszerű opacity/translate fade-in (`AnimatedSection`, `SectionPath` mellett dekoratív pötty). Ez minden oldalbetöltésnél letöltődik és parse-olódik, ami az INP/TBI-t (Core Web Vitals) érintheti alacsonyabb kategóriás mobil eszközökön.
**Javaslat:** Fontold meg a Framer Motion `LazyMotion` + `domAnimation`/`m` komponens mintáját (jelentősen kisebb bundle), vagy a legegyszerűbb fade-ek (pl. `AnimatedSection`, `SectionPath`) lecserélését sima CSS `@media (prefers-reduced-motion)`-t is tiszteletben tartó CSS transition + `IntersectionObserver`-re, Framer Motion nélkül.

### 🟢 Alacsony — Header dupla logó-preload (kereszthivatkozás az 1. ponttal)
**Hely:** `src/components/Header.tsx:9-24` — ld. részletesen az 1. pont "Header logo" bejegyzésénél.

### 🟢 Alacsony / informatív — Az OG-kép logó fájlt minden kérésnél lemezről olvassa
**Hely:** `src/lib/og-image.tsx:8-10` (`readFileSync` minden hívásnál, cache nélkül)
**Miért probléma:** Alacsony forgalmú OG-kép route-nál (amit ráadásul a Vercel edge-en is cache-el) ez gyakorlatilag nem mérhető hatású — pusztán jelzem, mert egy `Buffer`-be egyszer betöltött, modul-szintű konstansként tárolt logó technikailag tisztább lenne, mint minden hívásnál újraolvasni a fájlrendszert.

---

## 7. SEO

A metaadat-réteg összességében **alaposan meg van csinálva**: minden oldalnak egyedi, releváns title/description-je van, konzisztens `buildOpenGraph`/`buildTwitter` helperen keresztül (`src/lib/metadata.ts`), oldalanként dinamikusan generált OG-kép (`opengraph-image.tsx` minden route-ban), `sitemap.ts` + `robots.ts` megvan, és végignéztem a címhierarchiát minden oldalon (`Hero` `h1` → `Story`/`WhatYouGet`/`SocialProof`/`SecondCTA` `h2` → nincs kihagyott szint, nincs több `h1` egy oldalon).

### 🔴 Kritikus (kereszthivatkozás a 2. és 3. ponttal) — canonical/OG/sitemap egy be nem kötött domainre mutat
**Hely:** `src/lib/site-config.ts:8`, felhasználva: `src/app/layout.tsx:49` (`metadataBase`), minden oldal `alternates.canonical`-ja, `src/app/sitemap.ts`, `src/app/robots.ts:11`
**Miért probléma:** Lásd részletesen a 2. pont "A hirdetett domain nem éri el az oldalt" bejegyzésénél — ugyanaz a gyökérprobléma itt SEO-oldalról jelentkezik: ha egy keresőmotor indexeli a `*.vercel.app` URL-t (amin ténylegesen fut az oldal), az abban szereplő canonical tag egy **másik**, nem elérhető domainre mutat — ez klasszikus canonical-mismatch, ami miatt a keresőmotor bizonytalan lesz, melyik URL-t indexelje, és rontja az indexelési eséllyet.

### 🟢 Alacsony — `sitemap.ts` mindig "most"-ot ad `lastModified`-ként
**Hely:** `src/app/sitemap.ts:8,14,19,26` — mindegyik bejegyzés `lastModified: new Date()`
**Miért probléma:** Ez minden egyes sitemap-lekérésnél az aktuális időbélyeget adja vissza, nem a tartalom tényleges utolsó módosítási dátumát — technikailag pontatlan jelzés a keresőmotor felé a frissesség-értékelésben. Alacsony prioritás egy fiatal, alacsony forgalmú oldalnál.

### 🟢 Alacsony — Nincs structured data (JSON-LD)
**Hely:** nincs schema.org markup sehol
**Miért probléma:** Nem hiba, csak elszalasztott lehetőség — egy személyes brand storytelling oldalnál egy `Person`/`WebSite` JSON-LD javíthatná a rich result esélyeket (pl. a Google találatban megjelenő extra infók). Nice-to-have, nem blokkoló.

---

## Top 10 azonnali teendő (hatás/erőfeszítés szerint rangsorolva)

| # | Teendő | Súlyosság | Erőfeszítés | Hivatkozás | Státusz |
|---|---|---|---|---|---|
| 1 | Ellenőrizd/állítsd be a `MAILERLITE_API_KEY` és `MAILERLITE_GROUP_ID` env változókat a Vercel Production környezetben, majd teszteld végig élesben a feliratkozást | 🔴 Kritikus | Triviális (percek) | 3. pont, S1 | ⏳ Nyitva — csak a tulajdonos tudja megtenni (Vercel dashboard, titkos kulcs) |
| 2 | Kösd be a valódi custom domaint (`tudatossagesjelenlet.hu` vagy `balintkalandjai.hu` — döntsd el melyiket) a Vercel projektbe, és igazítsd hozzá a `site-config.ts` `url` mezőjét | 🔴 Kritikus | Kicsi–közepes (DNS propagáció) | 2. és 7. pont | ⏳ Nyitva — Vercel dashboard/DNS művelet, nem oldható meg kódból |
| 3 | Adj hozzá alapvédelmet (honeypot mező + IP rate limit) a `/api/subscribe`-hoz | 🟠 Magas | Kicsi | 2. és 3. pont | ✅ Kész (`f5e5e2d`) |
| 4 | Javítsd a WCAG kontraszthibát: `SubscribeForm.tsx:128` `text-ink-900/60` → `/65`+ | 🟡 Közepes | Triviális | 1. pont | ✅ Kész (`f5e5e2d`) |
| 5 | Adj hozzá biztonsági HTTP fejléceket (`headers()` a `next.config.mjs`-ben: CSP, X-Frame-Options, stb.) | 🟡 Közepes | Kicsi | 3. pont | ✅ Kész (`f5e5e2d`) |
| 6 | Ütemezd be a Next.js 15/16-ra migrálást a nyitott CVE-k lezárásához (nem sürgős patch, de tervezett feladat legyen) | 🟠 Magas | Közepes–nagy | 3. pont | ✅ Kész (`7af5afe`) — Next 15.5.25, lásd megjegyzés lent |
| 7 | Kösd össze a `Term` tooltipet `aria-controls`/`aria-describedby`-vel a triggerrel | 🟡 Közepes | Kicsi | 1. pont | ✅ Kész (`f5e5e2d`) |
| 8 | Adj kézi téma-váltó kapcsolót, és alapból `prefers-color-scheme`-et tisztelj a kényszerített nappal/éjszaka logika helyett | 🟡 Közepes | Közepes | 1. pont | ✅ Kész (`48a7e5d`) — kézi váltó megvalósult, `prefers-color-scheme` alapértelmezés helyett a meglévő nappal/éjszaka "auto" mód maradt az alap, hogy a szándékos brand-motívum ne sérüljön |
| 9 | Töröld az árva gyökér-fájlokat (`/favicon.ico`, `/kardos-balint-logo.png`, ~1 MB holt súly), és tisztítsd a `robots.ts`-ben a nem létező `/admin`/`/dashboard` bejegyzéseket | 🟢 Alacsony | Triviális | 4. pont | ✅ Kész (`f5e5e2d`) |
| 10 | Írj alapszintű teszteket a `JourneyProgress` dátum-logikájára és a `/api/subscribe` validációs ágaira, és köss be egy minimális CI workflow-t | 🟡 Közepes | Közepes | 5. pont | ✅ Kész (`bc05aee`) — 22 teszt, Vitest + GitHub Actions |

**Next.js upgrade megjegyzés (#6):** a 16.3.5-ig (legfrissebb) nem mentünk — a 15.5.25 (karbantartott "backport" ág) már lezárja az összes kritikus/magas súlyosságú Next.js CVE-t, a 16-ra lépés kockázata (nagyon friss major, több ökoszisztéma-súrlódás) nem állt arányban a maradék, csak build-time-only nyereséggel (egy tranzitív `postcss` találat a next saját `node_modules`-ában). Lásd a 3. pont Next.js-bejegyzését a részletekért.

---

## Összegzés

A kódbázis maga **jó minőségű, gondosan megírt, jól dokumentált** — nincs benne kódduplikáció-özön, halott absztrakció vagy elhanyagolt terület, és a build/lint tisztán fut. A valódi kockázatok döntő többsége **nem a kódban**, hanem a **deploy-konfigurációban** (domain, env változók) és a **függőségi lánc frissességében** (Next.js CVE-k) koncentrálódik — ezek pontosan azok a dolgok, amik egy tisztán kódszintű review-n könnyen átcsúsznak, de amíg nincsenek rendezve, a legjobban megírt UI is hiába van ott.

---

Szólj, ha szeretnéd, hogy elkezdjem kijavítani a talált problémákat — és ha igen, milyen sorrendben (pl. a fenti Top 10 listát követve, vagy csak a Kritikus/Magas tételeket most, a többit külön körben)?
