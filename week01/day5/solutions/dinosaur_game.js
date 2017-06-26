window.game = window.game || {};

// [Helper] CanvasWrapperObject

game.CanvasWrapper = function() {
	this.width = 550;
  this.height = 250;
	this.canvasId = "dinosaur-panel";

  this.cv;
  this.ctx;

  this.attachTo();
  console.log("Initalizing");
};

game.CanvasWrapper.prototype = {
	getHeight: function() {
		return this.height;
	},
	getWidth: function() {
		return this.width;
	},
	attachTo: function() {
		this.cv = document.querySelector("#" + this.canvasId);
		this.ctx = this.cv.getContext("2d");

		this.cv.width = this.width;
		this.cv.height = this.height;
	},
  clear: function() {
    this.ctx.fillStyle = "#5873fd";
    this.ctx.fillRect(0, 0, this.width, this.height);
  },
	drawText: function(text) {
		this.ctx.fillStyle = "#000";
		this.ctx.font = "36px Helvetica";
		this.ctx.fillText(text, this.width / 2, this.height / 2);
	},
	drawMessage: function(text) {
		this.ctx.fillStyle = "#000";
		this.ctx.font = "36px Helvetica";
		this.ctx.fillText(text, this.width / 2, this.height / 2);
	},
	drawLine: function(x, y, xp, yp) {
		this.ctx.beginPath();
		this.ctx.moveTo(x,y);
		this.ctx.lineTo(xp, yp);
		this.ctx.stroke();
	},
  drawDinosaur: function(x, y) {
		var dino = [25, 50, "#e44e44"];
		this.ctx.fillStyle = dino[2];
    this.ctx.fillRect(x, y - dino[1], dino[0], dino[1]);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0,2*Math.PI);
    this.ctx.stroke();
  },
  drawObstacle: function(x, y) {
		var obs = [40, 20, "#ccc"];
		this.ctx.fillStyle = obs[2];
    this.ctx.fillRect(x, y - obs[1], obs[0], obs[1]);
    this.ctx.beginPath();
    this.ctx.arc(x, y, 5, 0,2*Math.PI);
    this.ctx.stroke();
  },
	callOnUp: function(fun) {
		window.addEventListener('keydown', function(evt) {
			if (evt.which === 38 || evt.keyCode === 38) {
				fun();
			}
		});
	}
};

// [Helper] `comparePositions(a<Number[]>,b<Number[]>)` method
// Takes two position arrays and compares them.
//
// hint. remember the Pythagorean Theorem? Yeah, you need that.
game.comparePositions = function(a, b) {
  if (a.length !== b.length) {
    return false;
  }
  var eps = 5;

  // Pythagorean Theorem
  return (Math.sqrt(_.reduce(_.map(_.zip(a, b), function(dim) {
    var diff = dim[0] - dim[1];
    return (diff * diff);
  }), function(prev, curr) {
    return (prev + curr);
  }), 0) <= eps);
};

game.Game = function() {
  this.initialize();
};

game.Game.prototype = {
	initialize: function() {
		// create canvas wrapper
		this.cw = new game.CanvasWrapper();
		this.gameWidth = this.cw.getWidth();
		this.gameHeight = this.cw.getHeight();
		this.floorHeight = this.gameHeight - 20;
		this.gameOver = false;

		// game state
		this.tick = Date.now();

		// create game objects
		// create player
		this.obstacles = [];
		this.player = new game.Dinosaur(154, this.floorHeight - 100);
		console.log("playerObject created", this.player);
		// add objects
		this.obstacles.push(new game.Obstacle(this.gameWidth - 75, this.floorHeight));

		// add controls
		this.cw.callOnUp(this.player.jump.bind(this.player));

		this.render();
	},
	update: function() {
		// [helper] use this.tick as the time step input for game objects
		this.tick = (Date.now() - this.tick) / 1000000000000.0;

		// Exercise 1. Update game objects
		// Write a few statements to update the internal state of the game objects with the tick.
		// Use your knowledge of the player object and the other game objects to update each object with the time step.
		//
		// hint. check out the `dinosaur.js` file to check out the pertinent methods!
		// hint. how do you iterate through an array and perform a function on each item?
		// hint. use `.update()`!
		// YOUR CODE HERE
		this.player.update(this.tick);
		this.obstacles.forEach(function(gObj) {
			gObj.update(this.tick);
		}, this);

		// Exercise 2.A Bound Player & Collision Detection | Player Care
		// Write a few lines that check if the player's position is under the canvas.The bottom border of the canvas is at position y =`this.gameHeight`, and the top level is y = 0. The player's position is accessible via `.getPosition()`
		// If the player is under the canvas, stop the player from falling by setting its inAir property to false and setting it's position to the same x-point but vertically positioned ("stopped") the bottom border, `this.gameHeight`.
		//
		// YOUR CODE HERE
		var pPos = this.player.getPosition();
		if (pPos[1] >= this.floorHeight) {
			this.player.inAir = false;
			this.player.setPosition(pPos[0], this.floorHeight);
		}

		this.obstacles.forEach(function(gObj) {
			// Exercise 2.B Bound Player & Collision Detection | Bound Obstacles
			// Write a block of code that resets the position of the game obstacles.
			// The obstacle(s) always move to the left, so when the object is fully past the left border, move it back to the right side.
			//
			// hint. use `getPosition` and `setPosition`
			// hint. the left border of the canvas is at x = 0;
			var objPos = gObj.getPosition();
			if (objPos[0] < 0) {
				gObj.setPosition(this.gameWidth + gObj.width, objPos[1]);
			}

			// Exercise 2.C Bound Player & Collision Detection | Check Collisions
			// Write a block of code that calls `this.exit` if an obstacle has collided with the player object. The obstacle and the player object should also be frozen upon collision.
			//
			// hint. use `gObj.isCollidingWith` but you'll need to implement it first! Check out `dinosaur.js`.
			// hint. use `.freeze()`
			// YOUR CODE HERE
			// check if hit player
			if (this.player.isCollidingWith(gObj)) {
				// end the game!
				this.player.freeze();
				gObj.freeze();
				this.exit();
			}

			// [helper] collideTime
			// if collided and after 3 seconds, clear it
			if (this.player.hasCollided && (Date.now() - this.player.collideTime) > 3000.0) {
				this.player.hasCollided = false;
				this.player.collideTime = null;
			}
		}, this);

	},
	exit: function() {
		this.cw.drawText("Game over!");
		this.gameOver = true;
	},
	render: function() {
		// update game state
		this.update();

		// Clear the canvas
		if (!this.gameOver) {
			this.cw.clear();
		}

		// Draw the floor
		this.cw.drawLine(0, this.floorHeight, this.gameWidth, this.floorHeight);

		// Render game objects
		var dinoPos = this.player.getPosition();
		this.cw.drawDinosaur(dinoPos[0], dinoPos[1])
		this.obstacles.forEach(function(gObj) {
			var obsPos = gObj.getPosition();
			this.cw.drawObstacle(obsPos[0], obsPos[1]);
		}, this);

		requestAnimationFrame(this.render.bind(this));
	}
};
