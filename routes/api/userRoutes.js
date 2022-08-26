export { router };

import express from 'express';

import { getUsersHandler, createUserHandler, getAUserHandler,
    updateUserHandler, deleteUserHandler, addFriendHandler,
    removeFriendHandler } from '../../controllers/userController.js';

const router = express.Router();

router.route('/').get(getUsersHandler).post(createUserHandler);
router.route('/:userId').get(getAUserHandler).put(updateUserHandler).delete(deleteUserHandler);

router.route('/:userId/friends/:friendId').post(addFriendHandler).delete(removeFriendHandler);
