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
exports.getMeFromDB = exports.unfollowUserFromDB = exports.updateRoleInDB = exports.updateStatusInDB = exports.getSingleUserFromDB = exports.followUserIntoDB = exports.updateUserIntoDB = exports.getAllUsersFromDB = exports.createUserIntoDB = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const user_model_1 = require("./user.model");
const handleValidationError_1 = __importDefault(require("../../error/handleValidationError"));
const handleDuplicate_1 = __importDefault(require("../../error/handleDuplicate"));
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("../../error/appError"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(payload);
    return result;
});
exports.createUserIntoDB = createUserIntoDB;
const getAllUsersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const searchableFields = ['name', 'email'];
    const userQuery = new QueryBuilder_1.default(user_model_1.User.find(), query)
        .search(searchableFields)
        .fields()
        .pagination()
        .sort()
        .filter();
    const result = yield userQuery.queryModel;
    const meta = yield userQuery.countTotal();
    return {
        meta,
        result,
    };
});
exports.getAllUsersFromDB = getAllUsersFromDB;
const getSingleUserFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id)
        .populate('following', 'name image')
        .populate('followers', 'name image')
        .populate({
        path: 'posts',
        populate: { path: 'author', select: 'name image' },
    })
        .exec();
    return result;
});
exports.getSingleUserFromDB = getSingleUserFromDB;
// const getSingleUserFromDB = async (id: string[]) => {
//   const result = await User.findById(id)
//     .populate('following', 'name email')
//     .populate('followers', 'name email')
//     .exec();
//   return result;
// };
const getMeFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(id)
        .populate('following', 'name image')
        .populate('followers', 'name image')
        .populate({
        path: 'posts',
        populate: { path: 'author', select: 'name image' },
    })
        .exec();
    return result;
});
exports.getMeFromDB = getMeFromDB;
const updateUserIntoDB = (id, payload, file) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = Object.assign(Object.assign({}, payload), { image: file === null || file === void 0 ? void 0 : file.path });
    const result = yield user_model_1.User.findByIdAndUpdate(id, userData, { new: true });
    return result;
});
exports.updateUserIntoDB = updateUserIntoDB;
const updateStatusInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updateStatusInDB = updateStatusInDB;
const updateRoleInDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.updateRoleInDB = updateRoleInDB;
const followUserIntoDB = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUserId === targetUserId) {
        throw new Error("You can't follow yourself");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const updatedCurrentUser = yield user_model_1.User.findByIdAndUpdate(currentUserId, { $addToSet: { following: targetUserId } }, { new: true, session });
        yield user_model_1.User.findByIdAndUpdate(targetUserId, { $addToSet: { followers: currentUserId } }, { new: true, session });
        yield session.commitTransaction();
        yield session.endSession();
        return updatedCurrentUser;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        console.error(error);
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
            throw (0, handleValidationError_1.default)(error);
        }
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            throw (0, handleDuplicate_1.default)(error);
        }
        // Handle any other types of errors
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.followUserIntoDB = followUserIntoDB;
const unfollowUserFromDB = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    if (currentUserId === targetUserId) {
        throw new Error("You can't unfollow yourself");
    }
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        // Remove the target user from the following list of the current user
        const updatedCurrentUser = yield user_model_1.User.findByIdAndUpdate(currentUserId, { $pull: { following: targetUserId } }, { new: true, session });
        // Remove the current user from the followers list of the target user
        yield user_model_1.User.findByIdAndUpdate(targetUserId, { $pull: { followers: currentUserId } }, { new: true, session });
        // Commit the transaction if both updates are successful
        yield session.commitTransaction();
        yield session.endSession();
        return updatedCurrentUser;
    }
    catch (error) {
        // Abort the transaction if there is an error
        yield session.abortTransaction();
        yield session.endSession();
        console.error(error);
        if ((error === null || error === void 0 ? void 0 : error.name) === 'ValidationError') {
            throw (0, handleValidationError_1.default)(error);
        }
        if ((error === null || error === void 0 ? void 0 : error.code) === 11000) {
            throw (0, handleDuplicate_1.default)(error);
        }
        // Handle any other types of errors
        throw new appError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, error.message);
    }
});
exports.unfollowUserFromDB = unfollowUserFromDB;
