import createHttpError from 'http-errors';
import { getSession } from '../services/auth.js';
import { getUserById } from '../services/user.js';

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    throw createHttpError(401, 'Missing access token');
  }

  const session = await getSession({ accessToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isAccessTokenExpired =
    new Date() > new Date(session.accessTokenValidUntil);
  if (isAccessTokenExpired) {
    throw createHttpError(401, 'Access token expired');
  }

  const user = await getUserById(session.userId);
  if (!user) {
    throw createHttpError(401);
  }

  req.user = user;

  next();
};
