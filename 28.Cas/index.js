// ============================================
// 28. ČAS - NASLEĐIVANJE (INHERITANCE)
// ============================================

// ============================================
// UVOD: PROBLEM KOJI REŠAVA NASLEĐIVANJE
// ============================================

console.log('========================================');
console.log('UVOD: ZASTO NAM TREBA NASLEDJIVANJE?');
console.log('========================================\n');

// --------------------------------------------
// Problem: Ponavljanje koda
// --------------------------------------------

console.log('=== Problem: Ponavljanje koda ===\n');

// BEZ nasleđivanja - isti kod se ponavlja
console.log('BEZ nasledjivanja (lose):');
console.log(`
class Dog {
  constructor(name) { this.name = name; }
  eat() { ... }   // ISTO
  sleep() { ... } // ISTO
  bark() { ... }
}

class Cat {
  constructor(name) { this.name = name; }
  eat() { ... }   // ISTO - ponavljanje!
  sleep() { ... } // ISTO - ponavljanje!
  meow() { ... }
}
`);

console.log('SA nasledjivanjem (dobro):');
console.log(`
class Animal {
  constructor(name) { this.name = name; }
  eat() { ... }
  sleep() { ... }
}

class Dog extends Animal { bark() { ... } }
class Cat extends Animal { meow() { ... } }
`);

// ============================================
// PRVI DEO: OSNOVE NASLEĐIVANJA
// ============================================

console.log('\n========================================');
console.log('PRVI DEO: OSNOVE NASLEDJIVANJA');
console.log('========================================\n');

// --------------------------------------------
// 1. extends - ključna reč za nasleđivanje
// --------------------------------------------

console.log('=== 1. extends - kljucna rec ===\n');

class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} pravi neki zvuk`);
  }

  eat() {
    console.log(`${this.name} jede`);
  }

  sleep() {
    console.log(`${this.name} spava`);
  }
}

// Dog NASLEDJUJE Animal
class Dog extends Animal {
  // Dog automatski ima: name, speak(), eat(), sleep()

  // Dodajemo novu metodu samo za Dog
  bark() {
    console.log('Av av!');
  }

  // Dodajemo novo svojstvo
  fetch() {
    console.log(`${this.name} donosi lopticu`);
  }
}

// Cat NASLEDJUJE Animal
class Cat extends Animal {
  meow() {
    console.log('Mjau!');
  }

  climb() {
    console.log(`${this.name} se penje na drvo`);
  }
}

// Kreiranje objekata
const genericAnimal = new Animal('Zivotinja');
const dog = new Dog('Rex');
const cat = new Cat('Maca');

console.log('Animal:');
genericAnimal.speak();
genericAnimal.eat();

console.log('\nDog (ima sve od Animal + svoje):');
dog.speak(); // Nasledjeno od Animal
dog.eat(); // Nasledjeno od Animal
dog.bark(); // Specifično za Dog
dog.fetch(); // Specifično za Dog

console.log('\nCat (ima sve od Animal + svoje):');
cat.speak(); // Nasledjeno
cat.meow(); // Specifično za Cat
cat.climb(); // Specifično za Cat

// ============================================
// DRUGI DEO: super()
// ============================================

console.log('\n========================================');
console.log('DRUGI DEO: super() - POZIV RODITELJA');
console.log('========================================\n');

// --------------------------------------------
// 1. super() u konstruktoru
// --------------------------------------------

console.log('=== 1. super() u konstruktoru ===\n');

class Vehicle {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    console.log(`  [Vehicle constructor] brand=${brand}, model=${model}`);
  }

  getInfo() {
    return `${this.brand} ${this.model}`;
  }

  start() {
    console.log(`${this.brand} ${this.model} se pali`);
  }

  stop() {
    console.log(`${this.brand} ${this.model} se gasi`);
  }
}

class Car extends Vehicle {
  constructor(brand, model, doors) {
    console.log(`  [Car constructor] Pozivam super(${brand}, ${model})`);
    super(brand, model); // MORA biti PRVO!
    this.doors = doors;
    console.log(`  [Car constructor] doors=${doors}`);
  }

  getInfo() {
    return `${super.getInfo()} (${this.doors} vrata)`;
  }

  honk() {
    console.log('Beep beep!');
  }
}

console.log('Kreiranje Car objekta:');
const car = new Car('Toyota', 'Corolla', 4);
console.log('\nRezultat:');
console.log('brand:', car.brand);
console.log('model:', car.model);
console.log('doors:', car.doors);
console.log('getInfo():', car.getInfo());

// --------------------------------------------
// 2. Lanac nasleđivanja
// --------------------------------------------

console.log('\n=== 2. Lanac nasledjivanja ===\n');

class ElectricCar extends Car {
  constructor(brand, model, doors, batteryCapacity) {
    super(brand, model, doors); // Poziva Car constructor
    this.batteryCapacity = batteryCapacity;
    this.chargeLevel = 100;
  }

  start() {
    console.log(`${this.brand} ${this.model} se TIHO pali (elektricni motor)`);
  }

  charge() {
    this.chargeLevel = 100;
    console.log(`Baterija od ${this.batteryCapacity}kWh napunjena na 100%`);
  }

  getInfo() {
    return `${super.getInfo()}, baterija: ${this.batteryCapacity}kWh`;
  }
}

console.log('Hijerarhija: Vehicle -> Car -> ElectricCar\n');

const tesla = new ElectricCar('Tesla', 'Model 3', 4, 75);
console.log('\nTesla info:', tesla.getInfo());
tesla.start(); // Override verzija
tesla.honk(); // Nasledjeno od Car
tesla.charge(); // Specifično za ElectricCar

// ============================================
// TREĆI DEO: OVERRIDING METODA
// ============================================

console.log('\n========================================');
console.log('TRECI DEO: OVERRIDING METODA');
console.log('========================================\n');

// --------------------------------------------
// 1. Osnove override-a
// --------------------------------------------

console.log('=== 1. Sta je Override? ===\n');

class AnimalWithSound {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name}: *pravi genericki zvuk*`);
  }
}

