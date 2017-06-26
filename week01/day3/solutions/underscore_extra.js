"use strict";

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
function memoize(func, hashFunction) {
  var cache = {};
  return function() {
    var hash = hashFunction ? hashFunction.apply(null, arguments) : arguments[0];
    if (cache.hasOwnProperty(hash)) {
      return cache[hash];
    }
    cache[hash] = func.apply(null, arguments);
    return cache[hash];
  }
};

// Implement _.partial()
// http://underscorejs.org/#partial
function partial(fn) {
  arguments[0] = null;
  return fn.bind.apply(fn, arguments);
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
  return function() {
    return fun1(fun2.apply(null, arguments));
  }
}

// Bonus: Implement _.compose()
// http://underscorejs.org/#compose
function compose() {
  var fns = arguments;
  return function() {
    var first = true;
    var lastRet;
    for (var i = fns.length - 1; i >= 0; i--) {
      var fn = fns[i];
      if (first) {
        lastRet = fn.apply(null, arguments);
      } else {
        lastRet = fn(lastRet);
      }
      first = false;
    }
    return lastRet;
  }
}
