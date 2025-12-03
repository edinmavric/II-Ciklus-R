# Objasnjenje app.js - Mini Dashboard

## Pregled

Ovaj fajl sadrzi kompletnu JavaScript logiku za Mini Dashboard aplikaciju koja prikazuje korisnike, njihove postove i komentare koristeci JSONPlaceholder API.

---

## 1. Konstante i Globalne Promenljive

```javascript
const API_URL = 'https://jsonplaceholder.typicode.com';
```
- **API_URL** - Bazna URL adresa za JSONPlaceholder API
- Koristi se kao prefiks za sve API pozive

```javascript
const loadingIndicator = document.getElementById('loadingIndicator');
const usersContainer = document.getElementById('usersContainer');
const detailedView = document.getElementById('detailedView');
const userDetailContainer = document.getElementById('userDetailContainer');
const postsContainer = document.getElementById('postsContainer');
const backButton = document.getElementById('backButton');
```
- **DOM Reference** - Cuvamo reference na HTML elemente koje cemo koristiti
- `document.getElementById()` - Pronalazi element po njegovom ID-u
- Cuvanje referenci je efikasnije nego trazenje elemenata svaki put

```javascript
let allUsers = [];
```
- **Globalna promenljiva** - Cuva sve ucitane korisnike
- Koristi se da ne moramo ponovo ucitavati korisnike iz API-ja

---

## 2. Async Funkcije za API Pozive

### 2.1 loadAllUsers()

```javascript
async function loadAllUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    return await res.json();
  } catch (error) {
    console.error('Greska pri ucitavanju korisnika:', error);
    return [];
  }
}
```

**Objasnjenje:**
- `async` - Oznacava da je funkcija asinhrona
- `await fetch()` - Ceka da se HTTP zahtev zavrsi
- `await res.json()` - Ceka da se odgovor parsira u JSON
- `try/catch` - Hvata greske ako API poziv ne uspe
- Vraca prazan niz `[]` ako dodje do greske

**API Endpoint:** `GET /users` - Vraca listu svih korisnika

---

### 2.2 getUserPosts(userId)

```javascript
async function getUserPosts(userId) {
  try {
    const res = await fetch(`${API_URL}/posts?userId=${userId}`);
    return await res.json();
  } catch (error) {
    console.error('Greska pri ucitavanju postova:', error);
    return [];
  }
}
```

**Objasnjenje:**
- Prima `userId` kao parametar
- Koristi **query parameter** `?userId=${userId}` za filtriranje
- Vraca samo postove odredjenog korisnika

**API Endpoint:** `GET /posts?userId=1` - Vraca postove korisnika sa ID-jem 1

---

### 2.3 getPostComments(postId)

```javascript
async function getPostComments(postId) {
  try {
    const res = await fetch(`${API_URL}/comments?postId=${postId}`);
    return await res.json();
  } catch (error) {
    console.error('Greska pri ucitavanju komentara:', error);
    return [];
  }
}
```

**Objasnjenje:**
- Prima `postId` kao parametar
- Koristi query parameter za filtriranje komentara po postu

**API Endpoint:** `GET /comments?postId=1` - Vraca komentare za post sa ID-jem 1

---

## 3. Funkcija za Prikaz Korisnika

### displayUsers(users)

```javascript
function displayUsers(users) {
  usersContainer.innerHTML = '';

  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = `...`;
    usersContainer.appendChild(userCard);
  });

  // Ucitaj broj postova za svakog korisnika
  users.forEach(async (user) => {
    const posts = await getUserPosts(user.id);
    const postCountSpan = document.getElementById(`postCount-${user.id}`);
    if (postCountSpan) {
      postCountSpan.textContent = posts.length;
    }
  });
}
```

**Objasnjenje korak po korak:**

1. `usersContainer.innerHTML = ''` - Brise postojeci sadrzaj kontejnera

2. `users.forEach(user => {...})` - Prolazi kroz sve korisnike

3. `document.createElement('div')` - Kreira novi DIV element

4. `userCard.className = 'user-card'` - Dodaje CSS klasu

5. **Template Literals** (backtick stringovi):
   ```javascript
   userCard.innerHTML = `
     <h2>${user.name}</h2>
     <p>${user.email}</p>
   `;
   ```
   - Omogucavaju ubacivanje JavaScript izraza sa `${...}`
   - Mogu imati vise linija

6. `usersContainer.appendChild(userCard)` - Dodaje karticu u kontejner

7. **Drugi forEach** - Asinhrono ucitava broj postova za svakog korisnika
   - Koristi `async` unutar forEach callback-a
   - Azurira `<span>` element sa brojem postova

---

## 4. Detaljan Pregled Korisnika

### showUserDetail(userId)

