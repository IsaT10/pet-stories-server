import { z } from 'zod';

// Validation schema for creating a post
const createPostValidationSchema = z.object({
  body: z.object({
    // title: z
    //   .string({ required_error: 'Title is required' })
    //   .trim()
    //   .min(3, { message: 'Title must be at least 3 characters long.' })
    //   .max(100, { message: 'Title must be at most 100 characters long.' }),
    content: z
      .string({ required_error: 'Content is required' })
      .trim()
      .min(10, { message: 'Content must be at least 10 characters long.' }),
    category: z.enum(['Tips', 'Story'], {
      required_error: 'Category is required',
    }),
    images: z
      .array(z.string().url(), {
        required_error: 'Images must be an array of valid URLs.',
      })
      .optional(),
    isPremium: z.boolean(),
    author: z.string({ required_error: 'User ID is required' }),
  }),
});

// Export the validation schemas
export { createPostValidationSchema };
