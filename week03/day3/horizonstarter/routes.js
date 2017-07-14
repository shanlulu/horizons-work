"use strict";

// Routes, with inline controllers for each route.
var express = require('express');
var router = express.Router();
var Project = require('./models').Project;
var strftime = require('strftime');

// Example endpoint
router.get('/create-test-project', function(req, res) {
  var project = new Project({
    title: 'I am a test project'
  });
  project.save(function(err) {
    if (err) {
      res.status(500).json(err);
    } else {
      res.send('Success: created a Project object in MongoDb');
    }
  });
});

// Part 1: View all projects
// Implement the GET / endpoint.
router.get('/', function(req, res) {
  // build current query string



  var queryString = '?';
  for (var key in req.query) {
    queryString += key + '=' + req.query[key] + '&';
  }

  if (req.query.sort && req.query.sort !== 'contribution') {
    var sortStr = '';
    var direction = req.query.sortDirection || "ascending";
    if (direction === 'ascending') sortStr = req.query.sort;
    else sortStr = '-' + req.query.sort;
    Project.find().sort(sortStr).exec(function(err, projects) {
      if (req.query.fund) {
        projects = projects.filter(function(single) {
          var total = single.contributions.reduce(function(sum, next) {
            return sum + parseFloat(next.amount);
          }, 0);
          if (req.query.fund === 'fully') {
            return total >= single.goal;
          } else return single.goal > total;
        })
      }
      if (err) {
        console.log('ERROR', err);
      } else {
        res.render('index.hbs', {
          items: projects
        });
      }
    })
  } else {
    Project.find(function(err, projects) {
      projects = projects.filter(function(single) {
        var total = single.contributions.reduce(function(sum, next) {
          return sum + parseFloat(next.amount);
        }, 0);
        if (req.query.fund === 'fully') {
          return total >= single.goal;
        } else if (req.query.fund === 'no') {
          return single.goal > total
        } else return single;
      })
      if (err) {
        console.log('ERROR', err);
      } else {
        if (req.query.sort === 'contribution') {
          var direction = req.query.sortDirection || "ascending";
          projects.sort(function(a, b) {
            var totalA = a.contributions.reduce(function(sum, next) {
              return sum + parseFloat(next.amount);
            }, 0);
            var totalB = b.contributions.reduce(function(sum, next) {
              return sum + parseFloat(next.amount);
            }, 0);
            return totalA - totalB;
          })
          if (direction === 'descending') {
            projects.reverse();
          }
        }
        res.render('index.hbs', {
          items: projects
        });
      }
    })
  }
})

// Part 2: Create project
// Implement the GET /new endpoint
router.get('/new', function(req, res) {
  // YOUR CODE HERE
  res.render('new.hbs', {
    error: ''
  });
});

// Part 2: Create project
// Implement the POST /new endpoint
router.post('/new', function(req, res) {
  // YOUR CODE HERE
  req.checkBody('title').notEmpty();
  req.checkBody('goal').isInt();
  req.checkBody('start').isDate();
  req.checkBody('end').isDate();
  if (req.validationErrors()) {
    res.render('new.hbs', {
      error: 'ERROR!',
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    })
  } else {
    new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    }).save(function(err, project) {
      if (err) {
        console.log("ERROR", err);
      } else {
        console.log("SAVED", project);
        res.redirect('/');
      }
    });
  }
});

// Part 3: View single project
// Implement the GET /project/:projectid endpoint
router.get('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log('ERROR', err);
    } else {
      var total = project.contributions.reduce(function(sum, next) {
        return sum + parseFloat(next.amount);
      }, 0);
      res.render('project.hbs', {
        project: project,
        total: total,
        list: project.contributions,
        goal: project.goal,
        percentage: Math.floor(100*total/project.goal)
      });
    }
  })
});

// Part 4: Contribute to a project
// Implement the GET /project/:projectid endpoint
router.post('/project/:projectid', function(req, res) {
  // YOUR CODE HERE
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log('ERROR', err);
    } else {
      var contrib = project.contributions;
      contrib.push({name: req.body.name, amount: req.body.amount});
      project.save(function(err, contr) {
        if (err) {
          console.log("ERROR", err);
        } else {
          console.log("SAVED", contr);
        }
      });
      var total = contrib.reduce(function(sum, next) {
        return sum + parseFloat(next.amount);
      }, 0);
      res.render('project.hbs', {
        project: project,
        total: total,
        list: contrib,
        goal: project.goal,
        percentage: Math.floor(100*total/project.goal)
      });
      //res.redirect('/project/'+req.params.projectid);
    }
  })
});

// Part 6: Edit project
// Create the GET /project/:projectid/edit endpoint
// Create the POST /project/:projectid/edit endpoint

router.get('/project/:projectid/edit', function(req, res) {
  function insert(str, char, index) {
    if (str.split('-')[1].length < 2) {
      return str.slice(0, index) + char + str.slice(index);
    }
  }
  Project.findById(req.params.projectid, function(err, project) {
    if (err) {
      console.log("ERROR", err);
    } else {
      res.render('editProject.hbs', {
        id: project._id,
        error: "",
        title: project.title,
        goal: project.goal,
        description: project.description,
        start: insert(new Date(project.start).toLocaleDateString(),'0', 5),
        end: insert(new Date(project.end).toLocaleDateString(),'0', 5),
        category: project.category
      });
    }
  })
})


router.post('/project/:projectid/edit', function(req, res) {
  req.checkBody('title').notEmpty();
  req.checkBody('goal').isInt();
  req.checkBody('start').isDate();
  req.checkBody('end').isDate();
  if (req.validationErrors()) {
    res.render('editProject.hbs', {
      id: req.params.projectid,
      error: 'ERROR!',
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    })
  } else {
    Project.findByIdAndUpdate(req.params.projectid, {
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      start: req.body.start,
      end: req.body.end,
      category: req.body.category
    }, function(err) {
      console.log(err);
    })
    res.redirect('/');
  }
})


router.post('/api/project/:projectId/contribution', function(req, res) {
  Project.findById(req.params.projectId, function(err, project) {
    if (err) {
      console.log("ERROR", err);
    } else {
      var newContrib = {name: req.body.name, amount: req.body.amount};
      project.contributions.push(newContrib);
      project.save(function(err, contrib) {
        if (err) {
          console.log("ERROR", err);
        } else {
          console.log("SAVED", contrib);
          res.json(contrib);
        }
      });
    }
  })
})


module.exports = router;
