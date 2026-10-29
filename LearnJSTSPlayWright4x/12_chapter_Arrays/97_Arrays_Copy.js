let original = [1,2,3];
let copy1 = [...original];
console.log(original);
console.log(copy1);

let copy2 = original.slice();
console.log(copy2);

// let deep_copy_array = original;
// deep_copy_array.push(91);

// console.log(original);
// console.log(deep_copy_array);


let copy3 = original.slice();
console.log(copy3);
copy3.push(98);
copy1.push(99);
console.log(original);
console.log(copy3);
console.log(copy1); 