import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { createRecipe } from "../api/recipes";

export default function AddRecipe() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    const created = await createRecipe(data);
    navigate(`/recipes/${created._id}`);
  };

  return (
    <div className="page">
      <h2>Add a new recipe</h2>
      <RecipeForm onSubmit={handleSubmit} submitLabel="Create recipe" />
    </div>
  );
}
