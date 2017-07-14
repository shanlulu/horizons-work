
# Building Yelp Part 2!

Today, we will be using indexes to build on your work from yesterday to optimize performance and build out features for searching and filtering.

**Note:** Because this project will be continued from **Yelp Part 1**, we will be working in the same project files. There is no scaffolding for this Part!

## Table of Contents

* **Recap** 🔁
* **Step 1:** Paging Your Results 📋
* **Step 2:** Sorting Restaurants with Indexes 📊
* **Step 3:** Connecting Pagination and Indexing 🙉
* **Part 2 Challenge:** Full-Text Search 🏆 

## Recap 🔁

**What is indexing?**

Indexing is a way of sorting documents on multiple fields. Creating an index on a field in database creates another field that holds the index value, and pointer to the record it relates to. This index structure is then sorted, allowing for faster searches, queries.
This uses the same principle as the hash table indices that pointed to an object.

**Why is it needed?**

Data is stored as blocks on disks. These blocks are read in their entirety. These blocks work like a linked list, where each block contains sections for data and a pointer to the next part in data. So, for example, block1 is at the end of the disk, and it points to block2 at the beginning of it.

So, to find something in a field, we require an average of N/2 block accesses to find the information, where N is the number of blocks. Thus the performance increase is substantial if we would have only one place to find information in. The indexes work like a book index. The system finds the index, that is **previously sorted** and then it points to the correct location on disk. 

In this case, finding a restaurant would be as simple as finding the restaurant in the index table, reading where it points to, and reading data from its location.

1. Unique Index on username.

* Hint: If you have users on your database that are duplicated, please delete them
before adding a unique index. Otherwise it will generate an error.

In Mongoose, we can create new indexes like the following:

```javascript
var Restaurant = new Schema({
    name: {
    	type: String, 
    	unique: true
    }
})

// or

var Restaurant = new Schema({
    name: {
    	type: String, 
    	index: {
    		unique: true 
    	}
    }
})
```

