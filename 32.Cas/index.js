// ============================================
// 32. ČAS - KLASE I ASINHRONI KOD - PRIMERI
// ============================================

// Koristimo JSONPlaceholder kao besplatan test API
// https://jsonplaceholder.typicode.com

// ============================================
// PRIMER 1: Async metode u klasi - osnove
// ============================================

console.log('=== PRIMER 1: Async metode u klasi ===\n');

class Pozdrav {
  constructor(ime) {
    this.ime = ime;
  }

  // Obična (sinhrona) metoda
  pozdraviSync() {
    return `Zdravo, ${this.ime}!`;
  }

  // Async metoda - vraća Promise
  async pozdraviAsync() {
    return `Zdravo, ${this.ime}! (async)`;
  }

  // Async metoda sa simuliranim čekanjem
  async pozdraviSaZakasnjenjem(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return `Zdravo, ${this.ime}! (čekao sam ${ms}ms)`;
  }
}

const p = new Pozdrav('Marko');

// Sinhrona metoda - odmah vraća vrednost
console.log('Sync:', p.pozdraviSync());

// Async metoda - vraća Promise
console.log('Async (bez await):', p.pozdraviAsync());

// Da dobijemo vrednost, koristimo .then() ili await
p.pozdraviAsync().then((msg) => console.log('Async (sa .then):', msg));

// ============================================
// PRIMER 2-8: Svi ostali primeri su unutar IIFE
// jer await mora biti unutar async funkcije
// ============================================

