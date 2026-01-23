# 27. Čas - Enkapsulacija (Private, Public)

## Sadržaj časa

- [Prvi deo: Zašto štitimo podatke](#prvi-deo-zašto-štitimo-podatke)
- [Drugi deo: Privatna polja i metode](#drugi-deo-privatna-polja-i-metode)
- [Treći deo: Getter i Setter](#treći-deo-getter-i-setter)

---

# PRVI DEO: Zašto štitimo podatke

## Problem sa direktnim pristupom

Kada koristimo obične objekte, bilo ko može direktno menjati podatke:

```javascript
const account = {
  owner: "Marko",
  balance: 1000
};

// PROBLEM: Bilo ko može direktno menjati!
account.balance = -5000;   // Nevalidna vrednost
account.balance = "banana"; // Pogrešan tip
```

### Posledice:
- Nema validacije podataka
- Podaci mogu biti u nevalidnom stanju
- Teško je pratiti ko i kada menja podatke
- Bagovi su teži za pronalaženje

---

## Šta je Enkapsulacija?

**Enkapsulacija** je jedan od osnovnih principa objektno-orijentisanog programiranja (OOP).

### Definicija:
> Enkapsulacija je sakrivanje internih detalja objekta i kontrolisanje pristupa podacima preko javnih metoda.

### Analogija - Bankomat:

```
┌─────────────────────────────────────┐
│           BANKOMAT                  │
│  ┌─────────────────────────────────┐   │
│  │    SEF SA NOVCEM                │   │  <- Privatno (ne možeš direktno)
│  │    (nije dostupan)              │   │
│  └─────────────────────────────────┘   │
│                                     │
│  [Ekran] [Tastatura] [Slot]        │  <- Javni interfejs
│                                     │
│  - Unesi PIN                        │
│  - Izaberi iznos                    │
│  - Sistem proverava stanje          │
│  - Beleži transakciju               │
└─────────────────────────────────────┘
```

### Prednosti enkapsulacije:

1. **Zaštita podataka** - sprečava nevalidne vrednosti
2. **Kontrola pristupa** - definiše ko može šta
3. **Validacija** - proverava podatke pre promene
4. **Održavanje** - lakše je menjati implementaciju
5. **Bezbednost** - sakriva osetljive podatke

---

# DRUGI DEO: Privatna polja i metode

## Sintaksa privatnih polja

U JavaScript-u, privatna polja počinju sa `#`:

```javascript
class BankAccount {
  // Privatna polja
  #balance = 0;
  #pin;

  // Javno svojstvo
  owner;

  constructor(owner, pin) {
    this.owner = owner;
    this.#pin = pin;
  }
}
```

### Pravila:
- Privatna polja **moraju** početi sa `#`
- Mogu se koristiti **samo unutar klase**
- Nisu dostupna izvan klase (čak ni naslednicima)
- Pokušaj pristupa van klase daje `SyntaxError`

---

## Primer: BankAccount

```javascript
class BankAccount {
  #balance = 0;

  constructor(owner, initialBalance) {
    this.owner = owner;
    if (initialBalance > 0) {
      this.#balance = initialBalance;
    }
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("Iznos mora biti pozitivan!");
      return false;
    }
    this.#balance += amount;
    return true;
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("Iznos mora biti pozitivan!");
      return false;
    }
    if (amount > this.#balance) {
      console.log("Nedovoljno sredstava!");
      return false;
    }
    this.#balance -= amount;
    return true;
  }

  getBalance() {
    return this.#balance;
  }
}

const account = new BankAccount("Marko", 1000);

// Korišćenje javnih metoda
account.deposit(500);     // OK
account.withdraw(200);    // OK
account.getBalance();     // 1300

// Pokušaj direktnog pristupa
account.#balance;         // SyntaxError!
account.#balance = 999;   // SyntaxError!
```

---

## Privatne metode

Metode takođe mogu biti privatne:

```javascript
class CreditCard {
  #number;
  #cvv;

  constructor(number, cvv) {
    this.#number = number;
    this.#cvv = cvv;
  }

  // Privatna metoda - pomoćna funkcija
  #maskNumber() {
    return "**** **** **** " + this.#number.slice(-4);
  }

  // Privatna metoda - validacija
  #isValidTransaction(amount) {
    return amount > 0 && amount <= 10000;
  }

  // Javna metoda koristi privatne
  getCardInfo() {
    return `Kartica: ${this.#maskNumber()}`;
  }

  pay(amount) {
    if (!this.#isValidTransaction(amount)) {
      return false;
    }
    // ... procesiranje plaćanja
    return true;
  }
}
```

### Kada koristiti privatne metode:
- Pomoćne funkcije koje ne treba da budu javne
- Validacija i provere
- Logovanje i interne operacije
- Bilo šta što je "implementacioni detalj"

---

## Vizuelni prikaz

```
┌────────────────────────────────────────────┐
│              KLASA BankAccount             │
├────────────────────────────────────────────┤
│  PRIVATNO (sakriveno)                      │
│  ─────────────────────                     │
│  #balance                                  │
│  #transactionHistory                       │
│  #validateAmount()                         │
│  #logTransaction()                         │
├────────────────────────────────────────────┤
│  JAVNO (dostupno)                          │
│  ─────────────────                         │
│  owner                                     │
│  deposit(amount)                           │
│  withdraw(amount)                          │
│  getBalance()                              │
│  getHistory()                              │
└────────────────────────────────────────────┘

Spolja možeš pristupiti SAMO javnom delu!
```

---

# TREĆI DEO: Getter i Setter

## Šta su Getter i Setter?

**Getter** i **Setter** su specijalne metode koje omogućavaju kontrolisan pristup privatnim poljima.

| Tip | Svrha | Sintaksa |
|-----|-------|----------|
| **Getter** | Čitanje vrednosti | `get propertyName()` |
| **Setter** | Postavljanje vrednosti | `set propertyName(value)` |

### Ključna razlika od običnih metoda:
- Koriste se **kao svojstva** (bez zagrada)
- Izgledaju kao direktan pristup, ali imaju logiku

---

## Osnovna sintaksa

```javascript
class Circle {
  #radius = 0;

  constructor(radius) {
    this.radius = radius;  // Koristi SETTER
  }

  // GETTER - čitanje
  get radius() {
    return this.#radius;
  }

  // SETTER - pisanje sa validacijom
  set radius(value) {
    if (value < 0) {
      console.log("Poluprečnik ne može biti negativan!");
      return;
    }
    this.#radius = value;
  }

  // Getter za izračunatu vrednost
  get area() {
    return Math.PI * this.#radius ** 2;
  }
}

const circle = new Circle(5);

// Korišćenje - izgleda kao svojstvo!
console.log(circle.radius);  // 5 (poziva getter)
circle.radius = 10;          // (poziva setter)
console.log(circle.area);    // 314.159... (izračunato)

circle.radius = -5;          // "Poluprečnik ne može biti negativan!"
console.log(circle.radius);  // 10 (nije promenjeno)
```

---

## Prednosti Getter/Setter-a

### 1. Validacija pri postavljanju

```javascript
class Person {
  #age;

  get age() {
    return this.#age;
  }

  set age(value) {
    if (value < 0 || value > 150) {
      console.log("Nevalidne godine!");
      return;
    }
    this.#age = value;
  }
}
```

### 2. Izračunate vrednosti

```javascript
class Rectangle {
  #width;
  #height;

  // Površina se izračunava, ne čuva
  get area() {
    return this.#width * this.#height;
  }

  get perimeter() {
    return 2 * (this.#width + this.#height);
  }
}
```

### 3. Formatiranje pri čitanju

```javascript
class Product {
  #price;

  get price() {
    return this.#price;
  }

  get formattedPrice() {
    return `${this.#price.toFixed(2)} RSD`;
  }
}
```

### 4. Konverzija jedinica

```javascript
class Temperature {
  #celsius;

  get celsius() {
    return this.#celsius;
  }

  set celsius(value) {
    this.#celsius = value;
  }

  get fahrenheit() {
    return (this.#celsius * 9/5) + 32;
  }

  set fahrenheit(value) {
    this.#celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature();
temp.celsius = 100;
console.log(temp.fahrenheit);  // 212

temp.fahrenheit = 32;
console.log(temp.celsius);     // 0
```

---

## Praktičan primer: User klasa

```javascript
class User {
  #email;
  #password;
  #createdAt;

  constructor(email, password) {
    this.email = email;      // Koristi setter
    this.password = password; // Koristi setter
    this.#createdAt = new Date();
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (!value.includes("@")) {
      throw new Error("Nevalidan email!");
    }
    this.#email = value.toLowerCase();
  }

  // Samo setter - lozinka se ne može čitati!
  set password(value) {
    if (value.length < 8) {
      throw new Error("Lozinka mora imati min 8 karaktera!");
    }
    this.#password = value;
  }

  // Getter bez settera - read-only
  get createdAt() {
    return this.#createdAt;
  }

  // Metoda za proveru lozinke
  checkPassword(password) {
    return password === this.#password;
  }
}
```

---

## Uporedni pregled

| Pristup | Sintaksa | Validacija | Korišćenje |
|---------|----------|------------|------------|
| Javno svojstvo | `this.name` | Nema | `obj.name` |
| Privatno + metoda | `this.#name` + `getName()` | Da | `obj.getName()` |
| Privatno + getter | `this.#name` + `get name()` | Da | `obj.name` |

---

## Vežbe

### Vežba 1: BankAccount sa poboljšanjima

Kreirati klasu `BankAccount`:
- Privatna polja: `#balance`, `#transactionHistory`
- Getter za `balance`
- Metode: `deposit()`, `withdraw()`, `getHistory()`
- Validacija: zabraniti negativan depozit/podizanje

### Vežba 2: Product sa validacijom

Kreirati klasu `Product`:
- Privatna polja: `#price`, `#discount`
- Getter i Setter za `price` (ne sme biti negativna)
- Getter i Setter za `discount` (0-100%)
- Getter `finalPrice` (cena sa popustom)

### Vežba 3: PasswordManager

Kreirati klasu za čuvanje lozinki:
- Master lozinka za pristup
- Privatna mapa za čuvanje lozinki
- Metode za dodavanje, čitanje, generisanje lozinki

---

## Ključne tačke

1. **Enkapsulacija** = sakrivanje podataka + kontrolisan pristup

2. **Privatna polja** (`#`) - nisu dostupna van klase

3. **Privatne metode** (`#`) - pomoćne funkcije unutar klase

4. **Getter** (`get`) - kontrolisano čitanje, koristi se kao svojstvo

5. **Setter** (`set`) - kontrolisano pisanje sa validacijom

6. **Pravilo**: Ako podatak treba zaštititi -> privatno polje + getter/setter

---

## Domaći zadatak

### Zadatak: Inventory sistem

Kreirati klasu `Inventory` za upravljanje zalihama:

**Privatna polja:**
- `#items` - mapa proizvoda (ime -> količina)
- `#minStock` - minimalna količina za upozorenje

**Metode:**
- `addItem(name, quantity)` - dodaje proizvod
- `removeItem(name, quantity)` - uklanja proizvod
- `getStock(name)` - vraća količinu
- `getLowStockItems()` - vraća proizvode ispod minimuma

**Getter/Setter:**
- `get totalItems` - ukupan broj svih proizvoda
- `get/set minStock` - sa validacijom (min 1)

```javascript
// Očekivano korišćenje:
const inv = new Inventory();
inv.minStock = 5;

inv.addItem("Laptop", 10);
inv.addItem("Miš", 3);

console.log(inv.getStock("Laptop")); // 10
console.log(inv.totalItems);         // 13
console.log(inv.getLowStockItems()); // ["Miš"]
```
