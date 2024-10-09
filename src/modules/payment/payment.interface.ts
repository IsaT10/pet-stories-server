import { Types } from 'mongoose';

export interface TPayment {
  user: Types.ObjectId;
  expiredDate: Date;
}
