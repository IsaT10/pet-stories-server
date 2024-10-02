import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).trim(),
    email: z
      .string({ required_error: 'Email is required' })
      .email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }),
    role: z.enum(['admin', 'user']).default('user'),
    status: z.enum(['basic', 'premium', 'blocked']).default('basic'),
    passwordChangeAt: z.string().optional(),
    packageExpireAt: z.string().optional(),
    isDeleted: z.boolean().default(false),
    followers: z.array(z.string()).optional(),
    following: z.array(z.string()).optional(),
  }),
});

export { createUserValidationSchema };
