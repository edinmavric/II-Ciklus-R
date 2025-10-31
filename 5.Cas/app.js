const parent = document.getElementById('parent');
const child = document.getElementById('child');

parent.addEventListener('click', () => {
  console.log('klik na parenta');
});

child.addEventListener('click', event => {
  event.stopPropagation();
  console.log('klik na childa');
});

const list = document.querySelector('#list');

list.addEventListener('click', event => {
  console.log(event.currentTarget);

  if (event.target.tagName === 'LI') {
    event.target.style.color = 'red';
    console.log(`Kliknuto je na: ${event.target.textContent}`);
  }
});

const cont = document.getElementById('cont');

cont.addEventListener('click', event => {
  console.log(event.target.tagName);
});

// mouseenter mouseleave
// scrolldown scrollup
// keydown keypress keyup

// input
const input = document.getElementById('input');
const live = document.getElementById('live');

input.addEventListener('input', event => {
  // console.log(event.target); isto
  // console.log(input); isto

  const text = event.target.value.trim();
  // if (text === '') return alert('Upisi nesto u input');
  console.log(text);
  live.textContent = 'Tekst u live: ' + text;
});

// change
const after = document.getElementById('after');

input.addEventListener('change', event => {
  after.textContent = `Tekst u after: ${event.target.value.trim()}`;
});

// To-Do lista
// 1. 'click'
// Imamo input, imamo button i imamo ul
// Hocemo kada kliknemo button, samo ako ima tekst u njemu
// Da dodamo kao neku stavku <li> u html-u

// 2. 'change'
// Uraditi bez button-a, nego kad se izgubi fokus sa inputa
// dodati stavka <li> u html-u