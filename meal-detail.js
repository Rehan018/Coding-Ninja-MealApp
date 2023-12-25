let mealDetailsContainer;

// Wait for the DOM to be fully loaded before executing the following code
document.addEventListener("DOMContentLoaded", () => {
    // Get the reference to the HTML element with the ID "mealDetails"
    mealDetailsContainer = document.getElementById("mealDetails");

    // Extract the meal ID from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("id");

    // Check if a meal ID is provided
    if (mealId) {
        // Fetch meal details if a meal ID is provided
        fetchMealDetails(mealId);
    } else {
        // Display a message if no meal ID is provided
        mealDetailsContainer.innerHTML = "No meal ID provided.";
    }
});

// Asynchronously fetch meal details based on the provided meal ID
async function fetchMealDetails(mealId) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();

    // Check if meal details are found
    if (data.meals && data.meals.length > 0) {
        // Display meal details if found
        const meal = data.meals[0];
        displayMealDetails(meal);
    } else {
        // Display a message if meal details are not found
        mealDetailsContainer.innerHTML = "Meal details not found.";
    }
}

// Function to display meal details on the page
function displayMealDetails(meal) {
    // Populate the meal details container with HTML, including meal name, image, and instructions
    mealDetailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;
}
