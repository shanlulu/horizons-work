"use strict";

var STOCKS = ["MSFT",
  "NFLX",
  "NVDA",
  "AMZN",
  "FB",
  "GOOG"];

var _ = require('underscore');

const START_DATE = new Date('2016-06-01:00:00.000Z').getTime();
const DAY = 24 * 60 * 60 * 1000;
const DAYS = 30;

let stockData = [];

for (let stock of STOCKS) {
  let price = _.random(2000, 30000) / 100;
  let d = START_DATE;
  for (let i = 0; i < DAYS; i++) {
    stockData.push({
      ticker: stock,
      price,
      time: new Date(d).toISOString()
    });
    d += DAY;
    let delta =  price * _.random(-1000, 1000) / 10000;
    price += delta;
    price = Math.round(price * 100) / 100;
  }
}

console.log(stockData.map(JSON.stringify).join(',\n'));
