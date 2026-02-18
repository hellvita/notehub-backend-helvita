import { Joi, Segments } from 'celebrate';

export const updateUserSchema = {
  [Segments.BODY]: Joi.object({
    email: Joi.string().email().lowercase(),
    password: Joi.string().min(6),
    username: Joi.string().min(1).max(40),
    avatar: Joi.string(),
    notesAmount: Joi.number().integer().min(0),
  }),
};
