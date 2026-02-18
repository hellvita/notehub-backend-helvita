import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { createSession, setSessionCookies } from '../services/auth.js';
import { Session } from '../models/session.js';
import { Note } from '../models/note.js';

export const registerUser = async (req, res) => {
  const { email, password } = req.body;

  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  const newSession = await createSession(newUser._id);

  setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await Session.deleteOne({ userId: user._id });
  const newSession = await createSession(user._id);

  setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUser = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

export const getUserSession = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Missing session credentials');
    }

    const session = await Session.findOne({
      _id: sessionId,
      refreshToken: refreshToken,
    });

    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
      new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
      throw createHttpError(401, 'Session token expired');
    }

    await Session.deleteOne({
      _id: sessionId,
      refreshToken: refreshToken,
    });

    const newSession = await createSession(session.userId);
    await setSessionCookies(res, newSession);

    return res
      .status(200)
      .json({ success: true, message: 'Session refreshed' });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res) => {
  const { sessionId } = req.cookies;

  await User.findByIdAndDelete(req.user._id);

  const userNotes = await Note.find({ userId: req.user._id });

  userNotes.forEach(async (note) => {
    await Note.findByIdAndDelete(note._id);
  });

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
