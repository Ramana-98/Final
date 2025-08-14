import express from 'express';
import { 
  getUsers, 
  getUser, 
  updateUser, 
  deleteUser,
  searchUsers,
  getUserConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeConnection
} from '../controllers/userController';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// User management
router.get('/', getUsers);
router.get('/search', searchUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', requireRole(['admin']), deleteUser);

// Connection management
router.get('/connections', getUserConnections);
router.post('/connections/:userId/request', sendConnectionRequest);
router.patch('/connections/:userId/accept', acceptConnectionRequest);
router.patch('/connections/:userId/reject', rejectConnectionRequest);
router.delete('/connections/:userId', removeConnection);

export default router;
