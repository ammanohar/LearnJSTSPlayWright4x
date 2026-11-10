// async function riskyTest() {
//     try {
//         let data = await Promise.reject("Element not found");
//         console.log(data);
//     } catch (err) {
//         console.log("Test failed:", err);
//     }
// }

// riskyTest();


async function apiTest() {
    try {
        let response = await Promise.resolve({ status: 201, body: "Created" });
        console.log("Status:", response.status);
        console.log("Body:", response.body);
    } catch (err) {
        console.log("Error:", err);
    } finally {
        console.log("Test complete");
    }
}

apiTest();