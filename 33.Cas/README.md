# 33. Čas - Profesionalno razmišljanje: Singleton, Factory, Service

---

## Sadržaj časa

- [Uvod: Zašto nam trebaju obrasci?](#uvod-zašto-nam-trebaju-obrasci)
- [Singleton pattern](#singleton-pattern)
- [Factory pattern](#factory-pattern)
- [Service pattern](#service-pattern)
- [Kako da razmišljaš kao programer](#kako-da-razmišljaš-kao-programer)
- [Vežbe za razmišljanje](#vežbe-za-razmišljanje)

---

# Uvod: Zašto nam trebaju obrasci?

## Problem

Zamislite da pravite aplikaciju. Imate klase, imate metode, sve radi. Ali šta kada:

- Imate **konfiguraciju** koja mora biti ista svuda u aplikaciji?
- Trebate da kreirate **različite tipove objekata** na osnovu nekog uslova?
- Imate **logiku koja se ponavlja** na 10 mesta u kodu?

Bez obrazaca (pattern-a), završite sa kodom koji je:
- **Teško čitljiv** - svako mesto ima svoju logiku
- **Teško promenljiv** - promena na jednom mestu zahteva promene na 10 mesta
- **Pun bagova** - jer ste zaboravili da izmenite jedno od 10 mesta

## Šta su Design Patterns?

Design patterns su **dokazana rešenja za česte probleme**. Nisu biblioteke, nisu frameworkovi - to su **načini razmišljanja** o tome kako organizovati kod.

```
Bez patterna:               Sa patternima:
┌─────────────────┐         ┌─────────────────┐
│ Sve pomešano    │         │ Jasna struktura │
│ Duplirani kod   │   →     │ Jedno mesto     │
│ Teško za menjati│         │ Lako se menja   │
└─────────────────┘         └─────────────────┘
```

---

# Singleton Pattern

## Problem koji rešava

Ponekad nam treba **tačno jedna instanca** neke klase u celoj aplikaciji.

Primeri:
- **Logger** - jedan logger za celu aplikaciju
- **Konfiguracija** - jedna konfiguracija, ista svuda
- **Konekcija ka bazi** - ne želimo 100 konekcija

## Razmisli pre nego što vidiš kod:

> Šta bi se desilo ako svaka komponenta u aplikaciji napravi sopstveni Logger?
> Svaka bi pisala u svoj fajl, sa svojim formatom, i ne bi mogao da pratiš ništa.

## Implementacija

```javascript
class Logger {
  // Statičko polje - pripada klasi, ne instanci
  static instance;

  constructor() {
    this.logs = [];
    this.startTime = Date.now();
  }

  // Ključna metoda - uvek vraća ISTU instancu
  static getInstance() {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  log(message) {
    const elapsed = Date.now() - this.startTime;
    const entry = `[${elapsed}ms] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getHistory() {
    return [...this.logs];
  }
}
```

## Kako radi?

```
Prvo pozivanje getInstance():
  Logger.instance = undefined  →  kreira new Logger()  →  vraća ga

Drugo pozivanje getInstance():
  Logger.instance = postoji!   →  NE kreira novi       →  vraća ISTI

Treće, četvrto... uvek isti objekat.
```

## Dokaz da radi

```javascript
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();

console.log(logger1 === logger2); // true - ISTI objekat!

logger1.log("Poruka iz logger1");
logger2.log("Poruka iz logger2");

// Obe poruke su u ISTOM nizu:
console.log(logger1.getHistory().length); // 2
console.log(logger2.getHistory().length); // 2 - isti niz!
```

## Ključno pitanje za razumevanje

> **Zašto ne koristimo samo globalni objekat?**
> `const logger = { logs: [], log(msg) { ... } }`
>
> Odgovor: Singleton daje **kontrolu**. Možeš dodati logiku u getInstance()
> (npr. logovanje prvog pristupa), možeš imati private polja, možeš
> naslediti klasu. Globalni objekat je "divlji" - svako može da ga menja.

---

# Factory Pattern

## Problem koji rešava

Kada trebaš da kreiraš **različite objekte na osnovu nekog uslova**, ali ne želiš da logika kreiranja bude razbacana po celom kodu.

## Razmisli pre nego što vidiš kod:

> Praviš sistem za notifikacije. Korisnik može da primi obaveštenje putem
> email-a, SMS-a ili push notifikacije. Kako bi organizovao kreiranje tih
> različitih notifikacija?

## Implementacija

```javascript
// Bazna klasa - zajednički interfejs
class Notification {
  constructor(message) {
    this.message = message;
    this.createdAt = new Date();
  }

  send() {
    throw new Error("Metoda send() mora biti implementirana!");
  }
}

// Konkretne klase
class EmailNotification extends Notification {
  constructor(message, emailAddress) {
    super(message);
    this.emailAddress = emailAddress;
    this.type = "email";
  }

  send() {
    console.log(`EMAIL na ${this.emailAddress}: ${this.message}`);
  }
}

class SmsNotification extends Notification {
  constructor(message, phoneNumber) {
    super(message);
    this.phoneNumber = phoneNumber;
    this.type = "sms";
  }

  send() {
    console.log(`SMS na ${this.phoneNumber}: ${this.message}`);
  }
}

class PushNotification extends Notification {
  constructor(message) {
    super(message);
    this.type = "push";
  }

  send() {
    console.log(`PUSH notifikacija: ${this.message}`);
  }
}

// FACTORY - jedno mesto za kreiranje
class NotificationFactory {
  static create(type, message, recipient) {
    switch (type) {
      case "email":
        return new EmailNotification(message, recipient);
      case "sms":
        return new SmsNotification(message, recipient);
      case "push":
        return new PushNotification(message);
      default:
        throw new Error(`Nepoznat tip notifikacije: ${type}`);
    }
  }
}
```

## Korišćenje

```javascript
// Bez factory-ja (LOŠE - logika svuda):
function posaljiObavestenje(tip, poruka, primalac) {
  if (tip === "email") {
    const n = new EmailNotification(poruka, primalac);
    n.send();
  } else if (tip === "sms") {
    const n = new SmsNotification(poruka, primalac);
    n.send();
  }
  // ... duplirano na 5 mesta u kodu
}

// Sa factory-jem (DOBRO - jedno mesto):
const notif = NotificationFactory.create("email", "Zdravo!", "user@mail.com");
notif.send();
```

## Zašto je ovo korisno?

```
Bez Factory-ja:                    Sa Factory-jem:

Mesto 1: if email... if sms...     Mesto 1: Factory.create(tip, ...)
Mesto 2: if email... if sms...     Mesto 2: Factory.create(tip, ...)
Mesto 3: if email... if sms...     Mesto 3: Factory.create(tip, ...)

Dodaš novi tip?                    Dodaš novi tip?
→ Menjaš na 3 mesta!              → Menjaš SAMO u Factory-ju!
```

---

# Service Pattern

## Problem koji rešava

Kada imaš **poslovnu logiku** (business logic) koja ne pripada nijednom konkretnom objektu, nego je **operacija nad podacima**.

## Razmisli:

> Ko treba da bude odgovoran za registraciju korisnika?
> - User klasa? Ali ona samo čuva podatke o korisniku.
> - Kontroler? Ali on samo prima zahteve.
> - **UserService** - on obavlja posao!

## Implementacija

```javascript
// Model - samo čuva podatke
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.id = null;
    this.createdAt = null;
  }
}

// Service - obavlja operacije
class UserService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async register(name, email) {
    // Validacija
    if (!name || !email) {
      throw new Error("Ime i email su obavezni");
    }
    if (!email.includes("@")) {
      throw new Error("Neispravan email format");
    }

    // Kreiranje
    const user = new User(name, email);

    // Čuvanje (API poziv)
    try {
      const response = await fetch(`${this.apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      if (!response.ok) throw new Error(`Greška: ${response.status}`);
      const saved = await response.json();
      user.id = saved.id;
      user.createdAt = new Date();
      return user;
    } catch (error) {
      console.error("Registracija neuspešna:", error.message);
      throw error;
    }
  }

  async getAll() {
    try {
      const response = await fetch(`${this.apiUrl}/users`);
      if (!response.ok) throw new Error(`Greška: ${response.status}`);
      return response.json();
    } catch (error) {
      console.error("Greška:", error.message);
      return [];
    }
  }

  async findById(id) {
    try {
      const response = await fetch(`${this.apiUrl}/users/${id}`);
      if (!response.ok) throw new Error("Korisnik nije pronađen");
      return response.json();
    } catch (error) {
      console.error("Greška:", error.message);
      return null;
    }
  }
}
```

## Prednosti Service pattern-a

| Bez Service-a | Sa Service-om |
|---|---|
| Logika razbacana po kodu | Logika na jednom mestu |
| Teško za testiranje | Lako se testira - mock-uješ Service |
| Duplirani fetch pozivi | Jedan fetch po operaciji |
| Mešanje odgovornosti | Jasna podela: Model čuva, Service radi |

---

# Kako da razmišljaš kao programer

## 1. Pitaj se: "Ko je odgovoran?"

Svaki deo koda treba da ima **jednu odgovornost**:

```
User klasa        → čuva podatke korisnika
UserService       → obavlja operacije (CRUD)
UserFactory       → kreira različite tipove korisnika
Logger.getInstance → daje jedini logger
```

## 2. Pitaj se: "Šta ako se nešto promeni?"

Pre nego što napišeš kod, zamisli buduće promene:

- Šta ako dodam novi tip korisnika? → Factory
- Šta ako mi treba isti logger svuda? → Singleton
- Šta ako se API URL promeni? → Service sa konfiguracijom

## 3. Pitaj se: "Da li se ovo ponavlja?"

Ako vidiš sličan kod na 2+ mesta, nešto nije u redu:

```javascript
// LOŠE - isto na 3 mesta
const res1 = await fetch(url, { headers: { "Content-Type": "application/json" } });
const res2 = await fetch(url2, { headers: { "Content-Type": "application/json" } });
const res3 = await fetch(url3, { headers: { "Content-Type": "application/json" } });

// DOBRO - centralizovano u Service
class ApiService {
  async request(endpoint) {
    return fetch(`${this.baseUrl}${endpoint}`, {
      headers: { "Content-Type": "application/json" }
    });
  }
}
```

## 4. Pitaj se: "Koliko instanci mi zaista treba?"

- Logger → jedna (Singleton)
- Config → jedna (Singleton)
- User → mnogo (obična klasa)
- Notifikacija → mnogo, ali raznih tipova (Factory)

---

# Vežbe za razmišljanje

## Nivo 1: Prepoznavanje obrazaca

### Pitanje 1: Koji obrazac?
Imaš aplikaciju sa bazom podataka. Konekcija ka bazi je skupa (traje 2 sekunde). Ne želiš da svaka klasa pravi svoju konekciju. **Koji obrazac koristiš i zašto?**

### Pitanje 2: Koji obrazac?
Imaš online prodavnicu. Kupac može platiti kreditnom karticom, PayPal-om ili kriptovalutom. Svaki metod plaćanja ima drugačiju logiku. **Koji obrazac koristiš i zašto?**

### Pitanje 3: Koji obrazac?
Imaš aplikaciju i trebaš da obavljaš operacije nad proizvodima - učitavanje, kreiranje, brisanje, pretraga. **Koji obrazac koristiš i zašto?**

---

## Nivo 2: Pronađi problem u kodu

### Pitanje 4: Šta je loše?
```javascript
class App {
  async prikaziKorisnike() {
    const res = await fetch("https://api.example.com/users");
    const users = await res.json();
    // prikaži...
  }

  async prikaziPostove() {
    const res = await fetch("https://api.example.com/posts");
    const posts = await res.json();
    // prikaži...
  }

  async prikaziKomentare() {
    const res = await fetch("https://api.example.com/comments");
    const comments = await res.json();
    // prikaži...
  }
}
```
**Šta se ponavlja? Kako bi refaktorisao ovaj kod?**

### Pitanje 5: Šta je loše?
```javascript
const logger1 = new Logger();
const logger2 = new Logger();
const logger3 = new Logger();

logger1.log("Korisnik se ulogovao");
logger2.log("Fajl učitan");
logger3.log("Greška na serveru");

// Gde su svi logovi? Kako da vidim istoriju?
```
**Zašto ne možemo da pratimo sve logove? Kako da popravimo?**

### Pitanje 6: Šta je loše?
```javascript
function napraviZaposlenog(tip, ime, plata) {
  if (tip === "programer") {
    return { ime, plata, bonus: plata * 0.2, tip: "programer" };
  } else if (tip === "dizajner") {
    return { ime, plata, bonus: plata * 0.15, tip: "dizajner" };
  } else if (tip === "menadzer") {
    return { ime, plata, bonus: plata * 0.3, tip: "menadzer" };
  }
}

// Na drugom mestu u kodu, potpuno ista logika:
function izracunajBonus(tip, plata) {
  if (tip === "programer") return plata * 0.2;
  if (tip === "dizajner") return plata * 0.15;
  if (tip === "menadzer") return plata * 0.3;
}
```
**Šta se dešava kad dodamo novi tip zaposlenog? Kako popraviti?**

---

## Nivo 3: Dizajniraj rešenje

### Pitanje 7: Singleton Config
Zamisli da tvoja aplikacija ima konfiguraciju (tema, jezik, API URL). Ova konfiguracija mora biti **ista svuda**. Ako se promeni na jednom mestu, treba da se promeni svuda.

**Kako bi dizajnirao ConfigManager klasu koristeći Singleton?**
Razmisli: Šta će se desiti ako dva dela aplikacije imaju različite konfiguracije?

### Pitanje 8: Factory za vozila
Praviš sistem za rent-a-car. Imaš 3 tipa vozila: Auto, Kombi, Motor. Svaki ima drugačiju cenu po danu i drugačiji opis.

**Kako bi dizajnirao VehicleFactory? Koje klase su ti potrebne?**

### Pitanje 9: Kombinacija patterna
Imaš chat aplikaciju. Treba ti:
- Jedan logger za celu aplikaciju (loguje poruke, greške, konekcije)
- Različiti tipovi poruka (tekstualna, slika, video) - svaka se drugačije prikazuje
- Servis koji šalje/prima poruke sa servera

**Koji pattern koristiš za šta? Nacrtaj strukturu klasa.**

---

## Nivo 4: Razmišljanje unapred

### Pitanje 10: Posledice odluka
Klijent ti kaže: "Za sada imamo samo email notifikacije."

Ti odlučuješ da NE koristiš Factory pattern jer "imamo samo jedan tip."

Mesec dana kasnije, klijent kaže: "Dodaj SMS i push notifikacije."

**Šta se sada dešava u kodu? Koliko mesta moraš da menjaš? Da li bi drugačije odlučio na početku?**

### Pitanje 11: Kada NE koristiti Singleton?
Neko predlaže: "Hajde da svaku klasu napravimo kao Singleton - tako će sve biti jednostavnije!"

**Zašto je ovo loša ideja? Navedi primer gde Singleton NEMA smisla.**

### Pitanje 12: Testiranje
Imaš ovaj kod:
```javascript
class OrderService {
  async createOrder(items) {
    const total = items.reduce((sum, item) => sum + item.price, 0);
    const response = await fetch("https://api.shop.com/orders", {
      method: "POST",
      body: JSON.stringify({ items, total }),
    });
    return response.json();
  }
}
```
**Kako bi testirao ovu klasu bez pravog API-ja? Šta bi promenio u dizajnu?**
Hint: Razmisli o tome kako Service prima URL i kako bi mogao da ga zameniš u testu.

---

## Rezime

| Pattern | Kada koristiti | Ključno pitanje |
|---------|---------------|-----------------|
| **Singleton** | Treba tačno JEDNA instanca | "Da li svi delovi aplikacije trebaju isti objekat?" |
| **Factory** | Kreiraš različite tipove objekata | "Da li kreiram objekte na osnovu uslova?" |
| **Service** | Poslovna logika i operacije | "Ko je odgovoran za ovu operaciju?" |
