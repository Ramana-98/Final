import { Request, Response } from 'express';
import Project from '../models/Project';
import Transaction from '../models/Transaction';
import Wallet from '../models/Wallet';

export const getIncomeAnalytics = async (req: Request, res: Response) => {
  try {
    const { period } = req.params;
    const userId = req.user.userId;
    
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
        return res.status(400).json({ error: 'Invalid period' });
    }

    // Get user's wallet
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
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

    res.json({
      success: true,
      data: formattedData,
      period,
      summary: calculateSummary(incomeData)
    });

  } catch (error) {
    console.error('Error fetching income analytics:', error);
    res.status(500).json({ error: 'Failed to fetch income analytics' });
  }
};

export const getProjectStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    
    const stats = await Project.aggregate([
      {
        $match: { freelancerId: userId }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalEarnings: { $sum: '$totalAmount' }
        }
      }
    ]);

    res.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('Error fetching project stats:', error);
    res.status(500).json({ error: 'Failed to fetch project statistics' });
  }
};

export const getClientStats = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;
    
    const stats = await Project.aggregate([
      {
        $match: { freelancerId: userId }
      },
      {
        $group: {
          _id: '$clientId',
          projectCount: { $sum: 1 },
          totalSpent: { $sum: '$totalAmount' }
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
          projectCount: 1,
          totalSpent: 1
        }
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

function calculateSummary(data: any[]) {
  const total = data.reduce((sum, item) => sum + item.totalAmount, 0);
  const avg = data.length > 0 ? total / data.length : 0;
  return {
    total,
    average: avg,
    percentage: '+20%' // This would be calculated based on previous period
  };
}

