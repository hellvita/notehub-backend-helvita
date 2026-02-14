import { model, Schema } from 'mongoose';
import path from 'node:path';

const avatarPath = path.join('src', 'public', 'default-avatar.jpg');

const userSchema = new Schema(
  {
    username: { type: String, trim: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, trim: true },
    avatar: {
      type: String,
      required: false,
      default: avatarPath,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre('save', function () {
  if (!this.username) {
    this.username = this.email.split('@')[0];
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();

  delete obj.password;

  return obj;
};

export const User = model('User', userSchema);