class DogWithSound extends AnimalWithSound {
  // OVERRIDE - zamenjuje roditeljsku metodu
  speak() {
    console.log(`${this.name}: Av av!`);
  }
}

class CatWithSound extends AnimalWithSound {
  // OVERRIDE
  speak() {
    console.log(`${this.name}: Mjau!`);
  }
}

class CowWithSound extends AnimalWithSound {
  // OVERRIDE
  speak() {
    console.log(`${this.name}: Muuu!`);
  }
}

const animals = [
  new AnimalWithSound('Nepoznata zivotinja'),
  new DogWithSound('Rex'),
  new CatWithSound('Maca'),
  new CowWithSound('Sarena'),
];

console.log('Svaka klasa ima svoju verziju speak():');
animals.forEach((animal) => animal.speak());

// --------------------------------------------
// 2. super.method() - proširivanje metode
// --------------------------------------------

console.log('\n=== 2. super.method() - prosirivanje ===\n');

class Employee {
  constructor(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  getInfo() {
    return `Ime: ${this.name}, Plata: ${this.salary} RSD`;
  }

  work() {
    console.log(`${this.name} radi...`);
  }
}

class Manager extends Employee {
  constructor(name, salary, department, teamSize) {
    super(name, salary);
    this.department = department;
    this.teamSize = teamSize;
  }

  // PROŠIRUJEMO roditeljsku metodu (ne zamenjujemo potpuno)
  getInfo() {
    const baseInfo = super.getInfo(); // Pozivamo roditeljsku verziju
    return `${baseInfo}, Odeljenje: ${this.department}, Tim: ${this.teamSize}`;
  }

  // POTPUNO ZAMENJUJEMO
  work() {
    console.log(`${this.name} vodi sastanke i upravlja timom od ${this.teamSize} ljudi`);
  }

  // Nova metoda
  hire(person) {
    console.log(`${this.name} zapošljava ${person}`);
  }
}

class Developer extends Employee {
  constructor(name, salary, language) {
    super(name, salary);
    this.language = language;
  }

  getInfo() {
    return `${super.getInfo()}, Jezik: ${this.language}`;
  }

  work() {
    console.log(`${this.name} piše kod u ${this.language}`);
  }

  debug() {
    console.log(`${this.name} traži bagove...`);
  }
}

const emp = new Employee('Petar', 50000);
const mgr = new Manager('Marko', 100000, 'IT', 8);
const dev = new Developer('Ana', 80000, 'JavaScript');

console.log('Employee:');
console.log(emp.getInfo());
emp.work();

console.log('\nManager:');
console.log(mgr.getInfo());
mgr.work();
mgr.hire('Novi zaposleni');

console.log('\nDeveloper:');
console.log(dev.getInfo());
dev.work();
dev.debug();

// ============================================
// ČETVRTI DEO: PRAKTIČNI PRIMERI
// ============================================

console.log('\n========================================');
console.log('CETVRTI DEO: PRAKTICNI PRIMERI');
console.log('========================================\n');

// --------------------------------------------
// Primer 1: Geometrijski oblici
// --------------------------------------------

console.log('=== Primer 1: Geometrijski oblici ===\n');

class Shape {
  constructor(name) {
    this.name = name;
  }

