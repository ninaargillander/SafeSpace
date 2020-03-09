import Boom from '@hapi/boom';

import User from '../routes/users'

export default async function(req, res){
    await User.findOne({id: req.auth.credentials.id}).populate('conversations').then((user) => {
        if(user){
            const conversations = user.conversations.map((conversation) => {
                const friendId = `${user._id}` === conversation.userOneId ?
                conversation.userTwoId : conversation.userOneId;
                return{
                    id: conversation._id,
                    friendId,
                };
            });
            reply(conversations);
        } else {
            reply(Boom.notFound('Cannot find user'));
        }
    });
}