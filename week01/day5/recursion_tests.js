"use strict";

describe("recursion.sum(number)", function() {
  it("recursion.sum(1) -> 1", function() {
    expect(recursion.sum(1)).toBe(1);
  });

  it("recursion.sum(2) -> 3", function() {
    expect(recursion.sum(2)).toBe(3);
  });

  it("recursion.sum(3) -> 6", function() {
    expect(recursion.sum(3)).toBe(6);
  });

  it("recursion.sum(4) -> 10", function() {
    expect(recursion.sum(4)).toBe(10);
  });

  it("recursion.sum(5) -> 15", function() {
    expect(recursion.sum(5)).toBe(15);
  });

  it("recursion.sum(10) -> 55", function() {
    expect(recursion.sum(10)).toBe(55);
  });

  it("recursion.sum(100) -> 5050", function() {
    expect(recursion.sum(100)).toBe(5050);
  });
});

describe("recursion.factorial(number)", function() {
  it("recursion.factorial(0) -> 1", function() {
    expect(recursion.factorial(0)).toBe(1);
  });

  it("recursion.factorial(1) -> 1", function() {
    expect(recursion.factorial(1)).toBe(1);
  });

  it("recursion.factorial(2) -> 2", function() {
    expect(recursion.factorial(2)).toBe(2);
  });

  it("recursion.factorial(3) -> 6", function() {
    expect(recursion.factorial(3)).toBe(6);
  });

  it("recursion.factorial(4) -> 24", function() {
    expect(recursion.factorial(4)).toBe(24);
  });

  it("recursion.factorial(5) -> 120", function() {
    expect(recursion.factorial(5)).toBe(120);
  });

  it("recursion.factorial(17) -> 355687428096000", function() {
    expect(recursion.factorial(17)).toBe(355687428096000);
  });
});

describe("recursion.fibonacci(number)", function() {
  it("recursion.fibonacci(0) -> 0", function() {
    expect(recursion.fibonacci(0)).toBe(0);
  });

  it("recursion.fibonacci(1) -> 1", function() {
    expect(recursion.fibonacci(1)).toBe(1);
  });

  it("recursion.fibonacci(2) -> 1", function() {
    expect(recursion.fibonacci(2)).toBe(1);
  });

  it("recursion.fibonacci(3) -> 2", function() {
    expect(recursion.fibonacci(3)).toBe(2);
  });

  it("recursion.fibonacci(4) -> 3", function() {
    expect(recursion.fibonacci(4)).toBe(3);
  });

  it("recursion.fibonacci(10) -> 55", function() {
    expect(recursion.fibonacci(10)).toBe(55);
  });

  it("recursion.fibonacci(15) -> 610", function() {
    expect(recursion.fibonacci(15)).toBe(610);
  });

  it("recursion.fibonacci(21) -> 10946", function() {
    expect(recursion.fibonacci(21)).toBe(10946);
  });
  it("recursion.fibonacci(45) -> 10946", function() {
    expect(recursion.fibonacci(45)).toBe(1134903170);
  });
});
