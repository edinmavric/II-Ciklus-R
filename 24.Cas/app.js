const API_URL = 'https://jsonplaceholder.typicode.com';

// ============================================
// HELPER FUNKCIJE (NE MENJATI)
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
}

// ============================================
// ZADATAK 2: GET - Učitaj korisnika po ID-ju
// Ruta: GET /users/{id}
// ============================================
async function ucitajKorisnika(id) {
}

// ============================================
// ZADATAK 3: GET - Postovi korisnika (query parametar)
// Ruta: GET /posts?userId={id}
// ============================================
async function ucitajPostoveKorisnika(userId) {
}

// ============================================
// ZADATAK 4: GET - Todos korisnika
// Ruta: GET /todos?userId={id}
// ============================================
async function ucitajTodosKorisnika(userId) {
}

// ============================================
// ZADATAK 5: GET - Komentari posta (nested ruta)
// Ruta: GET /posts/{id}/comments
// ============================================
async function ucitajKomentare(postId) {
}

// ============================================
// ZADATAK 6: GET - Postovi sa limitom
// Ruta: GET /posts?_start={start}&_limit={limit}
// ============================================
async function ucitajPostoveSaLimitom(start, limit) {
}

// ============================================
// ZADATAK 7: POST - Kreiraj novi post
// Ruta: POST /posts
// ============================================
async function kreirajPost(title, body, userId) {
}

// ============================================
// ZADATAK 8: POST - Kreiraj novi todo
// Ruta: POST /todos
// ============================================
async function kreirajTodo(title, completed, userId) {
}

// ============================================
// ZADATAK 9: PUT - Izmeni post kompletno
// Ruta: PUT /posts/{id}
// ============================================
async function izmeniPostPut(id, title, body, userId) {
}

// ============================================
// ZADATAK 10: PATCH - Izmeni post delimično
// Ruta: PATCH /posts/{id}
// ============================================
async function izmeniPostPatch(id, title) {
}

// ============================================
// ZADATAK 11: DELETE - Obriši post
// Ruta: DELETE /posts/{id}
// ============================================
async function obrisiPost(id) {
}

// ============================================
// ZADATAK 12: DELETE - Obriši todo
// Ruta: DELETE /todos/{id}
// ============================================
async function obrisiTodo(id) {
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
// EVENT LISTENERS (NE MENJATI)
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
