import { Schema, model } from 'mongoose';
import { TPayment } from './payment.interface';

const PaymentSchema = new Schema<TPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    expiredDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

export const Payment = model<TPayment>('Payment', PaymentSchema);
