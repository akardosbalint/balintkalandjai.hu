# Tudatosság és Jelenlét — feliratkozó oldal

Egyoldalas, magasan konvertáló feliratkozó (landing) oldal a heti, vágatlan Rishikesh-hangfelvételhez.
Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion, Kit
(korábban ConvertKit) integrációval, GDPR-kompatibilis feliratkozó flow-val.

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
V4 API-t, hogy az API kulcs sose kerüljön a böngészőbe.

1. **Fiók**: hozz létre egy Kit fiókot (vagy használd a meglévőt).
2. **Form**: Grow → Landing Pages & Forms → hozz létre egy formot, pl.
   `Heti hangfelvétel — India 2026`. A form ID-ja a szerkesztő URL-jéből
   olvasható ki (`app.kit.com/forms/designers/<ID>/edit`).
3. **API kulcs**: Account Settings → Developer → generálj egy V4 API kulcsot.
4. **Double opt-in**: a form saját beállításai közt (Incentive email / Settings)
   győződj meg róla, hogy a megerősítő email be van kapcsolva. Ez felelős a
   megerősítő email automatikus kiküldéséért — az API hívás maga csak
   feliratkoztat, a Kit küldi a megerősítést.
5. **Környezeti változók**: másold be a kulcsot és a form ID-t a `.env.local`-ba:

   ```
   KIT_API_KEY=...
   KIT_FORM_ID=...
   ```

### Feliratkozási flow

1. Látogató kitölti a formot (email + opcionális keresztnév), elfogadja a
   GDPR checkboxot.
2. Kliens POST-ol a `/api/subscribe`-ra.
3. A szerver route két Kit végpontot hív egymás után: `POST /v4/subscribers`
   (létrehozza/frissíti a feliratkozót — ha az email már létezik, nem
   hibázik, csak frissíti az adatait), majd `POST /v4/forms/{id}/subscribers`
   (hozzáadja a formhoz, ez indítja a double opt-in szekvenciát).
4. Sikeres válasz esetén optimista UI (checkmark animáció) jelenik meg:
   „Gratulálok, ezzel meg is vagyunk. Az első hangfelvételed jövő vasárnap
   estig megérkezik." — a sikerüzenet szándékosan nem a megerősítésről
   szól, hanem arról, mire számíthat a látogató.
5. A Kit a háttérben ettől függetlenül kiküldi a double opt-in megerősítő
   emailt; a látogató csak a megerősítés után kerül aktív állapotba, és
   csak ezután kap tartalmat. FONTOS: mivel a sikerüzenet már nem kéri
   erre kifejezetten a látogatót, érdemes megfontolni, hogy a Kit double
   opt-in email szövege önmagában is egyértelműen hívjon fel a
   megerősítésre — különben lehet, hogy valaki elmulasztja, és sosem kapja
   meg a vasárnapi hangfelvételt.
6. Hibaállapotok (hálózati hiba, Kit 4xx/5xx) barátságos, magyar nyelvű
   üzenetet jelenítenek meg, technikai részletek nélkül.

## GDPR / adatkezelés

- A form csak email címet kér kötelezően, keresztnevet opcionálisan.
- A hozzájárulás checkbox alapból nincs bepipálva, és linkel a
  `/adatkezeles` oldalra.
- A `/adatkezeles` oldal egy **kitölthető sablon** — nézesd át valakivel,
  aki ért a GDPR-hoz, mielőtt élesbe mész, és töltsd ki a `[szögletes
  zárójeles]` placeholdereket (cégadatok, Kit DPA link stb.).
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
