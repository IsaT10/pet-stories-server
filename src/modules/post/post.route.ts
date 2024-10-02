import { Router } from 'express';
import {
  createPost,
  upvotePostController,
  downvotePostController,
  getPostById,
} from './post.controller';
import validateRequest from '../../middleware/validateRequest';
import { createPostValidationSchema } from './post.validation';
import { auth } from '../../middleware/auth';

const router = Router();

router.post(
  '/',
  auth('user', 'admin'),
  validateRequest(createPostValidationSchema),
  createPost
);
router.get('/:postId', auth('user', 'admin'), getPostById);
router.patch('/:postId/upvote', auth('user', 'admin'), upvotePostController);
router.patch(
  '/:postId/downvote',
  auth('user', 'admin'),
  downvotePostController
);

export default router;
