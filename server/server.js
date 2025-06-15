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

// standard endpoint to get all info sorted by title a-z
app.get("/getGames", async (req, res) => {
  const order = req.query.sortOrder;
  try {
    const data = await db.query(
      `SELECT games.id, games.title, games.platform, games.year, games.comments, status.status, games.completed, ARRAY_AGG(genres.name) AS genres FROM games JOIN status ON games.status_id = status.id JOIN games_genres ON games.id = games_genres.game_id JOIN genres ON games_genres.genre_id = genres.id GROUP BY games.id, games.title, games.platform, games.year, games.comments, status.status, games.completed ORDER BY games.title ${order}`
    );
    res.json(data.rows);
  } catch {
    res.sendStatus;
  }
});

app.get("/getGamesLike", async (req, res) => {
  const search = "%" + req.query.search + "%";
  try {
    const data = await db.query(
      `SELECT games.id, games.title, games.comments, games.completed, status.status FROM games JOIN status ON games.status_id = status.id WHERE title LIKE $1 ORDER BY games.title ASC`,
      [search]
    );
    res.json(data.rows);
  } catch {
    res.sendStatus;
  }
});

app.get("/getMostRecentGameId", async (req, res) => {
  const data = await db.query(
    `SELECT games.id FROM games ORDER BY games.id DESC LIMIT 1`
  );
  res.json(data.rows);
});

app.get("/getStatusList", async (req, res) => {
  try {
    const data = await db.query(`SELECT status.id, status.status FROM status`);
    res.json(data.rows);
  } catch {
    res.sendStatus;
  }
});

app.get("/getGenreList", async (req, res) => {
  try {
    const data = await db.query(`SELECT genres.id, genres.name FROM genres`);
    res.json(data.rows);
  } catch {
    res.sendStatus;
  }
});

app.post("/newGameRecord", (req, res) => {
  const { title, platform, year, comments, status, completed } = req.body;
  try {
    db.query(
      `INSERT INTO games (title, platform, year, comments, status_id, completed) VALUES ($1,$2,$3,$4,$5,$6)`,
      [title, platform, year, comments, status, completed]
    );
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});

app.post("/newGamesGenresRecord", (req, res) => {
  const { gameid, genreid } = req.body;
  try {
    db.query(`INSERT INTO games_genres (game_id, genre_id) VALUES ($1,$2)`, [
      gameid,
      genreid,
    ]);
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});

app.put("/updateGameRecord/:id", (req, res) => {
  const { comments, status, completed } = req.body;
  const recordId = parseInt(req.params.id);
  try {
    db.query(
      `UPDATE games SET comments = $1, status_id = $2, completed=$3 WHERE id = $4`,
      [comments, status, completed, recordId]
    );
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});

app.delete("/deleteGameRecord/:id", (req, res) => {
  const recordId = parseInt(req.params.id);
  try {
    db.query(`DELETE FROM games WHERE id = $1`, [recordId]);
    res.status(200).json({ success: true });
  } catch {
    res.sendStatus;
  }
});
