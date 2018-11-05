
//  ==========================================================
//  =================== SOCKET CONFIGURATION =================
//  ==========================================================

var socket = io();

// Connect handler
socket.on('connect', function () {
  console.log("Connected to server!");
});

var date = new Date();
// socket.emit('createMessage', {                    // Client to Server
//   from: "",
//   text: "",
//   createdAt: date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
// }, function (data) {
//   // console.log("Got the message! " + data);
// });

socket.on('newMessage', function (message) {       // Server to Client
  console.log("New message!", message);

  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#allMessages').append(li);
});

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a  = $('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

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
    text: $('[name=message]').val()
  }, function () {
    // console.log("Message");
  });
});

var locationBuffer = $('#send-location');

locationBuffer.click(function () {
  if(!(navigator.geolocation)){
    return alert('Geolocation not supported by your browser!');
  }

  //Locate the user
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Access denied to fetch location!');
  });

});
