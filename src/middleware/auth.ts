import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import httpStatus from 'http-status';
import { User } from '../modules/User/user.model';
import AppError from '../error/appError';
import config from '../config';

export const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;

    const { email, role, iat } = decoded;

    // check is valid user
    const validUser = await User.isValidUser(email);

    if (
      validUser?.passwordChangeAt &&
      User.isJWTIssuedBeforePasswordChange(
        validUser.passwordChangeAt,
        iat as number
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You do not have permission to perform this action'
      );
    }
    req.user = decoded;
    next();
  });
};
