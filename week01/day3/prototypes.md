# Pair Programming Exercise: Prototypes

## Goal

The goal of this exercise is to get you started on prototypes. This exercise will contain 4 parts.

## Part 1: Intro

You can think of a prototype as a link from the current object to another object that may contain more information. In this case we are going to build software for an computer store. To begin, we'll have a default basic macBook that most people will buy.

```javascript
var macBook = {
  ram: "8gb",
  processor: "i3",
  color: "Light Gray"
}

console.log(macBook) // -> { ram: '8gb', processor: 'i3', color: 'Light Gray' }
```

Awesome! Now we are going to need a macBookPro model that has a better processor and comes in "Space gray". Instead of duplicating all the properties, we only list the new ones:

```javascript
var macBookPro = {
  processor: "i5",
  color: "Space gray"
}
```

Right now, the macBookPro object will only have 2 properties: `processor` and `color`.

```javascript
console.log(macBookPro) // -> { processor: 'i5', color: 'Space gray' }
console.log(macBookPro.ram); // -> undefined.
```

Then, we are going to set up a link to search for the ones that are already on the standard macBook. We add the link from macBook to macBookPro by setting  `__proto__`.

```javascript
macBookPro.__proto__ = macBook;
```

Logging macBookPro will give us the same results as the object and it's own properties haven't been changed:
```javascript
console.log(macBookPro) // -> { processor: 'i5', color: 'Space gray' }
```

But now accessing `macBookPro.ram` finds the value for `ram`. And looking for
color (that is in both objects), will return the correct color for the macBookPro.

```javascript
console.log(macBookPro.ram);
console.log(macBookPro.color);
```

You can even make a chain of objects! In this case, it will be `touchBarMacbook` -> `BarMacbookPro` -> `touchBar`

```javascript
var touchBarMacbook = {
  extras: "touchBar"
};

touchBarMacbook.__proto__ = macBookPro;
console.log(macBookPro.ram);
console.log(touchBarMacbook.extras);
```



## Part 2: How does property lookup work?

Looking for a property in JS takes a couple of steps:

1. It will check for "own" properties of an object. These are the properties that are declared within an object. If you console.log() an object. The properties that appear are the own ones.

   If we have the following object:

   ```javasc
    console.log(touchBarMacbook); // { extras: 'touchBar' }
   ```

   Looking for the extras property in touchBarMacbook, will find it in the object and return it.

   ```javas
    console.log(touchBarMacbook.extras) // 'touchbar'
   ```

   But what happens if it doesn't find the property on the object?


2. It will follow the ```__proto__``` link to the next object and find it there. `color` is not an "own" property of `touchBarMacbook`, but it is an "own" property of `macBookPro`!

   ```javas
   console.log(touchBarMacbook.color); // -> "Space gray"
   ```

   What happens if it still doesn't find it on macBookPro like in the case of `console.log(touchBarMacbook.ram)`?

3. It will continue looking through the object's prototypes (that make up a chain) until it finds them.
    For example:

   ```console.log(touchBarMacbook.ram);```
    Will look for 'ram' on touchBarMacbook. It won't find it as it is not an "own" property of touchBarMacbook. So, it will follow the ```__proto__``` one level up to -> `macBookPro` and look for 'ram' on `macBookPro`. It won't find it as it is not an "own" property of `macBookPro`. It will follow the ```__proto__``` one level up to -> `macBook` and look for 'ram' on `macBook`. It will find it as an "own" property of `macBook` and return it.

   ```javas
    -> "8gb" success!
   ```




## Part 3: Iterating

### Instructions

1. Open `week01/day3/prototypes.js` in your text editor. Exercise details are listed there.

2. Open `week01/day3/prototypes.html` in your browser to run tests.

3. Write necessary functions to make all the tests pass.


## Part 4: Adding methods to collections

### Instructions

1. Open `week01/day3/prototypes_2.js` in your text editor. Exercise details are listed there.

2. Open `week01/day3/prototypes_2.html` in your browser to run tests.

3. Write necessary functions to make all the tests pass.
   ​
