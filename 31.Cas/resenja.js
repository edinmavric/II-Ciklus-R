// ============================================
// 31. ČAS - KOMPOZICIJA VS NASLEĐIVANJE - REŠENJA
// ============================================

// ============================================
// REŠENJE 1: User + PermissionService
// ============================================

class PermissionService {
  constructor(role) {
    this.role = role;
  }

  canCreate() {
    return this.role === 'admin' || this.role === 'editor';
  }

  canEdit() {
    return this.role === 'admin' || this.role === 'editor';
  }

  canDelete() {
    return this.role === 'admin';
  }

  canViewReports() {
    return this.role === 'admin' || this.role === 'editor';
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

  createPost(title) {
    if (this.permissions.canCreate()) {
      return `${this.name} je kreirao post: ${title}`;
    }
    return `${this.name} nema dozvolu za kreiranje postova`;
  }

  deletePost(id) {
    if (this.permissions.canDelete()) {
      return `${this.name} je obrisao post ${id}`;
    }
    return `${this.name} nema dozvolu za brisanje postova`;
  }

  getPermissionSummary() {
    const p = this.permissions;
    return `${this.name} (${p.getRole()}): create=${p.canCreate()}, edit=${p.canEdit()}, delete=${p.canDelete()}, reports=${p.canViewReports()}`;
  }
}

console.log('=== REŠENJE 1: User + PermissionService ===\n');

const adminPerms = new PermissionService('admin');
const viewerPerms = new PermissionService('viewer');
const editorPerms = new PermissionService('editor');

const admin = new User('Marko', 'marko@test.com', adminPerms);
const viewer = new User('Ana', 'ana@test.com', viewerPerms);
const editor = new User('Petar', 'petar@test.com', editorPerms);

console.log(admin.createPost('Novi članak'));
console.log(viewer.createPost('Moj post'));
console.log(editor.createPost('Editorov post'));
console.log('');
console.log(admin.deletePost(1));
console.log(viewer.deletePost(1));
console.log(editor.deletePost(1));
console.log('');
console.log(admin.getPermissionSummary());
console.log(viewer.getPermissionSummary());
console.log(editor.getPermissionSummary());

console.log('\n');

// ============================================
// REŠENJE 2: Order + PaymentService
// ============================================

class CashPayment {
  pay(amount) {
    return {
      success: true,
      message: `Plaćeno gotovinom: ${amount} RSD`,
    };
  }
}

class CardPayment {
  constructor(cardNumber) {
    this.cardNumber = cardNumber;
  }

  pay(amount) {
    const lastFour = this.cardNumber.slice(-4);
    return {
      success: true,
      message: `Plaćeno karticom ***${lastFour}: ${amount} RSD`,
    };
  }
}

class PayPalPayment {
  constructor(email) {
    this.email = email;
  }

  pay(amount) {
    return {
      success: true,
      message: `Plaćeno preko PayPal (${this.email}): ${amount} RSD`,
    };
  }
}

class Order {
  constructor(items, paymentService) {
    this.items = items;
    this.paymentService = paymentService;
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  checkout() {
    const total = this.getTotal();
    return this.paymentService.pay(total);
  }
}

console.log('=== REŠENJE 2: Order + PaymentService ===\n');

const items = [
  { name: 'Knjiga', price: 1500, qty: 2 },
  { name: 'Olovka', price: 100, qty: 5 },
];

const cashOrder = new Order(items, new CashPayment());
console.log('Total:', cashOrder.getTotal());
console.log(cashOrder.checkout());

const cardOrder = new Order(items, new CardPayment('1234567890123456'));
console.log(cardOrder.checkout());

const paypalOrder = new Order(items, new PayPalPayment('marko@gmail.com'));
console.log(paypalOrder.checkout());

console.log('\n');

// ============================================
// REŠENJE 3: Document + Validator
// ============================================

class LengthValidator {
  constructor(minLength, maxLength) {
    this.minLength = minLength;
    this.maxLength = maxLength;
  }

  validate(text) {
    if (text.length < this.minLength || text.length > this.maxLength) {
      return {
        valid: false,
        error: `Tekst mora imati između ${this.minLength} i ${this.maxLength} karaktera`,
      };
    }
    return { valid: true };
  }
}

class ProfanityValidator {
  constructor(bannedWords) {
    this.bannedWords = bannedWords;
  }

  validate(text) {
    const lowerText = text.toLowerCase();
    for (const word of this.bannedWords) {
      if (lowerText.includes(word.toLowerCase())) {
        return {
          valid: false,
          error: `Tekst sadrži zabranjenu reč: ${word}`,
        };
      }
    }
    return { valid: true };
  }
}

class Document {
  constructor(title, content, validator) {
    this.title = title;
    this.content = content;
    this.validator = validator;
  }

