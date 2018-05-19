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
    //new user login welcome message
    socket.emit('welcome', {
        from: 'admin',
        text: 'welcome to chat app',
        createAt: new Date().getTime()
    });
    socket.broadcast.emit('newUser',{
        from: 'admin',
        text: 'a new user has joined the chat',
        createAt: new Date().getTime()
    });

    //process client message
    socket.on('createMessage',(message)=>{
        console.log(message);
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createAt: new Date().getTime()
        });
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
