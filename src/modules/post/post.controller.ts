import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createPostIntoDB,
  upvotePostInDB,
  downvotePostInDB,
  getPostByIdFromDB,
  getAllPostsFromDB,
  updatePostInDB,
  deletePostFromDB,
} from './post.service';

const createPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = await createPostIntoDB(id, req.body, req?.file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Post created successfully',
    data,
  });
});
const updatePost = catchAsync(async (req: Request, res: Response) => {
  // const { id } = req.user;
  const { postId } = req.params;
  const data = await updatePostInDB(postId, req.body, req?.file);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Post updated successfully',
    data,
  });
});

const getAllPosts = catchAsync(async (req: Request, res: Response) => {
  const data = await getAllPostsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts retrieved successfully',
    data,
  });
});
const deletePost = catchAsync(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const data = await deletePostFromDB(postId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Posts deleted successfully',
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
    const { id } = req.user;

    const data = await downvotePostInDB(postId, id);
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
  getAllPosts,
  updatePost,
  deletePost,
};
