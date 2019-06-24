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
    var pssRoom = "pssRoom";
    socket.emit('nRoom', pssRoom);
   
});
// PSShooter
var pssBtn = document.getElementById("pssBtn");
var pssTxt = document.getElementById("pssTxt");
var pssMessages = document.getElementById("pssMessages");

pssBtn.addEventListener("click", function(){
    socket.emit("pss new message", pssTxt.value);
});
socket.on("pss news", function(data){
    pssMessages.innerHTML = pssMessages.innerHTML + "<br>" + data;
});
socket.on("pss new user", function(data){
    pssMessages.innerHTML = pssMessages.innerHTML + "<br>" + data;
});
