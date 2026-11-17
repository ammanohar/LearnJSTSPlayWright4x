class Person{
    // hide my variable
    #child1;
    #child2;
    constructor(name, child1, child2){
        this.name = name;
        this.#child1 = child1;
        this.#child2 = child2;
    }

    getChild(){ // M/O
        return this.#child1;
    }
    setChild(changed_name) // W/F
    {
        this.#child1 = changed_name;
    }
}

let p = new Person("Pramod", "Vrad", "Jenny");
//  console.log(p.#child1);
 console.log(p.getChild());

 p.setChild("VIRAD");
 console.log(p.getChild());

 console.log(p.name);
 p.name = "Amit";