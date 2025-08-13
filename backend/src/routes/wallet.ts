import express from 'express';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// Get wallet balance
router.get('/balance', authenticateToken, async (req, res) => {
  try {
    let wallet = await Wallet.findOne({ userId: req.user.userId });
    
    if (!wallet) {
      // Create wallet if it doesn't exist
      wallet = new Wallet({ userId: req.user.userId });
      await wallet.save();
    }

    res.json({
      success: true,
      data: wallet
    });
  } catch (error) {
    console.error('Error fetching wallet:', error);
    res.status(500).json({ error: 'Failed to fetch wallet' });
  }
});

// Get transactions
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    const transactions = await Transaction.find({ walletId: wallet._id })
      .populate('projectId', 'title')
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({
      success: true,
      data: transactions
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// Add payment method
router.post('/payment-methods', authenticateToken, async (req, res) => {
  try {
    const { bankName, accountNumber, upiId } = req.body;
    
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    wallet.paymentMethods.push({
      bankName,
      accountNumber,
      upiId
    });

    await wallet.save();

    res.json({
      success: true,
      message: 'Payment method added successfully',
      data: wallet
    });
  } catch (error) {
    console.error('Error adding payment method:', error);
    res.status(500).json({ error: 'Failed to add payment method' });
  }
});

// Update payment method
router.put('/payment-methods/:index', authenticateToken, async (req, res) => {
  try {
    const { bankName, accountNumber, upiId } = req.body;
    const index = parseInt(req.params.index);
    
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (index < 0 || index >= wallet.paymentMethods.length) {
      return res.status(400).json({ error: 'Invalid payment method index' });
    }

    wallet.paymentMethods[index] = {
      bankName,
      accountNumber,
      upiId
    };

    await wallet.save();

    res.json({
      success: true,
      message: 'Payment method updated successfully',
      data: wallet
    });
  } catch (error) {
    console.error('Error updating payment method:', error);
    res.status(500).json({ error: 'Failed to update payment method' });
  }
});

// Request withdrawal
router.post('/withdraw', authenticateToken, async (req, res) => {
  try {
    const { amount, paymentMethodIndex } = req.body;
    
    const wallet = await Wallet.findOne({ userId: req.user.userId });
    
    if (!wallet) {
      return res.status(404).json({ error: 'Wallet not found' });
    }

    if (amount > wallet.balance.available) {
      return res.status(400).json({ error: 'Insufficient balance' });
    }

    if (amount < 500) {
      return res.status(400).json({ error: 'Minimum withdrawal amount is ₹500' });
    }

    // Create withdrawal transaction
    const transaction = new Transaction({
      walletId: wallet._id,
      type: 'Withdrawal',
      amount: -amount,
      currency: wallet.balance.currency,
      status: 'Pending',
      description: 'Withdrawal request'
    });

    await transaction.save();

    // Update wallet balance
    wallet.balance.available -= amount;
    wallet.transactions.push(transaction._id);
    await wallet.save();

    res.json({
      success: true,
      message: 'Withdrawal request submitted successfully',
      data: transaction
    });
  } catch (error) {
    console.error('Error requesting withdrawal:', error);
    res.status(500).json({ error: 'Failed to request withdrawal' });
  }
});

export default router;

