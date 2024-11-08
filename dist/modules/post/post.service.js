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
exports.updateSahredPostInDB = exports.sharePostInDB = exports.updatePostStatusInDB = exports.deletePostFromDB = exports.getPostByIdFromDB = exports.getAllPostsFromDB = exports.updatePostInDB = exports.downvotePostInDB = exports.upvotePostInDB = exports.createPostIntoDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const post_model_1 = require("./post.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const notification_model_1 = require("../notification/notification.model");
const createPostIntoDB = (authorId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = Object.assign(Object.assign({}, payload), { author: authorId, thumbnail: file === null || file === void 0 ? void 0 : file.path });
    const result = yield post_model_1.Post.create(postData);
    return result;
});
exports.createPostIntoDB = createPostIntoDB;
const updatePostInDB = (postId, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const postData = Object.assign(Object.assign({}, payload), { thumbnail: file === null || file === void 0 ? void 0 : file.path });
    const result = yield post_model_1.Post.findByIdAndUpdate(postId, postData, { new: true });
    return result;
});
exports.updatePostInDB = updatePostInDB;
const deletePostFromDB = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndDelete(postId);
    return result;
});
exports.deletePostFromDB = deletePostFromDB;
const updateSahredPostInDB = (postId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(postId, payload, { new: true });
    return result;
});
exports.updateSahredPostInDB = updateSahredPostInDB;
const sharePostInDB = (postId, userId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const postToShare = yield post_model_1.Post.findById(postId);
    if (!postToShare) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post to share not found!');
    }
    const sharedPost = yield post_model_1.Post.create({
        content: postToShare.content,
        category: postToShare.category,
        thumbnail: postToShare.thumbnail,
        sharedText: payload.sharedText,
        author: userId,
        isPublish: true,
        sharedPostId: postToShare._id,
        // postAuth: userId, // ID of the user who shared the post
    });
    yield post_model_1.Post.findByIdAndUpdate(postId, {
        shareCount: postToShare.shareCount + 1,
    });
    yield notification_model_1.Notification.create({
        user: postToShare === null || postToShare === void 0 ? void 0 : postToShare.author,
        fromUser: userId,
        type: 'share',
    });
    return sharedPost;
});
exports.sharePostInDB = sharePostInDB;
const getAllPostsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['content', 'category'];
    let options = {};
    if (query.isPremium) {
        options = { isPublish: true };
    }
    const postQuery = new QueryBuilder_1.default(post_model_1.Post.find(options)
        .populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name image' },
    })
        .populate({
        path: 'sharedPostId',
        populate: { path: 'author', select: 'name image status' },
    })
        .populate('author', 'name image status'), 
    // .populate('sharedBy', 'name image'),
    query)
        .search(searchableFields)
        .fields()
        .pagination()
        .sort()
        .filter();
    const result = yield postQuery.queryModel;
    return {
        result,
    };
});
exports.getAllPostsFromDB = getAllPostsFromDB;
const updatePostStatusInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updatePostStatusInDB = updatePostStatusInDB;
const getPostByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findById(id).populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name image' },
    });
    if (!result) {
        throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
    }
    return result;
});
exports.getPostByIdFromDB = getPostByIdFromDB;
// const updatePostInDB = async (
//   postId: string,
//   payload: Partial<TPost>,
//   authorId: string
// ) => {
//   const post = await Post.findById(postId);
//   // Check if the post exists and if the author is the same
//   if (!post || String(post.author) !== authorId) {
//     throw new Error(
//       'Post not found or user is not authorized to edit this post'
//     );
//   }
//   // Update the post
//   Object.assign(post, payload); // Merge the new values
//   const updatedPost = await post.save();
//   return updatedPost;
// };
const upvotePostInDB = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return post_model_1.Post.upvotePost(postId, userId);
});
exports.upvotePostInDB = upvotePostInDB;
const downvotePostInDB = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return post_model_1.Post.downvotePost(postId, userId);
});
exports.downvotePostInDB = downvotePostInDB;
