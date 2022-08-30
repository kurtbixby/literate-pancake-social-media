export { getUsersHandler, createUserHandler, getAUserHandler,
    updateUserHandler, deleteUserHandler, addFriendHandler,
    removeFriendHandler };

import { Thought, User } from '../models/index.js';

async function getUsersHandler(req, res) {
    try {
        const users = await User.find({}, '-id -__v');
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function getAUserHandler(req, res) {
    try {
        const user = await User.findById(req.params.userId, '-id -__v')
        .populate({path: 'friends', select: '-__v'});
        if (!user) {
            res.status(404).json({message: 'Invalid user id'});
            return;
        }
    
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function createUserHandler(req, res) {
    const { username, email } = req.body;

    if (!(username && email)) {
        res.status(401).json({message: 'Bad request'});
        return;
    }

    try {
        const user = await User.create({username, email});
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function updateUserHandler(req, res) {
    const update = {};
    if (req.body.username) update.username = req.body.username;
    if (req.body.email) update.email = req.body.email;

    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: update },
            {
                runValidators: true,
                returnOriginal: false
            }
        );

        if (!user) {
            res.status(404).json({message: 'Invalid user id'});
            return;
        }

        res.json(user);        
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function deleteUserHandler(req, res) {
    try {
        const user = await User.findOneAndDelete(
            { _id: req.params.userId }
        );

        if (!user) {
            res.status(404).json({message: 'Invalid user id'});
            return;
        }

        const thoughts = await Thought.deleteMany({
            username: user.username
        });

        console.log(thoughts);

        res.json({message: 'User deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function addFriendHandler(req, res) {
    try {
        const friend = await User.findById(req.params.friendId);

        if (!friend) {
            res.status(404).json({message: 'Invalid friend id'});
            return;
        }

        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: {friends: friend._id} },
            {
                runValidators: true,
                returnOriginal: false
            }
        );
        
        if (!user) {
            res.status(404).json({message: 'Invalid user id'});
            return;
        }
        
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function removeFriendHandler(req, res) {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: {friends: req.params.friendId} },
            {
                runValidators: true,
                returnOriginal: false
            }
        );
        
        if (!user) {
            res.status(404).json({message: 'Invalid user id'});
            return;
        }
        // user.friends.id(req.params.friendId).remove();
        // user.save();
        
        res.json({message: 'Friend removed successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
