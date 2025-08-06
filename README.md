# 🧑‍🍳 AI Recipe Generator

A modern, full-stack web application that transforms your available ingredients into delicious recipes using the power of AI. Built with React, Flask, and OpenAI's GPT model.

![AI Recipe Generator](https://via.placeholder.com/800x400/f27d0c/ffffff?text=AI+Recipe+Generator)

## ✨ Features

### 🎯 Core Features
- **AI-Powered Recipe Generation**: Generate unique recipes based on your available ingredients
- **Smart Ingredient Management**: Add, remove, and manage ingredients with autocomplete suggestions
- **Dietary Preferences**: Support for various dietary restrictions (Vegetarian, Vegan, Gluten-Free, Keto, etc.)
- **Cuisine Selection**: Choose from different cuisine types (Italian, Chinese, Mexican, etc.)
- **Smart Grocery Lists**: Automatically generate shopping lists for missing ingredients
- **Recipe Favorites**: Save and manage your favorite recipes
- **Interactive Shopping**: Check off items from your grocery list with progress tracking

### 🎨 Modern UI/UX
- **Beautiful Design**: Modern glassmorphism design with gradient backgrounds
- **Responsive Layout**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion animations for delightful user experience
- **Real-time Feedback**: Toast notifications and loading states
- **Dark/Light Theme**: Beautiful color schemes with custom Tailwind configuration

### 🚀 Technical Features
- **Fast Performance**: Vite-powered React frontend with optimized builds
- **Robust Backend**: Flask API with OpenAI integration and error handling
- **Type Safety**: Modern JavaScript with ES6+ features
- **Scalable Architecture**: Modular component structure and clean API design

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant toast notifications
- **Axios** - HTTP client for API calls

### Backend
- **Flask** - Lightweight Python web framework
- **OpenAI API** - GPT-3.5-turbo for recipe generation
- **Flask-CORS** - Cross-origin resource sharing
- **Python-dotenv** - Environment variable management

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **OpenAI API Key** (Get one from [OpenAI Platform](https://platform.openai.com))

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone <repository-url>
cd ai-recipe-generator
```

### 2. Backend Setup

```bash
# Install Python dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Edit .env and add your OpenAI API key
# OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Frontend Setup

```bash
# Install Node.js dependencies
npm install
```

### 4. Run the Application

**Terminal 1 - Backend:**
```bash
python app.py
```
The Flask server will start on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```
The React app will start on `http://localhost:3000`

### 5. Open Your Browser

Navigate to `http://localhost:3000` and start generating recipes! 🎉

## 📖 Usage Guide

### Getting Started
1. **Add Ingredients**: Start by adding ingredients you have available
2. **Set Preferences**: Choose dietary restrictions and cuisine preferences (optional)
3. **Generate Recipes**: Click "Generate AI Recipes" to get personalized suggestions
4. **Review Results**: Browse through generated recipes with ingredient availability
5. **Shopping List**: Check the auto-generated grocery list for missing items
6. **Save Favorites**: Mark recipes as favorites for future reference

### Tips for Best Results
- **Be Specific**: Add specific ingredients rather than general categories
- **Mix Protein & Vegetables**: Include both proteins and vegetables for balanced recipes
- **Use Fresh Ingredients**: The AI works best with common, fresh ingredients
- **Try Different Cuisines**: Experiment with different cuisine preferences

## 🎨 Features in Detail

### Intelligent Recipe Generation
- Generates 3 unique recipes per request
- Considers ingredient availability
- Respects dietary restrictions
- Adapts to cuisine preferences
- Provides cooking times and difficulty levels

### Smart Ingredient Management
- Autocomplete suggestions from 30+ common ingredients
- Visual ingredient tags with easy removal
- Ingredient availability tracking
- Duplicate prevention

### Comprehensive Recipe Cards
- Beautiful card design with all recipe details
- Ingredient availability indicators
- Step-by-step cooking instructions
- Nutritional information (calories)
- Difficulty levels with visual indicators
- Expandable instructions for detailed recipes

### Interactive Grocery Lists
- Automatic generation from missing ingredients
- Progress tracking with visual indicators
- Copy to clipboard functionality
- Download as text file
- Interactive checkboxes for shopping

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Flask Configuration
FLASK_ENV=development
FLASK_DEBUG=True
```

### Customization

You can customize the application by modifying:

- **Colors**: Edit `tailwind.config.js` for custom color schemes
- **Ingredients**: Update suggestions in `app.py`
- **Dietary Options**: Modify options in `IngredientInput.jsx`
- **Cuisine Types**: Update cuisine options in the same component

## 🚀 Deployment

### Frontend Deployment (Netlify/Vercel)
```bash
npm run build
# Upload the 'dist' folder to your hosting service
```

### Backend Deployment (Heroku/Railway)
```bash
# Create a Procfile
echo "web: gunicorn app:app" > Procfile

# Deploy to your preferred platform
```

### Environment Variables for Production
- Set `OPENAI_API_KEY` in your hosting platform
- Update `API_BASE_URL` in `src/services/api.js` to your backend URL

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **OpenAI** for providing the GPT API
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icons
- **Framer Motion** for smooth animations

## 📞 Support

If you have any questions or need help, please:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the maintainers

---

Made with ❤️ for food lovers everywhere. Happy cooking! 🍳✨