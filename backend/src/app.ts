import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';

// Safe route loader to avoid build-time errors if a route file is missing
const loadRoute = (p: string): express.Router => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const mod = require(p);
    return (mod.default || mod) as express.Router;
  } catch {
    console.warn(`Route "${p}" not found. Using empty router.`);
    return express.Router();
  }
};

// Load routes (safe even if the file does not exist yet)
const authRoutes = loadRoute('./routes/auth');
const userRoutes = loadRoute('./routes/users');
const projectRoutes = loadRoute('./routes/projects');
const messageRoutes = loadRoute('./routes/messages');
const walletRoutes = loadRoute('./routes/wallet');
const notificationRoutes = loadRoute('./routes/notifications');
const analyticsRoutes = loadRoute('./routes/analytics');
const connectionRoutes = loadRoute('./routes/connections');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../env.config') });

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100') // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || '');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/connections', connectionRoutes);

// Health check
app.get('/health', (req: express.Request, res: express.Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'
  });
});

// API info
app.get('/api', (req: express.Request, res: express.Response) => {
  res.json({
    message: 'Dashboard API is running',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      projects: '/api/projects',
      messages: '/api/messages',
      wallet: '/api/wallet',
      notifications: '/api/notifications',
      analytics: '/api/analytics',
      connections: '/api/connections'
    }
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Dashboard Backend Server running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 API info: http://localhost:${PORT}/api`);
});