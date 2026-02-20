import { Router } from 'express';
import { celebrate } from 'celebrate';

import * as notesValidation from '../validations/notesValidation.js';
import { authenticate } from '../middleware/authenticate.js';
import * as notesControllers from '../controllers/notesController.js';

const router = Router();

router.use('/notes', authenticate);

router.get(
  '/notes',
  celebrate(notesValidation.getAllNotesSchema),
  notesControllers.getAllNotesController,
);

router.post(
  '/notes',
  celebrate(notesValidation.createNoteSchema),
  notesControllers.createNoteController,
);

router.get(
  '/notes/:noteId',
  celebrate(notesValidation.noteIdSchema),
  notesControllers.getNoteByIdController,
);

router.delete(
  '/notes/:noteId',
  celebrate(notesValidation.noteIdSchema),
  notesControllers.deleteNoteController,
);

router.patch(
  '/notes/:noteId',
  celebrate(notesValidation.updateNoteSchema),
  notesControllers.updateNoteController,
);

router.use('/note-draft', authenticate);

router.get('/note-draft', notesControllers.getDraftController);

router.patch(
  '/note-draft',
  celebrate(notesValidation.updateDraftSchema),
  notesControllers.updateDraftController,
);

export default router;
