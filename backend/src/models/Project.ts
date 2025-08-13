import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  rate: number;
  rateType: 'hourly' | 'fixed';
  currency: string;
  status: 'Active' | 'Completed' | 'Cancelled' | 'Pending';
  type: 'Remote' | 'On-site' | 'Hybrid';
  mode: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance';
  country: string;
  clientId: mongoose.Types.ObjectId;
  freelancerId: mongoose.Types.ObjectId;
  startDate: Date;
  endDate?: Date;
  totalHours?: number;
  totalAmount: number;
  isPaid: boolean;
  paymentStatus: 'Pending' | 'Partial' | 'Completed';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: Number, required: true },
  rateType: { type: String, enum: ['hourly', 'fixed'], default: 'hourly' },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['Active', 'Completed', 'Cancelled', 'Pending'], default: 'Pending' },
  type: { type: String, enum: ['Remote', 'On-site', 'Hybrid'], default: 'Remote' },
  mode: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'], default: 'Freelance' },
  country: { type: String, required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  freelancerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  totalHours: { type: Number },
  totalAmount: { type: Number, required: true },
  isPaid: { type: Boolean, default: false },
  paymentStatus: { type: String, enum: ['Pending', 'Partial', 'Completed'], default: 'Pending' },
  tags: [{ type: String }]
}, {
  timestamps: true
});

export default mongoose.model<IProject>('Project', projectSchema);

