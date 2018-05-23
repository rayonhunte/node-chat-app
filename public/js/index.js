// globals 
const msgText = jQuery('[name=message]');
const locationButton = jQuery('#send-location');

const socket = io();

const scrollToBottom = ()=>{
    //selectors
    const messages = jQuery('#messages')
    const newMessage = messages.children('li:last-child');
    // heights
    const clientHeight = messages.prop('clientHeight');
    const scrollTop = messages.prop('scrollTop');
    const scrollHeight = messages.prop('scrollHeight');
    const newMessageHeight = newMessage.innerHeight();
    const lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
        console.log('scroll down');
        messages.scrollTop(scrollHeight);
    }
};

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
    scrollToBottom()
});

socket.on('newLocationMsg', (locationMsg)=>{
    let formattedTime = moment(locationMsg.createAt).format('MMM Do, YYYY HH:mm A');
    const template = jQuery('#location-message-template').html();
    const html = Mustache.render(template, {
        ...locationMsg,
        displayTime: formattedTime
    }); 
    jQuery('#messages').append(html);
    scrollToBottom()
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
