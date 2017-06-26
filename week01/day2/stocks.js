"use strict";

window.stocks = {};

// # Introduction
//
// You will be implementing several key functions for a stock analysis program.
// We are providing you with the data whose format is described in the next paragraph.
// You can view the data under data/transactions.js. Each function you implement
// will be tested with the data from that file.

// # Data
//
// The data that will be run through each function is an array of Transaction objects.
// Transaction objects have three properties: 'ticker', 'time' and 'price'.
// The 'ticker' property is the name of the company to which the transaction refers to.
// The 'time' property is the time of the transaction on 5/17/2016.
// The 'price' property is the price of the stock of 'ticker' at 'time'.
// You can access these properties the usual ways, like (assuming a given item is called `trans`):
// `var price = trans["price"];` or `var ticker = trans.ticker`
//
// So, the data's gonna look something like:
// var data = [ { "ticker": "MSFT", "time": "2016-05-17T11:02:20", "price": 22.83 }, ... ];


// Exercise 1. stocks.gainAndLoss(data)
//
// Write a function that calculates the total loss or gain for each ticker/company.
// This function should return an object with stock tickers as keys and the total
// gain or loss for the given stock as the values.
//
// Total gain or loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.gainAndLoss(data) -> {
//   GOOG: -32.36,
//   NFLX: 43.44,
//   FB: -47.36,
//   MSFT: -16.21,
//   AMZN: 299.04,
//   NVDA: 17.5
// }
stocks.gainAndLoss = function(data) {
  var res = {};
  var comps = _.groupBy(data, function(trans) {
    return trans.ticker;
  });
  for (var key in comps) {
    comps[key].sort(function(trans1, trans2) {
      return trans1.time.substring(8,10) - trans2.time.substring(8,10);
    })
    var comp = comps[key];
    res[key] = comp[comp.length-1].price - comp[0].price;
  }
  return res;
};

// Exercise 2. stocks.biggestGainer(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total gain is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestGainer(stockData) -> 'AMZN'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestGainer = function(data) {
  var maxV = -Infinity;
  var maxC = '';
  var obj = stocks.gainAndLoss(data);
  for (var key in obj) {
    if (obj[key] > maxV) {
      maxV = obj[key];
      maxC = key;
    }
  }
  return maxC;
};

// Exercise 3. stocks.biggestLoser(data)
//
// Write a function that finds the stock that went up in price the most
// in absolute terms (i.e. not percentage-wise) over the lifetime of
// the given data.
//
// Total loss is defined as latest price of the company minus earliest
// price of the company.
//
// Example.
// stocks.biggestLoser(stockData) -> 'GOOG'
//
// You can use stocks.gainAndLoss() in your answer.
stocks.biggestLoser = function(data) {
  var minV = Infinity;
  var minC = '';
  var obj = stocks.gainAndLoss(data);
  for (var key in obj) {
    if (obj[key] < minV) {
      minV = obj[key];
      minC = key;
    }
  }
  return minC;
};

// Exercise 4. stocks.widestTradingRange(data)
//
// Write a function that finds the ticker of the stock with the widest trading
// range (biggest difference between the lowest and the highest stock price)
// over the lifetime of the given dataset.
//
// Example.
// stocks.widestTradingRange(data) -> 'AMZN'
stocks.widestTradingRange = function(data) {
  var res = {};
  var comps = _.groupBy(data, function(trans) {
    return trans.ticker;
  });
  for (var key in comps) {
    comps[key].sort(function(trans1, trans2) {
      return trans1.price - trans2.price;
    })
    var comp = comps[key];
    res[key] = comp[comp.length-1].price - comp[0].price;
  }
  var pairs = [];
  _.forEach(res, function(value, key) {
    pairs.push([key,value]);
  })
  pairs.sort(function(a, b) {
    return b[1]-a[1];
  })
  return pairs[0][0];
};

// Exercise 5. stocks.portfolioValue(data, date, portfolio)
// Write a function that calculates the value of a stock portfolio at a given
// date.
//
// Arguments:
//  - date: a JavaScript Date object indicating which point in time to calculate
//    the value of the portfolio for
//  - portfolio: an object mapping tickers to number of shares owned
//
// ex.
// stocks.totalPortfolioValue(data,
//                            new Date('2016-06-30T00:00:00.000Z'),
//                            {NFLX: 1, GOOG: 10})
//    -> 513.31
stocks.portfolioValue = function(data, date, portfolio) {
  var res = 0;
  var timeObj = _.forEach(data, function(trans) {
    trans['time'] = new Date(trans.time).getTime();
  })
  for (var obj in timeObj) {
    if (date.getTime() === timeObj[obj].time) {
      if (timeObj[obj].ticker in portfolio) {
        res += portfolio[timeObj[obj].ticker] * timeObj[obj].price;
      }
    }
  }
  return res;
};

// [Bonus] Exercise 6. stocks.bestTrade(data, ticker)
// Write a function to figure out the best time to buy and sell a given
// stock/ticker/company.
//
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing three items:
//  1. buy date (a Date object)
//  2. sell date (a Date object)
//  3. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTrade(stockData, 'GOOG') ->
//  [new Date('2016-06-19T00:00:00.000Z'),
//   new Date('2016-06-28T00:00:00.000Z'),
//   55.54]
stocks.bestTrade = function(data, ticker) {
  var max = 0;
  var maxI = 0;
  var maxJ = 0;
  var compData = _.filter(data, function(trans) {
    return trans['ticker'] === ticker;
  })
  compData.sort(function(a, b) {
    return new Date(a.time).getTime() - new Date(b.time).getTime();
  })
  for (var i = 0; i < compData.length-1; i++) {
    for (var j = compData.length-1; j > i; j--) {
      var diff = compData[j].price - compData[i].price;
      if (diff > max) {
        maxI = i;
        maxJ = j;
        max = diff;
      }
    }
  }
  return [new Date(compData[maxI].time), new Date(compData[maxJ].time), max];
};

// [Super Bonus] Exercise 8. stocks.bestTradeEver(data)
// Write a function to figure out the best stock to buy and when to
// buy and sell it.
//
//  - You can only buy one stock.
//  - You can only buy the stock once and sell it once.
//  - You need to buy the stock before you sell it.
//
// You should return an array containing four items:
//  1. ticker (a string)
//  2. buy date (a Date object)
//  3. sell date (a Date object)
//  4. amount of money made in trade i.e. selling price minus buying price (a number)
//
// Example.
// stocks.bestTradeEver(data) ->
//  ['AMZN',
//   new Date('2016-06-02:00:00.000Z'),
//   new Date('2016-06-24:00:00.000Z'),
//   55.54]
stocks.bestTradeEver = function(data) {
  var bestInfo = [];
  var max = 0;
  var maxComp = '';
  var comps = _.groupBy(data, function(trans) {
    return trans.ticker;
  })
  for (var key in comps) {
    var best = stocks.bestTrade(data, key);
    if (best[2] > max) {
      bestInfo = best;
      max = best[2];
      maxComp = key;
    }
  }
  bestInfo.unshift(maxComp);
  return bestInfo;
};
