const socket = io();
socket.on('connect', ()=>{
    console.log('connected to server');
});
socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', (message)=>{
    console.log(message);
});

socket.on('welcome', (message)=>{
    console.log(message);
});

socket.on('newUser', (message)=>{
    console.log(message);
});


