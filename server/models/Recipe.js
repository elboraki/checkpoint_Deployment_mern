import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    ingredients: {
      type: [String],
      required: [true, "At least one ingredient is required"],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    instructions: {
      type: String,
      required: [true, "Instructions are required"],
    },
    category: {
      type: String,
      enum: ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Other"],
      default: "Other",
    },
    cookingTime: {
      type: Number, // minutes
      min: 0,
      default: 0,
    },
    servings: {
      type: Number,
      min: 1,
      default: 1,
    },
    imageUrl: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Recipe", recipeSchema);
