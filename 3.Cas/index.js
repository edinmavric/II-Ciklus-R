const nasElement = document.createElement('h1');
nasElement.textContent = 'Tekst iz JS fajla';
nasElement.style.color = 'blue';
document.body.appendChild(nasElement);

// Napraviti div, i u njemu append-ovati
// child element

const nasDiv = document.createElement('div');
const nekiElement = document.createElement('p');

nasDiv.appendChild(nekiElement);
nekiElement.textContent = 'Paragraf iz JS-a';
document.body.appendChild(nasDiv);

const title = document.getElementById('title');
title.remove();
nasDiv.remove();

const addBtn = document.querySelector('#dodaj');
const removeBtn = document.getElementById('izbrisi');
const cont = document.getElementById('container');

let paragraf = document.createElement('p');
paragraf.textContent = 'Paragraf iz JS-a';

addBtn.addEventListener('click', () => {
  cont.appendChild(paragraf);
});

removeBtn.addEventListener('click', () => {
  paragraf.remove();
});

addBtn.classList.add('nekaKlasa');
addBtn.classList.remove('btn');
addBtn.classList.toggle('btn2');

const green = document.getElementById('green');
const red = document.querySelector('#red');
const blue = document.getElementById('blue');

function promeniBoju(boja) {
  document.body.style.backgroundColor = boja;
}

green.addEventListener('click', () => promeniBoju('green'));
red.addEventListener('click', () => promeniBoju('red'));
blue.addEventListener('click', () => promeniBoju('blue'));
