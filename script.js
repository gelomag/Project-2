import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyD42zf0hLz0KBkygwfuPAD8CfEuizGHj_4"); // **REPLACE WITH YOUR API KEY**
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });



async function generateText() {
      const height = parseFloat(document.getElementById('height').value);
      const weight = parseFloat(document.getElementById('weight').value);
      const age = parseInt(document.getElementById('age').value);
      const goal = parseFloat(document.getElementById('goal').value);
      const prompt = `Can you give me a diet type with one sentence description, based on my height ${height}cm, weight ${weight}kg, and age ${age}, if my goal weight is ${goal}kg`;

      try {
        // let userDetails =`
        // <div><strong>Height:</strong> ${height}</div>
        // <div><strong>Weight:</strong> ${weight}</div>
        // <div><strong>Age:</strong> ${age}</div>
        // <div><strong>Goal:</strong> ${goal}</div>`

        // document.getElementById('user-details-container').innerHTML = userDetails;

        const result = await model.generateContent(prompt);
        const dietRecommendations = result.response.text(); // Get the text response

        let dietResult = `
        <div class="diet-result-container">
          <div class="diet-result-grid">
            <div class="diet-result-items diet-result-item-1">
              <div><strong>Height:</strong> <p>${height}cm</p></div>
            </div>
            <div class="diet-result-items diet-result-item-2">
              <div><strong>Weight:</strong> <p>${weight}kg</p></div>
            </div>
            <div class="diet-result-items diet-result-item-3">
              <div><strong>Age:</strong> <p>${age}</p></div>
            </div>
            <div class="diet-result-items diet-result-item-4">
              <div><strong>Goal:</strong> <p>${goal}kg</p></div>
            </div>
          </div>
        </div>
        <div class="dietContainter"><strong>Diet:</strong> ${dietRecommendations}</div>`

        document.getElementById('resultContainer').innerHTML = dietResult; // Display in container
      } catch (error) {
        console.error("Error generating text:", error);
        document.getElementById('resultContainer').innerHTML = "Error getting recommendation."; // Display error message
      }
    }

    document.addEventListener('DOMContentLoaded', (event) => {
      const button = document.getElementById("myButton");
      button.onclick = generateText;
    });




      //Meal Suggestions
      const apiKey = '7ef6cfde108a48e2878ca3007b0b00a8';

      // Function to fetch 4 random recipes and display them
      function getRandomRecipes() {
        // Random recipe endpoint (fetching 4 recipes)
        const endpoint = `https://api.spoonacular.com/recipes/random?number=2&apiKey=${apiKey}`;
      
        // Fetch data from the Spoonacular API
        fetch(endpoint)
          .then(response => response.json()) // Convert response to JSON
          .then(data => {
            const recipesDiv = document.getElementById('diet-meals');
            if (data.recipes && data.recipes.length > 0) {
              recipesDiv.innerHTML = ''; // Clear previous results
              data.recipes.forEach(recipe => {
                // Display each suggested recipe
                const recipeElement = document.createElement('div');
                recipeElement.innerHTML = `
                  <div class="list-recipe-container">
                      <div class="list-recipe-grid">
                          <div class="list-recipe-items">
                              <img src="${recipe.image}" alt="${recipe.title}" width="150">
                          </div>
                          <div class="list-recipe-items">
                              <h4>${recipe.title}</h4>
                              <p>Ready in ${recipe.readyInMinutes} minutes</p>
                              <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
                          </div>
                      </div> 
                  </div>
                `;
                recipesDiv.appendChild(recipeElement);
              });
            } else {
              recipesDiv.innerHTML = 'No random recipes found.';
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
      
      // Function to fetch a random meal with full recipe details
      function getRandomRecipe() {
        // Random recipe endpoint (fetching one recipe)
        const endpoint = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;
      
        // Fetch data from the Spoonacular API
        fetch(endpoint)
          .then(response => response.json()) // Convert response to JSON
          .then(data => {
            const recipeDiv = document.getElementById('random-meal');
            if (data.recipes && data.recipes.length > 0) {
              const recipe = data.recipes[0];
      
              // Display the full recipe details
              recipeDiv.innerHTML = `
              <hr/>
              <div class="random-recipe">
              
              <h2 class="your-meal-for-today"><span class="highlight">Your Meal</span> For Today</span></h2>
                <h3 class="recipe-title">${recipe.title}</h3>
                <img src="${recipe.image}" alt="${recipe.title}" width="200">
                <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
                <h3>Ingredients:</h3>
                <ul class="ingredients-lists">
                  ${recipe.extendedIngredients.map(ingredient => `<li>${ingredient.original}</li>`).join('')}
                </ul>
                <h3>Instructions:</h3>
                <p>${recipe.instructions}</p>
                </div>
              `;
            } else {
              recipeDiv.innerHTML = 'No random recipe found.';
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }
      
      // Fetch 4 random recipes when the page loads
      getRandomRecipes();
      
      // Attach the click event to the "Get Random Meal" button
      document.getElementById('btn-random-meal').addEventListener('click', getRandomRecipe);
      
      // Attach the click event to the "Refresh Recipes" button
      document.getElementById('btn-refresh').addEventListener('click', getRandomRecipes);
  