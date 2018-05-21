socket.emit('newEmail', {
    from: 'cool@runnings.com',
    text: 'Hey. what is going on',
    createAt: 123
});


socket.on('createEmail', (newEmail)=>{
    console.log('Create New Email', newEmail);
});


socket.emit('createEmail',{
    to: 'max@max.com',
    from : 'Rayo@home.com',
    text: 'whats good homes'
});

socket.on('newEmail', (email)=>{
    console.log('New Email', email);
});



socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
}, (reMsg)=>{
    console.log(reMsg);
});
