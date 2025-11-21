# Domaći Zadatak - Rad sa Fetch API-jem i JSONPlaceholder

## Uvod

U ovom domaćem zadatku ćete vežbati rad sa Fetch API-jem i javnom API bazom podataka JSONPlaceholder. Koristiće se sledeći endpointi:

- `https://jsonplaceholder.typicode.com/users` - Lista korisnika
- `https://jsonplaceholder.typicode.com/posts` - Lista postova
- `https://jsonplaceholder.typicode.com/comments` - Lista komentara

## 1. Osnovne Operacije sa Podacima

### Zadatak 1.1 - Preuzimanje i Filtriranje Korisnika

Preuzeti sve korisnike sa API-ja i:
- Prikazati sve korisnike u konzoli
- Filtirati i prikazati samo korisnike čiji `username` počinje sa slovom "C"
- Filtirati i prikazati samo korisnike čiji `email` sadrži ".org" domen

```javascript
// Primer:
// fetch(...)
//   .then(response => response.json())
//   .then(data => {
//     // Vaš kod ovde
//   })
```

### Zadatak 1.2 - Mapiranje i Transformacija Podataka

Preuzeti sve korisnike i:
- Kreiraj novi niz koji sadrži samo imena i email-ove korisnika
- Kreiraj novi niz koji sadrži samo imena i tvrtke (company.name) korisnika
- Prikazati ove nizove u konzoli

### Zadatak 1.3 - Pronalaženje Specifičnih Podataka

Preuzeti sve korisnike i:
- Pronaći korisnika čiji id je 5 i prikazati sve njegove podatke
- Pronaći korisnika čije ime sadrži "Nicholas" i prikazati ga
- Pronaći prvog korisnika čija kompanija je "Deckow-Crist" i prikazati ga

## 2. Rad sa Postovima

### Zadatak 2.1 - Preuzimanje i Filtriranje Postova

Preuzeti sve postove sa API-ja i:
- Prikazati samo postove čiji `userId` je 1
- Prikazati samo postove čiji `id` je veći od 50
- Prikazati samo postove čiji naslov sadrži reč "qui"

### Zadatak 2.2 - Kombinovanje Podataka

Preuzeti sve korisnike i sve postove, zatim:
- Za svakog korisnika pronaći sve njegove postove
- Prikazati niz objekata sa strukturom: `{ username: "...", postCount: 5 }`
- Sortirati korisnike po broju postova (od najvećeg ka najmanjem)

### Zadatak 2.3 - Dinamički Prikaz na Stranici

Napraviti HTML strukturu:
```html
<div id="postsContainer">
  <!-- Postovi će biti prikazani ovde -->
</div>
```

Preuzeti sve postove i:
- Prikazati sve postove na stranici u `div` elementima
- Svaki post treba da ima naslov i telo (body)
- Dodati CSS stilove za lepši prikaz

## 3. Rad sa Komentarima

### Zadatak 3.1 - Preuzimanje Komentara

Preuzeti sve komentare sa API-ja i:
- Prikazati samo komentare čiji `postId` je 1
- Prikazati samo komentare koji nisu od korisnika čiji `email` sadrži ".net"
- Prikazati samo komentare čiji tekst je duži od 50 karaktera

### Zadatak 3.2 - Brojanje Komentara

Preuzeti sve komentare i:
- Prebrojati koliko komentara ima svaki post
- Kreiraj niz sa strukturom: `{ postId: 1, commentCount: 5 }`
- Prikazati post sa najviše komentara

## 4. Napredni Zadaci

### Zadatak 4.1 - Kombinovanje Više API Poziva

Napraviti aplikaciju koja će:
- Preuzeti sve korisnike
- Za svakog korisnika, preuzeti sve njegove postove
- Za svaki post, preuzeti sve komentare
- Kreiraj strukturu: `{ user: {...}, posts: [...], comments: [...] }`

(Hint: Koristiti Promise.all() ili chain-ovanje fetch poziva)

### Zadatak 4.2 - Dinamički Prikaz Korisnika i Njihovih Postova

HTML struktura:
```html
<div id="usersContainer"></div>
```

Implementacija:
- Preuzeti sve korisnike i postove
- Za svakog korisnika prikazati karticu sa:
  - Ime korisnika
  - Email
  - Broj postova
  - Lista prvih 3 njihova posta
- Dodati CSS stilove za kartice

### Zadatak 4.3 - Pretraga i Sortiranje

Napraviti formu sa:
```html
<input type="text" id="searchInput" placeholder="Pretraži korisnike..." />
<select id="sortBy">
  <option value="name">Po imenu</option>
  <option value="email">Po email-u</option>
</select>
```

Funkcionalnosti:
- Pretraga korisnika po imenu (case-insensitive)
- Sortiranje rezultata po imenu ili email-u
- Prikaz filtriranih i sortiranih rezultata na stranici

## CSS Primer

```css
.post-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.post-card h3 {
  margin-top: 0;
  color: #333;
}

.user-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin: 10px 0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.user-card h2 {
  margin-top: 0;
}

#postsContainer, #usersContainer {
  max-width: 800px;
  margin: 0 auto;
}
```

## Napomene

- Koristiti `fetch()` za preuzimanje podataka
- Voditi računa o asinkronom kodu (`.then()`, `.catch()`)
- Komentarisati kod gde je potrebno
- Testirati kod u browser konzoli
- Ne zaboraviti da linkujete index.html sa app.js fajlom
- Koristiti `console.log()` za debugovanje
