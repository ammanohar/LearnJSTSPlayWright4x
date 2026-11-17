class TestCase{

    constructor(name_given, status_given, priority_given){
        this.name = name_given;
        this.status = status_given;
        this.priority= priority_given;
    }
    display(){
      console.log(this.name + " → " + this.status + " → " + this.priority);
    }
}

let loginTest_ref = new TestCase("Login Test","PASS","P0");
let signupTest_ref = new TestCase("Signup Test","FAIL","P1");

loginTest_ref.display();
signupTest_ref.display();