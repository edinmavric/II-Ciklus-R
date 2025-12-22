// Hvatamo elemente iz HTML-a
const putForm = document.getElementById('putForm');
const patchForm = document.getElementById('patchForm');
const rezultatDiv = document.getElementById('rezultat');

// ==================== UCITAVANJE POSTOJECIH PODATAKA ====================

// Funkcija za ucitavanje posta (realan scenario - prvo vidimo sta menjamo)
async function loadPost(postId) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  const post = await response.json();
  return post;
}

// Ucitaj podatke za PUT formu
document.getElementById('loadPutBtn').addEventListener('click', async function () {
  const postId = document.getElementById('putPostId').value;

  const post = await loadPost(postId);

  // Popunjavamo formu sa postojecim podacima
  document.getElementById('putTitle').value = post.title;
  document.getElementById('putBody').value = post.body;
  document.getElementById('putUserId').value = post.userId;

  rezultatDiv.innerHTML = `<p>Učitani podaci za post ${postId}. Sada možete izmeniti vrednosti.</p>`;
});

// Ucitaj podatke za PATCH formu
document.getElementById('loadPatchBtn').addEventListener('click', async function () {
  const postId = document.getElementById('patchPostId').value;

  const post = await loadPost(postId);

  // Prikazujemo postojece podatke (ali ne popunjavamo formu - PATCH salje samo ono sto se menja)
  rezultatDiv.innerHTML = `
    <h3>Trenutni podaci za post ${postId}:</h3>
    <p><strong>Naslov:</strong> ${post.title}</p>
    <p><strong>Sadržaj:</strong> ${post.body}</p>
    <p><em>Popunite samo polja koja želite da promenite.</em></p>
  `;
});

// ==================== PUT METODA ====================

putForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const postId = document.getElementById('putPostId').value;
  const title = document.getElementById('putTitle').value;
  const body = document.getElementById('putBody').value;
  const userId = document.getElementById('putUserId').value;

  // PUT zahteva SVE podatke - zamenjuje ceo resurs
  const payload = {
    id: parseInt(postId),
    title: title,
    body: body,
    userId: parseInt(userId),
  };

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  rezultatDiv.innerHTML = `
    <h3>PUT - Server je vratio:</h3>
    <p><strong>ID:</strong> ${data.id}</p>
    <p><strong>Naslov:</strong> ${data.title}</p>
    <p><strong>Sadržaj:</strong> ${data.body}</p>
    <p><strong>User ID:</strong> ${data.userId}</p>
    <p><em>Ceo resurs je zamenjen novim podacima.</em></p>
  `;

  console.log('PUT odgovor:', data);
});

// ==================== PATCH METODA ====================

patchForm.addEventListener('submit', async function (event) {
  event.preventDefault();

  const postId = document.getElementById('patchPostId').value;
  const title = document.getElementById('patchTitle').value;
  const body = document.getElementById('patchBody').value;

  // PATCH salje samo polja koja se menjaju
  const payload = {};

  // Dodajemo samo polja koja nisu prazna
  if (title.trim() !== '') {
    payload.title = title;
  }
  if (body.trim() !== '') {
    payload.body = body;
  }

  // Provera da li imamo sta da posaljemo
  if (Object.keys(payload).length === 0) {
    rezultatDiv.innerHTML = `<p style="color: red;">Morate popuniti bar jedno polje za PATCH zahtev!</p>`;
    return;
  }

  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  rezultatDiv.innerHTML = `
    <h3>PATCH - Server je vratio:</h3>
    <p><strong>ID:</strong> ${data.id}</p>
    <p><strong>Naslov:</strong> ${data.title}</p>
    <p><strong>Sadržaj:</strong> ${data.body}</p>
    <p><strong>User ID:</strong> ${data.userId}</p>
    <p><em>Samo izmenjena polja su poslata: ${Object.keys(payload).join(', ')}</em></p>
  `;

  console.log('PATCH odgovor:', data);
  console.log('Poslati podaci:', payload);
});

// Napraviti PUT i PATCH forme za /todos i /users endpoint-e.
