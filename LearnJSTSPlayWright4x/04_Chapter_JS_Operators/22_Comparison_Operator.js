//Comparison Operators

// ==, !=, ===, !==, <, >, <=, >=
// == loose comparison operator, checks for equality of values, but not types
let a = 10;
let b = "10";
console.log(a == b); // Output: true

// === strict comparison operator, checks for equality of values and types
console.log(a === b); // Output: false
// === strict comparison operator, checks for equality of values and types
let c = 10;
console.log(a === c); // Output: true

// != loose comparison operator, checks for inequality of values, but not types
console.log(a != b); // Output: false
// !== strict comparison operator, checks for inequality of values and types
console.log(a !== b); // Output: true

// < less than operator