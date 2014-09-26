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
  res.sendFile('C:\\users\\mouzasp\\projects\\chatbox\\index.html');

});

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

io.on('connection', function(socket){
  var addedUser = false;
  
  // when the client emits 'new message', this listens and executes
  socket.on('add message', function(data) {
    io.emit('add message', data);
  });

});

