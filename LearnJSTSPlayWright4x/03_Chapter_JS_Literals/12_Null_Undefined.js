//======================================================================
//Topic - Null and Undefined
//======================================================================

/* 

SIMPLE DEFINATION OF NULL AND UNDEFINED

undefined is a variable that has been declared but has not yet been assigned a value.

null is an assignment value. It can be assigned to a variable as a representation of no value.

*/

// var x;
// console.log(x); // Output: undefined

// var audi = null;
// console.log(audi); // Output: null

function greet() {
    // no return statement, so the function returns undefined
}
console.log(greet()); // Output: undefined

let x;
x = 10;
console.log(x); // Output: 10

//-------------------------------------------------
//2. null
//-------------------------------------------------
let profilepicture = null; // profilepicture is explicitly set to null
console.log(profilepicture); // Output: null
console.log(typeof profilepicture); // Output: object
