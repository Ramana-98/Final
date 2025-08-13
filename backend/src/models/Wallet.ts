import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: {
    available: number;
    pending: number;
    currency: string;
  };
  transactions: mongoose.Types.ObjectId[];
  paymentMethods: {
    bankName: string;
    accountNumber: string;
    upiId?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema = new Schema<IWallet>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: {
    available: { type: Number, default: 0 },
    pending: { type: Number, default: 0 },
    currency: { type: String, default: 'INR' }
  },
  transactions: [{ type: Schema.Types.ObjectId, ref: 'Transaction' }],
  paymentMethods: [{
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    upiId: { type: String }
  }]
}, {
  timestamps: true
});

export default mongoose.model<IWallet>('Wallet', walletSchema);

