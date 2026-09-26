import { useEffect, useState } from "react";
import { fetchRecipes } from "../api/recipes";
import RecipeCard from "../components/RecipeCard";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Other"];

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(true);
      fetchRecipes({ search, category })
        .then(setRecipes)
        .catch(() => setError("Could not load recipes."))
        .finally(() => setLoading(false));
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, category]);

  return (
    <div className="page">
      <div className="toolbar">
        <input
          type="search"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="form-error">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p>No recipes found. Add your first one!</p>
      )}

      <div className="recipe-grid">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe._id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}
