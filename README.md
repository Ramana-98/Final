# 🚀 Dashboard - Full Stack Application

A modern, responsive dashboard built with React, TypeScript, and Node.js, featuring real-time analytics, project management, messaging, and wallet functionality.

## ✨ Features

- **📊 Real-time Analytics**: Income tracking with week/month/year views
- **👥 User Management**: Authentication, profiles, and connections
- **📁 Project Management**: Create, track, and manage projects
- **💬 Messaging System**: Real-time communication between users
- **💰 Wallet & Transactions**: Payment tracking and withdrawal management
- **🔔 Notifications**: Real-time updates and alerts
- **🎨 Modern UI**: Built with ShadCN components and Tailwind CSS
- **📱 Responsive Design**: Works perfectly on all devices

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based with bcrypt password hashing
- **Real-time**: WebSocket support for live updates

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB 7.0+
- Docker (optional, for containerized setup)

### Option 1: Docker Setup (Recommended)

1. **Clone and navigate to project:**
   ```bash
   cd dashboard
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017
   - Mongo Express: http://localhost:8081

### Option 2: Manual Setup

1. **Install frontend dependencies:**
   ```bash
   npm install
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Start MongoDB:**
   ```bash
   # Install MongoDB locally or use MongoDB Atlas
   mongod
   ```

5. **Start backend:**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start frontend:**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
dashboard/
├── src/                    # Frontend source
│   ├── components/        # React components
│   ├── hooks/            # Custom hooks
│   ├── context/          # React context
│   └── lib/              # Utilities
├── backend/               # Backend source
│   ├── src/
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Business logic
│   │   └── middleware/   # Express middleware
│   └── scripts/          # Database scripts
├── docker-compose.yml     # Docker configuration
└── package.json          # Frontend dependencies
```

## 🔐 Authentication

The application uses JWT-based authentication:

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Profile**: `GET /api/auth/me`

### Sample User Credentials

```
Email: john.doe@example.com
Password: password123
```

## 📊 API Endpoints

### Analytics
- `GET /api/analytics/income/:period` - Income analytics (week/month/year)
- `GET /api/analytics/projects` - Project statistics
- `GET /api/analytics/clients` - Client statistics

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user profile
- `PUT /api/users/profile` - Update profile

### Projects
- `GET /api/projects` - Get user's projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Messages
- `GET /api/messages/conversations` - Get conversations
- `GET /api/messages/:userId` - Get messages with user
- `POST /api/messages` - Send message

### Wallet
- `GET /api/wallet/balance` - Get wallet balance
- `GET /api/wallet/transactions` - Get transactions
- `POST /api/wallet/withdraw` - Request withdrawal

### Notifications
- `GET /api/notifications` - Get notifications
- `PUT /api/notifications/:id/read` - Mark as read
- `DELETE /api/notifications/:id` - Delete notification

## 🗄️ Database Schema

### Users
- Profile information (name, email, role, skills)
- Authentication (password, JWT tokens)
- Status and availability

### Projects
- Project details (title, description, rate)
- Client and freelancer relationships
- Payment status and tracking

### Messages
- Real-time communication
- Project context
- Read/unread status

### Wallet
- Balance tracking (available, pending)
- Transaction history
- Payment methods

### Notifications
- Real-time alerts
- Type categorization
- Read status tracking

## 🛠️ Development

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint

# Backend
npm run backend      # Start backend server
npm run backend:build # Build backend
npm run fullstack    # Start both frontend and backend

# Database
npm run seed         # Seed database with sample data
```

### Environment Variables

```env
# Backend (.env)
PORT=5000
MONGODB_URI=mongodb://localhost:27017/dashboard
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:5173
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and restart
docker-compose up -d --build

# Access MongoDB shell
docker-compose exec mongo mongosh dashboard
```

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network access

2. **Port Already in Use**
   - Change ports in `docker-compose.yml`
   - Kill processes using ports 5000, 5173, 27017

3. **Authentication Errors**
   - Clear localStorage
   - Check JWT secret in `.env`
   - Verify token expiration

4. **Build Errors**
   - Clear `node_modules` and reinstall
   - Check TypeScript version compatibility
   - Verify all dependencies are installed

### Logs and Debugging

```bash
# Backend logs
docker-compose logs backend

# MongoDB logs
docker-compose logs mongo

# Frontend logs (browser console)
# Check Network tab for API calls
```

## 📈 Performance Optimization

- **Database Indexing**: Optimized MongoDB indexes for queries
- **API Caching**: Implemented rate limiting and response caching
- **Frontend Optimization**: Code splitting and lazy loading
- **Image Optimization**: Compressed assets and lazy loading

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: API request throttling
- **CORS Protection**: Cross-origin request security
- **Input Validation**: Request data sanitization
- **Helmet Security**: HTTP header protection

## 🌟 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**Happy Coding! 🚀**
