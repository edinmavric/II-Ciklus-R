// ========================================
// PRIMER 1: OSNOVE POLIMORFIZMA
// ========================================

console.log("=== PRIMER 1: Osnove Polimorfizma ===\n");

// Bazna klasa Shape
class Shape {
  constructor(color = "white") {
    this.color = color;
  }

  area() {
    return 0; // Osnovna implementacija
  }

  perimeter() {
    return 0; // Osnovna implementacija
  }

  describe() {
    return `${this.color} oblik sa površinom ${this.area().toFixed(2)}`;
  }
}

// Potklasa Circle
class Circle extends Shape {
  constructor(radius, color = "red") {
    super(color);
    this.radius = radius;
  }

  // Override metode area()
  area() {
    return Math.PI * this.radius ** 2;
  }

  // Override metode perimeter()
  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

// Potklasa Rectangle
class Rectangle extends Shape {
  constructor(width, height, color = "blue") {
    super(color);
    this.width = width;
    this.height = height;
  }

  // Override metode area()
  area() {
    return this.width * this.height;
  }

  // Override metode perimeter()
  perimeter() {
    return 2 * (this.width + this.height);
  }
}

// Potklasa Triangle
class Triangle extends Shape {
  constructor(base, height, color = "green") {
    super(color);
    this.base = base;
    this.height = height;
  }

  // Override metode area()
  area() {
    return (this.base * this.height) / 2;
  }

  // Override metode perimeter()
  perimeter() {
    // Pretpostavljamo jednakokraki trougao za jednostavnost
    const side = Math.sqrt((this.base / 2) ** 2 + this.height ** 2);
    return this.base + 2 * side;
  }
}

// Kreiranje objekata
const circle = new Circle(5, "crveni");
const rectangle = new Rectangle(4, 6, "plavi");
const triangle = new Triangle(4, 5, "zeleni");

console.log(circle.describe());
console.log(rectangle.describe());
console.log(triangle.describe());

// ========================================
// PRIMER 2: POLIMORFIZAM U PRAKSI
// ========================================

console.log("\n=== PRIMER 2: Polimorfizam u Praksi ===\n");

// Funkcija koja radi sa bilo kojim Shape objektom
function printShapeInfo(shape) {
  console.log(`Boja: ${shape.color}`);
  console.log(`Površina: ${shape.area().toFixed(2)}`);
  console.log(`Obim: ${shape.perimeter().toFixed(2)}`);
  console.log(`Opis: ${shape.describe()}\n`);
}

// Pozivamo istu funkciju sa različitim objektima
printShapeInfo(circle);
printShapeInfo(rectangle);
printShapeInfo(triangle);

// ========================================
// PRIMER 3: RAČUNANJE UKUPNE POVRŠINE
// ========================================

console.log("\n=== PRIMER 3: Računanje Ukupne Površine ===\n");

const shapes = [
  new Circle(5, "crveni"),
  new Rectangle(4, 6, "plavi"),
  new Triangle(4, 5, "zeleni"),
  new Circle(3, "žuti"),
  new Rectangle(7, 2, "ljubičasti"),
];

// Računamo ukupnu površinu
const totalArea = shapes.reduce((sum, shape) => sum + shape.area(), 0);
console.log(`Ukupna površina svih oblika: ${totalArea.toFixed(2)}`);

// Računamo prosečnu površinu
const averageArea = totalArea / shapes.length;
console.log(`Prosečna površina: ${averageArea.toFixed(2)}`);

// Nalazimo oblik sa najvećom površinom
const largestShape = shapes.reduce((largest, current) =>
  current.area() > largest.area() ? current : largest
);
console.log(`Najveća površina: ${largestShape.describe()}`);

// ========================================
// PRIMER 4: KORIŠĆENJE super.method()
// ========================================

console.log("\n=== PRIMER 4: Korišćenje super.method() ===\n");

class Square extends Rectangle {
  constructor(side, color = "narandžasti") {
    super(side, side, color);
    this.side = side;
  }

  // Proširujemo roditeljsku metodu
  describe() {
    return super.describe() + " - Ovo je kvadrat!";
  }

  // Nova metoda specifična za kvadrat
  diagonal() {
    return Math.sqrt(2) * this.side;
  }
}

const square = new Square(5, "narandžasti");
console.log(square.describe());
console.log(`Dijagonala kvadrata: ${square.diagonal().toFixed(2)}`);

// ========================================
// PRIMER 5: REALAN PRIMER - ZAPOSLENI
// ========================================

console.log("\n=== PRIMER 5: Realan Primer - Zaposleni ===\n");

class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  calculateSalary() {
    return this.baseSalary;
  }

  getInfo() {
    return `${this.name}: ${this.calculateSalary()} RSD`;
  }
}

class Manager extends Employee {
  constructor(name, baseSalary, bonus) {
    super(name, baseSalary);
    this.bonus = bonus;
  }

