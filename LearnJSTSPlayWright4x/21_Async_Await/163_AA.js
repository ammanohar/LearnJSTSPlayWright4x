async function getTestResults(){
        return new Promise.resolve("abc")
}

// getTestResults().then(function(results){
//         console.log(results);
// });

async function test(){
   let r = await getTestResults();
}


async function testAPI(){
    try {
        let result = await Promise.reject("503 Service Unavailable");
        console.log('Result', result);
    } catch (error) {
        console.log('Error', error);
    } finally {
        console.log("Clean up!!");
    }
}

testAPI();