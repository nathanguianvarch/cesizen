import express from "express";
import dotenv from "dotenv";
import { pool } from "./db";

dotenv.config();

const port = process.env.EXPRESS_PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", async (req: any, res: any) => {
  const data = await pool.query("SELECT * FROM test;");
  res.json(data.rows);
});

app.post("/", async (req: any, res: any) => {
  const { comment } = req.body;
  await pool.query("INSERT INTO test (comment) VALUES ($1);", [comment]);
  res.status(200).send("Success");
});

app.listen(port, () => {
  console.log(`CESIZen server listening on port ${port}`);
});
