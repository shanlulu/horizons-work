import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import index from './routes/index';
import auth from './routes/auth';
// var auth = require('./routes/auth');
import session from 'express-session';
var MongoStore = require('connect-mongo')(session);
import passport from 'passport';
var LocalStrategy = require('passport-local').Strategy;
//import LocalStrategey from 'passport-local';

import mongoose from 'mongoose';
mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

import models from './models/models';
var Customer = models.Customer;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SECRET || 'Hey Shan',
  store: new MongoStore({mongooseConnection: mongoose.connection})
}));

passport.serializeUser((customer, done) => {
  done(null, customer._id);
});

passport.deserializeUser((id, done) => {
  Customer.findById(id, (err, customer) => {
    done(err, customer);
  });
});

passport.use(new LocalStrategy(function(username, password, done) {
  Customer.findOne({ username: username }).exec(function (err, customer) {
    if (err) {
      console.log(err);
      return done(err);
    }
    if (!customer) {
      console.log(customer);
      return done(null, false);
    }
    if (customer.password !== password) {
      return done(null, false);
    }
    return done(null, customer);
  });
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', auth(passport));
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
