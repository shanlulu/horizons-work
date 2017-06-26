"use strict";

  describe("Array hasEqualContent", function() {

    it("[3, 2, 1].hasEqualContent([1, 2, 3]) -> true", function() {
      expect([3, 2, 1].hasEqualContent([1, 2, 3])).toBe(true);
    });
    it("[1, 2, 3].hasEqualContent([1, 2, 3]) -> true", function() {
      expect([1, 2, 3].hasEqualContent([1, 2, 3])).toBe(true);
    });
    it("[].hasEqualContent([]) -> true", function() {
      expect([].hasEqualContent([])).toBe(true);
    });
    it("[1, 3, 4].hasEqualContent([1, 3, 4, 5]) -> false", function() {
      expect([1, 3, 4].hasEqualContent([1, 3, 4, 5])).toBe(false);
    });
    it("[1, 2, 4].hasEqualContent([1, 3, 4]) -> false", function() {
      expect([1, 2, 4].hasEqualContent([1, 3, 4])).toBe(false);
    });
  })

  describe("Object hasEqualContent", function() {

    it("{a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3}) -> true", function() {
      expect({a:1, b:2, c:3}.hasEqualContent({a:1, b:2, c:3})).toBe(true);
    });
    it("{a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2}) -> true", function() {
      expect({a:1, b:2, c:3}.hasEqualContent({a:1, c:3, b:2})).toBe(true);
    });
    it("{}.hasEqualContent({}) -> true", function() {
      expect({}.hasEqualContent({})).toBe(true);
    });
    it("{a:1, b:2, c:3}.hasEqualContent({a:1, c:3}) -> false", function() {
      expect({a:1, b:2, c:3}.hasEqualContent({a:1, c:3})).toBe(false);
    });
    it("{a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3}) -> false", function() {
      expect({a:3, b:1, c:2}.hasEqualContent({a:1, b:2, c:3})).toBe(false);
    });
    it("{}.hasEqualContent({a:1, b:2, c:3}) -> false", function() {
      expect({}.hasEqualContent({a:1, b:2, c:3})).toBe(false);
    });

  })
