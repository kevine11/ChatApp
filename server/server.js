var express = require('express'),
    app = express(),
    http = require('http'),
    socketIO = require('socket.io'),
    server, io;

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/login');
});

server = http.Server(app);
server.listen(3000);

io = socketIO(server);

function createNamespace (i) {
    var group = io.of('/group-' + i);
    group.on('connection', function(socket) {
        socket.on('message.send', function (data) {
            group.emit('message.sent', data);
        });
    });
}

for (var i = 0; i < 2; i++) {
    createNamespace(i);
}

// This is the hashed password to join the private group
// It is the md5 hash of "pass123"
var privatePassword = '32250170a0dca92d53ec9624f336ca24';

console.log(privatePassword);

io.on('connection', function (socket) {

    socket.on('join.group', function (data) {

        // Return and emit a message if the passwords don't match
        if (md5(data.password) !== privatePassword) {
            return socket.emit('message.posted', {
                type: 'danger',
                message: 'Invalid password'
            });
        }

        // Join the group
        socket.join('PC');
        socket.join('PC Action');
        socket.join('PC RPG');
        socket.join('PC Shooter');
        socket.join('XBox');
        socket.join('XBox Action');
        socket.join('XBox RPG');
        socket.join('XBox Shooter');
        socket.join('Playstation');
        socket.join('Playstation Action');
        socket.join('Playstation RPG');
        socket.join('Playstartion Shooter');
        
        // Joining the room
        socket.emit('join.group.success');
        socket.on('list.rooms', function () {
            socket.emit('list.rooms.response', socket.rooms);
        });
    
        socket.on('leave.room', function (room) {
            socket.leave(room);
        });
    
    
    });

    // Post a message to the secret group
    socket.on('message.post', function (data) {
        io.to('secret group').emit('message.posted', {
            type: 'muted',
            message: data.message
        });
    });

});