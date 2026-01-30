// ============================================
// 30. ČAS - STATIC METODE I POLJA - VEŽBE
// ============================================

// ============================================
// VEŽBA 1: Email Validator
// ============================================
// Kreiraj klasu EmailValidator sa static metodom isValid(email)
// Email je validan ako:
// 1. Sadrži tačno jedan @
// 2. Ima bar jedan karakter pre @
// 3. Ima bar jedan karakter posle @
// 4. Ima tačku posle @

class EmailValidator {
  // TVOJ KOD OVDE
}

// Testiraj:
// console.log(EmailValidator.isValid("test@gmail.com"));  // true
// console.log(EmailValidator.isValid("invalid"));         // false
// console.log(EmailValidator.isValid("@gmail.com"));      // false
// console.log(EmailValidator.isValid("test@"));           // false
// console.log(EmailValidator.isValid("test@@gmail.com")); // false

// ============================================
// VEŽBA 2: Password Validator
// ============================================
// Kreiraj klasu PasswordValidator sa static metodom validate(password)
// Metoda vraća objekat: { isValid: true/false, errors: [] }
//
// Pravila:
// - Minimum 8 karaktera
// - Bar jedno veliko slovo
// - Bar jedan broj
// - Bar jedan specijalni karakter (!@#$%^&*)

class PasswordValidator {
  // TVOJ KOD OVDE
}

// Testiraj:
// console.log(PasswordValidator.validate("Test123!"));
// // { isValid: true, errors: [] }
//
// console.log(PasswordValidator.validate("weak"));
// // { isValid: false, errors: ["Minimum 8 karaktera", "Fali veliko slovo", "Fali broj", "Fali specijalni karakter"] }
//
// console.log(PasswordValidator.validate("password123"));
// // { isValid: false, errors: ["Fali veliko slovo", "Fali specijalni karakter"] }

// ============================================
// VEŽBA 3: ArrayUtils
// ============================================
// Kreiraj utility klasu ArrayUtils sa sledećim static metodama:
// - sum(arr) - vraća zbir svih elemenata
// - average(arr) - vraća prosek elemenata
// - max(arr) - vraća najveći element
// - min(arr) - vraća najmanji element
// - unique(arr) - vraća niz bez duplikata

class ArrayUtils {
  // TVOJ KOD OVDE
}

// Testiraj:
// const brojevi = [5, 2, 8, 2, 9, 1, 5, 8];
// console.log(ArrayUtils.sum(brojevi));     // 40
// console.log(ArrayUtils.average(brojevi)); // 5
// console.log(ArrayUtils.max(brojevi));     // 9
// console.log(ArrayUtils.min(brojevi));     // 1
// console.log(ArrayUtils.unique(brojevi));  // [5, 2, 8, 9, 1]

// ============================================
// VEŽBA 4: DateUtils
// ============================================
// Kreiraj utility klasu DateUtils sa sledećim static metodama:
// - formatDate(date) - vraća datum u formatu "DD.MM.YYYY"
// - isWeekend(date) - vraća true ako je vikend
// - daysBetween(date1, date2) - vraća broj dana između dva datuma

class DateUtils {
  // TVOJ KOD OVDE
}

// Testiraj:
// const danas = new Date();
// console.log(DateUtils.formatDate(danas));
// console.log(DateUtils.isWeekend(danas));
// console.log(DateUtils.daysBetween(new Date("2024-01-01"), new Date("2024-01-15"))); // 14

// ============================================
// BONUS VEŽBA: ID Generator
// ============================================
// Kreiraj klasu IDGenerator koja generiše jedinstvene ID-jeve
// - static polje nextId koje počinje od 1
// - static metoda generate() koja vraća novi ID i povećava nextId
// - static metoda reset() koja vraća nextId na 1
// - static metoda generateWithPrefix(prefix) koja vraća ID sa prefiksom
//   npr. generateWithPrefix("USER") vraća "USER_1", "USER_2", itd.

class IDGenerator {
  // TVOJ KOD OVDE
}

// Testiraj:
// console.log(IDGenerator.generate());              // 1
// console.log(IDGenerator.generate());              // 2
// console.log(IDGenerator.generateWithPrefix("USER")); // "USER_3"
// console.log(IDGenerator.generateWithPrefix("ORDER")); // "ORDER_4"
// IDGenerator.reset();
// console.log(IDGenerator.generate());              // 1
