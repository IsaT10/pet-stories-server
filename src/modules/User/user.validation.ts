import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is required' })
      .regex(
        /^[A-Z][a-z]*$/,
        'First name must start with a capital letter followed by lowercase letters.'
      ),

    email: z
      .string({ required_error: 'Email is required' })
      .email('Provide a valid email.'),

    password: z
      .string({ required_error: 'Password is required' })
      .min(8, 'Password can not be less than 8 character'),

    passwordChangeAt: z
      .string({ required_error: 'Password is required' })
      .optional(),

    role: z.string({ required_error: 'Role is required' }),
  }),
});

export { createUserValidationSchema };
