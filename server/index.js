import express from "express";
import { initializePostgresContainer } from "./ressources/docker-postgres.js";

const app = express();
const port = process.env.PORT || 3001;

// Middleware pour analyser le JSON
app.use(express.json());

// Routes de base
app.get("/", (req, res) => {
  res.send("API Cesizen en ligne");
});

// Fonction asynchrone pour démarrer le serveur
async function startServer() {
  try {
    // Initialiser le conteneur PostgreSQL
    console.log("Initializing PostgreSQL container...");
    const dbInitialized = await initializePostgresContainer();

    if (!dbInitialized) {
      console.warn(
        "Warning: PostgreSQL container could not be initialized. Starting server anyway..."
      );
    } else {
      console.log("PostgreSQL container is ready");
    }

    // Démarrer le serveur Express
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

// Démarrer le serveur
startServer();
