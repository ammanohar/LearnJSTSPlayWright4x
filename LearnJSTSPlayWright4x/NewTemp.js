let a = 100;
console.log(a++ + ++a + a++ + ++a);
console.log(a)

let b = 37;

console.log(--b + b--);

console.log(b);

let c = 5; 
let d = c-- - --c; 
console.log(d, c);

let i = 1; 

let r = i++ > 1 ? i++ : ++i; 
console.log(r, i);