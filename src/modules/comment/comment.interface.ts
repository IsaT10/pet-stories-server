import { Types } from "mongoose";

export interface TComment {
  comment: string;
  userId: Types.ObjectId;
  postId: Types.ObjectId;
}
