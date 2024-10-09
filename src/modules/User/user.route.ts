import { NextFunction, Request, Response, Router } from 'express';
import {
  createUser,
  followUserController,
  getAllUsers,
  getMe,
  getSingleUser,
  unfollowserController,
  updateStatus,
  updateUser,
} from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { createUserValidationSchema } from './user.validation';
import { auth } from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';

const router = Router();

router.get('/', getAllUsers);
router.post('/', validateRequest(createUserValidationSchema), createUser);

router.patch(
  '/:id',
  multerUpload.single('image'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);

    next();
  },
  updateUser
);
router.patch('/change-status/:id', updateStatus);
router.get('/:id', getSingleUser);
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
