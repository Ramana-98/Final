import mongoose, { Schema, Document } from 'mongoose';

export interface IWallet extends Document {
  userId: mongoose.Types.ObjectId;
  balance: {
    available: number;
    pending: number;
    currency: string;
  };
  transactions: mongoose.Types.ObjectId[];
  paymentMethods: Array<{
    bankName: string;
    accountNumber: string;
    ifscCode?: string;
    upiId?: string;
    isDefault: boolean;
    isActive: boolean;
  }>;
  withdrawalSettings: {
    minimumAmount: number;
    maximumAmount: number;
    preferredCurrency: string;
    autoWithdraw: boolean;
    autoWithdrawThreshold: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const paymentMethodSchema = new Schema({
  bankName: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  accountNumber: { 
    type: String, 
    required: true,
    maxlength: 50
  },
  ifscCode: { 
    type: String,
    maxlength: 20
  },
  upiId: { 
    type: String,
    maxlength: 100
  },
  isDefault: { 
    type: Boolean, 
    default: false 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
});

const withdrawalSettingsSchema = new Schema({
  minimumAmount: { 
    type: Number, 
    default: 500,
    min: 100
  },
  maximumAmount: { 
    type: Number, 
    default: 100000,
    max: 1000000
  },
  preferredCurrency: { 
    type: String, 
    default: 'INR',
    maxlength: 3
  },
  autoWithdraw: { 
    type: Boolean, 
    default: false 
  },
  autoWithdrawThreshold: { 
    type: Number, 
    default: 10000,
    min: 1000
  }
});

const walletSchema = new Schema<IWallet>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  balance: {
    available: { 
      type: Number, 
      default: 0,
      min: 0
    },
    pending: { 
      type: Number, 
      default: 0,
      min: 0
    },
    currency: { 
      type: String, 
      default: 'INR',
      maxlength: 3
    }
  },
  transactions: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Transaction' 
  }],
  paymentMethods: [paymentMethodSchema],
  withdrawalSettings: {
    type: withdrawalSettingsSchema,
    default: () => ({})
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
walletSchema.index({ userId: 1 });
walletSchema.index({ 'balance.currency': 1 });
walletSchema.index({ 'paymentMethods.isDefault': 1 });
walletSchema.index({ 'paymentMethods.isActive': 1 });

// Virtual for total balance
walletSchema.virtual('totalBalance').get(function(this: IWallet) {
  return this.balance.available + this.balance.pending;
});

// Virtual for formatted balance
// Virtual for formatted balance
walletSchema.virtual('formattedBalance').get(function() {
  const currency = this.balance.currency;
  const symbol = currency === 'USD' ? '$' : '₹';
  const total = this.balance.available + this.balance.pending; // avoid this.totalBalance for TS
  return {
    available: `${symbol}${this.balance.available.toLocaleString()}`,
    pending: `${symbol}${this.balance.pending.toLocaleString()}`,
    total: `${symbol}${total.toLocaleString()}`
  };
});

// Virtual for default payment method
walletSchema.virtual('defaultPaymentMethod').get(function() {
  return this.paymentMethods.find(method => method.isDefault && method.isActive);
});

// Method to add funds
walletSchema.methods.addFunds = function(amount: number, type: 'available' | 'pending' = 'available') {
  this.balance[type] += amount;
  return this.save();
};

// Method to deduct funds
walletSchema.methods.deductFunds = function(amount: number, type: 'available' | 'pending' = 'available') {
  if (this.balance[type] < amount) {
    throw new Error('Insufficient balance');
  }
  this.balance[type] -= amount;
  return this.save();
};

// Method to transfer from pending to available
walletSchema.methods.transferPendingToAvailable = function(amount: number) {
  if (this.balance.pending < amount) {
    throw new Error('Insufficient pending balance');
  }
  this.balance.pending -= amount;
  this.balance.available += amount;
  return this.save();
};

// Method to add payment method
walletSchema.methods.addPaymentMethod = function(paymentMethod: any) {
  // If this is the first payment method, make it default
  if (this.paymentMethods.length === 0) {
    paymentMethod.isDefault = true;
  }
  
  // If this is set as default, unset others
  // If this is set as default, unset others
  if (paymentMethod.isDefault) {
  this.paymentMethods.forEach((method: any) => {
    method.isDefault = false;
  });
  }
  
  this.paymentMethods.push(paymentMethod);
  return this.save();
};

// Method to set default payment method
walletSchema.methods.setDefaultPaymentMethod = function(paymentMethodId: string) {
  this.paymentMethods.forEach((method: any) => {
    method.isDefault = method._id.toString() === paymentMethodId;
  });
  return this.save();
};

// Method to remove payment method
walletSchema.methods.removePaymentMethod = function(paymentMethodId: string) {
  const methodIndex = this.paymentMethods.findIndex(
    (method: any) => method._id.toString() === paymentMethodId
  );
  
  if (methodIndex === -1) {
    throw new Error('Payment method not found');
  }
  
  const method = this.paymentMethods[methodIndex];
  
  // If removing default method, set another as default
  if (method.isDefault && this.paymentMethods.length > 1) {
    const nextMethod = this.paymentMethods.find((method: any) => method._id.toString() !== paymentMethodId);
    if (nextMethod) {
      nextMethod.isDefault = true;
    }
  }
  
  this.paymentMethods.splice(methodIndex, 1);
  return this.save();
};

export default mongoose.model<IWallet>('Wallet', walletSchema);
