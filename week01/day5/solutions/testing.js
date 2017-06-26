"use strict";

// We use Jasmine, a JavaScript testing framework, to test our code.
//
// Jasmine documentation:
// http://jasmine.github.io/2.4/introduction.html

// Jasmine has three parts:
//  - Expectations
//  - Test specs (aka test cases)
//  - Test suites (aka groups of test cases)
//
// ----------Expectations and Test Specs----------
// An expectation is, well, an expectation about how our code should behave.
// They are created using the expect() function.
//
// Expectations need to be placed inside test cases. If you write an
// expectation in Jasmine not in any test spec it will generate an error.

// expect(true).toBe(true); // Error! Comment out this line to continue. XXX

// ----------Test Specs----------
// Test specs (or test cases) are groups of Expectations.  They are created
// using the it() function.  it() takes a string plain English description and
// a function containing expectations.
//
// This test case contains an expectation that verifies that true === true.

it("true should be true", function() {
  expect(true).toBe(true);
});

// ----------Test Suites----------
// Test suites are groups of test specs. They are created using the describe()
// function.  describe() takes a string plain English description and a
// function containing test specs.
//
// The same way it's useful to group code into meaningful chunks, it's useful
// to group tests into meaningful suites. We can get an overall sense of the
// health of our code by looking at which suites have errors.
//
// This is an empty test suite.
describe("Example empty test suite", function() {
});

// This test suite has one spec inside it.
describe("Example test suite with one test spec", function() {
  it("true should be true", function() {
    expect(true).toBe(true);
  });
});

// ----------Expectation Types----------
describe("Tests for expectation types", function() {
  // The most basic expectation in Jasmine is toBe(). It compares the expected
  // and actual values with ===.  So expect(x).toBe(y) will fail unless  x === y
  // is true.

  // We can negate (i.e. flip) Jasmine expectations using 'not.' Insert
  // 'not.' (including the period) before 'toBe(' below.
  it("true should not be false", function() {
    expect(true).not.toBe(false); // Fix this test! XXX
  });

  // toBe() uses === to compare things. === doesn't work the way we want when
  // comparing arrays and objects. For comparing arrays and objects Jasmine
  // offers another expectation type: toEqual().

  it("array [1] should be equal to [1]", function() {
    expect([1]).toEqual([1]); // Fix this test case XXX
  });

  // We can use 'not' to negate toEqual() checks too.
  it("array [1] should not be equal to [2]", function() {
    expect([1]).not.toEqual([2]); // Fix this test case XXX
  });

  // .toBeTruthy() checks if a value is truthy
  it("1 should be truthy", function() {
    expect(1).toBeTruthy(); // Fix this test case XXX
  });

  // .toBeFalsy() does the oppsite of .toBeTruthy()
  it("0 should be falsy", function() {
    expect(0).toBeFalsy(); // Fix this test case XXX
  });

  // Normally, if your code throws an error (generates an exception) then Jasmine will
  // consider your expectation to have failed.
  //
  // Sometimes we expect an exception to be thrown and we want our test to fail if it
  // isn't. .toThrow() allows us to do just that.
  //
  // When using .toThrow(), we need to give expect() a function instead of a regular value.
  //
  // So:
  //
  // expect(throw "Error").toThrow(); // Bad
  // expect(function() { throw "Error" }).toThrow(); // Good
  function error() {
    throw "Error!";
  }

  // Wrap error() in a function
  it("error() should throw an exception", function() {
    expect(function() { error() }).toThrow(); // Fix this test case XXX
  });

  // Jasmine offers other expectation types too. Read up on them here:
  // http://jasmine.github.io/2.4/introduction.html#section-Expectations
});
