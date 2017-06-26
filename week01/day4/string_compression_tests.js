"use strict";

describe("compressString()", function() {
  it("compressString('') -> ''", function() {
    expect(compressString('') ).toBe('');
  });
  it("compressString('a') -> 'a'", function() {
    expect(compressString('a') ).toBe('a');
  });
  it("compressString('aa') -> 'a2'", function() {
    expect(compressString('aa') ).toBe('a2');
  });
  it("compressString('aaaaaaaaa') -> 'a9'", function() {
    expect(compressString('aaaaaaaaa') ).toBe('a9');
  });
  it("compressString('abcaaabbb') -> 'abca3b3'", function() {
    expect(compressString('abcaaabbb') ).toBe('abca3b3');
  });
  it("compressString('abcd') -> 'abcd'", function() {
    expect(compressString('abcd') ).toBe('abcd');
  });
  it("compressString('aaabaaaaccaaaaba') -> 'a3ba4c2a4ba'", function() {
    expect(compressString('aaabaaaaccaaaaba') ).toBe('a3ba4c2a4ba');
  });
});
