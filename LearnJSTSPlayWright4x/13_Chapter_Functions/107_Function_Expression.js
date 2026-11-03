//Function as Expression
function greet(name) {
    return `Hello, ${name}!`;
}

//Anonymous function expression
const greet1 = function(name) {
    return `Hello, ${name}!`;
}
console.log(greet1("Madhu")); // Hello, Madhu!
console.log(greet("Madhu")); // Hello, Madhu!