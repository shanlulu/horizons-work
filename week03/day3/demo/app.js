"use strict";

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('hbs', exphbs({
  'extname': 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index.hbs');
});

app.listen(3000, function() {
  console.log('Running on port 3000!');
});
