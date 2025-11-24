# Domaći Zadatak - Async/Await i Fetch API

## Uvod

U ovom domaćem zadatku ćete vežbati rad sa `async/await` sintaksom i preuzimanjem podataka sa JSONPlaceholder API-ja. Svi zadaci trebaju biti rešeni koristeći `async/await` i `try/catch` blokove.

API: `https://jsonplaceholder.typicode.com`

## 1. Osnovni Async/Await Zadaci

### Zadatak 1.1 - Učitavanje i Prikaz Korisnika

Napraviti `async` funkciju `loadAllUsers()` koja će:

- Preuzeti sve korisnike sa `/users` endpointa
- Prikazati sve korisnike u konzoli
- Koristiti `try/catch` za error handling

```javascript
// Primer:
async function loadAllUsers() {
  try {
    // Vaš kod
  } catch (error) {
    console.error('Greška:', error);
  }
}

loadAllUsers();
```

### Zadatak 1.2 - Učitavanje Specifičnog Korisnika

Napraviti `async` funkciju `getUser(id)` koja će:

- Preuzeti korisnika sa određenim ID-om
- Prikazati sve podatke o korisniku
- Koristiti `try/catch` za error handling
- Pozvati funkciju sa ID-om 5

### Zadatak 1.3 - Učitavanje Postova

Napraviti `async` funkciju `getUserPosts(userId)` koja će:

- Preuzeti sve postove određenog korisnika
- Prikazati broj postova i njihove naslove
- Koristiti query string: `/posts?userId=${userId}`

## 2. Kombinovanje Više API Poziva

### Zadatak 2.1 - Korisnik sa Postovima

Napraviti `async` funkciju `getUserWithPosts(userId)` koja će:

- Preuzeti korisnika sa određenim ID-om
- Preuzeti sve postove tog korisnika
- Vratiti objekat sa strukturom:

```javascript
{
  user: { id, name, email, ... },
  posts: [ { id, title, body }, ... ]
}
```

- Prikazati rezultat u konzoli

### Zadatak 2.2 - Post sa Komentarima

Napraviti `async` funkciju `getPostWithComments(postId)` koja će:

- Preuzeti post sa određenim ID-om
- Preuzeti sve komentare tog posta
- Vratiti objekat sa strukturom:

```javascript
{
  post: { id, title, body, userId },
  comments: [ { id, name, email, body }, ... ]
}
```

### Zadatak 2.3 - Korisnik sa Svim Podacima

Napraviti `async` funkciju `getUserFullData(userId)` koja će:

- Preuzeti korisnika
- Preuzeti sve njegove postove
- Preuzeti sve komentare za sve njegove postove
- Vratiti objekat sa strukturom:

```javascript
{
  user: { ... },
  posts: [ ... ],
  comments: [ ... ]
}
```

## 3. Dinamički Prikaz na Stranici

### Zadatak 3.1 - Prikaz Korisnika

Napraviti HTML strukturu:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Async/Await Praktika</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div id="usersContainer"></div>
    <script src="app.js"></script>
  </body>
</html>
```

Napraviti `async` funkciju `displayUsers()` koja će:

- Preuzeti sve korisnike
- Za svakog korisnika prikazati karticu sa:
  - Ime (name)
  - Email
  - Grad (address.city)
  - Kompanija (company.name)
- Kartice prikazati u `#usersContainer` div-u

### Zadatak 3.2 - Prikaz Postova sa Komentarima

Napraviti HTML strukturu:

```html
<div id="postsContainer"></div>
```

Napraviti `async` funkciju `displayPostsWithComments(userId)` koja će:

- Preuzeti sve postove korisnika
- Za svaki post prikazati:
  - Naslov posta
  - Telo posta
  - Broj komentara
  - Lista prvih 3 komentara
- Prikazati sve u `#postsContainer` div-u

## 4. Napredni Zadaci

### Zadatak 4.1 - Pretraga sa Filtriranjem

Napraviti `async` funkciju `searchUsers(name)` koja će:

- Preuzeti sve korisnike
- Filtirati korisnike čije ime sadrži unet tekst (case-insensitive)
- Prikazati filtrirane rezultate na stranici

### Zadatak 4.2 - Loading Indicator

Napraviti HTML sa loading indikatorom:

```html
<div id="loading" style="display: none;">Učitavanje...</div>
<div id="content"></div>
```

Napraviti `async` funkciju `loadDataWithIndicator()` koja će:

- Prikazati "Učitavanje..." poruku
- Preuzeti sve korisnike
- Sakriti "Učitavanje..." poruku
- Prikazati podatke u `#content` div-u

## 5. CSS Stilovi

```css
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f5f5f5;
}

.user-card,
.post-card {
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-card h3,
.post-card h3 {
  margin-top: 0;
  color: #333;
}

.comment {
  background-color: #f9f9f9;
  padding: 10px;
  margin: 5px 0;
  border-left: 3px solid #4caf50;
}

#usersContainer,
#postsContainer {
  max-width: 900px;
  margin: 0 auto;
}

#loading {
  text-align: center;
  padding: 20px;
  color: #666;
  font-size: 18px;
}

button {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 10px 0;
}

button:hover {
  background-color: #45a049;
}

input[type='text'],
select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
}
```

## Napomene

- Sve funkcije trebaju biti `async`
- Koristiti `try/catch` za error handling
- Komentarisati kod gde je potrebno
- Testirati kod u browser konzoli
- Voditi računa o performansama (ne preuzimati nepotrebne podatke)
- Koristiti `console.log()` za debugovanje
