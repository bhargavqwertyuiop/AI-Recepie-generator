import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout for recipe generation
})

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message)
    return Promise.reject(error)
  }
)

export const generateRecipes = async (payload) => {
  try {
    const response = await api.post('/generate-recipes', payload)
    return response.data
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error(error.response.data.error || 'Invalid request')
    } else if (error.response?.status >= 500) {
      throw new Error('Server error. Please try again later.')
    } else if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.')
    }
    throw new Error('Failed to generate recipes. Please check your connection.')
  }
}

export const getIngredientSuggestions = async () => {
  try {
    const response = await api.get('/ingredients/suggestions')
    return response.data.suggestions
  } catch (error) {
    console.error('Failed to load ingredient suggestions:', error)
    // Return fallback suggestions
    return [
      'Chicken breast', 'Ground beef', 'Salmon', 'Eggs', 'Milk', 'Cheese',
      'Onions', 'Garlic', 'Tomatoes', 'Bell peppers', 'Carrots', 'Potatoes',
      'Rice', 'Pasta', 'Bread', 'Olive oil', 'Salt', 'Black pepper'
    ]
  }
}

export const healthCheck = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    throw new Error('Backend service is not available')
  }
}