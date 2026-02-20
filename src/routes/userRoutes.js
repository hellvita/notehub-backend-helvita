import { Router } from 'express';
import { celebrate } from 'celebrate';

import { authenticate } from '../middleware/authenticate.js';
import { updateUserSchema } from '../validations/userValidation.js';
import { upload } from '../middleware/multer.js';
import * as userControllers from '../controllers/userController.js';

const router = Router();

router.use('/users/me', authenticate);

router.get('/users/me', userControllers.getUserController);

router.patch(
  '/users/me',
  celebrate(updateUserSchema),
  userControllers.updateUserController,
);

router.patch(
  '/users/me/avatar',
  upload.single('avatar'),
  userControllers.updateUserAvatarController,
);

router.delete('/users/me', userControllers.deleteUserController);

export default router;
