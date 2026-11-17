class Credentials{
    #apiKey;
    
    constructor(user,key){
        this.user = user;
        this.#apiKey = key;
    }
    getAPI(){
        return this.#apiKey;
    }
}

let cred = new Credentials("admin", "#scret_key_1234");
console.log(cred.user);
// console.log(cred.#apiKey);