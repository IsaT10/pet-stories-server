import { Schema, model } from 'mongoose';
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { PostModel, TPost } from './post.intrface';

const PostSchema = new Schema<TPost>(
  {
    // title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, enum: ['Tips', 'Story'], required: true },
    thumbnail: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    isPremium: { type: Boolean },
    isPublish: { type: Boolean },
    upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Upvote a post
PostSchema.statics.upvotePost = async function (
  postId: string,
  userId: string
) {
  const post = await this.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  // If user is already in upvotes, remove them (decrement by 1)
  if (post.upvotes.includes(userId)) {
    await this.findByIdAndUpdate(postId, { $pull: { upvotes: userId } });
  } else {
    // If user is in downvotes, remove them (decrement by 2)
    if (post.downvotes.includes(userId)) {
      await this.findByIdAndUpdate(postId, {
        $pull: { downvotes: userId },
        $addToSet: { upvotes: userId }, // Add to upvotes
      });
    } else {
      // Add user to upvotes (increment by 1)
      await this.findByIdAndUpdate(postId, {
        $addToSet: { upvotes: userId },
      });
    }
  }

  return this.findById(postId); // Return the updated post
};

// Downvote a post
PostSchema.statics.downvotePost = async function (
  postId: string,
  userId: string
) {
  const post = await this.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  // If user is already in downvotes, remove them (decrement by 1)
  if (post.downvotes.includes(userId)) {
    await this.findByIdAndUpdate(postId, {
      $pull: { downvotes: userId },
    });
  } else {
    // If user is in upvotes, remove them (decrement by 2)
    if (post.upvotes.includes(userId)) {
      await this.findByIdAndUpdate(postId, {
        $pull: { upvotes: userId },
        $addToSet: { downvotes: userId }, // Add to downvotes
      });
    } else {
      // Add user to downvotes (increment by 1)
      await this.findByIdAndUpdate(postId, {
        $addToSet: { downvotes: userId },
      });
    }
  }

  return this.findById(postId);
};

PostSchema.virtual('comments', {
  ref: 'Comment',
  foreignField: 'postId',
  localField: '_id',
});

export const Post = model<TPost, PostModel>('Post', PostSchema);
