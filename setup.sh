#!/bin/bash

echo "🚀 Setting up Dashboard Full Stack Application..."
echo "================================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    echo "Visit: https://docs.docker.com/get-docker/"
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    echo "Visit: https://docs.docker.com/compose/install/"
    exit 1
fi

echo "✅ Docker and Docker Compose are installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cd ..

# Create .env file from example
echo "🔧 Setting up environment variables..."
if [ ! -f "backend/.env" ]; then
    cp backend/env.example backend/.env
    echo "✅ Created backend/.env file"
else
    echo "ℹ️  backend/.env already exists"
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p backend/uploads

# Start the application
echo "🚀 Starting the application..."
docker-compose up -d

echo ""
echo "🎉 Setup complete! Your dashboard is now running:"
echo "================================================"
echo "🌐 Frontend: http://localhost:5173"
echo "🔧 Backend API: http://localhost:5000"
echo "🗄️  MongoDB: localhost:27017"
echo "📊 Mongo Express: http://localhost:8081"
echo ""
echo "📋 Sample user credentials:"
echo "   Email: john.doe@example.com"
echo "   Password: password123"
echo ""
echo "🔍 To view logs: docker-compose logs -f"
echo "⏹️  To stop: docker-compose down"
echo ""
echo "Happy coding! 🚀"

