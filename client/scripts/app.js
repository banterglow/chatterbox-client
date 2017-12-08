// YOUR CODE HERE:
$(document).ready(function(){
    let serverURL = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages'
    
    let roomList = {};
    // var app = init;

    let message = {
        username: 'mooo',
        text: 'test messaaaage',
        roomname: 'yoohoo'
      };

    // $.ajax({
    //     url: serverURL,
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

    let updateFeed = function(response) {
        console.log(response);
        for (var i = 0; i < response.results.length; i++) {
            // console.log(new Date)
            var text = _.escape(response.results[i].text);
            var username = _.escape(response.results[i].username);
            var timeStamp = moment(new Date(_.escape(response.results[i].createdAt))).format('LTS');
            let chatWrapper = "<div class='messageBox' id='" + response.results[i].roomname + "'><h4 class='username'>" + username + "</h4><p>" + text + "</p><p class='timestamp'>" + timeStamp + "</p>";
            roomList.JSON.stringify(response.results[i].roomname) = response.results[i].roomname;
            $('#chats').append(chatWrapper);
            $('#chats').append('<br>');}
        }


    $.get(serverURL, updateFeed);


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
