// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use("/styles", express.static(__dirname + '/styles'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '//index.html');
});


var usernames = {};

io.on('connection', function(socket){

  socket.on('join', function(username) {
    socket.username = username;
    usernames[username] = username;
    socket.broadcast.emit('announcement', username + ' joined the chat.');
    socket.broadcast.emit('user connected', username);
    for (var name in usernames){
      socket.emit('user connected', usernames[name]);
    }
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('announcement', socket.username + ' left the chat.');
    socket.broadcast.emit('user disconnected', socket.username);

    delete usernames[socket.username];
  });
  
  socket.on('chat message', function(msg) {
    io.emit('chat message', socket.username + ': ' + msg);
  });
  
});

