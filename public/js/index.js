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
    let formattedTime = moment(message.createAt).format('MMM Do, YYYY HH:mm A');
    const template = jQuery('#message-template').html();
    const html = Mustache.render(template, {
        ...message,
        displayTime: formattedTime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMsg', (locationMsg)=>{
    // let li = jQuery('<li></li>');
    // let a = jQuery('<a target="_blank">My Current Location</a>');
    // let formattedTime = moment(locationMsg.createAt).format('MMM Do, YYYY HH:mm A');
    // li.text(`${locationMsg.from} ${formattedTime} : `);
    // a.attr('href', locationMsg.url);
    // li.append(a);
    // jQuery('#messages').append(li);
    let formattedTime = moment(locationMsg.createAt).format('MMM Do, YYYY HH:mm A');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        ...locationMsg,
        displayTime: formattedTime
    }); 
    jQuery('#messages').append(html);
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
