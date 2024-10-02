import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createPostIntoDB,
  upvotePostInDB,
  downvotePostInDB,
  getPostByIdFromDB,
} from './post.service';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const data = await createPostIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Post created successfully',
    data,
  });
});

const getPostById = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const data = await getPostByIdFromDB(postId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post retrieved successfully',
    data,
  });
});

const upvotePostController = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const { id } = req.user;

  const data = await upvotePostInDB(postId, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post upvoted successfully',
    data,
  });
});

const downvotePostController = catchAsync(
  async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { userId } = req.query;

    const data = await downvotePostInDB(postId, userId as string);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Post downvoted successfully',
      data,
    });
  }
);

export {
  createPost,
  upvotePostController,
  downvotePostController,
  getPostById,
};
