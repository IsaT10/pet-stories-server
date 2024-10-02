"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostValidationSchema = void 0;
const zod_1 = require("zod");
// Validation schema for creating a post
const createPostValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        // title: z
        //   .string({ required_error: 'Title is required' })
        //   .trim()
        //   .min(3, { message: 'Title must be at least 3 characters long.' })
        //   .max(100, { message: 'Title must be at most 100 characters long.' }),
        content: zod_1.z
            .string({ required_error: 'Content is required' })
            .trim()
            .min(10, { message: 'Content must be at least 10 characters long.' }),
        category: zod_1.z.enum(['Tips', 'Story'], {
            required_error: 'Category is required',
        }),
        images: zod_1.z
            .array(zod_1.z.string().url(), {
            required_error: 'Images must be an array of valid URLs.',
        })
            .optional(),
        isPremium: zod_1.z.boolean(),
        author: zod_1.z.string({ required_error: 'User ID is required' }),
    }),
});
exports.createPostValidationSchema = createPostValidationSchema;
