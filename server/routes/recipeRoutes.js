import { Router } from "express";
import asyncHandler from "../middleware/asyncHandler.js";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = Router();

router.get("/", asyncHandler(getRecipes));
router.get("/:id", asyncHandler(getRecipeById));
router.post("/", asyncHandler(createRecipe));
router.put("/:id", asyncHandler(updateRecipe));
router.delete("/:id", asyncHandler(deleteRecipe));

export default router;
