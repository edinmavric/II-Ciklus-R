// ========================================
// REŠENJA: POLIMORFIZAM I METHOD OVERRIDING
// ========================================

// ========================================
// REŠENJE 1: Geometrijski Oblici
// ========================================

console.log("=== REŠENJE 1 ===\n");

class Shape3D {
  volume() {
    return 0;
  }

  describe() {
    return "3D oblik";
  }
}

class Cube extends Shape3D {
  constructor(side) {
    super();
    this.side = side;
  }

  volume() {
    return this.side ** 3;
  }

  describe() {
    return `Kocka sa zapreminom ${this.volume().toFixed(2)}`;
  }
}

class Sphere extends Shape3D {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  volume() {
    return (4 / 3) * Math.PI * this.radius ** 3;
  }

  describe() {
    return `Lopta sa zapreminom ${this.volume().toFixed(2)}`;
  }
}

class Cylinder extends Shape3D {
  constructor(radius, height) {
    super();
    this.radius = radius;
    this.height = height;
  }

  volume() {
    return Math.PI * this.radius ** 2 * this.height;
  }

  describe() {
    return `Cilindar sa zapreminom ${this.volume().toFixed(2)}`;
  }
}

// Testiranje:
const cube = new Cube(3);
const sphere = new Sphere(5);
const cylinder = new Cylinder(3, 10);

console.log(cube.describe()); // Kocka sa zapreminom 27.00
console.log(sphere.describe()); // Lopta sa zapreminom 523.60
console.log(cylinder.describe()); // Cilindar sa zapreminom 282.74

// Demonstracija polimorfizma
const shapes3D = [cube, sphere, cylinder];
const totalVolume = shapes3D.reduce((sum, shape) => sum + shape.volume(), 0);
console.log(`Ukupna zapremina svih oblika: ${totalVolume.toFixed(2)}`);

// ========================================
// REŠENJE 2: Biblioteka
// ========================================

console.log("\n=== REŠENJE 2 ===\n");

class LibraryItem {
  constructor(title, year) {
    this.title = title;
    this.year = year;
  }

  getInfo() {
    return `${this.title} (${this.year})`;
  }

  calculateLateFee(daysLate) {
    return daysLate * 10;
  }
}

class Book extends LibraryItem {
  constructor(title, year, author) {
    super(title, year);
    this.author = author;
  }

  getInfo() {
    return `${this.title} by ${this.author} (${this.year})`;
  }

  calculateLateFee(daysLate) {
    return daysLate * 20;
  }
}

class Magazine extends LibraryItem {
  constructor(title, year, issueNumber) {
    super(title, year);
    this.issueNumber = issueNumber;
  }

  getInfo() {
    return `${this.title} Issue #${this.issueNumber} (${this.year})`;
  }

  calculateLateFee(daysLate) {
    return daysLate * 5;
  }
}

class DVD extends LibraryItem {
  constructor(title, year, director) {
    super(title, year);
    this.director = director;
  }

  getInfo() {
    return `${this.title} directed by ${this.director} (${this.year})`;
  }

  calculateLateFee(daysLate) {
    return 50 + daysLate * 15;
  }
}

function calculateTotalFees(items, daysLate) {
  return items.reduce((total, item) => total + item.calculateLateFee(daysLate), 0);
}

// Testiranje:
const items = [
  new Book("Harry Potter", 1997, "J.K. Rowling"),
  new Magazine("National Geographic", 2023, 145),
  new DVD("Inception", 2010, "Christopher Nolan"),
];

items.forEach((item) => console.log(item.getInfo()));

const daysLate = 5;
items.forEach((item) => {
  console.log(
    `${item.title}: Kazna za ${daysLate} dana = ${item.calculateLateFee(
      daysLate
    )} RSD`
  );
});

console.log(`\nUkupna kazna: ${calculateTotalFees(items, daysLate)} RSD`);

// ========================================
// REŠENJE 3: Plaćanja
// ========================================

console.log("\n=== REŠENJE 3 ===\n");

class Payment {
  constructor(amount) {
    this.amount = amount;
  }

  process() {
    return `Processing payment of ${this.amount} RSD`;
  }

  getFee() {
    return 0;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, cardNumber) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  process() {
    return super.process() + ` via Credit Card ending in ${this.cardNumber}`;
  }

  getFee() {
    return this.amount * 0.02; // 2%
  }
}

class PayPalPayment extends Payment {
  constructor(amount, email) {
    super(amount);
    this.email = email;
  }

  process() {
    return super.process() + ` via PayPal (${this.email})`;
  }

  getFee() {
    return this.amount * 0.03; // 3%
  }
}

class CryptoPayment extends Payment {
  constructor(amount, cryptoType) {
    super(amount);
    this.cryptoType = cryptoType;
  }

