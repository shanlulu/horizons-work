"use strict";

window.copyToolbox = {


// On this exercise, you will be implementing functions that will deep copy arrays
// and objects

// Exercise 1: Deep Array Copy
// On this exercise, you will get an array that may contain nested arrays
// (arrays inside other arrays). You will create a function that copies the arrays
// and their nested arrays so changes on one never affects the other.

// ex. copyToolbox.deepArrayCopy([0, 1, 2, 3]) -> [0, 1, 2, 3]
// ex. copyToolbox.deepArrayCopy([1, 2, [4, 1]]) -> [1, 2, [4, 1]]]
// ex. copyToolbox.deepArrayCopy([[[1]]) -> [[[1]]]

// Test it out!
// var a = [1, 2, [3, 4]];
// var b = copyToolbox.deepArrayCopy(a);
// b[2][0] = 0;
// b should be modified -> [0, 2, [ 0, 4 ]]
// a shouldnt be modified -> [ 1, 2, [0, 4]]


// Hint: Recurssive solution.
// The easiest way to implement this exercise is to use recursion because it allows
// you to navigate through sub-arrays without you having to do it manually.

// This means our function has to identify the type of objects it receive and do
// one of two things. If the element is an array, the function will have to go
// through all the elements on it, calling itself with each element as argument.
// If it is not an array, it should return the value as-is to build the new array
// with it.

// This means that deepArrayCopy will be called at least once for every element
// on the original array be it a number or a sub-array. and it also means it will
// get called once for every element on sub arrays so:

// var arr = [1, [2, 3]];
// deepArrayCopy(arr) will check if arr is an array. Because it is an array, it
// will call deepArrayCopy with every element in it, so doing deepArrayCopy(arr)
// does the following:

// deepArrayCopy([1, [2, 3]]) calls:
//   deepArrayCopy(1) -> returns 1
//   deepArrayCopy([2, 3]) -> calls:
//     deepArrayCopy(2) -> returns 2
//     deepArrayCopy(3) -> returns 3

  deepArrayCopy: function(arr) {
// YOUR CODE HERE
  },

// Exercise 2: Deep Object Copy

// On this exercise, you will get an object that may contain nested objects
// (objects inside other objects) or any other data type except arrays. You will
// create a function that copies the objects and their nested objects so changes on
// one never affects the other. We have the following person object:

// var personA = {
//   name: "Ethan",
//   title: "instructor",
//   school: {
//     name: "horizons",
//     address: "3879 23rd street, San Francisco, California 94114"
//   }
// }

// Test it out yourself!
// var a = { b: "b", d: { c:{ f: "f"} } }
// var b = copyToolbox.deepObjectCopy(a);
// b.d.c = "nothing";
// a shouldnt be modified -> { b: 'b', d: { c: { f: 'f' } } }
// b should be modified -> { b: 'b', d: { c: 'nothing' } }

// Tests
// When doing copyToolbox.deepObjectCopy(personA):
// - The copy should contain the same names+values
// - Modyfing a sub-object on the copy should't modify the original
// - The copy should contain a copy of the original's nested objects
// - Sub-objects on copies on the copy shouldn't be the same as on the original

  deepObjectCopy: function(obj) {
// YOUR CODE HERE
  },


// Bonus Exercise: Deep Object & Array Copy

// On this exercise, you will get an object (or array) that may contain nested
// objects and arrays. You will create a function that copies the objects, arrays
// and their nested values so changes on one the copy affects the original. We
// have the following person object:

// var personA = {
//   name: "Ethan",
//   title: "instructor",
//   exercises: ['a', 'b',[['c', {foo: "bar"}]]],
//   school: {
//     name: "horizons",
//     address: "3879 23rd street, San Francisco, California 94114",
//     students: ["Mark", "Alex", ["Jamie", ["Abhi"]]]
//   }
// }

// Tests
// When doing copyToolbox.deepCopy(obj):
// - The copy should contain the same names+values (including objects&arrays)
// - Modyfing a sub-object (or sub array) on the copy should't modify the original
// - The copy should contain a copy of the original's nested objects
// - Sub-objects on copies on the copy shouldn't be the same as on the original

// Hint: Be extra careful when deciding what is an object and an array in JS!
// arrays are objects in JS and may result in unexpected behavior!

deepCopy: function(obj) {
// YOUR CODE HERE
}

};
