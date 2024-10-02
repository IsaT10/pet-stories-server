"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_controller_1 = require("./comment.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const comment_validation_1 = require("./comment.validation");
const auth_1 = require("../../middleware/auth");
const router = (0, express_1.Router)();
// Create a new comment
router.post('/:postId', (0, auth_1.auth)('admin', 'user'), (0, validateRequest_1.default)(comment_validation_1.createCommentValidationSchema), comment_controller_1.createComment);
// Get a comment by ID
router.get('/:commentId', comment_controller_1.getCommentById);
// Update a comment by ID
router.patch('/:commentId', (0, validateRequest_1.default)(comment_validation_1.updateCommentValidationSchema), comment_controller_1.updateComment);
// Delete a comment by ID
router.delete('/:commentId', comment_controller_1.deleteComment);
exports.default = router;
