var express = require('express');
var app = express();

var hbs = require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs'
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.render('index');
});

import routes from './routes';
import {test} from './routes';

console.log(test);

app.use(routes);

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Express started, listening to port: ', port);
});
