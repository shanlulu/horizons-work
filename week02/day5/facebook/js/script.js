

$('#register').on('click', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/register',
    method: 'post',
    data: {
      fname: $('#exampleFirstName1').val(),
      lname: $('exampleLastName1').val(),
      email: $('#exampleEmail').val(),
      password: $('#exampleInputPassword1').val()
    },
    success: function(resp) {
      //localStorage.setItem('fname', $('#exampleFirstName1').val());
      $('.firstRegister').addClass('collapse');
      $('.loginPage').removeClass('collapse');
    }
  })
})

$('#login').on('click', function(event) {
  event.preventDefault();
  $('.firstRegister').addClass('collapse');
  $('.loginPage').removeClass('collapse');
})

$('#registration').on('click', function() {
  $('.loginPage').addClass('collapse');
  $('.firstRegister').removeClass('collapse');
})

var refreshId = 0;
$('#loginButton').on('click', function() {
  // refreshId = setInterval(function() {
  //   $.ajax({
  //     url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
  //     data: {
  //       token: localStorage.getItem('token')
  //     },
  //     success: function() {
  //       console.log('refreshed');
  //     },
  //     error: function() {
  //       console.log('cannot refresh');
  //     }
  //   })
  // }, 30000);
  $.ajax('https://horizons-facebook.herokuapp.com/api/1.0/users/login', {
    method: 'POST',
    success: function(data) {
      localStorage.setItem('id', data.response.id);
      localStorage.setItem('token', data.response.token);
      $('.loginPage').addClass('collapse');
      $('.postPage').removeClass('collapse');
      // console.log(localStorage.getItem('id'));
      // console.log(localStorage.getItem('token'));
      function refresh() {
        $.ajax({
          url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/1',
          data: {
            token: localStorage.getItem('token')
          },
          async: false,
          success: function(resp) {
            $('.post').remove();
            for (var i = 0; i < resp.response.length; i++) {
              var poster = resp.response[i].poster.name.split(' ')[0];
              var content = resp.response[i].content;
              var time = new Date(resp.response[i].createdAt);
              var timeStr = `${time.getHours()}:${String(100+time.getMinutes()).slice(1)} ${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
              var comments = resp.response[i].comments;
              var commentsLength = resp.response[i].comments.length;
              var likes = resp.response[i].likes;
              var likesLength = resp.response[i].likes.length;
              var id = resp.response[i]._id;
              var newPost = `<div class="post" id=${id}>
              <div class="card col-xs-6 col-xs-offset-3">
              <div class="card-block">
              <h4 class="card-title">${poster}</h4>
              <h6 class="card-subtitle mb-2 text-muted">${timeStr}</h6>
              <p class="card-text">${content}</p>
              <div class='counters'>
              <h6 class="card-reply mb-2">${commentsLength} Replies</h6>
              <h6 class="card-like mb-2">${likesLength} Likes</h6>
              </div>`
              for (var j = 0; j < commentsLength; j++) {
                var time = new Date(comments[j].createdAt);
                var timeStr = `${time.getHours()}:${String(100+time.getMinutes()).slice(1)} ${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
                newPost = newPost + `<div class="card-subReply"><h6 class="card-replyer mb-2 text-muted">${comments[j].poster.name.split(' ')[0]}</h6>
                           <h6 class="card-replyertime mb-2 text-muted">${timeStr}</h6>
                           <p class="cardreplycontent">${comments[j].content}</p></div>`;
              }
              newPost = newPost + `<a href="#" class="btn btn-primary sticker"><span class='glyphicon glyphicon-thumbs-up'></span></a>
              <a href="#" class="btn btn-primary btn-reply">Reply</a>
              <div class="collapse commentBox">
                <div class='yourcomment'>
                  <div class="form-group col-xs-6 col-xs-offset-3">
                    <textarea class="form-control" id="textArea" rows="3" placeholder="Put your comment here!"></textarea>
                    <button type="button" class="postbutton2 btn btn-success" style="margin-top: 10px">Comment</button>
                  </div>
                </div>
              </div>
              </div>
              </div>
              </div>`;
              $('.postPage').append($(newPost));
            }
            console.log('refreshed');;
          }
        })
      }
      refresh();
      refreshId = setInterval(refresh, 10000);
    },
    data: {
      email: $('#emailLogin').val(),
      password: $('#passwordLogin').val()
    }
  });
})


