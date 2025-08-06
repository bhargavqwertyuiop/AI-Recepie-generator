from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os
from dotenv import load_dotenv
import json
import re

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)

# Initialize OpenAI client
openai.api_key = os.getenv('OPENAI_API_KEY')

class RecipeGenerator:
    def __init__(self):
        self.client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
    
    def generate_recipes(self, ingredients, dietary_restrictions=None, cuisine_preference=None):
        """Generate recipes based on available ingredients"""
        ingredients_str = ", ".join(ingredients)
        
        prompt = f"""
        I have these ingredients available: {ingredients_str}
        
        Please generate 3 unique and creative recipes using primarily these ingredients.
        """
        
        if dietary_restrictions:
            prompt += f"\nDietary restrictions: {', '.join(dietary_restrictions)}"
        
        if cuisine_preference:
            prompt += f"\nCuisine preference: {cuisine_preference}"
        
        prompt += """
        
        For each recipe, provide:
        1. Recipe name
        2. Ingredients list (with quantities)
        3. Step-by-step instructions
        4. Prep time and cook time
        5. Difficulty level (Easy/Medium/Hard)
        6. Estimated calories per serving
        
        Format the response as a JSON array with this structure:
        [
          {
            "name": "Recipe Name",
            "ingredients": [
              {"item": "ingredient name", "amount": "quantity", "available": true/false}
            ],
            "instructions": ["step 1", "step 2", ...],
            "prep_time": "X minutes",
            "cook_time": "X minutes",
            "difficulty": "Easy/Medium/Hard",
            "calories": "X per serving",
            "servings": X
          }
        ]
        """
        
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a professional chef and recipe developer. Always respond with valid JSON format."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2000,
                temperature=0.7
            )
            
            content = response.choices[0].message.content
            # Extract JSON from the response
            json_match = re.search(r'\[.*\]', content, re.DOTALL)
            if json_match:
                recipes_data = json.loads(json_match.group())
                return self._process_recipes(recipes_data, ingredients)
            else:
                return self._fallback_recipes(ingredients)
                
        except Exception as e:
            print(f"OpenAI API error: {e}")
            return self._fallback_recipes(ingredients)
    
    def _process_recipes(self, recipes_data, available_ingredients):
        """Process recipes and mark ingredient availability"""
        available_lower = [ing.lower() for ing in available_ingredients]
        
        for recipe in recipes_data:
            for ingredient in recipe.get('ingredients', []):
                ingredient_name = ingredient['item'].lower()
                # Check if ingredient is available (fuzzy matching)
                ingredient['available'] = any(avail_ing in ingredient_name or ingredient_name in avail_ing 
                                            for avail_ing in available_lower)
        
        return recipes_data
    
    def _fallback_recipes(self, ingredients):
        """Fallback recipes when API fails"""
        return [
            {
                "name": "Simple Stir Fry",
                "ingredients": [
                    {"item": "Mixed vegetables", "amount": "2 cups", "available": True},
                    {"item": "Oil", "amount": "2 tbsp", "available": False},
                    {"item": "Soy sauce", "amount": "3 tbsp", "available": False}
                ],
                "instructions": [
                    "Heat oil in a large pan or wok",
                    "Add vegetables and stir fry for 5-7 minutes",
                    "Add soy sauce and stir for another 2 minutes",
                    "Serve hot"
                ],
                "prep_time": "10 minutes",
                "cook_time": "10 minutes",
                "difficulty": "Easy",
                "calories": "150 per serving",
                "servings": 2
            }
        ]
    
    def generate_grocery_list(self, recipes):
        """Generate grocery list for missing ingredients"""
        missing_ingredients = set()
        
        for recipe in recipes:
            for ingredient in recipe.get('ingredients', []):
                if not ingredient.get('available', False):
                    missing_ingredients.add(ingredient['item'])
        
        return list(missing_ingredients)

# Initialize recipe generator
recipe_gen = RecipeGenerator()

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "message": "Recipe generator API is running"})

@app.route('/api/generate-recipes', methods=['POST'])
def generate_recipes():
    try:
        data = request.get_json()
        ingredients = data.get('ingredients', [])
        dietary_restrictions = data.get('dietary_restrictions', [])
        cuisine_preference = data.get('cuisine_preference', '')
        
        if not ingredients:
            return jsonify({"error": "No ingredients provided"}), 400
        
        recipes = recipe_gen.generate_recipes(
            ingredients, 
            dietary_restrictions, 
            cuisine_preference
        )
        
        grocery_list = recipe_gen.generate_grocery_list(recipes)
        
        return jsonify({
            "recipes": recipes,
            "grocery_list": grocery_list,
            "total_recipes": len(recipes),
            "missing_items": len(grocery_list)
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/ingredients/suggestions', methods=['GET'])
def get_ingredient_suggestions():
    """Get common ingredient suggestions"""
    common_ingredients = [
        "Chicken breast", "Ground beef", "Salmon", "Eggs", "Milk", "Cheese",
        "Onions", "Garlic", "Tomatoes", "Bell peppers", "Carrots", "Potatoes",
        "Rice", "Pasta", "Bread", "Olive oil", "Salt", "Black pepper",
        "Basil", "Oregano", "Thyme", "Ginger", "Lemon", "Butter",
        "Flour", "Sugar", "Honey", "Soy sauce", "Vinegar", "Mushrooms"
    ]
    
    return jsonify({"suggestions": common_ingredients})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)