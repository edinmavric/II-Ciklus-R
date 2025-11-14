const list = document.querySelector('#student-list');

// sibling
const firstLi = list.firstElementChild;
const lastLi = list.lastElementChild;

// 1) parentElement primer
console.log('parentElement of list:', list.parentElement); // <div id="container">
console.log('parentNode of list:', list.parentNode); // <div id="container">
console.log('closest of list:', list.closest('div')); // <div id="container"> -> samo parent!

// 2) children primeri
console.log('children of list:', list.children); // HTMLCollection -> li, li
console.log('first child:', list.firstElementChild); // prvi li
console.log('last child:', list.lastElementChild); // poslednji li

// 3) sibling primer
console.log('first next sibling:', firstLi.nextElementSibling); // drugi <li>
console.log('last previous sibling:', lastLi.previousElementSibling); // prvi <li>

console.log(lastLi.previousElementSibling.parentElement.previousElementSibling);

// Delegacija događaja: jedan listener za celu listu
list.addEventListener('click', e => {
  // --------------- REMOVE ---------------
  if (e.target.classList.contains('btn-remove')) {
    // ideš gore do <li>
    const li = e.target.parentElement;

    // Prikaz kako bismo izvadili ID iz reda
    const id = li.querySelector('.id')?.textContent?.trim();
    console.log('Removing id:', id);

    // realno: fetch(`/students/${id}`, { method: 'DELETE' })

    // ukloni sa strane klijenta
    li.remove();
    return;
  }

  // --------------- EDIT ---------------
  if (e.target.classList.contains('btn-edit')) {
    const li = e.target.parentElement;
    const nameSpan = li.querySelector('.name');

    const newName = prompt('Novo ime:', nameSpan.textContent);
    if (newName) {
      nameSpan.textContent = newName;

      // realno: fetch(`/students/${id}`, { method: 'PUT' | 'PATCH', body: JSON.stringify({ name: newName }) })
    }
    return;
  }

  // --------------- KLIKNUT JE SAM LI ---------------
  // ako neko klikne direktno na li (ne na dugme)
  if (e.target.tagName === 'LI') {
    const clickedLi = e.target;
    const next = clickedLi.nextElementSibling;
    const prev = clickedLi.previousElementSibling;

    if (next) next.style.background = 'lightgreen';
    if (prev) prev.style.background = 'lightblue';
  }
});
