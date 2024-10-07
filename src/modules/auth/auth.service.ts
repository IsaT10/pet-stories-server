/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TLogin, TRegister } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { createToken } from './authutils';
import { User } from '../User/user.model';
import config from '../../config';
import AppError from '../../error/appError';
import { TUser } from '../User/user.interface';
import { sendEmail } from '../../utils/sendEmail';
import { decodedToken } from '../../utils/decodedToken';

const registerUserIntoDB = async (payload: TRegister, file?: any) => {
  const userData = { ...payload, image: file?.path };
  const result = await User.create(userData);

  const jwtPayload = {
    id: result._id,
    email: result.email,
    name: result.name,
    role: result.role,
    status: result.status,
    image: result.image,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  return { result, accessToken };
};

const loginUserDB = async (payload: TLogin) => {
  const validUser = (await User.isValidUser(payload?.email)) as TUser & {
    _id: string;
  };

  const isPasswordMatch = await User.isPasswordMatch(
    payload.password,
    validUser.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched!');
  }

  const jwtPayload = {
    id: validUser._id,
    name: validUser.name,
    email: validUser.email,
    role: validUser.role,
    status: validUser.status,
    image: validUser.image,
  };

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires as string
  );

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );

  return {
    accessToken,
    refreshToken,
    // needsPasswordChange: validUser.needsPasswordChange,
  };
};

const changeUserPassword = async (
  user: JwtPayload,
  paylod: { oldPassword: string; newPassword: string }
) => {
  const { email, role } = user;

  if (paylod.newPassword === paylod.oldPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'New password have to be different from old password'
    );
  }

  const validUser = await User.isValidUser(email);

  const isPasswordMatch = await User.isPasswordMatch(
    paylod.oldPassword,
    validUser.password
  );

  if (!isPasswordMatch) {
    throw new AppError(httpStatus.FORBIDDEN, 'Old password do not matched!');
  }

  const newHashPassword = await bcrypt.hash(
    paylod.newPassword,
    Number(process.env.SALT_ROUNDS)
  );

  await User.findOneAndUpdate(
    { email, role },
    {
      password: newHashPassword,
      passwordChangeAt: new Date(),
    }
  );

  return null;
};

const refreshTokenFromServer = async (token: string) => {
  const decoded = jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string
  ) as JwtPayload;
  const { email, iat } = decoded;

  // check is valid user
  const validUser = (await User.isValidUser(email)) as TUser & { _id: string };
  if (
    validUser?.passwordChangeAt &&
    User.isJWTIssuedBeforePasswordChange(
      validUser.passwordChangeAt,
      iat as number
    )
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
  }
  const jwtPayload = {
    id: validUser._id,
    email: validUser.email,
    role: validUser.role,
  };
  const accessToken = createToken(
    jwtPayload,
    process.env.JWT_ACCESS_SECRET as string,
    process.env.JWT_ACCESS_EXPIRES_IN as string
  );
  return { accessToken };
};

const forgetPasswordInDB = async (email: string) => {
  // check is valid user
  const user = await User.isValidUser(email);

  const jwtPayload = { email: user.email, role: user.role };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  );
  const resetLink = `${config.reset_password_url}/reset-password?email=${user.email}&token=${resetToken}`;
  sendEmail(user.email, resetLink);
};

const resetPasswordInDB = async (
  payload: { email: string; newPassword: string },
  token: string
) => {
  // check is valid user
  const user = await User.isValidUser(payload.email);
  const { email, role } = decodedToken(
    token,
    config.jwt_access_secret as string
  );
  if (email !== user.email) {
    throw new AppError(httpStatus.FORBIDDEN, 'You are forbidden');
  }
  const newHashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(process.env.SALT_ROUNDS)
  );
  await User.findOneAndUpdate(
    { email, role },
    {
      password: newHashPassword,
      passwordChangeAt: new Date(),
    }
  );
};

export {
  loginUserDB,
  changeUserPassword,
  refreshTokenFromServer,
  forgetPasswordInDB,
  resetPasswordInDB,
  registerUserIntoDB,
};
