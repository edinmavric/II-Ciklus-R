// ============================================
// 31. ČAS - KOMPOZICIJA VS NASLEĐIVANJE - VEŽBE
// ============================================

// ============================================
// VEŽBA 1: User + PermissionService
// ============================================
// Kreiraj sistem sa User klasom koja koristi PermissionService
//
// PermissionService:
// - constructor(role) - role može biti "admin", "editor", "viewer"
// - canCreate() - true za admin i editor
// - canEdit() - true za admin i editor
// - canDelete() - true samo za admin
// - canViewReports() - true za admin i editor
//
// User:
// - constructor(name, email, permissionService)
// - createPost(title) - vraća poruku da li može ili ne može kreirati
// - deletePost(id) - vraća poruku da li može ili ne može obrisati
// - getPermissionSummary() - vraća string sa svim dozvolama

class PermissionService {
  // TVOJ KOD OVDE
}

class User {
  // TVOJ KOD OVDE
}

// Testiraj:
// const adminPerms = new PermissionService("admin");
// const viewerPerms = new PermissionService("viewer");
//
// const admin = new User("Marko", "marko@test.com", adminPerms);
// const viewer = new User("Ana", "ana@test.com", viewerPerms);
//
// console.log(admin.createPost("Novi članak"));  // "Marko je kreirao post: Novi članak"
// console.log(viewer.createPost("Moj post"));    // "Ana nema dozvolu za kreiranje postova"
// console.log(admin.deletePost(1));              // "Marko je obrisao post 1"
// console.log(viewer.deletePost(1));             // "Ana nema dozvolu za brisanje postova"
// console.log(admin.getPermissionSummary());
// // "Marko (admin): create=true, edit=true, delete=true, reports=true"

// ============================================
// VEŽBA 2: Order + PaymentService
// ============================================
// Kreiraj sistem narudžbina sa različitim načinima plaćanja
//
// CashPayment:
// - pay(amount) - vraća { success: true, message: "Plaćeno gotovinom: X RSD" }
//
// CardPayment:
// - constructor(cardNumber)
// - pay(amount) - vraća { success: true, message: "Plaćeno karticom ***XXXX: X RSD" }
//   (prikaži samo poslednje 4 cifre kartice)
//
// PayPalPayment:
// - constructor(email)
// - pay(amount) - vraća { success: true, message: "Plaćeno preko PayPal (email): X RSD" }
//
// Order:
// - constructor(items, paymentService) - items je niz { name, price, qty }
// - getTotal() - vraća ukupnu cenu
// - checkout() - koristi paymentService.pay() i vraća rezultat

class CashPayment {
  // TVOJ KOD OVDE
}

class CardPayment {
  // TVOJ KOD OVDE
}

class PayPalPayment {
  // TVOJ KOD OVDE
}

class Order {
  // TVOJ KOD OVDE
}

// Testiraj:
// const items = [
//   { name: "Knjiga", price: 1500, qty: 2 },
//   { name: "Olovka", price: 100, qty: 5 }
// ];
//
// const cashOrder = new Order(items, new CashPayment());
// console.log(cashOrder.getTotal());  // 3500
// console.log(cashOrder.checkout());  // { success: true, message: "Plaćeno gotovinom: 3500 RSD" }
//
// const cardOrder = new Order(items, new CardPayment("1234567890123456"));
// console.log(cardOrder.checkout());  // { success: true, message: "Plaćeno karticom ***3456: 3500 RSD" }
//
// const paypalOrder = new Order(items, new PayPalPayment("marko@gmail.com"));
// console.log(paypalOrder.checkout()); // { success: true, message: "Plaćeno preko PayPal (marko@gmail.com): 3500 RSD" }

// ============================================
// VEŽBA 3: Document + Validator
// ============================================
// Kreiraj sistem za dokumente sa različitim validatorima
//
// LengthValidator:
// - constructor(minLength, maxLength)
// - validate(text) - vraća { valid: true/false, error: "..." }
//
// ProfanityValidator:
// - constructor(bannedWords) - niz zabranjenih reči
// - validate(text) - proverava da li tekst sadrži zabranjene reči
//
// Document:
// - constructor(title, content, validator)
// - save() - prvo validira pa vraća uspeh ili grešku

