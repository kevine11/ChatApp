//Make connection to server
var socket = io.connect('http://localhost:3000');

//Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback');

//emit Events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
});

//Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle  + ' </strong>' + data.message + ' </p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message....</em></p>';
});

socket.on("connect", function(){
    var xbsRoom = "xbsRoom";
    socket.emit('xbsRoom', xbsRoom);
    
});
// XBShooter
var xbsBtn = document.getElementById("xbsBtn");
var xbsTxt = document.getElementById("xbsTxt");
var xbsMessages = document.getElementById("xbsMessages");

xbsBtn.addEventListener("click", function(){
    socket.emit("xbs new message", xbsTxt.value);
});
socket.on("xbs news", function(data){
    sxbMessages.innerHTML = xbsMessages.innerHTML + "<br>" + data;
});
socket.on("xbsnew user", function(data){
    sxbMessages.innerHTML = sxbMessages.innerHTML + "<br>" + data;
});
