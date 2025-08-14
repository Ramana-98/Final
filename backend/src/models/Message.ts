import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  projectId?: mongoose.Types.ObjectId;
  content: string;
  messageType: 'text' | 'file' | 'image' | 'system';
  isRead: boolean;
  attachments?: string[];
  replyTo?: mongoose.Types.ObjectId;
  isEdited: boolean;
  editedAt?: Date;
  isDeleted: boolean;
  deletedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  senderId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiverId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  projectId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Project' 
  },
  content: { 
    type: String, 
    required: true,
    maxlength: 2000
  },
  messageType: { 
    type: String, 
    enum: ['text', 'file', 'image', 'system'], 
    default: 'text' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  attachments: [{ 
    type: String 
  }],
  replyTo: { 
    type: Schema.Types.ObjectId, 
    ref: 'Message' 
  },
  isEdited: { 
    type: Boolean, 
    default: false 
  },
  editedAt: { 
    type: Date 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  deletedAt: { 
    type: Date 
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
messageSchema.index({ senderId: 1 });
messageSchema.index({ receiverId: 1 });
messageSchema.index({ projectId: 1 });
messageSchema.index({ createdAt: -1 });
messageSchema.index({ isRead: 1 });
messageSchema.index({ isDeleted: 1 });

// Compound index for conversation queries
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ receiverId: 1, senderId: 1 });

// Virtual for time ago
messageSchema.virtual('timeAgo').get(function() {
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

// Virtual for isOwnMessage (to be set by controller)
messageSchema.virtual('isOwnMessage').get(function() {
  return false; // This will be set by the controller
});

// Virtual for sender info (populated)
messageSchema.virtual('sender', {
  ref: 'User',
  localField: 'senderId',
  foreignField: '_id',
  justOne: true
});

// Virtual for receiver info (populated)
messageSchema.virtual('receiver', {
  ref: 'User',
  localField: 'receiverId',
  foreignField: '_id',
  justOne: true
});

// Virtual for project info (populated)
messageSchema.virtual('project', {
  ref: 'Project',
  localField: 'projectId',
  foreignField: '_id',
  justOne: true
});

// Pre-save middleware to handle edited messages
messageSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.isEdited = true;
    this.editedAt = new Date();
  }
  next();
});

// Method to mark as read
messageSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

// Method to soft delete
messageSchema.methods.softDelete = function() {
  this.isDeleted = true;
  this.deletedAt = new Date();
  return this.save();
};

// Static method to get conversation between two users
messageSchema.statics.getConversation = function(userId1: string, userId2: string, projectId?: string) {
  const query: any = {
    $or: [
      { senderId: userId1, receiverId: userId2 },
      { senderId: userId2, receiverId: userId1 }
    ],
    isDeleted: false
  };

  if (projectId) {
    query.projectId = projectId;
  }

  return this.find(query)
    .sort({ createdAt: 1 })
    .populate('senderId', 'name avatar avatarUrl')
    .populate('receiverId', 'name avatar avatarUrl')
    .populate('projectId', 'title')
    .populate('replyTo', 'content senderId');
};

export default mongoose.model<IMessage>('Message', messageSchema);
