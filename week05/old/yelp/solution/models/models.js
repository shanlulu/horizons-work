var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  displayName: String,
  username: { type: String, index: { unique: true } },
  password: String, //Hashed
  address: String, //descriptive location
  reviews: [] //review ids
  //TODO: Status (display user status if Elite)
  // TODO: Location (only text, descriptive location)

  //get reviews()
});

//Instance method
userSchema.statics.getFollowers = function (id, callback){
  // Find Following
  Follow.find({uid1: id}).populate('uid2').exec(function(err, following) {
    //Find Followers
    Follow.find({uid2: id}).populate('uid1').exec(function(err, followers) {
      console.log(id)
      console.log(followers)
      console.log(following)
      callback(err, followers, following);
    });
  });
}
userSchema.statics.follow = function (uid1, uid2, callback){
  Follow.find({uid1:uid1, uid2: uid2}, function(err, follows) {
    if (err) return next(err);
    //  console.log(restaurants)
    console.log("asd")
    console.log(follows)
    if (follows.length<=0){
      var follow = new Follow({
        uid1: uid1,
        uid2: uid2
      });
      follow.save(function(err) {
        callback(err)
      })
    }
    else {
      callback(null);
    }
  });
}

userSchema.statics.unfollow = function (uid1, uid2, callback){
    Follow.find({uid1:uid1, uid2: uid2}).remove(function(err) {
    callback(err)
  })
}

// TODO: user.Unfollow
// TODO: user.verifyPassword (virtual field)


var User = mongoose.model('User', userSchema);


var FollowsSchema = mongoose.Schema({
  uid1 : { type: mongoose.Schema.ObjectId, ref: 'User' },
  uid2 : { type: mongoose.Schema.ObjectId, ref: 'User' },
});
var Follow = mongoose.model('Follow', FollowsSchema)

var reviewSchema = mongoose.Schema({
  stars: Number, // 1 -> 5
  content: String,
  restaurant: { type: mongoose.Schema.ObjectId, ref: 'Restaurant' },
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});
var Review = mongoose.model('Review', reviewSchema);


var restaurantSchema = mongoose.Schema({
  name: String,
  price: Number, //scale of price 1->3
  reviews: [], //review ids
  // virstual stars, from reviews array
  latitude: Number,
  longitude: Number,
  stars: { type: Number, default: 5},
  numberOfReviews: { type: Number, default: 0},
  category: String, //enum
  openHoursEST: {
    openTime: Number,
    closingTime: Number
  }
  // getUsersReviewed
});
restaurantSchema.methods.getReviews = function (restaurantId, callback){
  Review.find( {restaurant: restaurantId }).populate('user').exec( function(err, reviews) {
    callback(err, reviews);
  });
}

restaurantSchema.methods.stars = function(callback){
  Review.find( {restaurant: this.id }).populate('user').exec( function(err, reviews) {
    var total = reviews.reduce(function (acc, obj) {
      return acc + obj.stars;
    }, 0);
    callback(err, (total/reviews.length));
  });
}

var Restaurant = mongoose.model('Restaurant', restaurantSchema);


module.exports = {
  User: User,
  Restaurant: Restaurant,
  Review: Review,
  Follow: Follow
};
