// backend/src/controllers/connectionController.ts
import { Request, Response } from 'express';
export const getConnections = (req: Request, res: Response) => res.json({ connections: [] });
export const getConnectionRequests = (req: Request, res: Response) => res.json({ requests: [] });
export const getSuggestedConnections = (req: Request, res: Response) => res.json({ suggested: [] });
export const sendConnectionRequest = (req: Request, res: Response) => res.status(201).json({ ok: true });
export const acceptConnectionRequest = (req: Request, res: Response) => res.json({ ok: true });
export const rejectConnectionRequest = (req: Request, res: Response) => res.json({ ok: true });
export const removeConnection = (req: Request, res: Response) => res.json({ ok: true });
export const getConnectionStats = (req: Request, res: Response) => res.json({ stats: {} });

