"use strict";

var _ = require('underscore');
var Card = require('./card');
var Player = require('./player');
var Game = require('./game');

describe("The Card Object", function() {
  describe(".constructor", function() {
    it("should set the value property upon object creation", function() {
      var c = new Card('spades', 1);
      expect(c.value).toBe(1);
    });

    it("should set the suit property upon object creation", function() {
      var c = new Card('spades', 1);
      expect(c.suit).toEqual('spades');
    });
  });

  describe(".toString", function() {
    it("should return Ace of Spades for card with value 1 and suit spades", function() {
      var c = new Card('spades', 1);
      expect(c.toString()).toBe('Ace of Spades');
    });

    it("should return Jack of Hearts for card with value 11 and suit hearts", function() {
      var c = new Card('hearts', 11);
      expect(c.toString()).toBe('Jack of Hearts');
    });

    it("should return Queen of Spades for card with value 12 and suit clubs", function() {
      var c = new Card('clubs', 12);
      expect(c.toString()).toBe('Queen of Clubs');
    });

    it("should return King of Diamonds for card with value 13 and suit diamonds", function() {
      var c = new Card('diamonds', 13);
      expect(c.toString()).toBe('King of Diamonds');
    });
  });
});

describe("The Player Object", function() {
  describe(".constructor", function() {
    it("should set the username property upon object creation", function() {
      var p = new Player('Jay');
      expect(p.username).toEqual('Jay');
    });

    it("should have a random ID for every player", function() {
      var p1 = new Player("Jay");
      var p2 = new Player("Moose");
      expect(p1.id).not.toEqual(p2.id);
    });

    it("should have an empty pile upon creation", function() {
      var p = new Player('Jay');
      expect(p.pile).toEqual(jasmine.any(Array));
      expect(p.pile.length).toBe(0);
    });
  });
});

