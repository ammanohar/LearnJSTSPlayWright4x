console.log("A");
async function test() {
    console.log("B");
    await Promise.resolve();
    console.log("C");
}
test();
console.log("D");