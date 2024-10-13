import { NextFunction, Request, Response, Router } from 'express';
import {
  createUser,
  followUserController,
  getAllUsers,
  getMe,
  getSingleUser,
  unfollowserController,
  updateRole,
  updateStatus,
  updateUser,
} from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';
import { auth } from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.get('/', auth('admin', 'user'), getAllUsers);
router.post('/', validateRequest(createUserValidationSchema), createUser);

router.patch(
  '/:id',
  auth('admin', 'user'),
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  updateUser
);
router.patch('/change-status/:id', auth('admin', 'user'), updateStatus);
router.patch('/change-role/:id', auth('admin', 'user'), updateRole);
router.get('/:id', auth('admin', 'user'), getSingleUser);
// router.post('/batch', getArrayOfUsers);
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

router.get('/profile/me', auth('user', 'admin'), getMe);

export default router;
