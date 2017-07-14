var toolbox = require('./functions');
describe("Part 1: run()", function() {
  var run = toolbox.run;
  var hasRun = false;
  function markRan() {
    hasRun = true;
  }
  it('run with no return value', function() {
    run(markRan);
    expect(hasRun).toBe(true);
  });

  it('run(function() { return 1; }) -> 1', function() {
    expect(run(function() { return 1; })).toBe(1);
  });
});

describe("Part 2: runOneAfterAnother()", function() {
  var runOneAfterAnother = toolbox.runOneAfterAnother;
  var state = 0;
  function state1() {
    if (state == 0) {
      state = 1;
    }
  }
  function state2() {
    if (state == 1) {
      state = 2;
    }
  }

  it('expect fun1 to run before fun2', function() {
    runOneAfterAnother(state1, state2);
    expect(state).toBe(2);
  });
});

describe("Bonus: once()", function() {
  var once = toolbox.once;
  var count = 0;
  function inc() {
    count++;
  }
  it('runs inner function only once', function() {
    var f = once(inc);
    for (var i = 0; i < 10; i++) {
      f();
    }
    expect(count).toBe(1);
  });
});
