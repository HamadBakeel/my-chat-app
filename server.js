const express = require('express');
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const app = express();
const server = http.createServer(app);
const io = socketio(server)
const formatMessage = require('./utils/messages')
app.use(express.static(path.join(__dirname, 'public')));

const chatBot = 'Chat Bot';
// run when a client connects
io.on('connection',socket =>{
    // console.log('new web socket connection...');
    
    // broadcast to the client himself
    socket.emit('message',formatMessage(chatBot,'Welcom to the chat'));

    // emit to everybody except the client who is connecting
    socket.broadcast.emit('message',formatMessage(chatBot,'A user has joined the chat'));

    // emit to everybody who is connecting, the user included
    // io.emit()

    // runs when client disconnects
    socket.on('disconnect',()=>{
        // console.log('A user has left the chat');
        io.emit('message',formatMessage(chatBot,'A user has left the chat'));
    });

    // listen to the chatMessage
    socket.on('chatMessage',(msg)=>{
        io.emit('message',msg);
    })
})

const PORT = process.env.PORT || 5000;

server.listen(PORT);
