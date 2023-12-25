// Get the reference to the HTML elements with the IDs "searchInput" and "searchResults"
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

// Attach an event listener to the searchInput element, using a debounced function with a 300ms delay
searchInput.addEventListener("input", debounce(searchMeal, 300));

// Define a debounce function to limit the rate at which a function can fire
function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      func.apply(context, args);
    }, delay);
  };
}

// Define an asynchronous function to search for meals based on user input
async function searchMeal() {
  // Get the trimmed value of the search input
  const query = searchInput.value.trim();
  
  // Show a loader while fetching data
  showLoader();

  // If the search query is empty, clear the search results and return
  if (query.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  try {
    // Fetch meal data from the MealDB API based on the search query
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await response.json();

    // Display search results or show a message if no results are found
    if (data.meals && data.meals.length > 0) {
      displaySearchResults(data.meals);
    } else {
      searchResults.innerHTML = "No results found";
    }
  } catch (error) {
    // Handle errors during data fetching
    console.error("Error fetching data:", error);
    searchResults.innerHTML = "An error occurred while fetching data";
  } finally {
    // Hide the loader, whether fetching is successful or not
    hideLoader();
  }
}

// Function to display a loader while fetching data
function showLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  searchResults.innerHTML = "";
  searchResults.appendChild(loader);
}

// Function to hide the loader
function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

// Asynchronously fetch all meals and display the results
async function fetchAllMeals() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  const data = await response.json();

  // Display search results or show a message if no results are found
  if (data.meals && data.meals.length > 0) {
    displaySearchResults(data.meals);
  } else {
    searchResults.innerHTML = "No results found";
  }
}

// Function to display search results based on an array of meals
function displaySearchResults(meals) {
  // Clear previous search results
  searchResults.innerHTML = "";

  // Iterate through each meal and create a meal card to display
  meals.forEach((meal) => {
    const mealCard = createMealCard(meal);
    searchResults.appendChild(mealCard);
  });
}

// Function to create a meal card with information and buttons
function createMealCard(meal) {
  const mealCard = document.createElement("div");
  mealCard.classList.add("meal-card");

  // Populate the meal card with HTML, including meal image, name, and buttons
  mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
        <button onclick="addToFavorites('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">Add to Favorites</button>
        <button onclick="redirectToMealDetail('${meal.idMeal}')">Details</button>
    `;
  return mealCard;
}

// Function to add a meal to favorites in localStorage
function addToFavorites(mealId, mealName, mealImage) {
  // Retrieve favorites from localStorage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the meal is already in favorites
  const existingMeal = favorites.find((meal) => meal.id === mealId);

  // If not, add the meal to favorites and show a success message
  if (!existingMeal) {
    favorites.push({
      id: mealId,
      name: mealName,
      image: mealImage,
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    showSuccessMessage("Successfully added to favorites!");
  } else {
    // If the meal is already in favorites, log a message and show a success message
    console.log("Meal is already in favorites");
    showSuccessMessage("Meal is already in favorites.");
  }
}

// Function to display a temporary success message
function showSuccessMessage(message) {
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.textContent = message;
  document.body.appendChild(successMessage);
  
  // Remove the success message after 2 seconds
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}

// Function to redirect to a detailed view of a meal
function redirectToMealDetail(mealId) {
  window.location.href = `meal-detail.html?id=${mealId}`;
}

// Function to fetch all meals when redirecting to the home page
function redirectToHome() {
  fetchAllMeals();
}

// Initial call to fetch all meals and display them on the page
fetchAllMeals();
