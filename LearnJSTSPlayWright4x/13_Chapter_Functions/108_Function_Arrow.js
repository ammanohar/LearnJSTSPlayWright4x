//Arrow Functions

//Arrow functions are a more concise way to write functions in JavaScript. They are often used for short, simple functions and have a different behavior for the 'this' keyword compared to regular functions.  

function greet(name) {
    return `Hello, ${name}!`;
}

const greet1 = function(name) {
    return `Hello, ${name}!`;
}

//Arrow function
const greet2 = (name2) => `Hello, ${name2}!`; 