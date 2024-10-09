import AppError from '../../error/appError';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';
import httpStatus from 'http-status';

const createCommentIntoDB = async (
  userId: string,
  postId: string,
  payload: TComment
) => {
  const result = await Comment.create({ ...payload, userId, postId });
  return result;
};

const getCommentByIdFromDB = async (commentId: string) => {
  const result = await Comment.findById(commentId)
    .populate('userId', 'name')
    .populate('postId', 'content category');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');
  }
  return result;
};

const updateCommentInDB = async (commentId: string, payload: TComment) => {
  const comment = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  });
  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');
  }

  return comment.save();
};

const deleteCommentFromDB = async (commentId: string) => {
  const result = await Comment.findByIdAndDelete(commentId);
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');
  }
  return result;
};

export {
  createCommentIntoDB,
  getCommentByIdFromDB,
  updateCommentInDB,
  deleteCommentFromDB,
};
