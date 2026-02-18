// ============================================
// 33. ČAS - REŠENJA
// Singleton, Factory, Service Pattern
// ============================================

// ============================================
// ODGOVORI NA DEO 2: PREPOZNAJ PATTERN
// ============================================

// PRIMER A: Singleton
// Zašto: static instance + getInstance() koji kreira samo jednu instancu

// PRIMER B: Factory
// Zašto: create() metoda koja na osnovu tipa kreira različite objekte

// PRIMER C: Service
// Zašto: klasa koja enkapsulira poslovnu logiku (CRUD operacije) nad jednim resursom

// ============================================
// ODGOVORI NA DEO 3: PRONAĐI PROBLEM
// ============================================

// PROBLEM 1: Svaka metoda kreira NOVI log objekat.
//   Logovi se gube - ne možeš da vidiš sve na jednom mestu.
//   REŠENJE: Singleton Logger

// PROBLEM 2: Ista if/else logika na više mesta.
//   Kad dodaš novi tip dokumenta, moraš menjati SVE funkcije.
//   REŠENJE: Factory pattern - jedna klasa po tipu + Factory za kreiranje

// PROBLEM 3: URL, headeri i error handling se ponavljaju u svakoj metodi.
//   Ako se URL ili token promeni, menjaš na 3+ mesta.
//   REŠENJE: Service pattern - centralizuj API logiku u jednu metodu

// ============================================
// REŠENJE 1: Singleton - GameState
// ============================================

console.log("=== REŠENJE 1: GameState (Singleton) ===\n");

class GameState {
  static instance;

  constructor() {
    this.score = 0;
    this.level = 1;
    this.lives = 3;
  }

  static getInstance() {
    if (!GameState.instance) {
      GameState.instance = new GameState();
    }
    return GameState.instance;
  }

  addScore(points) {
    this.score += points;
  }

  nextLevel() {
    this.level++;
  }

  loseLife() {
    if (this.lives > 0) {
      this.lives--;
    }
  }

  isGameOver() {
    return this.lives === 0;
  }

  reset() {
    this.score = 0;
    this.level = 1;
    this.lives = 3;
  }

  getStatus() {
    return `Level: ${this.level} | Score: ${this.score} | Lives: ${this.lives}`;
  }
}

const game1 = GameState.getInstance();
const game2 = GameState.getInstance();
console.log(`Isti objekat? ${game1 === game2}`); // true

game1.addScore(100);
game1.nextLevel();
console.log(game2.getStatus()); // "Level: 2 | Score: 100 | Lives: 3"

game2.loseLife();
game2.loseLife();
game2.loseLife();
console.log(`Game over? ${game1.isGameOver()}`); // true

game1.reset();
console.log(game2.getStatus()); // "Level: 1 | Score: 0 | Lives: 3"

// ============================================
// REŠENJE 2: Factory - Zaposleni
// ============================================

console.log("\n=== REŠENJE 2: EmployeeFactory ===\n");

class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
    this.role = "UNKNOWN";
  }

  getBonus() {
    return 0;
  }

  getTotalSalary() {
    return this.baseSalary + this.getBonus();
  }

  describe() {
    return `[${this.role}] ${this.name} - Plata: ${this.baseSalary} + Bonus: ${this.getBonus()} = ${this.getTotalSalary()} RSD`;
  }
}

class Developer extends Employee {
  constructor(name, baseSalary) {
    super(name, baseSalary);
    this.role = "DEV";
  }

  getBonus() {
    return this.baseSalary * 0.2;
  }
}

class Designer extends Employee {
  constructor(name, baseSalary) {
    super(name, baseSalary);
    this.role = "DESIGN";
  }

  getBonus() {
    return this.baseSalary * 0.15;
  }
}

class Manager extends Employee {
  constructor(name, baseSalary) {
    super(name, baseSalary);
    this.role = "MGR";
  }

  getBonus() {
    return this.baseSalary * 0.3;
  }
}

class Intern extends Employee {
  constructor(name, baseSalary) {
    super(name, baseSalary);
    this.role = "INTERN";
  }

  getBonus() {
    return 0;
  }
}

class EmployeeFactory {
  static create(role, name, baseSalary) {
    switch (role) {
      case "dev":
        return new Developer(name, baseSalary);
      case "design":
        return new Designer(name, baseSalary);
      case "mgr":
        return new Manager(name, baseSalary);
      case "intern":
        return new Intern(name, baseSalary);
      default:
        throw new Error(`Nepoznata rola: "${role}"`);
    }
  }
}

const team = [
  EmployeeFactory.create("dev", "Marko", 100000),
  EmployeeFactory.create("dev", "Ana", 120000),
  EmployeeFactory.create("design", "Jovana", 90000),
  EmployeeFactory.create("mgr", "Petar", 150000),
  EmployeeFactory.create("intern", "Stefan", 40000),
];

team.forEach((e) => console.log(e.describe()));

const totalCost = team.reduce((sum, e) => sum + e.getTotalSalary(), 0);
console.log(`\nUkupan trošak plate: ${totalCost} RSD`);

// ============================================
// REŠENJE 3: Service - TodoService
// ============================================

