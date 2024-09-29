import { z } from 'zod';

const LoginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
const RegisterValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name required' }),
    email: z.string({ required_error: 'Email is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
});

const ChangePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required.' }),
    newPassword: z
      .string({ required_error: 'New password is required.' })
      .min(6, 'Password can not be less than 6 character'),
  }),
});

const RefreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required!' }),
  }),
});

const ForgetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }),
  }),
});

const ResetPasswordValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'User email is required' }),
    newPassword: z.string({ required_error: 'New password id is required' }),
  }),
});

export {
  LoginValidationSchema,
  ChangePasswordValidationSchema,
  RefreshTokenValidationSchema,
  ForgetPasswordValidationSchema,
  ResetPasswordValidationSchema,
  RegisterValidationSchema,
};
