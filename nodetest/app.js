// // Basic product and sum app
// // node app.js --sum 1 2 3 --> 6
//
// // get all the arguments - done
// // figure out if I should add or multiply - done
// // throw error if no flag - done
// // change strings to numbers - done
// // do the math - done
// // print out the result - done
// // double check spec
// // have someone check your code
//
// var myMath = require('./my_math.js');
// var sum = myMath.sum;
// var product = myMath.product;
//
// var parser = require('./util/input_parser.js');
// var parse = parser.parse;
//
// var args = process.argv;
// var flag = args[2];
//
// // input handler function call
// // math handler
// // prints the answer in the right form
//
// if (flag === '--sum' || flag === '--product') {
//   var answer;
//   var numberArray = parse(args);
//   if (flag === '--sum') {
//     answer = sum(numberArray);
//   } else if (flag === '--product') {
//     answer = product(numberArray);
//   }
//   console.log(answer);
// } else {
//   throw new Error('error: no flag was given');
// }
var sentiment = require('sentiment');

var r1 = sentiment('Cats are stupid.');
console.log(r1);        // Score: -2, Comparative: -0.666

var r2 = sentiment('Cats are totally amazing!');
console.log(r2);        // Score: 4, Comparative: 1 
