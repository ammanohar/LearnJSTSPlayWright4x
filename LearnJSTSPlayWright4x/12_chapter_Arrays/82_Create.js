let browsers = ["Chrome", "Firefox", "Safari"];

let scores = new Array(3); //creates [empty x3]
scores[0] = "1";
console.log(scores);

let scores2 = new Array(1,2,3);

let numbers = new Array(100, 200, 300, 400);

console.log(numbers);
console.log(numbers.length);

let test = Array.of(10, 20, 30, 40, 50);
console.log(test.length);

//Array.from()
let chars = Array.from("hello")

// ["h", "e", "l", "l", "o"]