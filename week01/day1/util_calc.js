window.util = {};

// Calculator Exercise
//
// Write a function calc() that takes a string that represents an arithmetic
// operation (such as "3 + 2") and returns the numerical result of the
// operation.
//
// You can assume that each number or operator (i.e. + - / *) is separated by a single
// space.
//
// Part 1. If an invalid expression is given, throw an exception.
//
// ex. util.calc('') -> Error, empty expression
// ex. util.calc('1 2') -> Error, missing operator
// ex. util.calc('-') -> Error, no numbers
// ex. util.calc('1 2 +') -> Error, operator at the wrong spot
// ex. util.calc('+ 1 -18') -> Error, operator at the wrong spot
// ex. util.calc('1 + 55 -2') -> Error, too many numbers
// ex. util.calc('29 + + 1') -> Error, too many operators
// ex. util.calc('29 + 1 +') -> Error, too many operators
//
// Part 2. Implement support for addition and subtraction.
//
// ex. util.calc('1') -> 1
// ex. util.calc('-12') -> -12
// ex. util.calc('3 + 2') -> 5
// ex. util.calc('3 + 8 + 2 + 1    ') -> 14
// ex. util.calc('2 - 1 + 5 + 6') -> 12
// ex. util.calc('-1 + 3 - 2 + 5') -> 5
//
// Part 3. Implement support for multiplication and division.
// Note that the order of operations matters. Multiplication and division needs
// to be perfomed before addition and subtraction.
//
// ex. util.calc('1 * 3 / 5 + 2') -> 2.6
// ex. util.calc('1 + 3 / 2 - 5') -> -2.5
// ex. util.calc('5 * 6 + 8 / 9 * 4.5') -> 34
// ex. util.calc('1 / 0 + 1 * 0') -> Infinity
// ex. util.calc('1 / 0 * 0 + 1') -> NaN
//
// Bonus: Implement support for the square root operator.
// Implement support for the `sqrt` operator. `sqrt` is an operator that takes
// only one argument (i.e. a unary operator). `sqrt` applied before all other
// operators
// other operators and only operates on the value after it.
// There should be a single space before and after `sqrt`.
//
// Note: you can use the builtin Math.sqrt() function.
//
// ex. util.calc('sqrt 4') -> 2, same as Math.sqrt(4)
// ex. util.calc('sqrt 4 - 3') -> -1
// ex. util.calc('-1 * sqrt 4 - 3') -> -5
// ex. util.calc('sqrt 9 - 3 * 10') -> -27
// ex. util.calc('10 * sqrt 81') -> 90
util.calc = function(expression) {
  var arrExpression = expression.trim().split(' ');

  while (arrExpression.includes('sqrt')) {
    var k = arrExpression.indexOf('sqrt');
    var n = Math.sqrt(parseFloat(arrExpression[k+1]));
    arrExpression[k]= n;
    arrExpression.splice(k+1,1);
  }

  for (var i = 0; i < arrExpression.length; i += 2) {
    var num = parseFloat(arrExpression[i]);
    if (isNaN(num)) {
      throw "Invalid expression";
    }
  }
  for (var j = 1; j < arrExpression.length; j += 2) {
    var operator = parseFloat(arrExpression[j]);
    if (!isNaN(operator) || j === arrExpression.length-1) {
      throw "Invalid expression";
    }
  }
  if (arrExpression.length === 1) {
    return parseFloat(arrExpression[0]);
  }


  var k = 0;
  //for (var k = 0; k < arrExpression.length; k++) {
  while (arrExpression.join().includes('*') || arrExpression.join().includes('/')) {
    if (arrExpression[k] === "*") {
      var res = parseFloat(arrExpression[k-1]) * parseFloat(arrExpression[k+1]);
      arrExpression[k-1] = res;
      arrExpression.splice(k,2);
      k=0;
    } else if (arrExpression[k] === "/") {
      var res = parseFloat(arrExpression[k-1]) / parseFloat(arrExpression[k+1]);
      arrExpression[k-1] = res;
      arrExpression.splice(k,2);
      k=0;
    }
    k++;
  }


  while (arrExpression.length > 1 && ["+", "-"].includes(arrExpression[1])) {
  //if (true) {
    if (arrExpression[1] === "+") {
      var first = parseFloat(arrExpression.shift());
      arrExpression.shift();
      var second = parseFloat(arrExpression[0]);
      arrExpression[0] = first + second;
    } else if (arrExpression[1] === "-") {
      var first = parseFloat(arrExpression.shift());
      arrExpression.shift();
      var second = parseFloat(arrExpression[0]);
      arrExpression[0] = first - second;
    }
  }
  return arrExpression[0];
}