  save() {
    const result = this.validator.validate(this.content);
    if (!result.valid) {
      return { success: false, error: result.error };
    }
    return { success: true, message: 'Dokument sačuvan' };
  }
}

console.log('=== REŠENJE 3: Document + Validator ===\n');

const lengthVal = new LengthValidator(10, 100);
const profanityVal = new ProfanityValidator(['spam', 'fake']);

const doc1 = new Document('Test', 'Ovo je normalan tekst.', lengthVal);
console.log('doc1:', doc1.save());

const doc2 = new Document('Kratko', 'Abc', lengthVal);
console.log('doc2:', doc2.save());

const doc3 = new Document('Spam', 'Ovo je spam poruka', profanityVal);
console.log('doc3:', doc3.save());

const doc4 = new Document('OK', 'Ovo je normalna poruka', profanityVal);
console.log('doc4:', doc4.save());

console.log('\n');

// ============================================
// REŠENJE 4: NotificationService
// ============================================

class EmailChannel {
  send(message) {
    console.log(`[EMAIL] ${message}`);
  }
}

class SMSChannel {
  send(message) {
    console.log(`[SMS] ${message}`);
  }
}

class PushChannel {
  send(message) {
    console.log(`[PUSH] ${message}`);
  }
}

class SlackChannel {
  constructor(channelName) {
    this.channelName = channelName;
  }

  send(message) {
    console.log(`[SLACK #${this.channelName}] ${message}`);
  }
}

class NotificationService {
  constructor(channels) {
    this.channels = channels || [];
  }

  notify(message) {
    this.channels.forEach((channel) => channel.send(message));
  }

  addChannel(channel) {
    this.channels.push(channel);
  }

  removeChannel(index) {
    this.channels.splice(index, 1);
  }
}

console.log('=== REŠENJE 4: NotificationService ===\n');

const service = new NotificationService([new EmailChannel(), new SMSChannel()]);

console.log('Prva notifikacija:');
service.notify('Zdravo!');

console.log('\nDodajemo Slack kanal...');
service.addChannel(new SlackChannel('general'));

console.log('\nDruga notifikacija:');
service.notify('Nova poruka');

console.log('\nDodajemo Push kanal...');
service.addChannel(new PushChannel());

console.log('\nTreća notifikacija:');
service.notify('Važno obaveštenje!');

console.log('\n');

// ============================================
// BONUS REŠENJE: Game Character sa Abilities
// ============================================

class FireAbility {
  getName() {
    return 'Fire';
  }

  use() {
    return 'Baca vatru za 50 štete';
  }
}

class IceAbility {
  getName() {
    return 'Ice';
  }

  use() {
    return 'Zamrzava za 30 štete';
  }
}

class HealAbility {
  getName() {
    return 'Heal';
  }

  use() {
    return 'Leči za 40 HP';
  }
}

class InvisibilityAbility {
  getName() {
    return 'Invisibility';
  }

  use() {
    return 'Postaje nevidljiv';
  }
}

class Character {
  constructor(name, abilities) {
    this.name = name;
    this.abilities = abilities || [];
  }

  useAbility(index) {
    if (index < 0 || index >= this.abilities.length) {
      return `${this.name} nema sposobnost na indexu ${index}`;
    }
    const ability = this.abilities[index];
    return `${this.name} koristi ${ability.getName()}: ${ability.use()}`;
  }

  listAbilities() {
    return this.abilities.map((a) => a.getName());
  }

  addAbility(ability) {
    this.abilities.push(ability);
  }
}

console.log('=== BONUS REŠENJE: Game Character ===\n');

const mage = new Character('Gandalf', [
  new FireAbility(),
  new IceAbility(),
  new HealAbility(),
]);

const rogue = new Character('Shadow', [
  new InvisibilityAbility(),
  new IceAbility(),
]);

const paladin = new Character('Arthur', [new HealAbility(), new FireAbility()]);

console.log('Gandalf abilities:', mage.listAbilities());
console.log('Shadow abilities:', rogue.listAbilities());
console.log('Arthur abilities:', paladin.listAbilities());

console.log('');

console.log(mage.useAbility(0));
console.log(mage.useAbility(1));
console.log(mage.useAbility(2));

console.log('');

console.log(rogue.useAbility(0));
console.log(rogue.useAbility(1));

console.log('');

// Dodavanje nove sposobnosti
console.log('Arthur uči novu sposobnost...');
paladin.addAbility(new InvisibilityAbility());
console.log('Arthur abilities:', paladin.listAbilities());
console.log(paladin.useAbility(2));
