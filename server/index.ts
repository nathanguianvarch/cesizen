import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/users";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth";
import cors from "cors";

dotenv.config();

const port = process.env.EXPRESS_PORT || 3000;
const app = express();

// Register CORS middleware first
app.use(cors({ origin: "http://localhost:3001" }));

// Parse JSON bodies for all incoming requests
app.use(express.json());

// Register auth middleware for /api/auth/* routes
app.all("/api/auth/*", toNodeHandler(auth));

// Optionally, register your user routes
app.use("/users", userRoutes);

// Define your sign-up route if needed (be careful with duplicate definitions)
app.post("/api/auth/sign-up/email", (req, res) => {
  // Handle the sign-up request logic
  res.send("Success");
});

// Other example routes
app.get("/", async (req, res) => {
  res.json("data.rows");
});

app.post("/", async (req, res) => {
  res.status(200).send("Success");
});

app.listen(port, () => {
  console.log(`CESIZen server listening on port ${port}`);
});
