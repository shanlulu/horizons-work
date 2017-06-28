var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var app = express();

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  var selectedGender = req.query.gender;
  var checkedMale = false;
  var checkedFemale = false;
  var checkedOther = false;
  if (selectedGender === "male") {
    checkedMale = true;
  } else if (selectedGender === "female") {
    checkedFemale = true;
  } else checkedOther = true;
  res.render('example2', {
    userVal: req.query.username,
    passwordVal: req.query.password,
    nameVal: req.query.name,
    checkM: checkedMale,
    checkF: checkedFemale,
    checkO: checkedOther
  });
});

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
