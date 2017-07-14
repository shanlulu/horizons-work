
$('document').ready(function(){

  $("#send-contribution").on('click', function(event) {
    event.preventDefault();
    sendContribution();
  })

  function showFlashMessage(str, identifier) {
    if (identifier === 'success') {
      $( `<div class="alert alert-success">
          <strong>Success!</strong>${str}
          </div>` ).insertBefore( ".project-wrapper" );
    } else {
      $( `<div class="alert alert-danger">
          <strong>Danger!</strong>${str}
          </div>` ).insertBefore( ".project-wrapper" );
    }
  }

  function sendContribution() {
    var newContribution = {
      name: $('#inputName').val(),
      amount: $('#inputAmount').val()
    };
    $.ajax({
      url: '/api/project/'+ window.location.href.split('/')[4] + '/contribution',
      method: 'post',
      data: {
        name: $('#inputName').val(),
        amount: $('#inputAmount').val()
      },
      success: function(resp) {
        showFlashMessage(" Thanks for your contribution! You rock!", 'success');
        console.log(resp);
      },
      error: function(err) {
        showFlashMessage(" An error occurred", 'danger');
        console.log('ERROR', err);
      }
    })
  }

})
