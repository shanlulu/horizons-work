"use strict";

// YOUR JAVASCRIPT CODE GOES HERE


var cardBeingEdited = null;

$(".board").on('click', ".add-list", function(event) {
  $('.add-list-form-wrapper').removeClass('collapse');
})

$(".board").on('click', ".add-list-cancel", function(event) {
  $('.add-list-form-wrapper').addClass('collapse');
})

$(".board").on('click', ".add-list-save", function(event) {
  var listName = $('.add-list-form-wrapper input').val();
  var newList =  `<div class="list-container">
  <div class="list">
    <div class="list-header">
      <span class="list-title">${listName}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card">Add a card...</button>
      <div class="collapse add-card-form-wrapper">
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title">
          <button type="button" class="btn btn-default add-card-save">
            Save
          </button>
          <button type="button" class="btn btn-default add-card-cancel">
            <span class="glyphicon glyphicon-remove"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>`;
$(this).closest('.list-container').before(newList);
$('.add-list-form-wrapper').addClass('collapse');
})

$(".board").on('click', ".add-card", function(event) {
  $(this).siblings('.add-card-form-wrapper').removeClass('collapse');
})

$('.board').on('click', ".add-card-cancel", function(event) {
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$('.board').on('click', ".add-card-save", function() {
  var cardName = $(this).siblings("input").val();
  var newCard = `<div class="card">
  <span class="card-more">
    <span class="glyphicon glyphicon-align-left"></span>
  </span>
  <div class="card-body">${cardName}</div>
</div>`;
  $(this).closest('.list-footer').siblings('.list-cards').append(newCard);
  $(this).closest('.add-card-form-wrapper').addClass('collapse');
})

$(".board").on('click', ".card", function(event) {
  cardBeingEdited = $(this);
  var currentText = $(this).find('.card-body').text();
  $('#card-edit-body').attr('placeholder', currentText);
  $('#card-edit').modal();
})

$('.modal').on('click', '.card-edit-save', function() {
  var newText = $('textarea').val();
  cardBeingEdited.children('.card-body').text(newText);
  $('#card-edit').modal('hide');
})
