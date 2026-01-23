// ============================================
// 27. ČAS - ENKAPSULACIJA (PRIVATE, PUBLIC)
// ============================================

// ============================================
// PONAVLJANJE: ZAŠTO NAM TREBAJU KLASE?
// ============================================

console.log('========================================');
console.log('PONAVLJANJE: KLASE I PROBLEMI');
console.log('========================================\n');

// --------------------------------------------
// Problem sa običnim objektima
// --------------------------------------------

console.log('=== Problem: Direktan pristup podacima ===\n');

// Primer: Obični objekat za bankovni račun
const accountSimple = {
  owner: 'Marko',
  balance: 1000,
};

console.log('Pocetno stanje:', accountSimple.balance);

// PROBLEM: Bilo ko može direktno menjati balance!
accountSimple.balance = -5000; // Ovo ne bi trebalo da bude moguće!
console.log('Posle direktne izmene:', accountSimple.balance);

accountSimple.balance = 'banana'; // Čak i ovo prolazi!
console.log('Posle pogrešnog tipa:', accountSimple.balance);

console.log('\nProblem: Nema zaštite podataka!\n');

// ============================================
// ENKAPSULACIJA - ŠTA JE TO?
// ============================================

console.log('========================================');
console.log('ŠTA JE ENKAPSULACIJA?');
console.log('========================================\n');

console.log('Enkapsulacija je princip OOP-a koji:');
console.log('1. Sakriva interne podatke od spoljašnjeg sveta');
console.log('2. Kontroliše pristup podacima preko metoda');
console.log('3. Omogućava validaciju pre promene podataka');
console.log('4. Štiti integritet objekta\n');

// Analogija
console.log('Analogija: Bankomat');
console.log('   - Ne možeš direktno uzeti novac iz sefa');
console.log('   - Moraš koristiti interfejs (ekran, tastatura)');
console.log('   - Sistem proverava imaš li dovoljno novca');
console.log('   - Beleži svaku transakciju\n');

// ============================================
// PRIVATNA POLJA (#)
// ============================================

console.log('========================================');
console.log('PRIVATNA POLJA (#)');
console.log('========================================\n');

// --------------------------------------------
// 1. Sintaksa privatnih polja
// --------------------------------------------

console.log('=== 1. Sintaksa privatnih polja ===\n');

class BankAccount {
  // Privatno polje - počinje sa #
  #balance = 0;

  constructor(owner, initialBalance) {
    this.owner = owner; // Javno svojstvo
    if (initialBalance > 0) {
      this.#balance = initialBalance;
    }
  }

  // Javna metoda za depozit
  deposit(amount) {
    if (amount <= 0) {
      console.log('GRESKA: Iznos mora biti pozitivan!');
      return false;
    }
    this.#balance += amount;
    console.log(`OK: Uplaceno: ${amount} RSD`);
    return true;
  }

  // Javna metoda za podizanje
  withdraw(amount) {
    if (amount <= 0) {
      console.log('GRESKA: Iznos mora biti pozitivan!');
      return false;
    }
    if (amount > this.#balance) {
      console.log('GRESKA: Nedovoljno sredstava!');
      return false;
    }
    this.#balance -= amount;
    console.log(`OK: Podignuto: ${amount} RSD`);
    return true;
  }

  // Javna metoda za proveru stanja
  getBalance() {
    return this.#balance;
  }

  // Prikaz informacija
  showInfo() {
    console.log(`\nRacun: ${this.owner}`);
    console.log(`Stanje: ${this.#balance} RSD\n`);
  }
}

// Kreiranje naloga
const account1 = new BankAccount('Marko', 1000);
account1.showInfo();

// Korišćenje javnih metoda
account1.deposit(500);
account1.withdraw(200);
account1.showInfo();

// Pokušaj pristupa privatnom polju
console.log('Pokušaj direktnog pristupa:');
console.log('account1.#balance =', 'GREŠKA! Privatno polje.');
// account1.#balance = 999999; // Ovo bi dalo SyntaxError!

console.log('account1.balance =', account1.balance); // undefined - ne postoji javno

// --------------------------------------------
// 2. Više privatnih polja
// --------------------------------------------

console.log('\n=== 2. Više privatnih polja ===\n');

class User {
  #password;
  #loginAttempts = 0;
  #isLocked = false;

  constructor(username, password) {
    this.username = username; // Javno
    this.#password = password; // Privatno
  }

