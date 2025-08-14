import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = async (
  req: AuthRequest, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) { res.status(401).json({ error: 'Access token required', message: 'Please provide a valid authentication token' }); return; }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dashboard-super-secret-jwt-key-2024') as any;
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) { res.status(401).json({ error: 'Invalid token', message: 'User no longer exists' }); return; }

    req.user = user;
    return next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) { res.status(403).json({ error: 'Invalid token', message: 'Token is invalid or expired' }); return; }
    console.error('Auth middleware error:', error);
    res.status(500).json({ error: 'Authentication error', message: 'Something went wrong during authentication' }); return;
  }
};

export const requirePremium = (
  req: AuthRequest, res: Response, next: NextFunction
): void => {
  if (!req.user) { res.status(401).json({ error: 'Authentication required', message: 'Please log in to access this feature' }); return; }
  if (!req.user.isPremium) { res.status(403).json({ error: 'Premium required', message: 'This feature requires a premium subscription' }); return; }
  return next();
};

export const requireRole = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) { res.status(401).json({ error: 'Authentication required', message: 'Please log in to access this feature' }); return; }
    if (!roles.includes(req.user.role)) { res.status(403).json({ error: 'Insufficient permissions', message: 'You do not have permission to access this feature' }); return; }
    return next();
  };
};

export const optionalAuth = async (
  req: AuthRequest, res: Response, next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'dashboard-super-secret-jwt-key-2024') as any;
      const user = await User.findById(decoded.userId).select('-password');
      if (user) req.user = user;
    }
    return next();
  } catch {
    return next();
  }
};
