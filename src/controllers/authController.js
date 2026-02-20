import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import * as authService from '../services/auth.js';
import { createUser, getUserByEmail } from '../services/user.js';
import { createDraft } from '../services/notes.js';

export const registerUserController = async (req, res) => {
  const newUser = await createUser(req.body);

  await createDraft(newUser._id);

  const newSession = await authService.createSession(newUser._id);

  authService.setSessionCookies(res, newSession);

  res.status(201).json(newUser);
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) {
    throw createHttpError(401, 'Invalid credentials');
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw createHttpError(401, 'Invalid credentials');
  }

  await authService.deleteSession({ userId: user._id });
  const newSession = await authService.createSession(user._id);

  authService.setSessionCookies(res, newSession);

  res.status(200).json(user);
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;

  if (sessionId) {
    await authService.deleteSession({ sessionId });
  }

  authService.clearSessionCookies(res);

  res.status(204).send();
};

export const getUserSessionController = async (req, res, next) => {
  try {
    const { sessionId, refreshToken } = req.cookies;

    if (!sessionId || !refreshToken) {
      throw createHttpError(401, 'Missing session credentials');
    }

    const session = await authService.getSession(sessionId, refreshToken);
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
      new Date() > new Date(session.refreshTokenValidUntil);

    if (isSessionTokenExpired) {
      throw createHttpError(401, 'Session token expired');
    }

    await authService.deleteSession({ userId: session.userId });

    const newSession = await authService.createSession(session.userId);
    await authService.setSessionCookies(res, newSession);

    return res
      .status(200)
      .json({ success: true, message: 'Session refreshed' });
  } catch (error) {
    next(error);
  }
};
