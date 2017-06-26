// In this exercise you will create your own EventEmitter class
// that will listen for & emit events. These events can be used
// to keep track of actions/changes made by a user.
// EventListener can "broadcast" an event to multiple
// listeners at a time. When a message arrives via
// emit() all callback functions that are registered
// for that event type with on() are called.
//
// Once you correctly implement the EventEmitter object you
// will be able to use the messenger application. Note that if you
// send a message on one device, it will be available on all
// other devices.

// Giving EventEmitter a property called listeners. listeners will
// be an object where the keys are names for the event, and values
// are arrays containing the listener functions
function EventEmitter() {
  this.listeners = {};
}

// Takes is a string "eventName" and a callback function "fn"
// Adds a one time listener function for the event named
// eventName. The next time eventName is triggered, this
// listener is removed and then called.
EventEmitter.prototype.once = function(eventName, fn) {
  if (!(eventName in this.listeners)) this.listeners[eventName] = [];
  var called = false;
  var self = this;

  function inner() {
    self.removeListener(eventName, inner);

    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }

  inner.listener = fn;
  this.on(eventName, inner);
  return this;
}

// Takes is a string "eventName" and a callback function "fn"
// add a listener to the listeners property in EventEmitter
// Adds the listener function to the end of the listeners
// array (in the listeners property) for the event named eventName.
EventEmitter.prototype.on = function(eventName, fn) {
  if (!(eventName in this.listeners)) this.listeners[eventName] = [];
  this.listeners[eventName].push(fn);
}

// Takes is a string "eventName" and a single argument arg
// It calls each of the listeners registered for the event
// named eventName, in the order they were registered, passing
// the supplied arguments to each.
EventEmitter.prototype.emit = function(eventName, arg) {
  var listeners = this.listeners[eventName];
  if (listeners && listeners.length) {
    listeners.forEach(function (l) {l(arg);});
  }

  return this;
}

// Takes is a string "eventName" and a callback function "fn"
// Removes the specified listener from the listener array
// for the event named eventName.
EventEmitter.prototype.removeListener = function(eventName, fn) {
  this.listeners[eventName] = this.listeners[eventName].filter(function(listener) {
    return listener != fn;
  });

  return this;
}

// You do not need to look at code past this line, but you may
// if you would like to figure out how your EventEmitter is
// being used to update the message "msg" on all three devices at once.
function Observer(name, myEventEmitter) { // object that keeps track of changes
  this.name = name; this.myEventEmitter = myEventEmitter;
  this.myEventEmitter.on("send", this.onSend.bind(this));
}

// function that adds message to screen
Observer.prototype.onSend = function(m) {
  document.getElementById(this.name).innerHTML += m + `<br/>`;
}

var myEventEmitter = new EventEmitter();
// makes all devices observers
var observers = [
  new Observer('iphone', myEventEmitter),
  new Observer('ipad', myEventEmitter),
  new Observer('mac', myEventEmitter)
];

// function that takes in a string "type" (the type of device used to messege)
// and uses the EventEmitter object "myEventEmitter" to emit the messege "msg"
// to all observers
function submitMsg(type) {
  var msg = document.getElementById(type+"-input").value;
  if (!msg) return;
  myEventEmitter.emit('send', msg);
}
