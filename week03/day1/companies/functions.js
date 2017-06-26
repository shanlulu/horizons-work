module.exports = {

  // Find the company that has the largest single amount of money invested. In this
  // case, we are not looking for the sum of all investments made on a company. But
  // the largest sum invested by one investor.
  // You should iterate over the array of investments and find out the single largest
  // "original investment" made on a company.
  // Return the amount of the largest investment.
  singleLargestInvestment: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var max = 0;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].originalInvestment > max) {
        max = arr[i].originalInvestment;
      }
    }
    return max;
  },

  // Find the average of all the original investments for all companies.
  // This is equal to the sum of all the original investments divided by the number
  // of investments.
  // Return a Number.
  averageOfOriginalInvestments: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var sum = arr.reduce(function(a, b) {
      return a + b.originalInvestment;
    }, 0)
    return sum/arr.length;
  },

  // Find out how much a company got as the original investments. In this case, You
  // will have to iterate over the companies and find all the investments for each
  // company and add them up to find how much money they started with.
  // Return an object that contains company ids as keys and their total original investment
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
  totalOriginalInvestmentForCompanies: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].company;
      var val = arr[i].originalInvestment;
      if (res.hasOwnProperty(key)) {
        res[key] += val;
      } else {
        res[key] = val;
      }
    }
    return res;
  },

  // Find out how much money an investor spent as original investments. You will
  // need to iterate through all the investments, find all the investments for each
  // investor and add them up to find how much money someone invested at the beginning.
  // Return an object that contains investor ids as keys and their total original investment
  // as values.  The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
  totalOriginalInvestmentsByInvestors: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].investorId;
      var val = arr[i].originalInvestment;
      if (res.hasOwnProperty(key)) {
        res[key] += val;
      } else {
        res[key] = val;
      }
    }
    return res;
  },

  // This function is similar to the one above, but it returns the current value
  // for each investor. To get this value, you need to iterate through all the investments,
  // find all the currentValues for each investor and add them up to find how much
  // money someone has now from their investment
  // Return an object that contains investor ids as keys and their total todayValue
  // as values. The object's structure should look something like this:
  // {
  //  1: 595000,
  //  2: 1024000,
  //   ...
  // }
    // Fields to be parsed: "originalInvestment", "valueToday"
  totalCurrentValueOfInvestors: function(arr){
    var res = {};
    for (var i = 0; i < arr.length; i++) {
      var key = arr[i].investorId;
      var val = arr[i].valueToday;
      if (res.hasOwnProperty(key)) {
        res[key] += val;
      } else {
        res[key] = val;
      }
    }
    return res;
  },

  // To find out who the best investor is, you need to find out the ratio in which
  // they made money. If they invested 100 and their todayValue is 200, they made
  // 2x their investment. Calculate this for all investors and figure out who the
  // best one is!
  // Note: Remember to use their total of investments and the total of current value:
  // using totalOriginalInvestmentsByInvestors & totalCurrentValueOfInvestors
  // Return an investorID;
  bestInvestorByValueIncrease: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var best = {};
    var largest = 0;
    var bestInvestor;
    var start = this.totalOriginalInvestmentsByInvestors(arr);
    var today = this.totalCurrentValueOfInvestors(arr);
    for (var prop in start) {
      best[prop] = today[prop]/start[prop];
      if (best[prop] > largest) {
        largest = best[prop];
        bestInvestor = prop;
      }
    }
    return bestInvestor;
  },

  // Find out which company was invested the most in using the originalInvestment.
  // Return a companyId
  mostInvestedCompany: function(arr){
    // Fields to be parsed: "originalInvestment", "valueToday"
    var largest = 0;
    var bestCompany;
    var total = this.totalOriginalInvestmentForCompanies(arr);
    for (var prop in total) {
      if (total[prop] > largest) {
        largest = total[prop];
        bestCompany = prop;
      }
    }
    return bestCompany;
  }
}
