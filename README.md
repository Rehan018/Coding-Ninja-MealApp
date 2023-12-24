# Coding-Ninja-MealApp

## Meal App - Project Report [Live Demo](https://zippy-biscuit-6f7cd5.netlify.app/)

### Overview:

The Meal App is a web application designed to allow users to search, view details, and manage their favorite meals. It utilizes the [TheMealDB API](https://www.themealdb.com/api.php) for retrieving meal data.

### Features:

1. **Home Page:**
   - Allows users to search for meals with real-time suggestions.
   - Each search result has a favorite button to add the meal to the user's favorites list.
   - Clicking on a search result opens a new page with detailed information about that meal.

2. **Meal Detail Page:**
   - Displays detailed information about a selected meal, including name, photo, and instructions.

3. **My Favourite Meals Page:**
   - Displays a list of all the user's favorite meals.
   - Persistence: The list remains the same even after closing or refreshing the browser.
   - Remove from favorites button: Allows users to remove a meal from the favorites list.

### Code Structure:

- **HTML:**
  - `index.html`: Home page layout.
  - `meal-detail.html`: Meal detail page layout.
  - `favorites.html`: Favorites page layout.

- **CSS:**
  - `style.css`: Styles for the entire application, including responsiveness.

- **JavaScript:**
  - `app.js`: Handles search functionality, API calls, and general application logic.
  - `meal-detail.js`: Manages fetching and displaying details for a specific meal.
  - `favorites.js`: Deals with displaying and managing favorite meals.

### Code Quality:

- **Comments:**
  - Code is well-commented, providing insights into functionality and purpose.

- **Indentation and Naming:**
  - Consistent indentation and meaningful variable/function naming enhance code readability.

- **Styling:**
  - Clear separation of concerns with a dedicated CSS file for styling.
  - Responsive design principles applied for a better user experience.

### Additional Components:

- **Navbar:**
  - Navigation bar added for easy access to home and favorites.

- **Loader:**
  - A loader displays during API calls to indicate ongoing processes.

- **Success Message:**
  - A success message notifies the user when a meal is successfully added to favorites.

### GitHub and Hosting:

- **GitHub Repository:**
  - All code is hosted on [GitHub](https://github.com/Rehan018/Coding-Ninja-MealApp.git).
  
- **Readme:**
  - A comprehensive Readme.md file is included, providing instructions, project overview, and setup details.

### Video Explanation:

- A concise [video explanation](link_to_video) is available, demonstrating how the project was approached, the implemented features, and an overview of the final product.

### Conclusion:

The Meal App successfully implements the specified features, adheres to coding standards, and provides a user-friendly experience. The comprehensive documentation and well-structured code make it an accessible project for both developers and users.

### Future Improvements:

- Explore additional features like user authentication for personalized favorites.
- Enhance the user interface and add more engaging visuals.


