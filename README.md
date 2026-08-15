# Tudatosság és Jelenlét — feliratkozó oldal

Egyoldalas, magasan konvertáló feliratkozó (landing) oldal a heti Rishikesh-hírlevélhez.
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion, Kit
integrációval, GDPR-kompatibilis feliratkozó flow-val.

## Gyors indítás

```bash
npm install
cp .env.local.example .env.local
# töltsd ki a .env.local-t a saját Kit adataiddal (lásd lent)
npm run dev
```

Az oldal ezután elérhető: http://localhost:3000

## Kit beállítása

A feliratkozó form szerver oldalon (`/app/api/subscribe/route.ts`) hívja a Kit
(korábban ConvertKit) v4 API-t, hogy az API kulcs sose kerüljön a böngészőbe.

1. **Fiók**: hozz létre egy Kit fiókot (kit.com), vagy használd a meglévőt.
2. **Form**: Grow → Landing Pages & Forms → hozz létre egy formot, pl.
   `Newsletter — India 2026`. Az ID a form URL-jéből olvasható ki.
3. **Double opt-in**: a form beállításainál győződj meg róla, hogy a
   feliratkozás megerősítést igényel (opt-in confirmation). Ez felelős a
   megerősítő email automatikus kiküldéséért — az API hívás maga csak
   hozzáadja a feliratkozót a formhoz, a megerősítést maga a Kit küldi.
4. **API kulcs**: Settings → Developer → API Keys → generálj egy V4 API
   kulcsot.
5. **Környezeti változók**: másold be a kulcsot és a form ID-t a `.env.local`-ba:

   ```
   KIT_API_KEY=...
   KIT_FORM_ID=...
   ```

### Feliratkozási flow

1. Látogató kitölti a formot (email + opcionális keresztnév), elfogadja a
   GDPR checkboxot.
2. Kliens POST-ol a `/api/subscribe`-ra.
3. A szerver route két Kit API hívást indít: `POST /v4/subscribers` (a
   feliratkozó létrehozása/frissítése, itt kerül be a keresztnév), majd
   `POST /v4/forms/{formId}/subscribers` (hozzáadás a formhoz — ez indítja
   a double opt-in emailt).
4. Sikeres válasz esetén optimista UI (checkmark animáció) jelenik meg:
   „Nézd meg a bejövő leveleid — küldtem egy megerősítő emailt."
5. A Kit kiküldi a double opt-in megerősítő emailt; a látogató csak a
   megerősítés után kerül aktív állapotba, és csak ezután kap tartalmat.
6. Hibaállapotok (hálózati hiba, Kit 4xx/5xx) barátságos, magyar nyelvű
   üzenetet jelenítenek meg, technikai részletek nélkül.

## GDPR / adatkezelés

- A form csak email címet kér kötelezően, keresztnevet opcionálisan.
- A hozzájárulás checkbox alapból nincs bepipálva, és linkel a
  `/adatkezeles` oldalra.
- A `/adatkezeles` oldal egy **kiindulópont** valós adatokkal (adatkezelő,
  Kit és Vercel mint adatfeldolgozók) — de ez így is jogi átnézést igényel,
  mielőtt élesbe mész, főleg a fizetős program indulása előtt.
- A footer tartalmazza a leiratkozási tájékoztatást.

## Hero headline A/B változatok

A `src/components/Hero.tsx` fájl tetején 4 headline-variáció található
kommentben (A–D), amelyek közül bármelyik aktiválható az `activeHeadline`
konstans cseréjével, vagy bekötve egy A/B tesztelő eszközbe / feature flag-be.

## Design

- **Paletta**: meleg, földes tónusok — sand/homok, terrakotta, mély
  fenyőzöld (lásd `tailwind.config.ts` → `sand`, `terracotta`, `forest`).
- **Tipográfia**: Fraunces (szerif) a headline-okhoz, Inter a szövegtörzshöz
  (`next/font/google`, self-hosted, nincs külső font-betöltés futásidőben).
- **Animáció**: Framer Motion, lassú fade-in-up szekciónként (`AnimatedSection`),
  visszafogott, "lélegző" háttér-blobok (`OrganicBackground`), nincs villogó
  vagy tolakodó elem. `prefers-reduced-motion`-t tisztelő globális CSS szabály
  is be van kötve (`globals.css`).
- **Mobil**: sticky CTA gomb jelenik meg a hero form elhagyása után, ami
  visszaugrik a feliratkozó formhoz.

## Vercel deploy

1. Told fel a repót GitHub-ra (ha még nem tetted).
2. Vercel dashboard → Add New → Project → válaszd ki a repót.
3. Environment Variables alatt add hozzá:
   - `KIT_API_KEY`
   - `KIT_FORM_ID`
4. Deploy — a build parancs és output automatikusan felismerésre kerül
   (Next.js preset).
5. Domain: kösd be a saját domained/aldomained a Vercel projekt Settings →
   Domains alatt.

## Scriptek

```bash
npm run dev     # fejlesztői szerver
npm run build   # production build
npm run start   # production szerver a build után
npm run lint    # ESLint
```
