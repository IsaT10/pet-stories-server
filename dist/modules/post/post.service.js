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
exports.getPostByIdFromDB = exports.getPostsFromDB = exports.updatePostInDB = exports.downvotePostInDB = exports.upvotePostInDB = exports.createPostIntoDB = void 0;
const post_model_1 = require("./post.model");
const createPostIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.create(payload);
    return result;
});
exports.createPostIntoDB = createPostIntoDB;
const getPostsFromDB = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.getPostsFromDB = getPostsFromDB;
const getPostByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.findById(id).populate({
        path: 'comments',
        populate: { path: 'userId', select: 'name' },
    });
    return result;
});
exports.getPostByIdFromDB = getPostByIdFromDB;
const updatePostInDB = (postId, payload, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findById(postId);
    // Check if the post exists and if the author is the same
    if (!post || String(post.author) !== authorId) {
        throw new Error('Post not found or user is not authorized to edit this post');
    }
    // Update the post
    Object.assign(post, payload); // Merge the new values
    const updatedPost = yield post.save();
    return updatedPost;
});
exports.updatePostInDB = updatePostInDB;
const upvotePostInDB = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return post_model_1.Post.upvotePost(postId, userId);
});
exports.upvotePostInDB = upvotePostInDB;
const downvotePostInDB = (postId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    return post_model_1.Post.downvotePost(postId, userId);
});
exports.downvotePostInDB = downvotePostInDB;
