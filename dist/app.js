"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./routes"));
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const noFoundRoute_1 = require("./error/noFoundRoute");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
// initial server start
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'testing...' });
});
// api routes
app.use('/api/v1', routes_1.default);
// app.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body; // Payment amount in smallest currency unit, e.g., cents for USD
//   console.log(amount);
//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: parseInt(amount || 1 * 100), // Amount in cents
//       currency: 'usd', // Specify the currency
//       payment_method_types: ['card'],
//     });
//     console.log(paymentIntent);
//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Payment method is not work properly' });
//   }
// });
// not found route
app.all('*', noFoundRoute_1.notFoundRoute);
// handle error globally
app.use(globalErrorHandler_1.default);
exports.default = app;
