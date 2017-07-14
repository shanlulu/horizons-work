var express = require('express');
var app = express();

['GOOGLE_KEY', 'DARKSKY_KEY'].map(k => {
  if (! process.env[k]) {
    console.error('Missing environment variable', k, 'Did your source env.sh');
    process.exit(1);
  }
});

var hbs = require('express-handlebars')({
  defaultLayout: 'main',
  extname: '.hbs'
});
app.engine('hbs', hbs);
app.set('view engine', 'hbs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.render('index');
});

var geocoder = require('node-geocoder')({
  apiKey: process.env.GOOGLE_KEY
});

var axios = require('axios');
app.post('/', function(req, res) {
  geocoder.geocode(req.body.address)
    .then((geo) => {
      if (! geo.length) {
        throw new Error('Address not found');
      }
      return axios.get(`https://api.darksky.net/forecast/${process.env.DARKSKY_KEY}/${geo[0].latitude},${geo[0].longitude}`);
    })
    .then((weather) => {
      res.render('index', {
        currently: weather.data.currently
      });
    })
    .catch((err) => {
      res.json({
        error: err
      });
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Express started, listening to port: ', port);
});
