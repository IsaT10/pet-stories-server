import { z } from 'zod';

const createCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string({ required_error: 'Text is required' }).trim(),
  }),
});

const updateCommentValidationSchema = z.object({
  body: z.object({
    comment: z.string({ required_error: 'Text is required' }).trim(),
  }),
});

export { createCommentValidationSchema, updateCommentValidationSchema };