  login(password) {
    if (this.#isLocked) {
      console.log('ZAKLJUCANO: Nalog je zakljucan!');
      return false;
    }

    if (password === this.#password) {
      this.#loginAttempts = 0;
      console.log(`OK: Dobrodosli, ${this.username}!`);
      return true;
    } else {
      this.#loginAttempts++;
      console.log(
        `GRESKA: Pogresna lozinka! (Pokusaj ${this.#loginAttempts}/3)`,
      );

      if (this.#loginAttempts >= 3) {
        this.#isLocked = true;
        console.log('ZAKLJUCANO: Nalog je zakljucan zbog previse pokusaja!');
      }
      return false;
    }
  }

  changePassword(oldPassword, newPassword) {
    if (oldPassword !== this.#password) {
      console.log('GRESKA: Stara lozinka nije tacna!');
      return false;
    }
    if (newPassword.length < 6) {
      console.log('GRESKA: Nova lozinka mora imati najmanje 6 karaktera!');
      return false;
    }
    this.#password = newPassword;
    console.log('OK: Lozinka uspesno promenjena!');
    return true;
  }

  unlock() {
    this.#isLocked = false;
    this.#loginAttempts = 0;
    console.log('OTKLJUCANO: Nalog je otkljucan');
  }
}

const user = new User('marko123', 'tajna123');

// Test login
user.login('pogresna');
user.login('pogresna');
user.login('pogresna'); // Zaključava se
user.login('tajna123'); // Ne može - zaključan

user.unlock();
user.login('tajna123'); // Sada radi

// Promena lozinke
user.changePassword('tajna123', '123'); // Prekratka
user.changePassword('tajna123', 'novaTajna456'); // OK

// ============================================
// PRIVATNE METODE
// ============================================

console.log('\n========================================');
console.log('PRIVATNE METODE');
console.log('========================================\n');

class CreditCard {
  #number;
  #cvv;
  #expiryDate;
  #balance = 0;

  constructor(number, cvv, expiryDate) {
    this.#number = number;
    this.#cvv = cvv;
    this.#expiryDate = expiryDate;
    this.ownerName = '';
  }

  // Privatna metoda - pomoćna funkcija
  #maskNumber() {
    // Prikazuje samo poslednje 4 cifre
    return '**** **** **** ' + this.#number.slice(-4);
  }

  // Privatna metoda za validaciju
  #isExpired() {
    const [month, year] = this.#expiryDate.split('/');
    const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expiry < new Date();
  }

  // Privatna metoda za logovanje
  #logTransaction(type, amount) {
    const date = new Date().toLocaleString('sr-RS');
    console.log(`[${date}] ${type}: ${amount} RSD`);
  }

  // Javne metode
  getCardInfo() {
    console.log(`\nKartica: ${this.#maskNumber()}`);
    console.log(`Vlasnik: ${this.ownerName || 'Nije postavljeno'}`);
    console.log(`Istice: ${this.#expiryDate}`);
    console.log(`Stanje: ${this.#balance} RSD`);
    if (this.#isExpired()) {
      console.log('UPOZORENJE: KARTICA JE ISTEKLA!');
    }
  }

  addFunds(amount) {
    if (amount <= 0) return false;
    this.#balance += amount;
    this.#logTransaction('UPLATA', amount);
    return true;
  }

  pay(amount) {
    if (this.#isExpired()) {
      console.log('GRESKA: Kartica je istekla!');
      return false;
    }
    if (amount > this.#balance) {
      console.log('GRESKA: Nedovoljno sredstava!');
      return false;
    }
    this.#balance -= amount;
    this.#logTransaction('PLACANJE', amount);
    return true;
  }
}

const card = new CreditCard('1234567890123456', '123', '12/25');
card.ownerName = 'Marko Markovic';
card.addFunds(5000);
card.pay(1500);
card.getCardInfo();

// ============================================
// GETTER I SETTER
// ============================================

console.log('\n========================================');
console.log('GETTER I SETTER');
console.log('========================================\n');

// --------------------------------------------
// 1. Šta su Getter i Setter?
// --------------------------------------------

console.log('=== 1. Sta su Getter i Setter? ===\n');

console.log('GETTER - "dobavljac"');
console.log('  - Omogucava CITANJE privatnog polja');
console.log('  - Koristi se kao svojstvo (bez zagrada)');
console.log('  - Moze formatirati ili izracunati vrednost\n');

console.log('SETTER - "postavljac"');
console.log('  - Omogucava PISANJE u privatno polje');
console.log('  - Koristi se kao svojstvo (bez zagrada)');
console.log('  - Moze validirati pre postavljanja\n');

