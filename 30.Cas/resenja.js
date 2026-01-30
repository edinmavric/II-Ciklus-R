// ============================================
// 30. ČAS - STATIC METODE I POLJA - REŠENJA
// ============================================

// ============================================
// REŠENJE 1: Email Validator
// ============================================

class EmailValidator {
  static isValid(email) {
    // Provera da li postoji tačno jedan @
    const atCount = (email.match(/@/g) || []).length;
    if (atCount !== 1) {
      return false;
    }

    // Podeli na deo pre i posle @
    const [localPart, domainPart] = email.split("@");

    // Provera da li ima karaktera pre @
    if (!localPart || localPart.length === 0) {
      return false;
    }

    // Provera da li ima karaktera posle @
    if (!domainPart || domainPart.length === 0) {
      return false;
    }

    // Provera da li ima tačku u domenu
    if (!domainPart.includes(".")) {
      return false;
    }

    return true;
  }
}

console.log("=== REŠENJE 1: Email Validator ===");
console.log("test@gmail.com:", EmailValidator.isValid("test@gmail.com")); // true
console.log("invalid:", EmailValidator.isValid("invalid")); // false
console.log("@gmail.com:", EmailValidator.isValid("@gmail.com")); // false
console.log("test@:", EmailValidator.isValid("test@")); // false
console.log("test@@gmail.com:", EmailValidator.isValid("test@@gmail.com")); // false

// ============================================
// REŠENJE 2: Password Validator
// ============================================

class PasswordValidator {
  static validate(password) {
    const errors = [];

    // Provera dužine
    if (password.length < 8) {
      errors.push("Minimum 8 karaktera");
    }

    // Provera velikog slova
    if (!/[A-Z]/.test(password)) {
      errors.push("Fali veliko slovo");
    }

    // Provera broja
    if (!/[0-9]/.test(password)) {
      errors.push("Fali broj");
    }

    // Provera specijalnog karaktera
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push("Fali specijalni karakter");
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }
}

console.log("\n=== REŠENJE 2: Password Validator ===");
console.log("Test123!:", PasswordValidator.validate("Test123!"));
console.log("weak:", PasswordValidator.validate("weak"));
console.log("password123:", PasswordValidator.validate("password123"));
console.log("PASSWORD!:", PasswordValidator.validate("PASSWORD!"));

// ============================================
// REŠENJE 3: ArrayUtils
// ============================================

class ArrayUtils {
  static sum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
  }

  static average(arr) {
    if (arr.length === 0) return 0;
    return ArrayUtils.sum(arr) / arr.length;
  }

  static max(arr) {
    return Math.max(...arr);
  }

  static min(arr) {
    return Math.min(...arr);
  }

  static unique(arr) {
    return [...new Set(arr)];
  }
}

console.log("\n=== REŠENJE 3: ArrayUtils ===");
const brojevi = [5, 2, 8, 2, 9, 1, 5, 8];
console.log("Niz:", brojevi);
console.log("sum:", ArrayUtils.sum(brojevi)); // 40
console.log("average:", ArrayUtils.average(brojevi)); // 5
console.log("max:", ArrayUtils.max(brojevi)); // 9
console.log("min:", ArrayUtils.min(brojevi)); // 1
console.log("unique:", ArrayUtils.unique(brojevi)); // [5, 2, 8, 9, 1]

// ============================================
// REŠENJE 4: DateUtils
// ============================================

class DateUtils {
  static formatDate(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  static isWeekend(date) {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 = nedelja, 6 = subota
  }

  static daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000; // milisekunde u jednom danu
    const diffInMs = Math.abs(date2 - date1);
    return Math.round(diffInMs / oneDay);
  }
}

console.log("\n=== REŠENJE 4: DateUtils ===");
const danas = new Date();
console.log("Današnji datum:", DateUtils.formatDate(danas));
console.log("Da li je vikend:", DateUtils.isWeekend(danas));
console.log(
  "Dana između 01.01. i 15.01.:",
  DateUtils.daysBetween(new Date("2024-01-01"), new Date("2024-01-15"))
); // 14

// Test za vikend
const subota = new Date("2024-01-06"); // Subota
const ponedeljak = new Date("2024-01-08"); // Ponedeljak
console.log("06.01.2024 (subota) je vikend:", DateUtils.isWeekend(subota)); // true
console.log("08.01.2024 (ponedeljak) je vikend:", DateUtils.isWeekend(ponedeljak)); // false

// ============================================
// BONUS REŠENJE: ID Generator
// ============================================

class IDGenerator {
  static nextId = 1;

  static generate() {
    return IDGenerator.nextId++;
  }

  static reset() {
    IDGenerator.nextId = 1;
  }

  static generateWithPrefix(prefix) {
    return `${prefix}_${IDGenerator.generate()}`;
  }
}

console.log("\n=== BONUS REŠENJE: ID Generator ===");
console.log("generate():", IDGenerator.generate()); // 1
console.log("generate():", IDGenerator.generate()); // 2
console.log("generateWithPrefix('USER'):", IDGenerator.generateWithPrefix("USER")); // "USER_3"
console.log("generateWithPrefix('ORDER'):", IDGenerator.generateWithPrefix("ORDER")); // "ORDER_4"
console.log("Resetujem...");
IDGenerator.reset();
console.log("generate() posle reset:", IDGenerator.generate()); // 1
