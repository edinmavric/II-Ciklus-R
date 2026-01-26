# 28. Čas - Nasleđivanje (Inheritance)

## Sadržaj časa

- [Prvi deo: Šta je nasleđivanje?](#prvi-deo-šta-je-nasleđivanje)
- [Drugi deo: extends i super](#drugi-deo-extends-i-super)
- [Treći deo: Overriding metoda](#treći-deo-overriding-metoda)
- [Četvrti deo: Praktični primeri](#četvrti-deo-praktični-primeri)

---

# PRVI DEO: Šta je nasleđivanje?

## Definicija

**Nasleđivanje (Inheritance)** je mehanizam u OOP-u koji omogućava da jedna klasa preuzme svojstva i metode od druge klase.

> Klasa koja nasleđuje zove se **child (dete)** ili **subclass**.
> Klasa od koje se nasleđuje zove se **parent (roditelj)** ili **superclass**.

---

## Analogija - Porodično stablo

```
┌─────────────────────────────────────────────────────────────┐
│                    NASLEĐIVANJE                             │
│                                                             │
│                    ┌──────────────┐                         │
│                    │    Životinja  │  <- PARENT (roditelj)  │
│                    │  ───────────  │                        │
│                    │  ime          │                        │
│                    │  speak()      │                        │
│                    └──────────────┘                         │
│                           │                                 │
│              ┌────────────┼────────────┐                    │
│              │            │            │                    │
│              ▼            ▼            ▼                    │
│       ┌──────────┐ ┌──────────┐ ┌──────────┐               │
│       │   Pas    │ │  Mačka   │ │  Ptica   │  <- CHILDREN  │
│       │ ──────── │ │ ──────── │ │ ──────── │               │
│       │ rasa     │ │ dlaka    │ │ raspon   │               │
│       │ laj()    │ │ mjaukaj()│ │ leti()   │               │
│       └──────────┘ └──────────┘ └──────────┘               │
│                                                             │
│   Deca NASLEĐUJU: ime, speak() od roditelja                 │
│   Deca DODAJU: svoje specifične osobine i metode            │
└─────────────────────────────────────────────────────────────┘
```

---

## Zašto koristimo nasleđivanje?

### 1. Ponovna upotreba koda (Code Reuse)

```javascript
// BEZ nasleđivanja - ponavljanje koda
class Dog {
  constructor(name) {
    this.name = name;
  }
  eat() { console.log(`${this.name} jede`); }
  sleep() { console.log(`${this.name} spava`); }
  bark() { console.log("Av av!"); }
}

class Cat {
  constructor(name) {
    this.name = name;
  }
  eat() { console.log(`${this.name} jede`); }    // ISTO!
  sleep() { console.log(`${this.name} spava`); } // ISTO!
  meow() { console.log("Mjau!"); }
}
```

```javascript
// SA nasleđivanjem - bez ponavljanja
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() { console.log(`${this.name} jede`); }
  sleep() { console.log(`${this.name} spava`); }
}

class Dog extends Animal {
  bark() { console.log("Av av!"); }
}

class Cat extends Animal {
  meow() { console.log("Mjau!"); }
}
```

### 2. Hijerarhija i organizacija

```
                    Shape
                      │
          ┌───────────┼───────────┐
          │           │           │
       Circle    Rectangle    Triangle
                      │
                   Square
```

### 3. Princip DRY (Don't Repeat Yourself)

> Ako se isti kod ponavlja u više klasa, verovatno treba napraviti parent klasu.

---

## Terminologija

| Termin | Objašnjenje | Primer |
|--------|-------------|--------|
| **Parent/Superclass** | Klasa od koje se nasleđuje | `Animal` |
| **Child/Subclass** | Klasa koja nasleđuje | `Dog`, `Cat` |
| **extends** | Ključna reč za nasleđivanje | `class Dog extends Animal` |
| **super** | Poziv roditelja | `super()`, `super.method()` |
| **Override** | Zamena roditeljske metode | Child definiše istu metodu |

---

# DRUGI DEO: extends i super

## Ključna reč: extends

`extends` označava da jedna klasa nasleđuje drugu.

```javascript
class Parent {
  // ...
}

class Child extends Parent {
  // Child ima sve što i Parent + svoje
}
```

### Primer:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} pravi zvuk`);
  }
}

class Dog extends Animal {
  // Dog automatski ima: name, speak()

  // Dodajemo novu metodu samo za Dog
  bark() {
    console.log("Av av!");
  }
}

const dog = new Dog("Rex");
dog.speak();  // "Rex pravi zvuk" - nasledjeno od Animal
dog.bark();   // "Av av!" - specifično za Dog
```

---

## Ključna reč: super()

`super()` poziva konstruktor roditeljske klase.

### PRAVILO: Ako child ima constructor, MORA pozvati super() PRVO!

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);      // Poziva Animal constructor - MORA BITI PRVO!
    this.breed = breed; // Tek onda možemo koristiti 'this'
  }
}

const rex = new Dog("Rex", "Nemački ovčar");
console.log(rex.name);   // "Rex" (iz Animal)
console.log(rex.breed);  // "Nemački ovčar" (iz Dog)
```

### Šta se dešava bez super()?

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    // GREŠKA! 'this' nije definisan pre super() poziva
    this.breed = breed;  // ReferenceError!
    super(name);
  }
}
```

---

## Vizuelni prikaz super()

```
┌──────────────────────────────────────────────────────────────┐
│                new Dog("Rex", "Ovčar")                       │
│                          │                                   │
│                          ▼                                   │
│              Dog constructor(name, breed)                    │
│                          │                                   │
│                          ▼                                   │
│                    super(name)                               │
│                          │                                   │
│          ┌───────────────┴───────────────┐                   │
│          ▼                               │                   │
│   Animal constructor(name)               │                   │
│   this.name = "Rex"                      │                   │
│          │                               │                   │
│          └───────────────┬───────────────┘                   │
│                          ▼                                   │
│              this.breed = "Ovčar"                            │
│                          │                                   │
│                          ▼                                   │
│               { name: "Rex", breed: "Ovčar" }                │
└──────────────────────────────────────────────────────────────┘
```

---

## Ako child NEMA constructor

Ako child klasa nema svoj constructor, automatski se koristi roditeljski:

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  // Nema constructor - koristi se Animal-ov
  bark() {
    console.log("Av!");
  }
}

const dog = new Dog("Rex");  // Poziva Animal constructor
console.log(dog.name);       // "Rex"
```

