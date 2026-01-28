// ========================================
// VEŽBE: POLIMORFIZAM I METHOD OVERRIDING
// ========================================

/*
  Uputstvo:
  - Reši sve zadatke ispod
  - Testiraj svoj kod nakon svakog zadatka
  - Koristi polimorfizam gde je to moguće
  - Proveri rešenja u resenja.js nakon što završiš
*/

// ========================================
// ZADATAK 1: Geometrijski Oblici (LAKŠI)
// ========================================

/*
  Kreiraj sledeće klase:

  1. Baznu klasu Shape3D sa:
     - metodom volume() koja vraća 0
     - metodom describe() koja vraća string "3D oblik"

  2. Klasu Cube (kocka) koja nasleđuje Shape3D:
     - konstruktor prima side (stranica)
     - override metode volume() da vraća side³
     - override metode describe() da vraća "Kocka sa zapreminom X"

  3. Klasu Sphere (lopta) koja nasleđuje Shape3D:
     - konstruktor prima radius
     - override metode volume() da vraća (4/3) * π * r³
     - override metode describe() da vraća "Lopta sa zapreminom X"

  4. Klasu Cylinder (cilindar) koja nasleđuje Shape3D:
     - konstruktor prima radius i height
     - override metode volume() da vraća π * r² * h
     - override metode describe() da vraća "Cilindar sa zapreminom X"
*/

// TODO: Tvoj kod ovde
console.log("=== ZADATAK 1 ===\n");

// class Shape3D { ... }
// class Cube extends Shape3D { ... }
// class Sphere extends Shape3D { ... }
// class Cylinder extends Shape3D { ... }

// Testiranje:
// const cube = new Cube(3);
// const sphere = new Sphere(5);
// const cylinder = new Cylinder(3, 10);
// console.log(cube.describe());
// console.log(sphere.describe());
// console.log(cylinder.describe());

// ========================================
// ZADATAK 2: Biblioteka (SREDNJI)
// ========================================

/*
  Kreiraj sistem za biblioteku:

  1. Baznu klasu LibraryItem sa:
     - constructor(title, year)
     - metodom getInfo() koja vraća "title (year)"
     - metodom calculateLateFee(daysLate) koja vraća daysLate * 10

  2. Klasu Book koja nasleđuje LibraryItem:
     - dodaj author u konstruktor
     - override getInfo() da uključi i autora: "title by author (year)"
     - override calculateLateFee() - knjige imaju veću kaznu: daysLate * 20

  3. Klasu Magazine koja nasleđuje LibraryItem:
     - dodaj issueNumber u konstruktor
     - override getInfo() da uključi broj izdanja
     - override calculateLateFee() - časopisi imaju manju kaznu: daysLate * 5

  4. Klasu DVD koja nasleđuje LibraryItem:
     - dodaj director u konstruktor
     - override getInfo() da uključi režisera
     - override calculateLateFee() - DVD ima fiksnu kaznu od 50 + daysLate * 15

  5. Napiši funkciju calculateTotalFees(items, daysLate) koja:
     - prima niz LibraryItem objekata i broj dana kašnjenja
     - računa ukupnu kaznu za sve stavke
*/

// TODO: Tvoj kod ovde
console.log("\n=== ZADATAK 2 ===\n");

// class LibraryItem { ... }
// class Book extends LibraryItem { ... }
// class Magazine extends LibraryItem { ... }
// class DVD extends LibraryItem { ... }

// function calculateTotalFees(items, daysLate) { ... }

// Testiranje:
// const items = [
//   new Book("Harry Potter", 1997, "J.K. Rowling"),
//   new Magazine("National Geographic", 2023, 145),
//   new DVD("Inception", 2010, "Christopher Nolan")
// ];
// items.forEach(item => console.log(item.getInfo()));
// console.log(`Ukupna kazna za 5 dana: ${calculateTotalFees(items, 5)} RSD`);

// ========================================
// ZADATAK 3: Plaćanja (SREDNJI)
// ========================================

/*
  Kreiraj sistem za različite vrste plaćanja:

  1. Baznu klasu Payment sa:
     - constructor(amount)
     - metodom process() koja vraća "Processing payment of amount RSD"
     - metodom getFee() koja vraća 0

  2. Klasu CreditCardPayment:
     - dodaj cardNumber u konstruktor (samo poslednje 4 cifre)
     - override process() da koristi super i dodaje "via Credit Card ending in XXXX"
     - override getFee() - provizija je 2% od amount

  3. Klasu PayPalPayment:
     - dodaj email u konstruktor
     - override process() da koristi super i dodaje "via PayPal (email)"
     - override getFee() - provizija je 3% od amount

  4. Klasu CryptoPayment:
     - dodaj cryptoType u konstruktor (npr. "Bitcoin")
     - override process() da koristi super i dodaje "via cryptoType"
     - override getFee() - provizija je 1% od amount

  5. Klasu CashPayment:
     - override process() da kaže "Cash payment of amount RSD - No fees!"
     - override getFee() - gotovina nema proviziju (0)

  6. Napiši funkciju processAllPayments(payments) koja:
     - procesira sva plaćanja
     - prikazuje ukupan iznos i ukupne provizije
*/

// TODO: Tvoj kod ovde
console.log("\n=== ZADATAK 3 ===\n");

// class Payment { ... }
// class CreditCardPayment extends Payment { ... }
// class PayPalPayment extends Payment { ... }
// class CryptoPayment extends Payment { ... }
// class CashPayment extends Payment { ... }

// function processAllPayments(payments) { ... }

