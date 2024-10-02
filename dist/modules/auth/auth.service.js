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
exports.registerUserIntoDB = exports.resetPasswordInDB = exports.forgetPasswordInDB = exports.refreshTokenFromServer = exports.changeUserPassword = exports.loginUserDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authutils_1 = require("./authutils");
const user_model_1 = require("../User/user.model");
const config_1 = __importDefault(require("../../config"));
const appError_1 = __importDefault(require("../../error/appError"));
const sendEmail_1 = require("../../utils/sendEmail");
const decodedToken_1 = require("../../utils/decodedToken");
const registerUserIntoDB = (payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign(Object.assign({}, payload), { image: file === null || file === void 0 ? void 0 : file.path });
    console.log(userData);
    const result = yield user_model_1.User.create(userData);
    return result;
});
exports.registerUserIntoDB = registerUserIntoDB;
const loginUserDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const validUser = (yield user_model_1.User.isValidUser(payload === null || payload === void 0 ? void 0 : payload.email));
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(payload.password, validUser.password);
    if (!isPasswordMatch) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Password do not matched!');
    }
    const jwtPayload = {
        id: validUser._id,
        email: validUser.email,
        role: validUser.role,
    };
    const refreshToken = (0, authutils_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires);
    const accessToken = (0, authutils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires);
    return {
        accessToken,
        refreshToken,
        // needsPasswordChange: validUser.needsPasswordChange,
    };
});
exports.loginUserDB = loginUserDB;
const changeUserPassword = (user, paylod) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, role } = user;
    if (paylod.newPassword === paylod.oldPassword) {
        throw new appError_1.default(http_status_1.default.BAD_REQUEST, 'New password have to be different from old password');
    }
    const validUser = yield user_model_1.User.isValidUser(email);
    const isPasswordMatch = yield user_model_1.User.isPasswordMatch(paylod.oldPassword, validUser.password);
    if (!isPasswordMatch) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'Old password do not matched!');
    }
    const newHashPassword = yield bcrypt_1.default.hash(paylod.newPassword, Number(process.env.SALT_ROUNDS));
    yield user_model_1.User.findOneAndUpdate({ email, role }, {
        password: newHashPassword,
        passwordChangeAt: new Date(),
    });
    return null;
});
exports.changeUserPassword = changeUserPassword;
const refreshTokenFromServer = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET);
    const { email, iat } = decoded;
    // check is valid user
    const validUser = (yield user_model_1.User.isValidUser(email));
    if ((validUser === null || validUser === void 0 ? void 0 : validUser.passwordChangeAt) &&
        user_model_1.User.isJWTIssuedBeforePasswordChange(validUser.passwordChangeAt, iat)) {
        throw new appError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized!');
    }
    const jwtPayload = {
        id: validUser._id,
        email: validUser.email,
        role: validUser.role,
    };
    const accessToken = (0, authutils_1.createToken)(jwtPayload, process.env.JWT_ACCESS_SECRET, process.env.JWT_ACCESS_EXPIRES_IN);
    return { accessToken };
});
exports.refreshTokenFromServer = refreshTokenFromServer;
const forgetPasswordInDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // check is valid user
    const user = yield user_model_1.User.isValidUser(email);
    const jwtPayload = { email: user.email, role: user.role };
    const resetToken = (0, authutils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resetLink = `${config_1.default.reset_password_url}?email=${user.email}&token=${resetToken}`;
    (0, sendEmail_1.sendEmail)(user.email, resetLink);
});
exports.forgetPasswordInDB = forgetPasswordInDB;
const resetPasswordInDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    // check is valid user
    const user = yield user_model_1.User.isValidUser(payload.email);
    const { email, role } = (0, decodedToken_1.decodedToken)(token, config_1.default.jwt_access_secret);
    if (email !== user.email) {
        throw new appError_1.default(http_status_1.default.FORBIDDEN, 'You are forbidden');
    }
    const newHashPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(process.env.SALT_ROUNDS));
    yield user_model_1.User.findOneAndUpdate({ email, role }, {
        password: newHashPassword,
        passwordChangeAt: new Date(),
    });
});
exports.resetPasswordInDB = resetPasswordInDB;
