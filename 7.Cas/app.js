// const input = document.getElementById('search');
// const list = document.getElementById('list');
// const items = list.getElementsByTagName('li');

// input.addEventListener('input', () => {
//   const value = input.value.toLowerCase();

//   // for (let i = 0; i < items.length; i++)
//   for (let li of items) {
//     const text = li.textContent.toLowerCase();
//     li.style.display = text.includes(value) ? 'block' : 'none';
//     // if (text.includes(value)) {
//     //  li.style.display = 'block';
//     // } else {
//     //  li.style.display = 'none';
//     // }
//   }
// });

const student = [
  { name: 'David', city: 'Novi Pazar' },
  { name: 'Ejmen', city: 'Novi Pazar' },
  { name: 'Salahudin', city: 'Novi Pazar' },
  { name: 'Tarik', city: 'Novi Pazar' },
  { name: 'Adem', city: 'Novi Pazar' },
  { name: 'Maida', city: 'Novi Pazar' },
];

const ul = document.getElementById('students');
const search = document.getElementById('searchStudents');

const render = list => {
  ul.innerHTML = '';
  list.forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.name} ${s.city}`;
    ul.append(li);
  });
};

render(student);

search.addEventListener('input', () => {
  const term = search.value.toLowerCase();
  const filteredStudentsArray = student.filter(s =>
    s.name.toLowerCase().includes(term)
  );

  render(filteredStudentsArray);
});

// Mini katalog proizvoda sa pretragom:
// Napraviti niz proizvoda (objekata) sa 
// svojstvima: naziv, cena, kategorija.

// { naziv: 'Kruska', cena, kategorija }

// Prikazati proizvode u listi na stranici.
// Dodati input polje za pretragu proizvoda 
// po nazivu.
// Dok korisnik kuca u input polje, 
// filtrirati i prikazivati samo 
// proizvode ciji naziv sadrzi uneti tekst.
