# Recipe Book — MERN Stack (Azure Deployment Checkpoint)

A full CRUD recipe management app (MongoDB, Express, React, Node) built to satisfy the
"Hosting a MERN App on Microsoft Azure" checkpoint. The client builds straight into
`server/public`, so the Express app can serve both the API and the frontend from a single
Azure Web App.

## Project structure

```
.
├── client/              React app (Vite)
│   ├── src/
│   │   ├── api/          axios calls to the backend
│   │   ├── components/   Navbar, RecipeCard, RecipeForm
│   │   └── pages/        Home, AddRecipe, EditRecipe, RecipeDetail
│   └── vite.config.js    build.outDir -> ../server/public, dev proxy -> :5000
├── server/               Express + Mongoose API
│   ├── config/db.js      MongoDB connection
│   ├── models/Recipe.js
│   ├── controllers/      recipe CRUD logic
│   ├── routes/           /api/recipes routes
│   ├── middleware/       async error handling
│   ├── index.js          app entry point, serves server/public in production
│   └── .env.example
└── package.json          root scripts to install/build/run both halves
```

## Features

- List, search (by title) and filter (by category) recipes
- View a recipe's full detail (ingredients, instructions, metadata)
- Add, edit and delete recipes
- REST API: `GET/POST /api/recipes`, `GET/PUT/DELETE /api/recipes/:id`

## Run it locally

### 1. Set up MongoDB Atlas

Azure doesn't offer MongoDB directly, so use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas):

1. Create a free cluster.
2. Add a database user and allow your IP (or `0.0.0.0/0` for testing).
3. Copy the connection string.

### 2. Configure environment variables

```bash
cp server/.env.example server/.env
```

Edit `server/.env`:

```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>/recipeapp?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
```

### 3. Install dependencies

```bash
npm run install-all
```

### 4. Run in development (two dev servers, with hot reload)

```bash
npm run dev
```

- API: http://localhost:5000/api/recipes
- Frontend: http://localhost:5173 (proxies `/api` to the backend)

### 5. Build & run as a single production app (what Azure will run)

```bash
npm run build   # builds client into server/public
NODE_ENV=production npm start
```

Visit http://localhost:5000 — Express now serves the React build and the API together.

## Deploying to Azure App Service

1. **Prepare the app** — confirmed working locally above, backend connected to MongoDB Atlas.
2. **Create an Azure account** and open the [Azure Portal](https://portal.azure.com).
3. **MongoDB Atlas** is already set up (step 1 above) — Azure will use the same `MONGODB_URI`.
4. **Build for production**: `npm run build` (already configured to output into `server/public`).
5. **Create the Web App**:
   - Azure Portal → *Create a resource* → *Web* → *Web App*.
   - Runtime stack: **Node LTS**, OS: **Linux**.
   - Pick a resource group, region, and pricing tier (e.g. B1 for testing).
6. **Deployment Center**:
   - Choose **Local Git** (or connect GitHub for CI/CD).
   - If using Local Git: `git remote add azure <git-url-from-portal>`, then `git push azure main`.
   - If using GitHub: point it at this repo/branch — Azure's Oryx build will run
     `npm install` then `npm run build` (defined at the repo root) automatically, since
     `SCM_DO_BUILD_DURING_DEPLOYMENT` defaults to `true` for GitHub-connected Node apps.
7. **Configure environment variables**:
   - Web App → *Configuration* → *Application settings* → add:
     - `MONGODB_URI` = your Atlas connection string
     - `NODE_ENV` = `production`
     - `CLIENT_URL` = your Web App's URL (e.g. `https://<app-name>.azurewebsites.net`)
   - Save (this restarts the app).
8. **Verify the startup command** (Configuration → General settings → Startup Command):
   ```
   node server/index.js
   ```
   (or leave it blank and rely on the root `start` script if using Oryx's default detection).
9. **Test the deployed app**: open `https://<app-name>.azurewebsites.net`, and confirm you can
   list, add, edit and delete recipes — this verifies both the deployment and the MongoDB
   Atlas connection.

## API reference

| Method | Route              | Description        |
|--------|--------------------|---------------------|
| GET    | /api/recipes       | List recipes (supports `?search=` and `?category=`) |
| GET    | /api/recipes/:id   | Get one recipe     |
| POST   | /api/recipes       | Create a recipe    |
| PUT    | /api/recipes/:id   | Update a recipe    |
| DELETE | /api/recipes/:id   | Delete a recipe    |
| GET    | /api/health        | Health check        |
