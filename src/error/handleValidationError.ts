import mongoose from 'mongoose';
import httpStatus from 'http-status';
import AppError from './appError';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  let message = '';
  Object.values(err.errors).map(
    (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      message = `${val?.path.toUpperCase()} is required`;
    }
  );

  return new AppError(httpStatus.BAD_REQUEST, message);
};

export default handleValidationError;
