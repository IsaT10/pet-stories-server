"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotificationFromDB = exports.getAllNotificationByUserFromDB = void 0;
const notification_model_1 = require("./notification.model");
// const createCommentIntoDB = async (user: string, fromUser: string) => {
//   const result = await Comment.create({ ...payload, userId, postId });
//   return result;
// };
const getAllNotificationByUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_model_1.Notification.find({ user: userId })
        .populate('fromUser', 'name image')
        .sort({ createdAt: -1 });
    return result;
});
exports.getAllNotificationByUserFromDB = getAllNotificationByUserFromDB;
const readNotificationFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    yield notification_model_1.Notification.updateMany({ user: userId, isRead: false }, { isRead: true }, { new: true });
    return;
});
exports.readNotificationFromDB = readNotificationFromDB;
