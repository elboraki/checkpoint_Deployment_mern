import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {
  const { search, category } = req.query;
  const filter = {};

  if (search) {
    filter.title = { $regex: search, $options: "i" };
  }
  if (category && category !== "All") {
    filter.category = category;
  }

  const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
  res.json(recipes);
};

export const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  if (!recipe) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(recipe);
};

export const createRecipe = async (req, res) => {
  const recipe = new Recipe(req.body);
  const saved = await recipe.save();
  res.status(201).json(saved);
};

export const updateRecipe = async (req, res) => {
  const updated = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json(updated);
};

export const deleteRecipe = async (req, res) => {
  const deleted = await Recipe.findByIdAndDelete(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Recipe not found" });
  }
  res.json({ message: "Recipe deleted" });
};
