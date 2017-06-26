//configuration options. These make up the exercicse.
"use strict";
var fs = require('fs');

// This is the file where we're storing our data.
// It's in this directory you can open it and check out the contents.
var JSON_FILE = 'data.json'

// Think of var data as an array of tasks. data = [];
// Here it is just reading it from a separate JSON_FILE.
if (! fs.existsSync(JSON_FILE)) {
  writeFile([]);
}
var data = JSON.parse(fs.readFileSync(JSON_FILE));

// This is the NPM module commander, we use it to interpret
// command line commands, arguments and flags.
var program = require('commander');

// ---Commands---
// Time to start defining our Commands. What are we going to do with our program?
// We want to be able to add, show and delete tasks.
// Syntax: lets say you want your program to go to sleep. You would define it like:
// program.command('goToSleep')
// .description("Make our program go to sleep")
// .action(goToSleep);

// Remeber to declare function goToSleep() so it is called when
// "node Program.js goToSleep" is called.

// YOUR CODE HERE for "Add" its action must call addTask
// YOUR CODE HERE for "Show" its action must call showTasks
// YOUR CODE HERE for "Delete" its action must call deleteTask

program.command('add')
  .description("Create Tasks")
  .action(addTask);
program.command('show')
  .description("Show Tasks")
  .action(showTasks);
program.command('delete')
  .description("Delete Tasks")
  .action(deleteTask);

// Flags
// We will need two flags on our program. These will take values and convert them
// to numbers.
// First one will be the flag '--id' or '-i'. This one will specify which
// task commands like 'show' or 'delete' are called on
// Second one wil be '--priority' or '-p', that will specify a priority for our task.

// The way to define these flags is the following.
// program
// .option('-got, --gameOfThrones <n>', 'watches GoT before sleeping', parseInt)
// So, here if we call our program `node program.js goToSleep --gameOfThrones 8`
// we can use it to know that we have to watch it before sleeping. The bool value
// of the flag will be stored on program.gameOfThrones

// The <n> part specifies that an integer can be passed to that flag, and that it
// will be parsed with parseInt. Here we can specify the number of the episode that
// we want to watch.

program
  .option('-i, --id <n>', 'Specify id of task', parseInt)
  .option('-p, --priority <p>', 'Specify priority for task', parseInt)

// YOUR CODE HERE for "--priority and -p"


// Arguments
// These line is part of the 'Commander' module. It tells them to process all the
// other arguments that are sent to our program with no specific name.
program.parse(process.argv);
if (process.argv.length === 2) {
  program.help();
}

// All the arguments that are not specified as flags are stored on an array called
// program.args.
// Calling our program with unkown args like 'node program.js No One'  means nothing
// to our program. It is not a flag or command. It is an extra argument, so our
// programs.args contain -> ['No', 'One', {}].
// 'No One' is the name of the GoT episode. and the last item is an object that contains
// many other more advanced arguments that are not going to be used now

// Write function parseArgs that eliminates the last element on the array and joins
// it in a string so: ['No', 'One', {}] -> ['No', 'One'] -> "No One"
// Hint: use splice() to delete the last element join() to make the string
function parseArgs () {
  // YOUR CODE HERE
  var args= program.args.splice(0, (program.args.length-1));
  return args.join(" ");
}

// Example: This is a function that is called to create a new task.
// Calling `node to_do.js add Do the dishes -p 3` must all our function addTask.
// it should get the name of the task by calling parseArgs() and the priority
// for the tast from program.priority.
// Remember to set priority to some default if the command is called without '-p'
// `node to_do.js add Do the dishes`
function addTask(){
  var priority = program.priority || 1;
  var name = parseArgs()
  data.push({
    name: name,
    priority: priority,
    completed: false
  });
  console.log("Added task named: "+ name + ", with id: " + data.length +", and priority: " + priority);
}


// Write function showTasks(). It is be called when the program is called like
// 'node to_do.js show' and 'node to_do.js show -i 3'
// if there is a flag value for id, the program should only display that task
// it there is no flag id, the program should return all tasks.
// *Note: the id is the index of the task on the array plus one, because we don't
// want users to see values of 0. So for example:
// data = [{name: "Do Laundry"}, {name: "Clean dishes"}, {name:"Call mark"}]
// Here,  'node to_do.js show -i 2' will show "Clean Dishes"
// use console.log to write to the command line.
// Tasks must be logged in the followin way:
// Task #1 Priority 2: Do Laundry
function showTasks(){
  // YOUR CODE HERE
  if(program.id){
    var id = program.id-1;
    console.log("Task #"+(program.id)+" Priority "+data[id].priority+ ": "+data[id].name)
  }else{
    for (var i=0; i<data.length; i++){
      console.log("Task #"+(i+1)+" Priority "+data[i].priority+ ": "+data[i].name)
    }
  }
}

// Write a function that is called when the command `node to_do.js add delete -i 3`
// is run. Take the id from program.id and delete that element from the array.
// Hint: use splice() here too!
function deleteTask(){
  // YOUR CODE HERE
  if(program.id){
    var id = program.id-1;
    if (id>=0 && id<data.length){
      data.splice(id, 1);
      console.log("Deleted task with id: "+program.id)
    }
  } else{
    console.log("No task specified")
  }
}

function writeFile(data) {
  fs.writeFileSync(JSON_FILE, JSON.stringify(data, null, 2));
}

// This command writes  our tasks to the disk
writeFile(data);
