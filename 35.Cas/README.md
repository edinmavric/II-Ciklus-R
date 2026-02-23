# 35. Cas - OOP Projekti za Vezbu

Kolekcija projekata za vezbanje objektno-orijentisanog programiranja u JavaScript-u.
Svaki projekat pokriva: **inheritance**, **private polja**, **static metode**, **async logiku** i **enkapsulaciju**.

---

## 1. Bank System Pro

> Najbolji projekat za ucenje OOP osnova.

### Cilj

Napraviti sistem za upravljanje bankovnim racunima sa podrskom za stedne racune i medjusobne transfere.

### Klase

#### `BankAccount`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#balance` | Trenutno stanje na racunu |
| constructor | `constructor(ownerName, initialBalance)` | Kreira racun sa imenom vlasnika i pocetnim stanjem |
| metoda | `deposit(amount)` | Uplata na racun |
| metoda | `withdraw(amount)` | Isplata sa racuna |
| getter | `get balance()` | Vraca trenutno stanje |
| async metoda | `async transfer(toAccount, amount)` | Prebacuje novac na drugi racun |

#### `SavingsAccount extends BankAccount`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `interestRate` | Kamatna stopa (npr. 0.05 za 5%) |
| metoda | `applyInterest()` | Dodaje kamatu na trenutno stanje |

#### `Bank`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#accounts` | Lista svih racuna u banci |
| static | `generateAccountNumber()` | Generise jedinstven broj racuna |
| metoda | `createAccount(ownerName, initialBalance)` | Otvara novi racun |
| metoda | `findAccount(accountNumber)` | Pronalazi racun po broju |
| async metoda | `async processTransaction(from, to, amount)` | Obradjuje transakciju izmedju dva racuna |

### Pravila

- Zabraniti negativne uplate (`amount <= 0`)
- Zabraniti isplatu ako nema dovoljno novca na racunu
- Simulirati async transfer sa `setTimeout` (npr. 1-2 sekunde)

### Sta se vezba?

- Inheritance (`SavingsAccount` nasledjuje `BankAccount`)
- Private polja (`#balance`, `#accounts`)
- Static metoda za generisanje broja racuna
- Async logika za transfere
- Enkapsulacija kroz gettere

---

## 2. Online Shop Core

> Realan backend model - logika online prodavnice bez UI-a.

### Cilj

Napraviti backend logiku za online shop sa proizvodima, korpom i porudzbinama.

### Klase

#### `Product`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `id` | Jedinstven identifikator proizvoda |
| polje | `name` | Naziv proizvoda |
| polje | `price` | Cena proizvoda |
| static | `createFromJSON(json)` | Factory metoda - kreira Product iz JSON objekta |

#### `User`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#password` | Hesirani password korisnika |
| metoda | `login(password)` | Prijava korisnika |
| metoda | `checkPassword(password)` | Proverava da li je password tacan |

#### `Cart`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#items` | Lista proizvoda u korpi |
| metoda | `addProduct(product, quantity)` | Dodaje proizvod u korpu |
| metoda | `removeProduct(productId)` | Uklanja proizvod iz korpe |
| metoda | `getTotal()` | Racuna ukupnu cenu svih proizvoda |

#### `Order`

| Tip | Naziv | Opis |
|-----|-------|------|
| constructor | `constructor(user, cart)` | Kreira porudzbinu od korisnika i njegove korpe |
| async metoda | `async checkout()` | Zavrsava kupovinu |
| async metoda | `async saveToDatabase()` | Simulira cuvanje u bazu (setTimeout) |

### Bonus

- `DiscountedProduct extends Product` - proizvod sa popustom (override `price` getter)
- `AdminUser extends User` - admin koji moze dodavati/brisati proizvode

### Sta se vezba?

- Composition (`User` ima `Cart`, `Order` sadrzi `User` i `Cart`)
- Inheritance (`DiscountedProduct`, `AdminUser`)
- Async logika za checkout i cuvanje
- Static factory metoda (`createFromJSON`)

---

## 3. Game Character System

> Najzanimljiviji projekat za studente - mini RPG logika.

### Cilj

Napraviti mini RPG borbeni sistem sa razlicitim tipovima likova.

### Klase

