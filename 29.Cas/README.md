# Čas 29: Polimorfizam i Method Overriding

## 🎯 Cilj časa

Na kraju ovog časa, student će razumeti:
- Šta je polimorfizam i zašto je važan
- Kako različite klase mogu deliti isti interfejs
- Kako se koristi method overriding (preklapanje metoda)
- Kako funkcioniše `super` u kontekstu metoda
- Praktične primere polimorfizma u rešavanju problema

## 📚 Šta je Polimorfizam?

**Polimorfizam** (grč. *poly* = mnogo, *morph* = oblik) je sposobnost različitih objekata da odgovaraju na isti metod poziv na različite načine.

### Glavna ideja:
> **"Isti interfejs, različito ponašanje"**

U praksi to znači:
- Sve klase imaju **istu metodu** (npr. `area()`)
- Ali svaka klasa **implementira** tu metodu **na svoj način**
- Možemo raditi sa različitim objektima kroz **zajednički interfejs**

## 🔑 Ključni Koncepti

### 1. Zajednički Interfejs (Base Class)

Osnovna klasa definiše metode koje sve potklase **treba** da implementiraju:

```javascript
class Shape {
  area() {
    return 0; // Osnovna implementacija
  }

  describe() {
    return `Ovo je oblik sa površinom: ${this.area()}`;
  }
}
```

### 2. Method Overriding (Preklapanje metoda)

Potklasa **override-uje** (prekriva) metodu bazne klase sa svojom implementacijom:

```javascript
class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }

  // Override metode area()
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }

  // Override metode area()
  area() {
    return this.width * this.height;
  }
}
```

### 3. Korišćenje super.method()

Ponekad želimo da **proširimo** funkcionalnost roditeljske metode, a ne samo da je zamenimo:

```javascript
class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }

  describe() {
    // Pozivamo roditeljsku metodu i dodajemo nešto svoje
    return super.describe() + " - Ovo je kvadrat!";
  }
}
```

## 💡 Zašto je Polimorfizam Važan?

### 1. Fleksibilnost Koda

```javascript
function printArea(shape) {
  // Ne znamo koji je tačno oblik, ali znamo da ima area() metodu
  console.log(`Površina: ${shape.area()}`);
}

const circle = new Circle(5);
const rectangle = new Rectangle(4, 6);
const square = new Square(5);

printArea(circle);     // Poziva Circle.area()
printArea(rectangle);  // Poziva Rectangle.area()
printArea(square);     // Poziva Square.area()
```

### 2. Lakše Održavanje Koda

Ako treba da dodamo novi oblik, samo kreiramo novu klasu - ne moramo menjati postojeći kod.

### 3. Rad sa Kolekcijama

```javascript
const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Square(3),
  new Circle(10)
];

// Računamo ukupnu površinu svih oblika
const totalArea = shapes.reduce((sum, shape) => sum + shape.area(), 0);
console.log(`Ukupna površina: ${totalArea}`);
```

## 🎨 Kada Koristiti Override?

### ✅ Koristi override kada:
- Potklasa treba **drugačije ponašanje** od bazne klase
- Potklasa ima **specifične podatke** za izračunavanje
- Želiš da **proširis** funkcionalnost bazne klase

### ❌ Ne koristi override kada:
- Metoda radi **isto** u svim podklasama
- Dodaješ **potpuno novu** funkcionalnost (koristi novu metodu)
- Menja se **potpuno značenje** metode (možda treba nova metoda)

## 🔍 Pravila Method Overriding-a

1. **Isti naziv metode** - metoda u potklasi mora imati isti naziv
2. **Isti broj parametara** (obično) - za konzistentnost
3. **Može se koristiti super** - za pristup roditeljskoj implementaciji
4. **Ne mora se koristiti super** - može biti potpuno nova implementacija

## 🚀 Napredni Primeri

### Primer: Životinje

```javascript
class Animal {
  makeSound() {
    return "Neka zvučna predstava";
  }
}

class Dog extends Animal {
  makeSound() {
    return "Av av!";
  }
}

class Cat extends Animal {
  makeSound() {
    return "Mjau!";
  }
}

class Cow extends Animal {
  makeSound() {
    return super.makeSound() + " - Muuu!"; // Koristi super
  }
}

// Polimorfizam u akciji
const animals = [new Dog(), new Cat(), new Cow()];
animals.forEach(animal => console.log(animal.makeSound()));
```

## 📋 Rezime

- **Polimorfizam** = različiti objekti, isti interfejs
- **Override** = potklasa menja ponašanje roditeljske metode
- **super.method()** = poziva roditeljsku verziju metode
- Omogućava **fleksibilan i održiv** kod
- Ključan koncept **objektno-orijentisanog programiranja**

## 🎯 Vežba

Otvori [vezbe.js](vezbe.js) i reši zadatke!

---

**Napomena:** Polimorfizam je jedan od **stubova OOP-a**. Jednom kada ga savladaš, tvoj kod postaje mnogo elegantniji i lakši za proširivanje! 🎉
