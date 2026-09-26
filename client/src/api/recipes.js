import axios from "axios";

const api = axios.create({
  baseURL: "/api/recipes",
});

export const fetchRecipes = (params = {}) =>
  api.get("/", { params }).then((res) => res.data);

export const fetchRecipeById = (id) =>
  api.get(`/${id}`).then((res) => res.data);

export const createRecipe = (data) =>
  api.post("/", data).then((res) => res.data);

export const updateRecipe = (id, data) =>
  api.put(`/${id}`, data).then((res) => res.data);

export const deleteRecipe = (id) =>
  api.delete(`/${id}`).then((res) => res.data);