  process() {
    return super.process() + ` via ${this.cryptoType}`;
  }

  getFee() {
    return this.amount * 0.01; // 1%
  }
}

class CashPayment extends Payment {
  process() {
    return `Cash payment of ${this.amount} RSD - No fees!`;
  }

  getFee() {
    return 0;
  }
}

function processAllPayments(payments) {
  console.log("=== Processing Payments ===\n");

  let totalAmount = 0;
  let totalFees = 0;

  payments.forEach((payment) => {
    console.log(payment.process());
    console.log(`Fee: ${payment.getFee()} RSD\n`);

    totalAmount += payment.amount;
    totalFees += payment.getFee();
  });

  console.log(`Total Amount: ${totalAmount} RSD`);
  console.log(`Total Fees: ${totalFees.toFixed(2)} RSD`);
  console.log(
    `Net Amount: ${(totalAmount - totalFees).toFixed(2)} RSD (after fees)`
  );
}

// Testiranje:
const payments = [
  new CreditCardPayment(10000, "1234"),
  new PayPalPayment(5000, "user@example.com"),
  new CryptoPayment(20000, "Bitcoin"),
  new CashPayment(3000),
];

processAllPayments(payments);

// ========================================
// REŠENJE 4: Notifikacije
// ========================================

console.log("\n=== REŠENJE 4 ===\n");

class Notification {
  constructor(recipient, message) {
    this.recipient = recipient;
    this.message = message;
  }

  send() {
    return `Sending to ${this.recipient}: ${this.message}`;
  }

  calculateCost() {
    return 0;
  }

  getType() {
    return "Generic";
  }
}

class EmailNotification extends Notification {
  constructor(recipient, message, subject) {
    super(recipient, message);
    this.subject = subject;
  }

  send() {
    return `Email to ${this.recipient}\nSubject: ${this.subject}\nMessage: ${this.message}`;
  }

  calculateCost() {
    return 0.5;
  }

  getType() {
    return "Email";
  }
}

class SMSNotification extends Notification {
  send() {
    return `SMS to ${this.recipient}: ${this.message}`;
  }

  calculateCost() {
    return 5;
  }

  getType() {
    return "SMS";
  }
}

class PushNotification extends Notification {
  constructor(recipient, message, appName) {
    super(recipient, message);
    this.appName = appName;
  }

  send() {
    return `Push notification to ${this.recipient} via ${this.appName}: ${this.message}`;
  }

  calculateCost() {
    return 0.1;
  }

  getType() {
    return "Push";
  }
}

class PriorityNotification extends EmailNotification {
  send() {
    return "[URGENT] " + super.send();
  }

  calculateCost() {
    return super.calculateCost() * 2;
  }

  getType() {
    return "Priority Email";
  }
}

function sendBulkNotifications(notifications) {
  console.log("=== Sending Bulk Notifications ===\n");

  let totalCost = 0;
  const stats = {};

  notifications.forEach((notification, index) => {
    console.log(`[${index + 1}] ${notification.send()}`);
    console.log(`Type: ${notification.getType()}, Cost: ${notification.calculateCost()} RSD\n`);

    // Statistika
    const type = notification.getType();
    stats[type] = (stats[type] || 0) + 1;
    totalCost += notification.calculateCost();
  });

  console.log("=== Statistics ===");
  Object.entries(stats).forEach(([type, count]) => {
    console.log(`${type}: ${count}`);
  });
  console.log(`\nTotal Cost: ${totalCost.toFixed(2)} RSD`);
}
{
  name: 'edin';
  surname: 'mavric'
}

Object.entries() = ['name', 'surname']

// Testiranje:
const notifications = [
  new EmailNotification("user@example.com", "Welcome!", "Dobrodošli"),
  new SMSNotification("+381601234567", "Vaš kod je 1234"),
  new PushNotification("Ana", "Nova poruka", "MyApp"),
  new PriorityNotification("boss@company.com", "Urgent meeting!", "VAŽNO"),
  new EmailNotification("test@test.com", "Test message", "Test"),
];

sendBulkNotifications(notifications);

// ========================================
// REŠENJE 5: Restoran (BONUS)
// ========================================

console.log("\n=== REŠENJE 5 (BONUS) ===\n");

class MenuItem {
  constructor(name, basePrice) {
    this.name = name;
    this.basePrice = basePrice;
  }

  getPrice() {
    return this.basePrice;
  }

  getDescription() {
    return this.name;
  }

  getCategory() {
    return "General";
  }
}

class Appetizer extends MenuItem {
  constructor(name, basePrice, servingSize) {
    super(name, basePrice);
    this.servingSize = servingSize;
  }

  getDescription() {
    return `${this.name} (${this.servingSize} serving)`;
  }

