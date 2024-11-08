import { Router } from 'express';
import { auth } from '../../middleware/auth';
import {
  getAllNotificationByUser,
  readNotification,
} from './notification.controller';

const router = Router();

// router.post('/notifications/userId', auth('admin', 'user'), createNotification);

router.get('/', auth('admin', 'user'), getAllNotificationByUser);

router.patch('/read', auth('admin', 'user'), readNotification);

export default router;
