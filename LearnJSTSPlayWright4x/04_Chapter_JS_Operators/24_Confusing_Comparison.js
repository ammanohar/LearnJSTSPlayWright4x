// Rule of Thumb: Avoid confusing comparisons in JavaScript. Use strict equality (===) and inequality (!==) operators instead of their loose counterparts (== and !=) to prevent unexpected type coercion.
// == loose equality operator, checks for equality of values, but not types
let a = 10;
let b = "10";
console.log(a == b); // Output: true
//  === strict equality operator, checks for equality of values and types
console.log(a === b); // Output: false


//--------- 1. Empty String vs 0 vs "0" (transitivity issue) ---------
console.log("" == 0);
console.log(0 == "0");
console.log("" == "0"); // Output: false, but "" == 0 and 0 == "0" are both true, which violates transitivity
console.log("0" == 0); // Output: true, but "0" == 0 and 0 == "" are both true, which violates transitivity

//=== fixes the transitivity issue
console.log("" === 0);
console.log(0 === "0");
console.log("" === "0"); // Output: false, as expected
console.log("0" === 0); // Output: false, as expected
