// function add(a, b, c) {
//     return a + b + c ;
// }

// let num = [1, 2, 3, 5]; 
// console.log(add(...num)); // 6


//---------

function hasError(...codes) {
    return codes.some(c => c>=400);
}
let responseCodes = [200, 201, 404, 500];
let responseCodes2 = [200, 201, 202];
hasError(responseCodes); // true
hasError(responseCodes2); // false
hasError(...responseCodes); // true