import { NextFunction, Request, Response, Router } from 'express';
import {
  createPost,
  upvotePostController,
  downvotePostController,
  getPostById,
  getAllPosts,
  updatePost,
  deletePost,
  updatePostStatus,
  sharePostController,
  updateSharedPost,
} from './post.controller';
import validateRequest from '../../middleware/validateRequest';
import { createPostValidationSchema } from './post.validation';
import { auth } from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.post(
  '/create-post',
  auth('user', 'admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createPostValidationSchema),
  createPost
);

router.post('/share/:postId', auth('user', 'admin'), sharePostController);
router.patch(
  '/share/update-post/:postId',
  auth('user', 'admin'),
  updateSharedPost
);
router.patch(
  '/update-post/:postId',
  auth('user', 'admin'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  updatePost
);

router.get('/', getAllPosts);
router.delete('/:postId', deletePost);
router.patch('/change-status/:postId', auth('admin'), updatePostStatus);
router.get('/:postId', auth('user', 'admin'), getPostById);
router.patch('/:postId/upvote', auth('user', 'admin'), upvotePostController);
router.patch(
  '/:postId/downvote',
  auth('user', 'admin'),
  downvotePostController
);

export default router;
