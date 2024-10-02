/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export interface TPost {
  content: string;
  category: 'Tips' | 'Story';
  images: string[];
  author: Types.ObjectId;
  upvotes: Types.ObjectId;
  downvotes: Types.ObjectId;
  isPremium: boolean;
}

export interface PostModel extends Model<TPost> {
  upvotePost: (postId: string, userId: string) => Promise<TPost>;
  downvotePost: (postId: string, userId: string) => Promise<TPost>;
}
