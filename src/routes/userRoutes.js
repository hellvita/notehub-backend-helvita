import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import * as controller from '../controllers/userController.js';
import { upload } from '../middleware/multer.js';

const router = Router();

router.get('/users/me', authenticate, controller.getUser);

router.patch('/users/me', authenticate, controller.updateUser);

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  controller.updateUserAvatar,
);

export default router;
