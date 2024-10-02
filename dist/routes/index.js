"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = __importDefault(require("../modules/User/user.route"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const post_route_1 = __importDefault(require("../modules/post/post.route"));
const comment_route_1 = __importDefault(require("../modules/comment/comment.route"));
const router = (0, express_1.Router)();
const moduleRoutes = [
    { path: '/users', route: user_route_1.default },
    { path: '/auth', route: auth_route_1.default },
    { path: '/posts', route: post_route_1.default },
    { path: '/comments', route: comment_route_1.default },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
