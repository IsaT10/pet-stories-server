import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  createUserIntoDB,
  followUserIntoDB,
  getAllUsersFromDB,
  getMeFromDB,
  unfollowUserFromDB,
  updateUserIntoDB,
} from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const data = await createUserIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user create succefully',
    data,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const data = await getAllUsersFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user retrived succefully',
    data,
  });
});

// const getSingleUser = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.params;
//   const data = await getSingleUserFromDB(id);

//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'user retrived succefully',
//     data,
//   });
// });

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = await getMeFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Profile retrived succefully',
    data,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = await updateUserIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'user updated succefully',
    data,
  });
});

const followUserController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const { targetUserId } = req.params;

  const data = await followUserIntoDB(id, targetUserId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User followed successfully',
    data,
  });
});
const unfollowserController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user;

    const { targetUserId } = req.params;

    const data = await unfollowUserFromDB(id, targetUserId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'User followed successfully',
      data,
    });
  }
);

export {
  createUser,
  getAllUsers,
  updateUser,
  // getSingleUser,
  followUserController,
  unfollowserController,
  getMe,
};
