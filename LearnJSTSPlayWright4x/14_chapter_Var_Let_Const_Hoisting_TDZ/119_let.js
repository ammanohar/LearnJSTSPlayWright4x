let b =20; //Global Scope
console.log(b); // Output: 20

function printHello() {
    console.log("Hello Madhu!");
    let b = 30; // Local Scope
    console.log(b); // Output: 30
    if (true) {
        let b = 5; // Block Scope
        console.log(b); // Output: 5
    }
    console.log("let ->", b); // Output: 30
}
printHello();    