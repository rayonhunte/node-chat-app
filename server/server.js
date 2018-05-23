const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const {
    genMessage,
    genLocationMsg
} = require('./util/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', genMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage',
        genMessage('Admin', 'a new user has joined the chat'));
    socket.on('createMessage', (message, callback) => {
        io.emit('newMessage', genMessage(message.from, message.text));
        callback('cool mon');
    });
    socket.on('createLocationMessage', (locationMsg) => {
        console.log(locationMsg);
        io.emit('newLocationMsg',
            genLocationMsg('Admin',
                locationMsg.latitude, locationMsg.longitude));
    });

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

});

server.listen(port, () => {
    console.log(`express started on port ${port}`);
});