#### `Character`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#health` | Zdravlje lika |
| polje | `name` | Ime lika |
| polje | `attackPower` | Snaga napada |
| metoda | `attack(target)` | Napada drugog lika |
| metoda | `takeDamage(amount)` | Prima stetu |
| getter | `get health()` | Vraca trenutno zdravlje |
| metoda | `isAlive()` | Proverava da li je lik ziv (`#health > 0`) |

#### `Warrior extends Character`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `armor` | Smanjuje primljenu stetu |
| metoda | `heavyAttack(target)` | Snazni napad (dupla steta, ali prima malu stetu) |

#### `Mage extends Character`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#mana` | Magicna energija |
| metoda | `castSpell(target)` | Baca caroliju (trosi manu, zadaje veliku stetu) |
| getter | `get mana()` | Vraca trenutnu manu |

#### `BattleArena`

| Tip | Naziv | Opis |
|-----|-------|------|
| static | `fight(char1, char2)` | Pokrece borbu izmedju dva lika |
| async metoda | `async simulateBattle(char1, char2)` | Simulira borbu tura po tura sa pauzama |

### Bonus

- `Item` klasa sa svojstvima (`name`, `type`, `effect`)
- `Inventory` klasa sa `#items`, `addItem()`, `useItem(character)`
- Healing potion koji obnavlja zdravlje

### Sta se vezba?

- Polimorfizam (razliciti tipovi likova napadaju na razlicite nacine)
- Inheritance (`Warrior` i `Mage` nasledjuju `Character`)
- Private polja (`#health`, `#mana`)
- Static metoda za battle system
- Async simulacija borbe

---

## 4. User Management System

> Backend arhitektura - mini auth sistem.

### Cilj

Napraviti autentifikacioni sistem sa registracijom, prijavom i upravljanjem korisnicima (bez prave baze podataka).

### Klase

#### `User`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#password` | Password korisnika |
| polje | `email` | Email adresa |
| polje | `name` | Ime korisnika |
| metoda | `validatePassword(password)` | Proverava da li je unet ispravan password |
| static | `validateEmail(email)` | Proverava format email adrese |

#### `AdminUser extends User`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `role` | Uloga admina (npr. "superadmin", "moderator") |
| metoda | `deleteUser(userRepository, email)` | Brise korisnika iz sistema |
| metoda | `listAllUsers(userRepository)` | Prikazuje sve korisnike |

#### `UserRepository`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#users` | Niz korisnika (simulira bazu) |
| async metoda | `async save(user)` | Cuva korisnika (simulira upis u bazu) |
| async metoda | `async findByEmail(email)` | Pronalazi korisnika po emailu |
| async metoda | `async deleteByEmail(email)` | Brise korisnika po emailu |

#### `AuthService`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `userRepository` | Referenca na UserRepository |
| async metoda | `async register(name, email, password)` | Registruje novog korisnika |
| async metoda | `async login(email, password)` | Prijavljuje korisnika |

### Bonus

- Singleton pattern za `UserRepository` (samo jedna instanca)
- Password hashing simulacija
- Session/token sistem (generisanje random tokena pri login-u)

### Sta se vezba?

- Inheritance (`AdminUser` nasledjuje `User`)
- Private polja (`#password`, `#users`)
- Async metode za simulaciju baze podataka
- Composition (`AuthService` koristi `UserRepository`)
- Static validacija

---

## 5. Booking System

> Napredniji projekat - rezervacioni sistem za hotel ili bioskop.

### Cilj

Napraviti sistem za rezervaciju soba/sedista sa validacijom i sprecavanjem duplih rezervacija.

### Klase

#### `User`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `name` | Ime korisnika |
| polje | `email` | Email adresa |
| metoda | `getBookings()` | Vraca sve rezervacije korisnika |

#### `PremiumUser extends User`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `discountRate` | Procenat popusta (npr. 0.1 za 10%) |
| metoda | `applyDiscount(price)` | Primenjuje popust na cenu |
| metoda | `getPriority()` | Premium korisnici imaju prioritet pri rezervaciji |

#### `Room`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `number` | Broj sobe |
| polje | `type` | Tip sobe (single, double, suite) |
| polje | `pricePerNight` | Cena po noci |
| private | `#isAvailable` | Da li je soba slobodna |
| metoda | `book()` | Rezervise sobu |
| metoda | `release()` | Oslobadja sobu |

