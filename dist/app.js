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
// not found route
app.all('*', noFoundRoute_1.notFoundRoute);
// handle error globally
app.use(globalErrorHandler_1.default);
exports.default = app;
