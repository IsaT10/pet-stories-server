/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { TUser } from './user.interface';
import { User } from './user.model';
import handleValidationError from '../../error/handleValidationError';
import handleDuplicateError from '../../error/handleDuplicate';
import httpStatus from 'http-status';
import AppError from '../../error/appError';

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = ['name', 'email'];

  const userQuery = new QueryBuilder(User.find(), query)
    .search(searchableFields)
    .fields()
    .pagination()
    .sort()
    .filter();

  const result = await userQuery.queryModel;
  const meta = await userQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleUserFromDB = async (id: string) => {
  const result = await User.findById(id)
    .populate('following', 'name email')
    .populate('followers', 'name email')
    .exec();

  return result;
};

// const getSingleUserFromDB = async (id: string[]) => {
//   const result = await User.findById(id)
//     .populate('following', 'name email')
//     .populate('followers', 'name email')
//     .exec();

//   return result;
// };

const getMeFromDB = async (id: string) => {
  const result = await User.findById(id)
    .populate('following', 'name image')
    .populate('followers', 'name image')
    .populate({
      path: 'posts',
      populate: { path: 'author', select: 'name image' },
    })
    .exec();

  return result;
};

const updateUserIntoDB = async (
  id: string,
  payload: Partial<TUser>,
  file?: any
) => {
  console.log(payload);
  const userData = { ...payload, image: file?.path };
  const result = await User.findByIdAndUpdate(id, userData, { new: true });

  return result;
};

const followUserIntoDB = async (
  currentUserId: string,
  targetUserId: string
) => {
  if (currentUserId === targetUserId) {
    throw new Error("You can't follow yourself");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { following: targetUserId } },
      { new: true, session }
    );

    await User.findByIdAndUpdate(
      targetUserId,
      { $addToSet: { followers: currentUserId } },
      { new: true, session }
    );

    await session.commitTransaction();
    await session.endSession();

    return updatedCurrentUser;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    console.error(error);

    if (error?.name === 'ValidationError') {
      throw handleValidationError(error);
    }

    if (error?.code === 11000) {
      throw handleDuplicateError(error);
    }

    // Handle any other types of errors
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

const unfollowUserFromDB = async (
  currentUserId: string,
  targetUserId: string
) => {
  if (currentUserId === targetUserId) {
    throw new Error("You can't unfollow yourself");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Remove the target user from the following list of the current user
    const updatedCurrentUser = await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: targetUserId } },
      { new: true, session }
    );

    // Remove the current user from the followers list of the target user
    await User.findByIdAndUpdate(
      targetUserId,
      { $pull: { followers: currentUserId } },
      { new: true, session }
    );

    // Commit the transaction if both updates are successful
    await session.commitTransaction();
    await session.endSession();

    return updatedCurrentUser;
  } catch (error: any) {
    // Abort the transaction if there is an error
    await session.abortTransaction();
    await session.endSession();

    console.error(error);

    if (error?.name === 'ValidationError') {
      throw handleValidationError(error);
    }

    if (error?.code === 11000) {
      throw handleDuplicateError(error);
    }

    // Handle any other types of errors
    throw new AppError(httpStatus.INTERNAL_SERVER_ERROR, error.message);
  }
};

export {
  createUserIntoDB,
  getAllUsersFromDB,
  updateUserIntoDB,
  followUserIntoDB,
  getSingleUserFromDB,
  // getArrayOfUsersFromDB,
  unfollowUserFromDB,
  getMeFromDB,
};