$('body').on('click', '.btn-reply', function(event) {
  event.preventDefault();
  $(this).siblings('.commentBox').toggleClass('collapse');
})


$('body').on('click', '.postbutton2', function(event) {
  event.preventDefault();
  var comment = $(this).siblings('#textArea').val();
  var postId = $(this).closest('.post').attr('id');
  var self = $(this);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/'+postId,
    data: {
      token: localStorage.getItem('token'),
      content: comment
    },
    method: 'POST',
    success: function(resp) {
      var comment = resp.response.comments;
      var name = comment[comment.length-1].poster.name.split(' ')[0];
      var time = new Date(comment[comment.length-1].createdAt);
      var content = comment[comment.length-1].content;
      //var oldCount = parseInt($(this).closest('.commentBox').siblings('.card-reply').text().split(' ')[0]);
      var timeStr = `${time.getHours()}:${String(100+time.getMinutes()).slice(1)} ${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
      var newComment = `<div class="card-subReply"><h6 class="card-replyer mb-2 text-muted">${name}</h6>
                 <h6 class="card-replyertime mb-2 text-muted">${timeStr}</h6>
                 <p class="cardreplycontent">${content}</p></div>`;
      $(self).closest('.commentBox').siblings('.counters').children('.card-reply').text(comment.length + " Replies");
      ($(newComment)).insertBefore($('#'+postId).find('.sticker'));
      $(self).parent().addClass('collapse');
      //$(this).closest('.commentBox').siblings('.card-reply').text(comment.length + " Replies");
    }
  })
})
$('body').on('click', '.sticker', function(event) {
  event.preventDefault();
  var postId = $(this).closest('.post').attr('id');
  var self = $(this);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts/likes/'+postId,
    data: {
      token: localStorage.getItem('token')
    },
    success: function(resp) {
      var like = resp.response.likes;
      $(self).siblings('.counters').children('.card-like').text(like.length + " Likes");
    },
    error: function(err) {
      console.log(err);
    }
  })
})

$('body').on('click', '.postButton', function(event) {
  event.preventDefault();
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/posts',
    method: 'POST',
    data: {
      token: localStorage.getItem('token'),
      content: $('#exampleTextarea').val()
    },
    success: function(resp) {
      var name = resp.response.poster.name.split(' ')[0];
      var time = new Date(resp.response.createdAt);
      var timeStr = `${time.getHours()}:${String(100+time.getMinutes()).slice(1)} ${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
      var content = resp.response.content;
      var id = resp.response._id;
      var newPost = `<div class="post" id=${id}>
      <div class="card col-xs-6 col-xs-offset-3">
      <div class="card-block">
      <h4 class="card-title">${name}</h4>
      <h6 class="card-subtitle mb-2 text-muted">${timeStr}</h6>
      <p class="card-text">${content}</p>
      <div class='counters'>
      <h6 class="card-reply mb-2">0 Replies</h6>
      <h6 class="card-like mb-2">0 Likes</h6>
      </div>
      <a href="#" class="btn btn-primary sticker"><span class='glyphicon glyphicon-thumbs-up'></span></a>
      <a href="#" class="btn btn-primary btn-reply">Reply</a>
      <div class="collapse commentBox">
        <div class='yourcomment'>
          <div class="form-group col-xs-6 col-xs-offset-3">
            <textarea class="form-control" id="textArea" rows="3" placeholder="Put your comment here!"></textarea>
            <button type="button" class="postbutton2 btn btn-success" style="margin-top: 10px">Comment</button>
          </div>
        </div>
      </div>
      </div>
      </div>
      </div>`
      $($(newPost)).insertAfter('.yourPost');
    }
  })
})

$('.logoutButton').on('click', function(event) {
  event.preventDefault();
  clearInterval(refreshId);
  console.log(refreshId);
  $.ajax({
    url: 'https://horizons-facebook.herokuapp.com/api/1.0/users/logout',
    data: {
      token: localStorage.getItem('token')
    },
    success: function(resp) {
      $('.postPage').addClass('collapse');
      $('.loginPage').removeClass('collapse');
    }
  })
})
