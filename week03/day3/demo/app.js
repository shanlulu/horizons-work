"use strict";

var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.engine('hbs', exphbs({
  'extname': 'hbs'
}));
app.set('view engine', 'hbs');


var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Student = mongoose.model('Student', {
  name: String
});

new Student({
  name: 'Shan'
}).save(function(err, student) {
  if (err) {
    console.log('ERROR' + err);
  } else {
    console.log('SAVED' + student);
  }
});


app.get('/', function(req, res) {
  res.render('index.hbs');
});

app.listen(3000, function() {
  console.log('Running on port 3000!');
});
