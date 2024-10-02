import { Router } from 'express';
import userRoute from '../modules/User/user.route';
import authRoute from '../modules/auth/auth.route';
import postRoute from '../modules/post/post.route';
import commentRoute from '../modules/comment/comment.route';

const router = Router();
const moduleRoutes = [
  { path: '/users', route: userRoute },
  { path: '/auth', route: authRoute },
  { path: '/posts', route: postRoute },
  { path: '/comments', route: commentRoute },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
