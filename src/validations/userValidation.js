import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(8),
    username: Joi.string().min(1).max(40),
  }),
};
