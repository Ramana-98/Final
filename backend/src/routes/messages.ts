import express from 'express';
import { 
  getConversations, 
  getMessages, 
  sendMessage, 
  markAsRead,
  deleteMessage,
  getUnreadCount
} from '../controllers/messageController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Conversation management
router.get('/conversations', getConversations);
router.get('/conversations/:userId', getMessages);
router.post('/conversations/:userId', sendMessage);

// Message management
router.patch('/:id/read', markAsRead);
router.delete('/:id', deleteMessage);
router.get('/unread/count', getUnreadCount);

export default router;
