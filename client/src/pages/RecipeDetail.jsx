import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchRecipeById, deleteRecipe } from "../api/recipes";

export default function RecipeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipeById(id)
      .then(setRecipe)
      .catch(() => setError("Recipe not found."));
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this recipe?")) return;
    await deleteRecipe(id);
    navigate("/");
  };

  if (error) return <p className="form-error">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="page recipe-detail">
      {recipe.imageUrl && <img src={recipe.imageUrl} alt={recipe.title} className="detail-image" />}
      <h2>{recipe.title}</h2>
      <p className="recipe-meta">
        {recipe.category} · {recipe.cookingTime} min · {recipe.servings} servings
      </p>
      {recipe.description && <p>{recipe.description}</p>}

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h3>Instructions</h3>
      <p className="instructions">{recipe.instructions}</p>

      <div className="detail-actions">
        <Link to={`/recipes/${id}/edit`} className="btn-link">
          Edit
        </Link>
        <button className="btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
