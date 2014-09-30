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


io.on('connection', function(socket){

  socket.on('join', function(data) {
    socket.username = data;
    socket.broadcast.emit('user_connected', socket.username);
    for (var sid in io.sockets.sockets) {

  });

  socket.on('text', function(msg) {
    io.emit('text', socket.username + ': ' + msg);
  });
});

