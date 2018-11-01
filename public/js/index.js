
//  ==========================================================
//  =================== SOCKET CONFIGURATION =================
//  ==========================================================
 
var socket = io();

// Connect handler
socket.on('connect', function () {
  console.log("Connected to server!");

  var date = new Date();
  var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  // socket.emit('createMessage', {                    // Client to Server
  //   from: "Suarez",
  //   text: "Good to see you, mate!",
  //   createdAt: current_time
  // });
});

socket.on('newMessage', function (message) {       // Server to Client
  console.log("New message!", message);
});

// Disconnect handler
socket.on('disconnect', function () {
  console.log("Disconnected from server!");
});


//  ***************** socket config ends *********************
//  **********************************************************