---

# TREĆI DEO: Overriding metoda

## Šta je Override?

**Override** = Kada child klasa definiše metodu sa ISTIM IMENOM kao parent, zamenjujući njenu implementaciju.

```javascript
class Animal {
  speak() {
    console.log("Životinja pravi zvuk");
  }
}

class Dog extends Animal {
  // OVERRIDE - zamenjuje Animal.speak()
  speak() {
    console.log("Av av!");
  }
}

class Cat extends Animal {
  // OVERRIDE - zamenjuje Animal.speak()
  speak() {
    console.log("Mjau!");
  }
}

const animal = new Animal();
const dog = new Dog();
const cat = new Cat();

animal.speak();  // "Životinja pravi zvuk"
dog.speak();     // "Av av!"
cat.speak();     // "Mjau!"
```

---

## super.method() - Pozivanje roditeljske metode

Ponekad želimo da PROŠIRIMO roditeljsku metodu, ne da je potpuno zamenimo.

```javascript
class Animal {
  speak() {
    return "Životinja kaže: ";
  }
}

class Dog extends Animal {
  speak() {
    // Prvo pozivamo roditeljsku metodu
    const parentSays = super.speak();
    return parentSays + "Av av!";
  }
}

const dog = new Dog();
console.log(dog.speak());  // "Životinja kaže: Av av!"
```

### Praktičan primer:

```javascript
class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getInfo() {
    return `${this.name}, plata: ${this.salary} RSD`;
  }
}

class Manager extends Employee {
  constructor(name, salary, department) {
    super(name, salary);
    this.department = department;
  }

  // Proširujemo, ne zamenjujemo potpuno
  getInfo() {
    const baseInfo = super.getInfo();  // "Marko, plata: 80000 RSD"
    return `${baseInfo}, odeljenje: ${this.department}`;
  }
}

const manager = new Manager("Marko", 80000, "IT");
console.log(manager.getInfo());
// "Marko, plata: 80000 RSD, odeljenje: IT"
```

---

## Kada koristiti Override?

| Situacija | Primer |
|-----------|--------|
| **Specijalizovano ponašanje** | `Dog.speak()` umesto generičkog `Animal.speak()` |
| **Drugačija implementacija** | `Circle.area()` koristi π*r², `Rectangle.area()` koristi w*h |
| **Proširenje funkcionalnosti** | `Manager.getInfo()` dodaje odeljenje na osnovni info |

---

## Lanac nasleđivanja

Možemo imati više nivoa nasleđivanja:

```javascript
class Vehicle {
  constructor(brand) {
    this.brand = brand;
  }
  start() {
    console.log(`${this.brand} se pali`);
  }
}

class Car extends Vehicle {
  constructor(brand, doors) {
    super(brand);
    this.doors = doors;
  }
  honk() {
    console.log("Beep beep!");
  }
}

class ElectricCar extends Car {
  constructor(brand, doors, battery) {
    super(brand, doors);
    this.battery = battery;
  }
  start() {
    console.log(`${this.brand} se TIHO pali (električni)`);
  }
  charge() {
    console.log(`Punjenje baterije od ${this.battery} kWh`);
  }
}
```

