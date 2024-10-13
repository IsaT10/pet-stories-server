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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.nodemailer_host,
        port: 587,
        secure: false,
        auth: {
            user: config_1.default.auth_user,
            pass: config_1.default.auth_pass,
        },
    });
    try {
        const info = yield transporter.sendMail({
            from: config_1.default.send_email, // sender address
            to, // list of receivers
            subject: 'Your password reset token', // Subject line
            text: 'Change your password within 10 minutes', // Plain text body
            html, // HTML body
        });
        console.log('Message sent: %s', info.messageId);
    }
    catch (error) {
        console.error('Error sending email: ', error);
    }
});
exports.sendEmail = sendEmail;
