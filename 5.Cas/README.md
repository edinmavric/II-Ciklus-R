# Domaći zadatak — Napredna To-Do lista

## Cilj

Kreirati **interaktivnu To-Do listu** koja koristi sledeće DOM funkcionalnosti:

- `input` event → za prikaz unosa uživo
- `click` event → za dodavanje, označavanje i brisanje zadataka
- `change` event → za checkbox
- `classList.toggle()` → za menjanje izgleda završenih zadataka
- Dinamičko ažuriranje broja preostalih zadataka

---

## Uputstvo

HTML struktura (osnova):

```html
<div class="todo-app">
  <h2>Moja To-Do Lista</h2>

  <input id="taskInput" placeholder="Unesi novi zadatak..." />
  <p id="livePreview">Live preview: <em>Nema unosa</em></p>
  <button id="addTask">Dodaj</button>

  <ul id="taskList"></ul>
  <p id="counter">Preostalo zadataka: 0</p>
</div>
```

---

## Funkcionalnosti koje treba implementirati

### 1. Live preview (input event)

Dok korisnik kuca u input, ispod se uživo prikazuje tekst koji trenutno unosi.

Ako je polje prazno — prikazati “Nema unosa”.

### 2. Dodavanje novog zadatka (click event)

Klikom na dugme “Dodaj”, dodaje se novi <li> u listu.

Svaki zadatak treba da sadrži:

- tekst zadatka

- dugme “Obriši”

- checkbox za označavanje da je urađen

### 3. Označavanje zadatka kao urađenog (change + toggle)

Klikom na checkbox, zadatak se označava kao urađen (classList.toggle('done')).

### 4. Brisanje zadatka (click event)

Klikom na dugme “Obriši”, briše se taj zadatak.

### 5. Ažuriranje broja aktivnih zadataka

Funkcija updateCounter() prebrojava zadatke koji nisu označeni kao urađeni i prikazuje ih ispod liste.

Znaci duzina nekih nizeva (NodeList-i)