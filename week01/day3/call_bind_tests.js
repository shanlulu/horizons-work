"use strict";

describe("Function.prototype.myCall()", function() {
  it("myCall() sets 'this'", function() {
    var obj = {};
    function returnThis() {
      expect(arguments.length).toBe(0);
      return this;
    }
    expect(returnThis.myCall(obj)).toBe(obj);
  });
  it("myCall() passes arguments", function() {
    function returnArgs() {
      return Array.from(arguments);
    }
    expect(returnArgs.myCall(null, "this", "has", 4, "arguments")).toEqual(["this", "has", 4, "arguments"]);
  });
});

describe("Function.prototype.myBind()", function() {
  it("returns a function", function() {
    expect(function(){}.myBind()).toEqual(jasmine.any(Function));
  });
  it("sets 'this' for new function", function() {
    var obj = {};
    var boundReturnThis = function() {
      return this;
    }.myBind(obj);
    expect(boundReturnThis()).toBe(obj);
  });
  it("passes arguments from new function", function() {
    var returnArgs = function() {
      return Array.from(arguments);
    }.myBind();
    expect(returnArgs('a', false, -13)).toEqual(['a', false, -13]);
  });
});
