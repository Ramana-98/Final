// backend/src/controllers/notificationController.ts
import { Request, Response } from 'express';
export const getNotifications = (req: Request, res: Response) => res.json({ notifications: [] });
export const markAsRead = (req: Request, res: Response) => res.json({ ok: true });
export const markAllAsRead = (req: Request, res: Response) => res.json({ ok: true });
export const deleteNotification = (req: Request, res: Response) => res.json({ ok: true });
export const getUnreadCount = (req: Request, res: Response) => res.json({ count: 0 });
export const getNotificationSettings = (req: Request, res: Response) => res.json({ settings: {} });
export const updateNotificationSettings = (req: Request, res: Response) => res.json({ ok: true });

