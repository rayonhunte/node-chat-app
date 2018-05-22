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
        text: jQuery('[name=message]').val()
    }, (reply)=>{
        console.log(reply);
    });
});

const locationButton = jQuery('#send-location'); 

locationButton.click(()=>{
   if (!navigator.geolocation){
       return alert('no geolocation available');
   }
   navigator.geolocation.getCurrentPosition(
       (position)=>{
           console.log(position);
           const {latitude, longitude} = position.coords;
           socket.emit('createLocationMessage', {
               latitude,
               longitude
           });
       },
       ()=>{
           alert('error fetching location');
       }
    );
});
