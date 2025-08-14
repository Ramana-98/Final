import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId;
  type: 'message' | 'job' | 'proposal' | 'connection' | 'payment' | 'upgrade' | 'project' | 'system';
  text: string;
  meta?: string;
  isRead: boolean;
  relatedId?: mongoose.Types.ObjectId;
  relatedType?: 'project' | 'message' | 'user' | 'transaction';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  actionText?: string;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: ['message', 'job', 'proposal', 'connection', 'payment', 'upgrade', 'project', 'system'], 
    required: true 
  },
  text: { 
    type: String, 
    required: true,
    maxlength: 500
  },
  meta: { 
    type: String,
    maxlength: 200
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  relatedId: { 
    type: Schema.Types.ObjectId 
  },
  relatedType: { 
    type: String, 
    enum: ['project', 'message', 'user', 'transaction'] 
  },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  actionUrl: { 
    type: String,
    maxlength: 500
  },
  actionText: { 
    type: String,
    maxlength: 100
  },
  expiresAt: { 
    type: Date 
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for better performance
notificationSchema.index({ userId: 1 });
notificationSchema.index({ type: 1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ priority: 1 });
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ expiresAt: 1 });
notificationSchema.index({ relatedId: 1, relatedType: 1 });

// Compound indexes for common queries
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ userId: 1, type: 1 });
notificationSchema.index({ userId: 1, priority: 1 });
notificationSchema.index({ userId: 1, createdAt: -1 });

// TTL index for expired notifications
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for time ago
notificationSchema.virtual('timeAgo').get(function() {
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

// Virtual for is expired
notificationSchema.virtual('isExpired').get(function() {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
});

// Virtual for priority color (for frontend)
notificationSchema.virtual('priorityColor').get(function() {
  switch (this.priority) {
    case 'urgent': return 'red';
    case 'high': return 'orange';
    case 'medium': return 'blue';
    case 'low': return 'green';
    default: return 'blue';
  }
});

// Virtual for icon (for frontend)
notificationSchema.virtual('icon').get(function() {
  switch (this.type) {
    case 'message': return 'MessageSquare';
    case 'job': return 'Briefcase';
    case 'proposal': return 'FileText';
    case 'connection': return 'Users';
    case 'payment': return 'CreditCard';
    case 'upgrade': return 'Crown';
    case 'project': return 'FolderOpen';
    case 'system': return 'Bell';
    default: return 'Bell';
  }
});

// Method to mark as read
notificationSchema.methods.markAsRead = function() {
  this.isRead = true;
  return this.save();
};

// Method to mark as unread
notificationSchema.methods.markAsUnread = function() {
  this.isRead = false;
  return this.save();
};

// Static method to get unread count
notificationSchema.statics.getUnreadCount = function(userId: string) {
  return this.countDocuments({ userId, isRead: false });
};

// Static method to get notifications by type
notificationSchema.statics.getByType = function(userId: string, type: string, limit: number = 10) {
  return this.find({ userId, type, isRead: false })
    .sort({ createdAt: -1 })
    .limit(limit)
    .populate('relatedId');
};

// Static method to mark all as read
notificationSchema.statics.markAllAsRead = function(userId: string) {
  return this.updateMany(
    { userId, isRead: false },
    { isRead: true }
  );
};

// Static method to create system notification
notificationSchema.statics.createSystemNotification = function(
  userId: string, 
  text: string, 
  priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium',
  actionUrl?: string,
  actionText?: string
) {
  return this.create({
    userId,
    type: 'system',
    text,
    priority,
    actionUrl,
    actionText,
    isRead: false
  });
};

// Static method to create project notification
notificationSchema.statics.createProjectNotification = function(
  userId: string,
  projectId: string,
  text: string,
  type: 'project' | 'payment' = 'project',
  priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'
) {
  return this.create({
    userId,
    type,
    text,
    relatedId: projectId,
    relatedType: 'project',
    priority,
    isRead: false
  });
};

// Static method to create message notification
notificationSchema.statics.createMessageNotification = function(
  userId: string,
  messageId: string,
  text: string,
  priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'
) {
  return this.create({
    userId,
    type: 'message',
    text,
    relatedId: messageId,
    relatedType: 'message',
    priority,
    isRead: false
  });
};

// Static method to create payment notification
notificationSchema.statics.createPaymentNotification = function(
  userId: string,
  transactionId: string,
  text: string,
  priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium'
) {
  return this.create({
    userId,
    type: 'payment',
    text,
    relatedId: transactionId,
    relatedType: 'transaction',
    priority,
    isRead: false
  });
};

export default mongoose.model<INotification>('Notification', notificationSchema);
