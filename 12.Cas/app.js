const gallery = document.querySelector('#gallery');
const addBtn = document.querySelector('#add');

// Resetuje sve stilove
function resetHighlights() {
  [...gallery.children].forEach(item => {
    item.classList.remove('highlight-main', 'highlight-next', 'highlight-prev');
    item.style.border = '';
    item.style.background = '';
  });
}

// Delegacija
gallery.addEventListener('click', e => {
  const target = e.target;

  // ❌ Remove dugme → obriši ceo item
  if (target.classList.contains('remove')) {
    const item = target.closest('.item');
    item.remove();
    return;
  }

  // Klik na sliku → selekcija + next/prev highlight
  if (target.tagName === 'IMG') {
    const item = target.closest('.item');

    resetHighlights();

    item.classList.add('highlight-main');

    const next = item.nextElementSibling;
    if (next) next.classList.add('highlight-next');

    const prev = item.previousElementSibling;
    if (prev) prev.classList.add('highlight-prev');
  }

  // Klik na naslov (H3) → highlight slike u istom itemu
  if (target.tagName === 'H3') {
    const item = target.closest('.item');
    const img = item.children[1];

    img.style.border = '3px solid orange';
  }
});

// Add new image
addBtn.addEventListener('click', () => {
  const item = document.createElement('div');
  item.className = 'item';

  item.innerHTML = `
    <h3>Novi prikaz</h3>
    <img src="https://picsum.photos/100?random=${Math.random()}">
    <button class="remove">❌</button>
  `;

  gallery.appendChild(item);
});

// BONUS: Klik na praznu zonu (ne na item) → resetuj selekciju
document.addEventListener('click', e => {
  if (!e.target.closest('.item')) {
    resetHighlights();
  }
});
