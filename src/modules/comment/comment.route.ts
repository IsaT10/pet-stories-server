import { Router } from 'express';
import {
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
} from './comment.controller';

import validateRequest from '../../middleware/validateRequest';
import {
  createCommentValidationSchema,
  updateCommentValidationSchema,
} from './comment.validation';
import { auth } from '../../middleware/auth';

const router = Router();

// Create a new comment
router.post(
  '/:postId',
  auth('admin', 'user'),
  //   validateRequest(createCommentValidationSchema),
  createComment
);

// Get a comment by ID
router.get('/:commentId', getCommentById);

// Update a comment by ID
router.patch(
  '/:commentId',
  validateRequest(updateCommentValidationSchema),
  updateComment
);

// Delete a comment by ID
router.delete('/:commentId', deleteComment);

export default router;
