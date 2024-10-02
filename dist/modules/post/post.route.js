"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("./post.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const post_validation_1 = require("./post.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
router.post('/', (0, auth_1.auth)('user', 'admin'), (0, validateRequest_1.default)(post_validation_1.createPostValidationSchema), post_controller_1.createPost);
router.get('/:postId', (0, auth_1.auth)('user', 'admin'), post_controller_1.getPostById);
router.patch('/:postId/upvote', (0, auth_1.auth)('user', 'admin'), post_controller_1.upvotePostController);
router.patch('/:postId/downvote', (0, auth_1.auth)('user', 'admin'), post_controller_1.downvotePostController);
exports.default = router;