(async () => {
  console.log("\n=== REŠENJE 3: TodoService ===\n");

  class TodoService {
    constructor() {
      this.apiUrl = "https://jsonplaceholder.typicode.com";
      this.todos = [];
    }

    async loadTodos(limit = 10) {
      try {
        const response = await fetch(`${this.apiUrl}/todos?_limit=${limit}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        this.todos = await response.json();
        return this.todos;
      } catch (error) {
        console.error("Load greška:", error.message);
        return [];
      }
    }

    async addTodo(title) {
      try {
        const response = await fetch(`${this.apiUrl}/todos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, completed: false, userId: 1 }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const newTodo = await response.json();
        this.todos.push(newTodo);
        return newTodo;
      } catch (error) {
        console.error("Add greška:", error.message);
        return null;
      }
    }

    async toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) {
        console.error(`Todo ${id} ne postoji`);
        return null;
      }

      try {
        const response = await fetch(`${this.apiUrl}/todos/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !todo.completed }),
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const updated = await response.json();
        todo.completed = updated.completed;
        return todo;
      } catch (error) {
        console.error("Toggle greška:", error.message);
        return null;
      }
    }

    async removeTodo(id) {
      try {
        const response = await fetch(`${this.apiUrl}/todos/${id}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        this.todos = this.todos.filter((t) => t.id !== id);
        return true;
      } catch (error) {
        console.error("Remove greška:", error.message);
        return false;
      }
    }

    getActive() {
      return this.todos.filter((t) => !t.completed);
    }

    getCompleted() {
      return this.todos.filter((t) => t.completed);
    }

    getSummary() {
      const total = this.todos.length;
      const completed = this.getCompleted().length;
      const active = this.getActive().length;
      return `Ukupno: ${total} | Aktivni: ${active} | Završeni: ${completed}`;
    }
  }

  const ts = new TodoService();
  await ts.loadTodos(5);
  console.log(ts.getSummary());

  const novi = await ts.addTodo("Naučiti design patterne");
  console.log(`Dodat: ${novi.title}`);
  console.log(ts.getSummary());

  await ts.toggleTodo(1);
  console.log(`Nakon toggle: ${ts.getSummary()}`);

  await ts.removeTodo(1);
  console.log(`Nakon remove: ${ts.getSummary()}`);

  // ============================================
  // REŠENJE 4: Kombinacija - Logger + Factory + Service
  // ============================================

  console.log("\n=== REŠENJE 4: Kombinacija patterna ===\n");

  class AppLogger {
    static instance;

    constructor() {
      this.logs = [];
    }

    static getInstance() {
      if (!AppLogger.instance) {
        AppLogger.instance = new AppLogger();
      }
      return AppLogger.instance;
    }

    log(message) {
      const entry = `[LOG] ${new Date().toISOString().substring(11, 19)} ${message}`;
      this.logs.push(entry);
      console.log(`  ${entry}`);
    }

    error(message) {
      const entry = `[ERR] ${new Date().toISOString().substring(11, 19)} ${message}`;
      this.logs.push(entry);
      console.log(`  ${entry}`);
    }

    getHistory() {
      return [...this.logs];
    }
  }

  class Product {
    constructor(name, price, category) {
      this.name = name;
      this.price = price;
      this.category = category;
    }

    describe() {
      return `${this.name} (${this.category}) - ${this.price} RSD`;
    }
  }

  class ProductFactory {
    static create(category, name, price) {
      const logger = AppLogger.getInstance();
      let product;

      switch (category) {
        case "electronics":
          product = new Product(name, price, category);
          product.garancija = 24; // meseci
          break;
        case "clothing":
          product = new Product(name, price, category);
          product.size = "M";
          break;
        case "food":
          product = new Product(name, price, category);
          product.expiresIn = "7 dana";
          break;
        default:
          throw new Error(`Nepoznata kategorija: "${category}"`);
      }

      logger.log(`Factory: kreiran proizvod "${name}" [${category}]`);
      return product;
    }
  }

  class ProductService {
    constructor(apiUrl) {
      this.apiUrl = apiUrl;
      this.products = [];
      this.logger = AppLogger.getInstance();
    }

    async getAll() {
      try {
        this.logger.log("Service: učitavam proizvode...");
        const response = await fetch(`${this.apiUrl}/posts?_limit=5`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const raw = await response.json();
        this.products = raw.map((item) => new Product(item.title, Math.floor(Math.random() * 10000), "electronics"));

        this.logger.log(`Service: učitano ${this.products.length} proizvoda`);
        return this.products;
      } catch (error) {
        this.logger.error(`Service: ${error.message}`);
        return [];
      }
    }

    async create(product) {
      try {
        this.logger.log(`Service: kreiram "${product.name}"...`);
        const response = await fetch(`${this.apiUrl}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: product.name, body: product.describe(), userId: 1 }),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        product.id = result.id;
        this.products.push(product);
        this.logger.log(`Service: proizvod "${product.name}" sačuvan (id: ${result.id})`);
        return product;
      } catch (error) {
        this.logger.error(`Service: greška pri kreiranju - ${error.message}`);
        return null;
      }
    }

    getProductCount() {
      return this.products.length;
    }
  }

  // Demonstracija
  const p1 = ProductFactory.create("electronics", "Laptop", 120000);
  const p2 = ProductFactory.create("clothing", "Majica", 2500);
  const p3 = ProductFactory.create("food", "Čokolada", 350);

  console.log(`\n${p1.describe()} | Garancija: ${p1.garancija} meseci`);
  console.log(`${p2.describe()} | Veličina: ${p2.size}`);
  console.log(`${p3.describe()} | Rok: ${p3.expiresIn}`);

  console.log("");
  const productService = new ProductService("https://jsonplaceholder.typicode.com");
  await productService.getAll();

  await productService.create(p1);

  console.log(`\nBroj proizvoda u servisu: ${productService.getProductCount()}`);

  // Svi logovi na jednom mestu - snaga Singletona!
  console.log("\n--- KOMPLETNA ISTORIJA LOGOVA ---");
  AppLogger.getInstance()
    .getHistory()
    .forEach((entry) => console.log(`  ${entry}`));

  console.log("\n=== KRAJ REŠENJA ===");
})();
