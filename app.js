// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;


server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '\\index.html');

});

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket){
  var addedUser = false;
  
  
  socket.on('join', function(data) {
  
    socket.username = data;
    
    //socket.use('username', username, function() {
    //  socket.broadcast.emit('user_connected', username);
    //  for (var sid in io.sockets.sockets) {
    //    io.sockets.sockets[sid].get('username', function(err, username) {
    //      socket.emit('user_connected', username);
    //    });
    //  }
    console.log(socket.username)
  });
  
  socket.on('text', function(msg) {
    console.log('in here');
    io.emit('text', socket.username + ': ' + msg);

  });

});

