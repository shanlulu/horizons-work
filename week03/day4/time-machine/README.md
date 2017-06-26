# Week 3 Day 4: Inline exercise: Time machine

## Instructions

In this exercise we're going to build a simple form that allows you to
add or subtract days, months or years from a given date

1. Open `app.js` and `views/index.hbs` in your editor.
1. Make the `<input type="date">` value change based on the `when` query parameter
1. Make the `<input type="number">` value change based on the `amount` query parameter
1. Make the `<select>` value change based on the `units` query parameter

  HTML select elements don't have a `value` attribute. You have to set the
  `selected` attribute on one of the `<option>`s. You may find Handlebars
  helper useful for this purpose.

1. When the `To the past` button is clicked make the `<input type="date">`
   value move `amount` `units` to the future.
1. When the `To the future!` button is clicked make the `<input type="date">`
   value move `amount` `units` to the past.

There's a `toDateStr()` function that converts JavaScript `Date` objects 
into date-time strings expected by `<input type="date">` elements. You may find
it useful 😉!

### [Try working version here](https://time-machine.gomix.me/)
