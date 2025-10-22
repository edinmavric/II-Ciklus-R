## Zadatak 1 — Promeni tekst klikom

U HTML fajlu napravi:
```html
<h1 id="naslov">Klikni dugme!</h1>
<button id="dugme">Klikni me</button>
```

U JavaScript fajlu:
- Selektuj `<h1>` i `<button>`.
- Dodaj event listener na dugme.
- Kada se klikne:
  - promeni tekst naslova (`textContent`) u:  
    `"Dugme je kliknuto!"`
  - promeni tekst dugmeta u:  
    `"Kliknuto je!"`
  - u konzoli prikaži `event.target`, kao i `event.target.tagName`.

---

## Zadatak 2 — Promeni boju pozadine

Napravi tri dugmeta:

```html
<button id="green">Zeleno</button>
<button id="red">Crveno</button>
<button id="blue">Plavo</button>
```

Kada se klikne neko dugme:
- promeni `backgroundColor` `body` elementa u odgovarajuću boju  
  (`green`, `red`, `blue`).

Primer:
```js
document.body.style.backgroundColor = 'red';
```

*Napomena:* svako dugme ima svoj `addEventListener` i funkciju.

---

## Zadatak 3 — Kombinovani zadatak

Napravi sledeće:

```html
<h2 id="status">Klikni neko dugme za promenu boje!</h2>
<button id="yellow">Žuto</button>
<button id="pink">Roze</button>
<button id="black">Crno</button>
```

U JavaScript-u:
- Kada klikneš neko dugme:
  - promeni `backgroundColor` stranice u tu boju
  - promeni tekst u `<h2>` u obliku:  
    `"Trenutna boja je: žuta"`
  - prikaži u konzoli `event.target.tagName` i `event.target.textContent`

---

## Zadatak 4 — Promeni veličinu i boju naslova

U HTML-u napravi:

```html
<h1 id="glavniNaslov">Naslov stranice</h1>
<button id="povecaj">Povećaj</button>
<button id="smanji">Smanji</button>
<button id="promeniBoju">Promeni boju</button>
```

U JavaScript-u:
- Kada se klikne dugme **Povećaj**, uvećaj `fontSize` naslova za 5px.  
- Kada se klikne **Smanji**, smanji `fontSize` za 5px.  
- Kada se klikne **Promeni boju**, neka se nasumično promeni boja teksta (npr. `red`, `blue`, `green`, `purple`).

*Pomoć:* koristi `Math.random()` i niz boja.

---

## Zadatak 5 — Brojač klikova

U HTML-u napravi:

```html
<h2 id="brojac">Klikova: 0</h2>
<button id="klikni">Klikni me!</button>
```

U JavaScript-u:
- Svaki put kada klikneš dugme, povećaj broj prikazan u `<h2>`.
- Koristi promenljivu `count` koja se uvećava svaki put za 1.

---

## BONUS

Pokušaj da **napraviš funkciju** `promeniBoju(boja)`  
koja prima boju kao argument i poziva se za svako dugme, npr:

```js
function promeniBoju(boja) {
  document.body.style.backgroundColor = boja;
}
```

Tako smanjuješ ponavljanje koda.
U event listener-u bi pozvao:

```js
yellow.addEventListener('click', () => promeniBoju('yellow'));
```

---

---

Rok: sledeći čas