import express from 'express';
import { 
  getConnections, 
  getConnectionRequests, 
  getSuggestedConnections,
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  removeConnection,
  getConnectionStats
} from '../controllers/connectionController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Connection management
router.get('/', getConnections);
router.get('/requests', getConnectionRequests);
router.get('/suggested', getSuggestedConnections);
router.get('/stats', getConnectionStats);

// Connection actions
router.post('/:userId/request', sendConnectionRequest);
router.patch('/:userId/accept', acceptConnectionRequest);
router.patch('/:userId/reject', rejectConnectionRequest);
router.delete('/:userId', removeConnection);

export default router;
