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
  // TODO throw exception if this is not called with new
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
  return this.maze.map(function(row) {
    return row.map(function(cell) {
      if (cell === ' ') {
        return '_';
      }
      return cell;
    }).join('');
  }).join('\n');
}


// Return the coordinates of the starting position of the current maze.
//
// ex. new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]
// ex. new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]
// ex. new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]
Maze.prototype.getStartPosition = function() {
  for (var row = 0; row < this.maze.length; row++) {
    var curRow = this.maze[row];
    for (var column = 0; column < curRow.length; column++) {
      if (curRow[column] === 'S') {
        return [row, column];
      }
    }
  }
  throw new Error("Maze has no starting point");
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
//  - move ends on a cell that's a wall (represented by 'X')
//  - move results in moving off the board (i.e. moving up from the top row, or
//    moving left from the leftmost column etc.)
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
  var rows = this.maze.length;
  var cols = this.maze[0].length;

  function isPositionOnTheBoard() {
    if (row < 0) {
      return false;
    }

    if (column < 0) {
      return false;
    }

    if (row >= rows) {
      return false;
    }

    if (column >= cols) {
      return false;
    }

    return true;
  }

  // Check if position is on the board before move
  if (! isPositionOnTheBoard()) {
    return false;
  }

  var moves = {
    up: function() {
      row--;
    },
    down: function() {
      row++;
    },
    left: function() {
      column--;
    },
    right: function() {
      column++;
    }
  }
  moves[direction](); // make move

  // Check if position is on the board after the move
  if (! isPositionOnTheBoard()) {
    return false;
  }

  // check for walls
  if (this.maze[row][column] === 'X') {
    return false;
  }

  return [row, column];
}


// Write a method that returns true if this maze is solvable.
// A maze is solvable if there exists a path from the Starting Point
// to the Ending Point.
//
// No diagonal moves are allowed.
Maze.prototype.isSolvable = function() {
  // create 2d array to track if each cell has been visited
  // start with false, becase nothing has been visited yet
  this.visited = this.maze.map(function(row) {
    return row.map(_.constant(false));
  });

  var startPos = this.getStartPosition();
  var stack = [startPos];
  // While stack is not empty
  while (stack.length) {
    // Get next position to try
    var pos = stack.pop();
    var curCell = this.maze[pos[0]][pos[1]];

    if (curCell === 'X') {
      throw new Error("Can't move into wall. Position: " + pos);
    }

    // Reached the ending position, return true!
    if (curCell === 'E') {
      return true;
    }

    // Mark position as visited
    this.visited[pos[0]][pos[1]] = true;
    // Check every direction for a valid move
    for (var i = 0; i < Maze.validDirections.length; i++) {
      var direction = Maze.validDirections[i];
      var newPos = this.tryMove(pos[0], pos[1], direction);
      // this is a valid move and we have not visited the new position yet
      if (newPos && ! this.visited[newPos[0]][newPos[1]]) {
        // Add new position to the list of positions to be visited
        stack.push(newPos);
      }
    }
  }

  // If run out of locations to try, then the maze is not solvable
  return false;
}
