"use strict";

var paths = [
{
  maze: [['S', 'E']],
  solution: ['right']
},
{
  maze: [['S'], ['E']],
  solution: ['down']
},
{
  maze: [['E'], [' '], ['S']],
  solution: ['up', 'up']
},
{
  maze: [['E', ' '],
         ['X', ' '],
         ['S', ' ']],
  solution: ['right', 'up', 'up', 'left']
},
{
  maze: [[" ", "E", " ", "X", " ", " ", " "],
         [" ", " ", " ", " ", " ", " ", " "],
         [" ", " ", " ", "X", " ", " ", "S"],
         [" ", " ", " ", "X", " ", " ", " "]],
  solution: 7
},
{
  maze: [["S", "X", "E"]],
  solution: []
},
{
  maze: [["X", " ", " ", " ", " ", " ", " "],
         [" ", "X", " ", " ", " ", " ", " "],
         ["S", " ", "X", " ", " ", " ", "E"],
         [" ", " ", " ", "X", " ", " ", " "]],
  solution: []
}
];

describe("Maze.getShortestPath()", function() {
  paths.forEach(function(path) {
    var actual = new Maze(path.maze).getShortestPath();
    if (_.isArray(path.solution)) {
      it("Path for: " + JSON.stringify(path.maze), function() {
        expect(actual).toEqual(path.solution);
      });
    } else {
      it("Path length for: " + JSON.stringify(path.maze), function() {
        expect(actual.length).toBe(path.solution);
      });
    }
  });
});
