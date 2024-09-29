import httpStatus from 'http-status';
import AppError from './appError';

const handleDuplicateError = (err: any) => {
  const values = Object.values(err.keyValue);
  const message = `'${values.join(' ')}' is already exists. Use another value!`;

  return new AppError(httpStatus.BAD_REQUEST, message);
};

export default handleDuplicateError;
