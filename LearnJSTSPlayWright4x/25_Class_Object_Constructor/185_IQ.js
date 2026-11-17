let a = 10;
class TestRunner {
    static totalTests = 0;
    static passCount = 0;
    constructor(name, passed) {
        this.name = name;
        TestRunner.totalTests++; // 1
        if (passed) {
            TestRunner.passCount++;  //1
        }
        console.log(a);
    }
    // non static fn
    pramod_fn() {
        return this.name;
    }
    static summary() {
        return TestRunner.passCount + "/" + TestRunner.totalTests + " passed";
    }
}
let t1 = new TestRunner("Login", true);
t1.pramod_fn();
console.log(TestRunner.summary());

// new TestRunner("Signup", false);
// new TestRunner("Cart", true);
// new TestRunner("Checkout", true);
// console.log(TestRunner.summary());
// console.log(TestRunner.pramod_fn());