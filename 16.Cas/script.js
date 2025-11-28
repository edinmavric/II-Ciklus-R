const API_URL = 'https://jsonplaceholder.typicode.com';

// Sekcije
const usersSection = document.getElementById('usersSection');
const postsSection = document.getElementById('postsSection');
const commentsSection = document.getElementById('commentsSection');

// Liste za ispis
const usersList = document.getElementById('usersList');
const postsList = document.getElementById('postsList');
const commentsList = document.getElementById('commentsList');

// Dugmad
document.getElementById('backToUsers').onclick = () => {
  postsSection.style.display = 'none';
  commentsSection.style.display = 'none';
  usersSection.style.display = 'block';
};

document.getElementById('backToPosts').onclick = () => {
  commentsSection.style.display = 'none';
  postsSection.style.display = 'block';
};

// Store all users data
let allUsers = [];

// 1. Učitavanje korisnika
// Load all users and display them
async function loadUsers() {
  const res = await fetch(`${API_URL}/users`);
  allUsers = await res.json();

  // [<div class="item">${user.name}</div>,<div class="item">${user.name}</div>,<div class="item">${user.name}</div>].join('')
  // = <div class="item">${user.name}</div><div class="item">${user.name}</div><div class="item">${user.name}</div>
  usersList.innerHTML = allUsers
    .map(user => `<div class="item">${user.name}</div>`)
    .join('');
}

loadUsers();

// 2. Klik na korisnika -> učitaj njegove postove
// EVENT DELEGACIJA

usersList.addEventListener('click', async e => {
  const name = e.target.textContent;
  const user = allUsers.find(u => u.name === name);  
  const id = user.id;
  if (!id) return;

  // Prikaži posts sekciju
  usersSection.style.display = 'none';
  postsSection.style.display = 'block';

  const res = await fetch(`${API_URL}/posts?userId=${id}`);
  allPosts = await res.json();

  postsList.innerHTML = allPosts
    .map(post => `<div class="item">${post.title}</div>`)
    .join('');
});

// --------------------------------------------
// 3. Klik na post -> učitaj komentare
// EVENT DELEGACIJA
// Store posts data
let allPosts = [];

postsList.addEventListener('click', async e => {
  const title = e.target.textContent;
  const post = allPosts.find(p => p.title === title);
  const id = post?.id;
  if (!id) return;

  postsSection.style.display = 'none';
  commentsSection.style.display = 'block';

  const res = await fetch(`${API_URL}/comments?postId=${id}`);
  const comments = await res.json();

  commentsList.innerHTML = comments
    .map(
      c => `
      <div class="item">
        <strong>${c.name}</strong><br/>
        ${c.body}
      </div>
    `
    )
    .join('');
});
