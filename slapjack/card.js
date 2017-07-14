class Card {
  constructor(suit, value) {
    // YOUR CODE HERE
    this.suit = suit;
    this.value = value;
  }

  toString() {
    // YOUR CODE HERE
    var valArr = ['Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King']
    return valArr[this.value-1] + ' of ' + this.suit[0].toUpperCase() + this.suit.slice(1);
  }

  // PERSISTENCE FUNCTIONS
  //
  // Start here after completing Step 2!
  // We have written a persist() function for you to save your game state to
  // a store.json file.
  // =====================
  fromObject(object) {
    this.value = object.value;
    this.suit = object.suit;
  }

  toObject() {
    return {
      value: this.value,
      suit: this.suit
    };
  }
}

module.exports = Card;
