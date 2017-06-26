// You do not need to look at code past this line, but you may
// if you would like to figure out how your EventEmitter is
// being used to update the message "msg" on all three devices at once.
function Observer(name, myEventEmitter) { // object that keeps track of changes
  this.name = name; this.myEventEmitter = myEventEmitter;
  this.myEventEmitter.on("send", this.onSend.bind(this));
}

// function that adds message to screen
Observer.prototype.onSend = function(m) {
  document.getElementById(this.name).innerHTML += m + "<br/>";
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