// --------------------------------------------
// 2. Osnovna sintaksa
// --------------------------------------------

console.log('=== 2. Osnovna sintaksa ===\n');

class Circle {
  #radius = 0;

  constructor(radius) {
    this.radius = radius; // Koristi setter!
  }

  // precnik = 2 x poluprecnik
  // obim = 2 x poluprecnik x PI
  // povrsina = PI x poluprecnik ^ 2
  // Math.PI

  // GETTER - čitanje
  get radius() {
    return this.#radius;
  }

  // SETTER - pisanje sa validacijom
  set radius(value) {
    if (value < 0) {
      console.log('GRESKA: Poluprecnik ne moze biti negativan!');
      return;
    }
    this.#radius = value;
  }

  // Getter za izračunatu vrednost
  get diameter() {
    return this.#radius * 2;
  }

  get circumference() {
    return 2 * Math.PI * this.#radius;
  }

  get area() {
    return Math.PI * this.#radius ** 2;
  }
}

const circle = new Circle(5);
console.log('Poluprecnik:', circle.radius); // Getter
console.log('Precnik:', circle.diameter);
console.log('Obim:', circle.circumference.toFixed(2));
console.log('Povrsina:', circle.area.toFixed(2));

console.log('\nProba promene:');
circle.radius = 10; // Setter
console.log('Novi poluprecnik:', circle.radius);

circle.radius = -5; // Setter odbija
console.log('Poluprecnik posle nevalidne vrednosti:', circle.radius);

// --------------------------------------------
// 3. Praktičan primer - Temperature
// --------------------------------------------

console.log('\n=== 3. Praktican primer - Temperature ===\n');

class Temperature {
  #celsius = 0;

  constructor(celsius) {
    this.celsius = celsius;
  }

  // Getter i Setter za Celsius
  get celsius() {
    return this.#celsius;
  }

  set celsius(value) {
    if (value < -273.15) {
      console.log('GRESKA: Temperatura ne moze biti ispod apsolutne nule!');
      return;
    }
    this.#celsius = value;
  }

  // Getter i Setter za Fahrenheit (konverzija)
  get fahrenheit() {
    return (this.#celsius * 9) / 5 + 32;
  }

  set fahrenheit(value) {
    this.celsius = ((value - 32) * 5) / 9;
  }

  // Getter i Setter za Kelvin
  get kelvin() {
    return this.#celsius + 273.15;
  }

  set kelvin(value) {
    this.celsius = value - 273.15;
  }

  show() {
    console.log(
      `Temperatura: ${this.#celsius}C = ${this.fahrenheit.toFixed(1)}F = ${this.kelvin.toFixed(1)}K`,
    );
  }
}

const temp = new Temperature(25);
temp.show();

console.log('\nPostavljanje preko Fahrenheit:');
temp.fahrenheit = 98.6; // Telesna temperatura
temp.show();

console.log('\nPostavljanje preko Kelvin:');
temp.kelvin = 373.15; // Tacka kljucanja vode
temp.show();

// --------------------------------------------
// 4. Primer sa validacijom - Person
// --------------------------------------------

console.log('\n=== 4. Primer sa validacijom - Person ===\n');

class Person {
  #name;
  #age;
  #email;

  constructor(name, age, email) {
    this.name = name;
    this.age = age;
    this.email = email;
  }

  get name() {
    return this.#name;
  }

  set name(value) {
    if (typeof value !== 'string' || value.trim().length < 2) {
      console.log('GRESKA: Ime mora imati najmanje 2 karaktera!');
      return;
    }
    this.#name = value.trim();
  }

  get age() {
    return this.#age;
  }

  set age(value) {
    if (!Number.isInteger(value) || value < 0 || value > 150) {
      console.log('GRESKA: Godine moraju biti izmedju 0 i 150!');
      return;
    }
    this.#age = value;
  }

  get email() {
    return this.#email;
  }

  set email(value) {
    if (!value.includes('@') || !value.includes('.')) {
      console.log('GRESKA: Nevalidan email format!');
      return;
    }
    this.#email = value.toLowerCase();
  }

  // Dodatni getter
  get isAdult() {
    return this.#age >= 18;
  }

