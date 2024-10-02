import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string({ required_error: 'Text is required' }).trim(),
    // userId: z.string({ required_error: 'User ID is required' }),
    // postId: z.string({ required_error: 'Post ID is required' }),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string({ required_error: 'Text is required' }).trim(),
  }),
});

export { createCommentValidationSchema, updateCommentValidationSchema };
