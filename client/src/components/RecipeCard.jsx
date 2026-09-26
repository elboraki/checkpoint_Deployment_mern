import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipes/${recipe._id}`} className="recipe-card">
      <div className="recipe-card-image">
        {recipe.imageUrl ? (
          <img src={recipe.imageUrl} alt={recipe.title} />
        ) : (
          <div className="recipe-card-placeholder">🍽️</div>
        )}
      </div>
      <div className="recipe-card-body">
        <h3>{recipe.title}</h3>
        <p className="recipe-meta">
          {recipe.category} · {recipe.cookingTime} min · {recipe.servings} servings
        </p>
      </div>
    </Link>
  );
}
