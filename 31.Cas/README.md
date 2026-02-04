# 31. Čas - Kompozicija vs Nasleđivanje

---

## Sadržaj časa

- [Uvod: Problem sa previše nasleđivanja](#uvod-problem-sa-previše-nasleđivanja)
- ["is-a" vs "has-a" odnosi](#is-a-vs-has-a-odnosi)
- [Kompozicija objekata](#kompozicija-objekata)
- [Dependency Injection (ubrizgavanje zavisnosti)](#dependency-injection-ubrizgavanje-zavisnosti)
- [Praktični primeri](#praktični-primeri)
- [Kada koristiti šta?](#kada-koristiti-šta)

---

# Uvod: Problem sa previše nasleđivanja

## "Favor composition over inheritance"

Ovo je jedan od najvažnijih principa u OOP dizajnu. Ali zašto?

### Problem 1: Kruta hijerarhija

```javascript
// Zamislimo da pravimo igru sa različitim karakterima

class Character {
  move() { console.log("Hoda"); }
  attack() { console.log("Udara"); }
}

class Warrior extends Character {
  attack() { console.log("Udara mačem"); }
}

class Mage extends Character {
  attack() { console.log("Baca magiju"); }
  castSpell() { console.log("Čarolija!"); }
}

// Sada želimo letećeg ratnika... Problem!
// Ne možemo naslediti od DVE klase u JavaScript-u
class FlyingWarrior extends Warrior {
  // Kako da dodamo letenje?
  // Moramo ručno kopirati kod iz neke "Flying" klase
}
```

### Problem 2: Banana-Gorilla problem

> "Hteo si bananu, a dobio si gorilu koja drži bananu, i celu džunglu."

```javascript
class Animal {
  constructor() {
    this.legs = 4;
    this.habitat = "forest";
    this.diet = "omnivore";
    // ...još 50 propertyja koje možda ne trebamo
  }

  eat() { /* kompleksna logika */ }
  sleep() { /* kompleksna logika */ }
  reproduce() { /* kompleksna logika */ }
  migrate() { /* kompleksna logika */ }
}

class Dog extends Animal {
  bark() { console.log("Av!"); }
  // Dobili smo SVE od Animal, čak i ako nam ne treba
}
```

### Problem 3: Promena u parent-u lomi child klase

```javascript
class Vehicle {
  start() {
    console.log("Startovanje...");
    this.checkFuel(); // Dodali smo ovo kasnije
  }

  checkFuel() {
    console.log("Proveravam gorivo...");
  }
}

class ElectricCar extends Vehicle {
  // Problem! ElectricCar nema gorivo, ali start() poziva checkFuel()
  // Moramo override-ovati metode koje možda nismo ni znali da postoje
}
```

---

# "is-a" vs "has-a" odnosi

## Ključno pitanje pre korišćenja `extends`

Kada razmišljaš da li da koristiš nasleđivanje, postavi sebi pitanje:

| Pitanje | Ako je odgovor DA | Primer |
|---------|-------------------|--------|
| Da li je X **vrsta** Y-a? | Koristi `extends` | Pas **je** životinja |
| Da li X **ima** Y? | Koristi kompoziciju | Auto **ima** motor |

## Primeri "is-a" (nasleđivanje je OK)

```javascript
// Pas JE životinja - jasna hijerarhija
class Animal { }
class Dog extends Animal { }

// Krug JE oblik - matematički tačno
class Shape { }
class Circle extends Shape { }

// Admin JE korisnik - admin ima sve što i korisnik + više
class User { }
class Admin extends User { }
```

## Primeri "has-a" (koristi kompoziciju!)

```javascript
// Auto NIJE motor. Auto IMA motor.
// LOŠE:
class Engine { }
class Car extends Engine { } // Nema smisla!

// DOBRO:
class Engine {
  start() { console.log("Vroom!"); }
}

class Car {
  constructor() {
    this.engine = new Engine(); // Auto IMA motor
  }

  start() {
    this.engine.start();
  }
}
```

```javascript
// Korisnik NIJE servis za permisije. Korisnik IMA permisije.
// LOŠE:
class PermissionService { }
class User extends PermissionService { }

// DOBRO:
class PermissionService {
  canRead() { return true; }
  canWrite() { return false; }
}

class User {
  constructor(permissionService) {
    this.permissions = permissionService;
  }

  canEdit() {
    return this.permissions.canWrite();
  }
}
```

---

# Kompozicija objekata

## Šta je kompozicija?

**Kompozicija** je tehnika gde objekat sadrži druge objekte kao svoje delove, umesto da ih nasleđuje.

```
┌─────────────────────────────────────────────────────────────┐
│                     KOMPOZICIJA                             │
│                                                             │
│      ┌──────────────────────────────────────────┐          │
│      │              Car                          │          │
│      │  ┌─────────┐  ┌─────────┐  ┌─────────┐   │          │
│      │  │ Engine  │  │  Wheels │  │  Radio  │   │          │
│      │  │         │  │         │  │         │   │          │
│      │  │ start() │  │ rotate()│  │ play()  │   │          │
│      │  └─────────┘  └─────────┘  └─────────┘   │          │
│      └──────────────────────────────────────────┘          │
│                                                             │
│      Auto se SASTOJI OD delova (ima ih)                    │
│      Auto NIJE ni motor, ni točkovi, ni radio              │
└─────────────────────────────────────────────────────────────┘
```

## Primer: Auto sa delovima

```javascript
// Svaki deo je zasebna klasa sa svojom odgovornošću
class Engine {
  constructor(horsePower) {
    this.horsePower = horsePower;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    console.log(`Motor od ${this.horsePower}KS upaljen`);
  }

  stop() {
    this.isRunning = false;
    console.log("Motor ugašen");
  }
}

class AirConditioner {
  constructor() {
    this.isOn = false;
    this.temperature = 22;
  }

  turnOn() {
    this.isOn = true;
    console.log(`Klima upaljena na ${this.temperature}°C`);
  }

  setTemperature(temp) {
    this.temperature = temp;
    console.log(`Temperatura podešena na ${temp}°C`);
  }
}

class GPS {
  navigate(destination) {
    console.log(`Navigacija do: ${destination}`);
  }
}

// Auto KORISTI ove delove (kompozicija)
class Car {
  constructor(brand, engine, ac, gps) {
    this.brand = brand;
    this.engine = engine;     // IMA motor
    this.ac = ac;             // IMA klimu
    this.gps = gps;           // IMA GPS
  }

  start() {
    console.log(`${this.brand} se pali...`);
    this.engine.start();
  }

  coolDown() {
    this.ac.turnOn();
  }

  goTo(destination) {
    this.gps.navigate(destination);
  }
}

// Kreiranje auta sa različitim delovima
const myEngine = new Engine(150);
const myAC = new AirConditioner();
const myGPS = new GPS();

const myCar = new Car("Toyota", myEngine, myAC, myGPS);

myCar.start();              // Toyota se pali... Motor od 150KS upaljen
myCar.coolDown();           // Klima upaljena na 22°C
myCar.goTo("Beograd");      // Navigacija do: Beograd
```

## Prednosti kompozicije

| Prednost | Objašnjenje |
|----------|-------------|
| **Fleksibilnost** | Možemo lako zameniti delove (npr. jači motor) |
| **Ponovna upotreba** | Isti `Engine` možemo koristiti u različitim vozilima |
| **Lakše testiranje** | Možemo testirati svaki deo zasebno |
| **Nema duboke hijerarhije** | Izbegavamo komplikovan lanac nasleđivanja |

---

# Dependency Injection (ubrizgavanje zavisnosti)

## Šta je Dependency Injection?

**Dependency Injection (DI)** je tehnika gde objekat prima svoje zavisnosti spolja (kroz constructor ili metode), umesto da ih sam kreira.

```
┌─────────────────────────────────────────────────────────────┐
│                 DEPENDENCY INJECTION                        │
│                                                             │
│    BEZ DI (loše):                SA DI (dobro):            │
│    ──────────────                ─────────────              │
│                                                             │
│    class Car {                   class Car {                │
│      constructor() {               constructor(engine) {    │
│        this.engine =                 this.engine = engine;  │
│          new Engine();           }                          │
│      }                           }                          │
│    }                                                        │
│                                  // Spolja biramo motor     │
│    // Uvek isti motor            const car = new Car(       │
│    const car = new Car();          new TurboEngine()        │
│                                  );                         │
└─────────────────────────────────────────────────────────────┘
```

## Zašto je DI važan?

### 1. Fleksibilnost - lako menjamo implementaciju

```javascript
// Interfejs (koncept) - šta motor mora da ima
// Engine mora imati start() i stop()

class PetrolEngine {
  start() { console.log("Benzinski motor: Vroom!"); }
  stop() { console.log("Benzinski motor ugašen"); }
}

class ElectricEngine {
  start() { console.log("Električni motor: *tiho*"); }
  stop() { console.log("Električni motor ugašen"); }
}

class DieselEngine {
  start() { console.log("Dizel motor: BRBRBR!"); }
  stop() { console.log("Dizel motor ugašen"); }
}

// Auto prima BILO KOJI motor koji ima start() i stop()
class Car {
  constructor(engine) {
    this.engine = engine;
  }

  start() {
    this.engine.start();
  }
}

// Možemo napraviti različite automobile
const teslaCar = new Car(new ElectricEngine());
const golfCar = new Car(new DieselEngine());
const fiatCar = new Car(new PetrolEngine());

teslaCar.start();  // Električni motor: *tiho*
golfCar.start();   // Dizel motor: BRBRBR!
fiatCar.start();   // Benzinski motor: Vroom!
```

### 2. Testiranje - možemo ubaciti "lažne" zavisnosti

```javascript
// Za testiranje možemo napraviti mock engine
class MockEngine {
  constructor() {
    this.startCalled = false;
  }

  start() {
    this.startCalled = true;
  }

  stop() { }
}

// U testu
const mockEngine = new MockEngine();
const car = new Car(mockEngine);
car.start();

console.log(mockEngine.startCalled);  // true - test prolazi!
```

### 3. Labava sprega (Loose Coupling)

Klasa `Car` ne zna i ne zanima je koji tačno motor koristi. Bitno je samo da motor ima `start()` metodu.

---

# Praktični primeri

## Primer 1: User + PermissionService

```javascript
// Servis za proveru dozvola
class PermissionService {
  constructor(role) {
    this.role = role;
  }

  canRead() {
    return true; // Svi mogu da čitaju
  }

  canWrite() {
    return this.role === "admin" || this.role === "editor";
  }

  canDelete() {
    return this.role === "admin";
  }

  canManageUsers() {
    return this.role === "admin";
  }
}

// Korisnik KORISTI permission service (ne nasleđuje ga!)
class User {
  constructor(name, email, permissionService) {
    this.name = name;
    this.email = email;
    this.permissions = permissionService;
  }

  canEditDocument() {
    return this.permissions.canWrite();
  }

  canDeleteDocument() {
    return this.permissions.canDelete();
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

// Kreiranje korisnika sa različitim dozvolama
const adminPermissions = new PermissionService("admin");
const editorPermissions = new PermissionService("editor");
const viewerPermissions = new PermissionService("viewer");

const admin = new User("Marko", "marko@firma.com", adminPermissions);
const editor = new User("Ana", "ana@firma.com", editorPermissions);
const viewer = new User("Petar", "petar@firma.com", viewerPermissions);

console.log(`${admin.name} može brisati: ${admin.canDeleteDocument()}`);   // true
console.log(`${editor.name} može brisati: ${editor.canDeleteDocument()}`); // false
console.log(`${viewer.name} može editovati: ${viewer.canEditDocument()}`); // false
```

## Primer 2: Order + PaymentService

```javascript
// Različiti načini plaćanja
class CashPayment {
  processPayment(amount) {
    console.log(`Plaćanje gotovinom: ${amount} RSD`);
    return { success: true, method: "cash" };
  }
}

class CardPayment {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  processPayment(amount) {
    console.log(`Plaćanje karticom ***${this.cardNumber.slice(-4)}: ${amount} RSD`);
    // Ovde bi išla komunikacija sa bankom
    return { success: true, method: "card" };
  }
}

class CryptoPayment {
  constructor(walletAddress) {
    this.wallet = walletAddress;
  }

  processPayment(amount) {
    console.log(`Plaćanje kriptom na ${this.wallet}: ${amount} RSD`);
    return { success: true, method: "crypto" };
  }
}

// Narudžbina prima payment service spolja
class Order {
  constructor(items, paymentService) {
    this.items = items;
    this.paymentService = paymentService;
    this.status = "pending";
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    const total = this.calculateTotal();
    console.log(`Narudžbina - ukupno: ${total} RSD`);

    const result = this.paymentService.processPayment(total);

    if (result.success) {
      this.status = "paid";
      console.log("Narudžbina uspešno plaćena!");
    }

    return result;
  }
}

// Korišćenje - isti Order, različiti načini plaćanja
const items = [
  { name: "Laptop", price: 150000, quantity: 1 },
  { name: "Miš", price: 3000, quantity: 2 }
];

// Plaćanje gotovinom
const cashOrder = new Order(items, new CashPayment());
cashOrder.checkout();

// Plaćanje karticom
const cardOrder = new Order(items, new CardPayment("1234567890123456"));
cardOrder.checkout();

// Plaćanje kriptom
const cryptoOrder = new Order(items, new CryptoPayment("0x123...abc"));
cryptoOrder.checkout();
```

## Primer 3: Logger servis

```javascript
// Različiti načini logovanja
class ConsoleLogger {
  log(message) {
    console.log(`[CONSOLE] ${new Date().toISOString()}: ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }
}

class FileLogger {
  constructor(filename) {
    this.filename = filename;
    this.logs = []; // U pravoj aplikaciji bi pisalo u fajl
  }

  log(message) {
    const entry = `[FILE] ${new Date().toISOString()}: ${message}`;
    this.logs.push(entry);
    console.log(`Upisano u ${this.filename}: ${message}`);
  }

  error(message) {
    this.log(`ERROR: ${message}`);
  }
}

class SilentLogger {
  log(message) { /* Ne radi ništa - za produkciju */ }
  error(message) { /* Ne radi ništa */ }
}

// Aplikacija koristi logger koji joj se prosledi
class UserService {
  constructor(logger) {
    this.logger = logger;
    this.users = [];
  }

  createUser(name, email) {
    const user = { id: Date.now(), name, email };
    this.users.push(user);
    this.logger.log(`Kreiran korisnik: ${name}`);
    return user;
  }

  deleteUser(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      this.logger.error(`Korisnik ${id} ne postoji`);
      return false;
    }
    this.users.splice(index, 1);
    this.logger.log(`Obrisan korisnik: ${id}`);
    return true;
  }
}

// U developmentu - detaljni logovi
const devService = new UserService(new ConsoleLogger());
devService.createUser("Marko", "marko@test.com");

// U produkciji - bez logova ili u fajl
const prodService = new UserService(new SilentLogger());
prodService.createUser("Ana", "ana@test.com");
```

---

# Kada koristiti šta?

## Koristi NASLEĐIVANJE kada:

| Situacija | Primer |
|-----------|--------|
| Postoji jasna "is-a" relacija | Dog **is an** Animal |
| Child je **specijalizovana verzija** parent-a | Admin is a specialized User |
| Želiš da **dodeliš zajedničko ponašanje** | Svi oblici imaju `area()` |
| Hijerarhija je **plitka** (1-2 nivoa) | Animal → Dog |

```javascript
// DOBRO korišćenje nasleđivanja
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() { console.log(`${this.name} jede`); }
}

class Dog extends Animal {
  bark() { console.log("Av!"); }
}
```

## Koristi KOMPOZICIJU kada:

| Situacija | Primer |
|-----------|--------|
| Postoji "has-a" relacija | Car **has an** Engine |
| Želiš **fleksibilnost** - menjanje ponašanja | Različiti payment metodi |
| Imaš **više nezavisnih funkcionalnosti** | Logger, Validator, Cache |
| Želiš **izbegavanje dubokog nasleđivanja** | Umesto A → B → C → D |
| Funkcionalnost može biti **deljena između nepovezanih klasa** | I User i Order mogu imati Logger |

```javascript
// DOBRO korišćenje kompozicije
class Engine { start() { } }
class AC { turnOn() { } }

class Car {
  constructor(engine, ac) {
    this.engine = engine;
    this.ac = ac;
  }
}
```

---

## Tabela poređenja

| Aspekt | Nasleđivanje | Kompozicija |
|--------|--------------|-------------|
| Relacija | "is-a" (jeste) | "has-a" (ima) |
| Fleksibilnost | Manja (fiksna hijerarhija) | Veća (lako se menjaju delovi) |
| Coupling | Čvrsto povezano | Labavo povezano |
| Testiranje | Teže (zavisi od parent-a) | Lakše (mock zavisnosti) |
| Promena | Promena parent-a utiče na child | Nezavisne promene |
| Višestruke funkcionalnosti | Nije moguće (jedan parent) | Moguće (više komponenti) |

---

## Zlatno pravilo

> **"Favor composition over inheritance"**
>
> Uvek prvo razmisli da li možeš rešiti problem kompozicijom.
> Nasleđivanje koristi samo kada je "is-a" relacija apsolutno jasna.

---

## Rezime

| Pojam | Objašnjenje |
|-------|-------------|
| **Kompozicija** | Objekat sadrži druge objekte kao svoje delove |
| **"is-a"** | Relacija gde je nešto vrsta nečeg drugog (koristi extends) |
| **"has-a"** | Relacija gde nešto ima/sadrži nešto drugo (koristi kompoziciju) |
| **Dependency Injection** | Zavisnosti se prosleđuju spolja (kroz constructor) |
| **Loose Coupling** | Klase nisu čvrsto povezane, lako se menjaju |
| **Fleksibilnost** | Mogućnost lake zamene komponenti |
