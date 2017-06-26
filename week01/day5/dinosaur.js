"use strict";
/*global game*/

// Wait till the game is ready to run.
game.onReady(function() {
  // Sample code to clear the screen then draw an obstacle.
  // Feel free to delete all this.
  game.drawObstacle(450, 200);
  var obstacleX = 450;
  var dinosaurY = 200;
  var dinosaurVelocity = 0;
  var score = 0;
  var alive = true;
  var highScore = 0;
  var interval;
  function eventLoop() {
    interval = requestAnimationFrame(eventLoop);

    obstacleX = obstacleX - Math.floor(score/1000)-1; // move obstacle 10 pixels leftmost
    dinosaurY = dinosaurY - dinosaurVelocity;
    if (obstacleX <= 0) {
      obstacleX = game.width;
    }
    // if (dinosaurY < 100) {
    //   dinosaurVelocity = -10;
    // } else if (dinosaurY > 200) {
    //   dinosaurY = 200;
    //   dinosaurVelocity = 0;
    // }
    if (dinosaurY < 200) {
      dinosaurVelocity -= 0.45 + Math.floor(score/1000)*0.05;
    } else if (dinosaurY > 200) {
      dinosaurY = 200;
      dinosaurVelocity = 0;
    }
    game.clear();
    game.drawObstacle(obstacleX, 200);
    game.drawDinosaur(100, dinosaurY);
    score++;
    if (score > highScore) {
      highScore = score;
    }
    game.drawScore(score);
    game.drawHighScore(highScore);
    if (obstacleX < 125 && obstacleX > 60 &&
        dinosaurY > 180) {
      game.drawMessage('You lose :( Press up to restart.');
      alive = false;
      window.cancelAnimationFrame(interval);
      //clearInterval(interval);
    }
  }

  eventLoop();
  game.onUpArrow(function() {
    if (alive !== false) {
      dinosaurVelocity = 10;
    } else {
      game.saveHighScore(highScore);
      obstacleX = 450;
      dinosaurY = 200;
      score = 0;
      alive = true;
      //interval = setInterval(eventLoop, 100);
      eventLoop();
    }
  })
});
