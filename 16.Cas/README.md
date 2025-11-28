# Domaći Zadatak - Mini Dashboard sa Korisnicima, Postovima i Komentarima

## Uvod

U ovom domaćem zadatku ćete unaprediti mini dashboard koji ste počeli da kreirate u klasi. Zadatak je fokusiran na kombinovanje podataka iz više API endpointa i prikaz kompletne informacije o korisnicima, njihovim postovima i komentarima.

API: `https://jsonplaceholder.typicode.com`

## Zadaci

### 1. Dovršiti Prethodni Domaći (15. čas)

**Pregled:** Svi zadaci sa [prethodnog domaćeg](/15.Cas/README.md) trebaju biti implementirani:
- Async/await funkcije za učitavanje korisnika
- Prikaz korisnika sa svim dostupnim informacijama
- Try/catch error handling
- Dinamički prikaz na stranici
- CSS stilovi

**Provera:**
- Da li su sve async funkcije korektno napisane?
- Da li koriste try/catch?
- Da li su svi korisnici prikazani?

### 2. Unaprediti Dashboard - Detaljni Pregled Korisnika

Napraviti kompletan pregled za svakog korisnika sa sledećim informacijama:

```html
<div class="user-card">
  <h2>${user.name}</h2>
  <p><strong>Username:</strong> ${user.username}</p>
  <p><strong>Email:</strong> ${user.email}</p>
  <p><strong>Phone:</strong> ${user.phone}</p>
  <p><strong>Website:</strong> ${user.website}</p>
  <p><strong>Kompanija:</strong> ${user.company.name}</p>
  <p><strong>Grad:</strong> ${user.address.city}</p>
  <p><strong>Adresa:</strong> ${user.address.street}, ${user.address.suite}</p>
  <p><strong>Broj Postova:</strong> <span id="postCount-${user.id}">0</span></p>
  <button onclick="toggleUserPosts(${user.id})">Prikaži Postove</button>
</div>
```

### 3. Prikaz Postova sa Komentarima

Za svakog korisnika, implementirati:

#### 3.1 Lista Postova
```
POST
- Naslov posta
- Telo posta (prvi 100 karaktera)
- Broj komentara
```

#### 3.2 Prikaz Komentara za Post
Kada korisnik klikne na post, prikazati sve komentare za taj post:
```
KOMENTAR
- Ime komentara
- Email autora
- Tekst komentara
```

### 4. Korišćenje Dodatnih Endpoint-a

Pored `/users`, `/posts` i `/comments`, koristiti i:

- **`/posts/{id}` ili `/posts?userId={id}`** - Za postove određenog korisnika
- **`/comments?postId={id}`** - Za komentare određenog posta
- **`/todos?userId={id}` (BONUS)** - Obaveze korisnika
- **`/albums?userId={id}` (BONUS)** - Albumi korisnika

### 5. HTML Struktura

```html
<!DOCTYPE html>
<html lang="sr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mini Dashboard - Kompletan Pregled</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>🔍 Mini Dashboard</h1>
    
    <div id="loadingIndicator" class="loading">Učitavanje podataka...</div>
    
    <div id="usersContainer" class="users-grid">
      <!-- Korisnici će biti prikazani ovde -->
    </div>

    <div id="detailedView" class="detailed-view" style="display: none;">
      <button id="backButton" class="back-btn">⬅ Nazad</button>
      
      <div id="userDetailContainer">
        <!-- Detaljni pregled korisnika -->
      </div>

      <div id="postsContainer" class="posts-container">
        <!-- Postovi korisnika -->
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
```

### 6. CSS Stilovi

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: white;
  text-align: center;
  margin-bottom: 30px;
  font-size: 2.5em;
}

.loading {
  text-align: center;
  color: white;
  font-size: 18px;
  padding: 40px;
}

/* Users Grid */
.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.user-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.user-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.user-card h2 {
  color: #667eea;
  margin-bottom: 10px;
}

.user-card p {
  margin: 8px 0;
  color: #555;
  font-size: 14px;
}

.user-card strong {
  color: #333;
}

.user-card button {
  width: 100%;
  padding: 10px;
  margin-top: 15px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s;
}

.user-card button:hover {
  background: #764ba2;
}

/* Detailed View */
.detailed-view {
  background: white;
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.back-btn {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 16px;
}

.back-btn:hover {
  background: #764ba2;
}

#userDetailContainer {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
}

