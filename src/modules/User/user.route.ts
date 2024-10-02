import { Router } from 'express';
import {
  createUser,
  followUserController,
  getAllUsers,
  getSingleUser,
  unfollowserController,
  updateUser,
} from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';
import { auth } from '../../middleware/auth';

const router = Router();

router.get('/', auth('admin'), getAllUsers);
router.post('/', validateRequest(createUserValidationSchema), createUser);

router.patch('/:id', updateUser);
router.get('/:id', getSingleUser);
router.patch(
  '/:targetUserId/follow',
  auth('admin', 'user'),
  followUserController
);
router.patch(
  '/:targetUserId/unfollow',
  auth('admin', 'user'),
  unfollowserController
);

export default router;
