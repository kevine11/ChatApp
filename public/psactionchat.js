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
    var psaRoom = "psaRoom";
    socket.emit('psaRoom', psaRoom);
    
});
// PSAction
var psaBtn = document.getElementById("psaBtn");
var psaTxt = document.getElementById("psaTxt");
var psaMessages = document.getElementById("psaMessages");

psaBtn.addEventListener("click", function(){
    socket.emit("psa new message", psaTxt.value);
});
socket.on("psa news", function(data){
    psaMessages.innerHTML = psaMessages.innerHTML + "<br>" + data;
});
socket.on("psa new user", function(data){
    psaMessages.innerHTML = psaMessages.innerHTML + "<br>" + data;
});
