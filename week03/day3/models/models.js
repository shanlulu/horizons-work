"use strict";

if (! process.env.MONGODB_URI) {
  console.error('MONGODB_URI missing, make sure you run "source env.sh"');
  process.exit(1);
}

// First let's set up our MongoDb connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var Cat = mongoose.model('Cat', {
  name: {
    type: String,
    required: true
  },
  furColor: String
}); // YOUR CODE HERE - define the cat model


new Cat({
  name: 'Crookshanks',
  furColor: 'Black'
}).save(function(err, cat) {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log("SAVED", cat);
  }
});

new Cat({
  name: 'Mr. Bigglesworth',
  furColor: 'White'
}).save(function(err, cat) {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log("SAVED", cat);
  }
});

new Cat({
  name: 'Empurress',
  furColor: 'Calico'
}).save(function(err, cat) {
  if (err) {
    console.log("ERROR", err);
  } else {
    console.log("SAVED", cat);
  }
});


Cat.find(function(error, cats) {
  if (error) {
    console.log("Can't find cats", error);
  } else {
    console.log('Cats', cats);
  }
});

Cat.findOne({
  name: 'Mr. Bigglesworth'
}, function(error, cat) {
  if (error) {
    console.log("Can't findOne cat", error);
  } else {
    console.log('findOne', cat);
  }
});
