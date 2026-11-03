function validateStatusCode(status) {
    
    if (status >= 200 && status <= 300) {
       console.log("Request is successful");
    } 
}


const validateStatusCode_Exp = function (status) {
           if (status >= 200 && status <= 300) {
       console.log("Request is successful");
    } 
} 

const validateStatusCode_Arrow = (status) => { 
         if (status >= 200 && status <= 300) {
       console.log("Request is successful");
    } 
} 

validateStatusCode(200); // Output: Request is successful
validateStatusCode_Exp(200); // Output: Request is successful
validateStatusCode_Arrow(200); // Output: Request is successful
