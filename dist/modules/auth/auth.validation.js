"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterValidationSchema = exports.ResetPasswordValidationSchema = exports.ForgetPasswordValidationSchema = exports.RefreshTokenValidationSchema = exports.ChangePasswordValidationSchema = exports.LoginValidationSchema = void 0;
const zod_1 = require("zod");
const LoginValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.LoginValidationSchema = LoginValidationSchema;
const RegisterValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Name required' }),
        email: zod_1.z.string({ required_error: 'Email is required' }),
        password: zod_1.z.string({ required_error: 'Password is required' }),
    }),
});
exports.RegisterValidationSchema = RegisterValidationSchema;
const ChangePasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        oldPassword: zod_1.z.string({ required_error: 'Old password is required.' }),
        newPassword: zod_1.z
            .string({ required_error: 'New password is required.' })
            .min(6, 'Password can not be less than 6 character'),
    }),
});
exports.ChangePasswordValidationSchema = ChangePasswordValidationSchema;
const RefreshTokenValidationSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({ required_error: 'Refresh token is required!' }),
    }),
});
exports.RefreshTokenValidationSchema = RefreshTokenValidationSchema;
const ForgetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'Email is required' }),
    }),
});
exports.ForgetPasswordValidationSchema = ForgetPasswordValidationSchema;
const ResetPasswordValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({ required_error: 'User email is required' }),
        newPassword: zod_1.z.string({ required_error: 'New password id is required' }),
    }),
});
exports.ResetPasswordValidationSchema = ResetPasswordValidationSchema;
