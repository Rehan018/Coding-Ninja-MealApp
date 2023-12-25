// Wait for the DOM to be fully loaded before executing the following code
document.addEventListener("DOMContentLoaded", () => {
  // Get the reference to the HTML element with the ID "favoriteMeals"
  const favoritesContainer = document.getElementById("favoriteMeals");

  // Retrieve favorites from localStorage or initialize an empty array
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if there are any favorite meals
  if (favorites.length > 0) {
    // Display the favorite meals if there are any
    displayFavoriteMeals(favorites);
  } else {
    // Display a message if there are no favorite meals
    favoritesContainer.innerHTML = "No favorite meals yet.";
  }

  // Function to display favorite meals
  function displayFavoriteMeals(favorites) {
    // Clear previous favorite meals
    favoritesContainer.innerHTML = "";

    // Iterate through each favorite and create a favorite card to display
    favorites.forEach((favorite) => {
      const favoriteCard = createFavoriteCard(favorite);
      favoritesContainer.appendChild(favoriteCard);
    });
  }

  // Function to create a favorite card with information and a remove button
  function createFavoriteCard(favorite) {
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favorite-card");

    // Populate the favorite card with HTML, including favorite image, name, and a remove button
    favoriteCard.innerHTML = `
            <img src="${favorite.image}" alt="${favorite.name}">
            <p>${favorite.name}</p>
            <button onclick="removeFromFavorites('${favorite.id}')">Remove from Favorites</button>
        `;
    return favoriteCard;
  }
});

// Function to remove a meal from favorites in localStorage and reload the page
function removeFromFavorites(mealId) {
  // Retrieve favorites from localStorage or initialize an empty array
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Filter out the selected meal from favorites
  favorites = favorites.filter((favorite) => favorite.id !== mealId);

  // Update favorites in localStorage
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Reload the page to reflect the changes
  location.reload();
}
