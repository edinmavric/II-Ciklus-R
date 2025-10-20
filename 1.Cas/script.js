const heading = document.getElementById('heading');
console.log(heading);

heading.textContent = 'Tekst iz JS fajla';
heading.style.color = 'blue';

heading.innerHTML = '<p style="color: red;">maskjdmasj</p>';

// const skupDivova = document.getElementsByClassName('skup');
// console.log(skupDivova);
// const divovi = document.getElementsByTagName('div');
// console.log(divovi);

const divs = document.querySelector('p');
const byId = document.querySelector('#heading');
const byClassName = document.querySelector('.skup');

const skup = document.querySelectorAll('.skup');
console.log(skup);

for (let i = 0; i <= skup.length; i++) {
  skup[i].style.fontSize = '30px';
  skup[i].textContent = i;
}

skup.forEach(element => {
  element.style.color = 'red';
});
