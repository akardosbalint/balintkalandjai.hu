# Webfejlesztési Brief: „Idegrendszeri Alapozó” 7 Napos E-mail Kurzus Landing Page

Ez a dokumentum a tervezett weboldal/landing page felépítésének, funkcióinak és design irányelveinek a specifikációja. A cél egy teljesen tiszta, bizalomépítő, letisztult felület létrehozása, amelyen keresztül a látogatók ingyenesen feliratkozhatnak a 7 napos e-mail kurzusra.

---

## 1. Projekt Áttekintés & Célkitűzés
* **Projekt neve:** Idegrendszeri Alapozó – 7 napos e-mail kurzus landing page
* **Cél:** Egyetlen fókuszált oldal (landing page), amely bemutatja az ingyenes 7 napos e-mail kurzust, gyűjti az e-mail címeket, és elindítja az automatizált sorozatot.
* **Fő üzenet:** Az idegrendszer szabályozása, a krónikus stressz oldása és a belső csend megteremtése biológiai és tudatossági alapokon.
* **Értékesítési jelleg:** Nincs közvetlen értékesítés ezen az oldalon (100%-ban értékközpontú, ingyenes tudásmegosztás).

---

## 2. Design & Vizuális Irányelvek
* **Stílus:** Minimalista, tiszta, nyugodt, prémium, holisztikus, de tudományos alaposságot sugárzó.
* **Színvilág:** Földszínek, lágy zsálya zöld, homokszín, törtfehér háttér, sötét, puha szürke/fekete szövegek (kerülve a harsány, agreszív marketing színeket).
* **Tipográfia:** Jól olvasható, elegáns talpas vagy modern talpmenti (sans-serif) betűtípusok bőséges sorközzel, szellős elrendezésben.
* **Reszponzivitás:** 100%-ban mobilbarát megjelenés (a látogatók 70-80%-a mobilon fog érkezni).

---

## 3. Az Oldal Struktúrája (Wireframe & Tartalom)

### A. Főképernyő (Hero Section)
* **Főcím (H1):** Hagyd abba a túlélést. Tanuld meg szabályozni az idegrendszered.
* **Alcím:** Csatlakozz az ingyenes, 7 napos e-mail kurzushoz, amely segít lecsendesíteni a mindet felemésztő feszültséget, és visszavezet a testedbe, a békébe és a valódi jelenlétbe.
* **Feliratkozási Űrlap (Inline form):**
  * Keresztnév mező (opcionális)
  * E-mail cím mező (kötelező)
  * Call to Action (CTA) gomb: **Kérem a 7 napos alapozó kurzust! 💌**

### B. Miért hoztam létre ezt a kurzust? (A probléma & empátia)
* **Szövegezés:** Rövid, lényegretörő bekezdés arról, hogy a mai világban a kimerültség normálállapittá vált, és a valódi pihenés nem a képernyő bámulását jelenti, hanem az idegrendszer tényleges lecsendesítését.

### C. Mit kapsz az elmúlt 7 napban? (A tematika vázlata)
* **Kiemelt pontok / kártyák:**
  1. *1. Nap:* A túlélő üzemmód és a szimpatikus idegrendszer felismerése.
  2. *2. Nap:* A biológiai vészfék (A Vagus-ideg aktiválása).
  3. *3. Nap:* A túlgondolás megszakítása és a testbe való visszatérés.
  4. *4. Nap:* Az elalvás előtti kapu (Agyi kiürítési technikák).
  5. *5. Nap:* A mélypihenés és a Jóga Nidra ereje a mindennapokban.
  6. *6. Nap:* A jelenlét mint pajzs a viharok közepén.
  7. *7. Nap:* Integráció és a belső csend fenntartása.

### D. Kinek szól ez a kurzus?
* **Célcsoport definíció:** Azoknak szól, akik krónikus feszültséget érzett, nehezen kapcsolnak ki este, zakatol az agyuk, és olyan praktikus, biológiailag megalapozott eszközöket keresnek, amelyek nem igényelnek órákig tartó meditációt, hanem beépülnek a zsúfolt hétköznapokba.

### E. Záró / Alsó Csatlakozási Szekció
* **Szöveg:** „A stressz nem a te hibád, de a megoldás a te kezedben van. Tedd meg az első lépést a belső csend felé.”
* **Ismételt űrlap** (ugyanaz a feliratkozó mező és gomb).

---

## 4. Technikai Követelmények & Integrációk
* **Hírlevélküldő / E-mail automatizáció integráció:** MailerLite, ActiveCampaign, ConvertKit vagy magyar rendszerek (pl. SalesAutopilot / MiniCRM) kapcsolódása az űrlaphoz.
* **Automatizmus:** A feliratkozás gombra kattintva azonnal elindul az 1. napos e-mail, majd a rendszer időzítve kiküldi a napi leveleket a 7. napig.
* **Sikeroldal (Thank You Page):** Egy külön köszönőoldal a feliratkozás után, barátságos üzenettel: *„Köszönöm a bizalmad! Az 1. napi levél már úton van a postaládádba. Nézd meg a Beérkezett (vagy Promóciók) mappát!”*
* **Adatvédelem & GDPR:** Kérelemre elhelyezendő checkbox az Adatkezelési Tájékoztató elfogadásához, linkkel a jogi nyilatkozatra.