const express = require("express");
const dotenv = require("dotenv");
const pool = require("./db/db");

dotenv.config();

const port = process.env.EXPRESS_PORT;
const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM test;");
  res.json(data.rows);
});

app.post("/", async (req, res) => {
  const { comment } = req.body;
  await pool.query("INSERT INTO test (comment) VALUES ($1);", [comment]);
  res.status(200).send("Success");
});

app.listen(port, () => {
  console.log(`CESIZen server listening on port ${port}`);
});
