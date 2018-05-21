const socket = io();

socket.on('connect', ()=>{
    console.log('connected to server');
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', (message)=>{
    let li = jQuery('<li><li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

//$(document).ready(function(){
    jQuery('#message-form').on('submit', (e)=>{
        e.preventDefault();
        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val()
        }, (reply)=>{
            console.log(reply);
        });
    });
//});


