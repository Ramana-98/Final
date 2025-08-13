import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  walletId: mongoose.Types.ObjectId;
  type: 'Payment Received' | 'Withdrawal' | 'Bonus' | 'Refund' | 'Fee';
  amount: number;
  currency: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Cancelled';
  description: string;
  projectId?: mongoose.Types.ObjectId;
  referenceId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true },
  type: { type: String, enum: ['Payment Received', 'Withdrawal', 'Bonus', 'Refund', 'Fee'], required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Cancelled'], default: 'Pending' },
  description: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
  referenceId: { type: String }
}, {
  timestamps: true
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);

