"use strict";

// In this exercise, we're going to look into recursion
window.recursion = {};

// A recursive function is one that calls or returns itself
// (usually, changing parameters).
//
// These functions consist of:
// - a base case, where the function finally stops calling itself and,
// - a recursive case, where the function will call itself again with possibly
//   different parameters

// Example 1
// This function sums the first n numbers from 1 to n (number), inclusive
//
// ex. sum(1) -> 1 (Base case)
// ex. sum(2) -> 2 + sum(1) -> 2 + 1 = 3
// ex. sum(3) -> 3 + sum(2) -> 3 + ( 2 + sum(1) ) -> 3 + 2 + 1 = 6
// ex. sum(5) -> 15
// ex. sum(10) -> 55
// ex. sum(100) -> 5050
recursion.sum = function(number) {
  // Base case
  if (number === 1) {
    return 1;
  }

  // Recursive case
  return number + recursion.sum(number - 1);
}

// As such, a function will continue calling itself until the base case is
// reached. Then the function "returns" back to the function which calls it so
// that it will return too. This process is repeated until it reaches the main
// function that initiated the function call.
//
// For instance, sum(4) is the main function. When sum(4) is called, three more
// function calls are made: sum(3), sum(2), and sum(1). It stops at sum(1)
// because we have reached the base case.
//
// sum(4) -> return 4 + sum(3)
// sum(3) -> return 3 + sum(2)
// sum(2) -> return 2 + sum(1)
// sum(1) -> return 1 (Base case)
//
// By substitution, we have
// sum(4) -> return 4 + 3 + 2 + 1 = 10
//
// You can think of this as a stack of plates, each new plate on top representing
// a new function call made. You cannot get to the bottom plate (which is the
// original call) until you first take off (finish) all the ones on top of it.
// You may sometimes hear the term "call stack" because this behaves exactly
// like a stack. Whenever a new function is called, it is added on top of the
// stack. When the function returns, the function (at the top) is removed (popped)
// from the stack. Your program is said to be done when there is no function on
// the call stack.

// Exercise 1:
// Write a function that computes the factorial of a given integer
//
// ex. factorial(0) -> 1 (Base case)
// ex. factorial(1) -> 1 * factorial(0) -> 1 * 1 = 1
// ex. factorial(2) -> 2 * factorial(1) -> 2 * ( 1 * factorial(0) ) -> 2 * 1 * 1 = 2
// ex. factorial(3) -> 3 * factorial(2) -> 3 * ( 2 * factorial(1) ) -> 3 * 2 * ( 1 * factorial(0) ) -> 3 * 2 * 1 * 1 = 6
// ex. factorial(4) -> 24
// ex. factorial(5) -> 120
// ex. factorial(17) -> 355687428096000
recursion.factorial = function(number) {
  // YOUR CODE HERE
  if (number === 0) {
    return 1;
  }
  return number * recursion.factorial(number - 1);
}

// Exercise 2:
// Write a function that calculates the nth fibonacci number.
//
// ex. fibonacci(0) -> 0 (Base case)
// ex. fibonacci(1) -> 1 (Base case)
// ex. fibonacci(2) -> fibonacci(1) + fibonacci(0) -> 1 + 0 = 1
// ex. fibonacci(3) -> fibonacci(2) + fibonacci(1) -> 1 + 1 = 2
// ex. fibonacci(4) -> fibonacci(3) + fibonacci(2) -> 2 + 1 = 3
// ex. fibonacci(10) -> 55
// ex. fibonacci(15) -> 610
// ex. fibonacci(21) -> 10946
//
// *TIP*: A recursive function can have multiple base cases.
//
// **Bonus**:
// Write a function that computes the result of the following within 1 second!
//
// [Run this in your console!]
// ex. fibonacci(80) -> 23416728348467685
recursion.fibonacci = function(number) {
  // YOUR CODE HERE

  // Base case
  if (number <= 1) {
    return number;
  }

  // Recursive case
  return recursion.fibonacci(number - 1) + recursion.fibonacci(number - 2);
}
