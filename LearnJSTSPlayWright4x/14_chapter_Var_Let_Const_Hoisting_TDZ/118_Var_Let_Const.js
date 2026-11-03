// Var is a traitor in JavaScript that allows you to declare variables that are function-scoped or globally-scoped. However, it has some quirks, such as hoisting, which can lead to unexpected behavior.

// let is a sincere and block-scoped variable declaration that was introduced in ES6. It does not allow redeclaration within the same scope and is not hoisted in the same way as var, which helps prevent some of the issues associated with var.

// const is a constant variable declaration that was also introduced in ES6. It is block-scoped and cannot be reassigned after its initial declaration. However, it does not make the value immutable; if the value is an object or array, its properties or elements can still be modified.

var a = 10;
console.log(a); // Output: 10
function printHello() {
    console.log("Hello Madhu!");
    var a = 20;
    console.log(a); // Output: 20
if (true) {  
    var a = 30;
    console.log(a); // Output: 30

}
}

printHello();