// Challenge: Crossword
//
// Write a function that takes a string and a partially-filled crossword puzzle
// board, and returns true if the input string can be legally placed onto the
// board.
//
// The crossword puzzle board is represented by an array containing strings.
// Each array represents a partially filled row.  Empty spaces are denoted with
// an underscore (_), unusable spaces are denoted with a hash symbol (#), and
// pre-filled spaces have a character in place.  Each tile is separated by one
// and only one space.
//
// For a word to be legally placed on the board:
// - It is already on the board.
// - It may use empty spaces (underscores).
// - It may use but must not conflict with any pre-filled characters.
// - It must not use any unusable spaces (hashes).
// - There must be no empty spaces (underscores) or extra characters before or
//   after the word (the word may be bound by unusable spaces though).
// - Characters are not case-sensitive.
// - Words may be placed vertically (proceeding top-down only), or horizontally
//   (proceeding left-right only).
//
// Adapted from 4clojure
// https://www.4clojure.com/problem/111
//
// ex. solveCrossword("the", ["_ # _ _ e"]) -> true
//
// ex. solveCrossword("the", ["c _ _ _",
//                            "d _ # e",
//                            "r y _ _"]) -> false
//
// ex. solveCrossword("joy", ["c _ _ _",
//                            "d _ # e",
//                            "r y _ _"]) -> true
//
// ex. solveCrossword("joy", ["c o n j",
//                            "_ _ y _",
//                            "r _ _ #"]) -> false
//
// ex. solveCrossword("clojure", ["_ _ _ # j o y",
//                                "_ _ o _ _ _ _",
//                                "_ _ f _ # _ _"]) -> true
//
// ex. solveCrossword("joy", ["_ # j o y",
//                            "o _ # _ _",
//                            "f _ # _ _"]) -> true
function solveCrossword(word, arr) {
  var colStr = [];
  var rowStr = arr.map(function(str) {
    return str.split(' ').join('');
  })
  for (var i = 0; i < rowStr[0].length; i++) {
    var subArr = [];
    rowStr.forEach(function(str) {
      subArr.push(str[i]);
    })
    colStr.push(subArr.join(''));
  }
  var resource = rowStr.concat(colStr);
  for (var i = 0; i < resource.length; i++) {
    var str = resource[i];
    if (str.includes('#')) {
      resource[i] = false;
      resource = resource.concat(str.split('#'));
    }
  }
  while(resource.includes(false)) {
    resource.splice(resource.indexOf(false),1);
  }
  while(resource.includes('')) {
    resource.splice(resource.indexOf(''),1);
  }
  for (var i = 0; i < resource.length; i++) {
    var goal = resource[i];
    if (goal.includes(word)) return true;
    if (word.length === goal.length) {
      for (var j = 0; j < word.length; j++) {
        if (goal[j] !== '_' && word[j] !== goal[j]) break;
        if (j === word.length-1) return true;
      }
    }
  }
  return false;
}
