"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentValidationSchema = exports.createCommentValidationSchema = void 0;
const zod_1 = require("zod");
const createCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ required_error: 'Text is required' }).trim(),
    }),
});
exports.createCommentValidationSchema = createCommentValidationSchema;
const updateCommentValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        comment: zod_1.z.string({ required_error: 'Text is required' }).trim(),
    }),
});
exports.updateCommentValidationSchema = updateCommentValidationSchema;
