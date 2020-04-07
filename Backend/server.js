const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
require('dotenv').config();
const port = process.env.PORT || 8000;

const cors = require('cors');
const mongoose = require('mongoose'); 

app.use(cors());
app.use(express.json());





const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const messageRouter = require('./routes/messages');
const conversationRouter = require('./routes/conversations');

app.use('/users', usersRouter); 
app.use('/messages', messageRouter);
app.use('/conversations', conversationRouter);



const sockets = {};

io.on('connection', (socket) => {
    console.log('A user connected...');
    socket.on('init', (userId) => {
        console.log('UserID: ' + userId.senderId);
        sockets[userId.senderId] = socket;
    });
    socket.on('message', (message) => {
        console.log(`Message recieved in server: ${message}`);
        if (sockets[message.receiverId]) {
          sockets[message.receiverId].emit('message', message);
        }
        app.use('messages/add', (message));
        //handlers.createMessage(message);
      });
      socket.on('disconnect', (userId) => {
        console.log(`User disconnected: ${userId.senderId}`);
        delete sockets[userId.senderId];
      });
});









server.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});


