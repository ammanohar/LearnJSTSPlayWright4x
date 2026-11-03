// Type 3 = so with arguments and with no return type

function greetByName(name) {
    console.log("Hello, " + name + "!");
}

greetByName("Alice");
greetByName("Bob");
greetByName("Charlie");

let msg = greetByName("David"); // undefined

console.log(msg); // undefined  