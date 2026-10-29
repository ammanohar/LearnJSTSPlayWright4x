let arr = [1,2,3];
console.log(arr);


//Add to the END
arr.push(4);
console.log(arr);

//Remove from the END
arr.pop();
console.log(arr);

arr.push(5,6);
console.log(arr);

arr.unshift(0);
console.log(arr);

arr.shift();
console.log(arr);

arr.splice(2,1);
console.log(arr);

arr.splice(2,0,99);
console.log(arr);

arr.splice(1,2,10,20);
console.log(arr);

arr.splice(1,2,19,29,39);
console.log(arr);