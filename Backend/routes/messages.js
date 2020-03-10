//import Conversation from '../models/conversation.model';
//import Message from '../models/message.model';


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


router.route('/add').post(async(req,res) => {
    try{
        Conversation.findById("5e676bbdd24ddc2bd6b861ad").then((conversation)=>{
            var textMessage = new Message({
                text : req.body.text,
                userId : req.body.userId,
            });
            textMessage.save().then((savedMessage) => {
                conversation.messages.push(savedMessage);
                conversation.save();
                //.then(()=>res.json('Skickat :)'))
                //.catch(err => res.status(400).json(`Error: ${err}`))
                console.log('Saved');
            })
        })
        
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch(error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log('message post called');
    }
});

router.route('/:id').delete((req, res) => {
    Message.findByIdAndDelete(req.params.id)
    .then(() => res.json('Message deleted'))
    .catch(err => res.status(400).json(`Error: ${err}`))
});


module.exports = router;