  // Override - Manager ima bonus
  calculateSalary() {
    return this.baseSalary + this.bonus;
  }
}

class Developer extends Employee {
  constructor(name, baseSalary, projects) {
    super(name, baseSalary);
    this.projects = projects;
  }

  // Override - Developer dobija bonus po projektu
  calculateSalary() {
    const projectBonus = this.projects * 10000;
    return this.baseSalary + projectBonus;
  }

  getInfo() {
    return super.getInfo() + ` (${this.projects} projekata)`;
  }
}

class Intern extends Employee {
  constructor(name, baseSalary, isRemote) {
    super(name, baseSalary);
    this.isRemote = isRemote;
  }

  // Override - Intern ima drugačiju platu ako je remote
  calculateSalary() {
    return this.isRemote ? this.baseSalary * 0.8 : this.baseSalary;
  }

  getInfo() {
    const location = this.isRemote ? "Remote" : "On-site";
    return super.getInfo() + ` (${location})`;
  }
}

// Kreiranje zaposlenih
const employees = [
  new Manager("Ana", 100000, 30000),
  new Developer("Marko", 80000, 5),
  new Developer("Jelena", 90000, 3),
  new Intern("Stefan", 40000, false),
  new Intern("Milica", 40000, true),
];

// Polimorfizam - ista metoda, različito ponašanje
employees.forEach((employee) => {
  console.log(employee.getInfo());
});

// Ukupni troškovi plate
const totalSalaries = employees.reduce(
  (sum, employee) => sum + employee.calculateSalary(),
  0
);
console.log(`\nUkupni troškovi plata: ${totalSalaries} RSD`);

// ========================================
// PRIMER 6: ŽIVOTINJE
// ========================================

console.log("\n=== PRIMER 6: Životinje ===\n");

class Animal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    return "Neka zvučna predstava";
  }

  introduce() {
    return `${this.name} kaže: ${this.makeSound()}`;
  }
}

class Dog extends Animal {
  makeSound() {
    return "Av av!";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Mjau!";
  }
}

class Cow extends Animal {
  makeSound() {
    return "Muuu!";
  }
}

class Duck extends Animal {
  makeSound() {
    return "Kva kva!";
  }
}

// Polimorfizam sa životinjama
const animals = [
  new Dog("Rex"),
  new Cat("Maca"),
  new Cow("Milka"),
  new Duck("Paja"),
];

animals.forEach((animal) => {
  console.log(animal.introduce());
});

// ========================================
// PRIMER 7: NAPREDNI POLIMORFIZAM
// ========================================

console.log("\n=== PRIMER 7: Napredni Polimorfizam ===\n");

class Vehicle {
  constructor(brand, speed) {
    this.brand = brand;
    this.speed = speed;
  }

  travel(distance) {
    const time = distance / this.speed;
    return `${this.brand} putuje ${distance}km za ${time.toFixed(2)}h`;
  }

  fuelCost(distance) {
    return 0; // Osnovna implementacija
  }
}

class Car extends Vehicle {
  constructor(brand, speed, fuelConsumption) {
    super(brand, speed);
    this.fuelConsumption = fuelConsumption; // L/100km
  }

  fuelCost(distance) {
    const fuelPrice = 180; // RSD po litru
    const litersNeeded = (distance / 100) * this.fuelConsumption;
    return litersNeeded * fuelPrice;
  }

  travel(distance) {
    return super.travel(distance) + ` (${this.fuelCost(distance).toFixed(0)} RSD)`;
  }
}

class ElectricCar extends Vehicle {
  constructor(brand, speed, kwhPer100km) {
    super(brand, speed);
    this.kwhPer100km = kwhPer100km;
  }

  fuelCost(distance) {
    const electricityPrice = 7; // RSD po kWh
    const kwhNeeded = (distance / 100) * this.kwhPer100km;
    return kwhNeeded * electricityPrice;
  }

  travel(distance) {
    return (
      super.travel(distance) +
      ` (${this.fuelCost(distance).toFixed(0)} RSD) - Ekološki!`
    );
  }
}

class Bicycle extends Vehicle {
  constructor(brand) {
    super(brand, 20); // Prosečna brzina
  }

  fuelCost(distance) {
    return 0; // Bicikl ne troši gorivo
  }

  travel(distance) {
    const calories = distance * 40; // Otprilike 40 kalorija po km
    return super.travel(distance) + ` (${calories} kalorija sagorelo)`;
  }
}

// Testiranje različitih vozila
const vehicles = [
  new Car("Toyota", 120, 7),
  new ElectricCar("Tesla", 140, 15),
  new Bicycle("Scott"),
];

const distance = 100; // 100km putovanje

vehicles.forEach((vehicle) => {
  console.log(vehicle.travel(distance));
});

console.log("\n=== Kraj Primera ===\n");
