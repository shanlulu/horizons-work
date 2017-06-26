"use strict";

window.learn_underscore = {};

// Underscore.js is a popular collection of JavaScript functions (aka a library).
// Take a look here http://underscorejs.org
//
// In this exercise we will use functions from Underscore to build other functions.

// Example 1. learn_underscore.hasZeros(array)
// This is a function that returns true if the given array contains any 0s in it
//
// Use _.any() from Underscore to build this.
// Underscore function _.any(array, fun) returns true if fun(item) returns true
// for ANY item in an array.
// ex.
//  function greaterThan1(item) {
//    return item > 1;
//  }
//  _.any([], greaterThan1) -> false
//  _.any([2], greaterThan1) -> true
//  _.any([0, 2], greaterThan1) -> true
//  _.any([0, -1, 0, -2], greaterThan1) -> false
//
// ex. learn_underscore.hasZeros([]) -> false
// ex. learn_underscore.hasZeros([1]) -> false
// ex. learn_underscore.hasZeros([1, 0, 0]) -> true
// ex. learn_underscore.hasZeros([0]) -> true
learn_underscore.hasZeros = function(array) {
  return _.any(array, function(item) {
    return item === 0;
  });
}

// Exercise 1. learn_underscore.contains(array, item) using _.any()
// Write a function that takes an array and an item and returns true if item is
// in array.
//
// Use _.any() from Underscore to build this.
//
// ex. learn_underscore.contains([], 'a') -> false
// ex. learn_underscore.contains(['a'], 'a') -> true
// ex. learn_underscore.contains(['a', 'b', 'c'], 1) -> false
learn_underscore.contains = function(array, item) {
  return _.any(array, function(n) {
    return item === n;
  })
};

// Exercise 3: learn_underscore.any(array, fun)
// Write your own version of _.any() using _.reduce() and _.map();
//
// _.map() works like Array.map(). It takes an array and a function
// and transforms each item of the array by passing it to the given function.
//
// _.reduce() is a function that allows us to combine values in an array
// into a single value, in effect "reducing" the array to a single piece of
// data. _.reduce() does this by using a function called 'combiner' that
// we pass in.
//
// For example, say we want to sum all numbers in an array. We could do this by
// using a for loop and an accumulator variable:
//
//    var accumulator = 0;
//    for (var i = 0; i < array.length; i++) {
//      accumulator += array[i];
//    }
//    return accumulator;
//
// We can use _.reduce() to do the same thing:
//
//    function add(a, b) {
//      return a + b;
//    }
//    return _.reduce(array, add)
//
// Reduce initializes 'accummulator' with the first item of the array, then
// repeatedly calls 'combiner' with every other item of the array:
//
//    var accumulator = array[0];
//    accumulator = combiner(accumulator, array[1]);
//    accumulator = combiner(accumulator, array[2]);
//    accumulator = combiner(accumulator, array[3]);
//    and so on..
//    return accumulator;
//
// Using reduce, we can combine basic operations into powerful algorithms.
//
// To build learn_underscore.any() you should first use _.map(array, fun) to convert
// items in the array to true/false values.
//
// You should then combine the items in this array with _.reduce()
// by giving it a function that takes two arguments and returns true
// if either argument is true. You may find the or operator || useful
// for this purpose.
//
// Use: _.map() and _.reduce()
//
// ex.
//   function isTruthy(item) {
//     return !! item;
//   }
//   learn_underscore.any([], isTruthy) -> false
//   learn_underscore.any([0, 0], isTruthy) -> false
//   learn_underscore.any([0, 1, 0], isTruthy) -> true
//   learn_underscore.any([1], isTruthy) -> true
learn_underscore.any = function(array, fun) {
  var boolArr = _.map(array, fun);
  return _.reduce(boolArr, function(a, b) {
    return a || b;
  })
}

// Exercise 4: learn_underscore.reduce(array, fun)
// Write the learn_underscore.reduce() function. reduce() takes two arguments, an array and a
// function 'fun'.  'fun' is a function that takes two arguments.
//
// reduce() should create a variable 'accummulator' and set
// its value initially to the first item of the array. Then it should update
// accumulator using 'fun' and every other item of the array:
//
//    var accumulator = array[0];
//    accumulator = fun(accumulator, array[1]);
//    accumulator = fun(accumulator, array[2]);
//    accumulator = fun(accumulator, array[3]);
//    and so on..
//    return accumulator;
//
// You can use a for loop to do this.
//
// ex.
//  function sum(a, b) {
//    return a + b;
//  }
//  learn_underscore.reduce([1], sum) -> 1
//  learn_underscore.reduce([1, 2], sum) -> 3
//  learn_underscore.reduce([1, 2, -3], sum) -> 0
//  learn_underscore.reduce([1, -1, 2, -3], sum) -> -1
//  learn_underscore.reduce([0], sum) -> 0
//
// ex. _.all() using reduce
//  function and(a, b) {
//    return a && b;
//  }
//  learn_underscore.reduce([true], and) -> true
//  learn_underscore.reduce([true, true, true], and) -> true
//  learn_underscore.reduce([true, false], and) -> false
//  learn_underscore.reduce([true, false, true, true], and) -> false
//  learn_underscore.reduce([false], and) -> false
//  learn_underscore.reduce([false, false], and) -> false
learn_underscore.reduce = function(array, fun) {
  var accumulator = array[0];
  for (var i = 1; i < array.length; i++) {
    accumulator = fun(accumulator, array[i]);
  }
  return accumulator;
}

