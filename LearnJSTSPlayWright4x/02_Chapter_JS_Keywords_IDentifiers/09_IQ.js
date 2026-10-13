//===========================================================================
// Java Script Identifiers Rules - IQ
//===========================================================================


let validName = "starts with a letter"; 
let _private = "starts with an underscore";
let $dollar = "starts with a dollar sign";

let item1 = "starts with a letter and has numbers";
let _temp2 = "starts with an underscore and has numbers";
let $var123 = "starts with a dollar sign and has numbers";
let a1_a2 = "starts with a letter and has underscore and numbers";


let 1stplace = "starts with a number"; // Invalid identifier, cannot start with a number
let 2ndItem = "starts with a number"; // Invalid identifier, cannot start with a number

let Function = "reserved keyword"; // Invalid identifier, cannot use reserved keywords
let MyVar = "reserved keyword"; // Invalid identifier, cannot use reserved keywords
let myvar = "reserved keyword"; // Invalid identifier, cannot use reserved keywords

let café = "contains special character"; // Invalid identifier, cannot contain special characters
let 汉字 = "contains special character"; // Invalid identifier, cannot contain special characters
let \u0041 = "contains special character"; // Invalid identifier, cannot contain special characters
let \u005f = "contains special character"; // Invalid identifier, cannot contain special characters


let my-name= "contains special character"; // Invalid identifier, cannot contain special characters
let my name = "contains special character"; // Invalid identifier, cannot contain special characters
let my@name = "contains special character"; // Invalid identifier, cannot contain special characters
let my#name = "contains special character"; // Invalid identifier, cannot contain special characters
let my!name = "contains special character"; // Invalid identifier, cannot contain special characters


//1.Camel Case (standard for JS variables and functions)
let firstName = "John";
let totalAmount = 100;
let calculateTotal = function() {
  // function body
}   
let isloggedIn = true;
