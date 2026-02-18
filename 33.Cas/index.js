// ============================================
// 33. ČAS - PROFESIONALNO RAZMIŠLJANJE: OBRASCI
// Singleton, Factory, Service Pattern
// ============================================

// ============================================
// PRIMER 1: Singleton Pattern - Logger
// ============================================

console.log("=== PRIMER 1: Singleton - Logger ===\n");

class Logger {
  static instance;

  constructor() {
    this.logs = [];
    this.startTime = Date.now();
    console.log("  >> Logger konstruktor pozvan!");
  }

  static getInstance() {
    if (!Logger.instance) {
      console.log("  >> Kreiram NOVU instancu Loggera...");
      Logger.instance = new Logger();
    } else {
      console.log("  >> Vraćam POSTOJEĆU instancu Loggera.");
    }
    return Logger.instance;
  }

  log(message) {
    const elapsed = Date.now() - this.startTime;
    const entry = `[${elapsed}ms] ${message}`;
    this.logs.push(entry);
    console.log(`  LOG: ${entry}`);
  }

  warn(message) {
    const elapsed = Date.now() - this.startTime;
    const entry = `[${elapsed}ms] ⚠ ${message}`;
    this.logs.push(entry);
    console.log(`  WARN: ${entry}`);
  }

  error(message) {
    const elapsed = Date.now() - this.startTime;
    const entry = `[${elapsed}ms] ✖ ${message}`;
    this.logs.push(entry);
    console.log(`  ERROR: ${entry}`);
  }

  getHistory() {
    return [...this.logs];
  }

  clear() {
    this.logs = [];
  }
}

// Demonstracija: koliko puta se poziva konstruktor?
const logger1 = Logger.getInstance(); // Kreira novu
const logger2 = Logger.getInstance(); // Vraća postojeću
const logger3 = Logger.getInstance(); // Vraća postojeću

console.log(`\nDa li su isti objekat? ${logger1 === logger2}`); // true
console.log(`Da li su isti objekat? ${logger2 === logger3}`); // true

// Svi pišu u ISTI log
logger1.log("Aplikacija pokrenuta");
logger2.log("Korisnik se ulogovao");
logger3.error("Nešto je pošlo po zlu");

console.log(`\nUkupno logova: ${logger1.getHistory().length}`); // 3
console.log("Istorija:", logger1.getHistory());

// ============================================
// PRIMER 2: Singleton - Konfiguracija
// ============================================

console.log("\n=== PRIMER 2: Singleton - Config ===\n");

class AppConfig {
  static instance;

  constructor() {
    // Podrazumevane vrednosti
    this.settings = {
      theme: "light",
      language: "sr",
      apiUrl: "https://jsonplaceholder.typicode.com",
      itemsPerPage: 10,
    };
  }

  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  get(key) {
    return this.settings[key];
  }

  set(key, value) {
    const old = this.settings[key];
    this.settings[key] = value;
    console.log(`  Config: ${key} promenjeno: ${old} → ${value}`);
  }

  getAll() {
    return { ...this.settings };
  }
}

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log("Tema:", config1.get("theme")); // "light"

// Promena na jednom mestu - vidljiva svuda
config1.set("theme", "dark");
console.log("config1 tema:", config1.get("theme")); // "dark"
console.log("config2 tema:", config2.get("theme")); // "dark" - ISTA!

config2.set("language", "en");
console.log("config1 jezik:", config1.get("language")); // "en"

// ============================================
// PRIMER 3: Factory Pattern - Notifikacije
// ============================================

console.log("\n=== PRIMER 3: Factory - Notifikacije ===\n");

class Notification {
  constructor(message) {
    this.message = message;
    this.createdAt = new Date().toISOString();
  }

  send() {
    throw new Error("send() mora biti implementiran u potklasi!");
  }

  toString() {
    return `[${this.type}] ${this.message}`;
  }
}

class EmailNotification extends Notification {
  constructor(message, email) {
    super(message);
    this.email = email;
    this.type = "EMAIL";
  }

