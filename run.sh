#!/bin/bash

# AI Recipe Generator - Development Runner
echo "🧑‍🍳 Starting AI Recipe Generator..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python first."
    exit 1
fi

# Check if .env exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "📝 Please edit .env file and add your OpenAI API key before running again."
    echo "📝 You can get an API key from: https://platform.openai.com/api-keys"
    exit 1
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

# Check if Python dependencies are installed (try break-system-packages for development)
echo "🐍 Installing Python dependencies..."
pip3 install -r requirements.txt --break-system-packages 2>/dev/null || {
    echo "⚠️  Note: Python dependencies installation may have issues in this environment."
    echo "    The app may still work if dependencies are already available."
}

echo ""
echo "🚀 Starting development servers..."
echo "   Backend: http://localhost:5000"
echo "   Frontend: http://localhost:3000"
echo ""
echo "📝 Make sure to add your OpenAI API key to the .env file!"
echo "Press Ctrl+C to stop all servers"
echo ""

# Function to kill background processes
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up trap for cleanup
trap cleanup SIGINT SIGTERM

# Start backend in background
echo "🔧 Starting Flask backend..."
python3 app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "⚛️  Starting React frontend..."
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID