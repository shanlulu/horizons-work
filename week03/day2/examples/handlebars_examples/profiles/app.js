var express = require('express');
var exphbs  = require('express-handlebars');
var path = require('path');

var app = express();
var data = require('./data');
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// YOUR CODE HERE

var maleData = [];
var femaleData = [];
for (var i = 0; i < data.length; i++) {
  if (data[i].gender === 'Male') maleData.push(data[i]);
  else femaleData.push(data[i]);
}

app.get('/male', function(req, res) {
  res.render('index', {
    students: data,
    maleStudents: maleData,
    femaleStudents: [],
    male: true,
    female: false
  })
})

app.get('/female', function(req, res) {
  res.render('index', {
    students: data,
    maleStudents: [],
    femaleStudents: femaleData,
    male: false,
    female: true
  })
})

app.get('/', function(req, res) {
  res.render('index', {
    students: data,
    maleStudents: maleData,
    femaleStudents: femaleData,
    male: true,
    female: true
  })
})


app.listen(3000);
console.log(maleData);
