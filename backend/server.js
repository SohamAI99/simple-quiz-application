// server.js - Full-Stack Express Backend for Smart Quiz App
require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const questions = require("./questions");
const User = require("./models/User");
const Attempt = require("./models/Attempt");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key_123";

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/quizapp")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ─── AUTH ROUTES ──────────────────────────────────────────

// POST /register
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error during registration" });
  }
});

// POST /login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Server error during login" });
  }
});

// ─── QUIZ ROUTES ──────────────────────────────────────────

// GET /questions?category=gk|programming|aptitude
app.get("/questions", (req, res) => {
  const { category } = req.query;
  if (!category) return res.status(400).json({ error: "Category is required" });

  const categoryQuestions = questions[category];
  if (!categoryQuestions) return res.status(404).json({ error: `Category '${category}' not found.` });

  res.json({ category, questions: categoryQuestions });
});

// POST /submit-quiz
app.post("/submit-quiz", async (req, res) => {
  try {
    const { userId, name, category, score, totalQuestions, answers } = req.body;
    
    const attempt = new Attempt({
      userId,
      name,
      category,
      score,
      totalQuestions,
      answers
    });
    
    await attempt.save();
    res.status(201).json({ message: "Quiz result saved!", attempt });
  } catch (err) {
    res.status(500).json({ error: "Failed to save quiz result" });
  }
});

// GET /leaderboard
app.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await Attempt.find()
      .sort({ score: -1, date: -1 })
      .limit(20)
      .select('name score category date');
    res.json({ leaderboard });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
});

// GET /user-history/:userId
app.get("/user-history/:userId", async (req, res) => {
  try {
    const history = await Attempt.find({ userId: req.params.userId }).sort({ date: -1 });
    const totalAttempts = history.length;
    const bestScore = history.reduce((max, h) => Math.max(max, h.score), 0);
    const lastResult = history[0] || null;

    res.json({ history, stats: { totalAttempts, bestScore, lastResult } });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user history" });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "Smart Quiz App Full-Stack API is running! 🚀" });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
