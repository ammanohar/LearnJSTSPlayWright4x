//Nested Ternary
//Multiple Conditions
// age = 26
// age > 18 -> Go Goa, age > 25 -> Drink

let age = 26;
let is_Madhu_enjoy = (age > 20) ? (age > 25 ? "Goa & Drink" : "No Drink, Only Goa")  : "No Goa";
console.log(`You can enjoy ${is_Madhu_enjoy}`)