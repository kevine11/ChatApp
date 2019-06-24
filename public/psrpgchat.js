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
            var psrRoom = "psrRoom";
            socket.emit('psrRoom', psrRoom);
        });
            
        // PSR
        var psrBtn = document.getElementById("psrBtn");
        var psrTxt = document.getElementById("psrTxt");
        var psrMessages = document.getElementById("psrMessages");
        
        nBtn.addEventListener("click", function(){
            socket.emit("psr new message", psrTxt.value);
        });
        socket.on("psr news", function(data){
            psrMessages.innerHTML = psrMessages.innerHTML + "<br>" + data;
        });
        socket.on("node new user", function(data){
            psrMessages.innerHTML = psrMessages.innerHTML + "<br>" + data;
        });
