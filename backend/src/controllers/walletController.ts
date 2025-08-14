// backend/src/controllers/walletController.ts
import { Request, Response } from 'express';
export const getWallet = (req: Request, res: Response) => res.json({ wallet: {} });
export const getTransactions = (req: Request, res: Response) => res.json({ transactions: [] });
export const getTransactionSummary = (req: Request, res: Response) => res.json({ summary: {} });
export const getPaymentMethods = (req: Request, res: Response) => res.json({ paymentMethods: [] });
export const addPaymentMethod = (req: Request, res: Response) => res.status(201).json({ ok: true });
export const removePaymentMethod = (req: Request, res: Response) => res.json({ ok: true });
export const setDefaultPaymentMethod = (req: Request, res: Response) => res.json({ ok: true });
export const updateWithdrawalSettings = (req: Request, res: Response) => res.json({ ok: true });


