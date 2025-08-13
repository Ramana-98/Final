import express from 'express';
import Project from '../models/Project';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get user's projects
router.get('/', authenticateToken, async (req, res) => {
  try {
    const projects = await Project.find({ freelancerId: req.user.userId })
      .populate('clientId', 'name avatar')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// Get project by ID
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('clientId', 'name avatar email phone location')
      .populate('freelancerId', 'name avatar email phone location');

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// Create new project
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, rate, rateType, currency, type, mode, country, clientId, startDate, totalAmount, tags } = req.body;

    const project = new Project({
      title,
      description,
      rate,
      rateType,
      currency,
      type,
      mode,
      country,
      clientId,
      freelancerId: req.user.userId,
      startDate,
      totalAmount,
      tags
    });

    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { title, description, rate, rateType, currency, type, mode, country, startDate, endDate, totalHours, totalAmount, status, paymentStatus, tags } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        rate,
        rateType,
        currency,
        type,
        mode,
        country,
        startDate,
        endDate,
        totalHours,
        totalAmount,
        status,
        paymentStatus,
        tags
      },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;