  area() {
    return 0; // Bazna implementacija
  }

  perimeter() {
    return 0;
  }

  describe() {
    return `${this.name}: P=${this.area().toFixed(2)}, O=${this.perimeter().toFixed(2)}`;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super('Krug');
    this.radius = radius;
  }

  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super('Pravougaonik');
    this.width = width;
    this.height = height;
  }

  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side); // Kvadrat = pravougaonik sa jednakim stranicama
    this.name = 'Kvadrat'; // Override imena
  }
}

class Triangle extends Shape {
  constructor(a, b, c) {
    super('Trougao');
    this.a = a;
    this.b = b;
    this.c = c;
  }

  area() {
    // Heronova formula
    const s = (this.a + this.b + this.c) / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  perimeter() {
    return this.a + this.b + this.c;
  }
}

const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Square(4),
  new Triangle(3, 4, 5),
];

console.log('Svi oblici koriste isti interfejs:\n');
shapes.forEach((shape) => console.log(shape.describe()));

const totalArea = shapes.reduce((sum, s) => sum + s.area(), 0);
console.log(`\nUkupna povrsina: ${totalArea.toFixed(2)}`);

// --------------------------------------------
// Primer 2: Sistem korisnika
// --------------------------------------------

console.log('\n=== Primer 2: Sistem korisnika ===\n');

class User {
  constructor(username, email) {
    this.username = username;
    this.email = email;
    this.createdAt = new Date();
  }

  login() {
    console.log(`[LOGIN] ${this.username} se prijavio`);
  }

  logout() {
    console.log(`[LOGOUT] ${this.username} se odjavio`);
  }

  getInfo() {
    return `${this.username} (${this.email})`;
  }
}

class Admin extends User {
  constructor(username, email, accessLevel) {
    super(username, email);
    this.accessLevel = accessLevel;
    this.permissions = ['read', 'write', 'delete', 'manage'];
  }

  login() {
    super.login();
    console.log(`  -> Admin pristup, nivo: ${this.accessLevel}`);
  }

  deleteUser(user) {
    console.log(`[ADMIN] ${this.username} briše korisnika ${user.username}`);
  }

  getInfo() {
    return `${super.getInfo()} [ADMIN L${this.accessLevel}]`;
  }
}

class Guest extends User {
  constructor() {
    super('gost', 'nema-email');
    this.permissions = ['read'];
  }

  login() {
    console.log('[LOGIN] Gost pristupa sistemu (ogranicen pristup)');
  }

  getInfo() {
    return 'Gost (neprijavljen korisnik)';
  }
}

const regularUser = new User('marko123', 'marko@email.com');
const admin = new Admin('superadmin', 'admin@company.com', 3);
const guest = new Guest();

console.log('Razliciti tipovi korisnika:\n');

console.log('Regular User:');
console.log('  Info:', regularUser.getInfo());
regularUser.login();

console.log('\nAdmin:');
console.log('  Info:', admin.getInfo());
admin.login();
admin.deleteUser(regularUser);

console.log('\nGuest:');
console.log('  Info:', guest.getInfo());
guest.login();

// ============================================
// VEŽBE
// ============================================

console.log('\n========================================');
console.log('VEZBE');
console.log('========================================\n');

// --------------------------------------------
// VEŽBA 1: Vehicle hijerarhija (kompletna)
// --------------------------------------------

console.log('=== VEZBA 1: Vehicle -> Car -> ElectricCar ===\n');

class VehicleComplete {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    console.log(`${this.brand} ${this.model} se pali...`);
  }

  stop() {
    this.isRunning = false;
    console.log(`${this.brand} ${this.model} se gasi...`);
  }

  getInfo() {
    return `${this.brand} ${this.model} (${this.year})`;
  }
}

class CarComplete extends VehicleComplete {
  constructor(brand, model, year, doors, fuelType) {
    super(brand, model, year);
    this.doors = doors;
    this.fuelType = fuelType;
  }

  getInfo() {
    return `${super.getInfo()}, ${this.doors} vrata, ${this.fuelType}`;
  }

  honk() {
    console.log(`${this.brand}: Beep beep!`);
  }
}

