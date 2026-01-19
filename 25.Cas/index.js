// ============================================
// 25. ČAS - UVOD U KLASE I OOP
// ============================================

// --------------------------------------------
// 1. PROBLEM: Copy-Paste pristup
// --------------------------------------------

console.log('=== 1. PROBLEM: Copy-Paste ===\n');

// Ovako smo ranije pravili objekte - LOŠE!
const user1 = {
  name: 'Marko',
  age: 25,
  greet: function () {
    console.log('Zdravo, ja sam ' + this.name);
  },
};

const user2 = {
  name: 'Ana',
  age: 22,
  greet: function () {
    console.log('Zdravo, ja sam ' + this.name);
  },
};

const user3 = {
  name: 'Petar',
  age: 30,
  greet: function () {
    console.log('Zdravo, ja sam ' + this.name);
  },
};

user1.greet();
user2.greet();
user3.greet();

// PROBLEMI:
// - Ponavljamo isti kod 3 puta
// - Ako želimo da promenimo greet(), moramo na 3 mesta
// - Šta ako imamo 100 korisnika?

// --------------------------------------------
// 2. REŠENJE #1: Factory funkcije
// --------------------------------------------

console.log('\n=== 2. FACTORY FUNKCIJE ===\n');

// Factory funkcija - pravi i vraća objekte
function createUser(name, age) {
  return {
    name, // shorthand za name: name
    age, // shorthand za age: age
    greet() {
      console.log('Zdravo, ja sam ' + this.name);
    },
  };
}

// Sada je mnogo lakše praviti korisnike
const factoryUser1 = createUser('Marko', 25);
const factoryUser2 = createUser('Ana', 22);
const factoryUser3 = createUser('Petar', 30);

factoryUser1.greet();
factoryUser2.greet();
factoryUser3.greet();

console.log('Factory user info:', factoryUser1);

// --------------------------------------------
// 3. REŠENJE #2: Constructor funkcije
// --------------------------------------------

console.log('\n=== 3. CONSTRUCTOR FUNKCIJE ===\n');

// Constructor funkcija - koristi new i this
function UserConstructor(name, age) {
  this.name = name;
  this.age = age;
  this.greet = function () {
    console.log('Zdravo, ja sam ' + this.name);
  };
}

// Moramo koristiti NEW keyword!
const constructorUser1 = new UserConstructor('Marko', 25);
const constructorUser2 = new UserConstructor('Ana', 22);

constructorUser1.greet();
constructorUser2.greet();

// Prednost: možemo proveriti tip
console.log(
  'Da li je UserConstructor?',
  constructorUser1 instanceof UserConstructor,
); // true

console.log('\n========================================');
console.log('=== DRUGI DEO: JAVASCRIPT KLASE ===');
console.log('========================================\n');

// --------------------------------------------
// 4. SINTAKSA KLASE
// --------------------------------------------

console.log('=== 4. SINTAKSA KLASE ===\n');

class User {
  // Constructor - poziva se automatski pri new User()
  constructor(name, age) {
    this.name = name; // this pokazuje na novu instancu
    this.age = age;
  }

  // Metoda - bez function keyword!
  greet() {
    console.log(`Zdravo, ja sam ${this.name}`);
  }

  // Još jedna metoda
  getInfo() {
    return `${this.name}, ${this.age} godina`;
  }

  // Metoda koja koristi drugu metodu
  introduce() {
    console.log(`Dozvolite da se predstavim: ${this.getInfo()}`);
  }
}

// Kreiranje instanci
const classUser1 = new User('Marko', 25);
const classUser2 = new User('Ana', 22);

// Pozivanje metoda
classUser1.greet(); // "Zdravo, ja sam Marko"
classUser2.greet(); // "Zdravo, ja sam Ana"

console.log(classUser1.getInfo()); // "Marko, 25 godina"

classUser1.introduce();

// Provera tipa
console.log('Da li je User?', classUser1 instanceof User); // true

// --------------------------------------------
// 5. KAKO RADI THIS?
// --------------------------------------------

console.log('\n=== 5. KAKO RADI THIS ===\n');

class Demo {
  constructor(value) {
    this.value = value;
    console.log('Constructor pozvan, this.value =', this.value);
  }

  showThis() {
    console.log('this pokazuje na:', this);
  }
}

const demo1 = new Demo(100);
const demo2 = new Demo(200);

demo1.showThis(); // this = demo1
demo2.showThis(); // this = demo2

// ============================================
// VEŽBE
// ============================================

console.log('\n========================================');
console.log('=== VEŽBE ===');
console.log('========================================\n');

// --------------------------------------------
// VEŽBA 1: Factory funkcija za proizvode
// --------------------------------------------

console.log('=== VEŽBA 1: Factory funkcija ===\n');

// TODO: Napraviti factory funkciju createProduct(name, price)
// koja vraća objekat sa svojstvima name, price i metodom getLabel()

function createProduct(name, price) {
  // Vaš kod ovde...
  return {
    name,
    price,
    getLabel() {
      return `${this.name} - ${this.price} RSD`;
    },
  };
}

class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  getLabel() {
    return `${this.name} - ${this.price} RSD`;
  }
}

// Test:
const product1 = createProduct('Laptop', 120000);
const product2 = createProduct('Miš', 3500);
const product3 = createProduct('Tastatura', 8000);

