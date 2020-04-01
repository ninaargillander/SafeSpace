const router = require('express').Router();
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
var http = require("http").Server(router);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');



router.route('/').get((req,res) => {
    Message.find({} , (err, messages) => {
        res.send(messages);
    });
});

router.route('/add').post((req,res) => {
    try{
        console.log(req.body.conversationId);
        Conversation.findById(req.body.conversationId).then((conversation)=>{
            var textMessage = new Message({
                text : req.body.text,
                userId : req.body.userId,
                conversationId : req.body.conversationId,
            });
            textMessage.save().then((savedMessage) => {
                conversation.messages.push(savedMessage);
                conversation.save();
                console.log('Saved');
            })
        })
        res.sendStatus(200);
    } catch(error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log('message post called');
    }
});


module.exports = router;
