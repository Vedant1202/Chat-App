
//  ==========================================================
//  =================== SOCKET CONFIGURATION =================
//  ==========================================================

var socket = io();

// Connect handler
socket.on('connect', function () {
  console.log("Connected to server!");
});

var date = new Date();
socket.emit('createMessage', {                    // Client to Server
  from: "Suarez",
  text: "Good to see you, mate!",
  createdAt: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}, function (data) {
  // console.log("Got the message! " + data);
});

socket.on('newMessage', function (message) {       // Server to Client
  console.log("New message!", message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#allMessages').append(li);
});

// Disconnect handler
socket.on('disconnect', function () {
  console.log("Disconnected from server!");
});


//  ***************** socket config ends *********************
//  **********************************************************

$('#msgForm').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: $('[name = message]').val()
  }, function () {
    // console.log("Message");
  });
});
