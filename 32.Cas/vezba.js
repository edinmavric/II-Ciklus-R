// ============================================
// 32. ČAS - KLASE I ASINHRONI KOD - VEŽBE
// ============================================

// API za sve vežbe: https://jsonplaceholder.typicode.com

// ============================================
// VEŽBA 1: UserLoader klasa
// ============================================
// Kreiraj klasu UserLoader koja učitava korisnike sa API-ja.
//
// UserLoader:
// - constructor() - postavi baseUrl na "https://jsonplaceholder.typicode.com"
// - async getAllUsers() - GET /users, vraća niz korisnika
// - async getUserById(id) - GET /users/:id, vraća jednog korisnika
// - async getUsersByCity(city) - učitaj sve korisnike, pa filtriraj po gradu
//   (korisnik.address.city)
//
// Sve metode moraju imati try/catch i proveriti response.ok!
// U slučaju greške, vrati [] za nizove ili null za jednog korisnika.

class UserLoader {
  // TVOJ KOD OVDE
}

// Testiraj:
// (async () => {
//   const loader = new UserLoader();
//
//   const svi = await loader.getAllUsers();
//   console.log(`Ukupno korisnika: ${svi.length}`); // 10
//
//   const user = await loader.getUserById(1);
//   console.log(`Korisnik: ${user.name}`); // "Leanne Graham"
//
//   const izGwenborough = await loader.getUsersByCity("Gwenborough");
//   console.log(`Iz Gwenborough: ${izGwenborough.length}`); // 1
//   console.log(izGwenborough[0].name); // "Leanne Graham"
//
//   const nepostojeci = await loader.getUserById(999);
//   console.log(`Nepostojeći: ${nepostojeci}`); // null
// })();

// ============================================
// VEŽBA 2: PostManager klasa (CRUD)
// ============================================
// Kreiraj klasu PostManager koja radi kompletne CRUD operacije nad postovima.
//
// PostManager:
// - constructor() - postavi baseUrl, i this.posts = []
// - async loadPosts(limit) - GET /posts?_limit=X, sačuvaj u this.posts, vrati ih
// - async createPost(title, body) - POST /posts sa title, body, userId: 1
//   Dodaj kreirani post u this.posts i vrati ga
// - async updatePost(id, newTitle) - PATCH /posts/:id sa novim title-om, vrati ažurirani post
// - async deletePost(id) - DELETE /posts/:id, ukloni iz this.posts, vrati true/false
// - getLocalPosts() - sinhrona metoda, vraća this.posts (lokalni keš)
//
// Sve async metode moraju imati try/catch i proveriti response.ok!

class PostManager {
  // TVOJ KOD OVDE
}

// Testiraj:
// (async () => {
//   const pm = new PostManager();
//
//   // Učitaj postove
//   const posts = await pm.loadPosts(3);
//   console.log(`Učitano: ${posts.length} postova`); // 3
//
//   // Kreiraj novi post
//   const novi = await pm.createPost("Test naslov", "Test sadržaj");
//   console.log(`Kreiran: ${novi.title}`); // "Test naslov"
//   console.log(`Lokalno: ${pm.getLocalPosts().length} postova`); // 4
//
//   // Ažuriraj post
//   const azuriran = await pm.updatePost(1, "Novi naslov");
//   console.log(`Ažuriran: ${azuriran.title}`); // "Novi naslov"
//
//   // Obriši post
//   const obrisan = await pm.deletePost(1);
//   console.log(`Obrisan: ${obrisan}`); // true
//   console.log(`Lokalno: ${pm.getLocalPosts().length} postova`); // 3
// })();

// ============================================
// VEŽBA 3: CommentService sa paralelnim učitavanjem
// ============================================
// Kreiraj klasu CommentService koja učitava komentare za postove.
//
// CommentService:
// - constructor() - postavi baseUrl
// - async getCommentsForPost(postId) - GET /posts/:postId/comments
// - async getCommentsForMultiplePosts(postIds) - koristi Promise.all da
//   paralelno učita komentare za sve postId-jeve iz niza.
//   Vrati objekat gde je ključ postId, a vrednost niz komentara.
//   Primer: { 1: [...komentari], 2: [...komentari] }
// - async getCommentStats(postIds) - koristi getCommentsForMultiplePosts,
//   pa vrati statistiku za svaki post:
//   { postId: X, commentCount: Y, emails: [...email adrese komentatora] }

class CommentService {
  // TVOJ KOD OVDE
}

// Testiraj:
// (async () => {
//   const cs = new CommentService();
//
//   // Komentari za jedan post
//   const komentari = await cs.getCommentsForPost(1);
//   console.log(`Post 1 ima ${komentari.length} komentara`); // 5
//
//   // Komentari za više postova paralelno
//   const vise = await cs.getCommentsForMultiplePosts([1, 2, 3]);
//   console.log(`Post 1: ${vise[1].length} komentara`); // 5
//   console.log(`Post 2: ${vise[2].length} komentara`); // 5
//   console.log(`Post 3: ${vise[3].length} komentara`); // 5
//
//   // Statistika
//   const stats = await cs.getCommentStats([1, 2]);
//   console.log(stats);
//   // [
//   //   { postId: 1, commentCount: 5, emails: ["Eliseo@gardner.biz", ...] },
//   //   { postId: 2, commentCount: 5, emails: ["Preez@myrl.com", ...] }
//   // ]
// })();

