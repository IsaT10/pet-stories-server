import { Schema, model } from 'mongoose';
import { TComment } from './comment.interface';

const CommentSchema = new Schema<TComment>(
  {
    comment: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Comment = model<TComment>('Comment', CommentSchema);
