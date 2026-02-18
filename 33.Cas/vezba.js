// ============================================
// 33. ČAS - VEŽBE ZA RAZMIŠLJANJE
// Singleton, Factory, Service Pattern
// ============================================

// ============================================
// DEO 1: PITANJA ZA DISKUSIJU (usmeno, bez koda)
// Razgovaraj sa studentima, neka objasne ZAŠTO
// ============================================

// PITANJE 1: Zamisli da praviš igru.
// Imaš Game klasu koja čuva score, level i vreme.
// Šta bi se desilo ako slučajno napraviš 2 instance Game klase?
// Da li bi oba dela ekrana videla isti score?
// >> Koji pattern rešava ovaj problem?

// PITANJE 2: Praviš online prodavnicu.
// Kupac bira način plaćanja: kartica, PayPal, kripto.
// Svaki način ima drugačiju logiku (različiti API, različiti podaci).
// Gde staviš tu logiku? Razbacanu po kodu ili na jednom mestu?
// >> Koji pattern rešava ovaj problem?

// PITANJE 3: Imaš klasu Animal sa name i sound.
// Ali praviš aplikaciju gde korisnik bira životinju iz dropdown-a.
// Na osnovu izbora (dog, cat, bird), treba kreirati pravi objekat.
// Da li stavljaš if/else u svaku komponentu koja kreira životinju?
// >> Koji pattern rešava ovaj problem?

// PITANJE 4: Praviš blog.
// Imaš PostService koji učitava, kreira i briše postove.
// Zašto je bolje da Post klasa NE zna za fetch?
// Zašto Post samo čuva podatke, a PostService obavlja operacije?

// PITANJE 5: Kolega kaže: "Svaku klasu ću napraviti kao Singleton!"
// UserService - Singleton. ProductService - Singleton. Order - Singleton.
// Zašto je Order kao Singleton loša ideja? Koliko porudžbina možeš imati?

// ============================================
// DEO 2: PREPOZNAJ PATTERN (koji pattern je primenjen?)
// ============================================

// PRIMER A: Koji je ovo pattern?
class DatabaseConnection {
  static instance;

  static getConnection() {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }
}
// ODGOVOR: _______________
// ZAŠTO: _________________

// ---

// PRIMER B: Koji je ovo pattern?
class ShapeFactory {
  static create(type, params) {
    switch (type) {
      case "circle":
        return { type: "circle", radius: params.radius, area: Math.PI * params.radius ** 2 };
      case "rectangle":
        return { type: "rectangle", width: params.width, height: params.height, area: params.width * params.height };
      case "triangle":
        return { type: "triangle", base: params.base, height: params.height, area: (params.base * params.height) / 2 };
      default:
        throw new Error(`Nepoznat oblik: ${type}`);
    }
  }
}
// ODGOVOR: _______________
// ZAŠTO: _________________

// ---

// PRIMER C: Koji je ovo pattern?
class TaskService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async getAll() {
    const res = await fetch(`${this.apiUrl}/tasks`);
    return res.json();
  }

  async create(title) {
    const res = await fetch(`${this.apiUrl}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, done: false }),
    });
    return res.json();
  }

  async markDone(id) {
    const res = await fetch(`${this.apiUrl}/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: true }),
    });
    return res.json();
  }
}
// ODGOVOR: _______________
// ZAŠTO: _________________

// ============================================
// DEO 3: PRONAĐI PROBLEM (šta je loše i kako popraviti?)
// ============================================

// PROBLEM 1: Šta je loše u ovom kodu?
// Kako bi ga refaktorisao?

class App1 {
  handleLogin(username) {
    const log1 = { logs: [] };
    log1.logs.push(`Korisnik ${username} se ulogovao`);
    console.log(log1.logs);
  }

  handleError(error) {
    const log2 = { logs: [] };
    log2.logs.push(`Greška: ${error}`);
    console.log(log2.logs);
  }

  handlePurchase(item) {
    const log3 = { logs: [] };
    log3.logs.push(`Kupovina: ${item}`);
    console.log(log3.logs);
  }
}
// PROBLEM: _______________
// REŠENJE (koji pattern): _______________

// ---

// PROBLEM 2: Šta je loše u ovom kodu?

function kreirajDokument(tip, naslov, sadrzaj) {
  if (tip === "pdf") {
    return { tip: "pdf", naslov, sadrzaj, format: "A4", kompresija: true };
  } else if (tip === "word") {
    return { tip: "word", naslov, sadrzaj, font: "Arial", velicina: 12 };
  } else if (tip === "excel") {
    return { tip: "excel", naslov, sadrzaj, kolone: 10, redovi: 100 };
  }
}

// Na 5 različitih mesta u kodu se poziva ova ista logika
function exportReport(tip, podaci) {
  if (tip === "pdf") {
    console.log("Export u PDF...");
    // pdf logika
  } else if (tip === "word") {
    console.log("Export u Word...");
    // word logika
  } else if (tip === "excel") {
    console.log("Export u Excel...");
    // excel logika
  }
}
// PROBLEM: _______________
// REŠENJE (koji pattern): _______________

