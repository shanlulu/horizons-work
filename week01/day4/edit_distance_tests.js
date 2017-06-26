"use strict";

describe("editDistance()", function() {
  it("editDistance('kitten', 'sitting') -> 3", function() {
    expect(editDistance('kitten', 'sitting') ).toBe(3);
  });
  it("editDistance('closure', 'clojure') -> 1", function() {
    expect(editDistance('closure', 'clojure') ).toBe(1);
  });
  it("editDistance('clojure', 'closure') -> 1", function() {
    expect(editDistance('clojure', 'closure') ).toBe(1);
  });
  it("editDistance('xyx', 'xyyyx') -> 2", function() {
    expect(editDistance('xyx', 'xyyyx') ).toBe(2);
  });
  it("editDistance('', '123456') -> 6", function() {
    expect(editDistance('', '123456') ).toBe(6);
  });
  it("editDistance('Clojure', 'Clojure') -> 0", function() {
    expect(editDistance('Clojure', 'Clojure') ).toBe(0);
  });
  it("editDistance('', '') -> 0", function() {
    expect(editDistance('', '') ).toBe(0);
  });
  it("editDistance('1234', '02345') -> 2", function() {
    expect(editDistance('1234', '02345') ).toBe(2);
  });
  it("editDistance('abcd', 'ad') -> 2", function() {
    expect(editDistance('abcd', 'ad') ).toBe(2);
  });
  it("editDistance('ttttattttctg', 'tcaaccctaccat') -> 10", function() {
    expect(editDistance('ttttattttctg', 'tcaaccctaccat') ).toBe(10);
  });
  it("editDistance('gaattctaatctc', 'caaacaaaaaattt') -> 9", function() {
    expect(editDistance('gaattctaatctc', 'caaacaaaaaattt') ).toBe(9);
  });
  it("editDistance('gaattctaatctc', 'caaacaaaaaattt') -> 9", function() {
    expect(editDistance('gaattctaatctc', 'caaacaaaaaattt') ).toBe(9);
  });
  it("editDistance('hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello', 'hallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallo') -> 18", function() {
    expect(editDistance('hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello', 'hallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallohallo') ).toBe(18);
  });
  it("editDistance('abcdefghijklmnopqrstuvwxyz', 'zyxwvutsrqponmlkjihgfedcba') -> 26", function() {
    expect(editDistance('abcdefghijklmnopqrstuvwxyz', 'zyxwvutsrqponmlkjihgfedcba') ).toBe(26);
  });
  it("editDistance('hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello', 'hallohallohallo') -> 78", function() {
    expect(editDistance('hellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohellohello', 'hallohallohallo') ).toBe(78);
  });

});
