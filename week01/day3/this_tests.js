"use strict";

var functions = [
  "simpleGetThis",
  "assignGetThis",
  "callGetThis",
  'callBoundGetThis'
];


functions.forEach(function(fnName) {
  var fn = dis[fnName];
  describe('Exercise: ' + fnName, function() {
    it('should be true', function() {
      expect(fn()).toBe(true);
    });
  });
});
