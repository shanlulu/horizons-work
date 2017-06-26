"use strict";

// Write a method (i.e. a function) that returns the shortest
// path through a maze. If there is no path through the maze
// it should return empty array.
//
// There may be multiple shortest paths in a maze, you only
// need to find one of them.
Maze.prototype.getShortestPath = function() {
  // create 2d array to track if each cell has been visited
  // start with false, becase nothing has been visited yet
  this.visited = this.maze.map(function(row) {
    return row.map(_.constant(false));
  });

  var startPos = this.getStartPosition();
  var q = [{pos: startPos, path: []}];
  // While queue is not empty
  while (q.length) {
    // Get next position to try
    var node = q.shift();
    var pos = node.pos;
    var curCell = this.maze[pos[0]][pos[1]];

    if (curCell === 'X') {
      throw new Error("Can't move into wall. Position: " + pos);
    }

    // Reached the ending position, return true!
    if (curCell === 'E') {
      return node.path;
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
        var path = node.path.slice(0);
        path.push(direction);
        q.push({pos: newPos, path: path});
      }
    }
  }

  // If run out of locations to try, then the maze is not solvable
  return [];
}
