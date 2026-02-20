import crypto from 'crypto';
import { TWENTY_MINUTES, ONE_DAY } from '../constants/time.js';
import { Session } from '../models/session.js';

export const getSession = async (sessionId, refreshToken) => {
  const session = await Session.findOne({
    _id: sessionId,
    refreshToken,
  });

  return session;
};

export const createSession = async (userId) => {
  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + TWENTY_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });
};

export const deleteSession = async ({ sessionId, userId }) => {
  const query = { _id: sessionId };

  if (sessionId) {
    query.sessionId = sessionId;
  }

  if (userId) {
    query.userId = userId;
  }

  await Session.deleteOne(query);
};

export const setSessionCookies = (res, session) => {
  res.cookie('accessToken', session.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: TWENTY_MINUTES,
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });

  res.cookie('sessionId', session._id, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: ONE_DAY,
  });
};

export const clearSessionCookies = (res) => {
  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
};
