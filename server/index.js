import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import recipeRoutes from "./routes/recipeRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL || "*" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/recipes", recipeRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve the built React frontend in production (npm run build outputs here)
if (process.env.NODE_ENV === "production") {
  const publicDir = path.join(__dirname, "public");
  app.use(express.static(publicDir));
  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}

// Central error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
