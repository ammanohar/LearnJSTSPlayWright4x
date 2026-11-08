let a1 = {
    name : "Madhu"
};

let a = { status: "pass" };
console.log(a.status); // Output: pass
console.log(a["status"]); // Output: pass

//keys are case sensitive
let a22 = {status: "pass", Status: "fail"};
console.log(a22["status"]); // Output: pass
console.log(a22["Status"]); // Output: fail
