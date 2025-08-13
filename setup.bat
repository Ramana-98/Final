@echo off
echo 🚀 Setting up Dashboard Full Stack Application...
echo ================================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker is not installed. Please install Docker first.
    echo Visit: https://docs.docker.com/get-docker/
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Docker Compose is not installed. Please install Docker Compose first.
    echo Visit: https://docs.docker.com/compose/install/
    pause
    exit /b 1
)

echo ✅ Docker and Docker Compose are installed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
call npm install

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
cd ..

REM Create .env file from example
echo 🔧 Setting up environment variables...
if not exist "backend\.env" (
    copy "backend\env.example" "backend\.env"
    echo ✅ Created backend\.env file
) else (
    echo ℹ️  backend\.env already exists
)

REM Create uploads directory
echo 📁 Creating uploads directory...
if not exist "backend\uploads" mkdir "backend\uploads"

REM Start the application
echo 🚀 Starting the application...
docker-compose up -d

echo.
echo 🎉 Setup complete! Your dashboard is now running:
echo ================================================
echo 🌐 Frontend: http://localhost:5173
echo 🔧 Backend API: http://localhost:5000
echo 🗄️  MongoDB: localhost:27017
echo 📊 Mongo Express: http://localhost:8081
echo.
echo 📋 Sample user credentials:
echo    Email: john.doe@example.com
echo    Password: password123
echo.
echo 🔍 To view logs: docker-compose logs -f
echo ⏹️  To stop: docker-compose down
echo.
echo Happy coding! 🚀
pause

