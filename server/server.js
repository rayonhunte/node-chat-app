const path = require('path');
const http = require('http');

const express = require('express');
const socketIO = require('socket.io');

const {genMessage} = require('./util/message');

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
    //new user login welcome message
    socket.emit('welcome', genMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newUser', 
        genMessage('Admin', 'a new user has joined the chat'));

    //process client message
    socket.on('createMessage',(message, callback)=>{
        io.emit('newMessage', genMessage(message.from, message.text));
        callback('cool mon');
    });

    //run when server disconnects
    socket.on('disconnect', ()=>{
        console.log('client disconnected');
    });

});





server.listen(port, ()=>{
    console.log(`express started on port ${port}` );
});


module.exports = {app};
