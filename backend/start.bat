@echo off
echo Starting Dashboard Backend Server...
echo.
echo MongoDB Connection: mongodb+srv://Dashboard:dashboard123@cluster0.rulhsag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
echo Server Port: 5000
echo Frontend URL: http://localhost:5173
echo.
echo Press Ctrl+C to stop the server
echo.

npm run dev
