import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as validation from '../validations/authValidation.js';
import * as controller from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate(validation.registerUserSchema),
  controller.registerUser,
);

router.post(
  '/auth/login',
  celebrate(validation.loginUserSchema),
  controller.loginUser,
);

router.post('/auth/logout', controller.logoutUser);

router.get('/auth/session', controller.getUserSession);

export default router;
