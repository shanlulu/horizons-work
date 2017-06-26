"use strict";

// In this exercise we're going to play around with the "this" keyword.
// You should replace the parts that say YOUR CODE HERE.
window.dis = {}

// Let's just create an empty object to attach things to.
dis.object1 = {}
dis.object2 = {}

// This is a function that returns this.
function getThis() {
  return this;
}

// Let's put getThis on dis
dis.getThis = getThis;

dis.simpleGetThis = function() {
  return dis.getThis() === null /* YOUR CODE HERE */;
};

dis.assignGetThis = function() {
  dis.object2.getThis = getThis;
  return dis.object2.getThis() === null /* YOUR CODE HERE */;
};

dis.callGetThis = function() {
  return dis.getThis.call(dis.object1) === null /* YOUR CODE HERE */;
}

// Let's bind getThis to object2
dis.boundGetThis = dis.getThis.bind(dis.object2);

dis.callBoundGetThis = function() {
  return dis.boundGetThis.call(dis.object1) === null /* YOUR CODE HERE */;
}
