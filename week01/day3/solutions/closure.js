"use strict";

// ex. 1.1 This exercise has a function that creates
// a bank account for a user. It takes in a username
// and password. In order to login to your created account
// the account has a login command. When you have multiple
// users it is important to note that the passwords for
// each user must be kept separate (only available in the
// local scope of the login function), or else users might have
// access to passwords of their fellow users.
//
// Implement a function vault() that returns a function fn.
// fn takes in a string called attempt and returns true or false
// based on whether the attempt matches password. The purpose of
// this function is to hide the password from prying eyes.
function vault(password) {
  // YOUR CODE HERE
  return function(attempt) {
    return attempt === password;
  }
}

// DO NOT MODIFY THIS FUNCTION
var createUser = function(username, password) {
  return {
    username: username,
    login: vault(password)
  }
}

// create a horizons user with password horizonites
var horizons = createUser('horizons', 'horizonites');

// ex. 1.2 Revisit Once
// The function below is the answer for the once
// function exercise in the toolbox in your prepwork.
// You have to modify it to make the following tests
// pass.
var once = function(f) {
  var ret;
  var called = false; // Let's create a local variable to track if f has been called
  return function() {
    if (! called) { // if f hasn't been called yet
      ret = f.apply(null, arguments);
      called = true; // mark f as called
    }
    return ret;
  }
}

// ex. 1.3
// functionFactory takes in two numbers (num1, num2)
// and returns an array of functions where each index
// of the array is a function that returns the next
// number between num1 and num2. Currently this function
// does not work, use closures to fix it and figure out
// a way to account for num1 and num2 being negative
//
// ex. functionFactory(0,2) -> [
//   function() -> 0,
//   function() -> 1,
//   function() -> 2
// ]
//
// ex. functionFactory(-2,1) -> [
//   function() -> -2,
//   function() -> -1,
//   function() -> 0,
//   function() -> 1
// ]
//
// Use closures to fix this function.
//
// functionFactory(0,2) -> [function, function, function]
var functionFactory = function(num1, num2) {
  var functionArray = [];
  var index = 0;
  for (var i = num1; i <= num2; i++) {
    functionArray[index] = (function(i) {
      return function() {
        // function that returns i
        return i;
      }
    }(i));

    index++;
  }

  return functionArray;
}
// DO NOT CHANGE THIS FUNCTION
//
// This function takes in numbers from the two labels
// and prints out all numbers in between onto the label.
// It uses functionArray which is an array of functions.
// where each function returns the next number between
// the numbers in the label.
//
// DO NOT CHANGE THIS FUNCTION
var counter = function () {
  var num1 = parseInt(document.getElementById('num1').value);
  var num2 = parseInt(document.getElementById('num2').value);

  var functionArray = functionFactory(num1, num2);

  // lets call the functions in the function array
  document.getElementById('numbers').innerHTML = ""; // clear label
  functionArray.forEach(function(fun) {
    // populate label with return values of the funtions in functionArray
    document.getElementById('numbers').innerHTML += fun() + " ";
  });
}
// DO NOT CHANGE THIS FUNCTION
