const express = require('express');
const app = express();
var reload = require('reload');
var io = require('sockiet.io')();


var mysql = require('mysql');
var bodyParser = require('body-parser');
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');


app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static("public"));
app.use(require('./routes/index'));
app.use(require('./routes/categories'));
app.use(require('./routes/games'));
app.use(require('./routes/chatroom'));

app.use('/', index);
app.use('/user', users);

app.use(cookieParser())

io.attach(server);
io.on('connection', function(socket) {
    socket.on('postMessage', function(data) {
        io.emit('updateMessages', data);
    });
});


