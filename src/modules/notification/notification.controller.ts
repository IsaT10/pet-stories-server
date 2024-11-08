import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import {
  getAllNotificationByUserFromDB,
  readNotificationFromDB,
} from './notification.service';
// import {
//   createCommentIntoDB,
//   getCommentByIdFromDB,
//   updateCommentInDB,
//   deleteCommentFromDB,
// } from './comment.service';

// const createNotification = catchAsync(async (req: Request, res: Response) => {
//   const { id } = req.user;
//   const { userId } = req.params;
//   const data = await createCommentIntoDB(userId, id);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.CREATED,
//     message: 'Comment created successfully',
//     data,
//   });
// });

const getAllNotificationByUser = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const data = await getAllNotificationByUserFromDB(id);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Notifications retrieved successfully',
      data,
    });
  }
);

const readNotification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;

  const data = await readNotificationFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Read all notifications',
    data,
  });
});

// const deleteComment = catchAsync(async (req: Request, res: Response) => {
//   const { commentId } = req.params;
//   await deleteCommentFromDB(commentId);
//   sendResponse(res, {
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'Comment deleted successfully',
//     data: null,
//   });
// });

export { getAllNotificationByUser, readNotification };
