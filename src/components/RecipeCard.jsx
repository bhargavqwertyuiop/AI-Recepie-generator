import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Clock, 
  Users, 
  ChefHat, 
  Heart, 
  Zap, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  ChevronUp 
} from 'lucide-react'

const RecipeCard = ({ recipe, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'hard':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return <CheckCircle className="w-4 h-4" />
      case 'medium':
        return <Zap className="w-4 h-4" />
      case 'hard':
        return <AlertCircle className="w-4 h-4" />
      default:
        return <ChefHat className="w-4 h-4" />
    }
  }

  const availableIngredients = recipe.ingredients?.filter(ing => ing.available) || []
  const missingIngredients = recipe.ingredients?.filter(ing => !ing.available) || []

  return (
    <motion.div
      layout
      className="recipe-card h-full flex flex-col"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {recipe.name}
          </h3>
          <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(recipe.difficulty)}`}>
            {getDifficultyIcon(recipe.difficulty)}
            <span>{recipe.difficulty || 'Medium'}</span>
          </div>
        </div>
        <button
          onClick={onToggleFavorite}
          className={`p-2 rounded-full transition-all duration-200 ${
            isFavorite 
              ? 'text-red-500 bg-red-50 hover:bg-red-100' 
              : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Stats */}
      <div className="flex items-center space-x-4 mb-6 text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{recipe.prep_time || '15 min'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <ChefHat className="w-4 h-4" />
          <span>{recipe.cook_time || '20 min'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="w-4 h-4" />
          <span>{recipe.servings || 2} servings</span>
        </div>
      </div>

      {/* Calories */}
      {recipe.calories && (
        <div className="mb-4">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 px-3 py-2 rounded-lg border border-primary-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Calories</span>
              <span className="text-lg font-bold text-primary-600">{recipe.calories}</span>
            </div>
          </div>
        </div>
      )}

      {/* Ingredients Summary */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-gray-800">Ingredients</h4>
          <div className="flex space-x-2 text-xs">
            {availableIngredients.length > 0 && (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                {availableIngredients.length} available
              </span>
            )}
            {missingIngredients.length > 0 && (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full">
                {missingIngredients.length} missing
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2 max-h-32 overflow-y-auto">
          {recipe.ingredients?.slice(0, 4).map((ingredient, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className={`${ingredient.available ? 'text-gray-800' : 'text-gray-500'}`}>
                {ingredient.item}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 text-xs">{ingredient.amount}</span>
                <div className={`w-2 h-2 rounded-full ${
                  ingredient.available ? 'bg-green-400' : 'bg-red-400'
                }`} />
              </div>
            </div>
          ))}
          {recipe.ingredients?.length > 4 && (
            <div className="text-xs text-gray-500 text-center">
              +{recipe.ingredients.length - 4} more ingredients
            </div>
          )}
        </div>
      </div>

      {/* Instructions Preview */}
      <div className="mb-6 flex-1">
        <h4 className="font-semibold text-gray-800 mb-3">Instructions</h4>
        <div className="space-y-2">
          {recipe.instructions?.slice(0, isExpanded ? undefined : 2).map((step, index) => (
            <div key={index} className="flex items-start space-x-3 text-sm">
              <div className="bg-primary-100 text-primary-700 rounded-full w-6 h-6 flex items-center justify-center font-semibold text-xs flex-shrink-0 mt-0.5">
                {index + 1}
              </div>
              <p className="text-gray-700 leading-relaxed">{step}</p>
            </div>
          ))}
          
          {recipe.instructions?.length > 2 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 text-sm font-medium mt-3"
            >
              <span>{isExpanded ? 'Show less' : `Show all ${recipe.instructions.length} steps`}</span>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3 mt-auto">
        <button className="flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm">
          Start Cooking
        </button>
        <button className="bg-white border border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm">
          Save Recipe
        </button>
      </div>
    </motion.div>
  )
}

export default RecipeCard