import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { Session } from '../models/session.js';

export const getUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUser = async (req, res) => {
  if (req.body.password) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;
  }

  const user = await User.findOneAndUpdate({ _id: req.user._id }, req.body, {
    new: true,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  res.status(200).json(user);
};

export const updateUserAvatar = async (req, res) => {
  const { file } = req;
  if (!file) {
    throw createHttpError(400, 'No file');
  }

  const result = await saveFileToCloudinary(file.buffer);

  const user = await User.findByIdAndUpdate(
    req.user._id,
    { avatar: result.secure_url },
    { new: true },
  );

  res.status(200).json({ url: user.avatar });
};

export const deleteUser = async (req, res) => {
  const { sessionId } = req.cookies;

  await User.findByIdAndDelete(req.user._id);

  if (sessionId) {
    await Session.deleteOne({ _id: sessionId });
  }

  res.clearCookie('sessionId');
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');

  res.status(204).send();
};
