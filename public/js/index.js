// globals 
const msgText = jQuery('[name=message]');
const locationButton = jQuery('#send-location');

const socket = io();

socket.on('connect', ()=>{
    console.log('connected to server');
});

socket.on('disconnect', ()=>{
    console.log('Disconnected from server');
});

socket.on('newMessage', (message)=>{
    let li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
});

socket.on('newLocationMsg', (locationMsg)=>{
    let li = jQuery('<li></li>');
    let a = jQuery('<a target="_blank">My Current Location</a>');
    li.text(`${locationMsg.from}:`);
    a.attr('href', locationMsg.url);
    li.append(a);
    jQuery('#messages').append(li);

});

jQuery('#message-form').on('submit', (e)=>{
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: msgText.val()
    }, (reply)=>{
        console.log(reply);
        msgText.val('');
    });
});



locationButton.click(()=>{
   if (!navigator.geolocation){
       return alert('no geolocation available');
   }
   locationButton.attr('disabled', 'disabled').text('Sending Location');
   navigator.geolocation.getCurrentPosition((position)=>{
           const {latitude, longitude} = position.coords;
           socket.emit('createLocationMessage', {
               latitude,
               longitude
           });
           locationButton.removeAttr('disabled').text('Send Location');
       },
       ()=>{
           alert('error fetching location');
           locationButton.removeAttr('disabled').text('Send Location');
       }
    );
});
