import { TPost } from './post.intrface';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload);
  return result;
};

const getPostsFromDB = async (filter: {
  category?: 'Tips' | 'Story';
  isPremium?: boolean;
}) => {};

const getPostByIdFromDB = async (id: string) => {
  const result = await Post.findById(id).populate({
    path: 'comments',
    populate: { path: 'userId' },
  });

  return result;
};

const updatePostInDB = async (
  postId: string,
  payload: Partial<TPost>,
  authorId: string
) => {
  const post = await Post.findById(postId);

  // Check if the post exists and if the author is the same
  if (!post || String(post.author) !== authorId) {
    throw new Error(
      'Post not found or user is not authorized to edit this post'
    );
  }

  // Update the post
  Object.assign(post, payload); // Merge the new values
  const updatedPost = await post.save();
  return updatedPost;
};

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
  getPostsFromDB,
  getPostByIdFromDB,
};
