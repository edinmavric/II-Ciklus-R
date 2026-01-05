// ============================================
// REŠENJE - Fetch API Vežba (async/await)
// ============================================

const API_URL = 'https://jsonplaceholder.typicode.com';

// ============================================
// HELPER FUNKCIJE
// ============================================

const rezultat = document.getElementById('rezultat');

function prikazi(tekst, tip = '') {
    rezultat.className = tip;
    rezultat.textContent = tekst;
}

function prikaziJSON(data) {
    rezultat.className = 'success';
    rezultat.textContent = JSON.stringify(data, null, 2);
}

function prikaziGresku(error) {
    rezultat.className = 'error';
    rezultat.textContent = 'Greška: ' + error.message;
}

// ============================================
// ZADATAK 1: GET - Učitaj sve korisnike
// Ruta: GET /users
// ============================================
async function ucitajSveKorisnike() {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/users`);
        const data = await response.json();
        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 2: GET - Učitaj korisnika po ID-ju
// Ruta: GET /users/{id}
// ============================================
async function ucitajKorisnika(id) {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/users/${id}`);
        const data = await response.json();
        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 3: GET - Postovi korisnika (query parametar)
// Ruta: GET /posts?userId={id}
// ============================================
async function ucitajPostoveKorisnika(userId) {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts?userId=${userId}`);
        const data = await response.json();
        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 4: GET - Todos korisnika
// Ruta: GET /todos?userId={id}
// ============================================
async function ucitajTodosKorisnika(userId) {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/todos?userId=${userId}`);
        const data = await response.json();
        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 5: GET - Komentari posta (nested ruta)
// Ruta: GET /posts/{id}/comments
// ============================================
async function ucitajKomentare(postId) {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts/${postId}/comments`);
        const data = await response.json();
        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 6: GET - Postovi sa limitom
// Ruta: GET /posts?_start={start}&_limit={limit}
// ============================================
async function ucitajPostoveSaLimitom(start, limit) {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts?_start=${start}&_limit=${limit}`);
        const data = await response.json();
        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 7: POST - Kreiraj novi post
// Ruta: POST /posts
// ============================================
async function kreirajPost(title, body, userId) {
    prikazi('Kreiranje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: userId
            })
        });
        const data = await response.json();
        prikazi('KREIRANO!\n\n' + JSON.stringify(data, null, 2), 'success');
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 8: POST - Kreiraj novi todo
// Ruta: POST /todos
// ============================================
async function kreirajTodo(title, completed, userId) {
    prikazi('Kreiranje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/todos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                completed: completed,
                userId: userId
            })
        });
        const data = await response.json();
        prikazi('KREIRANO!\n\n' + JSON.stringify(data, null, 2), 'success');
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 9: PUT - Izmeni post kompletno
// Ruta: PUT /posts/{id}
// ============================================
async function izmeniPostPut(id, title, body, userId) {
    prikazi('Ažuriranje (PUT)...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                title: title,
                body: body,
                userId: userId
            })
        });
        const data = await response.json();
        prikazi('AŽURIRANO (PUT)!\n\n' + JSON.stringify(data, null, 2), 'success');
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 10: PATCH - Izmeni post delimično
// Ruta: PATCH /posts/{id}
// ============================================
async function izmeniPostPatch(id, title) {
    prikazi('Ažuriranje (PATCH)...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title
            })
        });
        const data = await response.json();
        prikazi('AŽURIRANO (PATCH)!\n\n' + JSON.stringify(data, null, 2), 'success');
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 11: DELETE - Obriši post
// Ruta: DELETE /posts/{id}
// ============================================
async function obrisiPost(id) {
    prikazi('Brisanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            prikazi(`Post ${id} je uspešno obrisan!`, 'success');
        } else {
            prikazi('Greška pri brisanju', 'error');
        }
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// ZADATAK 12: DELETE - Obriši todo
// Ruta: DELETE /todos/{id}
// ============================================
async function obrisiTodo(id) {
    prikazi('Brisanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            prikazi(`Todo ${id} je uspešno obrisan!`, 'success');
        } else {
            prikazi('Greška pri brisanju', 'error');
        }
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// HELPER: Učitaj post za PUT formu
// ============================================
async function ucitajPostZaPut(id) {
    prikazi('Učitavanje...', 'loading');

    try {
        const response = await fetch(`${API_URL}/posts/${id}`);
        const data = await response.json();

        document.getElementById('putTitle').value = data.title;
        document.getElementById('putBody').value = data.body;
        document.getElementById('putUserId').value = data.userId;

        prikaziJSON(data);
    } catch (error) {
        prikaziGresku(error);
    }
}

// ============================================
// EVENT LISTENERS
// ============================================

document.getElementById('btn-svi-korisnici').addEventListener('click', ucitajSveKorisnike);

document.getElementById('btn-korisnik').addEventListener('click', () => {
    const id = document.getElementById('userId').value;
    ucitajKorisnika(id);
});

document.getElementById('btn-postovi-korisnika').addEventListener('click', () => {
    const userId = document.getElementById('userIdZaPostove').value;
    ucitajPostoveKorisnika(userId);
});

document.getElementById('btn-todos').addEventListener('click', () => {
    const userId = document.getElementById('userIdZaTodos').value;
    ucitajTodosKorisnika(userId);
});

document.getElementById('btn-komentari').addEventListener('click', () => {
    const postId = document.getElementById('postIdZaKomentare').value;
    ucitajKomentare(postId);
});

document.getElementById('btn-postovi-limit').addEventListener('click', () => {
    const start = document.getElementById('postStart').value;
    const limit = document.getElementById('postLimit').value;
    ucitajPostoveSaLimitom(start, limit);
});

document.getElementById('btn-kreiraj-post').addEventListener('click', () => {
    const title = document.getElementById('postTitle').value;
    const body = document.getElementById('postBody').value;
    const userId = parseInt(document.getElementById('postUserId').value);
    kreirajPost(title, body, userId);
});

document.getElementById('btn-kreiraj-todo').addEventListener('click', () => {
    const title = document.getElementById('todoTitle').value;
    const completed = document.getElementById('todoCompleted').checked;
    const userId = parseInt(document.getElementById('todoUserId').value);
    kreirajTodo(title, completed, userId);
});

document.getElementById('btn-ucitaj-za-put').addEventListener('click', () => {
    const id = document.getElementById('putPostId').value;
    ucitajPostZaPut(id);
});

document.getElementById('btn-put').addEventListener('click', () => {
    const id = parseInt(document.getElementById('putPostId').value);
    const title = document.getElementById('putTitle').value;
    const body = document.getElementById('putBody').value;
    const userId = parseInt(document.getElementById('putUserId').value);
    izmeniPostPut(id, title, body, userId);
});

document.getElementById('btn-patch').addEventListener('click', () => {
    const id = document.getElementById('patchPostId').value;
    const title = document.getElementById('patchTitle').value;
    izmeniPostPatch(id, title);
});

document.getElementById('btn-delete').addEventListener('click', () => {
    const id = document.getElementById('deletePostId').value;
    if (confirm(`Da li ste sigurni da želite da obrišete post ${id}?`)) {
        obrisiPost(id);
    }
});

document.getElementById('btn-delete-todo').addEventListener('click', () => {
    const id = document.getElementById('deleteTodoId').value;
    if (confirm(`Da li ste sigurni da želite da obrišete todo ${id}?`)) {
        obrisiTodo(id);
    }
});
