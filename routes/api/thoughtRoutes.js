export { router };

import express from 'express';

import { getThoughtsHandler, createThoughtHandler, getAThoughtHandler,
    updateThoughtHandler, deleteThoughtHandler, createReactionHandler,
    deleteReactionHandler } from '../../controllers/thoughtController.js';

const router = express.Router();

router.route('/').get(getThoughtsHandler).post(createThoughtHandler);
router.route('/:thoughtId').get(getAThoughtHandler).put(updateThoughtHandler).delete(deleteThoughtHandler);

router.route('/:thoughtId/reactions').post(createReactionHandler);
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReactionHandler);
