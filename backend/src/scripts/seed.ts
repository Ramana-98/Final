import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Project from '../models/Project';
import Message from '../models/Message';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import Notification from '../models/Notification';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/dashboard';

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Message.deleteMany({}),
      Wallet.deleteMany({}),
      Transaction.deleteMany({}),
      Notification.deleteMany({})
    ]);
    console.log('🗑️  Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'UI Designer',
        level: 'Senior',
        status: 'Available',
        location: 'San Francisco, CA',
        timezone: 'PST (UTC-8)',
        phone: '+1 (555) 123-4567',
        skills: ['UI Design', 'UX Research', 'Figma', 'Adobe XD'],
        hourlyRate: 25,
        currency: 'USD',
        isPremium: true
      },
      {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        password: 'password123',
        role: 'Frontend Developer',
        level: 'Middle',
        status: 'Busy',
        location: 'New York, NY',
        timezone: 'EST (UTC-5)',
        phone: '+1 (555) 234-5678',
        skills: ['React', 'TypeScript', 'Node.js', 'CSS'],
        hourlyRate: 20,
        currency: 'USD',
        isPremium: false
      },
      {
        name: 'Alex Lee',
        email: 'alex.lee@example.com',
        password: 'password123',
        role: 'Backend Developer',
        level: 'Senior',
        status: 'Available',
        location: 'Austin, TX',
        timezone: 'CST (UTC-6)',
        phone: '+1 (555) 345-6789',
        skills: ['Node.js', 'Python', 'MongoDB', 'AWS'],
        hourlyRate: 30,
        currency: 'USD',
        isPremium: true
      },
      {
        name: 'Priya Kumar',
        email: 'priya.kumar@example.com',
        password: 'password123',
        role: 'Mobile Developer',
        level: 'Middle',
        status: 'Available',
        location: 'Mumbai, India',
        timezone: 'IST (UTC+5:30)',
        phone: '+91 98765 43210',
        skills: ['React Native', 'Flutter', 'iOS', 'Android'],
        hourlyRate: 15,
        currency: 'INR',
        isPremium: false
      }
    ]);
    console.log('👥 Created sample users');

    // Create sample projects
    const projects = await Project.create([
      {
        title: 'Web Development Project',
        description: 'Developing a new website for a client in Germany.',
        rate: 10,
        rateType: 'hourly',
        currency: 'USD',
        status: 'Active',
        type: 'Remote',
        mode: 'Part-time',
        country: 'Germany',
        clientId: users[0]._id,
        freelancerId: users[1]._id,
        startDate: new Date('2024-01-01'),
        totalAmount: 2000,
        isPaid: true,
        paymentStatus: 'Completed',
        tags: ['Web Development', 'React', 'Node.js']
      },
      {
        title: 'UI/UX Design Project',
        description: 'Conducting user research and designing wireframes for a Canadian fintech startup.',
        rate: 12,
        rateType: 'hourly',
        currency: 'USD',
        status: 'Active',
        type: 'Remote',
        mode: 'Part-time',
        country: 'Canada',
        clientId: users[2]._id,
        freelancerId: users[0]._id,
        startDate: new Date('2024-02-01'),
        totalAmount: 3000,
        isPaid: false,
        paymentStatus: 'Pending',
        tags: ['UI/UX', 'Figma', 'User Research']
      }
    ]);
    console.log('📁 Created sample projects');

    // Create sample wallets
    const wallets = await Wallet.create([
      {
        userId: users[0]._id,
        balance: { available: 5000, pending: 1000, currency: 'USD' },
        paymentMethods: [
          { bankName: 'Chase Bank', accountNumber: '****1234', upiId: 'john@chase' }
        ]
      },
      {
        userId: users[1]._id,
        balance: { available: 3000, pending: 500, currency: 'USD' },
        paymentMethods: [
          { bankName: 'Wells Fargo', accountNumber: '****5678', upiId: 'jane@wells' }
        ]
      }
    ]);
    console.log('💰 Created sample wallets');

    // Create sample transactions
    const transactions = await Transaction.create([
      {
        walletId: wallets[0]._id,
        type: 'Payment Received',
        amount: 2000,
        currency: 'USD',
        status: 'Completed',
        description: 'Payment for Web Development Project',
        projectId: projects[0]._id
      },
      {
        walletId: wallets[1]._id,
        type: 'Payment Received',
        amount: 1500,
        currency: 'USD',
        status: 'Completed',
        description: 'Payment for UI Design work',
        projectId: projects[1]._id
      }
    ]);
    console.log('💳 Created sample transactions');

    // Create sample messages
    const messages = await Message.create([
      {
        senderId: users[0]._id,
        receiverId: users[1]._id,
        projectId: projects[0]._id,
        content: 'Hi! I have some questions about the project requirements.',
        messageType: 'text',
        isRead: false
      },
      {
        senderId: users[1]._id,
        receiverId: users[0]._id,
        projectId: projects[0]._id,
        content: 'Sure! What would you like to know?',
        messageType: 'text',
        isRead: true
      }
    ]);
    console.log('💬 Created sample messages');

    // Create sample notifications
    const notifications = await Notification.create([
      {
        userId: users[0]._id,
        type: 'message',
        text: 'You have a new message from Jane Smith',
        meta: 'Web Development Project',
        isRead: false,
        relatedId: users[1]._id,
        relatedType: 'user'
      },
      {
        userId: users[1]._id,
        type: 'payment',
        text: 'Payment received for UI/UX Design Project',
        meta: '₹1,500 USD',
        isRead: false,
        relatedId: projects[1]._id,
        relatedType: 'project'
      }
    ]);
    console.log('🔔 Created sample notifications');

    console.log('🎉 Database seeded successfully!');
    console.log(`📊 Created ${users.length} users, ${projects.length} projects, ${wallets.length} wallets, ${transactions.length} transactions, ${messages.length} messages, and ${notifications.length} notifications`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  }
}

// Run the seeding
seedDatabase();
