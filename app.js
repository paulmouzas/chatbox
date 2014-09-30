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
  res.sendFile(__dirname + '//index.html');
});


var usernames = {};

io.on('connection', function(socket){

  socket.on('join', function(username) {
    socket.username = username;
    usernames[username] = username;
    socket.broadcast.emit('user connected', usernames);

  });

  socket.on('text', function(msg) {
    io.emit('text', socket.username + ': ' + msg);
  });
  
});

