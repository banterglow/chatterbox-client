// YOUR CODE HERE:
// $(document).ready(function() {

//2011-08-21T18:02:52.249Z
//2017-12-08T18:12:81.4648-08:00
// where={"createdAt":{"$gte":{"__type":"Date","iso":"2011-08-21T18:02:52.249Z"}}}
// where={"createdAt":{"$gte":{"__type":"Date","iso":"2017-12-08T19:12:18.249Z"}}}


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
  render: function(data, selectedRoom) {
    // console.log(data);
    for (var i = 0; i < data.results.length; i++) {
      var text = _.escape(data.results[i].text);
      var username = _.escape(data.results[i].username);
      var timeStamp = moment(new Date(_.escape(data.results[i].createdAt))).format('LLLL');
      var roomName = _.escape(data.results[i].roomname);
      app.createRoom(roomName);
      // if (selectedRoom && selectedRoom === roomName) {
      //   app.clearMessages();
      //   $('#chats').append($(`<div class="chatBody ${roomName}"><p><strong>${username}</strong></p><p>${text}</p><p class="timestamp">${timeStamp}</p></div>`));
      // } else {
      $('#chats').append($(`<div class="chatBody ${roomName}"><p><strong>${username}</strong></p><p>${text}</p><p class="timestamp">${timeStamp}</p></div>`));
      // }
    }
  },
  fetch: function() {
    // $.get(app.server, updateFeed);
    // console.log(app.server + JSON.stringify(app.lastUpdate));
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
      data: message,
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
    var message = {
      username: window.location.search.slice(10),
      text: $('#messageInput').val(),
      roomname: $('#roomSelect').val()
    };
    console.log(message);
    $('#messageInput').val('');
    app.renderMessage(message);
    app.fetch();
  },
  renderMessage: function(message) {
    app.send(JSON.stringify(message));
    //below is just for the spec test
    $('#chats').append($(`<div class="chatBody ${message.roomname}"><p><strong> ${message.username} </strong><br> ${message.text} </p><p class="timestamp"> ${message.timeStamp} </p></div>`));
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderRoom: function(room) {
    $('#roomSelect').append($(`<option value="${room}">${room}</option>`));
  },
  createRoom: function(roomName = $('#newRoomInput').val()) {
    // var roomName = messageRoom $('#newRoomInput').val();
    if (!_.has(app.roomList, roomName)) {
      app.roomList[roomName] = roomName;
      $('#roomSelect').append($(`<option class="${roomName}" value="${roomName}">${roomName}</option>`));
    }
    // $('#roomSelect').append($(`<option class="${roomName}" value="${roomName}">${roomName}</option>`));
    app.enterRoom(roomName);
  },
  enterRoom: function(roomName = $('#roomSelect option:selected').val()) {
    // var selectedRoom = $('#roomSelect options:selected').options[$('#roomSelect').roomName].value;
    var selectedRoom = $('#roomSelect option:selected').text();
    // filter for only that room's messages
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
  $('#submitButton').on('click', app.submitMessage);

  $('#createRoomButton').on('click', app.createRoom);
  //listener for selection 
  $('#roomSelect').on('click change', app.enterRoom);

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
