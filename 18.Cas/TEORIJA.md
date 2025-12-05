# 17. Cas - Promise Kombinatori i Napredni Async Paterni

## Uvod

JavaScript nudi nekoliko metoda za rad sa više Promise-a istovremeno. Ove metode nazivamo **Promise kombinatori** i omogućavaju nam efikasno upravljanje asinhronim operacijama.

---

## Promise.all()

### Sta je?

`Promise.all()` prima niz Promise-a i vraca jedan novi Promise koji se resolvuje kada **svi** Promise-i iz niza budu uspjesno zavrseni.

### Sintaksa

```javascript
Promise.all([promise1, promise2, promise3])
  .then(values => {
    // values je niz svih rezultata [result1, result2, result3]
  })
  .catch(err => {
    // Hvata PRVU gresku koja se dogodi
  });
```

### Kako radi?

- Vraca niz rezultata u **istom redoslijedu** kao ulazni Promise-i
- Ako **bilo koji** Promise bude odbijen (reject), odmah odbacuje cijeli `Promise.all()`
- Korisno kada su **svi rezultati potrebni** za nastavak

### Use Case

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => console.log(values)) // [1, 2, 3]
  .catch(err => console.error(err));
```

### Kada koristiti?

- Ucitavanje vise resursa koji su svi obavezni (korisnici, postovi, komentari)
- Batch operacije gdje sve mora uspjeti
- Paralelno izvrsavanje nezavisnih zahtjeva

### Primjer sa greskama

```javascript
const pGood = Promise.resolve('ok');
const pBad = Promise.reject(new Error('fail'));

Promise.all([pGood, pBad])
  .then(results => console.log(results))
  .catch(err => console.error('All failed:', err.message));
// Ispis: "All failed: fail"
```

---

## Promise.allSettled()

### Sta je?

`Promise.allSettled()` ceka da **svi** Promise-i budu zavrseni (bilo uspjesno ili neuspjesno) i vraca informacije o svakom.

### Sintaksa

```javascript
Promise.allSettled([promise1, promise2])
  .then(results => {
    // results je niz objekata sa status i value/reason
  });
```

### Kako radi?

- Nikada ne odbacuje (reject)
- Vraca niz objekata sa strukturom:
  - `{ status: 'fulfilled', value: rezultat }` - za uspjesne
  - `{ status: 'rejected', reason: greska }` - za neuspjesne

### Use Case

```javascript
const p1 = Promise.resolve(1);
const p2 = Promise.reject('err');

Promise.allSettled([p1, p2]).then(results => {
  console.log(results);
  // [
  //   { status: 'fulfilled', value: 1 },
  //   { status: 'rejected', reason: 'err' }
  // ]
});
```

### Kada koristiti?

- Kada zelite rezultate **svih** operacija, bez obzira na greske
- Logovanje uspjeha/neuspjeha svih zahtjeva
- Batch operacije gdje neuspjeh jedne ne treba zaustaviti ostale

---

## Promise.race()

### Sta je?

`Promise.race()` vraca Promise koji se resolvuje ili odbacuje cim **prvi** Promise iz niza zavrsi.

### Sintaksa

```javascript
Promise.race([promise1, promise2])
  .then(result => {
    // result je vrijednost PRVOG zavrsenog Promise-a
  })
  .catch(err => {
    // Ako prvi zavrsi sa greskom
  });
```

### Kako radi?

- "Trka" izmedju Promise-a
- Pobjednik (prvi koji zavrsi) odredjuje rezultat
- Moze biti fulfilled ILI rejected - zavisi koji prvi zavrsi

### Use Case

```javascript
const p1 = new Promise(res => setTimeout(() => res('slow'), 1000));
const p2 = new Promise(res => setTimeout(() => res('fast'), 100));

Promise.race([p1, p2]).then(result => console.log(result)); // 'fast'
```

### Kada koristiti?

- **Timeout pattern** - Postavljanje vremenskog ogranicenja
- Odabir najbrze dostupnog resursa
- Implementacija vremenskih limita za operacije

---

## Promise.any()

### Sta je?

`Promise.any()` vraca Promise koji se resolvuje cim **prvi uspjesni** (fulfilled) Promise zavrsi.

### Sintaksa

```javascript
Promise.any([promise1, promise2, promise3])
  .then(value => {
    // value je vrijednost prvog USPJESNOG Promise-a
  })
  .catch(err => {
    // AggregateError - samo ako SVI padnu
  });
```

### Kako radi?

- Ignorise odbijene Promise-e dok god postoji sansa za uspjeh
- Odbacuje samo ako **svi** Promise-i budu odbijeni
- Vraca `AggregateError` koji sadrzi sve greske

### Use Case

```javascript
const fail = Promise.reject('nope');
const success = new Promise(res => setTimeout(() => res('yay'), 200));

