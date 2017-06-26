# Pair Programming Exercise: Deep Copy

## Goal

The goal of this exercise is to deep copy objects and arrays. The difference
between copying and deep copying is how inside objects are being managed. Let's
say you have an array with an array inside. `[1, 2, [3, 4]]` If you make a new
array and loop over the old one you will get:

```javascript
var a = [1, 2, [3, 4]];
var b = copyArray(a); // b -> [1, 2, [3, 4]]]

b[0] = 0;
// b -> [0, 2, [3, 4]]
// a -> [1, 2, [3, 4]]
// Everything looking good. b is modified, a is not.

b[2][0] = 0; // b -> [0, 2, [ 0, 4 ]]   a -> [ 1, 2, [0, 4]]
// Oh no, array a got modified too!
```

To prevent this, we'll do a function that deep copies arrays, another that deep
copies objects and one that does both as a bonus!

## Instructions

1. Open `week01/day5/deep_copy.js` in your text editor. Exercise details are listed there.
1. Open `week01/day5/deep_copy.html` in your browser to run tests.
1. Write necessary functions to make all the tests pass.
