import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Sparkles, ShoppingCart, Clock, Users, Star } from 'lucide-react'
import Header from './components/Header'
import IngredientInput from './components/IngredientInput'
import RecipeCard from './components/RecipeCard'
import GroceryList from './components/GroceryList'
import LoadingSpinner from './components/LoadingSpinner'
import { generateRecipes, getIngredientSuggestions } from './services/api'
import toast from 'react-hot-toast'

function App() {
  const [ingredients, setIngredients] = useState([])
  const [recipes, setRecipes] = useState([])
  const [groceryList, setGroceryList] = useState([])
  const [loading, setLoading] = useState(false)
  const [dietaryRestrictions, setDietaryRestrictions] = useState([])
  const [cuisinePreference, setCuisinePreference] = useState('')
  const [ingredientSuggestions, setIngredientSuggestions] = useState([])
  const [favorites, setFavorites] = useState(new Set())

  useEffect(() => {
    loadIngredientSuggestions()
    loadFavorites()
  }, [])

  const loadIngredientSuggestions = async () => {
    try {
      const suggestions = await getIngredientSuggestions()
      setIngredientSuggestions(suggestions)
    } catch (error) {
      console.error('Failed to load ingredient suggestions:', error)
    }
  }

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('recipeFavorites')
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)))
    }
  }

  const saveFavorites = (newFavorites) => {
    localStorage.setItem('recipeFavorites', JSON.stringify([...newFavorites]))
  }

  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      toast.error('Please add at least one ingredient!')
      return
    }

    setLoading(true)
    try {
      const result = await generateRecipes({
        ingredients,
        dietary_restrictions: dietaryRestrictions,
        cuisine_preference: cuisinePreference
      })
      
      setRecipes(result.recipes)
      setGroceryList(result.grocery_list)
      
      toast.success(`Generated ${result.total_recipes} delicious recipes!`)
      
      // Scroll to recipes section
      setTimeout(() => {
        document.getElementById('recipes-section')?.scrollIntoView({ 
          behavior: 'smooth' 
        })
      }, 100)
      
    } catch (error) {
      console.error('Error generating recipes:', error)
      toast.error('Failed to generate recipes. Please try again!')
    } finally {
      setLoading(false)
    }
  }

  const addIngredient = (ingredient) => {
    if (!ingredients.includes(ingredient.trim())) {
      setIngredients([...ingredients, ingredient.trim()])
      toast.success(`Added ${ingredient} to your ingredients!`)
    } else {
      toast.error('Ingredient already added!')
    }
  }

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(ing => ing !== ingredient))
    toast.success(`Removed ${ingredient} from your ingredients`)
  }

  const toggleFavorite = (recipeName) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(recipeName)) {
      newFavorites.delete(recipeName)
      toast.success('Removed from favorites')
    } else {
      newFavorites.add(recipeName)
      toast.success('Added to favorites!')
    }
    setFavorites(newFavorites)
    saveFavorites(newFavorites)
  }

  const clearAll = () => {
    setIngredients([])
    setRecipes([])
    setGroceryList([])
    setDietaryRestrictions([])
    setCuisinePreference('')
    toast.success('Cleared all data')
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-center mb-6">
              <ChefHat className="w-16 h-16 text-primary-500 animate-bounce-gentle" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">AI Recipe</span>
              <br />
              <span className="text-gray-800">Generator</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Transform your available ingredients into delicious recipes with the power of AI. 
              Get personalized cooking suggestions and never wonder "what's for dinner?" again!
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          >
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <Sparkles className="w-8 h-8 text-primary-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">AI-Powered</div>
              <div className="text-gray-600">Smart recipe generation</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <Clock className="w-8 h-8 text-secondary-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">Quick</div>
              <div className="text-gray-600">Recipes in seconds</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/50">
              <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">Personalized</div>
              <div className="text-gray-600">Just for your taste</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Ingredient Input Section */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <IngredientInput
            ingredients={ingredients}
            onAddIngredient={addIngredient}
            onRemoveIngredient={removeIngredient}
            suggestions={ingredientSuggestions}
            dietaryRestrictions={dietaryRestrictions}
            onDietaryRestrictionsChange={setDietaryRestrictions}
            cuisinePreference={cuisinePreference}
            onCuisinePreferenceChange={setCuisinePreference}
            onGenerateRecipes={handleGenerateRecipes}
            onClearAll={clearAll}
            loading={loading}
          />
        </div>
      </section>

      {/* Loading Section */}
      {loading && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <LoadingSpinner />
            <p className="text-lg text-gray-600 mt-4">
              Our AI chef is creating amazing recipes for you...
            </p>
          </div>
        </section>
      )}

      {/* Recipes Section */}
      {recipes.length > 0 && (
        <section id="recipes-section" className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Your Personalized Recipes
              </h2>
              <p className="text-lg text-gray-600">
                Here are {recipes.length} delicious recipes created just for you!
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {recipes.map((recipe, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <RecipeCard
                    recipe={recipe}
                    isFavorite={favorites.has(recipe.name)}
                    onToggleFavorite={() => toggleFavorite(recipe.name)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Grocery List Section */}
      {groceryList.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <GroceryList items={groceryList} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-white/30 backdrop-blur-sm border-t border-white/50 py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center items-center mb-4">
            <ChefHat className="w-6 h-6 text-primary-500 mr-2" />
            <span className="text-lg font-semibold text-gray-800">AI Recipe Generator</span>
          </div>
          <p className="text-gray-600">
            Made with ❤️ for food lovers everywhere. Powered by AI to make cooking delightful.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App