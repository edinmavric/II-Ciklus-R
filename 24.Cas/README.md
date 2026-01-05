# Vežba 24 - Fetch API Praksa (async/await)

## Cilj vežbe
Uvežbati korišćenje **fetch** API-ja sa **async/await** sintaksom, svim HTTP metodama, URL parametrima i query string-ovima.

## API koji koristimo
**JSONPlaceholder**: https://jsonplaceholder.typicode.com

### Dostupni resursi:
- `/users` - Korisnici (10 korisnika)
- `/posts` - Postovi (100 postova)
- `/comments` - Komentari (500 komentara)
- `/todos` - Todo lista (200 todo-a)

---

## Struktura fajlova
```
24.Cas/
├── index.html   - HTML sa formama i dugmadima
├── app.js       - JavaScript logika (OVDE RADITE)
└── README.md    - Uputstva
```

---

## Zadaci

Otvori `app.js` i dopuni funkcije. Svaka funkcija ima `// TODO` komentar koji ti govori šta treba da uradiš.

### Zadatak 1: GET - Učitaj sve korisnike
- Funkcija: `ucitajSveKorisnike()`
- Ruta: `GET /users`

### Zadatak 2: GET - Učitaj korisnika po ID-ju
- Funkcija: `ucitajKorisnika(id)`
- Ruta: `GET /users/{id}`
- Primer: `/users/5` - korisnik sa ID 5

### Zadatak 3: GET - Postovi korisnika (query parametar)
- Funkcija: `ucitajPostoveKorisnika(userId)`
- Ruta: `GET /posts?userId={id}`
- Primer: `/posts?userId=1` - svi postovi korisnika 1

### Zadatak 4: GET - Todos korisnika
- Funkcija: `ucitajTodosKorisnika(userId)`
- Ruta: `GET /todos?userId={id}`

### Zadatak 5: GET - Komentari posta (nested ruta)
- Funkcija: `ucitajKomentare(postId)`
- Ruta: `GET /posts/{id}/comments`
- Primer: `/posts/1/comments` - komentari za post 1

### Zadatak 6: GET - Postovi sa limitom (više query parametara)
- Funkcija: `ucitajPostoveSaLimitom(start, limit)`
- Ruta: `GET /posts?_start={start}&_limit={limit}`
- Primer: `/posts?_start=0&_limit=5` - prvih 5 postova

### Zadatak 7: POST - Kreiraj novi post
- Funkcija: `kreirajPost(title, body, userId)`
- Ruta: `POST /posts`

### Zadatak 8: POST - Kreiraj novi todo
- Funkcija: `kreirajTodo(title, completed, userId)`
- Ruta: `POST /todos`

### Zadatak 9: PUT - Izmeni post kompletno
- Funkcija: `izmeniPostPut(id, title, body, userId)`
- Ruta: `PUT /posts/{id}`

### Zadatak 10: PATCH - Izmeni post delimično
- Funkcija: `izmeniPostPatch(id, title)`
- Ruta: `PATCH /posts/{id}`

### Zadatak 11: DELETE - Obriši post
- Funkcija: `obrisiPost(id)`
- Ruta: `DELETE /posts/{id}`

### Zadatak 12: DELETE - Obriši todo
- Funkcija: `obrisiTodo(id)`
- Ruta: `DELETE /todos/{id}`

---

## Primeri koda (async/await)

### GET - Učitaj sve
```javascript
async function ucitajKorisnike() {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log(data);
}
```

### GET - Učitaj po ID-ju (parametar u URL-u)
```javascript
async function ucitajKorisnika(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    const data = await response.json();
    console.log(data);
}
```

### GET - Sa query parametrom
```javascript
async function ucitajPostoveKorisnika(userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    const data = await response.json();
    console.log(data);
}
```

### GET - Nested ruta
```javascript
async function ucitajKomentare(postId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
    const data = await response.json();
    console.log(data);
}
```

### GET - Više query parametara
```javascript
async function ucitajPostove(start, limit) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`);
    const data = await response.json();
    console.log(data);
}
```

### POST - Kreiraj novi resurs
```javascript
async function kreirajPost(title, body, userId) {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
            body: body,
            userId: userId
        })
    });
    const data = await response.json();
    console.log(data);
}
```

### PUT - Zameni ceo resurs
```javascript
async function izmeniPost(id, title, body, userId) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            title: title,
            body: body,
            userId: userId
        })
    });
    const data = await response.json();
    console.log(data);
}
```

### PATCH - Izmeni samo neka polja
```javascript
async function izmeniNaslov(id, title) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title
        })
    });
    const data = await response.json();
    console.log(data);
}
```

### DELETE - Obriši resurs
```javascript
async function obrisiPost(id) {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        console.log('Obrisano!');
    }
}
```

---

## Tipovi ruta

| Tip | Primer | Objašnjenje |
|-----|--------|-------------|
| Osnovna | `/users` | Svi korisnici |
| Sa parametrom | `/users/5` | Korisnik sa ID 5 |
| Query parametar | `/posts?userId=1` | Postovi gde je userId=1 |
| Više query param. | `/posts?_start=0&_limit=5` | Prvih 5 postova |
| Nested ruta | `/posts/1/comments` | Komentari posta 1 |

---

## Razlika PUT vs PATCH

| PUT | PATCH |
|-----|-------|
| Zamenjuje CEO resurs | Menja samo poslata polja |
| Moramo poslati SVE podatke | Šaljemo samo ono što menjamo |
| Ako izostavimo polje, biće obrisano | Izostavljena polja ostaju ista |

---

## HTTP Metode

| Metoda | Akcija | Primer |
|--------|--------|--------|
| GET | Čitanje | Učitaj korisnike |
| POST | Kreiranje | Napravi novog korisnika |
| PUT | Zamena | Zameni celog korisnika |
| PATCH | Izmena | Izmeni samo email |
| DELETE | Brisanje | Obriši korisnika |

---

Srećno sa vežbanjem!
