document.addEventListener("DOMContentLoaded", () => {
  const favoritesContainer = document.getElementById("favoriteMeals");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length > 0) {
    displayFavoriteMeals(favorites);
  } else {
    favoritesContainer.innerHTML = "No favorite meals yet.";
  }

  function displayFavoriteMeals(favorites) {
    favoritesContainer.innerHTML = "";
    favorites.forEach((favorite) => {
      const favoriteCard = createFavoriteCard(favorite);
      favoritesContainer.appendChild(favoriteCard);
    });
  }

  function createFavoriteCard(favorite) {
    const favoriteCard = document.createElement("div");
    favoriteCard.classList.add("favorite-card");
    favoriteCard.innerHTML = `
            <img src="${favorite.image}" alt="${favorite.name}">
            <p>${favorite.name}</p>
            <button onclick="removeFromFavorites('${favorite.id}')">Remove from Favorites</button>
        `;
    return favoriteCard;
  }
});

function removeFromFavorites(mealId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((favorite) => favorite.id !== mealId);

  localStorage.setItem("favorites", JSON.stringify(favorites));
  location.reload();
}

