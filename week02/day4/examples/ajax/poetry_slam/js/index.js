// YOUR CODE HERE
// URL to GET: http://horizons-json-cors.s3.amazonaws.com/poem.txt


$.ajax({
  url: 'http://horizons-json-cors.s3.amazonaws.com/poem.txt',
  success: function(resp) {
    $('body').append($('<pre>').text(resp));
    $('#count').text(_.size(resp.split(' ')));
  }
})
