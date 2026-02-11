// ============================================
// 32. ČAS - KLASE I ASINHRONI KOD - REŠENJA
// ============================================

// ============================================
// REŠENJE 1: UserLoader klasa
// ============================================

class UserLoader {
  constructor() {
    this.baseUrl = 'https://jsonplaceholder.typicode.com';
  }

  async getAllUsers() {
    try {
      const response = await fetch(`${this.baseUrl}/users`);
      if (!response.ok) {
        throw new Error(`HTTP greška: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Greška pri učitavanju korisnika:', error.message);
      return [];
    }
  }

  async getUserById(id) {
    try {
      const response = await fetch(`${this.baseUrl}/users/${id}`);
      if (!response.ok) {
        throw new Error(`Korisnik ${id} nije pronađen (${response.status})`);
      }
      return await response.json();
    } catch (error) {
      console.error('Greška:', error.message);
      return null;
    }
  }

  async getUsersByCity(city) {
    try {
      const allUsers = await this.getAllUsers();
      return allUsers.filter(
        (user) => user.address.city.toLowerCase() === city.toLowerCase()
      );
    } catch (error) {
      console.error('Greška pri filtriranju po gradu:', error.message);
      return [];
    }
  }
}

(async () => {
  console.log('=== REŠENJE 1: UserLoader ===\n');

  const loader = new UserLoader();

  const svi = await loader.getAllUsers();
  console.log(`Ukupno korisnika: ${svi.length}`);

  const user = await loader.getUserById(1);
  console.log(`Korisnik: ${user.name}`);

  const izGwenborough = await loader.getUsersByCity('Gwenborough');
  console.log(`Iz Gwenborough: ${izGwenborough.length}`);
  console.log(`  - ${izGwenborough[0].name}`);

  const nepostojeci = await loader.getUserById(999);
  console.log(`Nepostojeći: ${nepostojeci}`);

  // ============================================
  // REŠENJE 2: PostManager klasa (CRUD)
  // ============================================

  console.log('\n=== REŠENJE 2: PostManager (CRUD) ===\n');

  class PostManager {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com/posts';
      this.posts = [];
    }

    async loadPosts(limit = 10) {
      try {
        const response = await fetch(`${this.baseUrl}?_limit=${limit}`);
        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        this.posts = await response.json();
        return this.posts;
      } catch (error) {
        console.error('Load greška:', error.message);
        return [];
      }
    }

    async createPost(title, body) {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body, userId: 1 }),
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        const newPost = await response.json();
        this.posts.push(newPost);
        return newPost;
      } catch (error) {
        console.error('Create greška:', error.message);
        return null;
      }
    }

    async updatePost(id, newTitle) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: newTitle }),
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Update greška:', error.message);
        return null;
      }
    }

    async deletePost(id) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        this.posts = this.posts.filter((p) => p.id !== id);
        return true;
      } catch (error) {
        console.error('Delete greška:', error.message);
        return false;
      }
    }

    getLocalPosts() {
      return this.posts;
    }
  }

  const pm = new PostManager();

  const posts = await pm.loadPosts(3);
  console.log(`Učitano: ${posts.length} postova`);
  posts.forEach((p) => console.log(`  #${p.id}: ${p.title.substring(0, 40)}...`));

  const novi = await pm.createPost('Test naslov', 'Test sadržaj');
  console.log(`\nKreiran: ${novi.title}`);
  console.log(`Lokalno: ${pm.getLocalPosts().length} postova`);

  const azuriran = await pm.updatePost(1, 'Novi naslov');
  console.log(`\nAžuriran: ${azuriran.title}`);

  const obrisan = await pm.deletePost(1);
  console.log(`\nObrisan: ${obrisan}`);
  console.log(`Lokalno: ${pm.getLocalPosts().length} postova`);

  // ============================================
  // REŠENJE 3: CommentService sa paralelnim učitavanjem
  // ============================================

  console.log('\n=== REŠENJE 3: CommentService (Promise.all) ===\n');

  class CommentService {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

    async getCommentsForPost(postId) {
      try {
        const response = await fetch(`${this.baseUrl}/posts/${postId}/comments`);
        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error(`Greška za post ${postId}:`, error.message);
        return [];
      }
    }

    async getCommentsForMultiplePosts(postIds) {
      try {
        // Paralelno učitavanje svih komentara
        const results = await Promise.all(
          postIds.map((id) => this.getCommentsForPost(id))
        );

        // Pretvori u objekat { postId: [komentari] }
        const commentMap = {};
        postIds.forEach((id, index) => {
          commentMap[id] = results[index];
        });

        return commentMap;
      } catch (error) {
        console.error('Greška pri paralelnom učitavanju:', error.message);
        return {};
      }
    }

    async getCommentStats(postIds) {
      const commentsMap = await this.getCommentsForMultiplePosts(postIds);

      return postIds.map((postId) => {
        const comments = commentsMap[postId] || [];
        return {
          postId,
          commentCount: comments.length,
          emails: comments.map((c) => c.email),
        };
      });
    }
  }

  const cs = new CommentService();

  const komentari = await cs.getCommentsForPost(1);
  console.log(`Post 1 ima ${komentari.length} komentara`);
  komentari.forEach((k) => console.log(`  - ${k.name} (${k.email})`));

  console.log('');
  const start = Date.now();
  const vise = await cs.getCommentsForMultiplePosts([1, 2, 3]);
  console.log(`Paralelno učitavanje trajalo: ${Date.now() - start}ms`);
  console.log(`Post 1: ${vise[1].length} komentara`);
  console.log(`Post 2: ${vise[2].length} komentara`);
  console.log(`Post 3: ${vise[3].length} komentara`);

  console.log('');
  const stats = await cs.getCommentStats([1, 2]);
  stats.forEach((s) => {
    console.log(`Post ${s.postId}: ${s.commentCount} komentara`);
    console.log(`  Emailovi: ${s.emails.slice(0, 2).join(', ')}...`);
  });

  // ============================================
  // REŠENJE 4: TodoApp klasa (napredna)
  // ============================================

  console.log('\n=== REŠENJE 4: TodoApp ===\n');

  class TodoApp {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com';
      this.todos = [];
    }

    async init(limit = 10) {
      try {
        const response = await fetch(`${this.baseUrl}/todos?_limit=${limit}`);
        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        this.todos = await response.json();
        console.log(`Inicijalizovano ${this.todos.length} todo-va`);
        return this;
      } catch (error) {
        console.error('Init greška:', error.message);
        return this;
      }
    }

    async addTodo(title) {
      try {
        const response = await fetch(`${this.baseUrl}/todos`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, completed: false, userId: 1 }),
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        const newTodo = await response.json();
        this.todos.push(newTodo);
        return newTodo;
      } catch (error) {
        console.error('Add greška:', error.message);
        return null;
      }
    }

    async toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id);
      if (!todo) {
        console.error(`Todo ${id} ne postoji lokalno`);
        return null;
      }

      try {
        const response = await fetch(`${this.baseUrl}/todos/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ completed: !todo.completed }),
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        const updated = await response.json();
        todo.completed = updated.completed;
        return todo;
      } catch (error) {
        console.error('Toggle greška:', error.message);
        return null;
      }
    }

    async removeTodo(id) {
      try {
        const response = await fetch(`${this.baseUrl}/todos/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        this.todos = this.todos.filter((t) => t.id !== id);
        return true;
      } catch (error) {
        console.error('Remove greška:', error.message);
        return false;
      }
    }

    getStats() {
      const completed = this.todos.filter((t) => t.completed).length;
      const total = this.todos.length;
      const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
      return {
        total,
        completed,
        active: total - completed,
        completionRate: `${rate}%`,
      };
    }

    getActiveTodos() {
      return this.todos.filter((t) => !t.completed);
    }

    getCompletedTodos() {
      return this.todos.filter((t) => t.completed);
    }
  }

  const app = new TodoApp();
  await app.init(5);

  console.log('Statistika:', app.getStats());
  console.log(`Aktivni: ${app.getActiveTodos().length}`);
  console.log(`Završeni: ${app.getCompletedTodos().length}`);

  console.log('');
  const noviTodo = await app.addTodo('Naučiti async/await');
  console.log(`Dodat: ${noviTodo.title}`);
  console.log(`Ukupno: ${app.getStats().total}`);

  const toggled = await app.toggleTodo(1);
  console.log(`\nTodo 1 completed: ${toggled.completed}`);

  const removed = await app.removeTodo(1);
  console.log(`Obrisan: ${removed}`);
  console.log(`Ukupno: ${app.getStats().total}`);

  // ============================================
  // REŠENJE 5: ApiService - univerzalna bazna klasa
  // ============================================

  console.log('\n=== REŠENJE 5: ApiService (univerzalna) ===\n');

  class ApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }

