import { Note } from '../models/note.js';
import { Draft } from '../models/draft.js';

export const getNotes = async (userId, query = {}) => {
  const {
    page = 1,
    perPage = 10,
    tag,
    search,
    sortBy = '_id',
    sortOrder = 'desc',
  } = query;

  const skip = (page - 1) * perPage;

  const notesQuery = Note.find({ userId: userId });

  if (search) {
    notesQuery.where({ $text: { $search: search } });
  }
  if (tag) {
    notesQuery.where('tag').equals(tag);
  }

  const [totalNotes, notes] = await Promise.all([
    notesQuery.clone().countDocuments(),
    notesQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);

  const totalPages = Math.ceil(totalNotes / perPage);

  const notesData = { page, perPage, totalNotes, totalPages, notes };

  return notesData;
};

export const getNoteById = async (noteId, userId) => {
  const note = await Note.findOne({
    _id: noteId,
    userId,
  });

  return note;
};

export const createNote = async (userId, payload) => {
  const note = await Note.create({ ...payload, userId });

  return note;
};

export const updateNoteById = async (noteId, userId, payload) => {
  const note = await Note.findOneAndUpdate({ _id: noteId, userId }, payload, {
    new: true,
  });

  return note;
};

export const deleteNoteById = async (noteId, userId) => {
  const note = await Note.findOneAndDelete({
    _id: noteId,
    userId,
  });

  return note;
};

export const deleteAllNotes = async (userId) => {
  const userNotes = await Note.find({ userId });

  userNotes.forEach(async (note) => {
    await Note.findByIdAndDelete(note._id);
  });
};

export const getDraftById = async (userId) => {
  const draft = await Draft.findOne({ userId });

  return draft;
};

export const createDraft = async (userId) => {
  await Draft.create({ userId });
};

export const updateDraftById = async (userId, payload) => {
  const draft = await Draft.findOneAndUpdate({ userId }, payload, {
    new: true,
  });

  return draft;
};

export const deleteDraftById = async (userId) => {
  await Draft.findOneAndDelete({ userId });
};
