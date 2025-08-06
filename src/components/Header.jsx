import React from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Heart, Github } from 'lucide-react'

const Header = () => {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/70 backdrop-blur-sm border-b border-white/50 sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-2 rounded-xl">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">AI Recipe Generator</h1>
              <p className="text-sm text-gray-600">Cook smart with AI</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#recipes-section" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Recipes
            </a>
            <a 
              href="#grocery-section" 
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Grocery List
            </a>
            <button className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200">
              <Heart className="w-4 h-4" />
              <span className="font-medium">Favorites</span>
            </button>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>
            <button className="btn-primary text-sm px-4 py-2">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

export default Header