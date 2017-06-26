"use strict";

window.prototypes = {};

// Part 3: Iteration.

// In this exercise, you will be implementing functions that will allow you to
// iterate through objects keys.

// Exercise 1 prototypes.allKeys()
// Write a function that receives an object and returns an array of all the keys
// in that object and on all the objects up its protoype chain.
// In the macbook example:

// var macBook = {
//   ram: "8gb",
//   processor: "i3",
// }
// var macBookPro = {
//   processor: "i5",
//   color: "Space gray"
// }
// var touchBarMacbook = {
//   extras: "touchBar"
// };
//
// macBookPro.__proto__ = macBook;
// touchBarMacbook.__proto__ = macBookPro;

// allKeys(touchBarMacbook) should return ["extras", "processor", "color", "ram"])
// allKeys(macBookPro) should return ["processor", "color", "ram"])
// allKeys(macBook) should return ["processor", "ram"])

prototypes.allKeys = function(obj){
  var arr = [];
  for (var key in obj){
    arr.push(key)
  }
  return arr;
}

// Exercise 2 prototypes.keys()
// Write a function that receives an object and returns an array of all the keys
// in that object ONLY. It should't return properties of objects up its protoype
// chain. In the macbook example:

// keys(macBookPro) should return ["processor", "color", "extras"])

prototypes.keys = function(obj){
  var arr = [];
  for (var key in obj){
    if(obj.hasOwnProperty(key)){
      arr.push(key)
    }
  }
  return arr;
}
