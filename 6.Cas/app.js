const input = document.getElementById('taskInput');
const preview = document.getElementById('livePreview');
const btn = document.getElementById('addTask');
const list = document.getElementById('taskList');
const counter = document.getElementById('counter');

function addTask() {
  const tekst = input.value.trim();
  if (tekst === '') return alert('Unesi zadatak!');

  const li = document.createElement('li');
  //
  const span = document.createElement('span');
  const delBtn = document.createElement('button');

  span.textContent = tekst;
  delBtn.textContent = 'Obriši';
  //

  // Kod izmedju // ... // moze i ovako da se napise:
  //   li.innerHTML = `
  //   <span class="task-text">${tekst}</span>
  //   <button class="delete">Obriši</button>
  // `;
  //

  span.addEventListener('click', () => {
    li.classList.toggle('done');
    updateCounter();
  });

  delBtn.addEventListener('click', () => {
    li.remove();
    updateCounter();
  });

  li.append(span, delBtn);
  // isto kao:
  // li.appendChild(span);
  // li.appendChild(delBtn);
  list.appendChild(li);

  input.value = '';
  preview.innerHTML = 'Live preview: <em>Nema unosa</em>';
  updateCounter();
}

function updateCounter() {
  const total = list.querySelectorAll('li').length;
  const done = list.querySelectorAll('li.done').length;
  counter.textContent = `Preostalo zadataka: ${total - done}`;
}

input.addEventListener('input', e => {
  const tekst = e.target.value.trim();
  preview.innerHTML = tekst ? `Live preview: <strong>${tekst}</strong>` : 'Live preview: <em>Nema unosa</em>';

  // Prevod u if-else block koda iznad (Ternary operator):
  // if (tekst) {
  //   preview.innerHTML = `Live preview: <strong>${tekst}</strong>`;
  // } else {
  //   preview.innerHTML = 'Live preview: <em>Nema unosa</em>';
  // }
});

btn.addEventListener('click', addTask);
