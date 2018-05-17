const socket = io();
socket.on('connect', ()=>{

    console.log('connected to server');

    socket.emit('createMessage', {
        from: 'max',
        text: 'i am good'
    });
});
socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newEmail', (email)=>{
    console.log('New Email', email);
});


socket.on('newMessage', (message)=>{
    console.log(message);
});


