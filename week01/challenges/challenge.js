// Week 1 Challenge Problem
// This is a brain teaser! Adapted from USACO problem sets. Attempt to work it out
// yourself without looking up or viewing the solution!

// A set of contestants participate in a contest where there are four divisions
// to compete in: bronze, silver, gold, and platinum. All new contestants begin
// at the bronze level, and scoring perfectly at the bronze level allows them to
// be promoted to the next highest level (the silver level).

// Example Input (The string will represent newlines with the newline character)

// 1 2
// 1 1
// 1 1
// 1 2

// where 1 2 represents 1 person registered in the category before the beginning
// of the contest and 2 people registered in the category after beginning the
// contest. Each line represents the number of people registered before and after
// for categories: bronze, silver, gold, platinum - respectively.

// Keep in mind that people can signup while a contest is running.

// Example Output (Output the string with newline characters)

// 1
// 1
// 1

// where each line represents the number of people promoted from lowest to highest
// category; i.e., the first line represents number of people promoted from
// bronze to silver, the second line represents the number of people promoted from
// silver to gold, and the third line represents the number of people promoted
// from gold to platinum.

// In the Example Output, this could have happened through two new people
// registering during the contest, one person being promoted from bronze to silver,
// one person being promoted from silver to gold, and one person being promoted from
// gold to platinum. This could have also happened through two new people
// registering during the contest: one of which was promoted from bronze to silver,
// silver to gold, gold to platinum, and the other staying in bronze.
// There are multiple configurations possible for which the input string could
// have occurred, but all we are concerned with is the number of promotions
// between categories.

// Example Input
// ex. calcPromotions('1 2\n1 1\n1 1\n1 2') -> '1\n1\n1'

// No Promotions
// ex. calcPromotions('1000000 1000000\n1000000 1000000\n1000000 1000000\n1000000 1000000') -> '0\n0\n0'

window.calcPromotions = function(input) {
  var cur = 0;
  var res = new Array(3);
  input = input.split('\n');
  for (var i = 0; i < 4; i++) {
    input[i] = input[i].split(' ');
  }
  for (var j = 3; j > 0; j--) {
    cur = input[j][1] - input[j][0];
    res[j-1] = cur;
    input[j-1][0] -= cur;
  }
  // cur = input[3][1] - input[3][0];
  // res[2] = cur;
  // input[2][0] -= cur;
  // cur = input[2][1] - input[2][0];
  // res[1] = cur;
  // input[1][0] -= cur;
  // cur = input[1][1] - input[1][0];
  // res[0] = cur;
  // console.log(cur);
  return res.join('\n');
};
