# 32. Čas - Klase i Asinhroni Kod (async/await)

---

## Sadržaj časa

- [Uvod: Zašto asinhroni kod u klasama?](#uvod-zašto-asinhroni-kod-u-klasama)
- [Ponavljanje: Promise i async/await](#ponavljanje-promise-i-asyncawait)
- [Async metode u klasama](#async-metode-u-klasama)
- [Fetch API - komunikacija sa serverom](#fetch-api---komunikacija-sa-serverom)
- [Fetch unutar klase](#fetch-unutar-klase)
- [Error handling (try/catch)](#error-handling-trycatch)
- [CRUD operacije u klasi](#crud-operacije-u-klasi)
- [Praktični primeri](#praktični-primeri)
- [Česte greške i best practices](#česte-greške-i-best-practices)
- [Rezime](#rezime)

---

# Uvod: Zašto asinhroni kod u klasama?

## Problem realnog sveta

U stvarnim aplikacijama, klase ne rade samo sa lokalnim podacima. One moraju da:

- **Učitaju podatke sa servera** (API pozivi)
- **Sačuvaju podatke u bazu** (POST/PUT/DELETE)
- **Čitaju fajlove** (File API)
- **Čekaju korisničke akcije** (timeri, animacije)

Sve ove operacije su **asinhrone** - ne završe se odmah, nego traju neko vreme.

```javascript
// BEZ asinhrnog koda - samo lokalni podaci
class UserService {
  getUsers() {
    return [{ name: "Marko" }, { name: "Ana" }]; // Hardkodirano
  }
}

// SA asinhronim kodom - pravi podaci sa servera
class UserService {
  async getUsers() {
    const response = await fetch("https://api.example.com/users");
    return response.json(); // Pravi podaci!
  }
}
```

### Zašto je ovo bitno?

Svaka moderna web aplikacija komunicira sa serverom. Bez razumevanja async koda u klasama, ne možeš napraviti ni najjednostavniju aplikaciju koja učitava podatke.

---

# Ponavljanje: Promise i async/await

## Šta je Promise?

Promise je objekat koji predstavlja **buduću vrednost** - rezultat operacije koja još nije završena.

```javascript
// Promise ima 3 stanja:
// 1. pending   - čeka se rezultat
// 2. fulfilled - uspešno završen (ima vrednost)
// 3. rejected  - neuspešan (ima grešku)

const obecanje = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Podaci su stigli!"); // fulfilled nakon 2 sekunde
  }, 2000);
});

// Stari način - .then() chain
obecanje.then((rezultat) => {
  console.log(rezultat); // "Podaci su stigli!"
});
```

## async/await - moderniji pristup

`async/await` je sintaksni šećer (syntax sugar) za Promise-e. Čini asinhroni kod čitljivijim.

```javascript
// Bez async/await (ružnije, teže za čitanje)
function getUser() {
  return fetch("https://api.example.com/users/1")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((error) => {
      console.log("Greška:", error);
    });
}

// Sa async/await (čistije, izgleda kao sinhroni kod)
async function getUser() {
  try {
    const response = await fetch("https://api.example.com/users/1");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Greška:", error);
  }
}
```

### Ključna pravila:

| Pravilo                                              | Objašnjenje                                       |
| ---------------------------------------------------- | ------------------------------------------------- |
| `async` ispred funkcije                              | Označava da funkcija vraća Promise                |
| `await` unutar async funkcije                        | Pauzira izvršavanje dok se Promise ne reši         |
| `await` NE MOŽE van `async` funkcije                 | Mora biti unutar async konteksta                  |
| `async` funkcija UVEK vraća Promise                  | Čak i ako vraća običnu vrednost                   |

---

# Async metode u klasama

## Osnovna sintaksa

Dodavanje `async` ispred metode u klasi čini tu metodu asinhronom:

```javascript
class MojaKlasa {
  // Obična metoda - sinhrona
  normalnaMetoda() {
    return "Ovo je obična vrednost";
  }

  // Async metoda - vraća Promise
  async asyncMetoda() {
    return "Ovo je umotano u Promise";
  }
}

const obj = new MojaKlasa();

console.log(obj.normalnaMetoda()); // "Ovo je obična vrednost"
console.log(obj.asyncMetoda()); // Promise { "Ovo je umotano u Promise" }

// Da dobijemo vrednost iz async metode:
obj.asyncMetoda().then((vrednost) => {
  console.log(vrednost); // "Ovo je umotano u Promise"
});

// Ili sa await (unutar druge async funkcije):
async function main() {
  const vrednost = await obj.asyncMetoda();
  console.log(vrednost); // "Ovo je umotano u Promise"
}
```

## Primer: Klasa sa simulacijom čekanja

```javascript
class DataLoader {
  constructor(delay) {
    this.delay = delay;
  }

  // Simuliramo učitavanje podataka
  async loadData(source) {
    console.log(`Učitavam podatke iz ${source}...`);

    // Simulacija kašnjenja (kao da čekamo server)
    await new Promise((resolve) => setTimeout(resolve, this.delay));

    console.log(`Podaci iz ${source} učitani!`);
    return { source, loadedAt: new Date().toISOString() };
  }

  // Učitavanje iz više izvora
  async loadMultiple(sources) {
    const results = [];
    for (const source of sources) {
      const data = await this.loadData(source);
      results.push(data);
    }
    return results;
  }

  // Paralelno učitavanje (brže!)
  async loadAllParallel(sources) {
    const promises = sources.map((source) => this.loadData(source));
    return Promise.all(promises);
  }
}
```

### Sekvencijalno vs Paralelno

```
Sekvencijalno (jedno po jedno):
|--Source A--|--Source B--|--Source C--|  = 3x duže

Paralelno (sve odjednom):
|--Source A--|
|--Source B--|  = 1x (najsporiji određuje ukupno vreme)
|--Source C--|
```

---

# Fetch API - komunikacija sa serverom

## Šta je Fetch?

`fetch()` je ugrađena funkcija u browseru (i Node.js 18+) za slanje HTTP zahteva.

```javascript
// Najjednostavniji GET zahtev
const response = await fetch("https://jsonplaceholder.typicode.com/users");
const users = await response.json();
```

## HTTP metode

| Metoda   | Svrha                 | Primer                  |
| -------- | --------------------- | ----------------------- |
| `GET`    | Čitanje podataka      | Dobavi listu korisnika  |
| `POST`   | Kreiranje podataka    | Napravi novog korisnika |
| `PUT`    | Ažuriranje podataka   | Izmeni ceo resurs       |
| `PATCH`  | Delimično ažuriranje  | Izmeni samo email       |
| `DELETE` | Brisanje podataka     | Obriši korisnika        |

## Fetch sintaksa za svaku metodu

```javascript
// GET - čitanje
const response = await fetch("https://api.example.com/users");

// POST - kreiranje
const response = await fetch("https://api.example.com/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Marko", email: "marko@test.com" }),
});

// PUT - potpuno ažuriranje
const response = await fetch("https://api.example.com/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Marko Novi", email: "marko.novi@test.com" }),
});

// PATCH - delimično ažuriranje
const response = await fetch("https://api.example.com/users/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "novi.email@test.com" }),
});

// DELETE - brisanje
const response = await fetch("https://api.example.com/users/1", {
  method: "DELETE",
});
```

## Šta je `response` objekat?

```javascript
const response = await fetch(url);

response.ok; // true ako je status 200-299
response.status; // HTTP status kod (200, 404, 500...)
response.statusText; // "OK", "Not Found", "Internal Server Error"
response.headers; // HTTP zaglavlja

// Čitanje tela odgovora:
const json = await response.json(); // Parsira kao JSON
const text = await response.text(); // Čita kao string
```

---

# Fetch unutar klase

## Zašto stavljamo fetch u klasu?

Umesto da imamo fetch pozive razbacane po celom kodu, **enkapsuliramo** ih u klasu:

```javascript
// LOŠE: Fetch pozivi svuda po kodu
async function prikaziKorisnike() {
  const res = await fetch("https://api.example.com/users");
  const users = await res.json();
  // ...
}

async function dodajKorisnika(data) {
  const res = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  // ...
}

// DOBRO: Sve na jednom mestu u klasi
class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getAll() {
    const res = await fetch(`${this.baseUrl}/users`);
    return res.json();
  }

  async create(data) {
    const res = await fetch(`${this.baseUrl}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  }
}
```

### Prednosti enkapsulacije:

1. **Jedno mesto za promenu URL-a** - promenimo `baseUrl` i gotovo
2. **Konzistentnost** - svi zahtevi koriste iste headere
3. **Lakše testiranje** - možemo zameniti celu klasu mock-om
4. **Čistiji kod** - komponente ne znaju detalje API-ja
5. **Ponovna upotreba** - ista klasa se koristi svuda

---

# Error handling (try/catch)

## Zašto je error handling obavezan?

Kada radimo sa mrežom, MNOGO toga može poći po zlu:

- Server ne radi (500 greška)
- Nema interneta (NetworkError)
- Resurs ne postoji (404)
- Nismo autorizovani (401/403)
- Server vraća neispravan JSON
- Zahtev traje predugo (timeout)

**Bez error handling-a, cela aplikacija može da se sruši!**

## Osnovna struktura try/catch

```javascript
class ApiService {
  async getData() {
    try {
      // Pokušaj da izvrši operaciju
      const response = await fetch("https://api.example.com/data");

      // Proveri da li je HTTP odgovor uspešan
      if (!response.ok) {
        throw new Error(`HTTP greška! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // Uhvati bilo koju grešku
      console.error("Greška pri učitavanju:", error.message);
      throw error; // Prosleđujemo grešku dalje
    }
  }
}
```

## VAŽNO: `fetch()` NE baca grešku za HTTP greške!

Ovo je najčešća greška kod početnika:

```javascript
// fetch() baca grešku SAMO za mrežne probleme (nema interneta, DNS greška)
// fetch() NE baca grešku za 404, 500, itd!

const response = await fetch("https://api.example.com/nepostoji");
// response.status = 404
// ALI - nema greške! Moramo sami proveriti:

if (!response.ok) {
  // response.ok je false za status 400-599
  throw new Error(`Server je vratio grešku: ${response.status}`);
}
```

## Napredni error handling sa custom Error klasom

```javascript
class ApiError extends Error {
  constructor(message, status, data = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

class ApiService {
  async request(url, options = {}) {
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          errorData
        );
      }

      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error; // Već je naša greška, prosleđujemo
      }
      // Mrežna greška ili nešto neočekivano
      throw new ApiError("Mrežna greška - proverite internet konekciju", 0);
    }
  }
}

// Korišćenje:
const api = new ApiService();

try {
  const data = await api.request("https://api.example.com/users");
  console.log(data);
} catch (error) {
  if (error.status === 404) {
    console.log("Resurs nije pronađen");
  } else if (error.status === 401) {
    console.log("Niste prijavljeni");
  } else {
    console.log("Neočekivana greška:", error.message);
  }
}
```

---

# CRUD operacije u klasi

## Šta je CRUD?

| Slovo | Operacija | HTTP metoda | Opis                       |
| ----- | --------- | ----------- | -------------------------- |
| **C** | Create    | POST        | Kreiranje novog resursa    |
| **R** | Read      | GET         | Čitanje postojećih resursa |
| **U** | Update    | PUT/PATCH   | Ažuriranje resursa         |
| **D** | Delete    | DELETE      | Brisanje resursa           |

## Kompletna CRUD klasa

```javascript
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Privatna helper metoda za sve zahteve
  async _request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;

    const defaultOptions = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, { ...defaultOptions, ...options });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Neki odgovori nemaju body (npr. 204 No Content)
    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  // CREATE - kreiranje
  async create(endpoint, data) {
    return this._request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // READ - čitanje svih
  async getAll(endpoint) {
    return this._request(endpoint);
  }

  // READ - čitanje jednog
  async getById(endpoint, id) {
    return this._request(`${endpoint}/${id}`);
  }

  // UPDATE - ažuriranje
  async update(endpoint, id, data) {
    return this._request(`${endpoint}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  // DELETE - brisanje
  async delete(endpoint, id) {
    return this._request(`${endpoint}/${id}`, {
      method: "DELETE",
    });
  }
}

// Korišćenje:
const api = new ApiService("https://jsonplaceholder.typicode.com");

// Create
const newUser = await api.create("/users", { name: "Marko", email: "marko@test.com" });

// Read
const allUsers = await api.getAll("/users");
const oneUser = await api.getById("/users", 1);

// Update
const updated = await api.update("/users", 1, { name: "Marko Novi" });

// Delete
await api.delete("/users", 1);
```

---

# Praktični primeri

## Primer 1: UserService - specijalizovana klasa

```javascript
class UserService {
  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
    this.users = []; // Lokalni keš
  }

  async fetchUsers() {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      if (!response.ok) throw new Error(`Greška: ${response.status}`);
      this.users = await response.json();
      return this.users;
    } catch (error) {
      console.error("Ne mogu da učitam korisnike:", error.message);
      return this.users; // Vrati keširane podatke ako postoje
    }
  }

  async findUserById(id) {
    // Prvo proveri lokalni keš
    const cached = this.users.find((u) => u.id === id);
    if (cached) return cached;

    // Ako nema u kešu, učitaj sa servera
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`);
      if (!response.ok) throw new Error(`Korisnik ${id} nije pronađen`);
      return response.json();
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async getUserPosts(userId) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${userId}/posts`);
      if (!response.ok) throw new Error(`Greška: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("Ne mogu da učitam postove:", error.message);
      return [];
    }
  }

  async getUserWithPosts(userId) {
    // Paralelno učitavanje korisnika i postova
    const [user, posts] = await Promise.all([
      this.findUserById(userId),
      this.getUserPosts(userId),
    ]);

    return { ...user, posts };
  }
}
```

## Primer 2: TodoApp klasa sa punim CRUD-om

```javascript
class TodoApp {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.todos = [];
  }

  async loadTodos(limit = 10) {
    try {
      const response = await fetch(`${this.apiUrl}/todos?_limit=${limit}`);
      if (!response.ok) throw new Error("Greška pri učitavanju");
      this.todos = await response.json();
      console.log(`Učitano ${this.todos.length} todo-va`);
      return this.todos;
    } catch (error) {
      console.error(error.message);
      return [];
    }
  }

  async addTodo(title) {
    try {
      const response = await fetch(`${this.apiUrl}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) throw new Error("Greška pri kreiranju");

      const newTodo = await response.json();
      this.todos.push(newTodo);
      console.log(`Dodat todo: "${title}"`);
      return newTodo;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async toggleTodo(id) {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      console.error(`Todo ${id} ne postoji`);
      return null;
    }

    try {
      const response = await fetch(`${this.apiUrl}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) throw new Error("Greška pri ažuriranju");

      const updated = await response.json();
      todo.completed = updated.completed;
      console.log(`Todo "${todo.title}" je sada ${todo.completed ? "završen" : "aktivan"}`);
      return updated;
    } catch (error) {
      console.error(error.message);
      return null;
    }
  }

  async deleteTodo(id) {
    try {
      const response = await fetch(`${this.apiUrl}/todos/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Greška pri brisanju");

      this.todos = this.todos.filter((t) => t.id !== id);
      console.log(`Todo ${id} obrisan`);
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }

  getStats() {
    const completed = this.todos.filter((t) => t.completed).length;
    return {
      total: this.todos.length,
      completed,
      active: this.todos.length - completed,
    };
  }
}
```

---

# Česte greške i best practices

## ❌ Greška 1: Zaboravljen `await`

```javascript
class UserService {
  async getUsers() {
    const response = fetch(url); // GREŠKA! Fali await!
    // response je Promise, nije Response objekat
    const data = response.json(); // Ovo neće raditi!
  }
}

// ISPRAVNO:
class UserService {
  async getUsers() {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}
```

## ❌ Greška 2: Neproveren response.ok

```javascript
// LOŠE - ignorišemo HTTP greške
async getUser(id) {
  const response = await fetch(`${this.url}/users/${id}`);
  return response.json(); // Šta ako je 404? Parsira error HTML kao JSON!
}

// DOBRO - proveravamo status
async getUser(id) {
  const response = await fetch(`${this.url}/users/${id}`);
  if (!response.ok) {
    throw new Error(`Korisnik ${id} nije pronađen (${response.status})`);
  }
  return response.json();
}
```

## ❌ Greška 3: Nema try/catch

```javascript
// LOŠE - ako fetch padne, cela aplikacija puca
async getUsers() {
  const response = await fetch(url);
  return response.json();
}

// DOBRO - graceful error handling
async getUsers() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Status: ${response.status}`);
    return response.json();
  } catch (error) {
    console.error('Greška:', error.message);
    return []; // Vrati fallback vrednost
  }
}
```

## ❌ Greška 4: `await` u konstruktoru

```javascript
// GREŠKA! Konstruktor NE MOŽE biti async!
class UserService {
  async constructor() { // SyntaxError!
    this.users = await fetch(url);
  }
}

// ISPRAVNO - koristi factory pattern ili init metodu
class UserService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.users = [];
  }

  async init() {
    this.users = await this.fetchUsers();
    return this; // Vrati this za chaining
  }

  async fetchUsers() {
    const res = await fetch(`${this.baseUrl}/users`);
    return res.json();
  }
}

// Korišćenje:
const service = new UserService("https://api.example.com");
await service.init();
```

## ✅ Best Practices

1. **Uvek koristi try/catch** u async metodama
2. **Uvek proveri response.ok** pre parsiranja
3. **Vrati fallback vrednosti** iz catch bloka (prazan niz, null, itd.)
4. **Centralizuj API logiku** u jednu baznu metodu (`_request`)
5. **Ne stavljaj async u konstruktor** - koristi `init()` metodu
6. **Koristi Promise.all** za paralelne zahteve
7. **Logiraj greške** da bi ih lakše pronašao

---

# Rezime

## Šta smo naučili?

| Koncept                    | Opis                                                    |
| -------------------------- | ------------------------------------------------------- |
| `async` metoda u klasi     | Metoda koja vraća Promise i može koristiti `await`      |
| `fetch()` API              | Ugrađena funkcija za HTTP zahteve                       |
| `response.ok`              | Boolean - da li je HTTP status 200-299                  |
| `response.json()`          | Parsira telo odgovora kao JSON (asinhrono!)             |
| `try/catch`                | Hvatanje grešaka u async kodu                           |
| CRUD                       | Create, Read, Update, Delete operacije                  |
| `Promise.all`              | Paralelno izvršavanje više async operacija              |
| Factory pattern / `init()` | Alternativa za async logiku koju ne možemo u konstruktor |

## Obrazac za pamćenje:

```javascript
class MojServis {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;       // 1. Podesi URL
  }

  async request(endpoint) {       // 2. Napravi request metodu
    try {
      const res = await fetch(    // 3. Čekaj odgovor
        `${this.baseUrl}${endpoint}`
      );
      if (!res.ok) throw new Error();  // 4. Proveri status
      return res.json();               // 5. Parsiraj i vrati
    } catch (err) {
      console.error(err);              // 6. Uhvati greške
      return null;
    }
  }
}
```