  showInfo() {
    console.log(`\nIme: ${this.#name}`);
    console.log(
      `Godine: ${this.#age} ${this.isAdult ? '(punoletan)' : '(maloletan)'}`,
    );
    console.log(`Email: ${this.#email}`);
  }
}

const person = new Person('Marko Markovic', 25, 'Marko@Email.COM');
person.showInfo();

console.log('\nPokusaji nevalidnih vrednosti:');
person.name = 'A'; // Prekratko
person.age = 200; // Previše
person.email = 'nevalidan'; // Bez @ i .

person.showInfo(); // Vrednosti ostaju nepromenjene

// ============================================
// VEZBE
// ============================================

console.log('\n========================================');
console.log('VEZBE');
console.log('========================================\n');

// --------------------------------------------
// VEZBA 1: BankAccount sa poboljsanjima
// --------------------------------------------

console.log('=== VEZBA 1: Poboljsani BankAccount ===\n');

// TODO: Kreirati klasu BankAccount sa:
// - Privatnim poljima: #balance, #transactionHistory
// - Getter za balance
// - Metodama: deposit, withdraw, getHistory
// - Validacijom: ne dozvoliti negativan depozit/podizanje

class BankAccountImproved {
  #balance = 0;
  #transactionHistory = [];
  #accountNumber;

  constructor(accountNumber, initialBalance = 0) {
    this.#accountNumber = accountNumber;
    this.ownerName = '';

    if (initialBalance > 0) {
      this.#balance = initialBalance;
      this.#addTransaction('OTVARANJE', initialBalance);
    }
  }

  // Getter za balance
  get balance() {
    return this.#balance;
  }

  // Getter za maskirani broj računa
  get accountNumber() {
    return '***-' + this.#accountNumber.slice(-4);
  }

  #addTransaction(type, amount) {
    this.#transactionHistory.push({
      type,
      amount,
      balance: this.#balance,
      date: new Date().toLocaleString('sr-RS'),
    });
  }

  deposit(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('GRESKA: Iznos mora biti pozitivan broj!');
      return false;
    }

    this.#balance += amount;
    this.#addTransaction('UPLATA', amount);
    console.log(
      `OK: Uplaceno: ${amount} RSD | Novo stanje: ${this.#balance} RSD`,
    );
    return true;
  }

  withdraw(amount) {
    if (typeof amount !== 'number' || amount <= 0) {
      console.log('GRESKA: Iznos mora biti pozitivan broj!');
      return false;
    }
    if (amount > this.#balance) {
      console.log('GRESKA: Nedovoljno sredstava!');
      return false;
    }

    this.#balance -= amount;
    this.#addTransaction('ISPLATA', amount);
    console.log(
      `OK: Isplaceno: ${amount} RSD | Novo stanje: ${this.#balance} RSD`,
    );
    return true;
  }

  getHistory() {
    console.log(`\nIstorija transakcija (${this.accountNumber}):`);
    console.log('-'.repeat(50));

    if (this.#transactionHistory.length === 0) {
      console.log('Nema transakcija');
      return;
    }

    this.#transactionHistory.forEach((t, i) => {
      const sign = t.type === 'ISPLATA' ? '-' : '+';
      console.log(
        `${i + 1}. [${t.date}] ${t.type}: ${sign}${t.amount} RSD (Stanje: ${t.balance} RSD)`,
      );
    });
    console.log('-'.repeat(50));
  }
}

const bankAcc = new BankAccountImproved('123456789', 1000);
bankAcc.ownerName = 'Petar Petrovic';

bankAcc.deposit(500);
bankAcc.withdraw(200);
bankAcc.deposit(-100); // Nevalidno
bankAcc.withdraw(5000); // Nedovoljno
bankAcc.getHistory();

console.log('\nDirektno citanje balance:', bankAcc.balance);
console.log('Broj racuna (maskiran):', bankAcc.accountNumber);

// --------------------------------------------
// VEZBA 2: Product klasa sa cenom
// --------------------------------------------

console.log('\n=== VEZBA 2: Product sa validacijom cene ===\n');

class Product {
  #price;
  #discount = 0;

  constructor(name, price) {
    this.name = name;
    this.price = price; // Koristi setter
  }

  get price() {
    return this.#price;
  }

  set price(value) {
    if (typeof value !== 'number' || value < 0) {
      console.log('GRESKA: Cena mora biti pozitivan broj!');
      return;
    }
    this.#price = value;
  }

  get discount() {
    return this.#discount;
  }

  set discount(value) {
    if (typeof value !== 'number' || value < 0 || value > 100) {
      console.log('GRESKA: Popust mora biti izmedju 0 i 100!');
      return;
    }
    this.#discount = value;
  }

  // Izračunata cena sa popustom
  get finalPrice() {
    return this.#price * (1 - this.#discount / 100);
  }

