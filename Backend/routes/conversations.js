const router = require('express').Router();
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
var http = require("http").Server(router);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const User = require('../models/user.model');


router.route('/add').post(async(req,res) => {
    try{
        const conversation = new Conversation(req.body);
        const savedConversation = await conversation.save();
        console.log('conversation saved');

        io.emit('conversation', req.body);
        res.sendStatus(200);
    } catch(error){
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log('conversation created');
    }
});




module.exports = router;
