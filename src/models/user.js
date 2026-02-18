import { model, Schema } from 'mongoose';
import { DEFAULT_AVATAR } from '../constants/defaultFiles.js';

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
      default: DEFAULT_AVATAR,
    },
    notesAmount: { type: Number, required: false, default: 0 },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.virtual('id').get(function () {
  return this._id.toString();
});

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
