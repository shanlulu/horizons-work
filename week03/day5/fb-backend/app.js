"use strict";

var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

// Set up handlebar templates
var exphbs = require('express-handlebars');
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({extname: '.hbs'}));
app.set('view engine', '.hbs');

// Enable form validation with express validator.
var expressValidator = require('express-validator');
app.use(expressValidator());

// Enable POST request body parsing
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MODELS
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);


var Token = mongoose.model('Token', {
  userId: String,
  token: String,
  createdAt: Date
})

var User = mongoose.model('User', {
  fname: String,
  lname: String,
  email: String,
  password: String
})

var Post = mongoose.model('Post', {
  poster: Object,
  content: String,
  likes: Array,
  comments: Array,
  createdAt: Date
})

app.post('/api/users/register', function(req, res) {
  new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password
  }).save(function(err, user) {
    if (err) {
      console.log('ERROR' + err);
    } else {
      console.log('SAVED' + user);
      res.status(200).json({ success: true });
    }
  });
})

app.post('/api/users/login', function(req, res) {
  User.findOne({email: req.body.email}, function(err, user) {
    if (err) {
      console.log('ERROR', err);
    } else {
      console.log('FOUND', user);
      var date = (new Date()).getTime();
      new Token({
        userId: user._id,
        token: req.body.email + date,
        createdAt: date
      }).save(function(err, token) {
        if (err) {
          console.log('ERROR' + err);
        } else {
          console.log('SAVED' + token);
        }
      });
    }
  });
})

app.get('/api/users/logout', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else {
      console.log('FOUND', token);
      token.remove();
      console.log('REMOVED');
      res.status(200).json({ success: true });
    }
  });
})

app.get('/api/posts/:page', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else {
      console.log('FOUND', token);
      Post.find(function(err, post) {
        if (err) {
          console.log('ERROR', err);
        } else {
          console.log('FOUND', post);
          var page = req.params.page;
          res.status(200).json({success: true, response: post.slice(10*(page-1), 10*page)});
        }
      })
    }
  });
})

app.get('/api/posts/', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else {
      console.log('FOUND', token);
      Post.find(function(err, post) {
        if (err) {
          console.log('ERROR', err);
        } else {
          console.log('FOUND', post);
          res.status(200).json({success: true, response: post.slice(0, 10)});
        }
      })
    }
  });
})

app.post('/api/posts/', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else if (req.query.content === undefined) {
      res.status(400).json({"error": "No post content."});
    } else {
      var posterId = token.userId;
      User.findById(posterId, function(err, user) {
        if (err) {
          console.log("ERROR", err);
        } else {
          var posterName = user.fname + ' ' + user.lname;
          var poster = {
            name: posterName,
            id: posterId
          }
          new Post({
            poster: poster,
            content: req.query.content,
            likes: [],
            comments: [],
            createdAt: new Date()
          }).save(function(err, post) {
            if (err) {
              console.log('ERROR' + err);
            } else {
              console.log('SAVED' + post);
              res.status(200).json({success: true, response: post});
            }
          });
        }
      })
    }
  });
})

app.get('/api/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else {
      Post.findOne({_id: req.params.post_id}, function(err, post) {
        if (err) {
          console.log('ERROR', err);
        } else {
          console.log('FOUND', post);
          res.status(200).json({success: true, response: post.comments});
        }
      })
    }
  });
})

app.post('/api/posts/comments/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else {
      Post.findOne({_id: req.params.post_id}, function(err, post) {
        if (err) {
          console.log('ERROR', err);
        } else {
          var posterId = token.userId;
          User.findById(posterId, function(err, user) {
            if (err) {
              console.log("ERROR", err);
            } else {
              var posterName = user.fname + ' ' + user.lname;
              var poster = {
                name: posterName,
                id: posterId
              }
              var newComment = {
                poster: poster,
                content: req.query.content,
                createdAt: new Date()
              }
              // var newData = post.comments;
              // newData.push(newComment);
              // post.comments = newData;
              // console.log(post);
              post.comments.push(newComment);

              // Post.update({_id: post.post_id}, post, function(err) {
              //   if (err) {
              //     console.log('ERROR', err);
              //   } else {
              //     res.status(200).json(post);
              //   }
              // });
              post.save(function(err, post) {
                if (err) {
                  console.log('ERROR', err);
                } else {
                  console.log('SAVED', post);
                  res.status(200).json({success: true, response: post});
                }
              })
            }
          })
        }
      })
    }
  });
})


app.get('/api/posts/likes/:post_id', function(req, res) {
  Token.findOne({token: req.query.token}, function(err, token) {
    if (err) {
      console.log('ERROR', err);
    } else if (token === null) {
      console.log('Authentication failed');
      res.status(500).json({"error": "Failed to query posts."});
    } else {
      Post.findOne({_id: req.params.post_id}, function(err, post) {
        if (err) {
          console.log('ERROR', err);
        } else {
          var posterId = token.userId;
          User.findById(posterId, function(err, user) {
            if (err) {
              console.log("ERROR", err);
            } else {
              var posterName = user.fname + ' ' + user.lname;
              var poster = {
                name: posterName,
                id: posterId
              }

              // Toggle the poster in likes
              var liked = false;
              for (var i = 0; i < post.likes.length; i++) {
                if (post.likes[i].id === posterId) {
                  post.likes.splice(i, 1);
                  liked = true;
                  break;
                }
              }
              if (liked === false) post.likes.push(poster);

              post.save(function(err, post) {
                if (err) {
                  console.log('ERROR', err);
                } else {
                  console.log('SAVED', post);
                  res.status(200).json({success: true, response: post});
                }
              });
            }
          });
        }
      });
    }
  });
})



console.log('Express started. Listening on port', process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);
