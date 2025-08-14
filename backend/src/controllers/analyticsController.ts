import { Request, Response } from 'express';
import Project from '../models/Project';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';
import User from '../models/User';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: any;
}

export const getIncomeAnalytics = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { period } = req.params;
    const userId = req.user._id;
    
    let startDate: Date;
    let endDate: Date = new Date();
    
    switch (period) {
      case 'week':
        startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(endDate.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case 'year':
        startDate = new Date(endDate.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        res.status(400).json({ error: 'Invalid period. Use: week, month, or year' });
        return;
    }

    // Get wallet for the user
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      res.status(404).json({ error: 'Wallet not found' });
      return;
    }

    // Get income data for the period
    const incomeData = await Transaction.aggregate([
      {
        $match: {
          walletId: wallet._id,
          type: 'Payment Received',
          status: 'Completed',
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: period === 'week' ? '%u' : period === 'month' ? '%U' : '%Y-%m',
              date: '$createdAt'
            }
          },
          totalAmount: { $sum: '$amount' }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    // Format data for frontend
    let formattedData;
    if (period === 'week') {
      formattedData = formatWeekData(incomeData);
    } else if (period === 'month') {
      formattedData = formatMonthData(incomeData);
    } else {
      formattedData = formatYearData(incomeData);
    }

    // Calculate summary statistics
    const summary = calculateSummary(incomeData, period);

    res.json({ success: true, data: formattedData, period, summary, currency: wallet.balance.currency });
    return;

  } catch (error) {
    console.error('Error fetching income analytics:', error);
    res.status(500).json({ error: 'Failed to fetch income analytics' });
    return;
  }
};

export const getProjectStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    
    const stats = await Project.aggregate([
      {
        $match: { freelancerId: userId }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalEarnings: { $sum: '$totalAmount' },
          avgRate: { $avg: '$rate' }
        }
      }
    ]);

    // Get total projects count
    const totalProjects = await Project.countDocuments({ freelancerId: userId });
    
    // Get recent projects
    const recentProjects = await Project.find({ freelancerId: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('clientId', 'name avatar');

    res.json({
      success: true,
      data: {
        stats,
        totalProjects,
        recentProjects
      }
    });

  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({ error: 'Failed to fetch project statistics' });
  }
};

export const getClientStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    
    const stats = await Project.aggregate([
      {
        $match: { freelancerId: userId }
      },
      {
        $group: {
          _id: '$clientId',
          projectCount: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' },
          avgProjectValue: { $avg: '$totalAmount' }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      {
        $unwind: '$client'
      },
      {
        $project: {
          clientName: '$client.name',
          clientAvatar: '$client.avatar',
          clientAvatarUrl: '$client.avatarUrl',
          projectCount: 1,
          totalSpent: 1,
          avgProjectValue: 1
        }
      },
      {
        $sort: { totalSpent: -1 }
      }
    ]);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching client stats:', error);
    res.status(500).json({ error: 'Failed to fetch client statistics' });
  }
};

export const getDashboardOverview = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user._id;
    
    // Get wallet balance
    const wallet = await Wallet.findOne({ userId });
    
    // Get project counts by status
    const projectStats = await Project.aggregate([
      {
        $match: { freelancerId: userId }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    // Get recent transactions
    const recentTransactions = await Transaction.find({ 
      walletId: wallet?._id 
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('projectId', 'title');

    // Get unread notifications count
    const unreadNotifications = await require('../models/Notification').getUnreadCount(userId);

    // Get upcoming project deadlines
    const upcomingDeadlines = await Project.find({
      freelancerId: userId,
      status: 'Active',
      endDate: { $gte: new Date() }
    })
      .sort({ endDate: 1 })
      .limit(5)
      .select('title endDate progress');

    res.json({
      success: true,
      data: {
        wallet: wallet || { balance: { available: 0, pending: 0, currency: 'INR' } },
        projectStats,
        recentTransactions,
        unreadNotifications,
        upcomingDeadlines
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard overview:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard overview' });
  }
};

// Helper functions
function formatWeekData(data: any[]) {
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  return weekDays.map((day, index) => {
    const found = data.find(d => parseInt(d._id) === index + 1);
    return {
      day,
      amount: found ? found.totalAmount : 0
    };
  });
}

function formatMonthData(data: any[]) {
  return data.map(d => ({
    day: `W${d._id}`,
    amount: d.totalAmount
  }));
}

function formatYearData(data: any[]) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return months.map((month, index) => {
    const found = data.find(d => d._id === `${new Date().getFullYear()}-${String(index + 1).padStart(2, '0')}`);
    return {
      day: month,
      amount: found ? found.totalAmount : 0
    };
  });
}

function calculateSummary(data: any[], period: string) {
  const total = data.reduce((sum, item) => sum + item.totalAmount, 0);
  const avg = data.length > 0 ? total / data.length : 0;
  
  // Calculate percentage change (mock data for now)
  let percentage = '+20%';
  let summaryText = '';
  
  switch (period) {
    case 'week':
      summaryText = "This week's income is higher than last week's";
      break;
    case 'month':
      summaryText = "This month's income is higher than last month's";
      break;
    case 'year':
      summaryText = "This year's income is higher than last year's";
      break;
  }
  
  return {
    total,
    average: avg,
    percentage,
    summaryText
  };
}
