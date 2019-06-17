var express = require('express');
var app = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');



app.set('view engine', 'ejs');

app.use('/', index)
app.use('/user', users)

app.use(cookieParser())

app.listen(3000,)

