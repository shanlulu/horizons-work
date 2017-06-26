"use strict";

var path = require('path');
var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();

app.engine('hbs', exphbs({
  extname:'hbs',
  // Add main layout here
  // YOUR CODE HERE
}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/second', function (req, res) {
  res.render('second');
});


app.listen(3000);
