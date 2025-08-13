// MongoDB initialization script
db = db.getSiblingDB('dashboard');

// Create collections if they don't exist
db.createCollection('users');
db.createCollection('projects');
db.createCollection('messages');
db.createCollection('wallets');
db.createCollection('transactions');
db.createCollection('notifications');

// Create indexes for better performance
db.users.createIndex({ "email": 1 }, { unique: true });
db.users.createIndex({ "role": 1 });
db.users.createIndex({ "level": 1 });
db.users.createIndex({ "status": 1 });

db.projects.createIndex({ "freelancerId": 1 });
db.projects.createIndex({ "clientId": 1 });
db.projects.createIndex({ "status": 1 });
db.projects.createIndex({ "createdAt": -1 });

db.messages.createIndex({ "senderId": 1, "receiverId": 1 });
db.messages.createIndex({ "projectId": 1 });
db.messages.createIndex({ "createdAt": -1 });

db.wallets.createIndex({ "userId": 1 }, { unique: true });

db.transactions.createIndex({ "walletId": 1 });
db.transactions.createIndex({ "type": 1 });
db.transactions.createIndex({ "status": 1 });
db.transactions.createIndex({ "createdAt": -1 });

db.notifications.createIndex({ "userId": 1 });
db.notifications.createIndex({ "type": 1 });
db.notifications.createIndex({ "isRead": 1 });
db.notifications.createIndex({ "createdAt": -1 });

print('✅ MongoDB dashboard database initialized successfully!');
print('📊 Collections created: users, projects, messages, wallets, transactions, notifications');
print('🔍 Indexes created for optimal performance');

