function a() {
  console.log('a start');
  b();
  console.log('a end');
}

function b() {
  console.log('b log');
}

a();

// Call stack:
// push a -> inside a: push b -> execute b -> pop b -> continue a -> pop a

console.log('start');
setTimeout(() => console.log('timeout 1000'), 1000);
setTimeout(() => console.log('timeout 0'), 0);
console.log('end');

// Callback Hell
setTimeout(() => {
  console.log('Prvi');
  setTimeout(() => {
    console.log('Drugi');
    setTimeout(() => {
      console.log('Treći');
    }, 500);
  }, 500);
}, 500);

// funkcija resolve se izvrsava kada je nesto uspesno
// funkcija reject se izvrsava kada je nesto neuspesno

// pending
// fulfilled
// rejected

const p = new Promise((resolve, reject) => {
  const success = false; // promeni na false da vidiš reject

  setTimeout(() => {
    if (success) {
      resolve('Uspeh!'); // -> fulfilled
    } else {
      reject('Greška!'); // -> rejected
    }
  }, 2500);
});

p.then(data => console.log('Fulfilled:', data))
  .catch(err => console.error('Rejected:', err))
  .finally(() => console.warn('Kraj izvrsavanja!'));

// Microtasks (Promise) i Macrotasks (setTimeout)
//                      >

console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');
