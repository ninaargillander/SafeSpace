const router = require('express').Router();
let Message = require('../models/message.model');
var http = require("http").Server(router);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');


router.route('/').get((req,res) => {
    Message.find({} , (err, messages) => {
        res.send(messages);
    });
});

router.route('/').post(async(req,res) => {
    try{
        var message = new Message(req.body);
        var savedMessage = await message.save();
        console.log('Saved');

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
