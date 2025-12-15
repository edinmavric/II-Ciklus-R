// 1. Hvatamo formu iz HTML-a
const form = document.getElementById('postForm');
const rezultatDiv = document.getElementById('rezultat');

// 2. Dodajemo event listener za submit
form.addEventListener('submit', async function (event) {
  // Sprecavamo reload stranice
  event.preventDefault();

  // 3. Uzimamo vrednosti iz inputa
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  const userId = document.getElementById('userId').value;
  // Za "completed" na /todos endpoint-u:
  // const checked = document.getElementById('isCompleted').checked;

  const payload = {
    title: title,
    body: body,
    userId: userId,
  };

  // 4. Saljemo POST zahtev
  const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  // 5. Pretvaramo odgovor u JSON
  const data = await response.json();

  // 6. Prikazujemo rezultat na stranici
  rezultatDiv.innerHTML = `
    <h3>Server je vratio:</h3>
    <p><strong>ID:</strong> ${data.id}</p>
    <p><strong>Naslov:</strong> ${data.title}</p>
    <p><strong>Sadržaj:</strong> ${data.body}</p>
    <p><strong>User ID:</strong> ${data.userId}</p>
  `;

  console.log('Odgovor servera:', data);
});

// Napraviti 3 forme za pravljenje podataka sa POST metodom: /comments, /todos, /albums.
