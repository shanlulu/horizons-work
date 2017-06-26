"use strict";

describe("horizons.password()", function() {
  var horizons;
  beforeEach(function() {
    horizons = createUser('horizons', 'horizonites');
  });
  it("horizons.login('horizonites') -> true", function() {
    expect(horizons.login('horizonites')).toBe(true);
  });
});

describe("once()", function() {
  var square = function(x) {
    return x * x;
  }
  var cube = function(x) {
    return x * x * x;
  }
  var multiply = function(a, b) {
    return a * b;
  }
  var exponentiate = function(x, y) {
    return Math.pow(x, y);
  }
  var squareNum = once(square);
  var cubeNum = once(cube);
  var multiplyNum = once(multiply);
  var exponentiateNum = once(exponentiate);

  it("squareNum(3) -> 9", function() {
    expect(squareNum(3)).toEqual(9);
  });
  it("squareNum(4) -> 9", function() {
    expect(squareNum(4)).toEqual(9);
  });

  it("cubeNum(5) -> 125", function() {
    expect(cubeNum(5)).toEqual(125);
  });
  it("cubeNum(6) -> 125", function() {
    expect(cubeNum(6)).toEqual(125);
  });

  it("multiplyNum(5, 6) -> 30", function() {
    expect(multiplyNum(5, 6)).toEqual(30);
  });
  it("multiplyNum(6, 7) -> 30", function() {
    expect(multiplyNum(6, 7)).toEqual(30);
  });

  it("exponentiateNum(5, 5) -> 3125", function() {
    expect(exponentiateNum(5, 5)).toEqual(3125);
  });
  it("exponentiateNum(6, 5) -> 3125", function() {
    expect(exponentiateNum(6, 5)).toEqual(3125);
  });
});

describe("functionFactory()", function() {
  it("functionFactory(0,2) -> [function, function, function]", function() {
    var funs = functionFactory(0,2);
    expect(funs.length).toBe(3);
    funs.forEach(function(fun, i) {
      expect(fun()).toEqual(i);
    });
  });
  it("negative numbers functionFactory(-5, 15)", function() {
    var funs = functionFactory(-5, 15);
    expect(funs.length).toBe(21);
    funs.forEach(function(fun, i) {
      expect(fun()).toEqual(i-5);
    });
  });
});
