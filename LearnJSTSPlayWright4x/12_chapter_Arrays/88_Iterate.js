let tests = ["login", "checkout", "search"];

for (let i =0; i < tests.length; i++) {
    console.log(i, tests[i]);
    }
console.log("__________")

// for ...of (cleanest for values)
for (let x of tests) {
    console.log(x) // value
}

console.log("------");

// forEach (no return value)

tests.forEach((test, index) => {
    
    console.log(`${index}: ${test}`);
    }
);
console.log("_____________________________");

// entries () - index + value

for (let [i, test] of tests.entries()) {
    console.log(i, test); 
}

let students = ["menthis", "senthil", "ajay", "rahul"];

for (let student in students ) {
    console.log(student, "-> ", students[student]); //index = in
}