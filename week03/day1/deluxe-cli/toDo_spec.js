"use strict";
/* eslint-env jasmine */

var jsonfile = require('jsonfile');
var file = 'data.json';
var child_process = require('child_process');


describe("Test toDo.js", function() {

  beforeEach(function() {
    //resets data before all tests
    jsonfile.writeFileSync(file, []);
  });

  it("Show with no tasks on model", function() {
    var cmd = 'node toDo.js show';
    var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
    expect(stdout).toBe('');
  });

  it("Creating new task from blank", function() {
    child_process.execSync('node toDo.js add Do the dishes');
    var stdout = runAndCleanStdout('node toDo.js show');
    expect(stdout.length).toBe(1);
    expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes");
  });

  it("creating many tasks, with priority flags", function() {
    generateTasks();
    var stdout = runAndCleanStdout('node toDo.js show');
    expect(stdout.length).toBe(3);
    expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes");
    expect(stdout[1]).toEqual("Task #2 Priority 2: Fix tv");
    expect(stdout[2]).toEqual("Task #3 Priority 3: Call the internet guy");
  });

  it("Show task with id", function() {
    generateTasks();
    var stdout = runAndCleanStdout('node toDo.js show -i 2');
    expect(stdout[0]).toEqual("Task #2 Priority 2: Fix tv");
  });

  it("Delete task with id", function() {
    generateTasks();
    child_process.execSync('node toDo.js delete -i 2');
    var stdout = runAndCleanStdout('node toDo.js show');
    expect(stdout.length).toBe(2);
    expect(stdout[0]).toEqual("Task #1 Priority 1: Do the dishes");
    expect(stdout[1]).toEqual("Task #2 Priority 3: Call the internet guy");
  });
});

function runAndCleanStdout(cmd){
  var stdout = child_process.execSync(cmd, {encoding:'utf-8'});
  stdout = stdout.split(/\r\n|\r|\n/);
  stdout.splice(-1, 1);
  return stdout;
}

function generateTasks(){
  child_process.execSync('node toDo.js add Do the dishes');
  child_process.execSync('node toDo.js add Fix tv --priority 2');
  child_process.execSync('node toDo.js add Call the internet guy -p 3');
}
