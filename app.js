const express = require('express');
const app = express();
// var reload = require('reload');
// var io = require('socket.io')();


var mysql = require('mysql');
var bodyParser = require('body-parser');
// var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var passport = require('passport');


var LocalStrategy = require('passport-local').Strategy;

var myStore = new SequelizeStore({
    db: db.sequelize
})

app.use(session({
    secret: 'horde',
    store: myStore,
    resave: false,
    proxy: true,
}))

myStore.sync();

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cookieParser())

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.static("public"));
// app.use(require('./routes/index'));
// app.use(require('./routes/categories'));
// app.use(require('./routes/games'));
// app.use(require('./routes/chatroom'));

app.get('/login', (req, res) => {
    res.render('login')
});

io.attach(server);
io.on('connection', function(socket) {
    socket.on('postMessage', function(data) {
        io.emit('updateMessages', data);
    });
});


app.post('/login', passport.authenticate('local', 
{successRedirect: '/dashboard', failureRedirect: '/login'}))

app.get('/logout', (req, res) => {
    
    req.session.destroy((err)=>{
        req.logout();

        res.redirect('/login')
    })
})

app.get('/dashboard', (req, res) => {
    if(!req.isAuthenticated()){

        res.redirect('/login');
        return
    }

    res.send(`Login Confirmed`)
})

app.get('/login', (req, res) => {
    res.render('login');
})

// app.post('/login', (req, res) => {
    
//     let password = bcrypt.hashSync(req.body.password, 8);
//     let username = req.body.username;

//     db.user.create({username: username, password: password })
//     .then((result) => {
//         res.redirect('/login')
//     })
//     .catch((error)=>{
//         res.send('error');
//     })

    
// })

passport.use(new LocalStrategy((username, password, done)=>{
    console.log(`I'm in passport`);

    db.user.findAll({where: {username: username}})
    .then((results)=>{

        if(results != null){

            let record = results[0];

            bcrypt.compare(password, record.password, (err, response) => {
                if(response){
                    console.log('Passwords matched');

                    //serizalize user gets called here
                    done(null, {id: record.id, username: record.username})
                }
                else{
                    console.log(`Passwords don't match`);
                    done(null, false);
                }
            })
        }
        else{
            console.log(`user not found`)
            done(null, false)
        }

    })
}))

passport.serializeUser((user, done)=>{
    // passport is adding information to the sessions

    done(null, user.id)
})

passport.deserializeUser((id, done)=>{

    db.user.findByPk(id)
    .then((record)=>{
        done(null, record)
    })
})


app.listen(3000, () => {
    console.log(`listening on port 3000`)
    })