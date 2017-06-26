"use strict";

describe("getAnimal()", function() {
  it("window.lion -> 'lion'", function() {
    expect(window.lion).toEqual('lion');
  });
  it("window.tiger -> 'tiger'", function() {
    expect(window.tiger).toEqual('tiger');
  });
});
