# 🚀 Dashboard Backend API

A complete backend solution for the Dashboard application built with Node.js, Express, TypeScript, and MongoDB.

## ✨ Features

- **🔐 Authentication & Authorization** - JWT-based authentication with role-based access control
- **📊 Analytics & Reporting** - Income tracking, project statistics, and client analytics
- **💼 Project Management** - Complete project lifecycle management
- **💬 Messaging System** - Real-time messaging between users
- **💰 Wallet & Transactions** - Financial management with payment methods
- **🔔 Notifications** - Comprehensive notification system
- **👥 User Management** - User profiles, connections, and networking
- **🛡️ Security** - Rate limiting, CORS, helmet, and input validation

## 🏗️ Architecture

```
backend/
├── src/
│   ├── controllers/     # Business logic
│   ├── models/         # Database schemas
│   ├── routes/         # API endpoints
│   ├── middleware/     # Custom middleware
│   └── app.ts          # Main application
├── package.json
├── tsconfig.json
└── env.config
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- MongoDB Atlas account
- npm or yarn

### Installation

1. **Clone and navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment:**
   - Copy `env.config` to `.env` (if needed)
   - Update MongoDB connection string in `env.config`

4. **Start development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## 🔧 Configuration

### Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Database
MONGODB_URI=mongodb+srv://Dashboard:dashboard123@cluster0.rulhsag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JWT Configuration
JWT_SECRET=dashboard-super-secret-jwt-key-2024
JWT_EXPIRES_IN=7d

# Frontend URL
FRONTEND_URL=http://localhost:5173

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_SALT_ROUNDS=10
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh-token` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password

### Analytics
- `GET /api/analytics/income/:period` - Get income analytics (week/month/year)
- `GET /api/analytics/projects` - Get project statistics
- `GET /api/analytics/clients` - Get client statistics
- `GET /api/analytics/overview` - Get dashboard overview

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get specific project
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `PATCH /api/projects/:id/status` - Update project status

### Messages
- `GET /api/messages/conversations` - Get all conversations
- `GET /api/messages/conversations/:userId` - Get messages with specific user
- `POST /api/messages/conversations/:userId` - Send message
- `PATCH /api/messages/:id/read` - Mark message as read

### Wallet
- `GET /api/wallet` - Get wallet information
- `GET /api/wallet/transactions` - Get transaction history
- `GET /api/wallet/payment-methods` - Get payment methods
- `POST /api/wallet/payment-methods` - Add payment method
- `DELETE /api/wallet/payment-methods/:id` - Remove payment method

### Notifications
- `GET /api/notifications` - Get all notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `PATCH /api/notifications/read-all` - Mark all notifications as read
- `GET /api/notifications/unread/count` - Get unread count

### Users
- `GET /api/users` - Get all users
- `GET /api/users/search` - Search users
- `GET /api/users/:id` - Get specific user
- `PUT /api/users/:id` - Update user
- `GET /api/users/connections` - Get user connections

### Connections
- `GET /api/connections` - Get all connections
- `GET /api/connections/requests` - Get connection requests
- `GET /api/connections/suggested` - Get suggested connections
- `POST /api/connections/:userId/request` - Send connection request
- `PATCH /api/connections/:userId/accept` - Accept connection request

## 🗄️ Database Models

### User
- Profile information (name, email, avatar, role, level, status)
- Skills, experience, education
- Premium subscription status
- Location and timezone

### Project
- Project details (title, description, rate, type, mode)
- Status tracking (Active, Completed, Cancelled, Pending)
- Client and freelancer relationships
- Milestones and progress tracking

### Message
- Sender and receiver information
- Message content and type
- Read status and timestamps
- Project context

### Wallet
- Balance (available, pending)
- Payment methods (bank, UPI, cards)
- Withdrawal settings
- Transaction history

### Transaction
- Transaction types (Payment, Withdrawal, Bonus, Fee)
- Amount and currency
- Status tracking
- Payment method details

### Notification
- Notification types (message, job, payment, system)
- Priority levels
- Read status
- Action URLs and text

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication:

1. **Login/Register** to get a JWT token
2. **Include token** in Authorization header: `Bearer <token>`
3. **Token expires** after 7 days (configurable)
4. **Refresh token** endpoint available for seamless experience

## 🛡️ Security Features

- **Rate Limiting** - Prevents abuse (100 requests per 15 minutes)
- **CORS Protection** - Configurable cross-origin requests
- **Helmet** - Security headers
- **Input Validation** - Schema-based validation
- **Password Hashing** - bcrypt with configurable salt rounds
- **JWT Security** - Secure token handling

## 📊 Database Indexes

Optimized indexes for:
- User queries (email, name, role, skills)
- Project searches (status, type, client, freelancer)
- Message conversations (sender, receiver, project)
- Transaction history (wallet, type, status, date)
- Notification delivery (user, type, read status)

## 🚀 Performance Features

- **Database Indexing** - Optimized queries
- **Pagination** - Large dataset handling
- **Aggregation Pipelines** - Complex analytics
- **Virtual Fields** - Computed properties
- **Population** - Efficient relationship loading

## 🔧 Development

### Scripts

```bash
npm run dev      # Start development server with nodemon
npm run build    # Build TypeScript to JavaScript
npm start        # Start production server
```

### File Structure

```
src/
├── controllers/         # Business logic handlers
│   ├── analyticsController.ts
│   ├── authController.ts
│   ├── projectController.ts
│   ├── messageController.ts
│   ├── walletController.ts
│   ├── notificationController.ts
│   ├── userController.ts
│   └── connectionController.ts
├── models/             # Database schemas
│   ├── User.ts
│   ├── Project.ts
│   ├── Message.ts
│   ├── Wallet.ts
│   ├── Transaction.ts
│   └── Notification.ts
├── routes/             # API endpoint definitions
│   ├── analytics.ts
│   ├── auth.ts
│   ├── projects.ts
│   ├── messages.ts
│   ├── wallet.ts
│   ├── notifications.ts
│   ├── users.ts
│   └── connections.ts
├── middleware/         # Custom middleware
│   └── auth.ts
└── app.ts             # Main application file
```

## 🌐 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "error": "Error type",
  "message": "Detailed error message",
  "details": { ... }
}
```

## 📱 Frontend Integration

The backend is designed to work seamlessly with the React frontend:

1. **CORS configured** for frontend domain
2. **JWT tokens** stored in localStorage
3. **Real-time updates** via polling
4. **File uploads** supported
5. **Responsive API** design

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Environment Variables
- Set `NODE_ENV=production`
- Use production MongoDB URI
- Configure production JWT secret
- Set appropriate rate limits

### Health Check
- Endpoint: `GET /health`
- Returns server status and database connectivity

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation
- Review the code examples

---

**Built with ❤️ for the Dashboard Application**
