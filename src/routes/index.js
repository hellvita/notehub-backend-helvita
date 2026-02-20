import { Router } from 'express';

import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import notesRoutes from './notesRoutes.js';

const router = Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(notesRoutes);

export default router;
