"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handelZodError = (err) => {
    let message = '';
    err.issues.map((issue) => {
        message = issue.message;
    });
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handelZodError;