class ElectricCarComplete extends CarComplete {
  constructor(brand, model, year, doors, batteryCapacity, range) {
    super(brand, model, year, doors, 'elektricni');
    this.batteryCapacity = batteryCapacity;
    this.range = range;
    this.chargeLevel = 100;
  }

  start() {
    this.isRunning = true;
    console.log(`${this.brand} ${this.model} se TIHO pali... (elektricni)`);
  }

  getInfo() {
    return `${super.getInfo()}, baterija: ${this.batteryCapacity}kWh, domet: ${this.range}km`;
  }

  charge() {
    this.chargeLevel = 100;
    console.log(`${this.brand} ${this.model} napunjen na 100%`);
  }

  getChargeStatus() {
    return `Baterija: ${this.chargeLevel}%`;
  }
}

// Testiranje
const vehicles = [
  new VehicleComplete('Generic', 'Vehicle', 2020),
  new CarComplete('Toyota', 'Corolla', 2022, 4, 'benzin'),
  new ElectricCarComplete('Tesla', 'Model 3', 2023, 4, 75, 450),
];

console.log('Vozila:\n');
vehicles.forEach((v) => {
  console.log(v.getInfo());
  v.start();
  console.log('');
});

// Specifične metode
console.log('Specificne metode:');
vehicles[1].honk();
vehicles[2].charge();
console.log(vehicles[2].getChargeStatus());

// --------------------------------------------
// VEŽBA 2: Animal Kingdom
// --------------------------------------------

console.log('\n=== VEZBA 2: Animal Kingdom ===\n');

class AnimalKingdom {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  speak() {
    console.log(`${this.name} pravi zvuk`);
  }

  move() {
    console.log(`${this.name} se krece`);
  }

  eat(food) {
    console.log(`${this.name} jede ${food}`);
  }

  getInfo() {
    return `${this.name}, ${this.age} godina`;
  }
}

class Mammal extends AnimalKingdom {
  constructor(name, age, furColor) {
    super(name, age);
    this.furColor = furColor;
  }

  move() {
    console.log(`${this.name} hoda na 4 noge`);
  }

  getInfo() {
    return `${super.getInfo()}, dlaka: ${this.furColor}`;
  }
}

class Bird extends AnimalKingdom {
  constructor(name, age, wingSpan) {
    super(name, age);
    this.wingSpan = wingSpan;
  }

  move() {
    console.log(`${this.name} leti (raspon krila: ${this.wingSpan}cm)`);
  }

  speak() {
    console.log(`${this.name}: Civit civit!`);
  }
}

class Fish extends AnimalKingdom {
  constructor(name, age, waterType) {
    super(name, age);
    this.waterType = waterType; // 'slatka' ili 'slana'
  }

  move() {
    console.log(`${this.name} pliva u ${this.waterType} vodi`);
  }

  speak() {
    console.log(`${this.name}: *tišina* (ribe ne pričaju)`);
  }
}

const animalKingdom = [
  new Mammal('Lav', 5, 'zlatna'),
  new Bird('Orao', 3, 200),
  new Fish('Nemo', 1, 'slana'),
];

console.log('Animal Kingdom:\n');
animalKingdom.forEach((animal) => {
  console.log(animal.getInfo());
  animal.speak();
  animal.move();
  animal.eat('hranu');
  console.log('');
});

// ============================================
// REZIME
// ============================================

console.log('\n========================================');
console.log('REZIME');
console.log('========================================\n');

console.log('NASLEDJIVANJE (Inheritance):');
console.log('  - Mehanizam za preuzimanje svojstava i metoda');
console.log('  - Parent (roditelj) -> Child (dete)');
console.log('  - Omogucava ponovnu upotrebu koda\n');

console.log('EXTENDS:');
console.log('  - Kljucna rec za nasledjivanje');
console.log('  - class Child extends Parent { }');
console.log('  - Child ima SVE sto ima Parent + svoje\n');

console.log('SUPER():');
console.log('  - Poziva konstruktor roditelja');
console.log('  - MORA biti PRVI poziv u constructor-u');
console.log('  - super(arg1, arg2, ...)\n');

console.log('SUPER.METHOD():');
console.log('  - Poziva metodu roditelja');
console.log('  - Koristi se za PROSIRIVANJE metode');
console.log('  - const base = super.getInfo();\n');

console.log('OVERRIDE:');
console.log('  - Zamena roditeljske metode u child klasi');
console.log('  - Child definise metodu sa ISTIM IMENOM');
console.log('  - Nova implementacija zamenjuje staru\n');

console.log('=== KRAJ CASA ===\n');
