import createHttpError from 'http-errors';
import * as notesService from '../services/notes.js';

export const getAllNotesController = async (req, res) => {
  const { page, perPage, tag, search, sortBy, sortOrder } = req.query;

  const notesData = await notesService.getNotes(req.user._id, {
    page,
    perPage,
    tag,
    search,
    sortBy,
    sortOrder,
  });

  res.status(200).json(notesData);
};

export const getNoteByIdController = async (req, res) => {
  const { noteId } = req.params;

  const note = await notesService.getNoteById(noteId, req.user._id);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const createNoteController = async (req, res) => {
  const note = await notesService.createNote(req.user._id, req.body);

  res.status(201).json(note);
};

export const updateNoteController = async (req, res) => {
  const { noteId } = req.params;

  const note = await notesService.updateNoteById(
    noteId,
    req.user._id,
    req.body,
  );

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const deleteNoteController = async (req, res) => {
  const { noteId } = req.params;

  const note = await notesService.deleteNoteById(noteId, req.user._id);

  if (!note) {
    throw createHttpError(404, 'Note not found');
  }

  res.status(200).json(note);
};

export const getDraftController = async (req, res) => {
  const draft = await notesService.getDraftById(req.user._id);

  if (!draft) {
    throw createHttpError(404, 'Draft not found');
  }

  res.status(200).json(draft);
};

export const updateDraftController = async (req, res) => {
  const draft = await notesService.updateDraftById(req.user._id, req.body);

  if (!draft) {
    throw createHttpError(404, 'Draft not found');
  }

  res.status(200).json(draft);
};
