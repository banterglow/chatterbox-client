// YOUR CODE HERE:
// $(document).ready(function() {

//2011-08-21T18:02:52.249Z
//2017-12-08T17:12:74.1540-08:00 


console.log(moment().format('YYYY-MM-DDTHH:MM:SS.msZ'));
let app = {
  roomList: {},
  friendList: {},
  server: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages?order=-createdAt&where=',
  lastUpdate: {
    createdAt: {
      $gte: {
        __type: 'Date',
        iso: moment().format('YYYY-MM-DDTHH:MM:SS') + '.249Z'
      }
    }
  },
  init: function() {
    app.fetch();
    setInterval(app.fetch, 3000); //interval
    // app.addFriend();
  },
  render: function(data) {
    console.log(data);
    for (var i = 0; i < data.results.length; i++) {
      var text = _.escape(data.results[i].text);
      var username = _.escape(data.results[i].username);
      var timeStamp = moment(new Date(_.escape(data.results[i].createdAt))).format('LLLL');
      $('#chats').append($('<div class="chatBody"><p><strong>' + username + '</strong><br>' + text + '</p><p class="timestamp">' + timeStamp + '</p></div>'));
    }
  },
  fetch: function() {
    // $.get(app.server, updateFeed);
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server + JSON.stringify(app.lastUpdate),
      type: 'GET',
      contentType: 'application/json',
      success: app.render,
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  submitMessage: function() {
    
  },
  renderMessage: function() {
    var message = {
      username: window.location.search.slice(10),
      text: $('#messageInput').val(),
      roomname: $('#roomSelect').val()
    };
    $('#messageInput').val('');
    app.send(message);
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  createRoom: function(room) {

  },
  renderRoom: function() {

  },
  enterRoom: function() {

  },
  addFriend: function() {

  }
};

app.init();

// $.ajax({
//     url: app.server,
//     method: 'POST',
//     data: JSON.stringify(message),
//     contentType: 'application/json',
//     success: function (data) {
//         console.log('chatterbox: Message sent');
//     },
//     error: function (data) {
//         // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//         console.error('chatterbox: Failed to send message', data);
//     }
// });


$(document).ready(function() {
  $('#submitButton').on('click', app.renderMessage);


  /* slide effect - first append it as hidden, then slide reveal it.
  var temp = '<div class="newli"><div>1</div><div>2</div><div>3</div><div>4</div></div>';
  function runEffect() {
      $(temp).insertAfter('#add').show("blind", {
          direction: "up"
      }, 1000);
  };
  CSS

  .newli {
      display: none;
  }
  */

  //set interval






});
