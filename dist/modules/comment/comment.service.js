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
exports.deleteCommentFromDB = exports.updateCommentInDB = exports.getCommentByIdFromDB = exports.createCommentIntoDB = void 0;
const appError_1 = __importDefault(require("../../error/appError"));
const comment_model_1 = require("./comment.model");
const http_status_1 = __importDefault(require("http-status"));
const createCommentIntoDB = (userId, postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.create(Object.assign(Object.assign({}, payload), { userId, postId }));
    return result;
});
exports.createCommentIntoDB = createCommentIntoDB;
const getCommentByIdFromDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.findById(commentId)
        .populate('userId', 'name')
        .populate('postId', 'content category');
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found!');
    }
    return result;
});
exports.getCommentByIdFromDB = getCommentByIdFromDB;
const updateCommentInDB = (commentId, text) => __awaiter(void 0, void 0, void 0, function* () {
    const comment = yield comment_model_1.Comment.findById(commentId);
    if (!comment) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found!');
    }
    comment.comment = text;
    return comment.save();
});
exports.updateCommentInDB = updateCommentInDB;
const deleteCommentFromDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.findByIdAndDelete(commentId);
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Comment not found!');
    }
    return result;
});
exports.deleteCommentFromDB = deleteCommentFromDB;