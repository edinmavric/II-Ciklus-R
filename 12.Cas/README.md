Klik na sliku → selektuje sliku

U app.js:

kada kliknu na <img>:
dodaj border tom .item
nađi nextElementSibling → oboji ga u žuto
nađi previousElementSibling → oboji ga u svetloplavo

---

Klik na ❌ → obriši ceo blok

klik na dugme
e.target.parentElement → briši .item

---

Klik na naslov slike (h3) → highlightuje samo title

Student treba da:
klikne h3
kroz children na parent .item da nađe <img>
privremeno da mu doda stil (npr. blur, border...)

---

Klik na “Add new image” → dodaje novi blok

Kada kliknu #add:

kreiraju novi <div class="item">

ubace:

<h3>Novi naslov</h3>
<img src="https://picsum.photos/100?random=${Math.random()}">
<button class="remove">❌</button>

dodaju ga u #gallery

---

BONUS

kada se selektuje jedna slika, sve ostale se resetuju (ukloni boje)

klik sa strane (na document) uklanja selekciju
