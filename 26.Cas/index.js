// ============================================
// 26. ČAS - METODE, THIS I KONTEKST
// ============================================

// ============================================
// PONAVLJANJE KLASA + VEŽBA
// ============================================

console.log('========================================');
console.log('PONAVLJANJE KLASA');
console.log('========================================\n');

// --------------------------------------------
// Brzo ponavljanje - struktura klase
// --------------------------------------------

console.log('=== Brzo ponavljanje ===\n');

// Primer klase iz prošlog časa
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Zdravo, ja sam ${this.name}`);
  }

  getInfo() {
    return `${this.name}, ${this.age} godina`;
  }
}

const user1 = new User('Marko', 25);
user1.greet();
console.log(user1.getInfo());

// --------------------------------------------
// VEŽBA: Klasa Playlist
// --------------------------------------------

console.log('\n=== VEŽBA: Klasa Playlist ===\n');

// TODO: Napraviti klasu Playlist sa:
// - Svojstvima: name, songs (prazan niz)
// - Metodama: addSong(), removeSong(), getSongCount(), showPlaylist()

class Playlist {
  constructor(name) {
    this.name = name;
    this.songs = [];
  }

  addSong(song) {
    this.songs.push(song);
    console.log(`Dodato: "${song}"`);
  }

  removeSong(song) {
    const index = this.songs.indexOf(song);
    if (index !== -1) {
      this.songs.splice(index, 1);
      console.log(`Uklonjeno: "${song}"`);
    } else {
      console.log(`Pesma "${song}" nije pronađena`);
    }
  }

  getSongCount() {
    return this.songs.length;
  }

  showPlaylist() {
    console.log(`\nPlejlista: ${this.name}`);
    console.log('-------------------');
    if (this.songs.length === 0) {
      console.log('(prazna plejlista)');
    } else {
      this.songs.forEach((song, index) => {
        console.log(`${index + 1}. ${song}`);
      });
    }
    console.log(`\nUkupno pesama: ${this.getSongCount()}\n`);
  }
}

// Test Playlist klase
const myPlaylist = new Playlist('Moje omiljene');
myPlaylist.addSong('Queen - Bohemian Rhapsody');
myPlaylist.addSong('AC/DC - Back in Black');
myPlaylist.addSong('Led Zeppelin - Stairway to Heaven');
myPlaylist.showPlaylist();

myPlaylist.removeSong('AC/DC - Back in Black');
myPlaylist.showPlaylist();

// ============================================
// METODE I THIS KEYWORD
// ============================================

console.log('========================================');
console.log('METODE I THIS');
console.log('========================================\n');

// --------------------------------------------
// 1. Šta je metoda?
// --------------------------------------------

console.log('=== 1. Šta je metoda? ===\n');

class Dog {
  constructor(name) {
    this.name = name;
  }

  bark() {
    console.log(`${this.name} kaže: Av av!`);
  }

  introduce() {
    console.log(`Ja sam pas i zovem se ${this.name}`);
  }
}

const dog1 = new Dog('Žućo');
const dog2 = new Dog('Rex');

dog1.bark(); // "Žućo kaže: Av av!"
dog2.bark(); // "Rex kaže: Av av!"
dog1.introduce();

// --------------------------------------------
// 2. Kako radi this?
// --------------------------------------------

console.log('\n=== 2. Kako radi this? ===\n');

class Player {
  constructor(name) {
    this.name = name;
    this.score = 0;
  }

  addPoints(points) {
    this.score += points;
    console.log(`${this.name} ima ${this.score} poena`);
  }

  showScore() {
    console.log(`Rezultat za ${this.name}: ${this.score}`);
  }
}

const player1 = new Player('Marko');
const player2 = new Player('Ana');

// this zavisi od objekta NA KOME je metoda pozvana
player1.addPoints(10); // this = player1 → "Marko ima 10 poena"
player2.addPoints(15); // this = player2 → "Ana ima 15 poena"
player1.addPoints(5); // this = player1 → "Marko ima 15 poena"

console.log('\nFinalni rezultati:');
player1.showScore();
player2.showScore();

// --------------------------------------------
// 3. Metode koje pozivaju druge metode
// --------------------------------------------

console.log('\n=== 3. Metode koje pozivaju druge metode ===\n');

class Calculator {
  constructor() {
    this.result = 0;
  }

  add(num) {
    this.result += num;
    console.log(`+ ${num} = ${this.result}`);
    return this; // Vraća this za chain-ovanje
  }

  subtract(num) {
    this.result -= num;
    console.log(`- ${num} = ${this.result}`);
    return this;
  }

  multiply(num) {
    this.result *= num;
    console.log(`* ${num} = ${this.result}`);
    return this;
  }

  divide(num) {
    if (num !== 0) {
      this.result /= num;
      console.log(`/ ${num} = ${this.result}`);
    } else {
      console.log('Greška: Deljenje nulom!');
    }
    return this;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
    console.log('Resetovano na 0');
    return this;
  }
}

// Normalno korišćenje
console.log('Normalno korišćenje:');
const calc1 = new Calculator();
calc1.add(10);
calc1.multiply(2);
calc1.subtract(5);
console.log(`Rezultat: ${calc1.getResult()}`);

// Chain-ovanje (metode vraćaju this)
console.log('\nChain-ovano korišćenje:');
const calc2 = new Calculator();
const chainResult = calc2
  .add(100)
  .subtract(20)
  .divide(2)
  .multiply(3)
  .getResult();

console.log(`Finalni rezultat: ${chainResult}`);

// ============================================
// PROBLEM GUBITKA KONTEKSTA
// ============================================

console.log('\n========================================');
console.log('GUBITAK KONTEKSTA');
console.log('========================================\n');

// --------------------------------------------
// 1. Demonstracija problema
// --------------------------------------------

console.log('=== 1. Demonstracija problema ===\n');

class Button {
  constructor(label) {
    this.label = label;
  }

  click() {
    console.log(`Kliknuto na: ${this.label}`);
  }
}

const btn = new Button('Submit');

// Ovo radi - metoda pozvana na objektu
console.log('Direktan poziv:');
btn.click(); // "Kliknuto na: Submit"

// Ovo NE radi - metoda odvojena od objekta
console.log('\nOdvojena funkcija:');
const clickFn = btn.click;
// clickFn(); // Ovo bi dalo "Kliknuto na: undefined"
console.log('(clickFn() bi dao undefined - this je izgubljen)');

// --------------------------------------------
// 2. Problem sa setTimeout
// --------------------------------------------

console.log('\n=== 2. Problem sa setTimeout ===\n');

class CounterProblem {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(`[${this.name}] Count: ${this.count}`);
  }

  // PROBLEM: this se gubi!
  startWithProblem() {
    console.log('Pokušaj sa problemom (neće raditi ispravno):');
    // setTimeout(this.increment, 100); // NE RADI!
    console.log('(zakomentarisano jer bi dalo grešku)');
  }
}

const counterProblem = new CounterProblem('Problematičan');
counterProblem.startWithProblem();

// --------------------------------------------
// 3. Rešenje #1: Arrow funkcija
// --------------------------------------------

console.log('\n=== 3. Rešenje #1: Arrow funkcija ===\n');

class CounterArrow {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(`[${this.name}] Count: ${this.count}`);
  }

  start() {
    console.log(`${this.name} - koristi arrow funkciju:`);
    // Arrow funkcija ČUVA this iz okružujućeg koda
    setTimeout(() => {
      this.increment();
    }, 100);
  }
}

const counterArrow = new CounterArrow('Arrow');
counterArrow.start();

// --------------------------------------------
// 4. Rešenje #2: bind()
// --------------------------------------------

console.log('\n=== 4. Rešenje #2: bind() ===\n');

class CounterBind {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(`[${this.name}] Count: ${this.count}`);
  }

  start() {
    console.log(`${this.name} - koristi bind():`);
    // bind() kreira novu funkciju sa zaključanim this
    setTimeout(this.increment.bind(this), 200);
  }
}

const counterBind = new CounterBind('Bind');
counterBind.start();

// --------------------------------------------
// 5. Rešenje #3: self = this
// --------------------------------------------

console.log('\n=== 5. Rešenje #3: self = this ===\n');

class CounterSelf {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  increment() {
    this.count++;
    console.log(`[${this.name}] Count: ${this.count}`);
  }

  start() {
    console.log(`${this.name} - koristi self = this:`);
    const self = this; // Sačuvaj referencu
    setTimeout(function () {
      self.increment(); // Koristi sačuvanu referencu
    }, 300);
  }
}

const counterSelf = new CounterSelf('Self');
counterSelf.start();

// --------------------------------------------
// 6. Rešenje #4: Arrow kao svojstvo
// --------------------------------------------

console.log('\n=== 6. Rešenje #4: Arrow kao svojstvo klase ===\n');

class CounterArrowProperty {
  constructor(name) {
    this.name = name;
    this.count = 0;
  }

  // Arrow funkcija kao svojstvo - this je UVEK zaključan
  increment = () => {
    this.count++;
    console.log(`[${this.name}] Count: ${this.count}`);
  };

  start() {
    console.log(`${this.name} - arrow kao svojstvo:`);
    setTimeout(this.increment, 400); // Radi BEZ bind()!
  }
}

const counterArrowProp = new CounterArrowProperty('ArrowProp');
counterArrowProp.start();

// ============================================
// VEŽBE
// ============================================

// Sačekaj da se završe setTimeout-ovi pre vežbi
setTimeout(() => {
  console.log('\n========================================');
  console.log('VEŽBE');
  console.log('========================================\n');

  // --------------------------------------------
  // VEŽBA 1: Counter sa auto-increment
  // --------------------------------------------

  console.log('=== VEŽBA 1: Counter sa auto-increment ===\n');

  class Counter {
    constructor() {
      this.count = 0;
      this.intervalId = null;
    }

    increment() {
      this.count++;
      console.log(`Count: ${this.count}`);
    }

    decrement() {
      this.count--;
      console.log(`Count: ${this.count}`);
    }

    reset() {
      this.count = 0;
      console.log('Count resetovan na 0');
    }

    startAutoIncrement() {
      if (this.intervalId) {
        console.log('Auto-increment već radi!');
        return;
      }
      console.log('Auto-increment pokrenut (svakih 500ms)');
      this.intervalId = setInterval(this.increment().bind(this), 500);
    }

    stopAutoIncrement() {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        console.log('Auto-increment zaustavljen');
      } else {
        console.log('Auto-increment nije bio pokrenut');
      }
    }
  }

  const counter = new Counter();
  counter.increment();
  counter.increment();
  counter.decrement();

  // Pokreni auto-increment
  counter.startAutoIncrement();

  // Zaustavi posle 2.5 sekunde
  setTimeout(() => {
    counter.stopAutoIncrement();
    console.log(`\nFinalni count: ${counter.count}`);

    // --------------------------------------------
    // VEŽBA 2: Timer klasa
    // --------------------------------------------

    console.log('\n=== VEŽBA 2: Timer klasa ===\n');

    class Timer {
      constructor(seconds) {
        this.initialSeconds = seconds;
        this.seconds = seconds;
        this.intervalId = null;
        this.isRunning = false;
      }

      start() {
        if (this.isRunning) {
          console.log('Timer već radi!');
          return;
        }
        if (this.seconds <= 0) {
          console.log('Timer je završen! Resetuj prvo.');
          return;
        }

        this.isRunning = true;
        console.log(`Timer pokrenut: ${this.seconds}s`);

        this.intervalId = setInterval(() => {
          this.seconds--;
          console.log(`Preostalo: ${this.seconds}s`);

          if (this.seconds <= 0) {
            this.stop();
            console.log('DING! Vreme je isteklo!');
          }
        }, 1000);
      }

      stop() {
        if (this.intervalId) {
          clearInterval(this.intervalId);
          this.intervalId = null;
          this.isRunning = false;
          console.log('Timer pauziran');
        }
      }

      reset() {
        this.stop();
        this.seconds = this.initialSeconds;
        console.log(`Timer resetovan na ${this.seconds}s`);
      }

      getTimeLeft() {
        return this.seconds;
      }
    }

    const timer = new Timer(5);
    timer.start();

    // Posle 7 sekundi (kada timer završi), prikaži bonus
    setTimeout(() => {
      console.log('\n========================================');
      console.log('BONUS: Stopwatch klasa (domaći)');
      console.log('========================================\n');

      class Stopwatch {
        constructor() {
          this.seconds = 0;
          this.isRunning = false;
          this.intervalId = null;
          this.laps = [];
        }

        start() {
          if (this.isRunning) {
            console.log('Štoperica već radi!');
            return;
          }

          this.isRunning = true;
          console.log('Štoperica pokrenuta');

          this.intervalId = setInterval(() => {
            this.seconds++;
            console.log(`Vreme: ${this.formatTime()}`);
          }, 1000);
        }

        stop() {
          if (!this.isRunning) {
            console.log('Štoperica nije pokrenuta');
            return;
          }

          clearInterval(this.intervalId);
          this.isRunning = false;
          console.log(`Štoperica pauzirana na ${this.formatTime()}`);
        }

        reset() {
          this.stop();
          this.seconds = 0;
          this.laps = [];
          console.log('Štoperica resetovana');
        }

        lap() {
          if (!this.isRunning) {
            console.log('Pokreni štopericu prvo!');
            return;
          }

          const lapTime = this.formatTime();
          this.laps.push(lapTime);
          console.log(`LAP ${this.laps.length}: ${lapTime}`);
        }

        getLaps() {
          if (this.laps.length === 0) {
            console.log('Nema zabeleženih krugova');
            return [];
          }

          console.log('\nZabeleženi krugovi:');
          this.laps.forEach((lap, index) => {
            console.log(`  ${index + 1}. ${lap}`);
          });
          return this.laps;
        }

        formatTime() {
          const mins = Math.floor(this.seconds / 60);
          const secs = this.seconds % 60;
          return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
      }

      const stopwatch = new Stopwatch();
      stopwatch.start();

      // Beleži krug posle 2 sekunde
      setTimeout(() => stopwatch.lap(), 2000);

      // Beleži krug posle 4 sekunde
      setTimeout(() => stopwatch.lap(), 4000);

      // Zaustavi i prikaži rezultate posle 5 sekundi
      setTimeout(() => {
        stopwatch.stop();
        stopwatch.getLaps();

        console.log('\n========================================');
        console.log('REZIME');
        console.log('========================================\n');

        console.log('1. this pokazuje na objekat na kome je metoda pozvana');
        console.log('2. Kada se metoda prosledi kao callback, gubi se this');
        console.log('3. Arrow funkcije čuvaju this iz okružujućeg scope-a');
        console.log('4. bind() kreira novu funkciju sa zaključanim this');
        console.log('5. Arrow svojstva klase automatski čuvaju this\n');

        console.log('=== KRAJ ČASA ===\n');
      }, 5000);
    }, 7000);
  }, 2500);
}, 500);
