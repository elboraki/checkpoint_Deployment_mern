import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { fetchRecipeById, updateRecipe } from "../api/recipes";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipeById(id)
      .then(setRecipe)
      .catch(() => setError("Could not load recipe."));
  }, [id]);

  const handleSubmit = async (data) => {
    await updateRecipe(id, data);
    navigate(`/recipes/${id}`);
  };

  if (error) return <p className="form-error">{error}</p>;
  if (!recipe) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Edit recipe</h2>
      <RecipeForm initialData={recipe} onSubmit={handleSubmit} submitLabel="Save changes" />
    </div>
  );
}
