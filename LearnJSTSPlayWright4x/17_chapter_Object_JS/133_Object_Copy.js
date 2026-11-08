let a = { status: "pass" };
let b = a; //Copy the reference of a to b
b.status = "fail"; //Change the value of b.status
console.log(a.status);
