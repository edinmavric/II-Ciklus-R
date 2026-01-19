# 25. Čas - Uvod u Klase i OOP u JavaScript-u

## Sadržaj časa

- [Prvi deo: Zašto klase postoje?](#prvi-deo-zašto-klase-postoje)
- [Drugi deo: Prva JavaScript klasa](#drugi-deo-prva-javascript-klasa)

---

# PRVI DEO: Zašto klase postoje?

## Cilj

Razumeti zašto su klase uvedene i koja je razlika između:
- Običnih objekata
- Factory funkcija
- Constructor funkcija
- Klasa

---

## 1. Kako smo ranije pravili objekte?

### Problem: Copy-Paste pristup

Zamislimo da pravimo aplikaciju za evidenciju korisnika. Počinjemo ovako:

```javascript
const user1 = {
  name: "Marko",
  age: 25,
  greet: function() {
    console.log("Zdravo, ja sam " + this.name);
  }
};

const user2 = {
  name: "Ana",
  age: 22,
  greet: function() {
    console.log("Zdravo, ja sam " + this.name);
  }
};

const user3 = {
  name: "Petar",
  age: 30,
  greet: function() {
    console.log("Zdravo, ja sam " + this.name);
  }
};
```

### Problemi ovog pristupa:

1. **Ponavljanje koda** - ista struktura se ponavlja
2. **Teško održavanje** - ako želimo promeniti `greet()`, moramo menjati na 3 mesta
3. **Nema garancije konzistentnosti** - možemo greškom izostaviti neko svojstvo
4. **Ne skalira** - šta ako imamo 100 korisnika?

---

## 2. Rešenje #1: Factory funkcije

**Factory funkcija** je obična funkcija koja pravi i vraća objekte.

```javascript
function createUser(name, age) {
  return {
    name: name,
    age: age,
    greet: function() {
      console.log("Zdravo, ja sam " + this.name);
    }
  };
}

// Kraći zapis (ES6 shorthand)
function createUser(name, age) {
  return {
    name,  // isto kao name: name
    age,   // isto kao age: age
    greet() {
      console.log("Zdravo, ja sam " + this.name);
    }
  };
}
```

### Korišćenje:

```javascript
const user1 = createUser("Marko", 25);
const user2 = createUser("Ana", 22);
const user3 = createUser("Petar", 30);

user1.greet(); // "Zdravo, ja sam Marko"
user2.greet(); // "Zdravo, ja sam Ana"
```

### Prednosti:
- Nema ponavljanja koda
- Lako se menja na jednom mestu
- Konzistentna struktura

### Nedostaci:
- Svaki objekat ima svoju kopiju metoda (troši memoriju)
- Ne možemo lako proveriti "tip" objekta

---

## 3. Rešenje #2: Constructor funkcije

**Constructor funkcija** koristi `new` keyword i `this`.

```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function() {
    console.log("Zdravo, ja sam " + this.name);
  };
}

const user1 = new User("Marko", 25);
const user2 = new User("Ana", 22);
```

### Šta radi `new` keyword?

Kada koristimo `new User(...)`:

1. Kreira se novi prazan objekat `{}`
2. `this` unutar funkcije pokazuje na taj novi objekat
3. Objekat se automatski vraća

### Prednosti:
- Možemo proveriti tip: `user1 instanceof User` → `true`
- Jasnije je da pravimo "tip" objekta

---

## 4. OOP Terminologija

Pre nego pređemo na klase, upoznajmo se sa terminologijom:

| Termin | Značenje | Primer |
|--------|----------|--------|
| **Klasa** | Šablon/blueprint za kreiranje objekata | `class User { }` |
| **Objekat** | Instanca klase, konkretan podatak | `{ name: "Marko" }` |
| **Instanca** | Objekat kreiran iz klase | `new User()` |
| **Svojstvo (Property)** | Podaci koje objekat čuva | `this.name` |
| **Metoda** | Funkcija koja pripada objektu | `greet()` |
| **Constructor** | Specijalna metoda za inicijalizaciju | `constructor()` |

### Analogija iz stvarnog života:

- **Klasa** = Nacrt kuće (blueprint)
- **Instanca** = Konkretna izgrađena kuća
- **Svojstva** = Karakteristike kuće (broj soba, boja)
- **Metode** = Šta kuća može (otvoriti vrata, upaliti svetlo)

---

# DRUGI DEO: Prva JavaScript klasa

## Cilj

Naučiti:
- Šta je `class`
- Šta je `constructor`
- Kako se pravi instanca (`new`)
- Kako radi `this`

---

## 1. Sintaksa klase

```javascript
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Zdravo, ja sam ${this.name}`);
  }

  getInfo() {
    return `${this.name}, ${this.age} godina`;
  }
}
```

### Delovi klase:

1. **`class User`** - deklaracija klase (ime uvek velikim slovom!)
2. **`constructor()`** - specijalna metoda koja se poziva pri kreiranju instance
3. **`this`** - referenca na trenutnu instancu
4. **Metode** - funkcije definisane unutar klase (bez `function` keyword!)

---

## 2. Kreiranje instance

```javascript
const user1 = new User("Marko", 25);
const user2 = new User("Ana", 22);

