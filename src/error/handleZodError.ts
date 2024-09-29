import { ZodError, ZodIssue } from 'zod';
import httpStatus from 'http-status';
import AppError from './appError';

const handelZodError = (err: ZodError) => {
  let message: string = '';

  err.issues.map((issue: ZodIssue) => {
    message = issue.message;
  });

  return new AppError(httpStatus.BAD_REQUEST, message);
};

export default handelZodError;
