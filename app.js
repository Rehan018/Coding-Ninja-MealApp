const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", debounce(searchMeal, 300));

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

async function searchMeal() {
  const query = searchInput.value.trim();
  showLoader();
  if (query.length === 0) {
    searchResults.innerHTML = "";
    return;
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await response.json();

    if (data.meals && data.meals.length > 0) {
      displaySearchResults(data.meals);
    } else {
      searchResults.innerHTML = "No results found";
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    searchResults.innerHTML = "An error occurred while fetching data";
  } finally {
    hideLoader();
  }
}

function showLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  searchResults.innerHTML = "";
  searchResults.appendChild(loader);
}

function hideLoader() {
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.remove();
  }
}

async function fetchAllMeals() {
  const response = await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=");
  const data = await response.json();

  if (data.meals && data.meals.length>0) {
    displaySearchResults(data.meals);
  } else {
    searchResults.innerHTML = "No results found";
  }
}

function displaySearchResults(meals) {// meals besically an array
  searchResults.innerHTML = "";
  meals.forEach((meal) => {
    const mealCard = createMealCard(meal);
    searchResults.appendChild(mealCard);
  });
}

function createMealCard(meal) {
  const mealCard = document.createElement("div");
  mealCard.classList.add("meal-card");
  // Meal image
  mealCard.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strMeal}</p>
        <button onclick="addToFavorites('${meal.idMeal}', '${meal.strMeal}', '${meal.strMealThumb}')">Add to Favorites</button>
        <button onclick="redirectToMealDetail('${meal.idMeal}')">Details</button>
    `;
  return mealCard;
}

function addToFavorites(mealId, mealName, mealImage) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const existingMeal = favorites.find((meal) => meal.id === mealId);

  if (!existingMeal) {
    favorites.push({
      id: mealId,
      name: mealName,
      image: mealImage,
    });

    localStorage.setItem("favorites", JSON.stringify(favorites));
    showSuccessMessage("Successfully added to favorites!");
  } else {
    console.log("Meal is already in favorites");
    showSuccessMessage("Meal is already in favorites.");
  }
}

function showSuccessMessage(message) {
  const successMessage = document.createElement("div");
  successMessage.classList.add("success-message");
  successMessage.textContent = message;
  document.body.appendChild(successMessage);
  setTimeout(() => {
    successMessage.remove();
  }, 2000);
}
function redirectToMealDetail(mealId) {
  window.location.href = `meal-detail.html?id=${mealId}`;
}
function redirectToHome() {
  fetchAllMeals();
}
fetchAllMeals();
