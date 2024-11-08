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
exports.Post = void 0;
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const notification_model_1 = require("../notification/notification.model");
const PostSchema = new mongoose_1.Schema({
    content: { type: String },
    category: { type: String, enum: ['Tips', 'Story'] },
    thumbnail: { type: String },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isPremium: { type: Boolean },
    isPublish: { type: Boolean },
    upvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    downvotes: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    sharedPostId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Post' },
    sharedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    shareCount: { type: Number, default: 0 },
    sharedText: { type: String },
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Upvote a post
PostSchema.statics.upvotePost = function (postId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield this.findById(postId);
        if (!post) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
        }
        // If user is already in upvotes, remove them (decrement by 1)
        if (post.upvotes.includes(userId)) {
            yield this.findByIdAndUpdate(postId, { $pull: { upvotes: userId } });
        }
        else {
            // If user is in downvotes, remove them (decrement by 2)
            if (post.downvotes.includes(userId)) {
                yield this.findByIdAndUpdate(postId, {
                    $pull: { downvotes: userId },
                    $addToSet: { upvotes: userId }, // Add to upvotes
                });
            }
            else {
                // Add user to upvotes (increment by 1)
                yield this.findByIdAndUpdate(postId, {
                    $addToSet: { upvotes: userId },
                });
                yield notification_model_1.Notification.create({
                    user: post === null || post === void 0 ? void 0 : post.author,
                    fromUser: userId,
                    type: 'upvote',
                });
            }
        }
        return this.findById(postId); // Return the updated post
    });
};
// Downvote a post
PostSchema.statics.downvotePost = function (postId, userId) {
    return __awaiter(this, void 0, void 0, function* () {
        const post = yield this.findById(postId);
        if (!post) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'Post not found!');
        }
        // If user is already in downvotes, remove them (decrement by 1)
        if (post.downvotes.includes(userId)) {
            yield this.findByIdAndUpdate(postId, {
                $pull: { downvotes: userId },
            });
        }
        else {
            // If user is in upvotes, remove them (decrement by 2)
            if (post.upvotes.includes(userId)) {
                yield this.findByIdAndUpdate(postId, {
                    $pull: { upvotes: userId },
                    $addToSet: { downvotes: userId }, // Add to downvotes
                });
            }
            else {
                // Add user to downvotes (increment by 1)
                yield this.findByIdAndUpdate(postId, {
                    $addToSet: { downvotes: userId },
                });
                yield notification_model_1.Notification.create({
                    user: post === null || post === void 0 ? void 0 : post.author,
                    fromUser: userId,
                    type: 'downvote',
                });
            }
        }
        return this.findById(postId);
    });
};
PostSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'postId',
    localField: '_id',
});
exports.Post = (0, mongoose_1.model)('Post', PostSchema);
