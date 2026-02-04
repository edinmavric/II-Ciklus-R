// ============================================
// 31. ČAS - KOMPOZICIJA VS NASLEĐIVANJE - PRIMERI
// ============================================

// ============================================
// PRIMER 1: Problem sa nasleđivanjem
// ============================================

console.log('=== PRIMER 1: Problem sa nasleđivanjem ===\n');

// LOŠE: Previše nasleđivanja
class Vehicle1 {
  constructor(brand) {
    this.brand = brand;
  }
  start() {
    this.checkFuel(); // Ovo je problem za električna vozila!
    console.log(`${this.brand} se pali`);
  }
  checkFuel() {
    console.log('Proveravam gorivo...');
  }
}

class Car1 extends Vehicle1 {
  constructor(brand, doors) {
    super(brand);
    this.doors = doors;
  }
}

class ElectricCar1 extends Car1 {
  // Problem: nasleđuje checkFuel() koji nema smisla za električni auto!
  // Moramo override-ovati
  checkFuel() {
    console.log('Proveravam bateriju... (ovo smo morali da pregazimo)');
  }
}

const tesla1 = new ElectricCar1('Tesla', 4);
tesla1.start();

console.log('');

// ============================================
// PRIMER 2: "is-a" vs "has-a"
// ============================================

console.log('=== PRIMER 2: is-a vs has-a ===\n');

