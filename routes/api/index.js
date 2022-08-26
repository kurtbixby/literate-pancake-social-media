export { router };

import express from 'express';

import { router as thoughtRoutes } from './thoughtRoutes.js';
import { router as userRoutes } from './userRoutes.js';

const router = express.Router();

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);
