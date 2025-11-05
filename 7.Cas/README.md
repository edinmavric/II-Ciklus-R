# Domaći Zadatak

## 1. Mini Katalog Proizvoda sa Pretragom

Napraviti aplikaciju koja predstavlja mini katalog proizvoda sa funkcionalnošću pretrage. 

### Zahtevi:
1. Kreirati niz proizvoda (objekata) koji imaju sledeća svojstva:
   - naziv
   - cena
   - kategorija

   Primer objekta:
   ```javascript
   { naziv: 'Kruska', cena: 100, kategorija: 'Voce' }
   ```

2. Implementirati sledeće funkcionalnosti:
   - Prikazati sve proizvode u listi na stranici
   - Dodati input polje za pretragu proizvoda po nazivu
   - Implementirati live pretragu - dok korisnik kuca u input polje, 
     filtrirati i prikazivati samo proizvode čiji naziv sadrži uneti tekst

### Dodatni zahtevi:
- Dodati CSS stilove za lepši prikaz kataloga
- Proizvodi treba da budu lepo formatirani i čitljivi
- Pretraga treba da bude case-insensitive (nije bitno da li su slova velika ili mala)

## 2. Lista Studenata

Napraviti aplikaciju koja prikazuje listu studenata u tabeli.

### Zahtevi:

1. Koristiti sledeću HTML strukturu za tabelu:
```html
<h2>Lista studenata</h2>
<table id="studentsTable" border="1">
  <thead>
    <tr>
      <th>Ime</th>
      <th>Grad</th>
      <th>Godine</th>
    </tr>
  </thead>
  <tbody></tbody>
</table>
```

2. Koristiti sledeći niz podataka:
```javascript
const students = [
  { name: 'Marko', city: 'Beograd', age: 22 },
  { name: 'Ana', city: 'Novi Sad', age: 20 },
  { name: 'Petar', city: 'Niš', age: 25 },
  { name: 'Ivana', city: 'Kragujevac', age: 23 },
  { name: 'Anastasija', city: 'Tutin', age: 26 },
  { name: 'Darko', city: 'Subotica', age: 19 },
  { name: 'Jana', city: 'Novi Pazar', age: 18 },
];
```

3. Implementirati sledeće:
   - Prikazati sve studente u tabeli
   - Stilizovati tabelu koristeći CSS

### CSS Zahtevi:
- Tabela treba da ima uređene ivice
- Dodati hover efekat na redove tabele
- Naslovi kolona treba da budu istaknuti
- Redovi treba da budu naizmenično obojeni za bolju čitljivost

### Bonus:
- Dodati responsive dizajn za mobilne uređaje