```javascript
async function showUserDetail(userId) {
  // Pronadji korisnika
  const user = allUsers.find(u => u.id === userId);
  if (!user) return;

  // Sakrij grid korisnika, prikazi detaljni pregled
  usersContainer.style.display = 'none';
  detailedView.style.display = 'block';

  // Prikazi loading
  userDetailContainer.innerHTML = '<p>Ucitavanje...</p>';
  postsContainer.innerHTML = '';

  // Prikazi detalje korisnika
  userDetailContainer.innerHTML = `...`;

  // Ucitaj postove korisnika
  const posts = await getUserPosts(userId);

  // Prikazi postove
  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.body.substring(0, 100)}...</p>
    `;
    postDiv.onclick = () => togglePostComments(post.id);
    postsContainer.appendChild(postDiv);
  });
}
```

**Objasnjenje:**

1. `allUsers.find(u => u.id === userId)` - Pronalazi korisnika po ID-u
   - `find()` vraca prvi element koji zadovoljava uslov
   - Arrow funkcija `u => u.id === userId` je uslov

2. **Menjanje prikaza:**
   - `style.display = 'none'` - Sakriva element
   - `style.display = 'block'` - Prikazuje element

3. `post.body.substring(0, 100)` - Uzima prvih 100 karaktera teksta

4. `postDiv.onclick = () => togglePostComments(post.id)`
   - Dodaje click handler za prikaz komentara
   - Arrow funkcija cuva `post.id` u closure-u

---

## 5. Toggle Komentara

### togglePostComments(postId)

```javascript
async function togglePostComments(postId) {
  const commentsDiv = document.getElementById(`comments-${postId}`);

  // Ako su komentari vec otvoreni, zatvori ih
  if (commentsDiv.classList.contains('open')) {
    commentsDiv.classList.remove('open');
    return;
  }

  // Zatvori sve ostale komentare
  document.querySelectorAll('.comments.open').forEach(el => {
    el.classList.remove('open');
  });

  // Prikazi loading
  commentsDiv.innerHTML = '<p>Ucitavanje komentara...</p>';
  commentsDiv.classList.add('open');

  // Ucitaj komentare
  const comments = await getPostComments(postId);

  // Prikazi komentare
  comments.forEach(comment => {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `...`;
    commentsDiv.appendChild(commentDiv);
  });
}
```

**Objasnjenje:**

1. `classList.contains('open')` - Proverava da li element ima klasu

2. `classList.remove('open')` - Uklanja CSS klasu

3. `classList.add('open')` - Dodaje CSS klasu

4. `querySelectorAll('.comments.open')` - Pronalazi sve elemente sa obe klase
   - CSS selektor `.comments.open` znaci: elementi sa klasom "comments" I klasom "open"

5. **Toggle logika:**
   - Ako je otvoren -> zatvori ga
   - Ako je zatvoren -> zatvori sve ostale, otvori ovaj

---

## 6. Navigacija

### goBack()

```javascript
function goBack() {
  detailedView.style.display = 'none';
  usersContainer.style.display = 'grid';
}
```

- Sakriva detaljni pregled
- Prikazuje grid korisnika (vraca `display: grid`)

---

## 7. Inicijalizacija

### initDashboard()

```javascript
async function initDashboard() {
  // Prikazi loading indicator
  loadingIndicator.style.display = 'block';
  usersContainer.style.display = 'none';

  // Ucitaj sve korisnike
  allUsers = await loadAllUsers();

  // Sakrij loading, prikazi korisnike
  loadingIndicator.style.display = 'none';
  usersContainer.style.display = 'grid';

  // Prikazi korisnike
  displayUsers(allUsers);
}
```

**Tok izvrsavanja:**
1. Prikazi "Ucitavanje..." poruku
2. Sacekaj da se korisnici ucitaju sa API-ja
3. Sakrij loading, prikazi kontejner
4. Pozovi funkciju za prikaz korisnika

---

## 8. Event Listeners

```javascript
backButton.addEventListener('click', goBack);
```
- Kada se klikne dugme "Nazad", poziva se `goBack()` funkcija

```javascript
document.addEventListener('DOMContentLoaded', initDashboard);
```
- `DOMContentLoaded` - Event koji se okida kada je HTML ucitan
- Tek tada pokrece `initDashboard()` funkciju
- Osigurava da su svi elementi dostupni pre nego sto ih koristimo

---

## Dijagram Toka Aplikacije

```
[Ucitavanje stranice]
        |
        v
[DOMContentLoaded event]
        |
        v
[initDashboard()]
        |
        v
[Prikazi loading] --> [fetch /users] --> [Prikazi korisnike]
                                                |
                                                v
                                    [Korisnik klikne "Prikazi Postove"]
                                                |
                                                v
                                    [showUserDetail(userId)]
                                                |
                                                v
                                    [fetch /posts?userId=X]
                                                |
                                                v
                                    [Prikazi postove]
                                                |
                                                v
                                    [Korisnik klikne na post]
                                                |
                                                v
                                    [togglePostComments(postId)]
                                                |
                                                v
                                    [fetch /comments?postId=X]
                                                |
                                                v
                                    [Prikazi komentare]
```

---

## Kljucni Koncepti

| Koncept | Opis |
|---------|------|
| `async/await` | Sintaksa za rad sa asinhronim operacijama |
| `fetch()` | Web API za HTTP zahteve |
| `try/catch` | Hvatanje i obrada gresaka |
| `Template Literals` | Stringovi sa ugradjenim izrazima |
| `DOM Manipulacija` | Kreiranje i menjanje HTML elemenata |
| `Event Listeners` | Reagovanje na korisnicke akcije |
| `classList` | API za rad sa CSS klasama |
| `Arrow Functions` | Kratka sintaksa za funkcije |

---

## API Endpoints

| Endpoint | Metoda | Opis |
|----------|--------|------|
| `/users` | GET | Svi korisnici |
| `/posts?userId={id}` | GET | Postovi korisnika |
| `/comments?postId={id}` | GET | Komentari za post |