```
        Vehicle
           │
          Car
           │
      ElectricCar
```

---

# ČETVRTI DEO: Praktični primeri

## Primer 1: Geometrijski oblici

```javascript
class Shape {
  constructor(name) {
    this.name = name;
  }

  area() {
    return 0;  // Bazna implementacija
  }

  describe() {
    return `${this.name} ima površinu ${this.area().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super("Krug");
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super("Pravougaonik");
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);  // Kvadrat je pravougaonik sa jednakim stranicama
    this.name = "Kvadrat";
  }
}
```

---

## Primer 2: Korisnici sistema

```javascript
class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
  }

  login() {
    console.log(`${this.username} se prijavio`);
  }

  getInfo() {
    return `Korisnik: ${this.username} (${this.email})`;
  }
}

class Admin extends User {
  constructor(username, email, level) {
    super(username, email);
    this.level = level;
    this.permissions = ["read", "write", "delete", "manage"];
  }

  login() {
    super.login();
    console.log(`  Nivo pristupa: ${this.level}`);
  }

  deleteUser(user) {
    console.log(`Admin ${this.username} briše korisnika ${user.username}`);
  }
}

class Guest extends User {
  constructor() {
    super("gost", "");
    this.permissions = ["read"];
  }

  login() {
    console.log("Gost pristupa sistemu (ograničen pristup)");
  }
}
```

---

## Vežbe

### Vežba 1: Vehicle → Car → ElectricCar

Kreirati hijerarhiju vozila:

**Vehicle (bazna klasa):**
- `brand`, `model`, `year`
- `start()`, `stop()`, `getInfo()`

**Car (nasleđuje Vehicle):**
- Dodaje: `doors`, `fuelType`
- Override: `getInfo()` da uključi broj vrata

**ElectricCar (nasleđuje Car):**
- Dodaje: `batteryCapacity`, `range`
- Override: `start()` za tiho paljenje
- Nova metoda: `charge()`

---

### Vežba 2: Person → Student → GraduateStudent

**Person:**
- `name`, `age`
- `introduce()`

**Student:**
- Dodaje: `school`, `grade`
- Dodaje: `introduce()` da uključi školu

**GraduateStudent:**
- Dodaje: `thesis`, `advisor`
- Dodaje: `introduce()` da uključi tezu

---

### Vežba 3: Animal kingdom

**Animal:**
- `name`, `age`
- `speak()`, `move()`, `eat()`

**Mammal extends Animal:**
- `furColor`
- Override: `move()` - "hoda"

**Bird extends Animal:**
- `wingSpan`
- Override: `move()` - "leti"

**Fish extends Animal:**
- `waterType` (slatka/slana)
- Override: `move()` - "pliva"

---

## Ključne tačke

1. **extends** = nasleđivanje klase

2. **super()** = poziv konstruktora roditelja (MORA biti prvi u constructor-u)

3. **super.method()** = poziv metode roditelja

4. **Override** = zamena roditeljske metode istoimenom metodom u child klasi

5. **Child ima sve od Parent-a** + može dodati svoje

---

## Domaći zadatak

### Zadatak: Sistem za e-commerce

Kreirati hijerarhiju proizvoda:

**Product (bazna klasa):**
- `name`, `price`, `stock`
- `getInfo()`, `isAvailable()`, `calculateDiscount(percent)`

**Electronics extends Product:**
- `warranty` (meseci garancije)
- `brand`
- Override: `getInfo()` da uključi garanciju

**Clothing extends Product:**
- `size`, `color`, `material`
- Override: `getInfo()` da uključi veličinu i boju

**Food extends Product:**
- `expirationDate`, `calories`
- Override: `isAvailable()` - proverava i rok trajanja
- Nova metoda: `isExpired()`

```javascript
// Očekivano korišćenje:
const laptop = new Electronics("Laptop", 150000, 5, 24, "Dell");
const shirt = new Clothing("Majica", 2500, 20, "L", "plava", "pamuk");
const milk = new Food("Mleko", 150, 50, "2024-02-01", 60);

console.log(laptop.getInfo());
// "Laptop - 150000 RSD (Garancija: 24 meseca, Brand: Dell)"

console.log(shirt.getInfo());
// "Majica - 2500 RSD (Veličina: L, Boja: plava)"

console.log(milk.isAvailable());
// true/false zavisi od datuma i stock-a

console.log(milk.isExpired());
// true/false
```
