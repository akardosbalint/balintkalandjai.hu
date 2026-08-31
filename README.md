# Tudatosság és Jelenlét — feliratkozó oldal

Egyoldalas, magasan konvertáló feliratkozó (landing) oldal a heti Rishikesh-hírlevélhez.
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion, MailerLite
integrációval, GDPR-kompatibilis feliratkozó flow-val.

## Gyors indítás

```bash
npm install
cp .env.local.example .env.local
# töltsd ki a .env.local-t a saját MailerLite adataiddal (lásd lent)
npm run dev
```

Az oldal ezután elérhető: http://localhost:3000

## MailerLite beállítása

A feliratkozó form szerver oldalon (`/app/api/subscribe/route.ts`) hívja a MailerLite
API-t, hogy az API kulcs sose kerüljön a böngészőbe.

1. **Fiók**: hozz létre egy MailerLite fiókot (vagy használd a meglévőt).
2. **Csoport**: Subscribers → Groups → hozz létre egy csoportot, pl. `Newsletter — India 2026`.
   A csoport ID-ját megtalálod a csoport URL-jében, vagy lekérdezheted az API-n
   keresztül (`GET /api/groups`).
3. **API kulcs**: Integrations → Developer API → generálj egy új API kulcsot.
4. **Környezeti változók**: másold be a kulcsot és a csoport ID-t a `.env.local`-ba:

   ```
   MAILERLITE_API_KEY=...
   MAILERLITE_GROUP_ID=...
   ```

### Feliratkozási flow

1. Látogató kitölti a formot (email + opcionális keresztnév), elfogadja a
   GDPR checkboxot.
2. Kliens POST-ol a `/api/subscribe`-ra.
3. A szerver route hívja a MailerLite `POST /api/subscribers` végpontot.
4. Sikeres válasz esetén optimista UI (checkmark animáció) jelenik meg:
   „Ez megvan. Az első leveled jövő vasárnap estig megérkezik." A
   feliratkozás egylépcsős (single opt-in): a látogató a MailerLite API
   hívással azonnal aktív állapotba kerül, nincs külön megerősítő email.
5. Hibaállapotok (hálózati hiba, MailerLite 4xx/5xx) barátságos, magyar
   nyelvű üzenetet jelenítenek meg, technikai részletek nélkül.

## GDPR / adatkezelés

- A form csak email címet kér kötelezően, keresztnevet opcionálisan.
- A hozzájárulás checkbox alapból nincs bepipálva, és linkel a
  `/adatkezeles` oldalra.
- A `/adatkezeles` oldal a jelenlegi adatkezelési gyakorlatot írja le
  (MailerLite egylépcsős feliratkozás, Vercel tárhely, helyi tárolás).
  Ha ez a gyakorlat változik (pl. fizetős program indul, vagy a
  MailerLite beállítások módosulnak), a tájékoztatót ELŐBB kell
  frissíteni, csak utána szabad az új funkciót élesíteni.
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
   - `MAILERLITE_API_KEY`
   - `MAILERLITE_GROUP_ID`
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
