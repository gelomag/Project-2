  //Meal Suggestions
  const apiKey = 'ad999d9e49e74addb0b9289f43457121';

  // Function to fetch 4 random recipes
  function getRandomRecipes() {
    // Random recipe endpoint (fetching 4 recipes)
    const endpoint = `https://api.spoonacular.com/recipes/random?number=4&apiKey=${apiKey}`;
 
    // Fetch data from the Spoonacular API
    fetch(endpoint)
      .then(response => response.json()) // Convert response to JSON
      .then(data => {
        const recipesDiv = document.getElementById('diet-meals');
        if (data.recipes && data.recipes.length > 0) {
          recipesDiv.innerHTML = ''; // Clear previous results
          data.recipes.forEach(recipe => {
            // Display each recipe
            const recipeElement = document.createElement('div');
            recipeElement.innerHTML = `
              <h3>${recipe.title}</h3>
              <img src="${recipe.image}" alt="${recipe.title}" width="200">
              <p>Ready in ${recipe.readyInMinutes} minutes</p>
              <a href="https://spoonacular.com/recipes/${recipe.title.replace(/ /g, '-')}-${recipe.id}" target="_blank">View Recipe</a>
              <hr>
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
 
  // Function to refresh the recipes (load new ones without refreshing the page)
  function refreshRecipes() {
    getRandomRecipes(); // Call the function to get new recipes
  }
 
  // Automatically fetch 4 random recipes when the page loads
  getRandomRecipes();