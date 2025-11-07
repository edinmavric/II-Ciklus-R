const students = [
  { name: 'Marko', city: 'Beograd', age: 22 },
  { name: 'Ana', city: 'Novi Sad', age: 20 },
  { name: 'Petar', city: 'Niš', age: 25 },
  { name: 'Ivana', city: 'Kragujevac', age: 23 },
  { name: 'Anastasija', city: 'Tutin', age: 26 },
  { name: 'Darko', city: 'Subotica', age: 19 },
  { name: 'Jana', city: 'Novi Pazar', age: 18 },
];

const tbody = document.querySelector('#studentsTable tbody');

const renderTable = data => {
  tbody.innerHTML = '';
  data.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${s.name}</td><td>${s.city}</td><td>${s.age}</td>`;
    tbody.appendChild(tr);
  });
};

renderTable(students);

const search = document.getElementById('search');

search.addEventListener('input', () => {
  const term = search.value.toLowerCase();

  const filteredStudents = students.filter(
    s =>
      s.name.toLowerCase().includes(term) ||
      s.city.toLowerCase().includes(term) ||
      s.age.toString().includes(term)
  );

  renderTable(filteredStudents);
});
