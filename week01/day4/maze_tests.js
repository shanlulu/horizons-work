"use strict";
// -----------------------------
//   TRY NOT TO LOOK AT THESE
// -----------------------------

var solvableMazes = [];
solvableMazes.push([["S", "E"]]);
solvableMazes.push([["S"],
                    ["E"]]);
solvableMazes.push([["X", "S", "E", "X"]]);
solvableMazes.push([["S", "X"],
                    ["E", "X"]]);

solvableMazes.push([["X", "S", " ", " ", " ", " ", " "],
                    [" ", "X", " ", " ", " ", " ", " "],
                    [" ", " ", "X", " ", " ", " ", "E"],
                    [" ", " ", " ", "X", " ", " ", " "]]);

solvableMazes.push([[" ", "S", " ", "X", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", "X", " ", " ", "E"],
                    [" ", " ", " ", "X", " ", " ", " "]]);

solvableMazes.push([[" ", "E", " ", "X", " ", " ", " "],
                    [" ", " ", " ", " ", " ", " ", " "],
                    [" ", " ", " ", "X", " ", " ", "S"],
                    [" ", " ", " ", "X", " ", " ", " "]]);

var unsolvableMazes = [];
unsolvableMazes.push([["S", "X", "E"]]);
unsolvableMazes.push([["S"],
                      ["X"],
                      ["E"]]);
unsolvableMazes.push([["S", "X"],
                      ["X", " "],
                      ["E", " "]]);

unsolvableMazes.push([["X", " ", " ", " ", " ", " ", " "],
                      [" ", "X", " ", " ", " ", " ", " "],
                      ["S", " ", "X", " ", " ", " ", "E"],
                      [" ", " ", " ", "X", " ", " ", " "]]);

unsolvableMazes.push([[" ", "S", " ", "X", " ", " ", " "],
                      [" ", " ", " ", " ", "X", " ", " "],
                      [" ", " ", " ", "X", " ", " ", "E"],
                      [" ", " ", " ", "X", " ", " ", " "]]);

unsolvableMazes.push([[" ", "E", " ", "X", " ", " ", " "],
                      [" ", " ", " ", " ", "X", " ", " "],
                      [" ", " ", " ", "X", " ", " ", "S"],
                      [" ", " ", " ", "X", " ", " ", " "]]);

var allMazes = solvableMazes.concat(unsolvableMazes);

describe('Maze.getStartPosition()', function() {
  var mazes = JSON.parse(JSON.stringify(allMazes));
  mazes.push([[" ", "E", " ", "X", " ", " ", " "],
              [" ", " ", " ", " ", "X", " ", " "],
              [" ", " ", " ", "X", " ", " ", "X"],
              [" ", " ", " ", "X", " ", " ", " "]]);
  mazes.push([[" ", " ", " ", "X", " ", " ", " "],
              [" ", " ", " ", " ", "X", " ", " "],
              [" ", " ", " ", "X", " ", " ", "E"],
              [" ", " ", " ", "X", " ", " ", " "]]);
  mazes.forEach(function(m) {
    var maze = new Maze(m);
    var pos = [0, 0];
    var found = false;
    m.forEach(function(r, i) {
      r.forEach(function(p, j) {
        if(p === "S") {
          found = true;
          pos = [i, j];
        }
      });
    });
    if(!found) pos = "Error"
    it("new Maze(" + JSON.stringify(m) + ").getStartPosition() -> " + pos, function() {
      if(found) expect(maze.getStartPosition()).toEqual(pos);
      else expect(function() { maze.getStartPosition() }).toThrow();
    })
  })
});

describe('Maze.toString()', function () {
  allMazes.forEach(function(m) {
    var maze = new Maze(m);
    var ans = m.map(function(row) {
      return row.map(function(pos) {
        if(pos === " ") {
          return '_';
        } else {
          // console.log(pos);
          return pos;
        }
      }).join('')
    }).join('\n');
    it("new Maze(" + JSON.stringify(m) + ").toString() -> " + ans.replace(/\n/g, "\\n"), function() {
      expect(maze.toString()).toEqual(ans);
    });
  });
});

describe('Maze.tryMove()', function() {
  it("new Maze([['S', 'E']]).tryMove(1, 0, 'right') -> false, invalid starting position", function() {
    expect(new Maze([['S', 'E']]).tryMove(1, 0, 'right') ).toBe(false);
  });
  it("new Maze([['S', 'E']]).tryMove(0, 0, 'left') -> false, moves off the left side of board", function() {
    expect(new Maze([['S', 'E']]).tryMove(0, 0, 'left') ).toBe(false);
  });
  it("new Maze([['S', 'E']]).tryMove(0, 0, 'up') -> false, moves off the top of the board", function() {
    expect(new Maze([['S', 'E']]).tryMove(0, 0, 'up') ).toBe(false);
  });
  it("new Maze([['S', 'E']]).tryMove(0, 0, 'down') -> false, moves off the bottom of the board", function() {
    expect(new Maze([['S', 'E']]).tryMove(0, 0, 'down') ).toBe(false);
  });
  it("new Maze([['S', 'X', 'E']]).tryMove(0, 0, 'right') -> false, moves into wall", function() {
    expect(new Maze([['S', 'X', 'E']]).tryMove(0, 0, 'right') ).toBe(false);
  });
  it("new Maze([['S', 'X', 'E']]).tryMove(0, 2, 'left') -> false, moves into wall", function() {
    expect(new Maze([['S', 'X', 'E']]).tryMove(0, 2, 'left') ).toBe(false);
  });
  it("new Maze([['S'], ['E']]).tryMove(0, 0, 'right') -> false, moves off right side of the board", function() {
    expect(new Maze([['S'], ['E']]).tryMove(0, 0, 'right') ).toBe(false);
  });
  it("new Maze([['S'], ['X'], ['E']]).tryMove(0, 0, 'down') -> false, moves into wall", function() {
    expect(new Maze([['S'], ['X'], ['E']]).tryMove(0, 0, 'down') ).toBe(false);
  });
  it("new Maze([['S'], ['X'], ['E']]).tryMove(2, 0, 'up') -> false, moves into wall", function() {
    expect(new Maze([['S'], ['X'], ['E']]).tryMove(2, 0, 'up') ).toBe(false);
  });

  it("new Maze([['S'], ['E']]).tryMove(0, 0, 'down') -> [1, 0]", function() {
    expect(new Maze([['S'], ['E']]).tryMove(0, 0, 'down') ).toEqual([1, 0]);
  });
  it("new Maze([['S'], ['E']]).tryMove(1, 0, 'up') -> [0, 0]", function() {
    expect(new Maze([['S'], ['E']]).tryMove(1, 0, 'up') ).toEqual([0, 0]);
  });
  it("new Maze([['S', 'E']]).tryMove(0, 1, 'left') -> [0, 0]", function() {
    expect(new Maze([['S', 'E']]).tryMove(0, 1, 'left') ).toEqual([0, 0]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'left') -> [0, 0]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'left') ).toEqual([0, 0]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'right') -> [0, 2]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 1, 'right') ).toEqual([0, 2]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 0, 'right') -> [0, 1]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', 'X']]).tryMove(0, 0, 'right') ).toEqual([0, 1]);
  });
  it("new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') -> [0, 2]", function() {
    expect(new Maze([['S', ' ', 'E'], ['X', 'X', ' ']]).tryMove(1, 2, 'up') ).toEqual([0, 2]);
  });
});

describe("Maze.getStartPosition()", function() {
  it("new Maze([['S'], ['E']]).getStartPosition() -> [0, 0]", function() {
    expect(new Maze([['S'], ['E']]).getStartPosition() ).toEqual([0, 0]);
  });
  it("new Maze([['E'], ['S']]).getStartPosition() -> [1, 0]", function() {
    expect(new Maze([['E'], ['S']]).getStartPosition() ).toEqual([1, 0]);
  });
  it("new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() -> [1, 1]", function() {
    expect(new Maze([[' ', 'E'], [' ', 'S']]).getStartPosition() ).toEqual([1, 1]);
  });
});

describe("Maze.isSolvable()", function() {
  solvableMazes.forEach(function(maze) {
    var m = new Maze(maze);
    it("Maze should be solvable: " + JSON.stringify(maze), function() {
      expect(m.isSolvable()).toBe(true);
    });
  });

  unsolvableMazes.forEach(function(maze) {
    var m = new Maze(maze);
    it("Maze should not be solvable: " + JSON.stringify(maze), function() {
      expect(m.isSolvable()).toBe(false);
    });
  });
})
