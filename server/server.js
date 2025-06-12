import express from "express";
import cors from "cors";
import { db } from "./utils/dbconnection.js";

const app = express();
const PORT = process.env.API_PORT;

app.use(express.json());
app.use(cors());

app.listen(PORT, function () {
  console.log(`Server is alive and listening on ${PORT}`);
});

app.get("/", function (req, res) {
  res.json({ message: "This is the root route of the API." });
});

app.get("", async (req, res) => {
  try {
    const data = await db.query(``);
    res.json(data.rows);
  } catch {
    res.sendStatus;
  }
});

app.post("", (req, res) => {
  const {} = req.body;
  try {
    db.query(``, []);
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});

app.delete("", (req, res) => {
  const recordId = req.params.id;
  try {
    db.query(``, [recordId]);
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});

app.put(":id", (req, res) => {
  const body = req.body;
  const recordId = req.params.id;
  try {
    db.query(``, [body.verified, recordId]);
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});
