import express from 'express';
import { 
  getNotifications, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  getUnreadCount,
  getNotificationSettings,
  updateNotificationSettings
} from '../controllers/notificationController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Notification management
router.get('/', getNotifications);
router.get('/unread/count', getUnreadCount);
router.patch('/:id/read', markAsRead);
router.patch('/read-all', markAllAsRead);
router.delete('/:id', deleteNotification);

// Settings
router.get('/settings', getNotificationSettings);
router.put('/settings', updateNotificationSettings);

export default router;
