#!/bin/bash

echo "🛡️ AccountGuard AI - Starting Backend Services"
echo "=============================================="

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip."
    exit 1
fi

# Install requirements
echo "📦 Installing Python dependencies..."
pip3 install -r requirements.txt

# Download models
echo "🤖 Downloading AI models..."
python3 download_models.py

# Check if MongoDB is running (optional)
if command -v mongod &> /dev/null; then
    echo "🗄️ MongoDB detected. Starting MongoDB service..."
    # Start MongoDB in background (adjust path as needed)
    mongod --fork --logpath /var/log/mongodb.log --dbpath /var/lib/mongodb 2>/dev/null || echo "⚠️ MongoDB start failed or already running"
else
    echo "⚠️ MongoDB not found. API will run without database logging."
fi

# Start the FastAPI server
echo "🚀 Starting AccountGuard AI API server..."
echo "📊 Dashboard: http://localhost:8000"
echo "📖 API Docs: http://localhost:8000/docs"
echo "🔄 Press Ctrl+C to stop the server"
echo ""

python3 app.py
