"use strict";

// Underscore function functions (aka Functional Underscore)
//
// Implement the following functions from the underscore library.
// You'll need to use the 'arguments' object and function.apply()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply

// Exercise 1: memoize()
// Write a function called 'memoize' that takes a function 'fn' and returns
// a new function 'memoizedFn' that caches previously computed return values.
//
// When 'memoizedFn' is called with a new argument/parameter value, call
// through to 'fn' and save the result of that call. If 'memoizedFn' is
// called again with the same argument, return the previously saved
// value without calling 'fn'.
//
// You can assume fn takes only a single argument and that this argument is a
// number.
//
// function double(number) {
//   console.log('called');
//   return number * 2;
// }
// var memoizedDouble = memoize(double);
// memoizedDouble(1) -> returns 2, prints 'called'
// memoizedDouble(1) -> returns 2
// memoizedDouble(2) -> returns 4, prints 'called'
// memoizedDouble(2) -> returns 4
//
// This is a simplified version of _.memoize() without hashFunction
// http://underscorejs.org/#memoize
function memoize(func) {
  return function fun(x) {
    if (!fun.hasOwnProperty(x)) {
      fun[x] = func(x);
    }
    return fun[x];
  }
}

// Exercise 2: partial()
// Write a function that takes a function 'fn', followed by an arbitrary number of arguments
// and returns a function 'partialFn'. When 'partialFn' is called it should call 'fn' with
// the arguments that were initially provided to partial().
//
// ex.
// function greaterThan(a, b) {
//  return a > b;
// }
// var greaterThan2 = partial(greaterThan, 2);
// greaterThan2(3) // -> true
// greaterThan2(1) // -> false
// greaterThan2(0) // -> false
//
// ex.
// function getArgs() {
//  return arguments;
// }
// var partialGetArgs = partial(getArgs, 'a', 'b', 'c')
// partialGetArgs() // -> ['a', 'b', 'c']
// partialGetArgs('x', 'y') // -> ['a', 'b', 'c', 'x', 'y']
//
// This is _.partial() from underscore
// http://underscorejs.org/#partial
function partial(fn) {
  var outerArgs = Array.prototype.slice.call(arguments);
  if (outerArgs.length === 0) throw "No function.";
  outerArgs = outerArgs.length > 1 ? outerArgs.slice(1) : [];
  return function partialFn() {
    var innerArgs = Array.prototype.slice.call(arguments);
    return fn.apply(null, outerArgs.concat(innerArgs));
  }
}

// Exercise 3: composeBasic()
// Write a function that takes two functions 'fun1' and 'fun2' and returns
// a new function 'composedFn' that calls fun1(fun2()).
//
// When 'composedFn' is called it should call 'fun2' with all arguments,
// after that it should call 'fun1' with the return value of calling 'fun2'.
//
// ex.
// function double(n) {
//  return n * 2;
// }
// function add1(n) {
//  return n + 1;
// }
// var doubleThenPlus1 = composeBasic(add1, double);
// doubleThenPlus1(3) // -> 7
// doubleThenPlus1(0) // -> 1
//
// var plus1ThenDouble = composeBasic(double, add1);
// plus1ThenDouble(3) // -> 8
// plus1ThenDouble(0) // -> 2
//
// ex.
// function sum(a, b) {
//  return a + b;
// }
// function isEven(n) {
//  return (n % 2) === 0;
// }
// var isSumEven = composeBasic(isEven, sum);
// isSumEven(1, 1) // -> true
// isSumEven(0, 1) // -> false
// isSumEven(0, 22) // -> true
// isSumEven(8, 11) // -> false
// isSumEven(71, 387) // -> true
function composeBasic(fun1, fun2) {
  return function fun() {
    return fun1(fun2.apply(null, arguments));
  }
}


// Bonus Exercise: memoize() with hashFunction
//
// Update the memoize() function above to support multiple arguments and
// hashFunction from in underscore.js
//
// memoize() works by caching (i.e. saving) the results of previous function
// calls in an object. Objects keys are always strings, so if a memoize'd
// function is called with arguments that are not string, memoize() has to
// convert them to a string so the result of the computation can be stored in
// the cache object.
// 'hashFunction' allows us to specify how memoize() converts arguments into
// strings
//
// ex.
// function max(a, b) {
//  console.log('called');
//  return Math.max(a, b);
// }
// function hashFunction(a, b) {
//  return a + ',' + b;
// }
//
// var memoizedMax = memoize(max, hashFunction);
// memoizedMax(1, 10) // -> returns 10, logs 'called'
// memoizedMax(1, 10) // -> returns 10, logs nothing
// memoizedMax(10, 1) // -> returns 10, logs 'called'
// memoizedMax(0, -71) // -> returns 0, logs 'called'
//
// See: http://underscorejs.org/#memoize


// Double Bonus Exercise: compose()
//
// Write a more powerful version composeBasic() that can take any
// number of arguments.
//
// This is _.compose() from underscore
// http://underscorejs.org/#compose
function compose() {
  var args = Array.prototype.slice.call(arguments);
  return function fun() {
    var curArg = arguments;
    var curFunc = function(){};
    for (var i = args.length-1; i >= 0; i--) {
      curFunc = args[i];
      curArg = i === args.length-1 ? curFunc.apply(null, curArg) : curFunc.call(null, curArg);
    }
    return curArg;
  }
}