// ---

// PROBLEM 3: Šta je loše u ovom kodu?

class KorisnikKontroler {
  async prikaziKorisnike() {
    const res = await fetch("https://api.example.com/users", {
      headers: { "Content-Type": "application/json", Authorization: "Bearer token123" },
    });
    if (!res.ok) throw new Error("Greška");
    const data = await res.json();
    // prikaži na ekranu...
  }

  async prikaziProfil(id) {
    const res = await fetch(`https://api.example.com/users/${id}`, {
      headers: { "Content-Type": "application/json", Authorization: "Bearer token123" },
    });
    if (!res.ok) throw new Error("Greška");
    const data = await res.json();
    // prikaži na ekranu...
  }

  async obrisiKorisnika(id) {
    const res = await fetch(`https://api.example.com/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: "Bearer token123" },
    });
    if (!res.ok) throw new Error("Greška");
    // prikaži potvrdu...
  }
}
// PROBLEM: _______________
// REŠENJE (koji pattern): _______________

// ============================================
// DEO 4: NAPIŠI KOD (praktične vežbe)
// ============================================

// ============================================
// VEŽBA 1: Singleton - GameState
// ============================================
// Napravi klasu GameState (Singleton) koja čuva stanje igre:
// - score (broj) - počinje od 0
// - level (broj) - počinje od 1
// - lives (broj) - počinje od 3
//
// Metode:
// - static getInstance() - vraća jedinu instancu
// - addScore(points) - dodaje poene
// - nextLevel() - povećava level za 1
// - loseLife() - smanjuje živote za 1
// - isGameOver() - vraća true ako su životi 0
// - reset() - vraća sve na početne vrednosti
// - getStatus() - vraća string: "Level: X | Score: Y | Lives: Z"

class GameState {
  // TVOJ KOD OVDE
}

// Testiraj:
// const game1 = GameState.getInstance();
// const game2 = GameState.getInstance();
// console.log(game1 === game2); // true
//
// game1.addScore(100);
// game1.nextLevel();
// console.log(game2.getStatus()); // "Level: 2 | Score: 100 | Lives: 3"
//
// game2.loseLife();
// game2.loseLife();
// game2.loseLife();
// console.log(game1.isGameOver()); // true
//
// game1.reset();
// console.log(game2.getStatus()); // "Level: 1 | Score: 0 | Lives: 3"

// ============================================
// VEŽBA 2: Factory - Zaposleni
// ============================================
// Napravi sistem za kreiranje zaposlenih u firmi.
//
// Bazna klasa Employee:
// - constructor(name, baseSalary)
// - getBonus() - vraća 0 (override u potklasama)
// - getTotalSalary() - baseSalary + getBonus()
// - describe() - vraća string: "[ROLA] Ime - Plata: X + Bonus: Y = Z RSD"
//
// Potklase:
// - Developer: bonus = 20% plate, rola = "DEV"
// - Designer: bonus = 15% plate, rola = "DESIGN"
// - Manager: bonus = 30% plate, rola = "MGR"
// - Intern: bonus = 0, rola = "INTERN"
//
// EmployeeFactory:
// - static create(role, name, baseSalary) - kreira odgovarajućeg zaposlenog

class Employee {
  // TVOJ KOD OVDE
}

class Developer extends Employee {
  // TVOJ KOD OVDE
}

class Designer extends Employee {
  // TVOJ KOD OVDE
}

class Manager extends Employee {
  // TVOJ KOD OVDE
}

class Intern extends Employee {
  // TVOJ KOD OVDE
}

class EmployeeFactory {
  // TVOJ KOD OVDE
}

// Testiraj:
// const team = [
//   EmployeeFactory.create("dev", "Marko", 100000),
//   EmployeeFactory.create("dev", "Ana", 120000),
//   EmployeeFactory.create("design", "Jovana", 90000),
//   EmployeeFactory.create("mgr", "Petar", 150000),
//   EmployeeFactory.create("intern", "Stefan", 40000),
// ];
//
// team.forEach((e) => console.log(e.describe()));
// // [DEV] Marko - Plata: 100000 + Bonus: 20000 = 120000 RSD
// // [DEV] Ana - Plata: 120000 + Bonus: 24000 = 144000 RSD
// // [DESIGN] Jovana - Plata: 90000 + Bonus: 13500 = 103500 RSD
// // [MGR] Petar - Plata: 150000 + Bonus: 45000 = 195000 RSD
// // [INTERN] Stefan - Plata: 40000 + Bonus: 0 = 40000 RSD
//
// const totalCost = team.reduce((sum, e) => sum + e.getTotalSalary(), 0);
// console.log(`Ukupan trošak plate: ${totalCost} RSD`);

// ============================================
// VEŽBA 3: Service - TodoService
// ============================================
// Napravi TodoService klasu koja upravlja todo stavkama.
// API: https://jsonplaceholder.typicode.com
//
// TodoService:
// - constructor() - postavi apiUrl, this.todos = []
// - async loadTodos(limit = 10) - GET /todos?_limit=X, sačuvaj u this.todos
// - async addTodo(title) - POST /todos, dodaj u this.todos
// - async toggleTodo(id) - PATCH /todos/:id, promeni completed status
// - async removeTodo(id) - DELETE /todos/:id, ukloni iz this.todos
// - getActive() - sinhrona, vraća nezavršene
// - getCompleted() - sinhrona, vraća završene
// - getSummary() - vraća: "Ukupno: X | Aktivni: Y | Završeni: Z"
//
// Sve async metode imaju try/catch i proveravaju response.ok!

class TodoService {
  // TVOJ KOD OVDE
}

// Testiraj:
// (async () => {
//   const ts = new TodoService();
//   await ts.loadTodos(5);
//   console.log(ts.getSummary());
//
//   const novi = await ts.addTodo("Naučiti design patterne");
//   console.log("Dodat:", novi.title);
//   console.log(ts.getSummary());
//
//   await ts.toggleTodo(1);
//   console.log(ts.getSummary());
//
//   await ts.removeTodo(1);
//   console.log(ts.getSummary());
// })();

// ============================================
// VEŽBA 4: Kombinacija - Logger + Factory + Service
// ============================================
// Napravi mini-sistem za e-commerce:
//
// 1. AppLogger (Singleton):
//    - static getInstance()
//    - log(message), error(message)
//    - getHistory() - vraća sve logove
//
// 2. Product klasa:
//    - constructor(name, price, category)
//    - describe() - "Naziv (kategorija) - Cena RSD"
//
// 3. ProductFactory:
//    - static create(category, name, price)
//    - Kategorije: "electronics" (dodaj garanciju = 24 meseca),
//      "clothing" (dodaj size = "M"), "food" (dodaj expiresIn = "7 dana")
//    - Factory LOGUJE svako kreiranje putem AppLogger-a
//
// 4. ProductService:
//    - constructor(apiUrl) - koristi AppLogger za logovanje
//    - async getAll() - GET /posts?_limit=5, transformiši u proizvode
//    - async create(product) - POST /posts, loguj kreiranje
//    - getProductCount() - vraća broj lokalno sačuvanih proizvoda
//
// Na kraju: prikaži sve logove iz AppLogger-a da se vidi celokupna aktivnost

class AppLogger {
  // TVOJ KOD OVDE
}

class Product {
  // TVOJ KOD OVDE
}

class ProductFactory {
  // TVOJ KOD OVDE
}

// class ProductService {
//   // TVOJ KOD OVDE
// }

// Testiraj:
// (async () => {
//   const p1 = ProductFactory.create("electronics", "Laptop", 120000);
//   const p2 = ProductFactory.create("clothing", "Majica", 2500);
//   const p3 = ProductFactory.create("food", "Čokolada", 350);
//
//   console.log(p1.describe()); // "Laptop (electronics) - 120000 RSD"
//   console.log(p1.garancija); // 24
//
//   console.log(p2.describe()); // "Majica (clothing) - 2500 RSD"
//   console.log(p2.size);      // "M"
//
//   console.log(p3.describe()); // "Čokolada (food) - 350 RSD"
//   console.log(p3.expiresIn); // "7 dana"
//
//   // Svi logovi na jednom mestu:
//   console.log("\n--- Svi logovi ---");
//   AppLogger.getInstance().getHistory().forEach((l) => console.log(l));
// })();

// ============================================
// DEO 5: BONUS - PITANJA ZA NAPREDNE STUDENTE
// ============================================

// PITANJE A: Singleton i testiranje
// Kako bi testirao klasu koja koristi Singleton Logger?
// Problem: Logger.getInstance() uvek vraća isti objekat.
// Kako bi u testu "resetovao" logger da počneš sa čistim logom?
// Hint: Razmisli o static reset() metodi.

// PITANJE B: Factory sa konfiguracijom
// Tvoj NotificationFactory trenutno ima hardkodirane tipove (email, sms, push).
// Šta ako klijent sutra kaže: "Dodaj Viber i Telegram notifikacije"?
// Kako bi dizajnirao Factory tako da NE moraš da menjaš switch/case
// svaki put kad se doda novi tip?
// Hint: Razmisli o registraciji tipova: factory.register("viber", ViberNotification)

// PITANJE C: Service i zavisnosti (Dependency Injection)
// Tvoj ProductService ima hardkodiran URL:
//   this.apiUrl = "https://api.example.com"
// Šta ako hoćeš da u testu koristiš drugi URL?
// Šta ako hoćeš da u development-u koristiš "http://localhost:3000"?
// Kako bi dizajnirao Service da bude fleksibilan?
// Hint: Razmisli o tome da se URL prosleđuje kroz konstruktor.
