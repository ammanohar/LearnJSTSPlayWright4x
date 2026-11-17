class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    kartik(path) {
        return this.baseURL + path;
    }
}
let staging = new APIClient("https://staging.api.com");
let prod = new APIClient("https://prod.api.com");
console.log(staging.kartik("/users"));
console.log(prod.kartik("/prod/users"));