// "is-a" - Pas JE životinja (nasleđivanje je OK)
class Animal {
  constructor(name) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name} jede`);
  }
}

class Dog extends Animal {
  bark() {
    console.log(`${this.name} kaže: Av av!`);
  }
}

const dog = new Dog('Rex');
dog.eat(); // Nasledio od Animal
dog.bark(); // Specifično za Dog

console.log('');

// "has-a" - Auto IMA motor (kompozicija)
class Engine {
  constructor(type) {
    this.type = type;
  }
  start() {
    console.log(`${this.type} motor upaljen`);
  }
}

class Car2 {
  constructor(brand, engine) {
    this.brand = brand;
    this.engine = engine; // Auto IMA motor
  }
  start() {
    console.log(`${this.brand} se pali...`);
    this.engine.start();
  }
}

const petrolEngine = new Engine('Benzinski');
const myCar = new Car2('Golf', petrolEngine);
myCar.start();

console.log('');

// ============================================
// PRIMER 3: Kompozicija sa više komponenti
// ============================================

console.log('=== PRIMER 3: Auto sa više komponenti ===\n');

class Engine2 {
  constructor(horsePower) {
    this.horsePower = horsePower;
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    console.log(`  Motor (${this.horsePower}KS) upaljen`);
  }

  stop() {
    this.isRunning = false;
    console.log('  Motor ugašen');
  }
}

class AirConditioner {
  constructor() {
    this.temperature = 22;
  }

  turnOn() {
    console.log(`  Klima upaljena na ${this.temperature}°C`);
  }

  setTemperature(temp) {
    this.temperature = temp;
    console.log(`  Temperatura podešena na ${temp}°C`);
  }
}

class GPS {
  navigate(destination) {
    console.log(`  Navigacija do: ${destination}`);
  }
}

class Radio {
  constructor() {
    this.station = 'Radio S';
  }

  play() {
    console.log(`  Radio: Svira ${this.station}`);
  }

  changeStation(station) {
    this.station = station;
    console.log(`  Promenjena stanica na: ${station}`);
  }
}

// Auto koristi sve ove komponente
class Car3 {
  constructor(brand, engine, ac, gps, radio) {
    this.brand = brand;
    this.engine = engine;
    this.ac = ac;
    this.gps = gps;
    this.radio = radio;
  }

  start() {
    console.log(`${this.brand} se pali...`);
    this.engine.start();
  }

  stop() {
    console.log(`${this.brand} se gasi...`);
    this.engine.stop();
  }

  coolDown() {
    this.ac.turnOn();
  }

  goTo(destination) {
    this.gps.navigate(destination);
  }

  playMusic() {
    this.radio.play();
  }
}

// Kreiramo komponente
const engine3 = new Engine2(150);
const ac3 = new AirConditioner();
const gps3 = new GPS();
const radio3 = new Radio();

// Sastavljamo auto
const fullCar = new Car3('Toyota Corolla', engine3, ac3, gps3, radio3);

fullCar.start();
fullCar.coolDown();
fullCar.playMusic();
fullCar.goTo('Beograd');
fullCar.stop();

console.log('');

// ============================================
// PRIMER 4: Dependency Injection - različiti motori
// ============================================

console.log('=== PRIMER 4: Dependency Injection ===\n');

class PetrolEngine {
  start() {
    console.log('  Benzinski motor: Vroom!');
  }
  stop() {
    console.log('  Benzinski motor ugašen');
  }
  getType() {
    return 'benzin';
  }
}

class DieselEngine {
  start() {
    console.log('  Dizel motor: BRBRBRBR!');
  }
  stop() {
    console.log('  Dizel motor ugašen');
  }
  getType() {
    return 'dizel';
  }
}

class ElectricEngine {
  start() {
    console.log('  Električni motor: *tiho*');
  }
  stop() {
    console.log('  Električni motor ugašen');
  }
  getType() {
    return 'struja';
  }
}

class HybridEngine {
  start() {
    console.log('  Hibrid: Kombinujem struju i benzin...');
  }
  stop() {
    console.log('  Hibrid ugašen');
  }
  getType() {
    return 'hibrid';
  }
}

class Car4 {
  constructor(brand, engine) {
    this.brand = brand;
    this.engine = engine;
  }

  start() {
    console.log(`${this.brand} (${this.engine.getType()}):`);
    this.engine.start();
  }
}

// Isti tip auta, različiti motori!
const petrol1 = new PetrolEngine()
const golf = new Car4('VW Golf', petrol1);
const golf3 = new Car4('VW Golf 3', petrol1)
const passat = new Car4('VW Passat', new DieselEngine());
const tesla = new Car4('Tesla Model 3', new ElectricEngine());
const prius = new Car4('Toyota Prius', new HybridEngine());

golf.start();
passat.start();
tesla.start();
prius.start();

console.log('');

// ============================================
// PRIMER 5: User + PermissionService
// ============================================

console.log('=== PRIMER 5: User + PermissionService ===\n');

class PermissionService {
  constructor(role) {
    this.role = role;
  }

  canRead() {
    return true; // Svi mogu čitati
  }

  canWrite() {
    return this.role === 'admin' || this.role === 'editor';
  }

  canDelete() {
    return this.role === 'admin';
  }

  canManageUsers() {
    return this.role === 'admin';
  }

  getRole() {
    return this.role;
  }
}

class User {
  constructor(name, email, permissionService) {
    this.name = name;
    this.email = email;
    this.permissions = permissionService;
  }

  canEditDocument() {
    return this.permissions.canWrite();
  }

  canDeleteDocument() {
    return this.permissions.canDelete();
  }

  describe() {
    console.log(`${this.name} (${this.permissions.getRole()}):`);
    console.log(`  - Može čitati: ${this.permissions.canRead()}`);
    console.log(`  - Može pisati: ${this.permissions.canWrite()}`);
    console.log(`  - Može brisati: ${this.permissions.canDelete()}`);
    console.log(`  - Može upravljati korisnicima: ${this.permissions.canManageUsers()}`);
  }
}

// Kreiramo korisnike sa različitim dozvolama
const adminPerms = new PermissionService('admin');
const editorPerms = new PermissionService('editor');
const viewerPerms = new PermissionService('viewer');

const admin = new User('Marko', 'marko@firma.com', adminPerms);
const editor = new User('Ana', 'ana@firma.com', editorPerms);
const viewer = new User('Petar', 'petar@firma.com', viewerPerms);

admin.describe();
console.log('');
editor.describe();
console.log('');
viewer.describe();

console.log('');

// ============================================
// PRIMER 6: Order + PaymentService
// ============================================

console.log('=== PRIMER 6: Order + PaymentService ===\n');

class CashPayment {
  processPayment(amount) {
    console.log(`  Plaćanje gotovinom: ${amount} RSD`);
    return { success: true, method: 'cash' };
  }

  getName() {
    return 'Gotovina';
  }
}

class CardPayment {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  processPayment(amount) {
    const lastFour = this.cardNumber.slice(-4);
    console.log(`  Plaćanje karticom ***${lastFour}: ${amount} RSD`);
    return { success: true, method: 'card' };
  }

  getName() {
    return 'Kartica';
  }
}

class CryptoPayment {
  constructor(wallet) {
    this.wallet = wallet;
  }

  processPayment(amount) {
    console.log(`  Plaćanje kriptom na ${this.wallet}: ${amount} RSD`);
    return { success: true, method: 'crypto' };
  }

  getName() {
    return 'Kripto';
  }
}

class Order {
  constructor(items, paymentService) {
    this.items = items;
    this.paymentService = paymentService;
    this.status = 'pending';
  }

  calculateTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  checkout() {
    const total = this.calculateTotal();
    console.log(`Narudžbina (${this.paymentService.getName()}):`);
    this.items.forEach((item) => {
      console.log(`  - ${item.name} x${item.quantity}: ${item.price * item.quantity} RSD`);
    });
    console.log(`  UKUPNO: ${total} RSD`);

    const result = this.paymentService.processPayment(total);

    if (result.success) {
      this.status = 'paid';
      console.log('  ✓ Plaćanje uspešno!\n');
    }

    return result;
  }
}

const items = [
  { name: 'Laptop', price: 150000, quantity: 1 },
  { name: 'Miš', price: 3000, quantity: 2 },
];

// Ista narudžbina, različiti načini plaćanja
const cashOrder = new Order([...items], new CashPayment());
const cardOrder = new Order([...items], new CardPayment('1234567890123456'));
const cryptoOrder = new Order([...items], new CryptoPayment('0x123...abc'));

cashOrder.checkout();
cardOrder.checkout();
cryptoOrder.checkout();

// ============================================
// PRIMER 7: Logger servis
// ============================================

console.log('=== PRIMER 7: Logger servis ===\n');

class ConsoleLogger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }
}

class SilentLogger {
  log(message) {
    // Ne radi ništa
  }
  error(message) {
    // Ne radi ništa
  }
}

class PrefixLogger {
  constructor(prefix) {
    this.prefix = prefix;
  }

  log(message) {
    console.log(`[${this.prefix}] ${message}`);
  }

  error(message) {
    console.error(`[${this.prefix} ERROR] ${message}`);
  }
}

class ProductService {
  constructor(logger) {
    this.logger = logger;
    this.products = [];
  }

  addProduct(name, price) {
    const product = { id: Date.now(), name, price };
    this.products.push(product);
    this.logger.log(`Dodat proizvod: ${name} (${price} RSD)`);
    return product;
  }

  removeProduct(id) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      this.logger.error(`Proizvod ${id} ne postoji`);
      return false;
    }
    const removed = this.products.splice(index, 1)[0];
    this.logger.log(`Uklonjen proizvod: ${removed.name}`);
    return true;
  }
}

console.log('Sa ConsoleLogger:');
const devService = new ProductService(new ConsoleLogger());
devService.addProduct('Telefon', 50000);
devService.addProduct('Slušalice', 5000);

console.log('\nSa PrefixLogger:');
const customService = new ProductService(new PrefixLogger('SHOP'));
customService.addProduct('Tablet', 80000);

console.log('\nSa SilentLogger (produkcija):');
const prodService = new ProductService(new SilentLogger());
prodService.addProduct('Monitor', 40000); // Nema outputa

console.log('(nema loga jer je SilentLogger)');

console.log('');

// ============================================
// PRIMER 8: Poređenje - Nasleđivanje vs Kompozicija
// ============================================

console.log('=== PRIMER 8: Poređenje pristupa ===\n');

// ---- SA NASLEĐIVANJEM (manje fleksibilno) ----
console.log('--- Sa nasleđivanjem ---');

class BaseNotifier {
  send(message) {
    console.log(`Poruka: ${message}`);
  }
}

class EmailNotifier extends BaseNotifier {
  send(message) {
    console.log(`[EMAIL] ${message}`);
  }
}

class SMSNotifier extends BaseNotifier {
  send(message) {
    console.log(`[SMS] ${message}`);
  }
}

// Problem: Kako poslati i email I SMS? Ne možemo naslediti oba!

const emailNotifier = new EmailNotifier();
const smsNotifier = new SMSNotifier();
emailNotifier.send('Zdravo!');
smsNotifier.send('Zdravo!');

console.log('');

// ---- SA KOMPOZICIJOM (fleksibilnije) ----
console.log('--- Sa kompozicijom ---');

class EmailSender {
  send(message) {
    console.log(`[EMAIL] ${message}`);
  }
}

class SMSSender {
  send(message) {
    console.log(`[SMS] ${message}`);
  }
}

class PushSender {
  send(message) {
    console.log(`[PUSH] ${message}`);
  }
}

// Notifier može imati VIŠE načina slanja!
class Notifier {
  constructor(senders) {
    this.senders = senders; // Niz sender-a
  }

  notify(message) {
    this.senders.forEach((sender) => sender.send(message));
  }
}

// Možemo kombinovati kako hoćemo!
const multiNotifier = new Notifier([new EmailSender(), new SMSSender(), new PushSender()]);

console.log('Šaljemo na sve kanale:');
multiNotifier.notify('Važno obaveštenje!');

console.log('\nSamo email i SMS:');
const emailSmsNotifier = new Notifier([new EmailSender(), new SMSSender()]);
emailSmsNotifier.notify('Manje važno obaveštenje');
