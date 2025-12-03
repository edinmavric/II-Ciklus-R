const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

Promise.all([p1, p2, p3])
  .then(values => console.log(values)) // [1,2,3]
  .catch(err => console.error(err));

// const pGood = Promise.resolve('ok');
// const pBad = Promise.reject(new Error('fail'));

// Promise.all([pGood, pBad])
//   .then(results => console.log(results))
//   .catch(err => console.error('All failed:', err.message));
// // Ispis: "All failed: fail"

// const p1 = Promise.resolve(1);
// const p2 = Promise.reject('err');

// Promise.allSettled([p1, p2]).then(results => {
//   // results = [
//   //  { status: 'fulfilled', value: 1 },
//   //  { status: 'rejected', reason: 'err' }
//   // ]
//   console.log(results);
// });

// const p1 = new Promise(res => setTimeout(() => res('slow'), 1000));
// const p2 = new Promise(res => setTimeout(() => res('fast'), 100));

// Promise.race([p1, p2]).then(result => console.log(result)); // 'fast'

// const fail = Promise.reject('nope');
// const success = new Promise(res => setTimeout(() => res('yay'), 200));

// Promise.any([fail, success])
//   .then(value => console.log(value)) // 'yay'
//   .catch(err => console.error(err)); // samo ako svi padnu

// const urls = [
//   'https://jsonplaceholder.typicode.com/posts/1',
//   'https://jsonplaceholder.typicode.com/posts/2',
//   'https://jsonplaceholder.typicode.com/posts/3'
// ];

// async function parallelFetch() {
//   const t0 = performance.now();
//   const res = await Promise.all(urls.map(u => fetch(u).then(r => r.json())));
//   const t1 = performance.now();
//   console.log('Parallel time:', (t1 - t0).toFixed(2), 'ms');
//   return res;
// }

// async function sequentialFetch() {
//   const t0 = performance.now();
//   const out = [];
//   for (const u of urls) {
//     const r = await fetch(u).then(r => r.json());
//     out.push(r);
//   }
//   const t1 = performance.now();
//   console.log('Sequential time:', (t1 - t0).toFixed(2), 'ms');
//   return out;
// }

// const API = 'https://jsonplaceholder.typicode.com';

// async function loadEverything() {
//   try {
//     const [users, posts, comments] = await Promise.all([
//       fetch(`${API}/users`).then(r => r.json()),
//       fetch(`${API}/posts`).then(r => r.json()),
//       fetch(`${API}/comments`).then(r => r.json())
//     ]);
//     console.log('Users:', users.length, 'Posts:', posts.length, 'Comments:', comments.length);
//   } catch (err) {
//     console.error('Nešto nije uspjelo:', err);
//   }
// }

// async function fetchWithSimpleTimeout(url, timeoutMs = 3000) {
//   const controller = new AbortController();
//   const timer = setTimeout(() => controller.abort(), timeoutMs);

//   try {
//     const res = await fetch(url, { signal: controller.signal });
//     clearTimeout(timer);
//     return await res.json();
//   } catch (err) {
//     throw err;
//   }
// }

// async function fetchFromMirrors(mirrors) {
//   try {
//     const result = await Promise.any(mirrors.map(url => fetch(url).then(r => {
//       if (!r.ok) throw new Error('Bad response');
//       return r.json();
//     })));
//     return result;
//   } catch (err) {
//     console.error('Svi mirrori su pali:', err);
//     throw err;
//   }
// }

// Zadatak A — Promise.all + allSettled

// Napravi tri Promise-a: jedan resolves za 100ms, drugi rejects za 200ms, treći resolves za 50ms.

// Pokreni Promise.all i Promise.allSettled nad njima.

// Zabeleži rezultate i objasni zašto svaki radi kako radi.

// Očekivani ishod:

// Promise.all će odbaciti (reject) sa greškom iz drugog promise-a.

// Promise.allSettled vraća status za sva tri (jedan rejected, dva fulfilled).

// Zadatak B — Paralelno vs Sekvencijalno

// Uzmi 5 URL-ova za test (npr. JSONPlaceholder).

// Implementiraj sequentialFetch(urls) i parallelFetch(urls) i meri vreme.

// Pokaži rezultata i napiši kratak zaključak.

// Očekivano: paralelno je brže ako su zahtevi nezavisni.

// Zadatak C — Timeout pattern

// Napravi fetchWithTimeout(url, ms) koristeći Promise.race ili AbortController.

// Testiraj sa URL-om koji sporo odgovara i prikaži ponašanje.

// Zadatak D — Promise.any fallback

// Daj 3 "mirror" URL-a (jedan ispravan, dva lažna).

// Koristeći Promise.any implementiraj fetch koji vrati prvi uspeh.

// Obradi slučaj kada svi padnu (hvatanje AggregateError).