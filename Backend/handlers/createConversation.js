import Boom from '@hapi/boom';
import User from '../models/user.model';
import Conversation from '../models/conversation.model';

export default async function(req, res){
    await User.findOne({id: req.auth.credentials.id}).populate('conversations').then((user) => {
        if(user){
            const isConversationExist = user.conversations.filter(conversation => (
                conversation.userOneId === req.payload.friendId || 
                conversation.userTwoId === req.payload.friendId
            ),
            ).length > 0;
            if(isConversationExist) {
                reply(Boom.badData('You already have a conversation with this user'));
            }
            else {
                User.findById(req.payload.friendId).then((friend) => {
                    const newConversation = new Conversation({
                        userOneId = user._id,
                        userTwoId = friend._id,
                    });
                    newConversation.save().then((conversation) => {
                        user.conversations.push(conversation);
                        user.save();
                        friend.conversations.push(conversation);
                        friend.save();

                        reply({id: conversation._id, friendId: friendId._id});
                    });
                },);
            }
        }
        else{
            reply(Boom.notFound('Cannot find user'));
        }
        },
    );
}



