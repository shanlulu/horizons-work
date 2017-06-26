"use strict";

// This file contains JavaScript that will run on your page.
// YOUR CODE HERE


$('.show-replies').hide();


$('.post').on('click', function(event) {
  var name = window.prompt("What's your name?");
  var comment = window.prompt("Enter some comments?");
  var newComment = $(`<div class="comment">
  <div class="author">"${name}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
  $('.comments').append(newComment);
})

//$('.reply').on('click', function(event) {
$('.comments').on('click', '.reply', function(event) {
  var name = window.prompt("What's your name?");
  var comment = window.prompt("Reply here!");
  var newComment = $(`<div class="comment">
  <div class="author">"${name}" says:</div>
  <div class="message">${comment}</div>
  <div class="controls">
    <button class="hide-replies btn btn-default">Hide Replies</button>
    <button class="show-replies btn btn-default">Show Replies</button>
    <button class="reply btn btn-default">Reply</button>
  </div>
  <div class="replies"></div>
</div>`);
  $(this).closest('.comment').children('.replies').append(newComment);
})

$('.comments').on('click', '.hide-replies', function(event) {
  var newClass = $(this).closest('.comment').children('.replies');
  newClass.hide();
  $(this).hide();
  $(this).siblings('.show-replies').show();
  // alert(newClass.find('.comment').length);
  var count = newClass.children().size();
  $(this).closest('.comment').append('<div class="count">'+count+' replies hidden </div>');
})

$('.comments').on('click', '.show-replies', function(event) {
  var newClass = $(this).closest('.comment').children('.replies');
  newClass.show();
  $(this).hide();
  $(this).siblings('.hide-replies').show();
  $('.count').remove();
})
