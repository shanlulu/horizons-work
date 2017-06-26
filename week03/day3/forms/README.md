# Pair Programming Exercise: Forms

This exercise might look super familiar... well, that's because it's the exact same exercise from yesterday, except for one key feature: a **database**. 
We're going to use [**mongodb**](https://www.mongodb.com), a **NoSQL** database, to store the user profiles that we create, and we're going to display any random profile.

**MongoDB** is **NoSQL** database - that means you won't have to learn some special *query language* to access data you've stored in your database. **Mongo** calls individual pieces of data (think a single `post` or `user` or `card` or `list`) **documents**, and a whole bunch of **documents** are stored in a **collection**.

## Goal

The goal of this segment is for you to familiarize yourself with creating a user model and employing it to `save` and `retrieve` individual users.

## Instructions

1. Start **mongodb**:

  ```bash
  $ mongod
  MongoDB shell version: 3.2.1
  connecting to: test
  ...
  ```

1. Write your `User` model

  Navigate to `models/user.js`. In this file, you are going to write the Schema 
  specification for the user model - this is where you're going to define the 
  **type** that each property should be, as well as a few other requirements.

1. Swap your data model out

  In your `app.js`, you need to edit the `/register` and `/profile/:id` routes. 
  Your `/profile/:id` route should take the `id` paramater from the url and 
  render a profile page with that user's data. When a user has successfully 
  input all fields, you should create a new user object, save it to the 
  database, and redirect to that user's profile page.
  