Promise.any([fail, success])
  .then(value => console.log(value)) // 'yay'
  .catch(err => console.error(err)); // samo ako svi padnu
```

### Kada koristiti?

- **Fallback sistemi** - Pokusaj vise izvora, uzmi prvi koji radi
- Mirror serveri - Dohvati sa prvog dostupnog servera
- Redundantni sistemi

---

## Razlika izmedju Promise.race() i Promise.any()

| Karakteristika | Promise.race() | Promise.any() |
|----------------|----------------|---------------|
| Pobjednik | Prvi koji zavrsi (bilo kako) | Prvi koji **uspije** |
| Reject | Ako prvi zavrsi sa greskom | Samo ako **svi** padnu |
| Fokus | Brzina | Uspjeh |

---

## Prakticni Paterni

### 1. Paralelno vs Sekvencijalno Dohvatanje

#### Sekvencijalno (sporije)

```javascript
async function sequentialFetch() {
  const out = [];
  for (const url of urls) {
    const r = await fetch(url).then(r => r.json());
    out.push(r);
  }
  return out;
}
```

- Svaki zahtjev ceka prethodni
- Ukupno vrijeme = zbir svih vremena

#### Paralelno (brze)

```javascript
async function parallelFetch() {
  const res = await Promise.all(
    urls.map(u => fetch(u).then(r => r.json()))
  );
  return res;
}
```

- Svi zahtjevi krecu istovremeno
- Ukupno vrijeme = vrijeme najsporijeg zahtjeva

### Kada koristiti koje?

| Situacija | Preporuka |
|-----------|-----------|
| Nezavisni zahtjevi | Paralelno |
| Zahtjevi zavise jedan o drugom | Sekvencijalno |
| Ogranicen broj konekcija | Sekvencijalno ili batching |

---

### 2. Timeout Pattern

Koristeci `AbortController` mozemo prekinuti fetch ako traje predugo:

```javascript
async function fetchWithTimeout(url, timeoutMs = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timer);
    return await res.json();
  } catch (err) {
    throw err;
  }
}
```

### Kako radi?

1. Kreiramo `AbortController`
2. Postavljamo `setTimeout` koji poziva `abort()` nakon odredjenog vremena
3. Prosledjujemo `signal` fetch-u
4. Ako fetch zavrsi na vrijeme, cistimo timer
5. Ako istekne vrijeme, fetch se prekida sa `AbortError`

---

### 3. Mirror/Fallback Pattern

Dohvatanje sa prvog dostupnog servera:

```javascript
async function fetchFromMirrors(mirrors) {
  try {
    const result = await Promise.any(
      mirrors.map(url => fetch(url).then(r => {
        if (!r.ok) throw new Error('Bad response');
        return r.json();
      }))
    );
    return result;
  } catch (err) {
    console.error('Svi mirrori su pali:', err);
    throw err;
  }
}
```

### Kada koristiti?

- CDN sa vise lokacija
- Backup API serveri
- Redundantni sistemi

---

### 4. Ucitavanje Vise Resursa Odjednom

```javascript
const API = 'https://jsonplaceholder.typicode.com';

async function loadEverything() {
  try {
    const [users, posts, comments] = await Promise.all([
      fetch(`${API}/users`).then(r => r.json()),
      fetch(`${API}/posts`).then(r => r.json()),
      fetch(`${API}/comments`).then(r => r.json())
    ]);
    console.log('Users:', users.length);
    console.log('Posts:', posts.length);
    console.log('Comments:', comments.length);
  } catch (err) {
    console.error('Nesto nije uspjelo:', err);
  }
}
```

---

## Sazetak - Kada koristiti koji kombinator?

| Kombinator | Koristi kada... |
|------------|-----------------|
| `Promise.all()` | Trebas **sve** rezultate, i ako jedan padne - sve propada |
| `Promise.allSettled()` | Trebas **sve** rezultate, bez obzira na greske |
| `Promise.race()` | Trebas **prvi** rezultat (uspjeh ili greska) |
| `Promise.any()` | Trebas **prvi uspjesan** rezultat |

---

## Dodatni Savjeti

1. **Uvijek koristi try/catch** sa async/await za hvatanje gresaka
2. **Paralelno je brze** za nezavisne operacije
3. **AbortController** je moderan nacin za prekidanje fetch-a
4. **Destrukturiranje** `[a, b, c] = await Promise.all([...])` cini kod citljivijim
5. **performance.now()** je koristan za mjerenje vremena izvrsavanja

---

## Vjezbe za Praksu

1. Napravi tri Promise-a sa razlicitim vremenima i testiraj `Promise.all` vs `Promise.allSettled`
2. Uporedi vrijeme paralelnog i sekvencijalnog dohvatanja 5 URL-ova
3. Implementiraj timeout pattern sa `AbortController`
4. Napravi fallback sistem sa `Promise.any` i testiraj sa laznim URL-ovima
