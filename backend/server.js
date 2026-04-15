// server.js - Express Backend for Smart Quiz App

const express = require("express");
const cors = require("cors");
const questions = require("./questions");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory leaderboard array (acts as our "database")
let leaderboard = [];

// ─── ROUTES ───────────────────────────────────────────────

// GET /questions?category=gk|programming|aptitude
// Returns all questions for the given category
app.get("/questions", (req, res) => {
  const { category } = req.query;

  if (!category) {
    return res.status(400).json({ error: "Category is required. Use ?category=gk|programming|aptitude" });
  }

  const categoryQuestions = questions[category];

  if (!categoryQuestions) {
    return res.status(404).json({ error: `Category '${category}' not found.` });
  }

  res.json({ category, questions: categoryQuestions });
});

// POST /score
// Stores a user's score in the leaderboard array
// Body: { name: "Alice", score: 4, total: 5, category: "gk" }
app.post("/score", (req, res) => {
  const { name, score, total, category } = req.body;

  if (!name || score === undefined || !total || !category) {
    return res.status(400).json({ error: "name, score, total, and category are required." });
  }

  const entry = {
    id: Date.now(),
    name: name.trim(),
    score,
    total,
    category,
    date: new Date().toLocaleDateString(),
  };

  leaderboard.push(entry);

  // Keep leaderboard sorted: highest score first
  leaderboard.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  // Keep only top 20 entries
  if (leaderboard.length > 20) leaderboard = leaderboard.slice(0, 20);

  res.status(201).json({ message: "Score saved successfully!", entry });
});

// GET /leaderboard
// Returns all stored scores, sorted by highest score
app.get("/leaderboard", (req, res) => {
  res.json({ leaderboard });
});

// Root route - just to confirm server is running
app.get("/", (req, res) => {
  res.json({ message: "Smart Quiz App API is running! 🚀" });
});

// ─── START SERVER ─────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
  console.log(`   GET  /questions?category=gk`);
  console.log(`   POST /score`);
  console.log(`   GET  /leaderboard`);
});
