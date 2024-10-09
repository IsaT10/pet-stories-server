import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createCommentIntoDB,
  getCommentByIdFromDB,
  updateCommentInDB,
  deleteCommentFromDB,
} from './comment.service';

const createComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { postId } = req.params;
  const data = await createCommentIntoDB(id, postId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Comment created successfully',
    data,
  });
});

const getCommentById = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  const data = await getCommentByIdFromDB(commentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment retrieved successfully',
    data,
  });
});

const updateComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;

  const data = await updateCommentInDB(commentId, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment updated successfully',
    data,
  });
});

const deleteComment = catchAsync(async (req: Request, res: Response) => {
  const { commentId } = req.params;
  await deleteCommentFromDB(commentId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Comment deleted successfully',
    data: null,
  });
});

export { createComment, getCommentById, updateComment, deleteComment };
