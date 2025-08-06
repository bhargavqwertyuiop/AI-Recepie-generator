# 🛠️ Setup Guide for AI Recipe Generator

## Quick Setup (Recommended)

### 1. Environment Setup
```bash
# Clone and navigate to the project
git clone <repository-url>
cd ai-recipe-generator

# Make the run script executable
chmod +x run.sh

# Run the application (this will install dependencies automatically)
./run.sh
```

### 2. Add Your OpenAI API Key
1. The script will create a `.env` file from `.env.example`
2. Edit the `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```
3. Get your API key from: https://platform.openai.com/api-keys

### 3. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Manual Setup (Alternative)

### Frontend Setup
```bash
# Install Node.js dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup

#### Option 1: Using Virtual Environment (Recommended)
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

#### Option 2: Global Installation (Development Only)
```bash
# Install dependencies globally (not recommended for production)
pip3 install -r requirements.txt --break-system-packages

# Run the Flask server
python3 app.py
```

#### Option 3: Using Docker (Advanced)
```bash
# Build and run with Docker Compose
docker-compose up --build
```

## Configuration

### Environment Variables
Create a `.env` file in the root directory:
```env
# Required: OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Optional: Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### API Key Setup
1. Visit https://platform.openai.com/api-keys
2. Create a new API key
3. Copy the key to your `.env` file
4. Make sure you have billing set up in your OpenAI account

## Troubleshooting

### Common Issues

#### Python Dependencies
If you get "externally-managed-environment" error:
```bash
# Use virtual environment (recommended)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# OR use --break-system-packages flag (development only)
pip3 install -r requirements.txt --break-system-packages
```

#### Missing Python Packages
```bash
# Install required system packages (Ubuntu/Debian)
sudo apt update
sudo apt install python3-full python3-pip python3-venv

# Install required system packages (macOS)
brew install python@3.11
```

#### Node.js Issues
```bash
# Update npm
npm install -g npm@latest

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

#### Port Already in Use
```bash
# Kill processes on ports 3000 and 5000
sudo lsof -ti:3000 | xargs kill -9
sudo lsof -ti:5000 | xargs kill -9
```

### API Issues

#### OpenAI API Key
- Make sure your API key is valid and active
- Check that you have sufficient credits in your OpenAI account
- Verify the key is correctly set in the `.env` file

#### Network Issues
- Check if you can access the OpenAI API from your network
- Some corporate networks may block API calls

## Development

### Running Tests
```bash
# Frontend tests
npm test

# Backend tests
python -m pytest tests/
```

### Building for Production
```bash
# Frontend build
npm run build

# Backend production server
gunicorn app:app
```

### Project Structure
```
ai-recipe-generator/
├── src/                    # React frontend source
│   ├── components/         # React components
│   ├── services/          # API services
│   └── App.jsx            # Main app component
├── app.py                 # Flask backend
├── requirements.txt       # Python dependencies
├── package.json          # Node.js dependencies
├── .env.example          # Environment variables template
└── README.md             # Project documentation
```

## Support

If you're still having issues:

1. Check the [GitHub Issues](https://github.com/your-repo/issues)
2. Make sure all prerequisites are installed
3. Verify your OpenAI API key is working
4. Check the console logs for error messages

### System Requirements
- **Node.js**: v16 or higher
- **Python**: v3.8 or higher
- **Operating System**: Linux, macOS, or Windows
- **Memory**: 4GB RAM minimum
- **Network**: Internet connection for API calls