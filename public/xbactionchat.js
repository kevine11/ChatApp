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
    var xbaRoom = "xbaRoom";
    socket.emit('xbaRoom', xbaRoom);
    
});
// XboxAction
var xbaBtn = document.getElementById("xbaBtn");
var xbaTxt = document.getElementById("xbaTxt");
var xbaMessages = document.getElementById("xbaMessages");

xbaBtn.addEventListener("click", function(){
    socket.emit("xba new message", xbaTxt.value);
});
socket.on("xba news", function(data){
    xbaMessages.innerHTML = xbaMessages.innerHTML + "<br>" + data;
});
socket.on("xba new user", function(data){
    xbaMessages.innerHTML = xbaMessages.innerHTML + "<br>" + data;
});
