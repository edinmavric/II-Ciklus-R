let a = 5;
let b = a;

a = 7;

console.log('A: ' + a);
console.log('B: ' + b);

let original = [1, 2, 3];
let kopija = [ ...original ];

kopija.push(4);

console.log(original);
console.log(kopija);
