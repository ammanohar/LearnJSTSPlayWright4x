function getStatusCode(code) {
    if (code >=200 && code < 300) {
        return "Success";
    } 
    else if (code >= 400 && code < 500) {
        return "Client Error";
    } 
    else if (code >= 500 ) {
        return "Server Error";
    }
    else {
        return "Unknown Status Code";
    }
}

console.log(getStatusCode(200)); // Returns "Success"
console.log(getStatusCode(404)); // Returns "Client Error"
console.log(getStatusCode(500)); // Returns "Server Error"
console.log(getStatusCode(600)); // Returns "Unknown Status Code"   
