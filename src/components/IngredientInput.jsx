import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, X, ChefHat, Filter, Trash2, Sparkles } from 'lucide-react'

const IngredientInput = ({
  ingredients,
  onAddIngredient,
  onRemoveIngredient,
  suggestions,
  dietaryRestrictions,
  onDietaryRestrictionsChange,
  cuisinePreference,
  onCuisinePreferenceChange,
  onGenerateRecipes,
  onClearAll,
  loading
}) => {
  const [inputValue, setInputValue] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [filteredSuggestions, setFilteredSuggestions] = useState([])

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 
    'Keto', 'Paleo', 'Low-Carb', 'Low-Fat'
  ]

  const cuisineOptions = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese',
    'Mediterranean', 'Thai', 'French', 'American', 'Korean'
  ]

  const handleInputChange = (e) => {
    const value = e.target.value
    setInputValue(value)
    
    if (value.length > 0) {
      const filtered = suggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase()) &&
        !ingredients.includes(suggestion)
      )
      setFilteredSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setShowSuggestions(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAddIngredient(inputValue.trim())
      setInputValue('')
      setShowSuggestions(false)
    }
  }

  const addSuggestion = (suggestion) => {
    onAddIngredient(suggestion)
    setInputValue('')
    setShowSuggestions(false)
  }

  const toggleDietaryRestriction = (restriction) => {
    const updated = dietaryRestrictions.includes(restriction)
      ? dietaryRestrictions.filter(r => r !== restriction)
      : [...dietaryRestrictions, restriction]
    onDietaryRestrictionsChange(updated)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          What's in your kitchen?
        </h2>
        <p className="text-gray-600">
          Add your ingredients and let AI create amazing recipes for you
        </p>
      </div>

      {/* Ingredient Input */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="relative">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter an ingredient (e.g., chicken, tomatoes, rice...)"
                className="input-field pl-12"
                disabled={loading}
              />
              <ChefHat className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              
              {/* Suggestions Dropdown */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-48 overflow-y-auto z-10"
                >
                  {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => addSuggestion(suggestion)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                    >
                      <span className="text-gray-800">{suggestion}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <button
              type="submit"
              disabled={!inputValue.trim() || loading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </button>
          </div>
        </form>
      </div>

      {/* Ingredient Tags */}
      {ingredients.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span>Your Ingredients ({ingredients.length})</span>
            <button
              onClick={onClearAll}
              className="ml-auto text-red-500 hover:text-red-700 flex items-center space-x-1 text-sm"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </h3>
          <div className="flex flex-wrap gap-3">
            {ingredients.map((ingredient, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-gradient-to-r from-primary-100 to-secondary-100 text-gray-800 px-4 py-2 rounded-full flex items-center space-x-2 border border-primary-200"
              >
                <span className="font-medium">{ingredient}</span>
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="text-gray-600 hover:text-red-500 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Dietary Restrictions */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Filter className="w-5 h-5 mr-2" />
          Dietary Preferences (Optional)
        </h3>
        <div className="flex flex-wrap gap-3">
          {dietaryOptions.map((option) => (
            <button
              key={option}
              onClick={() => toggleDietaryRestriction(option)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                dietaryRestrictions.includes(option)
                  ? 'bg-secondary-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cuisine Preference */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Cuisine Preference (Optional)
        </h3>
        <select
          value={cuisinePreference}
          onChange={(e) => onCuisinePreferenceChange(e.target.value)}
          className="input-field"
        >
          <option value="">Any cuisine</option>
          {cuisineOptions.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <button
          onClick={onGenerateRecipes}
          disabled={ingredients.length === 0 || loading}
          className={`btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto ${
            loading ? 'animate-pulse' : ''
          }`}
        >
          <Sparkles className="w-6 h-6" />
          <span>
            {loading ? 'Generating Recipes...' : 'Generate AI Recipes'}
          </span>
          <Sparkles className="w-6 h-6" />
        </button>
        
        {ingredients.length === 0 && (
          <p className="text-gray-500 mt-3 text-sm">
            Add at least one ingredient to get started
          </p>
        )}
      </div>
    </motion.div>
  )
}

export default IngredientInput