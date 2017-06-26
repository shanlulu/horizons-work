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

// ex. calcPromotions('1 2\n1 1\n1 1\n1 2') -> '1\n1\n1'
// ex. calcPromotions('1000000 1000000\n1000000 1000000\n1000000 1000000\n1000000 1000000') -> '0\n0\n0'
// ex. calcPromotions('3 3\n3 3\n3 3\n0 1000000') -> '1000000\n1000000\n1000000'
// ex. calcPromotions('68690 43918\n20059 59118\n97763 10098\n13926 103953') -> '41421\n2362\n90027'
// ex. calcPromotions('5211 2325\n95368 89622\n2567 36003\n56429 112165') -> '83426\n89172\n55736'
// ex. calcPromotions('61393 72357\n18456 8445\n75011 9913\n78042 176209') -> '23058\n33069\n98167'
// ex. calcPromotions('13784 12640\n98537 91489\n75198 114700\n94324 139243') -> '77373\n84421\n44919'
// ex. calcPromotions('76091 110036\n68980 66937\n59956 122843\n41873 45399') -> '64370\n66413\n3526'
// ex. calcPromotions('61313 95144\n25857 1516\n16124 45241\n53895 75624') -> '26505\n50846\n21729'
// ex. calcPromotions('49676 130031\n93368 5835\n47739 52611\n10012 105072') -> '12399\n99932\n95060'

window.calcPromotions = function(input) {

    var counters = [[],[]];

    var arr = input.split("\n");
    // arr = ["1 2", "1 1", "1 1", "1 2"]

    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].split(" ");
    }
    // arr = [[1, 2], [1, 1], [1, 1], [1, 2]]

    for (var i = 0; i < arr.length; i++) {
        arr[i][1] = arr[i][1] - arr[i][0];
        arr[i][0] = 0;
    }

    var output = (arr[3][1] + arr[2][1] + arr[1][1]) 
        + "\n" + (arr[3][1] + arr[2][1])
        + "\n" + arr[3][1];
    return output;
};