// Testiranje:
// const payments = [
//   new CreditCardPayment(10000, "1234"),
//   new PayPalPayment(5000, "user@example.com"),
//   new CryptoPayment(20000, "Bitcoin"),
//   new CashPayment(3000)
// ];
// processAllPayments(payments);

// ========================================
// ZADATAK 4: Notifikacije (TEŽI)
// ========================================

/*
  Kreiraj sistem za slanje notifikacija:

  1. Baznu klasu Notification sa:
     - constructor(recipient, message)
     - metodom send() koja vraća "Sending to recipient: message"
     - metodom calculateCost() koja vraća 0
     - metodom getType() koja vraća "Generic"

  2. Klasu EmailNotification:
     - dodaj subject u konstruktor
     - override send() da formatira kao email sa temom
     - override calculateCost() - email košta 0.5 RSD
     - override getType() da vraća "Email"

  3. Klasu SMSNotification:
     - override send() da formatira kao SMS
     - override calculateCost() - SMS košta 5 RSD po poruci
     - override getType() da vraća "SMS"

  4. Klasu PushNotification:
     - dodaj appName u konstruktor
     - override send() da uključi ime aplikacije
     - override calculateCost() - push notifikacija košta 0.1 RSD
     - override getType() da vraća "Push"

  5. Klasu PriorityNotification koja nasleđuje bilo koju gornju:
     - koristi super da pozove originalni send()
     - dodaje "[URGENT]" prefix
     - dupla cena (koristi super.calculateCost() * 2)

  6. Napiši funkciju sendBulkNotifications(notifications) koja:
     - šalje sve notifikacije
     - prikazuje statistiku po tipu (koliko Email, SMS, Push)
     - prikazuje ukupnu cenu
*/

// TODO: Tvoj kod ovde
console.log("\n=== ZADATAK 4 ===\n");

// class Notification { ... }
// class EmailNotification extends Notification { ... }
// class SMSNotification extends Notification { ... }
// class PushNotification extends Notification { ... }
// class PriorityNotification extends EmailNotification { ... }

// function sendBulkNotifications(notifications) { ... }

// Testiranje:
// const notifications = [
//   new EmailNotification("user@example.com", "Welcome!", "Dobrodošli"),
//   new SMSNotification("+381601234567", "Vaš kod je 1234"),
//   new PushNotification("Ana", "Nova poruka", "MyApp"),
//   new PriorityNotification("boss@company.com", "Urgent meeting!", "VAŽNO")
// ];
// sendBulkNotifications(notifications);

// ========================================
// ZADATAK 5: Restoran (BONUS - NAJTEŽI)
// ========================================

/*
  Kreiraj kompletan sistem za restoran:

  1. Baznu klasu MenuItem sa:
     - constructor(name, basePrice)
     - metodom getPrice() koja vraća basePrice
     - metodom getDescription() koja vraća name
     - metodom getCategory() koja vraća "General"

  2. Klasu Appetizer (predjelo):
     - dodaj servingSize u konstruktor
     - override getDescription() da uključi veličinu porcije
     - override getCategory() da vraća "Appetizer"

  3. Klasu MainCourse (glavno jelo):
     - dodaj protein (vrsta mesa/proteina) u konstruktor
     - dodaj cookingMethod (način pripreme) u konstruktor
     - override getPrice() - glavna jela imaju +20% cenu
     - override getDescription() da uključi protein i način pripreme
     - override getCategory() da vraća "Main Course"

  4. Klasu Dessert (desert):
     - dodaj sweetness level (1-5) u konstruktor
     - override getPrice() - deserti sa sweetness > 3 koštaju +10%
     - override getDescription() da uključi nivo slatkoće
     - override getCategory() da vraća "Dessert"

  5. Klasu Beverage (piće):
     - dodaj size ("small", "medium", "large") u konstruktor
     - override getPrice() - medium je +20%, large je +40%
     - override getDescription() da uključi veličinu
     - override getCategory() da vraća "Beverage"

  6. Klasu SpecialOfferItem koja može wrap-ovati bilo koju stavku:
     - constructor(menuItem, discountPercent)
     - override getPrice() da primeni discount
     - override getDescription() da doda "[SPECIAL OFFER]"

  7. Klasu Order sa:
     - metodom addItem(menuItem) za dodavanje stavke
     - metodom removeItem(index) za uklanjanje stavke
     - metodom getSubtotal() za račun bez poreza
     - metodom getTax() za porez (20%)
     - metodom getTotal() za ukupan račun
     - metodom printReceipt() koja prikazuje kompletan račun

  8. BONUS: Dodaj sistem za kategorije i filtere
*/

// TODO: Tvoj kod ovde
console.log("\n=== ZADATAK 5 (BONUS) ===\n");

// class MenuItem { ... }
// class Appetizer extends MenuItem { ... }
// class MainCourse extends MenuItem { ... }
// class Dessert extends MenuItem { ... }
// class Beverage extends MenuItem { ... }
// class SpecialOfferItem extends MenuItem { ... }
// class Order { ... }

// Testiranje:
// const order = new Order();
// order.addItem(new Appetizer("Bruschetta", 500, "Standard"));
// order.addItem(new MainCourse("Bifteck", 1500, "Beef", "Grilled"));
// order.addItem(new Dessert("Tiramisu", 600, 4));
// order.addItem(new Beverage("Coca Cola", 200, "large"));
// order.addItem(new SpecialOfferItem(new MainCourse("Pasta", 900, "Pasta", "Boiled"), 30));
// order.printReceipt();

console.log("\n=== Kraj Vežbi ===");
console.log("Proveri svoja rešenja u resenja.js");
