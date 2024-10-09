import { Router } from 'express';

import validateRequest from '../../middleware/validateRequest';

import { auth } from '../../middleware/auth';
import { paymentValidationSchema } from './payment.validation';
import { getAllPayment, payment, stripePayment } from './payment.controller';

const router = Router();

router.post('/create-payment-intent', stripePayment);
router.post(
  '/',
  auth('admin', 'user'),
  validateRequest(paymentValidationSchema),
  payment
);
router.get('/', auth('admin'), getAllPayment);

export default router;
