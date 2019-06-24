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
    var xbrRoom = "xbrRoom";
    socket.emit('nRoom', nRoom);
    var xbrRoom = "xbrRoom";
    socket.emit("xbrRoom", xbrRoom);
});
// XBRpg
var xbrBtn = document.getElementById("xbrBtn");
var xbrTxt = document.getElementById("xbrTxt");
var xbrMessages = document.getElementById("xbrMessages");

xbrBtn.addEventListener("click", function(){
    socket.emit("xbr new message", xbrTxt.value);
});
socket.on("xbr news", function(data){
    xbrMessages.innerHTML = xbrMessages.innerHTML + "<br>" + data;
});
socket.on("xbr new user", function(data){
    xbrMessages.innerHTML = xbrMessages.innerHTML + "<br>" + data;
});
