// 1. Hvatamo formu iz HTML-a
const form = document.getElementById('deletePostForm');
const rezultatDiv = document.getElementById('rezultat');

// 2. Dodajemo event listener za submit
form.addEventListener('submit', async function (event) {
  // Sprecavamo reload stranice
  event.preventDefault();

  // 3. Uzimamo vrednost iz inputa
  const postId = document.getElementById('postId').value;

  // 4. Saljemo DELETE zahtev
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE',
  });

  // 5. Proveravamo status odgovora
  if (response.ok) {
    // 6. Prikazujemo rezultat na stranici
    rezultatDiv.innerHTML = `
      <h3>Server je vratio:</h3>
      <p><strong>Status:</strong> ${response.status}</p>
      <p><strong>Poruka:</strong> Post sa ID-jem ${postId} je uspešno obrisan!</p>
    `;
  } else {
    rezultatDiv.innerHTML = `
      <h3>Greška:</h3>
      <p><strong>Status:</strong> ${response.status}</p>
      <p><strong>Poruka:</strong> Došlo je do greške pri brisanju.</p>
    `;
  } 

  console.log('Status odgovora:', response.status);
});

// Napraviti 3 forme za brisanje podataka sa DELETE metodom: /comments, /todos, /albums.
