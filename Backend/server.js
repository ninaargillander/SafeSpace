const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fetch = require('node-fetch');

//require('dotenv').config();

const app = express();
const port = 8000; //process.env.PORT ||

app.use(cors());
app.use(express.json());

const uri =
  'mongodb+srv://josef:hej123@safespacedb-chubk.gcp.mongodb.net/test?retryWrites=true&w=majority'; //process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
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

function getConversation(url) {
  const apiURL = `http://localhost:8000/conversations/`;

  fetch(apiURL + url)
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch(error => console.error(error));
  return;
}

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
