// Challenge: Edit distance
//
// Given two strings x and y, calculate the edit distance of x and y, i. e. the
// minimum number of edits needed to transform x into y. The allowed edits are:
// - insert a single item
// - delete a single item
// - replace a single item with another item
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
  var m = str1.length;
  var n = str2.length;
  if (m === 0) return n;
  if (n === 0) return m;
  var matrix = new Array(m+1);
  for (var i = 0; i < m+1; i++) {
    matrix[i] = new Array(n+1);
    matrix[i][0] = i;
  }
  for (var j = 0; j < n+1; j++) {
    matrix[0][j] = j;
  }
  for (var i = 0; i < m; i++) {
    for (var j = 0; j < n; j++) {
      var cost = 0;
      if (str1[i] !== str2[j]) cost = 1;
      matrix[i+1][j+1] = Math.min(matrix[i][j+1]+1, matrix[i+1][j]+1, matrix[i][j]+cost)
    }
  }
  return matrix[m][n];
}
