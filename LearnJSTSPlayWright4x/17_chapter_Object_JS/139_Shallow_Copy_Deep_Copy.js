// 1. Call by reference: one object, two names
let a = { status: "pass" };
let b = a;
b.status = "fail";
console.log(a.status);            // fail   (a changed too!)


// 2. Shallow copy (...spread): new object, but the inner object is shared
let user1 = { name: "Madhu", address: { city: "Hyderabad" } };
let copy1 = { ...user1 };
copy1.name = "Manohar";
copy1.address.city = "Mumbai";
console.log(user1.name);          // Madhu  (safe)
console.log(user1.address.city);  // Mumbai  (changed!)


// 3. Deep copy (structuredClone): everything is new
let user2 = { name: "Madhu", address: { city: "Hyderbad" } };
let copy2 = structuredClone(user2);
copy2.name = "Manohar";
copy2.address.city = "Mumbai";
console.log(user2.name);          // Madhu  (safe)
console.log(user2.address.city);  // Hyderbad   (safe)