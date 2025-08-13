import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  content: string;
  messageType: 'text' | 'file' | 'image';
  isRead: boolean;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  content: { type: String, required: true },
  messageType: { type: String, enum: ['text', 'file', 'image'], default: 'text' },
  isRead: { type: Boolean, default: false },
  attachments: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model<IMessage>('Message', messageSchema);

