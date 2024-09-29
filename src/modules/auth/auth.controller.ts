import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {
  changeUserPassword,
  forgetPasswordInDB,
  loginUserDB,
  refreshTokenFromServer,
  registerUserIntoDB,
  resetPasswordInDB,
} from './auth.service';

const registerUser = catchAsync(async (req, res) => {
  const data = await registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data,
    success: true,
    message: 'User register successfully',
  });
});

const loginUser = catchAsync(async (req, res) => {
  const data = await loginUserDB(req.body);

  const { refreshToken, accessToken } = data;

  res.cookie('refreshToken', refreshToken, {
    secure: process.env.NODE_ENV === 'production' && true,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: { accessToken },
    success: true,
    message: 'User login successfully',
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...password } = req.body;
  const data = await changeUserPassword(req.user, password);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: data,
    success: true,
    message: 'Successfully changed password',
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const data = await refreshTokenFromServer(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: data,
    success: true,
    message: 'Send a access token',
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const data = await forgetPasswordInDB(email);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: data,
    success: true,
    message: 'Generate a link successfully',
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers?.authorization?.split(' ')[1];
  const data = await resetPasswordInDB(req.body, token!);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    data: data,
    success: true,
    message: 'Password reset successfully',
  });
});

export {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
  registerUser,
};
