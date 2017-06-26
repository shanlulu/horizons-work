// This is where you will write all your CODE
// for the Horello AJAX (DAY 4) exercise.

$(document).ready(function() {
  setEventListeners();
  render();
});

function createList(listName) {
  $.ajax({
    url: 'https://api.trello.com/1/lists/',
    data: {
      key: "c24463cd05168b6df17aa42a151b8dc4",
      token: "0d70b569a9b6f2db01270f93c997ba41e511d18a220ad1164664fa3e96953f2e",
      name: listName,
      idBoard: boardId
    },
    method: 'POST',
    success: function(resp) {
      render(List(resp));
    }
  })
}

function createCard(name, listId) {
  $.ajax({
    url: 'https://api.trello.com/1/cards',
    data: {
      key: "c24463cd05168b6df17aa42a151b8dc4",
      token: "0d70b569a9b6f2db01270f93c997ba41e511d18a220ad1164664fa3e96953f2e",
      name: name,
      idList: listId
    },
    method: 'POST',
    success: function(resp) {
      render();
    }
  })
}

function updateCard(title, desc, cardId) {
  $.ajax({
    url: 'https://api.trello.com/1/cards/'+cardId,
    data: {
      key: "c24463cd05168b6df17aa42a151b8dc4",
      token: "0d70b569a9b6f2db01270f93c997ba41e511d18a220ad1164664fa3e96953f2e",
      name: title,
      desc: desc
    },
    method: 'PUT',
    success: function(resp) {
      render();
    }
  })
}

function render() {
  $.ajax('https://api.Trello.com/1/boards/594c504d91b641106911388b', {
    data: {
      key: "c24463cd05168b6df17aa42a151b8dc4",
      token: "0d70b569a9b6f2db01270f93c997ba41e511d18a220ad1164664fa3e96953f2e",
      cards: 'all',
      lists: 'all'
    },
    success: function(data) {
      renderBoard(data);
    }
  });
}

function renderBoard(board) {
  $('#boardAnchor').empty();
  $('#boardAnchor').append($(`<div id="${boardId}" class="board"></div>`))
  board.lists.forEach(function(list) {
    renderList(list);
  })
  board.cards.forEach(function(card) {
    renderCard(card);
  })
}

function renderList(list) {
  var newList = $(`<div class="list-container">
  <div class="list" data-list-id=${list.id} id=${list.id}>
    <div class="list-header">
      <span class="list-title">${list.name}</span>
    </div>
    <div class="list-cards"></div>
    <div class="list-footer">
      <button class="add-card" addcardid=${list.id}>Add a card...</button>
      <div class="collapse add-card-form-wrapper" id="addCardForm"+${list.id}>
        <div class="well add-card-form">
          <input type="text" class="form-control" placeholder="Card title" id="addCardTitle"+${list.id} />
          <button type="button" class="btn btn-default add-card-save" id="addCardBtn"+${list.id}>Save</button>
          <button type="button" class="btn btn-default add-card-cancel"><span class="glyphicon glyphicon-remove" id="addCardCancelBtn"+${list.id}></span></button>
        </div>
      </div>
    </div>
  </div>
</div>`);
// $('.list-header span').text(list.name);
//$('#'+list.id).closest('.board').append(newList);
$('#'+list.idBoard).append(newList);
}

function renderCard(card) {
  var newCard = $(`<div id=${card.id} class="card" data-card-desc=${card.desc} data-card-name=${card.name} data-list-id=${card.idList} data-card-id=${card.id}>
  <div class="card-body">
    ${card.name}
  </div>
</div>`);
$('#'+card.idList + ' .list-cards').append(newCard);
}
