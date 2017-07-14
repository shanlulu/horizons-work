var express = require('express');
var router = express.Router();
var models = require('../models/models');
var User = models.User;
var Follow = models.Follow;
var Restaurant = models.Restaurant;
var Review = models.Review;

router.use(function(req, res, next){
  if (!req.user) {
    res.redirect('/login');
  } else {
    return next();
  }
});

router.get('/', function(req, res, next) {
    res.render('home')
});

// Users

router.get('/users', function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.render('users', {
      users: users
    });
  });
});

router.get('/profile', function(req, res) {
  User.findById(req.user.id, function(err, user) {
    if (err) return next(err);
    User.getFollowers(user.id, function(err, followers, following) {
      if (err) return next(err);
      res.render('profile', {
        user: user,
        following: following,
        followers: followers
      });
    })
  });
});

router.get('/profile/:id', function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    User.getFollowers(user.id, function(err, followers, following) {
      if (err) return next(err);
      res.render('profile', {
        user: user,
        following: following,
        followers: followers
      });
    })
  });
});


router.post('/follow/:id', function(req, res, next) {
  User.follow(req.user.id, req.params.id, function(err) {
    if (err) return next(err);
    res.redirect('/profile');
    // TODO: Confirm following
  });
});
router.post('/unfollow/:id', function(req, res, next) {
  User.unfollow(req.user.id, req.params.id, function(err) {
    if (err) return next(err);
    res.redirect('/profile');
  });
});


// TODO: Add /unfollow/:id

// Restarants

router.get('/restaurants/new', function(req, res, next) {
  res.render('editRestaurant');
});

router.post('/restaurants/new', function(req, res, next) {
  var restaurant = new Restaurant({
    name: req.body.name,
    price: parseInt(req.body.price),
    category: req.body.category,
    openHoursEST: {
      openTime: parseInt(req.body.openTime),
      closingTime: parseInt(req.body.closingTime)
    }
  });
  restaurant.save(function(err) {
    if (err) return next(err);
    res.redirect('/restaurants');
  })
});

router.get('/restaurants', function(req, res, next) {

// Sort by price and alphabetical.
var field = null;
var order = req.query.order==='dsc' ? -1 : 1;
if (req.query.sort==='price' || req.query.sort==='stars') { field = req.query.sort }
if (req.query.sort==='alphabetical'){  field = 'name'; }
var obj = {};
obj[field]=order;

  Restaurant.find().sort(obj).exec(function(err, restaurants) {
    if (err) return next(err);
    // Sort by distance, ratings, # of reviews
    res.render('restaurants', {
      restaurants: restaurants
    });
  });
});

router.get('/restaurants/:id', function(req, res) {
  Restaurant.findById(req.params.id, function(err, restaurant) {
    if (err) return next(err);
    restaurant.getReviews(req.params.id, function(err, reviews) {
      if (err) return next(err);
      restaurant.stars(function(err, stars) {
        restaurant.stars=stars;
        res.render('restaurant', {
          restaurant:restaurant,
          reviews:reviews
        });
      });
    });
  });
});

router.post('/restaurants/:id', function(req, res, next) {
  var review = new Review({
    stars: req.body.stars,
    content: req.body.content,
    restaurant: req.params.id,
    user:  req.user.id
  });
  review.save(function(err) {
    if (err) return next(err);
    res.redirect('/restaurants/'+req.params.id);
  })
});

module.exports = router;
