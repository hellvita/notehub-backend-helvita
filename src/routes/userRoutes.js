import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
import { updateUserSchema } from '../validations/userValidation.js';
import { upload } from '../middleware/multer.js';
import * as controller from '../controllers/userController.js';

const router = Router();

router.get('/users/me', authenticate, controller.getUser);

router.patch(
  '/users/me',
  authenticate,
  celebrate(updateUserSchema),
  controller.updateUser,
);

router.patch(
  '/users/me/avatar',
  authenticate,
  upload.single('avatar'),
  controller.updateUserAvatar,
);

export default router;
