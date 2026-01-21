# 26. Čas - Metode, `this` i Kontekst

## Sadržaj časa

- [Prvi deo: Ponavljanje klasa + Vežba](#prvi-deo-ponavljanje-klasa--vežba)
- [Drugi deo: Metode i `this` keyword](#drugi-deo-metode-i-this-keyword)
- [Treći deo: Problem gubitka konteksta](#treći-deo-problem-gubitka-konteksta)

---

# PRVI DEO: Ponavljanje klasa + Vežba

## Brzo ponavljanje

### Struktura klase:

```javascript
class ImeKlase {
  constructor(parametar1, parametar2) {
    this.svojstvo1 = parametar1;
    this.svojstvo2 = parametar2;
  }

  metoda1() {
    // kod metode
  }

  metoda2() {
    // kod metode
  }
}

// Kreiranje instance
const instanca = new ImeKlase(vrednost1, vrednost2);
```

### Ključne tačke:
1. `class` - ključna reč za definisanje klase
2. `constructor` - poziva se automatski pri `new`
3. `this` - referenca na trenutnu instancu
4. `new` - obavezno pri kreiranju instance
5. Metode - bez `function` keyword, bez zareza između

---

## Vežba za ponavljanje: Klasa `Playlist`

Napraviti klasu `Playlist` za muzičku aplikaciju:

**Svojstva:**
- `name` - ime plejliste
- `songs` - niz pesama (počinje prazan)

**Metode:**
- `addSong(song)` - dodaje pesmu u plejlistu
- `removeSong(song)` - uklanja pesmu iz plejliste
- `getSongCount()` - vraća broj pesama
- `showPlaylist()` - prikazuje sve pesme

```javascript
// Očekivano korišćenje:
const myPlaylist = new Playlist("Moje omiljene");
myPlaylist.addSong("Queen - Bohemian Rhapsody");
myPlaylist.addSong("AC/DC - Back in Black");
myPlaylist.showPlaylist();
// Plejlista: Moje omiljene
// 1. Queen - Bohemian Rhapsody
// 2. AC/DC - Back in Black
```

---

# DRUGI DEO: Metode i `this` keyword

## Cilj

Razumeti:
- Kako metode rade unutar klase
- Šta je `this` i na šta pokazuje
- Kako `this` zavisi od konteksta poziva

---

## 1. Šta je metoda?

**Metoda** je funkcija koja pripada objektu/klasi.

```javascript
class Dog {
  constructor(name) {
    this.name = name;
  }

  // Ovo je metoda
  bark() {
    console.log(`${this.name} kaže: Av av!`);
  }

  // Još jedna metoda
  introduce() {
    console.log(`Ja sam pas i zovem se ${this.name}`);
  }
}

const dog = new Dog("Žućo");
dog.bark();      // "Žućo kaže: Av av!"
dog.introduce(); // "Ja sam pas i zovem se Žućo"
```

---

## 2. Kako radi `this`?

`this` pokazuje na **objekat na kome je metoda pozvana**.

```javascript
class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  addPoints(points) {
    this.score += points;
    console.log(`${this.name} ima ${this.score} poena`);
  }
}

const player1 = new Player("Marko");
const player2 = new Player("Ana");

player1.addPoints(10); // this = player1 → "Marko ima 10 poena"
player2.addPoints(15); // this = player2 → "Ana ima 15 poena"
player1.addPoints(5);  // this = player1 → "Marko ima 15 poena"
```

### Vizuelno objašnjenje:

```
player1.addPoints(10)
   ↓
   this = player1
   this.name = "Marko"
   this.score = 0 + 10 = 10

player2.addPoints(15)
   ↓
   this = player2
   this.name = "Ana"
   this.score = 0 + 15 = 15
```

---

## 3. Metode koje pozivaju druge metode

Metode mogu koristiti `this` da pozovu druge metode iste klase:

```javascript
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    return this; // Omogućava chain-ovanje
  }

  subtract(num) {
    this.result -= num;
    return this;
  }

  multiply(num) {
    this.result *= num;
    return this;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
    return this;
  }
}

const calc = new Calculator();
calc.add(10);
calc.multiply(2);
calc.subtract(5);
console.log(calc.getResult()); // 15

// Ili chain-ovano:
const result = new Calculator()
  .add(10)
  .multiply(2)
  .subtract(5)
  .getResult();
console.log(result); // 15
```

---

# TREĆI DEO: Problem gubitka konteksta

## Cilj

Razumeti:
- Kada se gubi `this` kontekst
- Zašto se to dešava
- Kako to rešiti

---

## 1. Problem: `this` u callback funkcijama

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log("Count:", this.count);
  }

  startCounting() {
    // PROBLEM: this se gubi u setTimeout!
    setTimeout(this.increment, 1000);
  }
}

const counter = new Counter();
counter.startCounting(); // ERROR ili NaN!
```

### Zašto se ovo dešava?

Kada prosledimo `this.increment` kao callback, funkcija se "odvaja" od objekta:

```javascript
setTimeout(this.increment, 1000);
// ↓ Isto kao:
const fn = this.increment; // Samo funkcija, bez "this"
setTimeout(fn, 1000);      // Kad se pozove, this = undefined
```

---

## 2. Demonstracija problema

```javascript
class Button {
  constructor(label) {
    this.label = label;
  }

  click() {
    console.log(`Kliknuto na: ${this.label}`);
  }
}

const btn = new Button("Submit");

// Ovo radi:
btn.click(); // "Kliknuto na: Submit"

// Ovo NE radi:
const clickFn = btn.click;
clickFn(); // "Kliknuto na: undefined" - this je izgubljen!
```

---

## 3. Rešenje #1: Arrow funkcija

Arrow funkcije **ne menjaju this** - zadržavaju `this` iz okružujućeg koda:

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log("Count:", this.count);
  }

  startCounting() {
    // REŠENJE: Arrow funkcija čuva this
    setTimeout(() => {
      this.increment();
    }, 1000);
  }
}

const counter = new Counter();
counter.startCounting(); // Radi! "Count: 1"
```

### Zašto arrow funkcija radi?

```javascript
// Obična funkcija - this zavisi od POZIVA
setTimeout(function() {
  this.increment(); // this = window/undefined
}, 1000);

// Arrow funkcija - this zavisi od DEFINISANJA
setTimeout(() => {
  this.increment(); // this = counter (sačuvan iz startCounting)
}, 1000);
```

---

## 4. Rešenje #2: `bind()` metoda

`bind()` kreira novu funkciju sa "zaključanim" `this`:

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log("Count:", this.count);
  }

  startCounting() {
    // REŠENJE: bind() zaključava this
    setTimeout(this.increment.bind(this), 1000);
  }
}
```

### Šta radi `bind()`?

```javascript
const counter = new Counter();

