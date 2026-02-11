# Projekti - JavaScript

> Svaki student bira **jedan** projekat. Upiši svoje ime pored projekta koji želiš.
> Projekat se radi individualno.

---

## Izbor projekata

| #   | Projekat                    | 
| --- | --------------------------- |
| 1   | Multi-Step Form             |
| 2   | CRUD Aplikacija             |
| 3   | Quiz App                    |
| 4   | Movie Search App            |
| 5   | E-commerce Cart System      |
| 6   | Blog System                 |
| 7   | Task Manager                |

---

## 1. Multi-Step Form (Wizard forma)

**Koncept:** Forma u više koraka (npr. registracija ili checkout)

### Studenti vežbaju:

- Upravljanje state-om između koraka
- Validaciju inputa
- Dinamičko prikazivanje sekcija
- Progress bar
- Čuvanje podataka u objektu

### Funkcionalnosti:

- Next / Previous dugmad
- Validacija po koraku
- Finalni pregled unetih podataka
- Reset

### Bonus:

- Validacija email-a regexom
- Čuvanje u localStorage
- Animacije prelaza

---

## 2. CRUD Aplikacija (Fake API ili localStorage)

**Koncept:** Mini sistem za upravljanje korisnicima ili proizvodima

### Studenti vežbaju:

- CRUD operacije
- Rad sa nizom objekata
- Render liste
- Edit forma sa pre-popunjenim podacima

### Funkcionalnosti:

- Create
- Read
- Update
- Delete

### Bonus:

- Search filter
- Sortiranje
- Pagination (ručno)

---

## 3. Quiz App (sa dinamičkim pitanjima)

**Koncept:** Ozbiljna quiz aplikacija sa tajmerom i bodovanjem

### Studenti vežbaju:

- Upravljanje trenutnim pitanjem (index)
- Score tracking
- Dinamičko renderovanje odgovora
- Timer po pitanju

### Funkcionalnosti:

- 10 pitanja
- Jedan tačan odgovor
- Rezultat na kraju
- Restart

### Bonus:

- Random shuffle pitanja
- High score u localStorage
- Review odgovora

---

## 4. Movie Search App (OMDB API)

**Koncept:** Pretraga filmova koristeći eksterni API

### Studenti vežbaju:

- Fetch API
- Async/await
- Error handling
- Dynamic cards rendering

### Funkcionalnosti:

- Search input
- Lista filmova
- Klik na film → detalji

### Bonus:

- Pagination
- Loader
- Debounce pretrage

---

## 5. E-commerce Cart System (bez backend-a)

**Koncept:** Sistem korpe za kupovinu sa upravljanjem proizvodima

### Studenti vežbaju:

- Rad sa proizvodima (niz objekata)
- Upravljanje cart state-om
- Količina proizvoda
- Računanje ukupne cene (`reduce`)

### Funkcionalnosti:

- Dodaj u korpu
- Povećaj / smanji količinu
- Remove item
- Ukupna cena

### Bonus:

- localStorage
- Promo kod (popust)
- Validacija checkout forme

---

## 6. Blog System (Frontend Only CMS)

**Koncept:** Blog platforma koja radi samo na frontendu

### Studenti vežbaju:

- Kreiranje objava
- Render liste objava
- View pojedinačne objave
- Dinamički DOM routing (bez React-a)

### Funkcionalnosti:

- Create post
- Delete post
- View post

### Bonus:

- Filter po autoru
- Search
- Kategorije

---

## 7. Task Manager sa filtrima i prioritetima

**Koncept:** Naprednija verzija ToDo aplikacije

### Studenti vežbaju:

- Rad sa kompleksnim objektima
- Filtriranje
- Sortiranje
- Status management

### Struktura task objekta:

```js
{
  id,
  title,
  description,
  priority,    // "low", "medium", "high"
  status,      // "todo", "in-progress", "done"
  dueDate
}
```

### Funkcionalnosti:

- Dodavanje taska
- Filter po statusu
- Filter po prioritetu
- Sort po datumu

### Bonus:

- Brojač aktivnih taskova
- localStorage
- Edit task modal
