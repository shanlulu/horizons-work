
var express = require('express');
var app = express();

var handlebars = require('express-handlebars');
app.engine('hbs', handlebars({
  extname: '.hbs'
}));
app.set('view engine', 'hbs');


app.get('/:error', function(req, res) {
  res.render('template.hbs', {
    error: req.params.error
  });
})

app.get('/', function(req, res) {
  res.render('template.hbs');
})

app.listen(3000);
console.log('ok');
