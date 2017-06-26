"use strict";

describe("solveCrossword()", function() {
  it("solveCrossword('the', ['_ # _ _ e']) -> true", function() {
    expect(solveCrossword('the', ['_ # _ _ e']) ).toBe(true);
  });
  it("solveCrossword('the', ['c _ _ _', 'd _ # e', 'r y _ _']) -> false", function() {
    expect(solveCrossword('the', ['c _ _ _', 'd _ # e', 'r y _ _']) ).toBe(false);
  });
  it("solveCrossword('joy', ['c _ _ _', 'd _ # e', 'r y _ _']) -> true", function() {
    expect(solveCrossword('joy', ['c _ _ _', 'd _ # e', 'r y _ _']) ).toBe(true);
  });
  it("solveCrossword('joy', ['c o n j', '_ _ y _', 'r _ _ #']) -> false", function() {
    expect(solveCrossword('joy', ['c o n j', '_ _ y _', 'r _ _ #']) ).toBe(false);
  });
  it("solveCrossword('clojure', ['_ _ _ # j o y', '_ _ o _ _ _ _', '_ _ f _ # _ _']) -> true", function() {
    expect(solveCrossword('clojure', ['_ _ _ # j o y', '_ _ o _ _ _ _', '_ _ f _ # _ _']) ).toBe(true);
  });
  it("solveCrossword('joy', ['_ # j o y', 'o _ # _ _', 'f _ # _ _']) -> true", function() {
    expect(solveCrossword('joy', ['_ # j o y', 'o _ # _ _', 'f _ # _ _']) ).toBe(true);
  });
});