// ============================================
// VEŽBA 4: TodoApp klasa (napredna)
// ============================================
// Kreiraj klasu TodoApp koja upravlja todo listom sa API-jem.
//
// TodoApp:
// - constructor() - postavi baseUrl, this.todos = []
// - async init(limit) - učitaj todo-ve sa API-ja (GET /todos?_limit=X),
//   sačuvaj u this.todos, vrati this (za chaining)
// - async addTodo(title) - POST /todos sa { title, completed: false, userId: 1 },
//   dodaj u this.todos, vrati kreirani todo
// - async toggleTodo(id) - nađi todo u this.todos po id-u,
//   PATCH /todos/:id sa { completed: !trenutnoStanje },
//   ažuriraj lokalni todo, vrati ga
// - async removeTodo(id) - DELETE /todos/:id, ukloni iz this.todos, vrati true/false
// - getStats() - sinhrona metoda, vrati objekat:
//   { total: X, completed: Y, active: Z, completionRate: "X%" }
// - getActiveTodos() - sinhrona metoda, vrati samo nezavršene todo-ve
// - getCompletedTodos() - sinhrona metoda, vrati samo završene todo-ve
//
// Sve async metode moraju imati try/catch!

class TodoApp {
  // TVOJ KOD OVDE
}

// Testiraj:
// (async () => {
//   const app = new TodoApp();
//   await app.init(5);
//
//   console.log('Statistika:', app.getStats());
//   // { total: 5, completed: X, active: Y, completionRate: "Z%" }
//
//   console.log('Aktivni:', app.getActiveTodos().length);
//   console.log('Završeni:', app.getCompletedTodos().length);
//
//   const novi = await app.addTodo("Naučiti async/await");
//   console.log('Dodat:', novi.title); // "Naučiti async/await"
//   console.log('Ukupno:', app.getStats().total); // 6
//
//   const toggled = await app.toggleTodo(1);
//   console.log(`Todo 1 completed: ${toggled.completed}`); // suprotno od prethodnog
//
//   const removed = await app.removeTodo(1);
//   console.log(`Obrisan: ${removed}`); // true
//   console.log('Ukupno:', app.getStats().total); // 5
// })();

// ============================================
// VEŽBA 5: ApiService - univerzalna bazna klasa
// ============================================
// Kreiraj univerzalnu ApiService klasu koja može da radi sa bilo kojim resursom.
//
// ApiService:
// - constructor(baseUrl) - postavi bazni URL
// - async _request(endpoint, options) - privatna helper metoda:
//   * Napravi fetch sa url = baseUrl + endpoint
//   * Automatski dodaj headers: { "Content-Type": "application/json" }
//   * Proveri response.ok, ako nije baci grešku
//   * Parsiraj i vrati JSON
//   * U catch bloku: loguj grešku i vrati null
//
// - async getAll(resource) - GET /{resource}
// - async getOne(resource, id) - GET /{resource}/{id}
// - async create(resource, data) - POST /{resource} sa JSON telom
// - async update(resource, id, data) - PATCH /{resource}/{id} sa JSON telom
// - async delete(resource, id) - DELETE /{resource}/{id}, vrati true/false
//
// Ideja: jedna klasa za SVE resurse (users, posts, todos, comments...)

class ApiService {
  // TVOJ KOD OVDE
}

// Testiraj:
// (async () => {
//   const api = new ApiService("https://jsonplaceholder.typicode.com");
//
//   // Radi sa userima
//   const users = await api.getAll("/users");
//   console.log(`Korisnika: ${users.length}`); // 10
//
//   const user = await api.getOne("/users", 1);
//   console.log(`User: ${user.name}`); // "Leanne Graham"
//
//   // Radi sa postovima
//   const posts = await api.getAll("/posts");
//   console.log(`Postova: ${posts.length}`); // 100
//
//   const newPost = await api.create("/posts", {
//     title: "Univerzalni API",
//     body: "Jedna klasa za sve!",
//     userId: 1
//   });
//   console.log(`Kreiran: ${newPost.title}`); // "Univerzalni API"
//
//   const updated = await api.update("/posts", 1, { title: "Izmenjen" });
//   console.log(`Ažuriran: ${updated.title}`); // "Izmenjen"
//
//   const deleted = await api.delete("/posts", 1);
//   console.log(`Obrisan: ${deleted}`); // true
//
//   // Radi sa todovima
//   const todos = await api.getAll("/todos");
//   console.log(`Todova: ${todos.length}`); // 200
// })();
