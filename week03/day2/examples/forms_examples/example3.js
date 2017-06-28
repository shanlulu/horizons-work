var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');
var account = require('./accounts.json')

var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser({extended: true}));

// view engine setup
app.engine('hbs', exphbs({extname:'hbs'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('example3', {
    valid: true
  });
});


app.post('/login', function(req, res) {
  var inputEmail = req.body.email;
  var inputPassword = req.body.password;
  var valid = false;
  var firstName_ = '';
  for (var i = 0; i < account.length; i++) {
    if (account[i].email === inputEmail && account[i].password === inputPassword) {
      valid = true;
      firstName_ = account[i].first_name;
    }
  }
  res.render('example3', {
    valid: valid,
    firstName: firstName_
  })
})

// start the express app
var port = process.env.PORT || 3000;
app.listen(port);
console.log('Express started. Listening on port %s', port);

module.exports = app;
