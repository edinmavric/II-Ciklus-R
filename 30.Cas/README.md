# 30. Čas - Static metode i polja

---

## 1. Šta je `static`?

Kada definišemo metodu ili polje sa ključnom reči `static`, ta metoda/polje pripada **samoj klasi**, a ne instancama te klase.

### Bez static (instance metoda)

```javascript
class Pas {
  constructor(ime) {
    this.ime = ime;
  }

  laj() {
    console.log(`${this.ime} kaže: Av av!`);
  }
}

const mojPas = new Pas("Meda");
mojPas.laj(); // "Meda kaže: Av av!"
```

Ovde je `laj()` instance metoda - moramo prvo napraviti psa (`new Pas()`) da bismo je pozvali.

### Sa static (class metoda)

```javascript
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static multiply(a, b) {
    return a * b;
  }
}

// Ne pravimo instancu! Pozivamo direktno na klasi.
console.log(MathUtils.add(5, 3));      // 8
console.log(MathUtils.multiply(4, 2)); // 8
```

---

## 2. Razlika: Instance vs Static

| Instance metoda | Static metoda |
|-----------------|---------------|
| Pripada objektu (instanci) | Pripada klasi |
| Poziva se na instanci: `obj.metoda()` | Poziva se na klasi: `Klasa.metoda()` |
| Ima pristup `this` (podacima objekta) | Nema pristup `this` instance |
| Koristi se kada metoda radi sa podacima objekta | Koristi se za utility/helper funkcije |

### Primer razlike

```javascript
class Krug {
  // Static polje - isto za sve krugove
  static piValue = 3.14159;

  constructor(radius) {
    this.radius = radius; // Instance polje - svaki krug ima svoj radius
  }

  // Instance metoda - koristi this.radius
  izracunajPovrsinu() {
    return Krug.piValue * this.radius * this.radius;
  }

  // Static metoda - ne koristi this, prima sve kao parametre
  static izracunajPovrsinuZaRadius(r) {
    return Krug.piValue * r * r;
  }
}

// Instance metoda - moramo napraviti krug
const krug1 = new Krug(5);
console.log(krug1.izracunajPovrsinu()); // 78.53975

// Static metoda - ne pravimo instancu
console.log(Krug.izracunajPovrsinuZaRadius(5)); // 78.53975

// Static polje - pristupamo preko klase
console.log(Krug.piValue); // 3.14159
```

---

## 3. Utility klase

Utility klasa je klasa koja sadrži **samo static metode**. Ne pravimo instance ovih klasa.

```javascript
class StringUtils {
  // Pretvara prvi karakter u veliko slovo
  static capitalize(str) {
    if (!str) return "";
    return str[0].toUpperCase() + str.slice(1);
  }

  // Proverava da li je string prazan
  static isEmpty(str) {
    return !str || str.trim().length === 0;
  }

  // Broji reči u stringu
  static countWords(str) {
    if (StringUtils.isEmpty(str)) return 0;
    return str.trim().split(/\s+/).length;
  }
}

console.log(StringUtils.capitalize("hello"));       // "Hello"
console.log(StringUtils.isEmpty("   "));            // true
console.log(StringUtils.countWords("Ovo je test")); // 3
```

---

## 4. Validatori

Validatori su savršen primer za static metode - proveravamo podatke bez potrebe za instancom.

```javascript
class Validator {
  // Validacija email-a
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validacija passworda (min 8 karaktera, bar jedno veliko slovo, broj)
  static isValidPassword(password) {
    if (password.length < 8) return false;

    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    return hasUpperCase && hasNumber;
  }

  // Validacija broja telefona (srpski format)
  static isValidPhone(phone) {
    const phoneRegex = /^(\+381|0)[0-9]{8,9}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  }
}

// Primeri korišćenja
console.log(Validator.isValidEmail("test@gmail.com"));  // true
console.log(Validator.isValidEmail("invalid-email"));   // false

console.log(Validator.isValidPassword("Sifra123"));     // true
console.log(Validator.isValidPassword("slaba"));        // false

console.log(Validator.isValidPhone("+381641234567"));   // true
```

---

## 5. Kada koristiti static?

### Koristi static kada:
- Metoda **ne zavisi od podataka instance** (ne koristi `this`)
- Praviš **utility/helper funkcije**
- Praviš **validatore**
- Praviš **factory metode** (metode koje kreiraju instance)
- Imaš **konstante** koje su iste za sve instance

### NE koristi static kada:
- Metoda treba da pristupi podacima objekta (`this.nesto`)
- Metoda menja stanje objekta
- Svaki objekat treba da ima drugačije ponašanje

---

## 6. Factory metode

Static metode mogu da kreiraju i vraćaju instance svoje klase:

```javascript
class User {
  constructor(ime, email, uloga) {
    this.ime = ime;
    this.email = email;
    this.uloga = uloga;
  }

  // Factory metoda za kreiranje admina
  static createAdmin(ime, email) {
    return new User(ime, email, "admin");
  }

  // Factory metoda za kreiranje gosta
  static createGuest() {
    return new User("Gost", "guest@example.com", "guest");
  }
}

const admin = User.createAdmin("Marko", "marko@firma.com");
const gost = User.createGuest();

console.log(admin); // User { ime: 'Marko', email: 'marko@firma.com', uloga: 'admin' }
console.log(gost);  // User { ime: 'Gost', email: 'guest@example.com', uloga: 'guest' }
```

---

## Rezime

| Pojam | Objašnjenje |
|-------|-------------|
| `static` | Ključna reč koja definiše da metoda/polje pripada klasi |
| Instance metoda | Metoda koja se poziva na objektu, ima pristup `this` |
| Static metoda | Metoda koja se poziva na klasi, nema pristup `this` instance |
| Utility klasa | Klasa sa samo static metodama |
| Validator | Klasa za proveru ispravnosti podataka |
| Factory metoda | Static metoda koja kreira i vraća instance |
