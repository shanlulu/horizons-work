"use strict";

window.prototypes = {};

// Part 3. Adding methods to collections

// You are going to implement a function that compares if two arrays have the same
// things, without necessarily having the same order.

// [3, 2, 1].hasEqualContent([1, 2, 3]) -> true
// [1, 2, 3].hasEqualContent([1, 2, 3]) -> true
// [].hasEqualContent([]) -> true
// [1, 3, 4].hasEqualContent([1, 3, 4, 5]) -> false
// [1, 2, 4].hasEqualContent([1, 3, 4]) -> false

// Hint: the first thing you have to figure out is how to get the first array
// inside the function. Then you can compare it to array2.

Array.prototype.hasEqualContent = function(array2){
  var sort1 = this.sort();
  var sort2 = array2.sort();
  // console.log(sort1);
  // console.log(sort2);
  if (sort1.length !== sort2.length) {
    return false;
  }
  for (var i = 0; i < sort1.length; i++) {
    if (sort2[i] !== sort1[i]) {
      return false;
    }
  }
  return true;
}

// You are going to implement a function that compares if two Objects have the same
// key-value pairs.

// {a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> true
// {}.hasEqualContent({}) -> true
// {a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> false
// {a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> false

// Hint: use the Array.prototype.hasEqualContent to compare the content of an object,
// without having to account for the order of elements.

Object.prototype.hasEqualContent = function(object2){
  var obj1 = [];
  var obj2 = [];
  for (var key in this) {
    obj1.push([key, this[key]]);
  }
  for (var k in object2) {
    obj2.push([k, object2[k]]);
  }
  if (obj1.length !== obj2.length) {
    return false;
  }
  for (var i = 0; i < obj1.length; i++) {
    if (!obj2.sort()[i].hasEqualContent(obj1.sort()[i])) {
      return false;
    }
  }
  return true;
}
