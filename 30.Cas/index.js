// ============================================
// 30. ČAS - STATIC METODE I POLJA - PRIMERI
// ============================================

// ============================================
// PRIMER 1: Razlika instance vs static
// ============================================

class Pas {
  // Static polje - deljeno između svih instanci
  static brojPasa = 0;

  constructor(ime) {
    this.ime = ime; // Instance polje - svaki pas ima svoje ime
    Pas.brojPasa++; // Povećaj brojač kad se kreira novi pas
  }

  // Instance metoda - koristi this
  laj() {
    console.log(`${this.ime} kaže: Av av!`);
  }

  // Static metoda - ne koristi this, poziva se na klasi
  static kolkoImaPasa() {
    return Pas.brojPasa;
  }
}

console.log('=== PRIMER 1: Pas klasa ===');
const meda = new Pas('Meda');
const rex = new Pas('Rex');

meda.laj(); // Instance metoda
rex.laj();

console.log('Broj pasa:', Pas.kolkoImaPasa()); // Static metoda
console.log('Broj pasa:', Pas.brojPasa); // Static polje

// ============================================
// PRIMER 2: MathUtils - Utility klasa
// ============================================

class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) {
      return 'Greška: deljenje nulom!';
    }
    return a / b;
  }

  static power(base, exponent) {
    return Math.pow(base, exponent);
  }

  static squared(a) {
    return a ** 2;
  }

  static cubed(a) {
    return a ** 3;
  }

  static percentage(value, percent) {
    return (value * percent) / 100;
  }
}

console.log('\n=== PRIMER 2: MathUtils ===');
console.log('5 + 3 =', MathUtils.add(5, 3));
console.log('10 - 4 =', MathUtils.subtract(10, 4));
console.log('6 * 7 =', MathUtils.multiply(6, 7));
console.log('20 / 4 =', MathUtils.divide(20, 4));
console.log('10 / 0 =', MathUtils.divide(10, 0));
console.log('2^8 =', MathUtils.power(2, 8));
console.log('20% od 150 =', MathUtils.percentage(150, 20));

// ============================================
// PRIMER 3: StringUtils - Utility klasa
// ============================================

class StringUtils {
  static capitalize(str) {
    if (!str) return '';
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
  }

  static isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  static countWords(str) {
    if (StringUtils.isEmpty(str)) return 0;
    return str.trim().split(/\s+/).length;
  }

  static reverse(str) {
    return str.split('').reverse().join('');
  }

  static truncate(str, maxLength) {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + '...';
  }
}

console.log('\n=== PRIMER 3: StringUtils ===');
console.log("capitalize('hello'):", StringUtils.capitalize('hello'));
console.log("isEmpty('   '):", StringUtils.isEmpty('   '));
console.log(
  "countWords('Ovo je test'):",
  StringUtils.countWords('Ovo je test'),
);
console.log("reverse('JavaScript'):", StringUtils.reverse('JavaScript'));
console.log(
  "truncate('Ovo je dugačak tekst', 10):",
  StringUtils.truncate('Ovo je dugačak tekst', 10),
);

// ============================================
// PRIMER 4: Validator klasa
// ============================================

class Validator {
  // Email validacija
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Password validacija (min 8, veliko slovo, broj)
  static isValidPassword(password) {
    if (password.length < 8) return false;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    return hasUpperCase && hasNumber;
  }

  // Telefon validacija (srpski format)
  static isValidPhone(phone) {
    const cleaned = phone.replace(/\s/g, '');
    const phoneRegex = /^(\+381|0)[0-9]{8,9}$/;
    return phoneRegex.test(cleaned);
  }

  // JMBG validacija (13 cifara)
  static isValidJMBG(jmbg) {
    return /^\d{13}$/.test(jmbg);
  }
}

console.log('\n=== PRIMER 4: Validator ===');
console.log(
  "Email 'test@gmail.com':",
  Validator.isValidEmail('test@gmail.com'),
);
console.log("Email 'invalid':", Validator.isValidEmail('invalid'));
console.log("Password 'Sifra123':", Validator.isValidPassword('Sifra123'));
console.log("Password 'slaba':", Validator.isValidPassword('slaba'));
console.log(
  "Telefon '+381641234567':",
  Validator.isValidPhone('+381641234567'),
);

// ============================================
// PRIMER 5: Krug - kombinacija static i instance
// ============================================

class Krug {
  static PI = 3.14159;

  constructor(radius) {
    this.radius = radius;
  }

  // Instance metoda - koristi this.radius
  izracunajPovrsinu() {
    return Krug.PI * this.radius * this.radius;
  }

  // Instance metoda - koristi this.radius
  izracunajObim() {
    return 2 * Krug.PI * this.radius;
  }

  // Static metoda - prima radius kao parametar
  static izracunajPovrsinuZaRadius(r) {
    return Krug.PI * r * r;
  }
}

console.log('\n=== PRIMER 5: Krug ===');
const krug = new Krug(5);
console.log('Površina kruga (r=5):', krug.izracunajPovrsinu());
console.log('Obim kruga (r=5):', krug.izracunajObim());
console.log('Static površina za r=10:', Krug.izracunajPovrsinuZaRadius(10));

// ============================================
// PRIMER 6: Factory metode
// ============================================

class User {
  constructor(ime, email, uloga) {
    this.ime = ime;
    this.email = email;
    this.uloga = uloga;
    this.createdAt = new Date();
  }

  // Factory metoda za admina
  static createAdmin(ime, email) {
    return new User(ime, email, 'admin');
  }

  // Factory metoda za gosta
  static createGuest() {
    return new User('Gost', 'guest@example.com', 'guest');
  }

  // Factory metoda za moderatora
  static createModerator(ime, email) {
    return new User(ime, email, 'moderator');
  }

  predstaviSe() {
    console.log(`Ja sam ${this.ime}, uloga: ${this.uloga}`);
  }
}

console.log('\n=== PRIMER 6: Factory metode ===');
const admin = User.createAdmin('Marko', 'marko@firma.com');
const gost = User.createGuest();
const mod = User.createModerator('Ana', 'ana@firma.com');

admin.predstaviSe();
gost.predstaviSe();
mod.predstaviSe();

// ============================================
// PRIMER 7: Counter sa static
// ============================================

class Counter {
  static count = 0;

  static increment() {
    Counter.count++;
    return Counter.count;
  }

  static decrement() {
    Counter.count--;
    return Counter.count;
  }

  static reset() {
    Counter.count = 0;
    return Counter.count;
  }

  static getCount() {
    return Counter.count;
  }
}

console.log('\n=== PRIMER 7: Counter ===');
console.log('Početno:', Counter.getCount());
console.log('Posle increment:', Counter.increment());
console.log('Posle increment:', Counter.increment());
console.log('Posle increment:', Counter.increment());
console.log('Posle decrement:', Counter.decrement());
console.log('Posle reset:', Counter.reset());
