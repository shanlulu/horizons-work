// Challenge: Edit distance
//
// Given two strings x and y, calculate the edit distance of x and y, i. e. the
// minimum number of edits needed to transform x into y. The allowed edits are:
// - insert a single item
// - delete a single item
// - replace a single item with another item
//
// This is a good walkthrough of the solution:
// https://www.youtube.com/watch?v=We3YDTzNXEk
//
// Edit distance is otherwise known as Levenshtein distance.  This is a good
// explanation of how to implement this algorithm efficiently:
// http://odur.let.rug.nl/kleiweg/lev/levenshtein.html
//
// NOTE: Inefficient solutions may take a long time to run!
//
// Adapted from 4clojure
// https://www.4clojure.com/problem/101
function editDistance(str1, str2) {
  // return editDistance_default(str1, str2); // inefficient
  // return editDistance_memoize(str1, str2);
  return editDistance_memoize_2(str1, str2);
}

// O(mn) time
// O(n) space, where n is length of str2
// observe that in first version we're only using data from previous rows and the current row
function editDistance_memoize_2(str1, str2) {
  var table;
  for (var row = 0; row < str1.length + 1; row++) {
    var temp = [];
    for (var col = 0; col < str2.length + 1; col++) {
      if (row === 0 || col === 0) {
        temp[col] = row + col;
      } else if (str1[row - 1] === str2[col - 1]) {
        temp[col] = table[col - 1]; // we're taking values from table, which is row - 1's
      } else {
        temp[col] = 1 + min(temp[col - 1], // insert
                            table[col], // delete
                            table[col - 1]); // replace
      }
    }
    table = temp;
  }
  return table[str2.length];
}

// O(mn) time
// O(mn) space, where m is length of str1, and n is length of str2
function editDistance_memoize(str1, str2) {
  var table = [];
  for (var row = 0; row < str1.length + 1; row++) {
    table[row] = []; // initialize
    for (var col = 0; col < str2.length + 1; col++) {
      if (row === 0 || col === 0) {
        table[row][col] = row + col;
      } else if (str1[row - 1] === str2[col - 1]) {
        table[row][col] = table[row - 1][col - 1];
      } else {
        table[row][col] = 1 + min(table[row][col - 1], // insert
                                  table[row - 1][col], // delete
                                  table[row - 1][col - 1]); // replace
      }
    }
  }
  return table[str1.length][str2.length];
}

// O(3^max(m,n)) time
// O(1) space excluding stack space, O(max(m, n)) including stack space
function editDistance_default(str1, str2) {
  // add everything in str2
  if (str1.length === 0) {
    return str2.length;
  }
  // add everything in str1
  if (str2.length === 0) {
    return str1.length;
  }
  // last char match, move on
  if (str1[str1.length - 1] === str2[str2.length - 1]) {
    return editDistance(str1.slice(0, -1), str2.slice(0, -1));
  }
  // last char do not match, we have insert, delete, or replace on the last
  // character.
  return 1 + min(editDistance(str1, str2.slice(0, -1)), // insert
                 editDistance(str1.slice(0, -1), str2), // delete
                 editDistance(str1.slice(0, -1), str2.slice(0, -1))); // replace
}

function min(first, second, third) {
  return Math.min(first, Math.min(second, third));
}