console.log(user1.name);  // "Marko"
console.log(user2.age);   // 22

user1.greet();  // "Zdravo, ja sam Marko"
user2.greet();  // "Zdravo, ja sam Ana"

console.log(user1.getInfo());  // "Marko, 25 godina"
```

---

## 3. Kako radi `this`?

`this` uvek pokazuje na **trenutnu instancu** - objekat na kome je metoda pozvana.

```javascript
const user1 = new User("Marko", 25);
const user2 = new User("Ana", 22);

user1.greet();  // this = user1, ispisuje "Marko"
user2.greet();  // this = user2, ispisuje "Ana"
```

---

## 4. Pravila pisanja klasa

### Pravilno:

```javascript
class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
  }

  start() {
    console.log(`${this.brand} ${this.model} se pali`);
  }
}
```

### Česte greške:

```javascript
// GREŠKA 1: Zarez između metoda
class Car {
  constructor() { },  // ❌ Nema zareza!
  start() { }
}

// GREŠKA 2: function keyword
class Car {
  function start() { }  // ❌ Bez function!
}
function
// GREŠKA 3: Zaboravljen new
const car = Car("BMW", "M3");  // ❌ Fali new!
```

---

## 5. Razlika: Klasa vs Constructor funkcija

```javascript
// Constructor funkcija (stari način)
function User(name) {
  this.name = name;
}
User.prototype.greet = function() {
  console.log("Hi " + this.name);
};

// Klasa (moderni način) - isto ponašanje, lepša sintaksa
class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hi " + this.name);
  }
}
```

Klase su "syntactic sugar" - lepši način pisanja istog koda.

---

## Vežbe

### Vežba 1: Factory funkcija
Napraviti factory funkciju `createProduct(name, price)` i kreirati 3 proizvoda.

### Vežba 2: Klasa Car
Napraviti klasu `Car` sa:
- Svojstvima: `brand`, `model`, `year`
- Metodama: `start()`, `stop()`, `getAge()`

### Vežba 3: Klasa Student
Napraviti klasu `Student` sa:
- Svojstvima: `name`, `grades` (niz ocena)
- Metodama: `addGrade(grade)`, `getAverage()`, `isPassing()`

---

## Ključne tačke

1. **Klase rešavaju problem ponavljanja koda**
2. **`constructor`** se poziva automatski pri `new`
3. **`this`** pokazuje na trenutnu instancu
4. **Ime klase** uvek počinje velikim slovom
5. **`new`** je obavezan pri kreiranju instance
6. **Metode** se pišu bez `function` i bez zareza između njih

---

## Domaći zadatak

Napraviti klasu `BankAccount` sa:
- Svojstvima: `owner`, `balance`
- Metodama:
  - `deposit(amount)` - dodaje novac
  - `withdraw(amount)` - skida novac (ako ima dovoljno)
  - `getBalance()` - vraća trenutno stanje
  - `transfer(amount, targetAccount)` - prebacuje novac na drugi račun
