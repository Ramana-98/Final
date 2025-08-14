import express from 'express';
import { 
  getWallet, 
  getTransactions, 
  addPaymentMethod, 
  removePaymentMethod,
  setDefaultPaymentMethod,
  getPaymentMethods,
  updateWithdrawalSettings,
  getTransactionSummary
} from '../controllers/walletController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

// All routes require authentication
router.use(authenticateToken);

// Wallet information
router.get('/', getWallet);
router.get('/transactions', getTransactions);
router.get('/transactions/summary', getTransactionSummary);

// Payment methods
router.get('/payment-methods', getPaymentMethods);
router.post('/payment-methods', addPaymentMethod);
router.delete('/payment-methods/:id', removePaymentMethod);
router.patch('/payment-methods/:id/default', setDefaultPaymentMethod);

// Settings
router.put('/withdrawal-settings', updateWithdrawalSettings);

export default router;
