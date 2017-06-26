"use strict";

describe("learn_underscore.contains(item, array)", function() {
  beforeEach(function() {
    spyOn(_, 'any').and.callThrough();
  });

  it("learn_underscore.contains([], 'a') should call _.any()", function() {
    learn_underscore.contains([], 'a');
    expect(_.any).toHaveBeenCalled();
  });

  it("learn_underscore.contains([], 'a') -> false", function() {
    expect(learn_underscore.contains([], 'a')).toBe(false);
  });

  it("learn_underscore.contains(['a'], 'a') -> true", function() {
    expect(learn_underscore.contains(['a'], 'a')).toBe(true);
  });

  it("learn_underscore.contains(['a', 'b', 'c'], 1) -> false", function() {
    expect(learn_underscore.contains(['a', 'b', 'c'], 1)).toBe(false);
  });
});

describe("learn_underscore.hasZeros(array)", function() {
  it("learn_underscore.hasZeros([]) -> false", function() {
    expect(learn_underscore.hasZeros([]) ).toBe(false);
  });
  it("learn_underscore.hasZeros([1]) -> false", function() {
    expect(learn_underscore.hasZeros([1]) ).toBe(false);
  });
  it("learn_underscore.hasZeros([1, 0, 0]) -> true", function() {
    expect(learn_underscore.hasZeros([1, 0, 0]) ).toBe(true);
  });
  it("learn_underscore.hasZeros([0]) -> true", function() {
    expect(learn_underscore.hasZeros([0]) ).toBe(true);
  });
});

describe("learn_underscore.any(array, fun)", function() {
  beforeEach(function() {
    spyOn(_, 'reduce').and.callThrough();
  });

  function isTruthy(item) {
    return !! item;
  }

  function isEven(item) {
    return item % 2 === 0;
  }

  function isPrime(item) {
    if (!isFinite(item) || item % 1 || item < 2) return false; 
    var m = Math.sqrt(item);
    for (var i = 2; i <= m; i++) {
      if (item % i == 0) return false;
    }
    return true;
  }

  it("learn_underscore.any([1], isTruthy) calls _.reduce()", function() {
    learn_underscore.any([1], isTruthy);
    expect(_.reduce).toHaveBeenCalled();
  });
  it("learn_underscore.any([], isTruthy) -> false", function() {
    expect(learn_underscore.any([], isTruthy) ).toBeFalsy();
  });
  it("learn_underscore.any([0, 0], isTruthy) -> false", function() {
    expect(learn_underscore.any([0, 0], isTruthy) ).toBe(false);
  });
  it("learn_underscore.any([0, 1, 0], isTruthy) -> true", function() {
    expect(learn_underscore.any([0, 1, 0], isTruthy) ).toBe(true);
  });
  it("learn_underscore.any([1], isTruthy) -> true", function() {
    expect(learn_underscore.any([1], isTruthy) ).toBe(true);
  });
  it("learn_underscore.any([1, 3, 5, 7], isEven) -> false", function() {
    expect(learn_underscore.any([1, 3, 5, 7], isEven)).toBe(false);
  });
  it("learn_underscore.any([1, 3, 5, 2, 7], isEven) -> true", function() {
    expect(learn_underscore.any([1, 3, 5, 7, 2], isEven)).toBe(true);
  });
  it("learn_underscore.any([40, 90, 1, 8, 20], isPrime) -> false", function() {
    expect(learn_underscore.any([40, 90, 1, 8, 20], isPrime)).toBe(false);
  });
  it("learn_underscore.any([40, 90, 1, 5, 8, 20], isPrime) -> true", function() {
    expect(learn_underscore.any([40, 90, 1, 5, 8, 20], isPrime)).toBe(true);
  });
});

describe("learn_underscore.reduce(array, fun)", function() {
  function sum(a, b) {
    return a + b;
  }
  it("learn_underscore.reduce([1], sum) -> 1", function() {
    expect(learn_underscore.reduce([1], sum) ).toBe(1);
  });
  it("learn_underscore.reduce([1, 2], sum) -> 3", function() {
    expect(learn_underscore.reduce([1, 2], sum) ).toBe(3);
  });
  it("learn_underscore.reduce([1, 2, -3], sum) -> 0", function() {
    expect(learn_underscore.reduce([1, 2, -3], sum) ).toBe(0);
  });
  it("learn_underscore.reduce([1, -1, 2, -3], sum) -> -1", function() {
    expect(learn_underscore.reduce([1, -1, 2, -3], sum) ).toBe(-1);
  });
  it("learn_underscore.reduce([0], sum) -> 0", function() {
    expect(learn_underscore.reduce([0], sum) ).toBe(0);
  });

  function and(a, b) {
    return a && b;
  }
  it("learn_underscore.reduce([true], and) -> true", function() {
    expect(learn_underscore.reduce([true], and) ).toBe(true);
  });
  it("learn_underscore.reduce([true, true, true], and) -> true", function() {
    expect(learn_underscore.reduce([true, true, true], and) ).toBe(true);
  });
  it("learn_underscore.reduce([true, false], and) -> false", function() {
    expect(learn_underscore.reduce([true, false], and) ).toBe(false);
  });
  it("learn_underscore.reduce([true, false, true, true], and) -> false", function() {
    expect(learn_underscore.reduce([true, false, true, true], and) ).toBe(false);
  });
  it("learn_underscore.reduce([false], and) -> false", function() {
    expect(learn_underscore.reduce([false], and) ).toBe(false);
  });
  it("learn_underscore.reduce([false, false], and) -> false", function() {
    expect(learn_underscore.reduce([false, false], and) ).toBe(false);
  });
});

