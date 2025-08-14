import { Request, Response } from 'express';
export const getUsers = (req: Request, res: Response) => res.json({ users: [] });
export const getUser = (req: Request, res: Response) => res.json({ user: {} });
export const updateUser = (req: Request, res: Response) => res.json({ ok: true });
export const deleteUser = (req: Request, res: Response) => res.json({ ok: true });
export const searchUsers = (req: Request, res: Response) => res.json({ users: [] });
export const getUserConnections = (req: Request, res: Response) => res.json({ connections: [] });
export const sendConnectionRequest = (req: Request, res: Response) => res.status(201).json({ ok: true });
export const acceptConnectionRequest = (req: Request, res: Response) => res.json({ ok: true });
export const rejectConnectionRequest = (req: Request, res: Response) => res.json({ ok: true });
export const removeConnection = (req: Request, res: Response) => res.json({ ok: true });



