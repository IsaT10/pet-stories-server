"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const appError_1 = __importDefault(require("./appError"));
const handleValidationError = (err) => {
    let message = '';
    Object.values(err.errors).map((val) => {
        message = `${val === null || val === void 0 ? void 0 : val.path.toUpperCase()} is required`;
    });
    return new appError_1.default(http_status_1.default.BAD_REQUEST, message);
};
exports.default = handleValidationError;
