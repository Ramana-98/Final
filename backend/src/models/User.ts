import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
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
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  avatar: { type: String, default: '/avatars/default.png' },
  role: { type: String, required: true },
  level: { type: String, enum: ['Junior', 'Middle', 'Senior'], default: 'Middle' },
  status: { type: String, enum: ['Available', 'Busy', 'Away', 'In Meeting'], default: 'Available' },
  location: { type: String, default: 'Unknown' },
  timezone: { type: String, default: 'UTC' },
  phone: { type: String },
  skills: [{ type: String }],
  hourlyRate: { type: Number, default: 10 },
  currency: { type: String, default: 'USD' },
  isPremium: { type: Boolean, default: false }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
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

export default mongoose.model<IUser>('User', userSchema);

