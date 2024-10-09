/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/appError';
import { TPost } from './post.intrface';
import { Post } from './post.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createPostIntoDB = async (
  authorId: string,
  payload: TPost,
  file?: any
) => {
  const postData = { ...payload, author: authorId, thumbnail: file?.path };
  const result = await Post.create(postData);
  return result;
};

const updatePostInDB = async (postId: string, payload: TPost, file?: any) => {
  const postData = { ...payload, thumbnail: file?.path };
  const result = await Post.findByIdAndUpdate(postId, postData, { new: true });
  return result;
};

const deletePostFromDB = async (postId: string) => {
  const result = await Post.findByIdAndDelete(postId);
  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['content', 'category'];

  const postQuery = new QueryBuilder(
    Post.find()
      .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name image' },
      })
      .populate('author', 'name image status'),
    query
  )
    .search(searchableFields)
    .fields()
    .sort()
    .filter();

  const result = await postQuery.queryModel;

  return {
    result,
  };
};

const getPostByIdFromDB = async (id: string) => {
  const result = await Post.findById(id).populate({
    path: 'comments',
    populate: { path: 'userId', select: 'name image' },
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found!');
  }

  return result;
};

// const updatePostInDB = async (
//   postId: string,
//   payload: Partial<TPost>,
//   authorId: string
// ) => {
//   const post = await Post.findById(postId);

//   // Check if the post exists and if the author is the same
//   if (!post || String(post.author) !== authorId) {
//     throw new Error(
//       'Post not found or user is not authorized to edit this post'
//     );
//   }

//   // Update the post
//   Object.assign(post, payload); // Merge the new values
//   const updatedPost = await post.save();
//   return updatedPost;
// };

const upvotePostInDB = async (postId: string, userId: string) => {
  return Post.upvotePost(postId, userId);
};

const downvotePostInDB = async (postId: string, userId: string) => {
  return Post.downvotePost(postId, userId);
};

export {
  createPostIntoDB,
  upvotePostInDB,
  downvotePostInDB,
  updatePostInDB,
  getAllPostsFromDB,
  getPostByIdFromDB,
  deletePostFromDB,
};
