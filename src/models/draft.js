import { Schema, model } from 'mongoose';
import { TAGS } from '../constants/tags.js';

const draftSchema = new Schema(
  {
    title: { type: String, required: false, default: '', trim: true },
    content: { type: String, required: false, default: '', trim: true },
    tag: {
      type: String,
      required: false,
      enum: TAGS,
      default: 'Todo',
    },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

draftSchema.virtual('id').get(function () {
  return this._id.toString();
});

export const Draft = model('Draft', draftSchema);
