export { getThoughtsHandler, createThoughtHandler, getAThoughtHandler,
    updateThoughtHandler, deleteThoughtHandler, createReactionHandler,
    deleteReactionHandler };

import { Thought, User } from '../models/index.js';

async function getThoughtsHandler(req, res) {
    try {
        const thoughts = await Thought.find({}, '-id -__v');
        res.json(thoughts);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function createThoughtHandler(req, res) {
    const { thoughtText, username, userId } = req.body;

    if (!(thoughtText && username && userId)) {
        res.status(401).json({message: 'Bad request'});
        return;
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            res.status(401).json({message: 'Invalid user id provided'});
            return;
        }

        const thought = await Thought.create({thoughtText, username});

        await User.findOneAndUpdate(
            { _id: userId },
            { $push: {thoughts: thought._id} },
            { runValidators: true }
        );

        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function getAThoughtHandler(req, res) {
    try {
        const thought = await Thought.findById(req.params.thoughtId, '-id -__v')
        .populate({path: 'reactions', select: '-__v'});
        if (!thought) {
            res.status(404).json({message: 'Invalid thought id'});
            return;
        }
    
        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function updateThoughtHandler(req, res) {
    const { thoughtText } = req.body;
    const thoughtId = req.params.thoughtId;

    if (!thoughtText) {
        res.status(401).json({message: 'Bad request'});
        return;
    }

    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: thoughtId },
            { $set: { thoughtText } },
            {
                runValidators: true,
                returnOriginal: false
            }
        );

        if (!thought) {
            res.status(404).json({message: 'Invalid thought id'});
            return;
        }

        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function deleteThoughtHandler(req, res) {
    try {
        const thought = await Thought.findOneAndDelete(
            { _id: req.params.thoughtId }
        );

        if (!thought) {
            res.status(404).json({message: 'Invalid thought id'});
            return;
        }

        res.json({message: 'Thought deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function createReactionHandler(req, res) {
    const { reactionBody, username } = req.body;

    if (!(reactionBody && username)) {
        res.status(401).json({message: 'Bad request'});
        return;
    }


    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: {reactions: {reactionBody, username}} },
            {
                runValidators: true,
                returnOriginal: false
            }
        );
        
        if (!thought) {
            res.status(404).json({message: 'Invalid thought id'});
            return;
        }

        res.json(thought);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}

async function deleteReactionHandler(req, res) {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: {reactions: {_id: req.params.reactionId}}},
            {
                runValidators: true,
                returnOriginal: false
            }
        )
        .populate({path: 'reactions', select: '_id'});
        
        if (!thought) {
            res.status(404).json({message: 'Invalid thought id'});
            return;
        }
        
        res.json({message: 'Reaction deleted successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
}