console.log(product1.getLabel()); // "Laptop - 120000 RSD"
console.log(product2.getLabel());
console.log(product3.getLabel());

// --------------------------------------------
// VEŽBA 2: Klasa Car
// --------------------------------------------

console.log('\n=== VEŽBA 2: Klasa Car ===\n');

// TODO: Napraviti klasu Car sa:
// - Svojstvima: brand, model, year
// - Metodama: start(), stop(), getAge()

class Car {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) {
      console.log(`${this.brand} ${this.model} je vec upaljen.`);
      return;
    }

    this.isRunning = true;
    console.log(`${this.brand} ${this.model} se pali... Vroom!`);
  }

  stop() {
    if (!this.isRunning) {
      console.log(`${this.brand} ${this.model} je vec ugasen.`);
      return;
    }

    this.isRunning = false;
    console.log(`${this.brand} ${this.model} se gasi.`);
  }

  getAge() {
    const currentYear = new Date().getFullYear();
    return currentYear - this.year;
  }

  getInfo() {
    return `${this.brand} ${this.model} (${this.year}) - ${this.getAge()} godina star`;
  }
}

// Test:
const car1 = new Car('BMW', 'M3', 2020);
const car2 = new Car('Audi', 'A4', 2018);

car1.start();
car1.stop();

console.log(car1.getInfo());
console.log(car2.getInfo());
console.log(`Starost car2: ${car2.getAge()} godina`);

// --------------------------------------------
// VEŽBA 3: Klasa Student
// --------------------------------------------

console.log('\n=== VEŽBA 3: Klasa Student ===\n');

// TODO: Napraviti klasu Student sa:
// - Svojstvima: name, grades (niz ocena)
// - Metodama: addGrade(grade), getAverage(), isPassing()

class Student {
  constructor(name) {
    this.name = name;
    this.grades = []; // prazan niz na početku
  }

  addGrade(grade) {
    if (grade >= 1 && grade <= 5) {
      this.grades.push(grade);
      console.log(`Ocena ${grade} dodata za studenta ${this.name}`);
    } else {
      console.log('Ocena mora biti između 1 i 5!');
    }
  }

  getAverage() {
    if (this.grades.length === 0) {
      return 0;
    }
    const sum = this.grades.reduce((acc, grade) => acc + grade, 0);
    return sum / this.grades.length;
  }

  isPassing() {
    return this.getAverage() >= 2;
  }

  getReport() {
    const status = this.isPassing() ? 'PROLAZI' : 'NE PROLAZI';
    return `${this.name}: Prosek ${this.getAverage().toFixed(2)} - ${status}`;
  }
}

// Test:
const student1 = new Student('Marko');
student1.addGrade(5);
student1.addGrade(4);
student1.addGrade(5);
student1.addGrade(3);

console.log(student1.getReport());

const student2 = new Student('Ana');
student2.addGrade(2);
student2.addGrade(1);
student2.addGrade(2);

console.log(student2.getReport());

// ============================================
// BONUS: Klasa BankAccount (za domaći)
// ============================================

console.log('\n========================================');
console.log('=== BONUS: Klasa BankAccount ===');
console.log('========================================\n');

class BankAccount {
  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.balance += amount;
      console.log(
        `${this.owner}: Uplaćeno ${amount} RSD. Novo stanje: ${this.balance} RSD`,
      );
    } else {
      console.log('Iznos mora biti pozitivan!');
    }
  }

  withdraw(amount) {
    if (amount > this.balance) {
      console.log(
        `${this.owner}: Nemate dovoljno sredstava! Stanje: ${this.balance} RSD`,
      );
      return false;
    }
    if (amount <= 0) {
      console.log('Iznos mora biti pozitivan!');
      return false;
    }
    this.balance -= amount;
    console.log(
      `${this.owner}: Podignuto ${amount} RSD. Novo stanje: ${this.balance} RSD`,
    );
    return true;
  }

  getBalance() {
    return this.balance;
  }

  transfer(amount, targetAccount) {
    console.log(`\nTransfer: ${this.owner} -> ${targetAccount.owner}`);
    if (this.withdraw(amount)) {
      targetAccount.deposit(amount);
      console.log('Transfer uspešan!');
    } else {
      console.log('Transfer neuspešan!');
    }
  }
}

// Test:
const account1 = new BankAccount('Marko', 10000);
const account2 = new BankAccount('Ana', 5000);

account1.deposit(5000);
account1.withdraw(3000);
account1.withdraw(50000); // Neće uspeti

console.log(`\nStanje računa ${account1.owner}: ${account1.getBalance()} RSD`);

account1.transfer(2000, account2);

console.log(`\nFinalno stanje ${account1.owner}: ${account1.getBalance()} RSD`);
console.log(`Finalno stanje ${account2.owner}: ${account2.getBalance()} RSD`);

// ============================================
// REZIME
// ============================================

console.log('\n========================================');
console.log('=== REZIME ===');
console.log('========================================\n');

console.log('1. Klase rešavaju problem ponavljanja koda');
console.log('2. constructor() se poziva automatski pri new');
console.log('3. this pokazuje na trenutnu instancu');
console.log('4. Ime klase počinje velikim slovom');
console.log('5. new je obavezan pri kreiranju instance');
console.log('6. Metode se pišu bez function i bez zareza\n');
