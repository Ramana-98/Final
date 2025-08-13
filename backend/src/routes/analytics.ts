import express from 'express';
import { getIncomeAnalytics, getProjectStats, getClientStats } from '../controllers/analyticsController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Get income analytics (week/month/year)
router.get('/income/:period', getIncomeAnalytics);

// Get project statistics
router.get('/projects', getProjectStats);

// Get client statistics
router.get('/clients', getClientStats);

export default router;

