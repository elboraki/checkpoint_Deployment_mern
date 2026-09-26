import { useState } from "react";

const CATEGORIES = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Other"];

const emptyForm = {
  title: "",
  description: "",
  ingredients: "",
  instructions: "",
  category: "Other",
  cookingTime: 0,
  servings: 1,
  imageUrl: "",
};

export default function RecipeForm({ initialData, onSubmit, submitLabel = "Save" }) {
  const [form, setForm] = useState(() =>
    initialData
      ? {
          ...emptyForm,
          ...initialData,
          ingredients: Array.isArray(initialData.ingredients)
            ? initialData.ingredients.join("\n")
            : initialData.ingredients || "",
        }
      : emptyForm
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const ingredients = form.ingredients
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!form.title.trim() || ingredients.length === 0 || !form.instructions.trim()) {
      setError("Title, at least one ingredient, and instructions are required.");
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        ...form,
        ingredients,
        cookingTime: Number(form.cookingTime) || 0,
        servings: Number(form.servings) || 1,
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      <label>
        Title
        <input name="title" value={form.title} onChange={handleChange} required />
      </label>

      <label>
        Description
        <input name="description" value={form.description} onChange={handleChange} />
      </label>

      <label>
        Ingredients (one per line)
        <textarea
          name="ingredients"
          rows={6}
          value={form.ingredients}
          onChange={handleChange}
          placeholder={"2 cups flour\n1 tsp salt\n..."}
          required
        />
      </label>

      <label>
        Instructions
        <textarea
          name="instructions"
          rows={6}
          value={form.instructions}
          onChange={handleChange}
          required
        />
      </label>

      <div className="form-row">
        <label>
          Category
          <select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label>
          Cooking time (min)
          <input
            type="number"
            min="0"
            name="cookingTime"
            value={form.cookingTime}
            onChange={handleChange}
          />
        </label>

        <label>
          Servings
          <input
            type="number"
            min="1"
            name="servings"
            value={form.servings}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        Image URL
        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} />
      </label>

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