describe("The Game Object", function() {
  describe(".addPlayer", function() {
    var g;
    beforeEach(function() {
      g = new Game();
    });

    it("should create a new player object, add it to the player order, and return the id of the newly created player", function() {
      expect(g.playerOrder.length).toBe(0);
      expect(g.addPlayer('Ethan')).toEqual(jasmine.any(String));
      expect(g.playerOrder.length).toBe(1);
    });

    it("should create multiple player objects, add it to the player order, and return the id of the newly created player each time", function() {
      expect(g.playerOrder.length).toBe(0);
      expect(g.addPlayer('Ethan')).toEqual(jasmine.any(String));
      expect(g.playerOrder.length).toBe(1);
      expect(g.addPlayer('Moose')).toEqual(jasmine.any(String));
      expect(g.playerOrder.length).toBe(2);
      expect(g.addPlayer('Darwish')).toEqual(jasmine.any(String));
      expect(g.playerOrder.length).toBe(3);
    });

    it("should throw an error trying to add a player when the game has started", function() {
      g.addPlayer('Ethan');
      g.isStarted = true;
      expect(function(){g.addPlayer('Ethan');}).toThrow();
    });

    it("should throw an error when trying to add an empty username", function() {
      expect(function(){g.addPlayer();}).toThrow();
      expect(function(){g.addPlayer('');}).toThrow();
    });

    it("should throw an error when trying to add a username of someone already playing", function() {
      g.addPlayer('Ethan');
      expect(function(){g.addPlayer('Ethan');}).toThrow();
    });
  });

  describe(".startGame", function() {
    var g;
    beforeEach(function() {
      g = new Game();
    });

    it("should throw an error if game has already started", function() {
      expect(g.playerOrder.length).toBe(0);
      g.addPlayer('Ethan');
      g.addPlayer('Josh');
      g.startGame();
      expect(function(){g.startGame();}).toThrow();
    });

    it("should throw an error if there are less than two people playing", function() {
      expect(g.playerOrder.length).toBe(0);
      g.addPlayer('Ethan');
      expect(function(){g.startGame();}).toThrow();
    });

    it("should start the game only if more than two people have been added", function() {
      expect(g.playerOrder.length).toBe(0);
      g.addPlayer('Ethan');
      g.addPlayer('Josh');
      g.startGame();
      expect(g.isStarted).toBe(true);
    });

    it("should have a total of 52 cards when everything is added up for 2 players", function() {
      expect(g.playerOrder.length).toBe(0);
      g.addPlayer('Jay');
      g.addPlayer('Moose');
      g.startGame();
      var count = 0;
      for (const player of _.values(g.players)) {
        count += player.pile.length;
      }
      expect(count).toBe(52);
    });

    it("should have a total of 52 cards when everything is added up for 3 players", function() {
      expect(g.playerOrder.length).toBe(0);
      g.addPlayer('Jay');
      g.addPlayer('Moose');
      g.addPlayer('Ricky');
      g.startGame();
      var count = 0;
      for (const player of _.values(g.players)) {
        count += player.pile.length;
      }
      expect(count).toBe(52);
    });

    it("should have a total of 52 cards when everything is added up for 4 players", function() {
      expect(g.playerOrder.length).toBe(0);
      g.addPlayer('Jay');
      g.addPlayer('Moose');
      g.addPlayer('Ricky');
      g.addPlayer('Abhi');
      g.startGame();
      var count = 0;
      for (const player of _.values(g.players)) {
        count += player.pile.length;
      }
      expect(count).toBe(52);
    });
  });

  describe(".nextPlayer", function() {
    var g;
    beforeEach(function() {
      g = new Game();
    });

    it("should throw an error if game has not yet started", function() {
      expect(function(){g.nextPlayer();}).toThrow();
    });

    it("should move the current player to the end of the array for 2 players", function() {
      var id1 = g.addPlayer('Ethan');
      var id2 = g.addPlayer('Josh');
      g.startGame();
      expect(g.playerOrder[0]).toEqual(id1);
      expect(g.playerOrder[1]).toEqual(id2);
      g.nextPlayer();
      expect(g.playerOrder[0]).toEqual(id2);
      expect(g.playerOrder[1]).toEqual(id1);
      g.nextPlayer();
      expect(g.playerOrder[0]).toEqual(id1);
      expect(g.playerOrder[1]).toEqual(id2);
    });

    it("should move the current player to the end of the array for 3 players", function() {
      var id1 = g.addPlayer('Ethan');
      var id2 = g.addPlayer('Josh');
      var id3 = g.addPlayer('Moose');
      g.startGame();
      expect(g.playerOrder[0]).toEqual(id1);
      expect(g.playerOrder[1]).toEqual(id2);
      expect(g.playerOrder[2]).toEqual(id3);
      g.nextPlayer();
      expect(g.playerOrder[0]).toEqual(id2);
      expect(g.playerOrder[1]).toEqual(id3);
      expect(g.playerOrder[2]).toEqual(id1);
      g.nextPlayer();
      expect(g.playerOrder[0]).toEqual(id3);
      expect(g.playerOrder[1]).toEqual(id1);
      expect(g.playerOrder[2]).toEqual(id2);
      g.nextPlayer();
      expect(g.playerOrder[0]).toEqual(id1);
      expect(g.playerOrder[1]).toEqual(id2);
      expect(g.playerOrder[2]).toEqual(id3);
    });
  });

  describe(".isWinning", function() {
    var g;
    beforeEach(function() {
      g = new Game();
    });

    it("should throw an error if game has not yet started", function() {
      expect(function(){g.isWinning('');}).toThrow();
    });

    it("should return a boolean", function() {
      var id = g.addPlayer('Ethan');
      g.addPlayer('Josh');
      g.startGame();
      expect(g.isWinning(id)).toEqual(jasmine.any(Boolean));
    });

    it("should return true and set the isStarted to false if a player has 52 cards", function() {
      var id = g.addPlayer('Ethan');
      var id2 = g.addPlayer('Josh');
      g.startGame();
      g.players[g.playerOrder[1]].pile.push(...g.players[id].pile);
      g.players[id].pile = [];
      expect(g.isWinning(id)).toEqual(false);
      expect(g.isWinning(id2)).toEqual(true);
      expect(g.isStarted).toEqual(false);
    });

    it("should return false if a player does not have 52 cards", function() {
      var id = g.addPlayer('Ethan');
      g.addPlayer('Josh');
      g.startGame();
      expect(g.isWinning(id)).toEqual(false);
    });
  });

  describe(".playCard", function() {
    var g;
    beforeEach(function() {
      g = new Game();
    });

    it("should throw an error if game has not yet started", function() {
      expect(function(){g.playCard('');}).toThrow();
    });

    it("should throw an error if it's not that user's turn", function() {
      var id = g.addPlayer('Ethan');
      var id2 = g.addPlayer('Josh');
      g.addPlayer('Moose');
      g.addPlayer('Lane');
      g.startGame();
      g.nextPlayer();
      expect(function(){g.playCard(id);}).toThrow();
    });

    it("should throw an error if the current player has no cards", function() {
      var id = g.addPlayer('Ethan');
      var id2 = g.addPlayer('Josh');
      g.addPlayer('Moose');
      g.addPlayer('Lane');
      g.startGame();
      g.nextPlayer();
      g.players[id2].pile = [];
      expect(function(){g.playCard(id2);}).toThrow();
    });

    it("should cycle to the next user after someone has been played a card", function() {
      var id = g.addPlayer('Ethan');
      var id2 = g.addPlayer('Josh');
      g.startGame();
      expect(g.playerOrder[0]).toBe(id);
      g.playCard(id);
      expect(g.playerOrder[0]).not.toBe(id);
      expect(g.playerOrder[0]).toBe(id2);
    });
  });

  describe(".slap", function() {
    var g;
    beforeEach(function() {
      g = new Game();
    });

    it("should throw an error if game has not yet started", function() {
      expect(function(){g.slap('');}).toThrow();
    });

    it("should return an Object", function() {
      var e = g.addPlayer('Ethan');
      var j = g.addPlayer('Josh');
      g.startGame();
      g.playCard(e);
      g.playCard(j);
      g.playCard(e);
      g.playCard(j);
      g.playCard(e);
      g.playCard(j);
      expect(g.slap(j)).toEqual(jasmine.any(Object));
    });

    it("should set game pile to an empty array if top of pile is Jack", function() {
      var e = g.addPlayer('Ethan');
      var j = g.addPlayer('Josh');

      g.startGame();
      var ePile = ['hearts', 'spades'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      var jPile = ['clubs', 'diamonds'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      g.players[e].pile = ePile; // override
      g.players[j].pile = jPile; // override

      g.playCard(e); // King of Spades
      g.playCard(j); // King of Diamonds
      g.playCard(e); // Queen of Spades
      g.playCard(j); // Queen of Diamonds
      g.playCard(e); // Jack of Spades
      g.slap(e);
      expect(g.pile.length).toBe(0);
    });

    it("should add game pile to the bottom of the player's pile if top of pile is Jack", function() {
      var e = g.addPlayer('Ethan');
      var j = g.addPlayer('Josh');

      g.startGame();
      var ePile = ['hearts', 'spades'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      var jPile = ['clubs', 'diamonds'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      g.players[e].pile = ePile; // override
      g.players[j].pile = jPile; // override

      g.playCard(e); // King of Spades
      g.playCard(j); // King of Diamonds
      g.playCard(e); // Queen of Spades
      g.playCard(j); // Queen of Diamonds
      g.playCard(e); // Jack of Spades
      expect(_.last(g.players[e].pile).value).toEqual(10); // 10 of Spades
      var obj = g.slap(e);
      expect(obj).toEqual(jasmine.objectContaining({ winning: false }));
      expect(obj).toEqual(jasmine.objectContaining({ message: 'got the pile!' }));
      expect(g.players[e].pile[0].value).not.toEqual(1);
      expect(g.players[e].pile[1].value).not.toEqual(2);
      expect(g.players[e].pile[2].value).not.toEqual(3);
      expect(g.players[e].pile[3].value).not.toEqual(4);
      expect(g.players[e].pile[4].value).not.toEqual(5);
      expect(_.last(g.players[e].pile).value).toEqual(10); // 10 of Spades
      expect(g.pile.length).toBe(0);
    });

    it("should slap successfully if the top two cards of the pile are of the same value", function() {
      var e = g.addPlayer('Ethan');
      var j = g.addPlayer('Josh');

      g.startGame();
      var ePile = ['hearts', 'spades'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      var jPile = ['clubs', 'diamonds'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      g.players[e].pile = ePile; // override
      g.players[j].pile = jPile; // override

      g.playCard(e); // King of Spades
      g.playCard(j); // King of Diamonds
      g.playCard(e); // Queen of Spades
      g.playCard(j); // Queen of Diamonds
      expect(_.last(g.players[e].pile).value).toEqual(11); // Jack of Spades
      var obj = g.slap(e);
      expect(obj).toEqual(jasmine.objectContaining({ winning: false }));
      expect(obj).toEqual(jasmine.objectContaining({ message: 'got the pile!' }));
      expect(g.players[e].pile[0].value).not.toEqual(1);
      expect(g.players[e].pile[1].value).not.toEqual(2);
      expect(g.players[e].pile[2].value).not.toEqual(3);
      expect(g.players[e].pile[3].value).not.toEqual(4);
      expect(_.last(g.players[e].pile).value).toEqual(11); // 10 of Spades
      expect(g.pile.length).toBe(0);
    });

    it("should slap successfully if the top card and third-to-top card are of the same value (sandwich)", function() {
      var e = g.addPlayer('Ethan');
      var j = g.addPlayer('Josh');

      g.startGame();
      var ePile = ['hearts', 'spades'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      var jPile = ['clubs', 'diamonds'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      // swap king and queen
      var temp = jPile[jPile.length - 1]; // king
      jPile[jPile.length - 1] = ePile[ePile.length - 2];
      ePile[jPile.length - 2] = temp;
      g.players[e].pile = ePile; // override
      g.players[j].pile = jPile; // override

      g.playCard(e); // King of Spades
      g.playCard(j); // Queen of Spades
      g.playCard(e); // King of Diamonds
      g.playCard(j); // Queen of Diamonds
      expect(_.last(g.players[e].pile).value).toEqual(11); // Jack of Spades
      var obj = g.slap(e);
      expect(obj).toEqual(jasmine.objectContaining({ winning: false }));
      expect(obj).toEqual(jasmine.objectContaining({ message: 'got the pile!' }));
      expect(g.players[e].pile[0].value).not.toEqual(1);
      expect(g.players[e].pile[1].value).not.toEqual(2);
      expect(g.players[e].pile[2].value).not.toEqual(3);
      expect(g.players[e].pile[3].value).not.toEqual(4);
      expect(_.last(g.players[e].pile).value).toEqual(11); // 10 of Spades
      expect(g.pile.length).toBe(0);
    });

    it("take the top 3 cards from the pile of the Player corresponding to the passed-in Player ID and add it to the bottom of the game pile", function() {
      var e = g.addPlayer('Ethan');
      var j = g.addPlayer('Josh');

      g.startGame();
      var ePile = ['hearts', 'spades'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      var jPile = ['clubs', 'diamonds'].reduce((cache, val) => {
        return [...cache, ...[...Array(13).keys()].map(i => new Card(val, i + 1))]
      }, []);
      // swap king and queen
      var temp = jPile[jPile.length - 1]; // king
      jPile[jPile.length - 1] = ePile[ePile.length - 2];
      ePile[jPile.length - 2] = temp;
      g.players[e].pile = ePile; // override
      g.players[j].pile = jPile; // override

      g.playCard(e); // King of Spades
      g.playCard(j); // Queen of Spades
      expect(g.players[j].pile.length).toBe(25);
      var obj = g.slap(j);
      expect(obj).toEqual(jasmine.objectContaining({ winning: false }));
      expect(obj).toEqual(jasmine.objectContaining({ message: 'lost 3 cards!' }));
      expect(g.players[j].pile.length).toBe(22);
      expect(g.pile.length).toBe(5);
      expect(g.pile[4].value).toEqual(12);
      expect(g.pile[3].value).toEqual(13);
      g.playCard(e); // King of Diamonds
      expect(g.pile.length).toBe(6);
      expect(g.players[e].pile.length).toBe(24);
      var obj1 = g.slap(e);
      expect(obj1).toEqual(jasmine.objectContaining({ winning: false }));
      expect(obj1).toEqual(jasmine.objectContaining({ message: 'got the pile!' }));
      expect(g.players[e].pile.length).toBe(30);
      expect(g.pile.length).toBe(0);
    });
  });
});
