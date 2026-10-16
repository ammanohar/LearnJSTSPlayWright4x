// Problem - Statement
// Score 0 -- 100
// score > 90 - A
// score 80 to 90 - B
// score 70 to 80 - C
// score 60 to 70 - D
// score 50 to 60 - E
// score < 50     - F (FAIL)

let score = 35;
if (score>100 || score<=0){
    console.log("Invalid Score");
}
else {
//Score Valid
if (score>90 ) {
    console.log("Grade A - Excellent");
}
else if (score >80 && score<=90){
    console.log("Grade B - Very Good");
}
else if (score >70 && score<=80){
    console.log("Grade C - Good");
}
else if (score >60 && score<=70){
    console.log("Grade D - Average");
}
else if (score >50 && score<=60){
    console.log("Grade E - Needs Improvement");
}
else if (score >100 && score<0){
    console.log("Not a Valid Input");
}
else {
    console.log("Grade F - Failure");
}
}