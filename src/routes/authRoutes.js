import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as authValidation from '../validations/authValidation.js';
import * as authControllers from '../controllers/authController.js';

const router = Router();

router.post(
  '/auth/register',
  celebrate(authValidation.registerUserSchema),
  authControllers.registerUserController,
);

router.post(
  '/auth/login',
  celebrate(authValidation.loginUserSchema),
  authControllers.loginUserController,
);

router.post('/auth/logout', authControllers.logoutUserController);

router.get('/auth/session', authControllers.getUserSessionController);

export default router;
