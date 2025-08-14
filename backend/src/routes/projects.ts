import express from 'express';
import { 
  getProjects, 
  getProject, 
  createProject, 
  updateProject, 
  deleteProject,
  updateProjectStatus,
  getProjectProposals,
  submitProposal,
  updateProposal
} from '../controllers/projectController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Project CRUD operations
router.get('/', getProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

// Project status management
router.patch('/:id/status', updateProjectStatus);

// Proposal management
router.get('/:id/proposals', getProjectProposals);
router.post('/:id/proposals', submitProposal);
router.put('/:id/proposals/:proposalId', updateProposal);

export default router;
