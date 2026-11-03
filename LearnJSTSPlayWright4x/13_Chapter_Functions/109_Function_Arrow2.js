function greet(name) {
    return `Hello, ${name}!`;
}

const greet2 = (name) => `Hello, ${name}!`;
console.log(greet2("Madhu")); // Hello, Madhu!

const greet3 = (name2) => { `Hello, ${name2}!`; };

console.log(greet3("Madhu")); // undefined