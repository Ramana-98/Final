import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  walletId: mongoose.Types.ObjectId;
  type: 'Payment Received' | 'Withdrawal' | 'Bonus' | 'Refund' | 'Fee' | 'Transfer' | 'Escrow Release';
  amount: number;
  currency: string;
  status: 'Pending' | 'Completed' | 'Failed' | 'Cancelled' | 'Processing';
  description: string;
  projectId?: mongoose.Types.ObjectId;
  referenceId?: string;
  externalTransactionId?: string;
  fee?: number;
  netAmount?: number;
  paymentMethod?: {
    type: 'bank' | 'upi' | 'card' | 'wallet';
    details: string;
  };
  metadata?: {
    [key: string]: any;
  };
  processedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const paymentMethodSchema = new Schema({
  type: { 
    type: String, 
    enum: ['bank', 'upi', 'card', 'wallet'],
    required: true
  },
  details: { 
    type: String, 
    required: true,
    maxlength: 200
  }
});

const transactionSchema = new Schema<ITransaction>({
  walletId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Wallet', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['Payment Received', 'Withdrawal', 'Bonus', 'Refund', 'Fee', 'Transfer', 'Escrow Release'], 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true,
    min: 0
  },
  currency: { 
    type: String, 
    default: 'INR',
    maxlength: 3
  },
  status: { 
    type: String, 
    enum: ['Pending', 'Completed', 'Failed', 'Cancelled', 'Processing'], 
    default: 'Pending' 
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 500
  },
  projectId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project' 
  },
  referenceId: { 
    type: String,
    maxlength: 100
  },
  externalTransactionId: { 
    type: String,
    maxlength: 100
  },
  fee: { 
    type: Number,
    min: 0
  },
  netAmount: { 
    type: Number,
    min: 0
  },
  paymentMethod: paymentMethodSchema,
  metadata: { 
    type: Schema.Types.Mixed 
  },
  processedAt: { 
    type: Date 
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
transactionSchema.index({ walletId: 1 });
transactionSchema.index({ type: 1 });
transactionSchema.index({ status: 1 });
transactionSchema.index({ createdAt: -1 });
transactionSchema.index({ projectId: 1 });
transactionSchema.index({ referenceId: 1 });
transactionSchema.index({ externalTransactionId: 1 });
transactionSchema.index({ currency: 1 });

// Compound indexes for common queries
transactionSchema.index({ walletId: 1, status: 1 });
transactionSchema.index({ walletId: 1, type: 1 });
transactionSchema.index({ walletId: 1, createdAt: -1 });

// Virtual for formatted amount
transactionSchema.virtual('formattedAmount').get(function() {
  const currency = this.currency;
  const symbol = currency === 'USD' ? '$' : '₹';
  const sign = this.type === 'Withdrawal' || this.type === 'Fee' ? '-' : '+';
  return `${sign}${symbol}${this.amount.toLocaleString()}`;
});

// Virtual for formatted net amount
transactionSchema.virtual('formattedNetAmount').get(function() {
  if (!this.netAmount) return null;
  const currency = this.currency;
  const symbol = currency === 'USD' ? '$' : '₹';
  const sign = this.type === 'Withdrawal' || this.type === 'Fee' ? '-' : '+';
  return `${sign}${symbol}${this.netAmount.toLocaleString()}`;
});

// Virtual for time ago
transactionSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffInMs = now.getTime() - this.createdAt.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
});

// Virtual for is credit transaction
transactionSchema.virtual('isCredit').get(function() {
  return ['Payment Received', 'Bonus', 'Refund', 'Escrow Release'].includes(this.type);
});

// Virtual for is debit transaction
transactionSchema.virtual('isDebit').get(function() {
  return ['Withdrawal', 'Fee', 'Transfer'].includes(this.type);
});

// Pre-save middleware to calculate net amount
transactionSchema.pre('save', function(next) {
  if (this.fee && this.fee > 0) {
    this.netAmount = this.amount - this.fee;
  } else {
    this.netAmount = this.amount;
  }
  next();
});

// Method to mark as completed
transactionSchema.methods.markAsCompleted = function() {
  this.status = 'Completed';
  this.processedAt = new Date();
  return this.save();
};

// Method to mark as failed
transactionSchema.methods.markAsFailed = function() {
  this.status = 'Failed';
  return this.save();
};

// Method to mark as cancelled
transactionSchema.methods.markAsCancelled = function() {
  this.status = 'Cancelled';
  return this.save();
};

// Static method to get transaction summary
transactionSchema.statics.getSummary = function(walletId: string, period: 'day' | 'week' | 'month' | 'year') {
  const now = new Date();
  let startDate: Date;

  switch (period) {
    case 'day':
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    case 'week':
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      break;
    case 'month':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'year':
      startDate = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      startDate = new Date(0);
  }

  return this.aggregate([
    {
      $match: {
        walletId: new mongoose.Types.ObjectId(walletId),
        status: 'Completed',
        createdAt: { $gte: startDate }
      }
    },
    {
      $group: {
        _id: '$type',
        totalAmount: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    }
  ]);
};

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
