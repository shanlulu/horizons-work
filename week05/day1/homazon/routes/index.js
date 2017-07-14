
var express = require('express');
var router = express.Router();

import models from '../models/models';
var Customer = models.Customer;
var Product = models.Product;

import products from '../seed/products.json';


router.get('/', (req, res, next) => {
  Product.find().exec(function(err, oldProducts) {
    if (err) console.log('ERROR', err);
    else if (oldProducts.length === 0) {
      console.log('NO PRODUCTS');
      //var productPromises = products.map((product) => (new Product(product).save()));
      var productPromises = products.map(function(product) {
        var newProduct = new Product(product);
        console.log('NEW', newProduct);
        return newProduct.save();
      })
      Promise.all(productPromises)
        .then(function() {
          Product.find().exec(function(err, newProducts) {
            if (err) console.log('ERROR', err);
            else {
              console.log('GET NEW ONES!');
              console.log(newProducts);
              res.render('products.hbs', {
                products: newProducts
              });
            }
          })
        })
        .catch((err) => (console.log('Error', err)))
      }
      else {
        console.log('Have Products');
        Product.find().exec(function(err, products) {
          if (err) console.log('ERROR', err);
          else {
            res.render('products.hbs', {
              products: products,
              items: req.session.cart
            });
          }
        })
      }
    })
});

router.get('/product/:pid', (req, res, next) => {
  // Insert code to look up all a single product by its id
  // and show it on the page
  Product.findById(req.params.pid, function(err, product) {
    if (err) console.log('ERROR', err);
    else {
      console.log('PRODUCT', product);
      res.render('singleProduct.hbs', {
        product: product
      });
    }
  })
});

router.get('/cart', (req, res, next) => {
  // Render a new page with our cart
  if (!req.session) res.redirect('/login');
  else if (!req.session.cart) {
    req.session.cart = []
  }
  res.render('cart.hbs', {
    items: req.session.cart
  })
})

router.post('/cart/add/:pid', (req, res, next) => {
  // Insert code that takes a product id (pid), finds that product
  // and inserts it into the cart array. Remember, we want to insert
  // the entire object into the array...not just the pid.
  if (!req.session.cart) {
    req.session.cart = []
  }
  Product.findById(req.params.pid, function(err, product) {
    if (err) console.log('ERROR', err);
    else {
      req.session.cart.push(product);
      res.redirect('/cart');
    }
  })
})

router.post('/cart/delete/:pid', (req, res, next) => {
  // Insert code that takes a product id (pid), finds that product
  // and removes it from the cart array. Remember that you need to use
  // the .equals method to compare Mongoose ObjectIDs.
  Product.findById(req.params.pid, function(err, product) {
    if (err) console.log('ERROR', err);
    else {
      for (var i = 0; i < req.session.cart.length; i++) {
        if (String(req.session.cart[i]._id) === String(product._id)) {
          req.session.cart.splice(i, 1);
          break;
        }
      }
      res.redirect('/cart');
    }
  })
})

router.post('/cart/delete', (req, res, next) => {
  req.session.cart = [];
  res.redirect('/cart');
});

export default router;
