"use strict";

// Exercise 1. Constructor
// Define the constructor and namespace of a class in Javascript.
// 
// hint. A way to define classes in Javascript takes this form (I'm defining a Person class):
//
//  var Person = function(name) {
//    // This is where you would set object properties, like:
//    this.name = name;
//    // When the object is instantiated, this statement assigns a given argument `name` to the `name` property in an instance of the Person object.
//    ...
//  };
//  You instantiate objects like this:
//  var ben = new Person("Ben");
//  In the constructor, we set the argument `name` to `this.name`, which allows you to do this:
//  var hisName = ben.name;
// 
// hint. see http://stackoverflow.com/questions/387707/what-techniques-can-be-used-to-define-a-class-in-javascript-and-what-are-their

// Exercise 2. Property definitions
// Add statements for defining the `name`, `grades` and `major` properties of the Student class
// 
// note. The `name` and `major` arguments for the constructor will both be strings
// note. The `grades` argument should be an array of numbers.

// Exercise 3. Method definitions
// Write statements that define a `getGPA` function for the student.
// 
// hint. methods can be defined in a few different ways in JS, like:
// 
// inside the constructor, much like a property:
//  var Person = funtion(name) {
//    this.name = name
// 
//    this.getName = function() {
//      return this.name;
//    }
// };
// 
// or on the *prototype* of the class:
// 
//  var Person = function(name) {
//    this.name = name;
//  };
//  
//  Person.prototype.getName = function() {
//    return this.name;
//  };
// 
// In both cases, you'll be able to call the method using this syntax:
// 
// var johnny = new Person("John Cena");
// johnny.getName() -> "John Cena";


// Constructor & Properties

// YOUR CODE HERE

// Methods Declarations

// YOUR CODE HERE

// Exercise 4. Using Objects - sortByGPA(students<Student[]>)
// Write a function that takes an array of the <Student> objects you've implemented and return an array of the students sorted from lowest to highest.
// 
// 
// ex.
//  var reggie = new Student("Reggie", [1, 3], "Theater Arts");
//  var betty = new Student("Betty", [4, 3], "Biology");
//  var archie = new Student("Archie", [2, 2], "Accounting");
//  var students = [reggie, betty, archie];
//  sortStudentsByGPA(students) -> [ reggie, archie, betty ]
// 
// hint. this will be similar to how you sorted objects in previous lessons.
var sortByGPA = function(students) {
  // YOUR CODE HERE
};