// Exercise 5: learn_underscore.keys(object)
// Write a function using _.forEach() that takes an object and returns an array with
// all the keys in that object.
//
// ex. learn_underscore.keys({}) -> []
// ex. learn_underscore.keys({a: 1, hello: 10}) -> ['a', 'hello']
//
// Underscore function _.forEach() is similar to the Array.forEach() built-in function
// but it can also operate on objects:
//
// ex.
// _.forEach({a: 5, b: 11},
//           function(value, key) { console.log(value, key) }) -> outputs "5 a" then "11 b"
learn_underscore.keys = function(object) {
  var keys = [];
  _.forEach(object, function(value, key) {
    keys.push(key);
  })
  return keys;
}

// Exercise 6: learn_underscore.values(object)
// Write a function using _.forEach() that takes an object and returns an array with
// all the values in that object.
//
// ex. learn_underscore.values({}) -> []
// ex. learn_underscore.values({a: 1, hello: 10}) -> [1, 10]
learn_underscore.values = function(object) {
  var vals = [];
  _.forEach(object, function(value) {
    vals.push(value);
  })
  return vals;
}

// Exercise 7: learn_underscore.pairs(object)
// Write a function using _.forEach() that takes an object and returns an array with
// all the key value pairs in that object.
//
// ex. learn_underscore.pairs({}) -> []
// ex. learn_underscore.pairs({a: 1, hello: 10}) -> [['a', 1], ['hello', 10]]
learn_underscore.pairs = function(object) {
  var pairs = [];
  _.forEach(object, function(value, key) {
    pairs.push([key,value]);
  })
  return pairs;
}

// Example 2: groupByState(people)
// This function takes an array of people objects and groups them by their
// state property. People objects have two properties: name and state.
// It uses _.groupBy() to do this.
//
// Underscore function _.groupBy() is a function that takes an array and
// a function 'fun'. It groups items in the given array based on the output
// of calling fun(item) for each item in the array.
//
// ex.
//  var people = [
//    {name: 'Darwish', state: 'GA'},
//    {name: 'Moose', state: 'CA'},
//    {name: 'Lane', state: 'PA'},
//    {name: 'Ethan', state: 'CA'},
//    {name: 'Josh', state: 'NJ'},
//    {name: 'Edward', state: 'FR'},
//    {name: 'Abhi', state: 'GA'}
//  ];
//
//  learn_underscore.groupByState(people) ->
//      {
//        "GA": [
//          { "name": "Darwish", "state": "GA" },
//          { "name": "Abhi", "state": "GA" }
//        ],
//        "CA": [
//          { "name": "Moose", "state": "CA" },
//          { "name": "Ethan", "state": "CA" }
//        ],
//        "PA": [
//          { "name": "Lane", "state": "PA" }
//        ],
//        "NJ": [
//          { "name": "Josh", "state": "NJ" }
//        ],
//        "FR": [
//          { "name": "Edward", "state": "FR" }
//        ]
//      }
learn_underscore.groupByState = function(people) {
  return _.groupBy(people, function(person) {
    return person.state;
  });
}

// Example 3: learn_underscore.countLetters(string)
// This is a function that takes a string and returns an object that maps each
// letter in that string to how many times the letter occurred in that string.
// It uses _.countBy().
//
// Underscore function _.countBy() is a function that takes an array and a
// function 'fun'. It calls 'fun' with each item of the given array and counts
// the number of times each unique return value of 'fun' is encountered.
// This is similar to _.groupBy() in that items are grouped based on the
// output of fun(item) but the count of items is returned instead of an
// array.
//
// ex. learn_underscore.countLetters('hello') -> {h: 1, e: 1, l: 2, o: 1}
// ex. learn_underscore.countLetters('zaaaa') -> {a: 4, z: 1}
learn_underscore.countLetters = function(string) {
  // this turns a string into an array of letters
  // 'hello' -> ['h', 'e', 'l', 'l', 'o']
  var stringArray = string.split('');

  // _.identity is a function that returns the argument that is passed to it without modification.
  // Same as function(x) { return x; }
  // When we call countBy with _.identity,
  return _.countBy(stringArray, _.identity);
}

// Exercise 8: learn_underscore.countBy(array, fun)
// Implement _.countBy() using _.groupBy()
//
// You may find _.mapObject() useful here.
// http://underscorejs.org/#mapObject
//
// ex.
//  var words = ['hello', 'great', 'foot', 'class', 'hi'];
//  function wordLength(word) {
//    return word.length;
//  }
//  learn_underscore.countBy(words, wordLength) -> {4: 1, 5: 3, 2: 1}
learn_underscore.countBy = function(array, fun) {
  var obj = _.groupBy(array, fun);
  obj = _.mapObject(obj, function(val) {
    return val.length;
  })
  return obj;
}
