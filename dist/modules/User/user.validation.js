"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidationSchema = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name is required' }).trim(),
        email: zod_1.z
            .string({ required_error: 'Email is required' })
            .email('Invalid email address'),
        password: zod_1.z.string({ required_error: 'Password is required' }),
        role: zod_1.z.enum(['admin', 'user']).default('user'),
        status: zod_1.z.enum(['basic', 'premium', 'blocked']).default('basic'),
        passwordChangeAt: zod_1.z.string().optional(),
        packageExpireAt: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().default(false),
        followers: zod_1.z.array(zod_1.z.string()).optional(),
        following: zod_1.z.array(zod_1.z.string()).optional(),
    }),
});
exports.createUserValidationSchema = createUserValidationSchema;
