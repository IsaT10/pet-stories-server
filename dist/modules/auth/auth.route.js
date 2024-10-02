"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_validation_1 = require("./auth.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middleware/auth");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post('/login', (0, validateRequest_1.default)(auth_validation_1.LoginValidationSchema), auth_controller_1.loginUser);
router.post('/change-password', (0, auth_1.auth)('admin', 'user'), (0, validateRequest_1.default)(auth_validation_1.ChangePasswordValidationSchema), auth_controller_1.changePassword);
router.post('/register', multer_config_1.multerUpload.single('image'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, (0, validateRequest_1.default)(auth_validation_1.RegisterValidationSchema), auth_controller_1.registerUser);
router.post('/refresh-token', (0, validateRequest_1.default)(auth_validation_1.RefreshTokenValidationSchema), auth_controller_1.refreshToken);
router.post('/forget-password', (0, validateRequest_1.default)(auth_validation_1.ForgetPasswordValidationSchema), auth_controller_1.forgetPassword);
router.post('/reset-password', (0, validateRequest_1.default)(auth_validation_1.ResetPasswordValidationSchema), auth_controller_1.resetPassword);
exports.default = router;
