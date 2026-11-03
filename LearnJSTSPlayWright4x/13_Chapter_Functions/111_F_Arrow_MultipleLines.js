//Multie Line Arrow Function

const getResult = (score) => {
    if (score >= 70) return "Pass";
    else return "Fail";
}

console.log(getResult(78)); // Output: Pass
console.log(getResult(43)); // Output: Fail