// Originalna metoda
const original = counter.increment;
original(); // this = undefined ❌

// Sa bind()
const bound = counter.increment.bind(counter);
bound(); // this = counter ✅
```

---

## 5. Rešenje #3: Sačuvati `this` u varijablu

Stariji pristup, ali i dalje validan:

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log("Count:", this.count);
  }

  startCounting() {
    const self = this; // Sačuvaj referencu
    setTimeout(function() {
      self.increment(); // Koristi sačuvanu referencu
    }, 1000);
  }
}
```

---

## 6. Rešenje #4: Arrow funkcija kao svojstvo klase

Moderna sintaksa - definiši metodu kao arrow funkciju:

```javascript
class Counter {
  constructor() {
    this.count = 0;
  }

  // Arrow funkcija kao svojstvo - this je uvek zaključan
  increment = () => {
    this.count++;
    console.log("Count:", this.count);
  }

  startCounting() {
    setTimeout(this.increment, 1000); // Radi bez bind()!
  }
}
```

---

## Uporedni pregled rešenja

| Rešenje | Sintaksa | Kada koristiti |
|---------|----------|----------------|
| Arrow callback | `() => { this.method() }` | Najčešće, u setTimeout/addEventListener |
| `bind()` | `this.method.bind(this)` | Kada treba proslediti samo referencu |
| `self = this` | `const self = this` | Stariji kod, legacy |
| Arrow svojstvo | `method = () => {}` | Event handleri, React komponente |

---

## Vežbe

### Vežba 1: Counter klasa
Napraviti klasu `Counter` sa:
- `increment()`, `decrement()`, `reset()`
- `startAutoIncrement()` - povećava svakih 2 sekunde
- `stopAutoIncrement()` - zaustavlja automatsko povećanje

### Vežba 2: Timer klasa
Napraviti klasu `Timer` sa:
- `start()` - pokreće odbrojavanje
- `stop()` - zaustavlja
- `reset()` - vraća na početnu vrednost

### Vežba 3: Button simulator
Napraviti klasu koja simulira dugme sa delayed click-om.

---

## Ključne tačke

1. **`this`** u metodi pokazuje na objekat na kome je metoda pozvana
2. **Problem**: Kada se metoda prosledi kao callback, gubi se `this`
3. **Arrow funkcije** čuvaju `this` iz okružujućeg scope-a
4. **`bind()`** kreira novu funkciju sa zaključanim `this`
5. **Arrow svojstva klase** automatski čuvaju `this`

---

## Domaći zadatak

Napraviti klasu `Stopwatch` (štoperica) sa:
- Svojstvima: `seconds`, `isRunning`, `intervalId`
- Metodama:
  - `start()` - pokreće štopericu
  - `stop()` - pauzira
  - `reset()` - vraća na 0
  - `lap()` - beleži trenutno vreme (čuva u nizu `laps`)
  - `getLaps()` - vraća sve zabeležene vremene
