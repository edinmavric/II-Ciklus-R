const title = document.getElementById('title');
const dugme = document.querySelector('#dugme');

const dugmeListener = event => {
  title.textContent = 'Dugme je kliknuto!';
  dugme.textContent = 'Kliknut sam.';
  console.log(event.target);
};

dugme.addEventListener('click', dugmeListener);

// Prikazati u konzoli tagName i value event.target-a

// Napraviti tri dugmeta:
// "Zeleno"
// "Crveno"
// "Plavo"
// Kada se klikne neko dugme promeniti boju body-ja
// u tu boju (backgroundColor)
// document.body.style.backgroundColor = 'red | blue | green'

const green = document.getElementById('green');
const red = document.querySelector('#red');
const blue = document.getElementById('blue');

green.addEventListener('click', function () {
  document.body.style.background = 'green';
});

red.addEventListener('click', function () {
  document.body.style.background = 'red';
});

blue.addEventListener('click', function () {
  document.body.style.background = 'blue';
});
