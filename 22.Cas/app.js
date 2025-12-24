// ==========================================
// GLOBALNE VARIJABLE
// ==========================================
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';
let selectedUserId = null;
let userPosts = []; // Čuvamo postove lokalno za manipulaciju

// ==========================================
// DOM ELEMENTI
// ==========================================
const usersBody = document.getElementById('users-body');
const postsSection = document.getElementById('posts-section');
const postsList = document.getElementById('posts-list');
const selectedUserName = document.getElementById('selected-user-name');
const postForm = document.getElementById('post-form');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

// ==========================================
// POMOĆNE FUNKCIJE
// ==========================================

// Prikazuje loading indikator
function showLoading() {
    loadingEl.classList.remove('hidden');
}

// Sakriva loading indikator
function hideLoading() {
    loadingEl.classList.add('hidden');
}

// Prikazuje grešku korisniku
function showError(message) {
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');

    // Automatski sakrij grešku nakon 5 sekundi
    setTimeout(() => {
        errorEl.classList.add('hidden');
    }, 5000);
}

// Sakriva grešku
function hideError() {
    errorEl.classList.add('hidden');
}

// ==========================================
// GET - DOHVATANJE KORISNIKA
// ==========================================
async function fetchUsers() {
    showLoading();
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/users`);

        if (!response.ok) {
            throw new Error('Greška pri dohvatanju korisnika');
        }

        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Greška:', error);
        showError('Nije moguće učitati korisnike. Molimo pokušajte ponovo.');
    } finally {
        hideLoading();
    }
}

// Prikazuje korisnike u tabeli
function displayUsers(users) {
    usersBody.innerHTML = '';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.id = 'user-row-' + user.id;

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.address.city}</td>
            <td>
                <button class="btn btn-primary" onclick="selectUser(${user.id}, '${user.name}')">
                    Prikaži postove
                </button>
            </td>
        `;

        usersBody.appendChild(row);
    });
}

