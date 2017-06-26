// Math functions for logic in app.js

function sum(arr) {
  return arr.reduce(function(a, b) {
    return a + b;
  }, 0);


  // var answer = 0;
  // arr.forEach(function(num) {
  //   answer += num;
  // })
  // return answer;
}

function product(arr) {
  // var answer = 1;
  // arr.forEach(function(num) {
  //   answer *= num;
  // })
  // return answer;
  return arr.reduce(function(a, b) {
    return a * b;
  }, 1);
}

module.exports =  {
  sum: sum,
  product: product
}
