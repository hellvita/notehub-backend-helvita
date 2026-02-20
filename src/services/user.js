import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';

export const createUser = async (payload) => {
  const { email, password } = payload;

  const isEmailInUse = await User.findOne({ email });
  if (isEmailInUse) {
    throw createHttpError(400, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, password: hashedPassword });

  return newUser;
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId);

  return user;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email });

  return user;
};

export const updateUserById = async (userId, payload) => {
  const user = await User.findByIdAndUpdate(userId, payload, {
    new: true,
  });

  return user;
};

export const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
};