// IIFE = Immediately Invoked Function Expression
(async () => {
  // ============================================
  // PRIMER 2: Korišćenje await
  // ============================================

  console.log('\n=== PRIMER 2: Korišćenje await ===\n');

  const pozdrav = new Pozdrav('Ana');

  // Sa await - čekamo rezultat
  const msg1 = await pozdrav.pozdraviAsync();
  console.log('Rezultat 1:', msg1);

  const msg2 = await pozdrav.pozdraviSaZakasnjenjem(500);
  console.log('Rezultat 2:', msg2);

  const msg3 = await pozdrav.pozdraviSaZakasnjenjem(200);
  console.log('Rezultat 3:', msg3);

  // ============================================
  // PRIMER 3: Sekvencijalno vs Paralelno
  // ============================================

  console.log('\n=== PRIMER 3: Sekvencijalno vs Paralelno ===\n');

  class DataLoader {
    async loadItem(name, delay) {
      console.log(`  Počinjem učitavanje: ${name}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      console.log(`  Završeno učitavanje: ${name}`);
      return { name, delay };
    }
  }

  const loader = new DataLoader();

  // SEKVENCIJALNO - jedno po jedno
  console.log('Sekvencijalno:');
  const startSeq = Date.now();

  const a = await loader.loadItem('A', 300);
  const b = await loader.loadItem('B', 300);
  const c = await loader.loadItem('C', 300);

  console.log(`Sekvencijalno trajalo: ${Date.now() - startSeq}ms\n`);

  // PARALELNO - sve odjednom sa Promise.all
  console.log('Paralelno (Promise.all):');
  const startPar = Date.now();

  const [x, y, z] = await Promise.all([
    loader.loadItem('X', 300),
    loader.loadItem('Y', 300),
    loader.loadItem('Z', 300),
  ]);

  console.log(`Paralelno trajalo: ${Date.now() - startPar}ms`);
  console.log('Rezultati:', [x, y, z].map((r) => r.name).join(', '));

  // ============================================
  // PRIMER 4: Fetch unutar klase
  // ============================================

  console.log('\n=== PRIMER 4: Fetch unutar klase ===\n');

  class UserService {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

    async getUsers(limit = 3) {
      const response = await fetch(`${this.baseUrl}/users?_limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP greška: ${response.status}`);
      }
      return response.json();
    }

    async getUserById(id) {
      const response = await fetch(`${this.baseUrl}/users/${id}`);
      if (!response.ok) {
        throw new Error(`Korisnik ${id} nije pronađen`);
      }
      return response.json();
    }

    async getUserPosts(userId) {
      const response = await fetch(`${this.baseUrl}/users/${userId}/posts`);
      if (!response.ok) {
        throw new Error(`Greška pri učitavanju postova`);
      }
      return response.json();
    }
  }

  const userService = new UserService();

  // Učitaj 3 korisnika
  const users = await userService.getUsers(3);
  console.log('Korisnici:');
  users.forEach((u) => console.log(`  - ${u.name} (${u.email})`));

  // Učitaj jednog korisnika
  console.log('');
  const user = await userService.getUserById(1);
  console.log(`Korisnik #1: ${user.name}, ${user.company.name}`);

  // Učitaj postove korisnika
  const posts = await userService.getUserPosts(1);
  console.log(`\nPostovi korisnika ${user.name} (prvih 3):`);
  posts.slice(0, 3).forEach((post) => console.log(`  - "${post.title}"`));

  // ============================================
  // PRIMER 5: Error handling u klasi
  // ============================================

  console.log('\n=== PRIMER 5: Error handling ===\n');

  class SafeApiService {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }

    async request(endpoint) {
      try {
        console.log(`Šaljem zahtev: ${endpoint}`);
        const response = await fetch(`${this.baseUrl}${endpoint}`);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log(`Uspešno primljeno sa ${endpoint}`);
        return { success: true, data };
      } catch (error) {
        console.error(`Greška na ${endpoint}: ${error.message}`);
        return { success: false, error: error.message, data: null };
      }
    }
  }

  const safeApi = new SafeApiService('https://jsonplaceholder.typicode.com');

  // Uspešan zahtev
  const result1 = await safeApi.request('/posts/1');
  if (result1.success) {
    console.log(`Post naslov: "${result1.data.title}"\n`);
  }

  // Neuspešan zahtev (nepostojeći endpoint) - neće srušiti aplikaciju
  const result2 = await safeApi.request('/nepostoji/999');
  if (!result2.success) {
    console.log(`Zahtev nije uspeo, ali aplikacija radi dalje!\n`);
  }

  // ============================================
  // PRIMER 6: CRUD klasa
  // ============================================

  console.log('=== PRIMER 6: CRUD operacije ===\n');

  class PostService {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com/posts';
    }

    // CREATE
    async createPost(title, body, userId = 1) {
      try {
        const response = await fetch(this.baseUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title, body, userId }),
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Create greška:', error.message);
        return null;
      }
    }

    // READ - svi
    async getAllPosts(limit = 5) {
      try {
        const response = await fetch(`${this.baseUrl}?_limit=${limit}`);
        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Read greška:', error.message);
        return [];
      }
    }

    // READ - jedan
    async getPostById(id) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`);
        if (!response.ok) throw new Error(`Post ${id} nije pronađen`);
        return await response.json();
      } catch (error) {
        console.error('Read greška:', error.message);
        return null;
      }
    }

    // UPDATE
    async updatePost(id, updates) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error('Update greška:', error.message);
        return null;
      }
    }

    // DELETE
    async deletePost(id) {
      try {
        const response = await fetch(`${this.baseUrl}/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error(`Greška: ${response.status}`);
        console.log(`Post ${id} uspešno obrisan`);
        return true;
      } catch (error) {
        console.error('Delete greška:', error.message);
        return false;
      }
    }
  }

  const postService = new PostService();

  // CREATE
  console.log('--- CREATE ---');
  const newPost = await postService.createPost(
    'Moj prvi post',
    'Ovo je sadržaj mog prvog posta'
  );
  console.log('Kreiran post:', newPost);
  console.log('');

  // READ - svi
  console.log('--- READ ---');
  const allPosts = await postService.getAllPosts(3);
  allPosts.forEach((post) => console.log(`  #${post.id}: ${post.title.substring(0, 40)}...`));
  console.log('');

  // READ - jedan
  const singlePost = await postService.getPostById(1);
  console.log(`Post #1: "${singlePost.title}"`);
  console.log('');

  // UPDATE
  console.log('--- UPDATE ---');
  const updatedPost = await postService.updatePost(1, { title: 'Ažuriran naslov' });
  console.log('Ažuriran post:', updatedPost);
  console.log('');

  // DELETE
  console.log('--- DELETE ---');
  await postService.deletePost(1);

  // ============================================
  // PRIMER 7: Klasa sa init() metodom
  // ============================================

  console.log('\n=== PRIMER 7: Factory / init() pattern ===\n');

  class AppConfig {
    constructor(configUrl) {
      this.configUrl = configUrl;
      this.settings = null;
      this.isLoaded = false;
    }

    // Konstruktor NE MOŽE biti async, pa koristimo init()
    async init() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 100));
        this.settings = {
          theme: 'dark',
          language: 'sr',
          apiUrl: 'https://api.example.com',
        };
        this.isLoaded = true;
        console.log('Konfiguracija učitana:', this.settings);
        return this;
      } catch (error) {
        console.error('Greška pri učitavanju konfiguracije');
        return this;
      }
    }

    getSetting(key) {
      if (!this.isLoaded) {
        console.warn('Upozorenje: Konfiguracija nije učitana! Pozovite init() prvo.');
        return null;
      }
      return this.settings[key];
    }
  }

  const config = new AppConfig('/api/config');
  await config.init();

  console.log('Tema:', config.getSetting('theme'));
  console.log('Jezik:', config.getSetting('language'));

  // ============================================
  // PRIMER 8: Paralelno učitavanje sa Promise.all
  // ============================================

  console.log('\n=== PRIMER 8: Paralelno učitavanje podataka ===\n');

  class Dashboard {
    constructor() {
      this.baseUrl = 'https://jsonplaceholder.typicode.com';
    }

    async getUsers(limit = 3) {
      const res = await fetch(`${this.baseUrl}/users?_limit=${limit}`);
      return res.json();
    }

    async getPosts(limit = 3) {
      const res = await fetch(`${this.baseUrl}/posts?_limit=${limit}`);
      return res.json();
    }

    async getTodos(limit = 3) {
      const res = await fetch(`${this.baseUrl}/todos?_limit=${limit}`);
      return res.json();
    }

    async loadDashboard() {
      try {
        console.log('Učitavam dashboard podatke...');
        const start = Date.now();

        // Tri zahteva PARALELNO - mnogo brže nego jedan po jedan
        const [users, posts, todos] = await Promise.all([
          this.getUsers(),
          this.getPosts(),
          this.getTodos(),
        ]);

        const elapsed = Date.now() - start;
        console.log(`Sve učitano za ${elapsed}ms\n`);

        return {
          users: users.map((u) => u.name),
          posts: posts.map((p) => p.title.substring(0, 30) + '...'),
          todos: todos.map((t) => `${t.completed ? 'DONE' : 'TODO'} ${t.title.substring(0, 30)}...`),
        };
      } catch (error) {
        console.error('Greška na dashboardu:', error.message);
        return { users: [], posts: [], todos: [] };
      }
    }
  }

  const dashboard = new Dashboard();
  const data = await dashboard.loadDashboard();

  console.log('Korisnici:', data.users);
  console.log('');
  console.log('Postovi:');
  data.posts.forEach((post) => console.log(`  - ${post}`));
  console.log('');
  console.log('Todovi:');
  data.todos.forEach((t) => console.log(`  - ${t}`));

  console.log('\n=== KRAJ PRIMERA ===');
})();
