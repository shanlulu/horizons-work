module.exports = {
  // Part 1: run(fun)
  // Write a function that takes a function ‘fun’, calls the function and
  // returns its return value.
  //
  // ex.
  // function oneReturner() {
  //   return 1;
  // }
  // run(oneReturner) -> 1
  // ex. another way of saying the same thing as above
  // run(function() { return 1; }) -> 1
  run: function(fun) {
    // YOUR CODE HERE
  },

  // Part 2: 2.2 runOneAfterAnother(fun1, fun2)
  // Write a function that takes two functions fun1, fun2 and calls fun1 then fun2.
  // ex.
  // function logA() {
  //  console.log('A')
  // }
  // function logB() {
  //  console.log('B')
  // }
  // runOneAfterAnother(logA, logB) -> outputs to console 'A' followed by 'B'
  runOneAfterAnother: function(fun1, fun2) {
    // YOUR CODE HERE
  },

  // Example 2.5 once(f)
  // This is a function that takes a function f and returns a function g.
  // When you call g() it calls f() once and only once. No matter how many times you call
  // g(), f() should only be called once.
  // ex.
  //  function log() {
  //    console.log('called log');
  //  }
  //  var onceLog = once(log);
  //  onceLog(); -> outputs 'called log' to console
  //  onceLog(); -> does nothing
  //  onceLog(); -> does nothing
  once: function(f) {
    // YOUR CODE HERE
  }
};
