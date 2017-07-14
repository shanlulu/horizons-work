var _ = require('underscore');
var persist = require('./persist');
var Card = require('./card');
var Player = require('./player');
var readGame = false;
var CARDSNUM = 52;

class Game {
  constructor() {
    // YOUR CODE HERE
    this.isStarted = false;
    this.players = {};
    this.playerOrder = [];
    this.pile = [];
  }

  addPlayer(username) {
    // YOUR CODE HERE
    if (this.isStarted) throw new Error("Game already in process!");
    if (username.trim() === '') throw new Error("Invalid username!");
    for (var prop in this.players) {
      if (this.players[prop].username === username) throw new Error("You need an unique username ;)");
    }
    var newPlayer = new Player(username);
    this.playerOrder.push(newPlayer.id);
    this.players[newPlayer.id] = newPlayer;
    return newPlayer.id;
  }

  startGame() {
    // YOUR CODE HERE
    if (this.isStarted) throw new Error("Game already in process!");
    if (Object.keys(this.players).length < 2) throw new Error("No enough players.");
    this.isStarted = true;
    var allCards = [];
    var suits = ["hearts", "spades", "clubs", "diamonds"];
    for (var i = 1; i < 14; i++) {
      for (var j = 0; j < suits.length; j++) {
        allCards.push(new Card(suits[j], i));
      }
    }
    var shuffled = _.shuffle(allCards);
    var playerNum = Object.keys(this.players).length;
    for (var i = 0; i < shuffled.length; i++) {
      var id = this.playerOrder[i%playerNum];
      this.players[id].pile.push(shuffled[i]);
    }
  }

  nextPlayer() {
    // YOUR CODE HERE
    if (!this.isStarted) throw new Error("Game already in process!");
    do {
      this.playerOrder.push(this.playerOrder.shift());
    } while (this.players[this.playerOrder[0]].pile.length === 0);
  }

  isWinning(playerId) {
    // YOUR CODE HERE
    if (!this.isStarted) throw new Error("Game already in process!");
    if (this.players[playerId].pile.length === CARDSNUM) {
      this.isStarted = false;
      return true;
    }
    return false;
  }

  playCard(playerId) {
    // YOUR CODE HERE
    if (!this.isStarted) throw new Error("Game already in process!");
    if (playerId !== this.playerOrder[0]) throw new Error("Not your turn yet!");
    if (this.players[playerId].pile.length === 0) throw new Error("Have no cards left - you've already lost :(");
    var theCard = this.players[playerId].pile.pop();
    this.pile.push(theCard);
    var losersNum = 0;
    for (var id in this.players) {
      if (this.players[id].pile.length === 0) losersNum++;
    }
    if (losersNum === Object.keys(this.players).length) {
      this.isStarted = false;
      throw new Error('It is a tie!');
    }
    this.nextPlayer();
    var newCard = {
      card: theCard,
      cardString: theCard.toString()
    }
    return newCard;
  }

  slap(playerId) {
    // YOUR CODE HERE
    if (!this.isStarted) throw new Error("Game already in process!");
    var pile = this.pile;
    if ((pile.length > 0 && pile[pile.length-1].value === 11) ||
        (pile.length > 1 && pile[pile.length-1].value === pile[pile.length-2].value) ||
        (pile.length > 2 && pile[pile.length-1].value === pile[pile.length-3].value)) {
      this.players[playerId].pile = [...this.pile, ...this.players[playerId].pile];
      this.pile = [];
      var winRes = {
        winning: this.isWinning(playerId),
        message: 'got the pile!'
      };
      return winRes;
    } else {
      var lostCards = this.players[playerId].pile.splice(this.players[playerId].pile.length - Math.min(3, this.players[playerId].pile.length));
      this.pile = [...lostCards, ...this.pile];
      var loseRes = {
        winning: false,
        message: 'lost 3 cards!'
      };
      return loseRes;
    }
  }

  // PERSISTENCE FUNCTIONS
  //
  // Start here after completing Step 2!
  // We have written a persist() function for you to save your game state to
  // a store.json file.
  // =====================
  fromObject(object) {
    this.isStarted = object.isStarted;

    this.players = _.mapObject(object.players, player => {
      var p = new Player();
      p.fromObject(player);
      return p;
    });

    this.playerOrder = object.playerOrder;

    this.pile = object.pile.map(card => {
      var c = new Card();
      c.fromObject(card);
      return c;
    });
  }

  toObject() {
    return {
      isStarted: this.isStarted,
      players: _.mapObject(this.players, val => val.toObject()),
      playerOrder: this.playerOrder,
      pile: this.pile.map(card => card.toObject())
    };
  }

  fromJSON(jsonString) {
    this.fromObject(JSON.parse(jsonString));
  }

  toJSON() {
    return JSON.stringify(this.toObject());
  }

  persist() {
    if (readGame && persist.hasExisting()) {
      this.fromJSON(persist.read());
      readGame = true;
    } else {
      persist.write(this.toJSON());
    }
  }
}

module.exports = Game;