  getCategory() {
    return "Appetizer";
  }
}

class MainCourse extends MenuItem {
  constructor(name, basePrice, protein, cookingMethod) {
    super(name, basePrice);
    this.protein = protein;
    this.cookingMethod = cookingMethod;
  }

  getPrice() {
    return this.basePrice * 1.2; // +20%
  }

  getDescription() {
    return `${this.name} - ${this.cookingMethod} ${this.protein}`;
  }

  getCategory() {
    return "Main Course";
  }
}

class Dessert extends MenuItem {
  constructor(name, basePrice, sweetnessLevel) {
    super(name, basePrice);
    this.sweetnessLevel = sweetnessLevel;
  }

  getPrice() {
    return this.sweetnessLevel > 3 ? this.basePrice * 1.1 : this.basePrice;
  }

  getDescription() {
    return `${this.name} (Sweetness: ${"★".repeat(this.sweetnessLevel)})`;
  }

  getCategory() {
    return "Dessert";
  }
}

class Beverage extends MenuItem {
  constructor(name, basePrice, size) {
    super(name, basePrice);
    this.size = size;
  }

  getPrice() {
    const multiplier = {
      small: 1,
      medium: 1.2,
      large: 1.4,
    };
    return this.basePrice * (multiplier[this.size] || 1);
  }

  getDescription() {
    return `${this.name} (${this.size})`;
  }

  getCategory() {
    return "Beverage";
  }
}

class SpecialOfferItem extends MenuItem {
  constructor(menuItem, discountPercent) {
    super(menuItem.name, menuItem.basePrice);
    this.menuItem = menuItem;
    this.discountPercent = discountPercent;
  }

  getPrice() {
    return this.menuItem.getPrice() * (1 - this.discountPercent / 100);
  }

  getDescription() {
    return `[SPECIAL OFFER -${this.discountPercent}%] ${this.menuItem.getDescription()}`;
  }

  getCategory() {
    return this.menuItem.getCategory();
  }
}

class Order {
  constructor() {
    this.items = [];
  }

  addItem(menuItem) {
    this.items.push(menuItem);
  }

  removeItem(index) {
    if (index >= 0 && index < this.items.length) {
      this.items.splice(index, 1);
    }
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + item.getPrice(), 0);
  }

  getTax() {
    return this.getSubtotal() * 0.2; // 20% porez
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  printReceipt() {
    console.log("╔════════════════════════════════════════════════╗");
    console.log("║            RESTORAN - RAČUN                    ║");
    console.log("╚════════════════════════════════════════════════╝");
    console.log("");

    // Group by category
    const categories = {};
    this.items.forEach((item) => {
      const category = item.getCategory();
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
    });

    // Print items by category
    Object.entries(categories).forEach(([category, items]) => {
      console.log(`--- ${category} ---`);
      items.forEach((item) => {
        const price = item.getPrice().toFixed(2);
        const description = item.getDescription();
        console.log(`  ${description}`);
        console.log(`  ${price.padStart(40)} RSD`);
      });
      console.log("");
    });

    console.log("────────────────────────────────────────────────");
    console.log(`Subtotal:        ${this.getSubtotal().toFixed(2)} RSD`);
    console.log(`Tax (20%):       ${this.getTax().toFixed(2)} RSD`);
    console.log("────────────────────────────────────────────────");
    console.log(`TOTAL:           ${this.getTotal().toFixed(2)} RSD`);
    console.log("════════════════════════════════════════════════");
    console.log("Hvala što ste posetili naš restoran!");
    console.log("");
  }

  getItemsByCategory(category) {
    return this.items.filter((item) => item.getCategory() === category);
  }
}

// Testiranje:
const order = new Order();

order.addItem(new Appetizer("Bruschetta", 500, "Standard"));
order.addItem(new Appetizer("Caesar Salad", 650, "Large"));
order.addItem(new MainCourse("Bifteck", 1500, "Beef", "Grilled"));
order.addItem(new MainCourse("Salmon", 1800, "Fish", "Pan-seared"));
order.addItem(new Dessert("Tiramisu", 600, 4));
order.addItem(new Dessert("Fruit Salad", 400, 2));
order.addItem(new Beverage("Coca Cola", 200, "large"));
order.addItem(new Beverage("Orange Juice", 250, "medium"));
order.addItem(
  new SpecialOfferItem(new MainCourse("Pasta Carbonara", 900, "Pasta", "Boiled"), 30)
);

order.printReceipt();

// Demonstracija polimorfizma - filtriraj po kategoriji
console.log("\n=== Main Courses Only ===");
order.getItemsByCategory("Main Course").forEach((item) => {
  console.log(`${item.getDescription()} - ${item.getPrice().toFixed(2)} RSD`);
});

console.log("\n=== Kraj Rešenja ===");
