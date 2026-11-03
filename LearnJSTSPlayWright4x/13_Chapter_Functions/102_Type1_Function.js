//Type 1 - No Parameters and No Return Type -- > No return undefined

// Fn Declaration
function greet() {
    console.log("Hello, Madhu World!");
}
 
//Fn Call
greet();
greet();
greet();
greet();
greet();


function openBrowser() {
    console.log("Opening Browser");
}  

openBrowser();

let msg = greet(); // undefined

console.log(msg); // undefined