  send() {
    console.log(`  Šaljem EMAIL na ${this.email}: "${this.message}"`);
    return true;
  }
}

class SmsNotification extends Notification {
  constructor(message, phone) {
    super(message);
    this.phone = phone;
    this.type = "SMS";
  }

  send() {
    console.log(`  Šaljem SMS na ${this.phone}: "${this.message}"`);
    return true;
  }
}

class PushNotification extends Notification {
  constructor(message) {
    super(message);
    this.type = "PUSH";
  }

  send() {
    console.log(`  Šaljem PUSH notifikaciju: "${this.message}"`);
    return true;
  }
}

// FACTORY
class NotificationFactory {
  static create(type, message, recipient = null) {
    switch (type) {
      case "email":
        if (!recipient) throw new Error("Email adresa je obavezna!");
        return new EmailNotification(message, recipient);
      case "sms":
        if (!recipient) throw new Error("Broj telefona je obavezan!");
        return new SmsNotification(message, recipient);
      case "push":
        return new PushNotification(message);
      default:
        throw new Error(`Nepoznat tip notifikacije: "${type}"`);
    }
  }
}

// Korišćenje - jednostavno i čisto
const n1 = NotificationFactory.create("email", "Dobrodošli!", "user@test.com");
const n2 = NotificationFactory.create("sms", "Vaš kod je 1234", "+381601234567");
const n3 = NotificationFactory.create("push", "Imate novu poruku");

n1.send();
n2.send();
n3.send();

console.log("\nSve notifikacije:");
[n1, n2, n3].forEach((n) => console.log(`  ${n.toString()}`));

// Demonstracija: šta ako dodamo novi tip?
// Samo dodamo novu klasu i JEDAN case u Factory - gotovo!

// ============================================
// PRIMER 4: Factory Pattern - Korisnici
// ============================================

console.log("\n=== PRIMER 4: Factory - Tipovi korisnika ===\n");

class BaseUser {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.createdAt = new Date().toISOString();
  }

  getPermissions() {
    return [];
  }

  describe() {
    const perms = this.getPermissions().join(", ");
    console.log(`  ${this.role}: ${this.name} (${this.email})`);
    console.log(`    Dozvole: ${perms || "nema"}`);
  }
}

class GuestUser extends BaseUser {
  constructor(name, email) {
    super(name, email);
    this.role = "Gost";
  }

  getPermissions() {
    return ["čitanje"];
  }
}

class RegularUser extends BaseUser {
  constructor(name, email) {
    super(name, email);
    this.role = "Korisnik";
  }

  getPermissions() {
    return ["čitanje", "pisanje", "komentarisanje"];
  }
}

class AdminUser extends BaseUser {
  constructor(name, email) {
    super(name, email);
    this.role = "Admin";
  }

  getPermissions() {
    return ["čitanje", "pisanje", "komentarisanje", "brisanje", "upravljanje korisnicima"];
  }
}

class UserFactory {
  static create(role, name, email) {
    switch (role) {
      case "guest":
        return new GuestUser(name, email);
      case "user":
        return new RegularUser(name, email);
      case "admin":
        return new AdminUser(name, email);
      default:
        throw new Error(`Nepoznata rola: "${role}"`);
    }
  }
}

const users = [
  UserFactory.create("guest", "Petar", "petar@test.com"),
  UserFactory.create("user", "Ana", "ana@test.com"),
  UserFactory.create("admin", "Marko", "marko@test.com"),
];

users.forEach((u) => u.describe());

// ============================================
// PRIMER 5: Service Pattern
// ============================================

console.log("\n=== PRIMER 5: Service Pattern ===\n");

