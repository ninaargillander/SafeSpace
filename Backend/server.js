const express = require('express');
<<<<<<< HEAD
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

//require('dotenv').config();

const app = express();
const port = 8000; //process.env.PORT ||
=======
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
require('dotenv').config();
const port = process.env.PORT || 8000;
>>>>>>> sendUserInformation

const cors = require('cors');
const mongoose = require('mongoose'); 

app.use(cors());
app.use(express.json());

<<<<<<< HEAD
const uri =
  'mongodb+srv://josef:hej123@safespacedb-chubk.gcp.mongodb.net/test?retryWrites=true&w=majority'; //process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
=======




const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true});
>>>>>>> sendUserInformation
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const usersRouter = require('./routes/users');
const messageRouter = require('./routes/messages');
const conversationRouter = require('./routes/conversations');

app.use('/users', usersRouter);
app.use('/messages', messageRouter);
app.use('/conversations', conversationRouter);

<<<<<<< HEAD
/*function getConversation(url) {
  const apiURL = `http://localhost:8000/conversations/`;
=======


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
>>>>>>> sendUserInformation

  fetch(apiURL + url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
  return;
}*/

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
