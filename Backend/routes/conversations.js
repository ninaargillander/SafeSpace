const router = require('express').Router();
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
//var http = require('http').Server(router);
//const io = require('socket.io')(http);
//const bodyParser = require('body-parser');
const User = require('../models/user.model');

router.route('/add').post(async (req, res) => {
  try {
    const conversation = new Conversation(req.body);
    const savedConversation = await conversation.save();
    console.log('conversation saved');

    //io.emit('conversation', req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  } finally {
    console.log('conversation created');
  }
});

router.route('/').get((req, res) => {
  Conversation.find({}, (err, conversations) => {
    res.send(conversations);
  });
});

/*router.route('/:id').get((req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    res.send(conversation);
  });
});*/

router.route('/:id').get((req, res) => {
  Conversation.findById(req.params.id, (err, conversation) => {
    Message.find({ _id: { $in: conversation.messages } }, (err, messages) => {
      res.json(messages);
    });
  });
});

module.exports = router;
