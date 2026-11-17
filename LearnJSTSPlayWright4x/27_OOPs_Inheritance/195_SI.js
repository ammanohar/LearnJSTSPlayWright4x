class Father{
    eat(){
        console.log("Hi eating")
    }
}
class Son extends Father{
    walk(){
        console.log("Hi walking")
    }
}

const s = new Son();
const f = new Father();
s.walk()
s.eat();

f.eat();
// f.walk();