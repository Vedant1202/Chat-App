// ================================================================================== //
// ================================================================================== //
//                               SERVER CONFIGURATION                                 //
// ================================================================================== //
// ================================================================================== //

// Variable declaration
var express                 = require('express');
    app                     = express();
    http                    = require('http');
    server                  = http.createServer(app);
    path                    = require('path');
    socketIO                = require('socket.io');
    io                      = socketIO(server);
    publicPath              = path.join(__dirname, '../public');
    port                    = process.env.PORT || 3150;
    ip                      = process.env.IP || null;


//set default files to ejs
app.set('view engine', 'html');

//setup express
app.use(express.static(publicPath));

// ========================================================================//
// ---------------------------- SOCKET.IO ---------------------------------//
// ========================================================================//

// Listen for a connection socket
io.on('connection', function (socket) {
  console.log("New user connected!"); //On connection

  var date = new Date();
  var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  socket.emit('newMessage', {                          // Server to Client
    from: "Admin",
    text: "Welcome to Chat App",
    createdAt: current_time
  });

  socket.broadcast.emit('newMessage', {
    from: "Admin",
    text: "New User has joined!",
    createdAt: current_time
  });

  socket.on('createMessage', function (newMessage) {   // Client to Server
    var date = new Date();
    var current_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    // console.log("Created new message", newMessage);
    // io.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: current_time
    // });
    socket.broadcast.emit('newMessage', {
        from: newMessage.from,
        text: newMessage.text,
        createdAt: current_time
    });
  });

  socket.on('disconnect', function () {           // Disconnect handler
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
