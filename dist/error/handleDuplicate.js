"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handleDuplicateError = (err) => {
    const values = Object.values(err.keyValue);
    const message = `'${values.join(' ')}' is already exists. Use another value!`;
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handleDuplicateError;
