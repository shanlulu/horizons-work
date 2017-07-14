




## Part 2 Challenge: Full-Text Search 🏆

### Case Folding Restaurant Names

### Text Indexes on Names and Categories

1. New query: Case-folded name field for search. (write name to lower case field).
- Add a search form with a name field to your restaurants page.
-	Users can write queries in many different forms. For example "Cat" or "cát" would yield different results. To fix this,
we have to case-fold texts, meaning making them as plain as possible, and as standard as possibe. Take a look at this link and try case-folding yourself! http://www.alistapart.com/articles/accent-folding-for-auto-complete/
1. Single field index (on folded name) that starts with name.
- Create a new field on users that contains the folded name that you are looking for.
- Create an index for that field, allowing you you query faster through folded names.
1. Write a prefix query on the thing that you are searching
- Create a query that finds users that start with the prefix, using the new index.
1. Composite indexes
- MongoDB supports compound indexes, where a single index references many fields in a document:
`db.collection.createIndex( { <field1>: <type>, <field2>: <type2>, ... } )` The value of the field in the index specification describes the kind of index for that field. For example, a value of 1 specifies an index that orders items in ascending order. A value of -1 specifies an index that orders items in descending order.
- An example of creating a compound index is `{ userid: 1, score: -1 }` it holds two fields in one index.
- The user is sort out ascending by userId, and descending by score.

- Lets say you have our restaurants:
```
{
	"_id": ObjectId(...),
	"name": "McDonalds",
	"location": "4th Street Store",
	"stars": 4
}
```
- To create an ascending index on item and stock you would:
` db.products.createIndex( { "name": 1, "stars": 1 } ) `
- The index supports queries on the item field as well as both item and stock fields:
`db.products.find( { item: "name", stars: { gt: 5 } } )`

* Show them explain plan as you go - make them take out index and re-insert index

### End Result, Step 4 🏅 - `http://localhost:3000`



##Bonus:
1. Use Yelp API or open street API to get JSON file of businesses