#userDetailContainer h2 {
  color: #667eea;
  margin-bottom: 15px;
}

#userDetailContainer p {
  margin: 10px 0;
  color: #555;
}

/* Posts Container */
.posts-container {
  margin-top: 30px;
}

.posts-container h3 {
  color: #667eea;
  margin-bottom: 20px;
}

.post {
  background: #f8f9fa;
  border-left: 4px solid #667eea;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
}

.post:hover {
  background: #e8ecf1;
  border-left-color: #764ba2;
}

.post h4 {
  color: #333;
  margin-bottom: 10px;
}

.post p {
  color: #666;
  margin: 8px 0;
  font-size: 14px;
}

.post-meta {
  color: #999;
  font-size: 12px;
  margin-top: 10px;
}

/* Comments */
.comments {
  background: #f0f0f0;
  padding: 15px;
  margin-top: 10px;
  border-radius: 5px;
  display: none;
}

.comments.open {
  display: block;
}

.comment {
  background: white;
  padding: 12px;
  margin: 10px 0;
  border-radius: 5px;
  border-left: 3px solid #764ba2;
}

.comment strong {
  color: #667eea;
}

.comment-email {
  color: #999;
  font-size: 12px;
}

.comment-body {
  color: #555;
  margin-top: 8px;
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 768px) {
  .users-grid {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 1.8em;
  }

  .detailed-view {
    padding: 15px;
  }
}
```

### 7. JavaScript Funkcionalnosti

Implementirati sledeće async funkcije:

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com';

// 1. Učitavanje svih korisnika
async function loadAllUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    return await res.json();
  } catch (error) {
    console.error('Greška pri učitavanju korisnika:', error);
  }
}

// 2. Učitavanje postova za korisnika
async function getUserPosts(userId) {
  try {
    const res = await fetch(`${API_URL}/posts?userId=${userId}`);
    return await res.json();
  } catch (error) {
    console.error('Greška pri učitavanju postova:', error);
  }
}

// 3. Učitavanje komentara za post
async function getPostComments(postId) {
  try {
    const res = await fetch(`${API_URL}/comments?postId=${postId}`);
    return await res.json();
  } catch (error) {
    console.error('Greška pri učitavanju komentara:', error);
  }
}

// 4. Inicijalizacija dashboard-a
async function initDashboard() {
  // Prikazi loading indicator
  const users = await loadAllUsers();
  // Prikaži korisnike u grid-u
}

// 5. Prikaz detaljnog pregleda korisnika
async function showUserDetail(userId) {
  // Prikaži detaljne podatke korisnika
  // Učitaj i prikaži njegove postove
  // Omogući klik na post da prikaži komentare
}

// Inicijalizuj aplikaciju pri učitavanju
document.addEventListener('DOMContentLoaded', initDashboard);
```

## Zahtevi

### Obavezni:
- Async/await sintaksa za sve API pozive
- Try/catch error handling
- Prikaz svih korisnika u grid layoutu
- Detaljni pregled korisnika sa svim dostupnim podacima
- Prikaz postova za svakog korisnika
- Prikaz komentara za svaki post
- Loading indicator dok se podaci učitavaju
- Dugme za povratak na prethodnu sekiju
- Responzivni dizajn
- CSS stilovi sa gradijentima i animacijama

### Bonus:
- Dodati `/todos` endpoint - prikazati obaveze korisnika
- Dodati `/albums` endpoint - prikazati albume korisnika
- Pretraga korisnika po imenu
- Filtriranje korisnika po gradu
- Sortiranje korisnika (po imenu, email-u, gradу)
- Dodati search funkcionalnost za postove
- Brojač - koliko ima postova, komentara, obaveza
- Dark mode toggle

## Struktura Projekta

```
16.Cas/
├── index.html
├── app.js
├── style.css
└── README.md
```

## Napomene

- Koristiti `async/await` za sve API pozive
- Implementirati `try/catch` za error handling
- Komentarisati kod
- Testirati u browser konzoli
- Voditi računa o performansama
- Event delegation za dinamičke elemente
-清čan i organizovan kod

## Testiranje

1. Otvorite `index.html` u browser-u
2. Proverite da li se svi korisnici učitavaju
3. Klikните na korisnika - trebalo bi prikazati detaljni pregled
4. Klikните na post - trebalo bi prikazati komentare
5. Proverite responsive dizajn na mobilnom uređaju
6. Proverite browser konzolu za greške
