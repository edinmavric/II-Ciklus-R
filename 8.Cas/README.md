# Domaći Zadatak - DOM Manipulacija

## 1. Lista Studenata sa Pretragom

Unaprediti postojeću aplikaciju za prikaz studenata koju smo radili na času.

### HTML Struktura:

```html
<div class="container">
  <h2>Lista Studenata</h2>
  <input id="search" placeholder="Pretraži studente..." />

  <table id="studentsTable">
    <thead>
      <tr>
        <th>Ime</th>
        <th>Grad</th>
        <th>Godine</th>
        <th>Akcije</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <div class="stats">
    <p>Prosečne godine: <span id="avgAge">0</span></p>
    <p>Ukupno studenata: <span id="totalStudents">0</span></p>
  </div>

  <form id="addStudentForm">
    <h3>Dodaj Novog Studenta</h3>
    <input type="text" id="newName" placeholder="Ime" required />
    <input type="text" id="newCity" placeholder="Grad" required />
    <input
      type="number"
      id="newAge"
      placeholder="Godine"
      required
      min="18"
      max="99"
    />
    <button type="submit">Dodaj Studenta</button>
  </form>
</div>
```

### Funkcionalnosti:

1. Pretraga:

   - Implementirati pretragu koja radi istovremeno po imenu i gradu (kao što smo radili na času)
   - Pretraga treba da bude case-insensitive

2. Manipulacija Podacima:

   - Omogućiti dodavanje novog studenta kroz formu
   - Dodati dugme "Obriši" pored svakog studenta

3. Statistika:
   - Prikazati ukupan broj studenata
   - Izračunati i prikazati prosečne godine studenata

### CSS Zahtevi:

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.controls {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}

.stats {
  display: flex;
  justify-content: space-between;
  background-color: #f0f0f0;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: 0 auto;
}

input,
select,
button {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
  }

  table {
    display: block;
    overflow-x: auto;
  }
}
```

## 2. Todo Lista sa Live Previewom

Napraviti todo listu koja će imati sledeće funkcionalnosti:

### HTML Struktura:

```html
<div class="container">
  <h1>Todo Lista</h1>

  <div class="input-section">
    <input type="text" id="taskInput" placeholder="Upiši novi zadatak..." />
    <p id="livePreview">Live preview: <em>Nema unosa</em></p>
    <button id="addTask">Dodaj Zadatak</button>
  </div>

  <div class="filters">
    <button id="showAll" class="active">Svi</button>
    <button id="showActive">Aktivni</button>
    <button id="showCompleted">Završeni</button>
  </div>

  <ul id="taskList"></ul>

  <div class="stats">
    <p>Ukupno zadataka: <span id="totalTasks">0</span></p>
    <p>Završeno: <span id="completedTasks">0</span></p>
  </div>
</div>
```

### Funkcionalnosti:

1. Osnovno:

   - Dodavanje novog zadatka na listu
   - Live preview teksta dok se kuca (kao što smo radili na času)
   - Označavanje zadatka kao završenog (klikom na tekst)
   - Brisanje zadatka

2. Filtriranje:

   - Prikazivanje svih zadataka
   - Prikazivanje samo aktivnih zadataka
   - Prikazivanje samo završenih zadataka

3. Statistika:
   - Prikaz ukupnog broja zadataka
   - Prikaz broja završenih zadataka

### CSS Zahtevi:

````css
###CSS: ```css .container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.input-section {
  margin-bottom: 20px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 15px;
  margin-right: 5px;
  border: none;
  border-radius: 4px;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

#livePreview {
  margin: 10px 0;
  font-style: italic;
  color: #666;
}

.filters {
  margin: 20px 0;
}

.filters button {
  background-color: #ddd;
  color: #333;
}

.filters button.active {
  background-color: #4caf50;
  color: white;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f9f9f9;
  border-radius: 4px;
}

li.done {
  text-decoration: line-through;
  color: #888;
}

.stats {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f0f0;
  border-radius: 4px;
}

@media (max-width: 480px) {
  .filters {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  button {
    width: 100%;
    margin-bottom: 5px;
  }
}
````

## 3. Mini E-Commerce Prodavnica

Napraviti jednostavnu e-commerce prodavnicu sa osnovnim funkcionalnostima.

### HTML Struktura:

```html
<div class="store-container">
  <h1>Online Prodavnica</h1>

  <div class="search-section">
    <input type="text" id="searchInput" placeholder="Pretraži proizvode..." />
  </div>

  <div id="productsContainer" class="products-grid">
    <!-- Proizvodi će biti dodati kroz JavaScript -->
  </div>

  <div class="cart">
    <h2>Korpa</h2>
    <ul id="cartItems"></ul>
    <p>Ukupno: <span id="total">0</span> RSD</p>
  </div>
</div>
```

### JavaScript Početni Kod:

```javascript
const products = [
  {
    id: 1,
    name: 'Laptop',
    price: 85000,
    image: 'https://example.com/laptop.jpg',
  },
];
```

### Funkcionalnosti:

1. Prikaz Proizvoda:

   - Prikazati sve proizvode iz niza na stranici
   - Svaki proizvod treba da ima sliku, naziv, cenu i dugme "Dodaj u korpu"
   - Koristiti createElement i innerHTML za kreiranje elemenata

2. Pretraga:

   - Implementirati pretragu proizvoda po nazivu
   - Pretraga treba da bude case-insensitive
   - Rezultati se prikazuju odmah tokom kucanja (kao što smo radili na času)

3. Korpa:
   - Dodavanje proizvoda u korpu
   - Prikaz dodatih proizvoda u korpi
   - Računanje ukupne cene
   - Dugme za uklanjanje proizvoda iz korpe
   - Dodati brojač količine proizvoda u korpi



### CSS:

```css
.store-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.search-section {
  margin-bottom: 20px;
}

.search-section input {
  padding: 8px;
  width: 200px;
  margin-right: 10px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.product-card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.product-card img {
  max-width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}

.product-card h3 {
  margin: 10px 0;
}

.product-card button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
}

.product-card button:hover {
  background-color: #45a049;
}

.cart {
  border: 1px solid #ddd;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.cart ul {
  list-style: none;
  padding: 0;
}

.cart li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

@media (max-width: 768px) {
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}
```

Srećno sa izradom!
