# Vežba - CRUD Operacije sa JSONPlaceholder API

## Zadatak: Sistem za upravljanje korisnicima i njihovim postovima

Kreirajte mini aplikaciju koja omogućava upravljanje korisnicima i njihovim postovima koristeći JSONPlaceholder API.

### Funkcionalni zahtevi:

#### 1. Prikaz korisnika (GET)
- Dohvatite listu svih korisnika sa `https://jsonplaceholder.typicode.com/users`
- Prikažite ih u HTML tabeli sa kolonama: ID, Ime, Email, Grad
- Dodajte dugme "Prikaži postove" pored svakog korisnika

#### 2. Prikaz postova korisnika (GET)
- Kada se klikne na "Prikaži postove", dohvatite sve postove tog korisnika
- Koristite: `https://jsonplaceholder.typicode.com/posts?userId={id}`
- Prikažite postove ispod tabele korisnika

#### 3. Dodavanje novog posta (POST)
- Napravite formu za kreiranje novog posta (naslov i sadržaj)
- Forma treba da se pojavi kada je korisnik selektovan
- Pri slanju forme, pošaljite POST zahtev na `https://jsonplaceholder.typicode.com/posts`
- Prikažite novi post u listi nakon uspešnog kreiranja

#### 4. Izmena posta (PUT ili PATCH)
- Dodajte dugme "Izmeni" pored svakog posta
- Klikom na dugme, polja posta postaju editabilna
- Omogućite čuvanje izmena (koristite PUT ili PATCH - razmislite koji je prikladniji!)
- Endpoint: `https://jsonplaceholder.typicode.com/posts/{id}`

#### 5. Brisanje posta (DELETE)
- Dodajte dugme "Obriši" pored svakog posta
- Pri kliku, pošaljite DELETE zahtev
- Uklonite post iz prikaza nakon uspešnog brisanja
- Endpoint: `https://jsonplaceholder.typicode.com/posts/{id}`

### Bonus zadaci:
- Dodajte loading indikator dok se podaci učitavaju
- Dodajte potvrdu pre brisanja ("Da li ste sigurni?")
- Stilizujte aplikaciju sa CSS-om
- Dodajte prikaz grešaka korisniku ako nešto pođe po zlu

### Napomene:
- JSONPlaceholder je fake API - podaci se neće stvarno sačuvati na serveru, ali će API vratiti odgovarajuće odgovore
- Razmislite o tome kada koristiti `async/await` a kada `.then()`
- Organizujte kod u funkcije - svaka funkcija treba da radi jednu stvar
- Koristite `try/catch` za hvatanje grešaka

### Pomoć:
- GET sve korisnike: `fetch('https://jsonplaceholder.typicode.com/users')`
- GET postove korisnika: `fetch('https://jsonplaceholder.typicode.com/posts?userId=1')`
- POST novi post: `fetch(url, { method: 'POST', body: JSON.stringify(data), headers: {...} })`
- PUT/PATCH izmena: `fetch(url, { method: 'PUT', body: JSON.stringify(data), headers: {...} })`
- DELETE brisanje: `fetch(url, { method: 'DELETE' })`
