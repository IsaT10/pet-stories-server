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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = exports.resetPassword = exports.forgetPassword = exports.refreshToken = exports.changePassword = exports.loginUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const auth_service_1 = require("./auth.service");
const registerUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.file);
    const data = yield (0, auth_service_1.registerUserIntoDB)(req.body, req === null || req === void 0 ? void 0 : req.file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data,
        success: true,
        message: 'User register successfully',
    });
}));
exports.registerUser = registerUser;
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, auth_service_1.loginUserDB)(req.body);
    const { refreshToken, accessToken } = data;
    res.cookie('refreshToken', refreshToken, {
        secure: process.env.NODE_ENV === 'production' && true,
        httpOnly: true,
    });
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: { accessToken },
        success: true,
        message: 'User login successfully',
    });
}));
exports.loginUser = loginUser;
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = __rest(req.body, []);
    const data = yield (0, auth_service_1.changeUserPassword)(req.user, password);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: data,
        success: true,
        message: 'Successfully changed password',
    });
}));
exports.changePassword = changePassword;
const refreshToken = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refreshToken } = req.cookies;
    const data = yield (0, auth_service_1.refreshTokenFromServer)(refreshToken);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: data,
        success: true,
        message: 'Send a access token',
    });
}));
exports.refreshToken = refreshToken;
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const data = yield (0, auth_service_1.forgetPasswordInDB)(email);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: data,
        success: true,
        message: 'Generate a link successfully',
    });
}));
exports.forgetPassword = forgetPassword;
const resetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
    const data = yield (0, auth_service_1.resetPasswordInDB)(req.body, token);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        data: data,
        success: true,
        message: 'Password reset successfully',
    });
}));
exports.resetPassword = resetPassword;