    async _request(endpoint, options = {}) {
      try {
        const url = `${this.baseUrl}${endpoint}`;
        const defaultOptions = {
          headers: { 'Content-Type': 'application/json' },
        };

        const response = await fetch(url, { ...defaultOptions, ...options });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Neki odgovori (npr. DELETE) mogu imati prazan body
        const text = await response.text();
        return text ? JSON.parse(text) : null;
      } catch (error) {
        console.error(`API greška [${endpoint}]:`, error.message);
        return null;
      }
    }

    async getAll(resource) {
      return (await this._request(resource)) || [];
    }

    async getOne(resource, id) {
      return this._request(`${resource}/${id}`);
    }

    async create(resource, data) {
      return this._request(resource, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    }

    async update(resource, id, data) {
      return this._request(`${resource}/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    }

    async delete(resource, id) {
      const result = await this._request(`${resource}/${id}`, {
        method: 'DELETE',
      });
      return result !== null;
    }
  }

  const api = new ApiService('https://jsonplaceholder.typicode.com');

  // Users
  const users2 = await api.getAll('/users');
  console.log(`Korisnika: ${users2.length}`);

  const user2 = await api.getOne('/users', 1);
  console.log(`User: ${user2.name}`);

  // Posts
  const posts2 = await api.getAll('/posts');
  console.log(`\nPostova: ${posts2.length}`);

  const newPost = await api.create('/posts', {
    title: 'Univerzalni API',
    body: 'Jedna klasa za sve!',
    userId: 1,
  });
  console.log(`Kreiran: ${newPost.title}`);

  const updated = await api.update('/posts', 1, { title: 'Izmenjen' });
  console.log(`Ažuriran: ${updated.title}`);

  const deleted = await api.delete('/posts', 1);
  console.log(`Obrisan: ${deleted}`);

  // Todos
  const todos = await api.getAll('/todos');
  console.log(`\nTodova: ${todos.length}`);

  // Demonstracija: ista klasa radi sa SVIM resursima!
  console.log('\n--- Univerzalnost ---');
  const resources = ['/users', '/posts', '/todos', '/comments'];
  for (const resource of resources) {
    const items = await api.getAll(resource);
    console.log(`${resource}: ${items.length} stavki`);
  }

  console.log('\n=== KRAJ REŠENJA ===');
})();
