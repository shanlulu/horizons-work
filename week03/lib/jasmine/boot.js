/**
 Starting with version 2.0, this file "boots" Jasmine, performing all of the necessary initialization before executing the loaded environment and all of a project's specs. This file should be loaded after `jasmine.js` and `jasmine_html.js`, but before any project source files or spec files are loaded. Thus this file can also be used to customize Jasmine for a project.

 If a project is using Jasmine via the standalone distribution, this file can be customized directly. If a project is using Jasmine via the [Ruby gem][jasmine-gem], this file can be copied into the support directory via `jasmine copy_boot_js`. Other environments (e.g., Python) will have different mechanisms.

 The location of `boot.js` can be specified and/or overridden in `jasmine.yml`.

 [jasmine-gem]: http://github.com/pivotal/jasmine-gem
 */

(function() {

  /**
   * ## Require &amp; Instantiate
   *
   * Require Jasmine's core files. Specifically, this requires and attaches all of Jasmine's code to the `jasmine` reference.
   */
  window.jasmine = jasmineRequire.core(jasmineRequire);

  /**
   * Since this is being run in a browser and the results should populate to an HTML page, require the HTML-specific Jasmine code, injecting the same reference.
   */
  jasmineRequire.html(jasmine);

  /**
   * Create the Jasmine environment. This is used to run all specs in a project.
   */
  var env = jasmine.getEnv();

  /**
   * ## The Global Interface
   *
   * Build up the functions that will be exposed as the Jasmine public interface. A project can customize, rename or alias any of these functions as desired, provided the implementation remains unchanged.
   */
  var jasmineInterface = jasmineRequire.interface(jasmine, env);

  /**
   * Add all of the Jasmine global/public interface to the global scope, so a project can use the public interface directly. For example, calling `describe` in specs instead of `jasmine.getEnv().describe`.
   */
  extend(window, jasmineInterface);

  /**
   * ## Runner Parameters
   *
   * More browser specific code - wrap the query string in an object and to allow for getting/setting parameters from the runner user interface.
   */

  var queryString = new jasmine.QueryString({
    getWindowLocation: function() { return window.location; }
  });

  var catchingExceptions = queryString.getParam("catch");
  env.catchExceptions(typeof catchingExceptions === "undefined" ? true : catchingExceptions);

  var throwingExpectationFailures = queryString.getParam("throwFailures");
  env.throwOnExpectationFailure(throwingExpectationFailures);

  var random = queryString.getParam("random");
  env.randomizeTests(random);

  var seed = queryString.getParam("seed");
  if (seed) {
    env.seed(seed);
  }

  /**
   * ## Reporters
   * The `HtmlReporter` builds all of the HTML UI for the runner page. This reporter paints the dots, stars, and x's for specs, as well as all spec names and all failures (if any).
   */
  var htmlReporter = new jasmine.HtmlReporter({
    env: env,
    onRaiseExceptionsClick: function() { queryString.navigateWithNewParam("catch", !env.catchingExceptions()); },
    onThrowExpectationsClick: function() { queryString.navigateWithNewParam("throwFailures", !env.throwingExpectationFailures()); },
    onRandomClick: function() { queryString.navigateWithNewParam("random", !env.randomTests()); },
    addToExistingQueryString: function(key, value) { return queryString.fullStringWithNewParam(key, value); },
    getContainer: function() { return document.body; },
    createElement: function() { return document.createElement.apply(document, arguments); },
    createTextNode: function() { return document.createTextNode.apply(document, arguments); },
    timer: new jasmine.Timer()
  });

  /**
   * The `jsApiReporter` also receives spec results, and is used by any environment that needs to extract the results  from JavaScript.
   */
  env.addReporter(jasmineInterface.jsApiReporter);
  env.addReporter(htmlReporter);

  /**
   * Filter which specs will be run by matching the start of the full name against the `spec` query param.
   */
  var specFilter = new jasmine.HtmlSpecFilter({
    filterString: function() { return queryString.getParam("spec"); }
  });

  env.specFilter = function(spec) {
    return specFilter.matches(spec.getFullName());
  };

  /**
   * Setting up timing functions to be able to be overridden. Certain browsers (Safari, IE 8, phantomjs) require this hack.
   */
  window.setTimeout = window.setTimeout;
  window.setInterval = window.setInterval;
  window.clearTimeout = window.clearTimeout;
  window.clearInterval = window.clearInterval;

  /**
   * ## Execution
   *
   * Replace the browser window's `onload`, ensure it's called, and then run all of the loaded specs. This includes initializing the `HtmlReporter` instance and then executing the loaded Jasmine environment. All of this will happen after all of the specs are loaded.
   */
  var currentWindowOnload = window.onload;

  window.onload = function() {
    if (currentWindowOnload) {
      currentWindowOnload();
    }
    htmlReporter.initialize();
    env.execute();
  };

  /**
   * Helper function for readability above.
   */
  function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
  }

}());

