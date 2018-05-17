const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

//int express app 
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

//serve public
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// get static path
app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log('New user connected');

    //create new message
    socket.emit('newMessage', {
        from: 'rayon',
        text: 'who are you',
        createAt: Date.now()
    });
    //process client message
    socket.on('createMessage',(message)=>{
        console.log(message);
    });

    //run when server disconnects
    socket.on('disconnect', ()=>{
        console.log('client disconnected');
    });

    //socket.on();
});





server.listen(port, ()=>{
    console.log(`express started on port ${port}` );
});


module.exports = {app};
