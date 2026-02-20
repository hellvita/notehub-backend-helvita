import { Joi, Segments } from 'celebrate';
import { isValidObjectId } from 'mongoose';
import { TAGS } from '../constants/tags.js';

export const getAllNotesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(20).default(10),
    tag: Joi.string().valid(...TAGS),
    search: Joi.string().trim().allow(''),
    sortBy: Joi.string().valid('_id', 'title', 'content', 'tag'),
    sortOrder: Joi.string().valid('asc', 'desc'),
  }),
};

const objectIdValidator = (value, helpers) => {
  return isValidObjectId(value) ? value : helpers.message('Invalid id format');
};

export const noteIdSchema = {
  [Segments.PARAMS]: Joi.object({
    noteId: Joi.string().custom(objectIdValidator).required(),
  }),
};

export const createNoteSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1).required(),
    content: Joi.string().trim().allow(''),
    tag: Joi.string().valid(...TAGS),
  }),
};

export const updateNoteSchema = {
  ...noteIdSchema,
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().min(1),
    content: Joi.string().trim().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};

export const updateDraftSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().allow(''),
    content: Joi.string().trim().allow(''),
    tag: Joi.string().valid(...TAGS),
  }).min(1),
};
