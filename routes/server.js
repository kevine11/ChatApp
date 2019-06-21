// var   express = require('express')
//     , app = express.createServer()
//     , io  = require('socket.io').listen(app)
//     , port = process.env.PORT || 3000;

// app.listen(port);

// app.configure(function() {
//     app.use(express.static(__dirname + '/public'));
//         app.use(app.router);
// });

// app.get('/', function (req, res) {
//     res.sendfile(__dirname + '/index.html');
// });

// io.configure(function () {
//     io.set('transports', ['xhr-polling']);
//     io.set('polling duration', 10);
// });

// var usernames = {};

// var rooms = ['PC','PC Action', 'PC RPG', 'PC Shooter', 'XBox', 'XBox Action','XBox RPG', 'XBox Shooter', 'Playstation', 'Playstation Action', 'Playstation RPG', 'Playstation Shooter'];

// io.sockets.on('connection', function (socket) {

//     socket.on('adduser', function(username) {
//         socket.username = username;
//         usernames[username] = username;
//         socket.join('room1');
//         socket.emit('updatechat', 'SERVER', 'you have connected to room1');
//         socket.broadcast.to('room1').emit('updatechat', 'SERVER', username + ' has connected to this room');
//         socket.emit('updaterooms', rooms, 'room1');
//     });

//     socket.on('sendchat', function (data) {
//         io.sockets.in(socket.room).emit('updatechat', socket.username, data);
//     });

//     socket.on('switchRoom', function(newroom) {
//     socket.leave(socket.room);
//     socket.join(newroom);
//     socket.emit('updatechat', 'SERVER', 'you have connected to ' + newroom);
//     socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username + 'has left this room');
//     socket.room = newroom
//     socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username + 'has joined this room');
//     socket.emit('updaterooms', rooms, newroom);
//     });

//     socket.on('disconnect', function () {
//         delete usernames[socket.username];
//         io.sockets.emit('updateusers', usernames);
//         socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
//     });
// });

// module.exports = router



// socket.join('PC');
//         socket.join('PC Action');
//         socket.join('PC RPG');
//         socket.join('PC Shooter');
//         socket.join('XBox');
//         socket.join('XBox Action');
//         socket.join('XBox RPG');
//         socket.join('XBox Shooter');
//         socket.join('Playstation');
//         socket.join('Playstation Action');
//         socket.join('Playstation RPG');
//         socket.join('Playstartion Shooter');