// Service enkapsulira svu poslovnu logiku za jedan domen
class ProductService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
    this.cache = [];
  }

  async getAll() {
    try {
      // Ako imamo keš, koristi ga
      if (this.cache.length > 0) {
        console.log("  Vraćam podatke iz keša");
        return this.cache;
      }

      console.log("  Učitavam proizvode sa servera...");
      const response = await fetch(`${this.apiUrl}/posts?_limit=5`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      // Transformišemo API podatke u naš format
      const raw = await response.json();
      this.cache = raw.map((item) => ({
        id: item.id,
        name: item.title,
        description: item.body,
      }));

      return this.cache;
    } catch (error) {
      console.error("  Greška:", error.message);
      return [];
    }
  }

  async getById(id) {
    // Prvo probaj iz keša
    const cached = this.cache.find((p) => p.id === id);
    if (cached) {
      console.log(`  Proizvod #${id} pronađen u kešu`);
      return cached;
    }

    try {
      console.log(`  Učitavam proizvod #${id} sa servera...`);
      const response = await fetch(`${this.apiUrl}/posts/${id}`);
      if (!response.ok) throw new Error("Nije pronađen");

      const raw = await response.json();
      return {
        id: raw.id,
        name: raw.title,
        description: raw.body,
      };
    } catch (error) {
      console.error("  Greška:", error.message);
      return null;
    }
  }

  async create(name, description) {
    try {
      console.log(`  Kreiram proizvod: "${name}"...`);
      const response = await fetch(`${this.apiUrl}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: name, body: description, userId: 1 }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const raw = await response.json();
      const product = { id: raw.id, name: raw.title, description: raw.body };
      this.cache.push(product);
      return product;
    } catch (error) {
      console.error("  Greška:", error.message);
      return null;
    }
  }

  clearCache() {
    this.cache = [];
    console.log("  Keš očišćen");
  }
}

// Demonstracija
(async () => {
  const productService = new ProductService(
    "https://jsonplaceholder.typicode.com"
  );

  // Učitaj sve
  const products = await productService.getAll();
  console.log(`  Učitano ${products.length} proizvoda`);
  products.slice(0, 3).forEach((p) => {
    console.log(`    #${p.id}: ${p.name.substring(0, 40)}...`);
  });

  // Drugi poziv koristi keš
  console.log("");
  await productService.getAll(); // "Vraćam podatke iz keša"

  // Učitaj jedan
  console.log("");
  const product = await productService.getById(1);
  console.log(`  Pronađen: ${product.name.substring(0, 40)}...`);

  // Kreiraj novi
  console.log("");
  const newProduct = await productService.create("Laptop", "Moćan laptop za programiranje");
  console.log(`  Kreiran: #${newProduct.id} - ${newProduct.name}`);

  // ============================================
  // PRIMER 6: Kombinacija patterna
  // ============================================

  console.log("\n=== PRIMER 6: Kombinacija - Singleton Logger + Service ===\n");

  // Logger (Singleton) se koristi unutar Service-a
  class OrderService {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
      this.logger = Logger.getInstance(); // Singleton!
    }

    async createOrder(items) {
      this.logger.log(`Kreiranje porudžbine sa ${items.length} stavki`);

      const total = items.reduce((sum, item) => sum + item.price, 0);

      try {
        const response = await fetch(`${this.apiUrl}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: "Order", body: JSON.stringify(items), userId: 1 }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const result = await response.json();
        this.logger.log(`Porudžbina kreirana: #${result.id}, total: ${total} RSD`);
        return { id: result.id, items, total };
      } catch (error) {
        this.logger.error(`Greška pri kreiranju porudžbine: ${error.message}`);
        return null;
      }
    }
  }

  const orderService = new OrderService("https://jsonplaceholder.typicode.com");

  await orderService.createOrder([
    { name: "Laptop", price: 120000 },
    { name: "Miš", price: 3000 },
    { name: "Tastatura", price: 5000 },
  ]);

  // Svi logovi (i od ranije i od OrderService-a) su na ISTOM mestu
  console.log("\nSvi logovi u aplikaciji:");
  Logger.getInstance()
    .getHistory()
    .forEach((entry) => console.log(`  ${entry}`));

  console.log("\n=== KRAJ PRIMERA ===");
})();