// ==========================================
// GET - DOHVATANJE POSTOVA KORISNIKA
// ==========================================
async function selectUser(userId, userName) {
    // Označi aktivnog korisnika u tabeli
    document.querySelectorAll('#users-body tr').forEach(row => {
        row.classList.remove('active');
    });
    document.getElementById('user-row-' + userId).classList.add('active');

    selectedUserId = userId;
    selectedUserName.textContent = userName;

    showLoading();
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/posts?userId=${userId}`);

        if (!response.ok) {
            throw new Error('Greška pri dohvatanju postova');
        }

        userPosts = await response.json();
        displayPosts();
        postsSection.classList.remove('hidden');
    } catch (error) {
        console.error('Greška:', error);
        showError('Nije moguće učitati postove. Molimo pokušajte ponovo.');
    } finally {
        hideLoading();
    }
}

// Prikazuje postove
function displayPosts() {
    postsList.innerHTML = '';

    if (userPosts.length === 0) {
        postsList.innerHTML = '<p>Nema postova za ovog korisnika.</p>';
        return;
    }

    userPosts.forEach(post => {
        const postCard = createPostCard(post);
        postsList.appendChild(postCard);
    });
}

// Kreira HTML karticu za post
function createPostCard(post) {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.id = 'post-' + post.id;

    div.innerHTML = `
        <h4 class="post-title">${post.title}</h4>
        <p class="post-body">${post.body}</p>
        <div class="post-actions">
            <button class="btn btn-warning" onclick="editPost(${post.id})">Izmeni</button>
            <button class="btn btn-danger" onclick="deletePost(${post.id})">Obriši</button>
        </div>
    `;

    return div;
}

// ==========================================
// POST - KREIRANJE NOVOG POSTA
// ==========================================
postForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const title = document.getElementById('post-title').value.trim();
    const body = document.getElementById('post-body').value.trim();

    if (!title || !body) {
        showError('Molimo popunite sva polja.');
        return;
    }

    showLoading();
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/posts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                userId: selectedUserId
            })
        });

        if (!response.ok) {
            throw new Error('Greška pri kreiranju posta');
        }

        const newPost = await response.json();

        // Dodaj novi post na početak liste
        userPosts.unshift(newPost);
        displayPosts();

        // Resetuj formu
        postForm.reset();

        // Prikaži uspešnu poruku
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Post uspešno kreiran!';
        postsList.insertBefore(successMsg, postsList.firstChild);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);

    } catch (error) {
        console.error('Greška:', error);
        showError('Nije moguće kreirati post. Molimo pokušajte ponovo.');
    } finally {
        hideLoading();
    }
});

// ==========================================
// PUT/PATCH - IZMENA POSTA
// ==========================================
function editPost(postId) {
    const postCard = document.getElementById('post-' + postId);
    const post = userPosts.find(p => p.id === postId);

    if (!post || !postCard) return;

    // Prebaci karticu u edit mode
    postCard.classList.add('editing');

    postCard.innerHTML = `
        <input type="text" class="edit-title" value="${post.title}">
        <textarea class="edit-body">${post.body}</textarea>
        <div class="post-actions">
            <button class="btn btn-success" onclick="savePost(${postId})">Sačuvaj</button>
            <button class="btn btn-secondary" onclick="cancelEdit(${postId})">Otkaži</button>
        </div>
    `;
}

async function savePost(postId) {
    const postCard = document.getElementById('post-' + postId);
    const newTitle = postCard.querySelector('.edit-title').value.trim();
    const newBody = postCard.querySelector('.edit-body').value.trim();

    if (!newTitle || !newBody) {
        showError('Naslov i sadržaj ne mogu biti prazni.');
        return;
    }

    showLoading();
    hideError();

    try {
        // Koristimo PATCH jer menjamo samo neka polja (title i body)
        // PUT bi zahtevao da pošaljemo ceo objekat
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newTitle,
                body: newBody
            })
        });

        if (!response.ok) {
            throw new Error('Greška pri ažuriranju posta');
        }

        const updatedPost = await response.json();

        // Ažuriraj post u lokalnoj listi
        const postIndex = userPosts.findIndex(p => p.id === postId);
        if (postIndex !== -1) {
            userPosts[postIndex] = { ...userPosts[postIndex], ...updatedPost };
        }

        // Ponovo prikaži postove
        displayPosts();

    } catch (error) {
        console.error('Greška:', error);
        showError('Nije moguće ažurirati post. Molimo pokušajte ponovo.');
    } finally {
        hideLoading();
    }
}

function cancelEdit(postId) {
    // Ponovo prikaži postove da bi se vratili na normalan prikaz
    displayPosts();
}

// ==========================================
// DELETE - BRISANJE POSTA
// ==========================================
async function deletePost(postId) {
    // Potvrda pre brisanja
    const confirmed = confirm('Da li ste sigurni da želite da obrišete ovaj post?');

    if (!confirmed) return;

    showLoading();
    hideError();

    try {
        const response = await fetch(`${API_BASE_URL}/posts/${postId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Greška pri brisanju posta');
        }

        // Ukloni post iz lokalne liste
        userPosts = userPosts.filter(post => post.id !== postId);

        // Ponovo prikaži postove
        displayPosts();

        // Prikaži uspešnu poruku
        const successMsg = document.createElement('div');
        successMsg.className = 'success-message';
        successMsg.textContent = 'Post uspešno obrisan!';
        postsList.insertBefore(successMsg, postsList.firstChild);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);

    } catch (error) {
        console.error('Greška:', error);
        showError('Nije moguće obrisati post. Molimo pokušajte ponovo.');
    } finally {
        hideLoading();
    }
}

// ==========================================
// INICIJALIZACIJA
// ==========================================
// Učitaj korisnike kada se stranica učita
document.addEventListener('DOMContentLoaded', fetchUsers);
