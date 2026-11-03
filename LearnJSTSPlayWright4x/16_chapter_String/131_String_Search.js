//Searching & Checking

let url = "https://staging.vwo.com/api/login?retry=true";
//includes()
url.includes("staging"); // true
url.includes("production"); // false

//startsWith() / endsWith()
url.startsWith("https"); // true
url.startsWith("https://"); // true
url.endsWith("true"); // true

//indexOf() / lastIndexOf()
console.log(url.indexOf("a")); // 22
console.log(url.lastIndexOf("a")); // 22
console.log(url.indexOf("noThere")); // -1


//ASCII -> A -> 65, a -> 97