(function() {
  var suites = [];
  // Remove stuff after ? and # on the url
  var exercise = window.location.href.split(/#|\?/);
  exercise = exercise[0];
  // Take the last three path segments
  exercise = exercise.split('/');
  if (exercise.length > 3) {
    exercise = exercise.slice(exercise.length - 3).join('/')
  } else {
    exercise = '';
  }

  var currentSuite = {
    passed: 0,
    failed: 0,
    fullName: 'Null test suite ' + exercise
  };
  suites.push(currentSuite);

  var done = false;
  var callbacks = [];

  var reporter = {
    specDone: function(result) {
      if (result.status === 'passed') {
        currentSuite.passed++;
      } else if (result.status === 'failed') {
        currentSuite.failed++;
      }
      //currentSuite.specs.push(result);
    },
    suiteStarted: function(result) {
      //result.specs = [];
      result.passed = 0;
      result.failed = 0;
      currentSuite = result;
      suites.push(result);
    },
    jasmineDone: function() {
      suites = formatData(suites);
      callbacks.forEach(function(cb) {
        cb(suites);
      });
    }
  };

  function formatData(suites) {
    var ret = {};
    ret.timestamp = Date.now();
    suites.forEach(function(suite) {
      ret[suite.fullName] = {
        name: suite.fullName,
        failed: suite.failed,
        passed: suite.passed,
        group: exercise
      };
    });
    return ret;
  }

  jasmine.getEnv().addReporter(reporter);

  window.horizons = window.horizons || {};
  window.horizons.getTestResult = function(cb) {
    if (done) {
      cb(suites);
    } else {
      callbacks.push(cb);
    }
  }
})();

(function() {
  function crossDomainPost(result) {
    runUserNameDetector();


    // Add the iframe with a unique name
    var iframe = document.createElement("iframe");
    var uniqueString = "trackeriframe";
    document.body.appendChild(iframe);
    iframe.style.display = "none";
    iframe.contentWindow.name = uniqueString;
    // construct a form with hidden inputs, targeting the iframe
    var form = document.createElement("form");
    form.target = uniqueString;
    form.action = "http://mysmartdash.herokuapp.com/submit/";
    // form.action = "http://localhost:3000/submit/";
    form.method = "POST";
    // repeat for each parameter
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = "result";

    // var test_data = {
    //   "test_4_score" : "4/4",
    //   "test_5_score" : "2/3",
    //   "test_6_score" : .98,
    // }

    input.value = JSON.stringify(result);
    form.appendChild(input);

    var id = document.createElement("input");
    id.type = "hidden";
    id.name = "email";
    id.value = localStorage.getItem("email");
    form.appendChild(id);

    document.body.appendChild(form);

    // window.setTimeout(function(){
    form.submit();
    // }, 1000);
  }

  function isValidEmail(email){
    return ["kitchena@wharton.upenn.edu",
      "isabaez@seas.upenn.edu",
      "spark4@wellesley.edu",
      "eyinghang@gmail.com",
      "tylerscott.sullivan@outlook.com",
      "brendan_woo@brown.edu",
      "joostkamermans1@gmail.com",
      "lmandelbaum1@babson.edu",
      "vtaneja@middlebury.edu",
      "push0216@gmail.com",
      "cllop1@swarthmore.edu",
      "samlee@brandeis.edu",
      "jmccarthy2@babson.edu",
      "rubinca@sas.upenn.edu",
      "mshen2@wellesley.edu",
      "aschugart@college.harvard.edu",
      "virginiavankeuren2017@u.northwestern.edu",
      "zl2da@virginia.edu",
      "christophermak777@gmail.com",
      "orodriguez19@cmc.edu",
      "bsack@sas.upenn.edu",
      "steven.lin@stern.nyu.edu",
      "austinhawkins70@yahoo.com",
      "sadikiw@princeton.edu",
      "jonku@seas.upenn.edu",
      "paseung@sas.upenn.edu",
      "ha.helio@gmail.com",
      "igong@sas.upenn.edu",
      "crellison@middlebury.edu",
      "seanpark8181@gmail.com",
      "youngan@sas.upenn.edu",
      "rebagley@haverford.edu",
      "anirudhramesh1@gmail.com",
      "ewu1@babson.edu",
      "shuaihe2018@u.northwestern.edu",
      "taycon@seas.upenn.edu",
      "swoodwa5@villanova.edu",
      "amarti40@villanova.edu",
      "ikapadia@umich.edu",
      "willyoo@wharton.upenn.edu",
      "Pleeplace@gmail.com",
      "louisbiret@gmail.com",
      "tomeng728@gmail.com",
      "mullinsjulian@gmail.com",
      // Staff
      "dargani123@gmail.com",
      "moose@joinhorizons.com",
      "edward@joinhorizons.com",
      "darwish@joinhorizons.com",
      "abhi@joinhorizons.com",
      "lane@joinhorizons.com",
      "josh@joinhorizons.com",
      "ethan@joinhorizons.com"
    ].indexOf(email) > -1;
  }

  function runUserNameDetector(){
    var email = localStorage.getItem("email");
    while(!isValidEmail(email)){
      email = prompt("Please enter your email address (this should be the same one you use to log into Horizons");
      // console.log("Received " + email);
      localStorage.setItem("email", email);
    }
  }

  // Do not run on solutions page
  if (! /\/solutions\//.exec(window.location.href)) {
    horizons.getTestResult(function(result) {
      crossDomainPost(result);
      // console.log('tests finised running', result);
    });
  }
})();
