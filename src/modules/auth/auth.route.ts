import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import {
  ChangePasswordValidationSchema,
  ForgetPasswordValidationSchema,
  LoginValidationSchema,
  RefreshTokenValidationSchema,
  RegisterValidationSchema,
  ResetPasswordValidationSchema,
} from './auth.validation';
import {
  changePassword,
  forgetPassword,
  loginUser,
  refreshToken,
  registerUser,
  resetPassword,
} from './auth.controller';
import { auth } from '../../middleware/auth';

const router = express.Router();

router.post('/login', validateRequest(LoginValidationSchema), loginUser);

router.post(
  '/change-password',
  auth('admin', 'user'),
  validateRequest(ChangePasswordValidationSchema),
  changePassword
);

router.post(
  '/register',
  validateRequest(RegisterValidationSchema),
  registerUser
);

router.post(
  '/refresh-token',
  validateRequest(RefreshTokenValidationSchema),
  refreshToken
);

router.post(
  '/forget-password',
  validateRequest(ForgetPasswordValidationSchema),
  forgetPassword
);

router.post(
  '/reset-password',
  validateRequest(ResetPasswordValidationSchema),
  resetPassword
);

export default router;
