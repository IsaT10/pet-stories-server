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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readNotification = exports.getAllNotificationByUser = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const notification_service_1 = require("./notification.service");
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
const getAllNotificationByUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = yield (0, notification_service_1.getAllNotificationByUserFromDB)(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Notifications retrieved successfully',
        data,
    });
}));
exports.getAllNotificationByUser = getAllNotificationByUser;
const readNotification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.user;
    const data = yield (0, notification_service_1.readNotificationFromDB)(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Read all notifications',
        data,
    });
}));
exports.readNotification = readNotification;
