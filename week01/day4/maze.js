"use strict";

// New maze constructor. Given a maze layout, construct a new maze.
//
// A maze is a rectangular grid of cells. Each cell can either be:
//  - A wall, represented by 'X'
//  - Empty space, represented by ' ' a single space character
//  - Starting point, represented by 'S'
//  - Ending point, represented by 'E'
//
// A maze is represented by a 2-dimensional array.  Inner arrays represent rows
//
// Mazes are solved by finding a path from the starting point to the ending
// point.
//
// Parameters:
//  * maze: A 2-dimensional array representing a rectangular maze.
//          The lengths of the inner arrays must be the same.
//          Each item of the inner array must be a string that represents a valid maze cell
//          There must be only one starting point and only one ending point.
//
// ex. new Maze([['S', 'E']) represents a trivial solvable maze
// ex. new Maze([['S', 'X', 'E']) represents a trivial unsolvable maze
window.Maze = function(maze) {
  this.maze = maze;
}

Maze.validDirections = ['up', 'down', 'left', 'right'];

// Return a string representation of the current maze.
// Empty spaces are represented by underscores '_',
// and new rows are separated by newlines (\n in a string).

// Use this for your logging purposes!

// ex. new Maze(['S', ' ', 'E']).toString() -> "S_E"
// ex. new Maze([[' ', 'E'], [' ', 'S']]).toString() -> "_E\n_S"
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).toString -> "S_E\nXXX"

Maze.prototype.toString = function() {
  var res = [];
  var args = this.maze;
  for (var i = 0; i < args.length; i++) {
    var str = args[i].join('');
    str = str.replace(/ /g,'_');
    res.push(str);
  }
  return res.join("\n");
}

// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  var args = this.maze;
  for (var i = 0; i < args.length; i++) {
    for (var j = 0; j < args[i].length; j++)
      if (args[i][j] === 'S') {
        return [i, j];
      }
  }
  throw new Error("Maze has no starting point");
}

Maze.prototype.getEndPosition = function() {
  var args = this.maze;
  for (var i = 0; i < args.length; i++) {
    for (var j = 0; j < args[i].length; j++)
      if (args[i][j] === 'E') {
        return [i, j];
      }
  }
  throw new Error("Maze has no ending point");
}

// Write a method tryMove() that takes a position (row and column parameters)
// a direction to move, and returns:
//  - if the move is valid, a new position ([row, column])
//  - if the move is invalid, false
//
// The position 0, 0 represents the upper left corner of the maze.
//
// A move is invalid if any of the following conditions are true:
//  - starting position is invalid (i.e. not on the board)
//  - move results in moving off the board (i.e. moving up from the top row, or
//    moving left from the leftmost column etc.)
//  - move ends on a cell that's a wall (represented by 'X')
//
// Parameters:
//  - row: row before the move. 0 represents top row.
//  - column: column before the move. 0 represents leftmost column.
//  - direction: direction to try to move. Must be one of:
//    - 'up': Move up i.e. decrement row
//    - 'down': Move down i.e. increment row
//    - 'left': Move left i.e. decrement column
//    - 'right': Move right i.e. increment column
//
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'leftright') -> Throws error: 'leftright' is not a valid direction
// ex. new Maze([['S', 'E']]).tryMove(1, 0, 'right') -> false, invalid starting position
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'left') -> false, moves off the left side of board
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'up') -> false, moves off the top of the board
// ex. new Maze([['S', 'E']]).tryMove(0, 0, 'down') -> false, moves off the bottom of the board
// ex. new Maze([['S', 'X', 'E']]).tryMove(0, 0, 'right') -> false, moves into wall
// ex. new Maze([['S', 'X', 'E']]).tryMove(0, 2, 'left') -> false, moves into wall
// ex. new Maze([['S'], ['E']]).tryMove(0, 0, 'right') -> false, moves off right side of the board
// ex. new Maze([['S'], ['X'], ['E']]).tryMove(0, 0, 'down') -> false, moves into wall
// ex. new Maze([['S'], ['X'], ['E']]).tryMove(2, 0, 'up') -> false, moves into wall
//
//
// ex. new Maze([['S'], ['E']]).tryMove(0, 0, 'down') -> [1, 0]
// ex. new Maze([['S'], ['E']]).tryMove(1, 0, 'up') -> [0, 0]
// ex. new Maze([['S', 'E']]).tryMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'left') -> [0, 0]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'right') -> [0, 2]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 0, 'right') -> [0, 1]
// ex. new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') -> [0, 2]
Maze.prototype.tryMove = function(row, column, direction) {
  if (! _.contains(Maze.validDirections, direction)) {
    throw new Error('Invalid direction: ' + direction);
  }
  var maze = this.maze;
  if (row < 0 || column < 0 || row >= maze.length || column >= maze[0].length) {
    return false;
  }

  if (direction === "up") row--;
  else if (direction === "down") row++;
  else if (direction === "left") column--;
  else column++;

  if (row < 0 || column < 0 || row >= maze.length || column >= maze[0].length) {
    this.tryMove(row, column, this.reverse(direction));
    return false;
  }
  if (maze[row][column] === "X") {
    this.tryMove(row, column, this.reverse(direction));
    return false;
  }
  return [row, column];
}

// Helper function
Maze.prototype.reverse = function(direction) {
  if (direction === 'up') return 'down';
  else if (direction === 'down') return 'up';
  else if (direction === 'left') return 'right';
  else return 'left';
}

// Bonus!
// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  var record = {};
  var self = this;
  var pastMoves = [];
  var possibleMoves = Maze.validDirections;
  var curRow = this.getStartPosition()[0];
  var curCol = this.getStartPosition()[1];
  var end = this.getEndPosition();
  var ableToMove = true;
  var end = false;
  while (ableToMove || !end) {
    for (var i = 0; i < possibleMoves.length; i++) {
      var move = self.tryMove(curRow, curCol, possibleMoves[i]);
      //console.log(move);
      if (move !== false) {
        // if (record[move.join(',')] === false) {
        //   self.tryMove(curRow, curCol, self.reverse(possibleMoves[i]));
        // } else {
        if (record[move.join(',')] === true) {
          curRow = move[0];
          curCol = move[1];
          record[move.join(',')] = false;
          //console.log(record);
          pastMoves.push(possibleMoves[i]);
          //console.log(pastMoves);
          break;
        }
      }
      if (i === possibleMoves.length-1) {
        //self.tryMove(curRow, curCol, self.reverse(pastMoves.pop()));
        var reverse = pastMoves.pop();
        if (reverse === 'up') curRow++;
        else if (reverse === 'down') curRow--;
        else if (reverse === 'left') curCol++;
        else curCol--;
        break;
      }
    }
    //if (curRow !== end[0] || curCol !== end[1]) continue;
    // if (self.tryMove(curRow, curCol, 'up') === false &&
    //         self.tryMove(curRow, curCol, 'down') === false &&
    //         self.tryMove(curRow, curCol, 'left') === false &&
    //         self.tryMove(curRow, curCol, 'right') === false) break;
  // }
    //console.log(curRow, curCol);
    ableToMove = self.tryMove(curRow, curCol, 'up') !== false ||
            self.tryMove(curRow, curCol, 'down') !== false ||
            self.tryMove(curRow, curCol, 'left') !== false ||
            self.tryMove(curRow, curCol, 'right') !== false;
    end = curRow === end[0] && curCol === end[1];
  }
  console.log(1);
  return !!(curRow === end[0] && curCol === end[1]);
}
