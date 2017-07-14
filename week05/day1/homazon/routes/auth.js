import express from 'express';
var router = express.Router();

/* GET customers listing. */
import models from '../models/models';
var Customer = models.Customer;
var Product = models.Product;

export default function(passport) {

  router.get('/signup', function(req, res, next) {
    res.render('signup.hbs');
  })

  router.post('/signup', function(req, res, next) {
    var name = req.body.username;
    var password = req.body.password;
    var confirm = req.body.passwordRepeat;
    if (name.length !== 0 && password.length !== 0 && confirm === password) {
      var newCustomer = new Customer({
        username: name,
        password: password
      })
      newCustomer.save(function(err, customer) {
        if (err) console.log('ERROR', err);
        else {
          console.log('SAVED', customer);
          res.redirect('/login');
        }
      })
    } else {
      res.render('signup.hbs');
    }
  })

  router.get('/login', function(req, res) {
    res.render('login.hbs');
  })

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

  // router.get('/contacts', function(req, res) {
  //   res.send(req.user);
  // })
  router.get('/logout', function(req, res, next) {
    req.session.destroy(function(err, session) {
      if (err) console.log('ERROR', err);
      else res.redirect('/login');
    });
  })
  return router;
}

//export default router;
