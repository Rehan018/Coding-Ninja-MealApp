let mealDetailsContainer; 

document.addEventListener("DOMContentLoaded", () => {
    mealDetailsContainer = document.getElementById("mealDetails");
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get("id");

    if (mealId) {
        fetchMealDetails(mealId);
    } else {
        mealDetailsContainer.innerHTML = "No meal ID provided.";
    }
});

async function fetchMealDetails(mealId) {
    const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    const data = await response.json();

    console.log(data);

    if (data.meals && data.meals.length > 0) {
        const meal = data.meals[0];
        displayMealDetails(meal);
    } else {
        mealDetailsContainer.innerHTML = "Meal details not found.";
    }
}

function displayMealDetails(meal) {
    mealDetailsContainer.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <p>${meal.strInstructions}</p>
    `;
}
