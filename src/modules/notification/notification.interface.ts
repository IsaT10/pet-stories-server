import { Types } from 'mongoose';

export interface TNotification {
  user: Types.ObjectId;
  fromUser: Types.ObjectId;
  type: string;
  isRead: boolean;
}
