import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  avatarUrl?: string;
  role: string;
  level: 'Junior' | 'Middle' | 'Senior';
  status: 'Available' | 'Busy' | 'Away' | 'In Meeting';
  location: string;
  timezone: string;
  phone: string;
  skills: string[];
  hourlyRate: number;
  currency: string;
  isPremium: boolean;
  bio?: string;
  experience?: number;
  education?: string[];
  certifications?: string[];
  languages?: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: true, 
    trim: true,
    maxlength: 100
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6,
    maxlength: 100
  },
  avatar: { 
    type: String, 
    default: '/avatars/default.png' 
  },
  avatarUrl: { 
    type: String 
  },
  role: { 
    type: String, 
    required: true,
    maxlength: 100
  },
  level: { 
    type: String, 
    enum: ['Junior', 'Middle', 'Senior'], 
    default: 'Middle' 
  },
  status: { 
    type: String, 
    enum: ['Available', 'Busy', 'Away', 'In Meeting'], 
    default: 'Available' 
  },
  location: { 
    type: String, 
    default: 'Unknown',
    maxlength: 100
  },
  timezone: { 
    type: String, 
    default: 'UTC',
    maxlength: 50
  },
  phone: { 
    type: String,
    maxlength: 20
  },
  skills: [{ 
    type: String,
    maxlength: 50
  }],
  hourlyRate: { 
    type: Number, 
    default: 10,
    min: 0,
    max: 1000
  },
  currency: { 
    type: String, 
    default: 'USD',
    maxlength: 3
  },
  isPremium: { 
    type: Boolean, 
    default: false 
  },
  bio: {
    type: String,
    maxlength: 500
  },
  experience: {
    type: Number,
    min: 0,
    max: 50
  },
  education: [{
    type: String,
    maxlength: 200
  }],
  certifications: [{
    type: String,
    maxlength: 200
  }],
  languages: [{
    type: String,
    maxlength: 50
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
userSchema.index({ email: 1 });
userSchema.index({ name: 1 });
userSchema.index({ role: 1 });
userSchema.index({ level: 1 });
userSchema.index({ status: 1 });
userSchema.index({ location: 1 });
userSchema.index({ skills: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'));
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return this.name;
});

// Virtual for display name
userSchema.virtual('displayName').get(function() {
  return this.name;
});

export default mongoose.model<IUser>('User', userSchema);
