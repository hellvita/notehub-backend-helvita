import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import * as userService from '../services/user.js';
import { deleteSession, clearSessionCookies } from '../services/auth.js';
import { deleteAllNotes, deleteDraftById } from '../services/notes.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const getUserController = async (req, res) => {
  const user = await userService.getUserById(req.user._id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUserController = async (req, res) => {
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;
  }

  const user = userService.updateUserById(req.user._id, req.body);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUserAvatarController = async (req, res) => {
  const { file } = req;
  if (!file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(file.buffer);

  const user = await userService.updateUserById(req.user._id, {
    avatar: result.secure_url,
  });

  res.status(200).json({ url: user.avatar });
};

export const deleteUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  await userService.deleteUser(req.user._id);

  await deleteAllNotes(req.user._id);

  await deleteDraftById(req.user._id);

  if (sessionId) {
    await deleteSession({ sessionId });
  }

  clearSessionCookies(res);

  res.status(204).send();
};
