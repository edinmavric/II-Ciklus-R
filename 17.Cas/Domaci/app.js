const API_URL = 'https://jsonplaceholder.typicode.com';

// DOM elementi
const loadingIndicator = document.getElementById('loadingIndicator');
const usersContainer = document.getElementById('usersContainer');
const detailedView = document.getElementById('detailedView');
const userDetailContainer = document.getElementById('userDetailContainer');
const postsContainer = document.getElementById('postsContainer');
const backButton = document.getElementById('backButton');

// Globalna promenljiva za cuvanje korisnika
let allUsers = [];

// 1. Ucitavanje svih korisnika
async function loadAllUsers() {
  try {
    const res = await fetch(`${API_URL}/users`);
    return await res.json();
  } catch (error) {
    console.error('Greska pri ucitavanju korisnika:', error);
    return [];
  }
}

// 2. Ucitavanje postova za korisnika
async function getUserPosts(userId) {
  try {
    const res = await fetch(`${API_URL}/posts?userId=${userId}`);
    return await res.json();
  } catch (error) {
    console.error('Greska pri ucitavanju postova:', error);
    return [];
  }
}

// 3. Ucitavanje komentara za post
async function getPostComments(postId) {
  try {
    const res = await fetch(`${API_URL}/comments?postId=${postId}`);
    return await res.json();
  } catch (error) {
    console.error('Greska pri ucitavanju komentara:', error);
    return [];
  }
}

// 4. Prikaz korisnika u grid-u
function displayUsers(users) {
  usersContainer.innerHTML = '';

  users.forEach(user => {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = `
      <h2>${user.name}</h2>
      <p><strong>Username:</strong> ${user.username}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Website:</strong> ${user.website}</p>
      <p><strong>Kompanija:</strong> ${user.company.name}</p>
      <p><strong>Grad:</strong> ${user.address.city}</p>
      <p><strong>Adresa:</strong> ${user.address.street}, ${user.address.suite}</p>
      <p><strong>Broj Postova:</strong> <span id="postCount-${user.id}">0</span></p>
      <button onclick="showUserDetail(${user.id})">Prikazi Postove</button>
    `;
    usersContainer.appendChild(userCard);
  });

  // Ucitaj broj postova za svakog korisnika
  users.forEach(async (user) => {
    const posts = await getUserPosts(user.id);
    const postCountSpan = document.getElementById(`postCount-${user.id}`);
    if (postCountSpan) {
      postCountSpan.textContent = posts.length;
    }
  });
}

// 5. Prikaz detaljnog pregleda korisnika
async function showUserDetail(userId) {
  // Pronadji korisnika
  const user = allUsers.find(u => u.id === userId);
  if (!user) return;

  // Sakrij grid korisnika, prikazi detaljni pregled
  usersContainer.style.display = 'none';
  detailedView.style.display = 'block';

  // Prikazi loading
  userDetailContainer.innerHTML = '<p>Ucitavanje...</p>';
  postsContainer.innerHTML = '';

  // Prikazi detalje korisnika
  userDetailContainer.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    <p><strong>Kompanija:</strong> ${user.company.name}</p>
    <p><strong>Kompanija Slogan:</strong> ${user.company.catchPhrase}</p>
    <p><strong>Grad:</strong> ${user.address.city}</p>
    <p><strong>Adresa:</strong> ${user.address.street}, ${user.address.suite}</p>
    <p><strong>Postanski Broj:</strong> ${user.address.zipcode}</p>
  `;

  // Ucitaj postove korisnika
  const posts = await getUserPosts(userId);

  // Prikazi postove
  postsContainer.innerHTML = `<h3>Postovi korisnika (${posts.length})</h3>`;

  posts.forEach(post => {
    const postDiv = document.createElement('div');
    postDiv.className = 'post';
    postDiv.innerHTML = `
      <h4>${post.title}</h4>
      <p>${post.body.substring(0, 100)}...</p>
      <p class="post-meta">Klikni za prikaz komentara</p>
      <div id="comments-${post.id}" class="comments"></div>
    `;
    postDiv.onclick = () => togglePostComments(post.id);
    postsContainer.appendChild(postDiv);
  });
}

// 6. Prikaz/sakrivanje komentara za post
async function togglePostComments(postId) {
  const commentsDiv = document.getElementById(`comments-${postId}`);

  // Ako su komentari vec otvoreni, zatvori ih
  if (commentsDiv.classList.contains('open')) {
    commentsDiv.classList.remove('open');
    return;
  }

  // Zatvori sve ostale komentare
  document.querySelectorAll('.comments.open').forEach(el => {
    el.classList.remove('open');
  });

  // Prikazi loading
  commentsDiv.innerHTML = '<p>Ucitavanje komentara...</p>';
  commentsDiv.classList.add('open');

  // Ucitaj komentare
  const comments = await getPostComments(postId);

  // Prikazi komentare
  if (comments.length === 0) {
    commentsDiv.innerHTML = '<p>Nema komentara za ovaj post.</p>';
  } else {
    commentsDiv.innerHTML = `<h4>Komentari (${comments.length})</h4>`;
    comments.forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.className = 'comment';
      commentDiv.innerHTML = `
        <strong>${comment.name}</strong>
        <p class="comment-email">${comment.email}</p>
        <p class="comment-body">${comment.body}</p>
      `;
      commentsDiv.appendChild(commentDiv);
    });
  }
}

// 7. Povratak na listu korisnika
function goBack() {
  detailedView.style.display = 'none';
  usersContainer.style.display = 'grid';
}

// 8. Inicijalizacija dashboard-a
async function initDashboard() {
  // Prikazi loading indicator
  loadingIndicator.style.display = 'block';
  usersContainer.style.display = 'none';

  // Ucitaj sve korisnike
  allUsers = await loadAllUsers();

  // Sakrij loading, prikazi korisnike
  loadingIndicator.style.display = 'none';
  usersContainer.style.display = 'grid';

  // Prikazi korisnike
  displayUsers(allUsers);
}

// Event listener za dugme nazad
backButton.addEventListener('click', goBack);

// Inicijalizuj aplikaciju pri ucitavanju
document.addEventListener('DOMContentLoaded', initDashboard);
