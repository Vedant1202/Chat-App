// ================================================================================== //
// ================================================================================== //
//                               SERVER CONFIGURATION                                 //
// ================================================================================== //
// ================================================================================== //

// Variable declaration
var express                                    = require('express');
    app                                        = express();
    http                                       = require('http');
    server                                     = http.createServer(app);
    path                                       = require('path');
    socketIO                                   = require('socket.io');
    io                                         = socketIO(server);
    publicPath                                 = path.join(__dirname, '../public');
    port                                       = process.env.PORT || 3150;
    ip                                         = process.env.IP || null;

// Export functions declaration
var {generateMessage, generateLocationMessage} = require('./utils/message.js');


//set default files to ejs
app.set('view engine', 'html');

//setup express
app.use(express.static(publicPath));

// ========================================================================//
// ---------------------------- SOCKET.IO ---------------------------------//
// ========================================================================//

// Listen for a connection socket
io.on('connection', function (socket) {
  console.log("New user connected!");                  //On connection
  var date = new Date();
  var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  socket.emit('newMessage', {                          // Server to Client
    from: "Admin",
    text: "Welcome to Chat App",
    createdAt: current_time
  });

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'A new user has joined!'));

  socket.on('createMessage', function (newMessage, callback) {   // Client to Server
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
  });

  socket.on('createLocationMessage', function (coords) {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', function () {               // Disconnect handler
    console.log("Disconnected from server!");
  });
});


//=========================================================================//
//---------------------------------Routes---------------------------------//
//========================================================================//

// Index Page
app.get('/', function (req, res) {
  res.render('index');
});


//=======================================================================//
//------------------------------ Setup Server---------------------------//
//======================================================================//

server.listen(port, ip, function () {
  console.log("Node Chat App has started on port " + port);
});


//********************************* END *********************************//
