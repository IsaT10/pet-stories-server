import { Notification } from './notification.model';

// const createCommentIntoDB = async (user: string, fromUser: string) => {
//   const result = await Comment.create({ ...payload, userId, postId });
//   return result;
// };

const getAllNotificationByUserFromDB = async (userId: string) => {
  const result = await Notification.find({ user: userId })
    .populate('fromUser', 'name image')
    .sort({ createdAt: -1 });

  return result;
};

const readNotificationFromDB = async (userId: string) => {
  await Notification.updateMany(
    { user: userId, isRead: false },
    { isRead: true },
    { new: true }
  );

  return;
};

// const deleteCommentFromDB = async (commentId: string) => {
//   const result = await Comment.findByIdAndDelete(commentId);
//   if (!result) {
//     throw new AppError(httpStatus.NOT_FOUND, 'Comment not found!');
//   }
//   return result;
// };

export { getAllNotificationByUserFromDB, readNotificationFromDB };
