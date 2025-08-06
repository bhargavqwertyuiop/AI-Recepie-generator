import React from 'react'
import { motion } from 'framer-motion'
import { ChefHat, Sparkles } from 'lucide-react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Animated Chef Hat */}
      <motion.div
        className="relative mb-8"
        animate={{ 
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 p-6 rounded-full shadow-2xl">
          <ChefHat className="w-12 h-12 text-white" />
        </div>
        
        {/* Floating Sparkles */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            y: [-5, -15, -5],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-2 -left-2"
          animate={{ 
            y: [5, 15, 5],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <Sparkles className="w-4 h-4 text-pink-400" />
        </motion.div>
      </motion.div>

      {/* Loading Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Creating Your Recipes
        </h3>
        <p className="text-gray-600 mb-6">
          Our AI chef is working on something amazing...
        </p>
      </motion.div>

      {/* Animated Progress Dots */}
      <div className="flex space-x-2 mb-8">
        {[...Array(3)].map((_, index) => (
          <motion.div
            key={index}
            className="w-3 h-3 bg-primary-500 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="w-64 bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          className="bg-gradient-to-r from-primary-500 to-secondary-500 h-full rounded-full"
          animate={{
            x: ["-100%", "100%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Loading Steps */}
      <motion.div
        className="mt-8 text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <div className="space-y-2 text-sm text-gray-600">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
          >
            🔍 Analyzing your ingredients...
          </motion.p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          >
            🧠 Generating creative recipes...
          </motion.p>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.2 }}
          >
            📝 Creating shopping lists...
          </motion.p>
        </div>
      </motion.div>
    </div>
  )
}

export default LoadingSpinner