const students = [
  { name: 'Ana', city: 'Novi Pazar', grade: 9 },
  { name: 'Marko', city: 'Beograd', grade: 8 },
  { name: 'Emina', city: 'Niš', grade: 10 },
  { name: 'Jovan', city: 'Beograd', grade: 7 },
  { name: 'Petar', city: 'Novi Pazar', grade: 6 },
];

const container = document.getElementById('studentContainer');
const searchInput = document.getElementById('search');
const cityFilter = document.getElementById('cityFilter');
const gradeFilter = document.getElementById('gradeFilter');
const sortDesc = document.getElementById('sortDesc');
const sortAsce = document.getElementById('sortAsce');

// Elementi forme
const addForm = document.getElementById('addForm');
const newName = document.getElementById('newName');
const newCity = document.getElementById('newCity');
const newGrade = document.getElementById('newGrade');

let currentStudents = [...students];

function renderList(list) {
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = '<p>Nema rezultata...</p>';
    return;
  }

  list.forEach(s => {
    const div = document.createElement('div');
    div.className = 'student';

    const info = document.createElement('span');
    info.textContent = `${s.name} — ${s.city} (${s.grade})`;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Obrisi';
    delBtn.className = 'delete';

    delBtn.addEventListener('click', () => {
      const index = students.indexOf(s);
      students.splice(index, 1);
      currentStudents = [...students];
      applyFilters();
    });

    div.append(info, delBtn);
    container.appendChild(div);
  });
}

function applyFilters() {
  const term = searchInput.value.toLowerCase();
  const city = cityFilter.value;
  const grade = +gradeFilter.value;

  let filteredStudents = currentStudents.filter(s =>
    s.name.toLowerCase().includes(term)
  );

  if (city) filteredStudents = filteredStudents.filter(s => s.city === city);

  if (grade) filteredStudents = filteredStudents.filter(s => s.grade === grade);

  renderList(filteredStudents);
}

addForm.addEventListener('submit', e => {
  e.preventDefault();

  const student = {
    name: newName.value,
    city: newCity.value,
    grade: newGrade.value,
  };

  students.push(student);
  currentStudents = [...students];
  renderList(currentStudents);

  addForm.reset();
});

searchInput.addEventListener('input', applyFilters);
cityFilter.addEventListener('change', applyFilters);
gradeFilter.addEventListener('change', applyFilters);

sortDesc.addEventListener('click', () => {
  currentStudents.sort((a, b) => a.name.localeCompare(b.name));
  renderList(currentStudents);
});

sortAsce.addEventListener('click', () => {
  currentStudents.sort((a, b) => b.name.localeCompare(a.name));
  renderList(currentStudents);
});

// sortDesc.addEventListener('click', () => {
//   currentStudents.sort((a, b) => a.age - b.age);
//   renderList(currentStudents);
// });

// sortAsce.addEventListener('click', () => {
//   currentStudents.sort((a, b) => b.age - a.age);
//   renderList(currentStudents);
// });

renderList(students);
