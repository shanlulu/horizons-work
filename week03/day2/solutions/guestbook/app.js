#!/usr/bin/env node
var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var exphbs = require('express-handlebars');
var app = express();
var port = '3000'
var expressValidator = require('express-validator');

var jsonfile = require('jsonfile');
var file = 'data.json';

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({defaultLayout: 'single', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());

app.use(express.static(path.join(__dirname, 'public')));

// Posts loaded from disk
var posts = jsonfile.readFileSync(file);

// LOGIN
// GET LOGIN: Renders the form to log into the app when the user opens /login
// on their browser. This function is already implemented for you to have as a model.
// It passes the object with title : 'Log in' to the template
app.get('/login', function(req, res) {
  res.render('login', { title: 'Log In' });
});

// POST LOGIN: Receives the form info for the user, sets a cookie on the client
// (the user's browser) and redirects to posts.
app.post('/login', function(req, res) {
  res.cookie('username', req.body.username).redirect('/posts');
});


// POSTS
// GET POSTS: Renders a list of all available posts. No need to be logged in.
// This function should render all the posts ordered descending by date if no params
// are passed of ir called: /posts?order=descending
// If the user visits the url /posts?order=ascending they should be ordered ascending
// If the function is called with a username like /posts?username=steven, you should
// filter all posts that aren't done by that user.
// Hint: to get the username, use req.query.username
// Don't forget to send the posts array to the view on the render method!
app.get('/posts', function (req, res) {
  // YOUR CODE HERE
  var displayposts = posts;
  if (req.query.username){
    displayposts = displayposts.filter(function(post){
      return post.author===req.query.username
    });
  }
  if (req.query.order==='ascending'){
    displayposts.sort(function(a,b) { return new Date(a.date) - new Date(b.date); })
  } else {
    displayposts.sort(function(a,b) { return new Date(b.date) - new Date(a.date); })
  }
  res.render('posts', {
    title: 'Posts',
    posts: displayposts
  });
});

// GET POSTS: Renders the form page, where the user creates the request.
// User must be logged in to be able to visit this page.
// Hint: if req.cookies.username is set, the user is logged in.
app.get('/posts/new', function(req, res) {
    // YOUR CODE HERE
  if (req.cookies && req.cookies.username){
    res.render('post_form', { title: 'New Post' });
  }
  else{ console.log("not logged") }
});

// POST POSTS: This route receives the information for the new post. User must
// be logged in to use this route. It should create a new post and redirect to
// posts.
// It should also use express-validator to check if the title and body aren't empty.
// an example validation using express-validator is:
// req.checkBody('email', 'Email must not be valid').isEmail();
// Don't forget to check if there are validation errors at req.validationErrors();

// Append the new post to the posts array, and use jsonfile.writeFileSync(file, posts);
// to write the entire posts array to disk
app.post('/posts', function(req, res) {
// YOUR CODE HERE
  req.checkBody('title', 'Title must not be empty').notEmpty();
  req.checkBody('text', 'Title must not be empty').notEmpty()
  var errors = req.validationErrors();

  if (errors){
    res.render('post_form', {
      title: 'New Post',
      error:"Title and body can't be blank"});
  }
  if (req.cookies && req.cookies.username && !errors){
    var post = {
      author: req.cookies.username,
      date: req.body.date,
      title: req.body.title,
      text: req.body.text
    }
    posts.push(post);
    jsonfile.writeFileSync(file, posts);
    res.redirect('/posts')
  }
});

app.set('port', port);
var server = http.createServer(app);
server.listen(port);
