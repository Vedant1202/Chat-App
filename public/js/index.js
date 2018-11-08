
//  ==========================================================
//  =================== SOCKET CONFIGURATION =================
//  ==========================================================

var socket = io();

// Connect handler
socket.on('connect', function () {
  console.log("Connected to server!");
});

var date = new Date();

socket.on('newMessage', function (message) {       // Server to Client

  var formattedTime = moment(message.createdAt).format('H:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  $('#allMessages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('H:MM a');
    var template = $('#locationMessage-template').html();
    var html = Mustache.render(template, {
      url: message.url,
      from: message.from,
      createdAt: formattedTime
    });

    // var li = $('<li></li>');
    // var a  = $('<a target="_blank">My current location</a>');
    //
    // li.text(`${message.from} (${formattedTime}) : `);
    // a.attr('href', message.url);
    // li.append(a);

    $('#allMessages').append(html);
});

// Disconnect handler
socket.on('disconnect', function () {
  console.log("Disconnected from server!");
});


//  ***************** socket config ends *********************
//  **********************************************************

$('#msgForm').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = $('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('');
  });
});

var locationButton = $('#send-location');

locationButton.click(function () {
  if(!(navigator.geolocation)){
    return alert('Geolocation not supported by your browser!');
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...'); //Disable button while the location is being sent

  //Locate the user
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location'); //Remove disable state of button when location is sent
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
      locationButton.removeAttr('disabled');
      alert('Access denied to fetch location!');
  });

});