#### `Booking`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `user` | Korisnik koji je rezervisao |
| polje | `room` | Rezervisana soba |
| polje | `checkIn` | Datum dolaska |
| polje | `checkOut` | Datum odlaska |
| static | `validateDates(checkIn, checkOut)` | Proverava da li su datumi validni |

#### `BookingService`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#bookings` | Lista svih rezervacija |
| async metoda | `async createBooking(user, room, checkIn, checkOut)` | Kreira novu rezervaciju |
| async metoda | `async cancelBooking(bookingId)` | Otkazuje rezervaciju |
| metoda | `findAvailableRooms(checkIn, checkOut)` | Pronalazi slobodne sobe za period |

### Pravila

- Zabrana duple rezervacije iste sobe u istom periodu
- Async simulacija za kreiranje i otkazivanje rezervacija
- Static validacija datuma (checkOut mora biti posle checkIn)
- Premium korisnici dobijaju popust

### Sta se vezba?

- Inheritance (`PremiumUser` nasledjuje `User`)
- Private polja (`#isAvailable`, `#bookings`)
- Static validacija
- Async metode za rezervacije
- Composition (`Booking` sadrzi `User` i `Room`)

---

## 6. Task Management System

> Trello/Jira logika - upravljanje projektima i taskovima.

### Cilj

Napraviti sistem za upravljanje projektima sa taskovima, bordovima i korisnicima.

### Klase

#### `User`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `name` | Ime korisnika |
| polje | `email` | Email adresa |
| metoda | `getAssignedTasks(board)` | Vraca taskove dodeljene korisniku |

#### `AdminUser extends User`

| Tip | Naziv | Opis |
|-----|-------|------|
| metoda | `createProject(name)` | Kreira novi projekat |
| metoda | `deleteProject(project)` | Brise projekat |
| metoda | `addMember(project, user)` | Dodaje clana u projekat |

#### `Task`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `title` | Naziv taska |
| polje | `description` | Opis taska |
| private | `#status` | Status: "todo", "in_progress", "done" |
| polje | `assignee` | Korisnik koji je zaduzen |
| metoda | `moveTo(status)` | Menja status taska |
| getter | `get status()` | Vraca trenutni status |
| static | `validateStatus(status)` | Proverava da li je status validan |

#### `Board`

| Tip | Naziv | Opis |
|-----|-------|------|
| private | `#tasks` | Lista taskova na bordu |
| metoda | `addTask(task)` | Dodaje task na bord |
| metoda | `removeTask(taskId)` | Uklanja task sa borda |
| metoda | `getTasksByStatus(status)` | Filtrira taskove po statusu |

#### `Project`

| Tip | Naziv | Opis |
|-----|-------|------|
| polje | `name` | Naziv projekta |
| private | `#boards` | Lista bordova u projektu |
| private | `#members` | Lista clanova projekta |
| metoda | `createBoard(name)` | Kreira novi bord |
| async metoda | `async save()` | Cuva stanje projekta (simulacija) |
| async metoda | `async load()` | Ucitava stanje projekta (simulacija) |

### Pravila

- Samo `AdminUser` moze kreirati i brisati projekte
- Task moze menjati status samo u validnom redosledu (todo -> in_progress -> done)
- Private lista taskova - pristup samo kroz metode

### Sta se vezba?

- Inheritance (`AdminUser` nasledjuje `User`)
- Private polja (`#status`, `#tasks`, `#boards`, `#members`)
- Static validacija statusa
- Async cuvanje i ucitavanje
- Composition (`Project` ima `Board`, `Board` ima `Task`)

---

## Profesionalni Challenge

> Za studente koji zele dodatni izazov.

### Zadatak

Napraviti sistem po sopstvenom izboru sa sledecim minimalnim zahtevima:

| Zahtev | Minimum |
|--------|---------|
| Broj klasa | 6+ |
| Apstraktna bazna klasa (simulirana) | 1+ |
| Inheritance | Da |
| Composition | Da |
| Async metode | 2+ |
| Static factory metoda | 1+ |
| Private polja | 3+ |

### Primer ideja

- **Biblioteka** - knjige, clanovi, pozajmice, kasnjenja
- **Restoran** - meni, porudzbine, stolovi, konobari
- **Skola** - ucenici, profesori, predmeti, ocene
- **Bolnica** - pacijenti, doktori, pregledi, recepti