describe("learn_underscore.keys(object)", function() {
  it("learn_underscore.keys({}) -> []", function() {
    expect(learn_underscore.keys({}) ).toEqual([]);
  });
  it("learn_underscore.keys({a: 1, hello: 10}) -> ['a', 'hello']", function() {
    expect(learn_underscore.keys({a: 1, hello: 10}).length).toBe(['a', 'hello'].length);
    expect(learn_underscore.keys({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining(['a', 'hello']));
  });
});

describe("learn_underscore.values(object)", function() {
  it("learn_underscore.values({}) -> []", function() {
    expect(learn_underscore.values({}) ).toEqual([]);
  });
  it("learn_underscore.values({a: 1, hello: 10}) -> [1, 10]", function() {
    expect(learn_underscore.values({a: 1, hello: 10}).length).toEqual([1, 10].length);
    expect(learn_underscore.values({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining([1, 10]));
  });
});

describe("learn_underscore.pairs(object)", function() {
  it("learn_underscore.pairs({}) -> []", function() {
    expect(learn_underscore.pairs({}) ).toEqual([]);
  });
  it("learn_underscore.pairs({a: 1, hello: 10}) -> [['a', 1], ['hello', 10]]", function() {
    expect(learn_underscore.pairs({a: 1, hello: 10}).length ).toBe([['a', 1], ['hello', 10]].length);
    expect(learn_underscore.pairs({a: 1, hello: 10}) ).toEqual(jasmine.arrayContaining([['a', 1], ['hello', 10]]));
  });
});

describe("learn_underscore.groupByState(people)", function() {
  it("learn_underscore.groupByState(people)", function() {
    var people = [
    {name: 'Darwish', state: 'GA'},
    {name: 'Moose', state: 'CA'},
    {name: 'Lane', state: 'PA'},
    {name: 'Ethan', state: 'CA'},
    {name: 'Josh', state: 'NJ'},
    {name: 'Edward', state: 'FR'},
    {name: 'Abhi', state: 'GA'}
    ];
    expect(learn_underscore.groupByState(people)).toEqual({
      "GA": [
      { "name": "Darwish", "state": "GA" },
      { "name": "Abhi", "state": "GA" }
      ],
      "CA": [
      { "name": "Moose", "state": "CA" },
      { "name": "Ethan", "state": "CA" }
      ],
      "PA": [
      { "name": "Lane", "state": "PA" }
      ],
      "NJ": [
      { "name": "Josh", "state": "NJ" }
      ],
      "FR": [
      { "name": "Edward", "state": "FR" }
      ]
    });
  });
});

describe("learn_underscore.countLetters(string)", function() {
  it("learn_underscore.countLetters('hello') -> {h: 1, e: 1, l: 2, o: 1}", function() {
    expect(learn_underscore.countLetters('hello') ).toEqual({h: 1, e: 1, l: 2, o: 1});
  });
  it("learn_underscore.countLetters('zaaaa') -> {a: 4, z: 1}", function() {
    expect(learn_underscore.countLetters('zaaaa') ).toEqual({a: 4, z: 1});
  });
});

describe("learn_underscore.countBy(array, fun)", function() {
  it("learn_underscore.countBy(words, wordLength) -> {4: 1, 5: 3, 2: 1}", function() {
    var words = ['hello', 'great', 'foot', 'class', 'hi'];

    function wordLength(word) {
      return word.length;
    }
    
    expect(learn_underscore.countBy(words, wordLength) ).toEqual({4: 1, 5: 3, 2: 1});
  });
  it("learn_underscore.countBy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], isEven) -> {\"even\": 5, \"odd\": 5}", function() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    function isEven(n) {
      return (n % 2 === 0) ? "even" : "odd";
    }
    expect(learn_underscore.countBy(nums, isEven)).toEqual({"even": 5, "odd": 5});
  });
  it("learn_underscore.countBy([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], isPrime) -> {\"prime\": 4, \"not prime\": 6}", function() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    function isPrime(item) {
      if (!isFinite(item) || item % 1 || item < 2) return "not prime"; 
      var m = Math.sqrt(item);
      for (var i = 2; i <= m; i++) {
        if (item % i == 0) return "not prime";
      }
      return "prime";
    }
    expect(learn_underscore.countBy(nums, isPrime)).toEqual({"prime": 4, "not prime": 6});
  });
});
