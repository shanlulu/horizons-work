"use strict";

describe("RPN Calculator", function() {
  it("rpnCalculator('0 1') -> Error", function() {
    expect(function() { rpnCalculator("0 1") }).toThrow();
  });

  it("rpnCalculator('*') -> Error", function() {
    expect(function() { rpnCalculator("*") }).toThrow();
  });

  it("rpnCalculator('1 2 * 3 + *') -> Error", function() {
    expect(function() { rpnCalculator("1 2 * 3 + *") }).toThrow();
  });

  it("rpnCalculator('2 *') -> Error", function() {
    expect(function() { rpnCalculator("2 *") }).toThrow();
  });

  it("rpnCalculator('0') -> 0", function() {
    expect(rpnCalculator("0") ).toBe(0);
  });
  it("rpnCalculator('10') -> 10", function() {
    expect(rpnCalculator("10") ).toBe(10);
  });
  it("rpnCalculator('-8 8 -') -> -16", function() {
    expect(rpnCalculator('-8 8 -') ).toBe(-16);
  });
  it("rpnCalculator('-10 1 /') -> -10", function() {
    expect(rpnCalculator('-10 1 /') ).toBe(-10);
  });
  it("rpnCalculator('3 1 /') -> 3", function() {
    expect(rpnCalculator('3 1 /') ).toBe(3);
  });
  it("rpnCalculator('-8 -2 - 8 /') -> -0.75", function() {
    expect(rpnCalculator('-8 -2 - 8 /') ).toBe(-0.75);
  });
  it("rpnCalculator('2 -2 8 - /') -> -0.2", function() {
    expect(rpnCalculator('2 -2 8 - /') ).toBe(-0.2);
  });
  it("rpnCalculator('3 -3 + 6 - 2 * -9 +') -> -21", function() {
    expect(rpnCalculator('3 -3 + 6 - 2 * -9 +') ).toBe(-21);
  });
  it("rpnCalculator('1 -3 6 2 -9 + - * +') -> -38", function() {
    expect(rpnCalculator('1 -3 6 2 -9 + - * +') ).toBe(-38);
  });
  it("rpnCalculator('4 9 + -4 * 8 / 10 - 2 + 2 + 3 + 3 + -4 /') -> 1.625", function() {
    expect(rpnCalculator('4 9 + -4 * 8 / 10 - 2 + 2 + 3 + 3 + -4 /') ).toBe(1.625);
  });
  it("rpnCalculator('1 7 - -7 + -9 - 7 - -5 + 7 * 1 * -10 * 1 * -6 *') -> -6720", function() {
    expect(rpnCalculator('1 7 - -7 + -9 - 7 - -5 + 7 * 1 * -10 * 1 * -6 *') ).toBe(-6720);
  });
  it("rpnCalculator('-6 7 -7 -9 7 -5 7 1 -10 1 -6 - + - - + * * * * *') -> 37044", function() {
    expect(rpnCalculator('-6 7 -7 -9 7 -5 7 1 -10 1 -6 - + - - + * * * * *') ).toBe(37044);
  });
});

describe("isNumberString()", function() {
  it("isNumberString('') -> false", function() {
    expect(isNumberString('') ).toBe(false);
  });
  it("isNumberString('a') -> false", function() {
    expect(isNumberString('a') ).toBe(false);
  });
  it("isNumberString('1a') -> false", function() {
    expect(isNumberString('1a') ).toBe(false);
  });
  it("isNumberString('*') -> false", function() {
    expect(isNumberString('*') ).toBe(false);
  });
  it("isNumberString('0.1') -> true", function() {
    expect(isNumberString('0.1') ).toBe(true);
  });
  it("isNumberString('-1') -> true", function() {
    expect(isNumberString('-1') ).toBe(true);
  });
  it("isNumberString('0') -> true", function() {
    expect(isNumberString('0') ).toBe(true);
  });
  it("isNumberString('-0.4') -> true", function() {
    expect(isNumberString('-0.4') ).toBe(true);
  });
});