class LengthValidator {
  // TVOJ KOD OVDE
}

class ProfanityValidator {
  // TVOJ KOD OVDE
}

class Document {
  // TVOJ KOD OVDE
}

// Testiraj:
// const lengthVal = new LengthValidator(10, 100);
// const profanityVal = new ProfanityValidator(["spam", "fake"]);
//
// const doc1 = new Document("Test", "Ovo je normalan tekst.", lengthVal);
// console.log(doc1.save()); // { success: true, message: "Dokument sačuvan" }
//
// const doc2 = new Document("Kratko", "Abc", lengthVal);
// console.log(doc2.save()); // { success: false, error: "Tekst mora imati između 10 i 100 karaktera" }
//
// const doc3 = new Document("Spam", "Ovo je spam poruka", profanityVal);
// console.log(doc3.save()); // { success: false, error: "Tekst sadrži zabranjenu reč: spam" }

// ============================================
// VEŽBA 4: NotificationService
// ============================================
// Kreiraj sistem notifikacija gde možemo kombinovati više kanala
//
// EmailChannel:
// - send(message) - console.log("[EMAIL] message")
//
// SMSChannel:
// - send(message) - console.log("[SMS] message")
//
// PushChannel:
// - send(message) - console.log("[PUSH] message")
//
// SlackChannel:
// - constructor(channelName)
// - send(message) - console.log("[SLACK #channelName] message")
//
// NotificationService:
// - constructor(channels) - prima NIZ kanala
// - notify(message) - šalje poruku na SVE kanale
// - addChannel(channel) - dodaje novi kanal
// - removeChannel(index) - uklanja kanal po indexu

class EmailChannel {
  // TVOJ KOD OVDE
}

class SMSChannel {
  // TVOJ KOD OVDE
}

class PushChannel {
  // TVOJ KOD OVDE
}

class SlackChannel {
  // TVOJ KOD OVDE
}

class NotificationService {
  // TVOJ KOD OVDE
}

// Testiraj:
// const service = new NotificationService([
//   new EmailChannel(),
//   new SMSChannel()
// ]);
//
// service.notify("Zdravo!");
// // [EMAIL] Zdravo!
// // [SMS] Zdravo!
//
// service.addChannel(new SlackChannel("general"));
// service.notify("Nova poruka");
// // [EMAIL] Nova poruka
// // [SMS] Nova poruka
// // [SLACK #general] Nova poruka

// ============================================
// BONUS VEŽBA: Game Character sa Abilities
// ============================================
// Kreiraj sistem za igru gde likovi imaju različite sposobnosti
//
// Abilities (sposobnosti):
// - FireAbility: attack() vraća "Baca vatru za 50 štete"
// - IceAbility: attack() vraća "Zamrzava za 30 štete"
// - HealAbility: heal() vraća "Leči za 40 HP"
// - InvisibilityAbility: hide() vraća "Postaje nevidljiv"
//
// Character:
// - constructor(name, abilities) - abilities je NIZ sposobnosti
// - useAbility(index) - koristi sposobnost na datom indexu
// - listAbilities() - vraća listu svih sposobnosti
//
// Cilj: Isti Character može imati BILO KOJU kombinaciju sposobnosti!

class FireAbility {
  // TVOJ KOD OVDE
}

class IceAbility {
  // TVOJ KOD OVDE
}

class HealAbility {
  // TVOJ KOD OVDE
}

class InvisibilityAbility {
  // TVOJ KOD OVDE
}

class Character {
  // TVOJ KOD OVDE
}

// Testiraj:
// const mage = new Character("Gandalf", [
//   new FireAbility(),
//   new IceAbility(),
//   new HealAbility()
// ]);
//
// const rogue = new Character("Shadow", [
//   new InvisibilityAbility(),
//   new IceAbility()
// ]);
//
// console.log(mage.listAbilities());
// // ["Fire", "Ice", "Heal"]
//
// console.log(mage.useAbility(0)); // "Gandalf koristi Fire: Baca vatru za 50 štete"
// console.log(mage.useAbility(2)); // "Gandalf koristi Heal: Leči za 40 HP"
//
// console.log(rogue.useAbility(0)); // "Shadow koristi Invisibility: Postaje nevidljiv"
