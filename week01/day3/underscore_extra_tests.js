"use strict";

describe("memoize()", function() {
  var called, memoizedDouble;
  function double(number) {
    called++;
    return number * 2;
  }

  beforeEach(function() {
    called = 0;
    memoizedDouble = memoize(double);
  });


  it('should return a function', function() {
    expect(memoizedDouble).toEqual(jasmine.any(Function));
  });

  it('if memoizedDouble() is not called, then double() is not called', function() {
    expect(called).toBe(0);
  });

  it('if memoizedDouble(1) is called once, then double(1) is called once and returns 2', function() {
    expect(memoizedDouble(1)).toBe(2);
    expect(called).toBe(1);
  });

  it('if memoizedDouble(1) is called 3 times, then double(1) is called once and returns 2', function() {
    for (var i = 0; i < 3; i++) {
      expect(memoizedDouble(1)).toBe(2);
    }
    expect(called).toBe(1);
  });

  it('if memoizedDouble() is called once with 1, 5, 10, then double() is called once with 1, 5, 10 and returns 2, 10 and 20 respectively', function() {
    expect(memoizedDouble(1)).toBe(2);
    expect(memoizedDouble(5)).toBe(10);
    expect(memoizedDouble(10)).toBe(20);
    expect(called).toBe(3);
  });

  it('if memoizedDouble() is called 3 times with 1, 5, 10, then double() is called once with 1, 5, 10 and returns 2, 10 and 20 respectively', function() {
    for (var i = 0; i < 3; i++) {
      expect(memoizedDouble(1)).toBe(2);
      expect(memoizedDouble(5)).toBe(10);
      expect(memoizedDouble(10)).toBe(20);
    }
    expect(called).toBe(3);
  });

  it("calling 10 times with same 100 arguments calls only once", function() {
    var called = [];
    var fun = memoize(function(i) {
      expect(called[i]).toBeFalsy();
      called[i] = true;
    });

    _.range(10).forEach(function() {
      _.range(100).forEach(fun);
    });
    expect(called.length).toBe(100);
    expect(_.all(called, _.identity)).toBe(true);
  });
});

describe('partial()', function() {
  function allArgs() {
    return _.toArray(arguments);
  }

  it("partial() -> Error", function() {
    expect(_.partial(partial)).toThrow();
  });
  it("partial(allArgs)() -> []", function() {
    expect(partial(allArgs)() ).toEqual([]);
  });
  it("partial(allArgs)(0, 1, 2, 3, 4) -> [0, 1, 2, 3, 4]", function() {
    expect(partial(allArgs)(0, 1, 2, 3, 4) ).toEqual([0, 1, 2, 3, 4]);
  });
  it("partial(allArgs, 'x')() -> ['x']", function() {
    expect(partial(allArgs, 'x')() ).toEqual(['x']);
  });
  it("partial(allArgs, 'x')(0, 1, 2, 3, 4) -> ['x', 0, 1, 2, 3, 4]", function() {
    expect(partial(allArgs, 'x')(0, 1, 2, 3, 4) ).toEqual(['x', 0, 1, 2, 3, 4]);
  });
  it("partial(allArgs, 'x')(0, 1, 2, 3, 4) -> ['x', 0, 1, 2, 3, 4]", function() {
    expect(partial(allArgs, 'x')(0, 1, 2, 3, 4) ).toEqual(['x', 0, 1, 2, 3, 4]);
  });
  it("handle 500 arguments from partial", function() {
    var args = [allArgs].concat(_.range(500));
    expect(partial.apply(null, args)()).toEqual(_.range(500));
  });
  it("handle 500 arguments after partial", function() {
    expect(partial(allArgs).apply(null, _.range(500))).toEqual(_.range(500));
  });
  it("handle 500 arguments from and after partial", function() {
    var args = [allArgs].concat(_.range(500));
    expect(partial.apply(null, args).apply(null, _.range(500))).toEqual(_.range(500).concat(_.range(500)));
  });
});

describe('composeBasic()', function() {
  function double(n) {
    return n * 2;
  }

  function add1(n) {
    return n + 1;
  }

  it("composeBasic(add1, double) -> add1(double())", function() {
    var doubleThenPlus1 = composeBasic(add1, double);
    expect(doubleThenPlus1(3)).toBe(7);
    expect(doubleThenPlus1(0)).toBe(1);
  });

  it("composeBasic(double, add1) -> double(add1())", function() {
    var doubleThenPlus1 = composeBasic(double, add1);
    expect(doubleThenPlus1(3)).toBe(8);
    expect(doubleThenPlus1(0)).toBe(2);
  });

  it("composeBasic(isEven, sum) -> isEven(sum())", function() {
    function sum(a, b) {
      return a + b;
    }
    function isEven(n) {
      return (n % 2) === 0;
    }
    var isSumEven = composeBasic(isEven, sum);
    expect(isSumEven(1, 1)).toBe(true);
    expect(isSumEven(0, 1)).toBe(false);
    expect(isSumEven(0, 22)).toBe(true);
    expect(isSumEven(8, 11)).toBe(false);
    expect(isSumEven(71, 387)).toBe(true);
  });
});

describe("Bonus: memoize() with hashFunction", function() {
  var called;
  var hashCalled;
  var memoizedSum;

  beforeEach(function() {
    called = 0;
    hashCalled = 0;
    memoizedSum = memoize(sum, hash);
  });

  function sum() {
    called++;
    return Array.from(arguments).reduce(function(a, b) {
      return a + b;
    });
  }

  function hash() {
    hashCalled++;
    return Array.from(arguments).join(',');
  }

  it("calling memoized function 4 times calls hash function each time", function() {
    for (var i = 0; i < 4; i++) {
      expect(memoizedSum(-31, 22, 8)).toBe(-1);
    }
    expect(called).toBe(1);
    expect(hashCalled).toBe(4);
  });
});

describe('Bonus: compose()', function() {
  it("compose(f, g, h) -> f(g(h(x, y, z)))", function() {
    function h(x, y, z) {
      expect(arguments.length).toBe(3);
      return x * z * y;
    }
    function g(x) {
      expect(arguments.length).toBe(1);
      return x / 3;
    }
    function f(x) {
      expect(arguments.length).toBe(1);
      return x * 2;
    }
    var composed = compose(f, g, h);
    expect(composed(2, 3, 5)).toBe(20);
  });
});
