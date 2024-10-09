"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const auth_1 = require("../../middleware/auth");
const payment_validation_1 = require("./payment.validation");
const payment_controller_1 = require("./payment.controller");
const router = (0, express_1.Router)();
router.post('/create-payment-intent', payment_controller_1.stripePayment);
router.post('/', (0, auth_1.auth)('admin', 'user'), (0, validateRequest_1.default)(payment_validation_1.paymentValidationSchema), payment_controller_1.payment);
router.get('/', (0, auth_1.auth)('admin'), payment_controller_1.getAllPayment);
exports.default = router;
