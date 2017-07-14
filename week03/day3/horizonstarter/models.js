"use strict";

// Project model
var mongoose = require('mongoose');

var Project = mongoose.model('Project', {
  title: {
    type: String,
    required: true
  },
  goal: {
    type: Number,
    required: true
  },
  description: String,
  start: {
    type: Date,
    required: true
  },
  end: {
    type: Date,
    required: true
  },
  contributions: Array,
  category: {
    type: String,
    required: true,
    enum: ['Famous Muppet Frogs', 'Current Black Presidents', 'The Pen Is Mightier', 'Famous Mothers', 'Drummers Named Ringo', '1-Letter Words', 'Months That Start With \"Feb\"', 'How Many Fingers Am I Holding Up', 'Potent Potables']
  }
  // YOUR CODE HERE
});

module.exports = {
  Project: Project
}
