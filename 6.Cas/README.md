## Zadatak 1 — To-Do lista

Zavrsiti pretvodni domaci:

- Input polje za unos zadatka
- Dugme "Dodaj zadatak"
- Deo za "live preview" unosa
- Lista zadataka
- Brojač preostalih zadataka

Zahtevi:

1. Kada korisnik unese tekst i klikne na dugme, zadatak se dodaje u listu.
2. Klikom na tekst zadatka treba da se doda ili ukloni klasa `done` (označava urađen zadatak).
3. Klikom na dugme "Obriši" zadatak se uklanja iz liste.
4. Brojač prikazuje broj **preostalih** zadataka (ukupno - urađeni).
5. Live preview se menja dok korisnik kuca.

---

## Pomoćni kod (ako zapnete)

### POTRUDITI SE BEZ!!!

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

```js
const input = document.getElementById('taskInput');
const preview = document.getElementById('livePreview');
const btn = document.getElementById('addTask');
const list = document.getElementById('taskList');
const counter = document.getElementById('counter');

function addTask() {
  const tekst = input.value.trim();
  if (tekst === '') return alert('Unesi zadatak!');

  const li = document.createElement('li');
  const span = document.createElement('span');
  const delBtn = document.createElement('button');

  span.textContent = tekst;
  delBtn.textContent = 'Obriši';

  span.addEventListener('click', () => {
    li.classList.toggle('done');
    updateCounter();
  });

  delBtn.addEventListener('click', () => {
    li.remove();
    updateCounter();
  });

  li.append(span, delBtn);
  list.appendChild(li);

  input.value = '';
  preview.innerHTML = 'Live preview: <em>Nema unosa</em>';
  updateCounter();
}

function updateCounter() {
  const total = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.done').length;
  counter.textContent = `Preostalo zadataka: ${total - done}`;
}

input.addEventListener('input', e => {
  const tekst = e.target.value.trim();
  preview.innerHTML = tekst
    ? `Live preview: <strong>${tekst}</strong>`
    : 'Live preview: <em>Nema unosa</em>';
});

btn.addEventListener('click', addTask);
```

---

## Ternary Operator

Ternary operator je **kraći način da napišemo if-else** u jednoj liniji.

Osnovna forma:

```js
uslov ? 'ako je tačno' : 'ako nije tačno';
```

Primer:

```js
const broj = 10;
const poruka = broj > 5 ? 'Veći od 5' : 'Manji ili jednak 5';
console.log(poruka); // Ispis: Veći od 5
```

Još jedan primer gde direktno menjamo element:

```js
preview.innerHTML = tekst
  ? `Live preview: <strong>${tekst}</strong>`
  : 'Live preview: <em>Nema unosa</em>';
```

---

## Zadatak 2 — Ternary vežbe

Uradi sledeće u JavaScript konzoli (ili posebnom .js fajlu):

**Zadatak 1:**

```js
const age = 18;
// Ako je osoba punoletna ispiši "Može da glasa", u suprotnom "Ne može da glasa"
```

**Zadatak 2:**

```js
const broj = 7;
// Ako je paran ispiši "Paran broj", ako nije "Neparan broj"
```

**Zadatak 3:**

```js
const ocena = 4;
// Ako je 5 ispiši "Odličan", ako je 4 ispiši "Vrlo dobar", ako je manje ispiši "Trudi se više"
// (Koristi ugnježdene ternary operatore)
```

---
