// backend/src/controllers/messageController.ts
import { Request, Response } from 'express';
export const getConversations = (req: Request, res: Response) => res.json({ conversations: [] });
export const getMessages = (req: Request, res: Response) => res.json({ messages: [] });
export const sendMessage = (req: Request, res: Response) => res.status(201).json({ ok: true });
export const markAsRead = (req: Request, res: Response) => res.json({ ok: true });
export const deleteMessage = (req: Request, res: Response) => res.json({ ok: true });
export const getUnreadCount = (req: Request, res: Response) => res.json({ count: 0 });