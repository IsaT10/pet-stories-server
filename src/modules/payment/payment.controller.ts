import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import {
  getPaymentFromDB,
  paymentIntoDB,
  paymentWithStripe,
} from './payment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const stripePayment = catchAsync(async (req: Request, res: Response) => {
  const data = await paymentWithStripe(req.body);

  res.json({
    success: true,
    statusCode: 201,
    clientSecret: data,
  });
});
const payment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const data = await paymentIntoDB(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Payment successful',
    data,
  });
});

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  const data = await getPaymentFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Payment history retrived successfully',
    data,
  });
});

export { payment, getAllPayment, stripePayment };
