import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as validation from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import * as controller from '../controllers/notesController.js';

const router = Router();

router.use('/notes', authenticate);

router.get(
  '/notes',
  celebrate(validation.getAllNotesSchema),
  controller.getAllNotes,
);

router.post(
  '/notes',
  celebrate(validation.createNoteSchema),
  controller.createNote,
);

router.get(
  '/notes/:noteId',
  celebrate(validation.noteIdSchema),
  controller.getNoteById,
);

router.delete(
  '/notes/:noteId',
  celebrate(validation.noteIdSchema),
  controller.deleteNote,
);

router.patch(
  '/notes/:noteId',
  celebrate(validation.updateNoteSchema),
  controller.updateNote,
);

router.use('/note-draft', authenticate);

router.get('/note-draft', controller.getDraft);

router.patch(
  '/note-draft',
  celebrate(validation.updateDraftSchema),
  controller.updateDraft,
);

export default router;
