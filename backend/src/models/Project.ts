import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  rate: number;
  rateType: 'hourly' | 'fixed';
  currency: string;
  status: 'Active' | 'Completed' | 'Cancelled' | 'Pending' | 'Paid' | 'Not Paid';
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
  category: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  progress: number;
  milestones?: Array<{
    title: string;
    description: string;
    dueDate: Date;
    completed: boolean;
    amount: number;
  }>;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const milestoneSchema = new Schema({
  title: { type: String, required: true, maxlength: 200 },
  description: { type: String, maxlength: 500 },
  dueDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  amount: { type: Number, required: true, min: 0 }
});

const projectSchema = new Schema<IProject>({
  title: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 200
  },
  description: { 
    type: String, 
    required: true,
    maxlength: 2000
  },
  rate: { 
    type: Number, 
    required: true,
    min: 0,
    max: 10000
  },
  rateType: { 
    type: String, 
    enum: ['hourly', 'fixed'], 
    default: 'hourly' 
  },
  currency: { 
    type: String, 
    default: 'USD',
    maxlength: 3
  },
  status: { 
    type: String, 
    enum: ['Active', 'Completed', 'Cancelled', 'Pending', 'Paid', 'Not Paid'], 
    default: 'Pending' 
  },
  type: { 
    type: String, 
    enum: ['Remote', 'On-site', 'Hybrid'], 
    default: 'Remote' 
  },
  mode: { 
    type: String, 
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'], 
    default: 'Freelance' 
  },
  country: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  clientId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  freelancerId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date 
  },
  totalHours: { 
    type: Number,
    min: 0
  },
  totalAmount: { 
    type: Number, 
    required: true,
    min: 0
  },
  isPaid: { 
    type: Boolean, 
    default: false 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Partial', 'Completed'], 
    default: 'Pending' 
  },
  tags: [{ 
    type: String,
    maxlength: 50
  }],
  category: {
    type: String,
    maxlength: 100
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Urgent'],
    default: 'Medium'
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  milestones: [milestoneSchema],
  attachments: [{ 
    type: String 
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
projectSchema.index({ clientId: 1 });
projectSchema.index({ freelancerId: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ type: 1 });
projectSchema.index({ mode: 1 });
projectSchema.index({ country: 1 });
projectSchema.index({ category: 1 });
projectSchema.index({ priority: 1 });
projectSchema.index({ startDate: 1 });
projectSchema.index({ tags: 1 });
projectSchema.index({ isPaid: 1 });
projectSchema.index({ paymentStatus: 1 });

// Virtual for time ago
projectSchema.virtual('timeAgo').get(function() {
  const now = new Date();
  const diffInMs = now.getTime() - this.createdAt.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)}w ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)}mo ago`;
  return `${Math.floor(diffInDays / 365)}y ago`;
});

// Virtual for formatted rate
projectSchema.virtual('formattedRate').get(function() {
  return `${this.currency === 'USD' ? '$' : '₹'}${this.rate}/${this.rateType === 'hourly' ? 'hour' : 'project'}`;
});

// Virtual for project duration
projectSchema.virtual('duration').get(function() {
  if (!this.startDate) return 'N/A';
  if (!this.endDate) return 'Ongoing';
  
  const diffInMs = this.endDate.getTime() - this.startDate.getTime();
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 1) return 'Less than 1 day';
  if (diffInDays < 7) return `${diffInDays} days`;
  if (diffInDays < 30) return `${Math.ceil(diffInDays / 7)} weeks`;
  if (diffInDays < 365) return `${Math.ceil(diffInDays / 30)} months`;
  return `${Math.ceil(diffInDays / 365)} years`;
});

export default mongoose.model<IProject>('Project', projectSchema);
