import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'message' | 'job' | 'proposal' | 'connection' | 'payment' | 'upgrade';
  text: string;
  meta?: string;
  isRead: boolean;
  relatedId?: mongoose.Types.ObjectId;
  relatedType?: 'project' | 'message' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['message', 'job', 'proposal', 'connection', 'payment', 'upgrade'], required: true },
  text: { type: String, required: true },
  meta: { type: String },
  isRead: { type: Boolean, default: false },
  relatedId: { type: Schema.Types.ObjectId },
  relatedType: { type: String, enum: ['project', 'message', 'user'] }
}, {
  timestamps: true
});

export default mongoose.model<INotification>('Notification', notificationSchema);

