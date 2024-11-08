import { Schema, model } from 'mongoose';
import { TNotification } from './notification.interface';

const NotificationSchema = new Schema<TNotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    isRead: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Notification = model<TNotification>(
  'Notification',
  NotificationSchema
);
