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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const http_status_1 = __importDefault(require("http-status"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = __importDefault(require("../../error/appError"));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: { type: String },
    password: { type: String, required: true, select: 0 },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    status: {
        type: String,
        enum: ['basic', 'premium', 'blocked'],
        default: 'basic',
    },
    passwordChangeAt: Date,
    packageExpireAt: Date,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const hashPassword = yield bcrypt_1.default.hash(user.password, Number(process.env.SALT_ROUNDS));
        user.password = hashPassword;
        next();
    });
});
UserSchema.statics.isValidUser = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield exports.User.findOne({ email }).select('+password');
        if (!user) {
            throw new appError_1.default(http_status_1.default.NOT_FOUND, 'User not found!');
        }
        if (user.isDeleted) {
            throw new appError_1.default(http_status_1.default.FORBIDDEN, 'This user is already deleted!');
        }
        if (user.status === 'blocked') {
            throw new appError_1.default(http_status_1.default.FORBIDDEN, 'This user is already blocked!');
        }
        return user;
    });
};
UserSchema.statics.isPasswordMatch = function (plainPassword, hashPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainPassword, hashPassword);
    });
};
UserSchema.statics.isJWTIssuedBeforePasswordChange = function (changePasswordTimestamp, jwtIssuedTimestamp) {
    const passwordChangedTime = new Date(changePasswordTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
};
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const isUserExist = yield exports.User.findOne({ email: this.email });
        if (isUserExist) {
            throw new appError_1.default(http_status_1.default.BAD_REQUEST, `User is already creaated.`);
        }
        next();
    });
});
UserSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'author',
    localField: '_id',
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
