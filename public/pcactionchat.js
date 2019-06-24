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

//PCAction chat

socket.on("connect", function(){
    var pcaRoom = "pcaRoom";
    socket.emit('pcaRoom', pcaRoom);
    
});

var pcaBtn = document.getElementById("pcaBtn");
var pcaTxt = document.getElementById("pcaTxt");
var pcaMessages = document.getElementById("pcaMessages");

pcaBtn.addEventListener("click", function(){
    socket.emit("pca new message", pcaTxt.value);
});
socket.on("pca news", function(data){
    pcaMessages.innerHTML = pcaMessages.innerHTML + "<br>" + data;
});
socket.on("pca new user", function(data){
    pcaMessages.innerHTML = pcaMessages.innerHTML + "<br>" + data;
});