Check out [**Mongoose documentation**](http://mongoosejs.com/docs/guide.html) (scroll down to _Indexes_) to see more about usage of indexes with Mongoose.


##Step 1: Paging Your Results 📋
The first thing we'll do is page your Restaurant results to allow for displaying large quantites of Restaurants to be more manageable. This time, we'll start with our routes, since understanding how paging will work will begin with the URL.

### Rerouting Routes 📤 - `routes/index.js`
Previously, you rendered the `restaurants.hbs` template with a single `GET` request to query for all of your Restaurant documents and pass them in. With paging, you will be rendering the same view, but changing the documents you pass in. You can accomplish this by making use of the query string! 

For example, given a database with 25 restaurants:

* `http://localhost:3000/restaurants/list/1` should render the first 10 `(0-9)`.
* `http://localhost:3000/restaurants/list/2` should render the next 10 `(10-19)`.
* `http://localhost:3000/restaurants/list/3` should render the remaining 5 `(20-24)`.

> ⚠️ **Warning**: Be careful about the names of your routes! If you already have routes set up for `GET /restaurants/:id`, you should access your list view by a separate URL - in this example we have it at `/restaurants/list/:x`.

Begin by setting up your routes to take in this new parameter (which is just a number) and for now, simply render your `restaurants` view the way you've always been doing and log your new parameter to keep it in the back of your mind. We'll use it soon!

**Note:** _**Keep your previous `GET /restaurants` route intact!**_ We will be using this in **Step 2:** _Sorting Restaurants with Indexes_ 📊. 

### Modifying Models 💽 - `models/models.js (RestaurantSchema)`
We want to change the way we query for Restaurants to only give us back the set of 10 that we need. To do this, we'll create a **static** on our `Restaurant` model.

> **Tip:** The key difference between a **static** and a **method** in Mongoose is what they _are called on_. Instance _methods_ are called on a per-document basis; `this` for methods refers to one document. _Statics_ on the other hand are called on a per-model basis; `this` for statics refers to an entire model.

The reason that we want to use a _static_ here is because we essentially want to create a model `find` method that doesn't exist - something along the lines of `findTheNextTen` (which is not a thing in Mongoose, sorry!).

The way we define a static in Mongoose is identical to how we define a method, with the slight change:

```javascript
RestaurantSchema.statics.yourStaticNameHere = function(anyParams) {
	/* your static definition here */
}
```

You want to define a static that takes in any integer `n` (received from your route parameters, it could be 1, 2, 99, etc.) and finds the next multiple of 10 restaurants to query for in your database.

Your static should also take a callback `cb` to call with an array of no more than 10 Restaurants after the query executes successfully. Your static will be called from routes like the following:

```javascript
app.get("/restaurants/list/:x", function(req, res) {
	// Below, the static is called getTen, but the name is up to you!
	Restaurant.getTen(req.params.x, function(restaurants) {
		res.render(...);
	});
});
```

**Hint:** To retrieve the next multiple of 10 restaurants, you will be using [`.skip()`](http://mongoosejs.com/docs/api.html#query_Query-skip) (which "skips" a certain number of documents in the database as a part of the query) and [`.limit()`](http://mongoosejs.com/docs/api.html#query_Query-limit) (which sets a cap on the number of documents returned)! Chain these together and retrieve the result using `.exec()` to write this static. 

#### Seeding your Database 🌱 - `seed.js`

Before we continue, we are going to seed our database with 60 restaurants pulled from Yelp! Checkout `seed.js` in this folder and move `seed.js` to the root directory of your project.

Open up `seed.js`, you will see what is going on! Modify the appropriate lines from 13-22 to reflect the restaurant fields in your database. To run `seed.js` just type `node seed.js` in your terminal. The program will hang after printing "saved restaurant 60 times". Just hit `Ctrl-C` to exit out of the node session. Check mLab, and behold- 60 new restaurants for your database!


### A Return to Routes 📥 - `routes/index.js`
To implement your model static functions in your routes, simply call it on the model (which in your case is probably called `Restaurant` or `models.Restaurant`) and pass in the callback function to handle the results of the query. 

Make sure to render your `restaurants` template with the correct data _within_ this callback function! Before moving on to **Reviewing Views** 🚢, verify that you are able to access different reuslts in your database by paging as mentioned before:

For a database of 25 restaurants:

* `http://localhost:3000/restaurants/list/1` should render the first 10 `(0-9)`.
* `http://localhost:3000/restaurants/list/2` should render the next 10 `(10-19)`.
* `http://localhost:3000/restaurants/list/3` should render the remaining 5 `(20-24)`.

**Note:** You may find that you need to add more restaurants to your database before you are able to make this functional. Check your mLab to verify that there are more than 10 restaurants that you can page through!

### Reviewing Views 🚢 - `views/restaurants.hbs`
Now that you are able to access any 10 restaurants using a part of the URL parameters to change where you are, it's time to update your view to reflect these changes!

You want a component that looks something like the following at the bottom of your page:

<img src="http://cl.ly/0a1R0V0b2w26/Image%202016-06-28%20at%208.12.41%20AM.png" height="50">

Each page number should act as a link to your route `GET /restaurants/list/PAGE_NUMBER` (or whatever you may have called it). One resource you can use to create the styling for this pagination component is on Bootstrap's handy documentation: [http://getbootstrap.com/components/#pagination](http://getbootstrap.com/components/#pagination).

Keep in mind that you only want to render a certain number of these paging links that reflects `the number of restaurants in your database / 10`!

**Suggestion:** To render the correct number of pagination links for the number of restaurants in your database, try using an array (containing incrementing numbers, beginning at 1) of the length `number of restaurants in your database / 10`. Using this, you can use a Handlebars `{{#each}}` statement to iterate over the array and render the links you need: `/restaurants/list/1`, `/restaurants/list/2`, `/restaurants/list/3`, and so on.

### End Result, Step 1 🏅 - `http://localhost:3000`

After this step, you will be able to visit your Restaurant listings page and have the ability to click through pages of 10 restaurants at a time, using a component or list of links at the bottom with the correct number of pages to navigate through your entire collection of Restaurant documents.


##Step 2: Sorting Restaurants with Indexes 📊
Next, we'll be adding some more features to the restaurant listings template that will allow us to find what we are looking for with a more fine-grained search - say, by highest rating or by closest location. We will accomplish this by use of indexes for optimal performance!

### More Model Modifications 👋 - `models/models.js`
First off, some modifications to our `Restaurant` model. Remember our virtual `averageRating` (the one that calculated `totalScore / reviewsCount` for us on the fly)? 

The trouble with this virtual is that although it is available to us seemingly wherever we need, it is notably missing **_in the MongoDB database itself_**. This is because the `virtual` is a Mongoose-specific property that is a part of our models, being "virtually" available to us but not persisting to the actual MongoDB document. If we want to be able to index by `averageRating` (and thus allowing us to sort Restaurants by rating with much greater performance), we will have to change this from a virtual to an actual property.

Add a property `averageRating` (of type _Number_) that is recalculated (using the existing `totalScore` and `reviewsCount` properties) and saved to the model every time a new `Review` is posted. 

Your completed Restaurant Schema will look like the following:

 - `name` - The name of the Restaurant
 - `price` - A Number on a scale of 1-3
 - `category` - A String that describes the type of restaurant represented
 - `latitude` - A Number representing the geographic location of the restaurant
 - `longitude` - Another Number representing the geographic location of the restaurant
 - `openTime` - A Number from 0-23 representing the hour the restaurant opens
 - `closingTime` - A Number from 0-23 representing the hour the restaurant closes
 - `totalScore` - A Number that represents the total stars a Restaurant has from all Reviews associated with it
 - `reviewsCount` A Number that represents the total amount of Reviews a Restaurant has associated with it
 - `averageRating` - A Number that represents the average rating that a Restaurant has across all of its reviews, on a scale of 1-5
 
Alright! Now that we have a persistent property on our MongoDB documents that we are able to use for indexing, it's time to create those in our model!

### Adding Single Indexes to Your Models 🕵 - `models/models.js (RestaurantSchema)`
Adding indexes to your Mongoose model is [pretty easy](http://mongoosejs.com/docs/guide.html) - all you need to do is add an extra field to one of your properties that looks like the following:

```javascript
var restaurantSchema = new mongoose.Schema({
	...
	name: {
		type: String,
		index: true
	}
})

```

This will allow you to run a fast sort through any of your `find` queries, which looks something along the lines of:

```javascript
// Accepted values for "ascending" sort are 1, "asc", and "ascending"
// Accepted values for "descending" sort are -1, "desc", and "descending"

Restaurant.find({}).sort({'name': 1}).exec(function(err, restaurants) {...})

```

Add an index to the following properties that we will use for sorting later from your routes and views:

* The name of the restaurant
* The average rating of the restaurant (on the new property you defined earlier)

We'll revisit these indexes in the sections to come - for now, we will add these knowing that our Restaurants are now indexed by these properties for fast sorting later!

### Supporting Sorting in Your Views ↗️ - `views/restaurants.hbs`
Before we connect sorting parameters in your routes, we want to make sure that our `restaurants` template has the ability to ask our server for sorted data.

One way we can accomplish this is by use of a form with a `method="GET"`. This will put all search parameters in a query string that might look something like: `http://localhost:3000/restaurants/list/?name=ascending`.

For now, since we are only working with single indexes, wrap a `<select>` element for `<option>`s "Ascending" and "Descending" inside separate forms that submit to the same route using a `GET` request.

Give each one a separate Submit button as well, allowing you to submit these forms separately.

If you do this correctly, your form should look like the following:

<img src="http://cl.ly/1G2o153F3r44/Image%202016-06-28%20at%2011.50.14%20AM.png" height="65">
<img src="http://cl.ly/0N3S0V3c1i3e/Image%202016-06-28%20at%2011.52.12%20AM.png" height="75">

Each Submit button should also take you to a separate route, with four possible options:

* `http://localhost:3000/restaurants/list/?name=ascending`
* `http://localhost:3000/restaurants/list/?name=descending`
* `http://localhost:3000/restaurants/list/?rating=ascending`
	* (you know, in case you were looking for the _least popular_ restaurants in your area)
* `http://localhost:3000/restaurants/list/?rating=descending`


### Supporting Sorting in Your Routes 🆙 - `routes/index.js`

To support sorting in our routes, we will modify our existing `GET /restaurants/list` route to now handle possible sorting criteria first. 

> **Note:** It's okay to be only implementing your sorting logic for routes in _only_ `GET /restaurants/list` for now - we will be combining pagination and sorting in the next Step! In other words, you should be seeing a full list of unpaginated restaurants here!

Use the `req.query` object to check for potential sorting criteria submitted by your form and sort before you pass in your `Restaurant` documents to your template!

You'll need to chain your existing `Restaurant.find({}).limit()` call with `.sort()` and finish with `.exec(function(err, sortedRestaurants) {...})` to get your sorted Restaurants back. Make sure you are passing back the _sorted_ Restaurants into your template! 

**Remember that `.sort()` takes an object into its parameters** very similarly to `.index`, with keys of fields you want to sort by and values of "ascending" or "descending". For example:

```
// "ascending", "asc", or 1 will all do the same thing!
Restaurant.find({}).sort({name: "ascending"}).exec(function(err, sortedRestaurants) {...});
```
will return you `sortedRestaurants` in ascending order by `name`.

### Adding Composite Indexes to Your Models 🕵✌️ - `models/models.js (RestaurantSchema)`

Thanks to single indexes, we are now able to sort by either name or by rating individually in a quick and efficient way. The next step is to combine these criteria into more powerful queries - such as finding restaurants in ascending alphabetical order and descending average rating. To do this, we will be using **composite indexes** to create indexes by both name and average rating!

Creating **composite indexes** is as simple as:

```
restaurantSchema.index({"price": 1, "averageRating": 1})
```
You want to create composite indexes to handle all four of these situations a user could be asking for sorted Restaurants in:

* Restaurants sorted by ascending price (`price: 1`) and ascending average rating (`averageRating: 1`)
* Restaurants sorted by descending price (`price: -1`) and ascending average rating (`averageRating: 1`)
* Restaurants sorted by ascending price (`price: 1`) and descending average rating (`averageRating: -1`)
* Restaurants sorted by descending price (`price: -1`) and descending average rating (`averageRating: -1`)

Although we have four cases of sorting here, we only need to create two composite indexes with `price` and `averageRating` to cover all of them!

Think about this: creating a composite index with `{price: 1, averageRating: 1}` will allow for us to easily sort for both ascending `price` and `averageRating` going forward through the index **_but also descending `price` and `averageRating` going backwards!_** <sup>1</sup>

Create the following indexes on your `restaurantSchema` for both `price` and `averageRating`:

* `price` ascending, `averageRating` ascending
* `price` ascending, `averageRating` descending
 

<sub>[1] For a more cohesive explanation of how this works, see MongoDB documentation on Compound Indexes: [https://docs.mongodb.com/manual/core/index-compound/](https://docs.mongodb.com/manual/core/index-compound/) </sub>

### Composite Indexes in Your Views and Routes 💪 - `views/restaurants.hbs`, `routes/index.js`

With your indexes now ready for handling sorting by both `price` and `averageRating` criteria, it's time to update your views and routes to handle the ability to sort by both!

First, we need to update our view to take in a new input for selecting "Ascending" or "Descending" for "Price" in addition to "Name" and "Average Rating." Put the new `<select>` input for Price in the same `<form>` as the Rating `<select>` input - we will be _either_ sorting solely alphabetically _or_ by both Rating and Price). 

> **Note:** If you want to allow a user to sort by Price or Rating individually, you should add an empty `<option>` element and handle that in your form (i.e., if an input is empty String, do not sort by that criterion).

If all goes well, you'll have something that looks like this instead:

<img src="http://cl.ly/131o1q1k1K2C/Image%202016-06-28%20at%206.11.23%20PM.png" height="60">


You'll also need to make sure your **`index.js`** handles your form submit with both parameters together! Make sure that both `req.query` properties matching the `name` properties of your `<select>` elements are being passed into `.sort()`.

### End Result, Step 2 🏅 - `http://localhost:3000`

At the end of Step 2, you should be able to do the following through your Yelp application:

1. Sort just by name, alphabetically. Sort can be in increasing or decreasing order.
2. Sort just by average rating, given by average number of stars for all reviews.
3. Sort by both price and average rating, ascending or descending.

## Step 3: Pagination & Sorting Extended 🙉
At this point, you should have two kinds of routes for viewing Restaurant listings (note that _your_ actual route names may differ):

* `GET /restaurants/list` - Displays unpaginated results (same as `/restaurants/list/1`) with sorting filters enabled
* `GET /restaurants/list/:x` - Displays an unsorted list of 10 restaurants, offset by `req.params.x * 10` listings

We now want to put these together - giving the ability for users to go through pages of sorted restaurants, 10 at a time.


### Pagination + Sorting ⚔ - `routes/index.js`, `views/restaurants.hbs`

Since you've already implemented the interface elements for giving users the option to sort the restaurants alphabetically or by rating, you only need to modify your route for `/restaurants/list/:x` to handle the same sorting process you created for `/restaurants/list`.  

We previously used a static you implemented to grab the next 10 Restaurant documents from a collection, but to make things simpler, move that logic back into your route for `/restaurants/lists/:x`, directly calling `Restaurant.find({}).limit(10).skip((parseInt(req.params.x) - 1) * 10)` (_or whatever you used to offset your results_) inside of your `router.get("/restaurants/lists/:x", function(req, res) {...})`.

Now, add `.sort()` to your query the same way you did for `GET /restaurants/list`!

> **Note:** Make sure you are `.sort()`'ing _before_ you `.limit()` or `.skip()` so that your paginated links give you the _sorted_ results in order!

One other change you'll have to make to your pagination element on your `restaurants` template is to append the same query string of a user's initial submit of search criteria (i.e. `?name=ascending&rating=descending`) to the each of the links on this component:

<img src="http://cl.ly/0a1R0V0b2w26/Image%202016-06-28%20at%208.12.41%20AM.png" height="40">

Each link on this pagination component must carry this query string through to be paginating through the same results - but _only if there was a query string before_! Make sure you are considering this in your routes file (`index.js`).

**Suggestion:** Remember the array of numbers we suggested you pass into your Handlebars `restaurants` template from before to render the correct number of links with the correct `href`? You may find it simple enough to pass a potential query string in as well (to the context object, the second parameter of `res.render`) and appending that to the `href`'s of your paging links.

### Advanced Pagination 📘 - `views/restaurants.hbs`, `routes/index.js`
Up until this point, you've only allowed your user to browse through 10 Restaurant listings at a time. Now, you will allow your user to select how many listings they are able to see at a time.

> **Note:** For the following instructions, you will primarily be working on your `GET /restaurants/list/:x` route - this is where we handle pagination!

Begin by adding a new `<input>` (or `<select>`, if you want to define a preset number of choices for your user to select from) to the same `<form>` in your **`restaurants.hbs`** template that allows the user to determine how many listings to see per page. 

Next, change your route to grab the `req.query.[name attribute of your <input> element]` and use _its number_ instead of 10 for your limiting and skipping logic. **Don't forget to keep this passed as your query string when navigating through other pages** - similarly to how we preserved the sorting criteria from the query string of sorting for each page of `GET /restaurants/list/:x`, we want to keep this as a part of our URL when we navigate to other pages.

If you implement this correctly, setting the "Number of Restaurants per Page" to 50 should allow a user to click through each link in your pagination element and get 50 results back, sorted and offset properly.

### End Result, Step 3 🏅 - `http://localhost:3000`

By the end of Step 3, you will have a Restaurant listings view that allows you to sort by multiple criteria in an indexed database, navigate through pages of `x` number of listings, and allow the user to specify the number of listings they wish to see per page.

If this End Result describes your finished product: congrats! You've finished Yelp! 🎉

---
_coming soon_
### Part 2 Challenge: Full-Text Search 🏆 

