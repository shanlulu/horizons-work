var crypto = require("crypto");

class Player {
  constructor(username) {
    // YOUR CODE HERE
    this.username = username;
    this.id = this.generateId();
    this.pile = [];
  }

  generateId() {
    return crypto.randomBytes(10).toString('hex');
  }

  // PERSISTENCE FUNCTIONS
  //
  // Start here after completing Step 2!
  // We have written a persist() function for you to save your game state to
  // a store.json file.
  // =====================
  fromObject(object) {
    this.username = object.username;
    this.id = object.id;
    this.pile = object.pile.map(card => {
      var c = new Card();
      c.fromObject(card);
      return c;
    });
  }

  toObject() {
    return {
      username: this.username,
      id: this.id,
      pile: this.pile.map(card => card.toObject())
    };
  }
}

module.exports = Player;