  // Formatirana cena
  get formattedPrice() {
    return `${this.finalPrice.toFixed(2)} RSD`;
  }

  showProduct() {
    console.log(`\nProizvod: ${this.name}`);
    console.log(`Cena: ${this.#price} RSD`);
    if (this.#discount > 0) {
      console.log(`Popust: ${this.#discount}%`);
      console.log(`Finalna cena: ${this.formattedPrice}`);
    }
  }
}

const laptop = new Product('Laptop', 150000);
laptop.showProduct();

console.log('\nDodavanje popusta:');
laptop.discount = 15;
laptop.showProduct();

console.log('\nNevalidne vrednosti:');
laptop.price = -1000;
laptop.discount = 150;

// --------------------------------------------
// VEZBA 3: PasswordManager
// --------------------------------------------

console.log('\n=== VEZBA 3: PasswordManager ===\n');

class PasswordManager {
  #passwords = new Map();
  #masterPassword;

  constructor(masterPassword) {
    if (masterPassword.length < 8) {
      throw new Error('Master lozinka mora imati najmanje 8 karaktera!');
    }
    this.#masterPassword = masterPassword;
    console.log('Password Manager kreiran');
  }

  #verifyMaster(password) {
    return password === this.#masterPassword;
  }

  #generatePassword(length = 16) {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  }

  addPassword(masterPassword, site, password) {
    if (!this.#verifyMaster(masterPassword)) {
      console.log('GRESKA: Pogresna master lozinka!');
      return false;
    }

    this.#passwords.set(site, password);
    console.log(`OK: Lozinka za "${site}" sacuvana`);
    return true;
  }

  getPassword(masterPassword, site) {
    if (!this.#verifyMaster(masterPassword)) {
      console.log('GRESKA: Pogresna master lozinka!');
      return null;
    }

    const password = this.#passwords.get(site);
    if (!password) {
      console.log(`GRESKA: Nema sacuvane lozinke za "${site}"`);
      return null;
    }

    console.log(`Lozinka za "${site}": ${password}`);
    return password;
  }

  generateAndSave(masterPassword, site, length = 16) {
    if (!this.#verifyMaster(masterPassword)) {
      console.log('GRESKA: Pogresna master lozinka!');
      return null;
    }

    const newPassword = this.#generatePassword(length);
    this.#passwords.set(site, newPassword);
    console.log(
      `OK: Generisana i sacuvana lozinka za "${site}": ${newPassword}`,
    );
    return newPassword;
  }

  listSites(masterPassword) {
    if (!this.#verifyMaster(masterPassword)) {
      console.log('GRESKA: Pogresna master lozinka!');
      return [];
    }

    const sites = Array.from(this.#passwords.keys());
    console.log('\nSacuvani sajtovi:');
    sites.forEach((site, i) => console.log(`  ${i + 1}. ${site}`));
    return sites;
  }
}

const pm = new PasswordManager('MasterPass123!');
pm.addPassword('MasterPass123!', 'gmail.com', 'mojaLozinka123');
pm.addPassword('MasterPass123!', 'facebook.com', 'fbPass456');
pm.generateAndSave('MasterPass123!', 'twitter.com');

pm.getPassword('pogresna', 'gmail.com'); // Neće raditi
pm.getPassword('MasterPass123!', 'gmail.com'); // Radi

pm.listSites('MasterPass123!');

// ============================================
// REZIME
// ============================================

console.log('\n========================================');
console.log('REZIME');
console.log('========================================\n');

console.log('ENKAPSULACIJA:');
console.log('   - Sakrivanje internih podataka');
console.log('   - Kontrolisan pristup preko metoda');
console.log('   - Validacija pre promene\n');

console.log('# PRIVATNA POLJA:');
console.log('   - Pocinju sa #');
console.log('   - Nisu dostupna van klase');
console.log('   - Primer: #balance, #password\n');

console.log('# PRIVATNE METODE:');
console.log('   - Takodje pocinju sa #');
console.log('   - Pomocne funkcije unutar klase');
console.log('   - Primer: #validate(), #log()\n');

console.log('GETTER (get):');
console.log('   - Cita privatno polje');
console.log('   - Koristi se kao svojstvo');
console.log('   - get balance() { return this.#balance; }\n');

console.log('SETTER (set):');
console.log('   - Postavlja privatno polje');
console.log('   - Moze validirati vrednost');
console.log('   - set balance(value) { ... }\n');

console.log('=== KRAJ CASA ===\n');
